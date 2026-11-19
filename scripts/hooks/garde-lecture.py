#!/usr/bin/env python3
"""Hook PreToolUse (Bash) : refuse la lecture complète d'un gros fichier (règle de sobriété, 10/11/2026).

Bloque `cat <fichier>` (et `cat a b …`) quand un fichier lu dépasse 200 lignes, et `sed -n 'a,bp'` sur plus de
120 lignes. Laisse passer `cat > fichier`, `cat <<EOF`, `cat` en fin de tube et les fichiers courts.
Approche 4 (16/11/2026) : refuse aussi, sans le préfixe `scripts/q.sh <nom>`, les commandes bavardes (node scripts/…,
shoot/audit/sloplint/theme.mjs, pnpm, npx, playwright, curl, python3 scripts/…) ; exceptions : scan-brouillon.py,
usage-*.py, marqueur.sh. Pendant la correction d'un site (.logs/identification-<slug>-<v>), refuse `sed -i` sur sites/<slug>-<v>/ tant que
.logs/marqueur-<slug>-<v> n'existe pas.
Code de sortie 2 = refus, le message (stderr) est renvoyé à l'agent."""
import json, os, re, shlex, sys

LIMITE_CAT, LIMITE_SED = 200, 120
try:
    cmd = json.load(sys.stdin).get("tool_input", {}).get("command", "") or ""
except Exception:
    sys.exit(0)

def lignes(chemin, cwd):
    p = chemin if os.path.isabs(chemin) else os.path.join(cwd, chemin)
    try:
        if not os.path.isfile(p):
            return 0
        with open(p, "rb") as f:
            return sum(1 for _ in f)
    except Exception:
        return 0

cwd = os.getcwd()
refus = []
bavardes = []
marqueurs = []
EXCEPTIONS = re.compile(r"(scan-brouillon\.py|usage-[a-z-]+\.py|message-lancement\.py|marqueur\.sh|serve\.mjs)$")
def racine(c):
    d = os.path.abspath(c)
    while d != "/" and not os.path.isdir(os.path.join(d, ".git")):
        d = os.path.dirname(d)
    return d
for seg in re.split(r"\|\||&&|;|\n", cmd):
    for i, morceau in enumerate(seg.split("|")):
        try:
            mots = shlex.split(morceau, comments=False, posix=True)
        except ValueError:
            continue
        while mots and re.match(r"^[A-Za-z_][A-Za-z0-9_]*=", mots[0]):
            mots = mots[1:]
        if mots and mots[0] == "cd" and len(mots) > 1 and i == 0:
            cwd = mots[1] if os.path.isabs(mots[1]) else os.path.join(cwd, mots[1])
            continue
        if not mots:
            continue
        prog = os.path.basename(mots[0])
        if i == 0 and not mots[0].endswith("scripts/q.sh"):
            cible = mots[1] if prog in ("node", "python3", "python") and len(mots) > 1 else mots[0]
            if prog in ("pnpm", "npx", "playwright", "curl") \
               or (prog in ("node", "python3", "python") and (cible.startswith("scripts/") or "/scripts/" in cible
                   or re.search(r"(shoot|audit|sloplint|theme)\.mjs$", cible))) \
               or re.search(r"(shoot|audit|sloplint|theme)\.mjs$", mots[0]):
                if not EXCEPTIONS.search(cible) and not (prog == "curl" and "-o" in mots and "/dev/null" in mots and "--retry-connrefused" in mots):
                    bavardes.append(" ".join(mots[:3]))
        if prog == "sed" and any(m == "-i" or m.startswith("-i") for m in mots[1:]):
            for m in mots[1:]:
                r = re.search(r"sites/([a-z0-9-]+)-(portfolio|awwwards|legacy)/", m if m.endswith("/") else m + "/")
                lg = os.path.join(racine(cwd), ".logs")
                if r and os.path.exists(os.path.join(lg, f"identification-{r.group(1)}-{r.group(2)}")) \
                   and not os.path.exists(os.path.join(lg, f"marqueur-{r.group(1)}-{r.group(2)}")):
                    marqueurs.append(f"{r.group(1)}-{r.group(2)}")
        if mots[0] == "cat" and i == 0:
            if any(m.startswith("<") or m.startswith(">") for m in mots[1:]):
                continue
            for f in [m for m in mots[1:] if not m.startswith("-")]:
                n = lignes(f, cwd)
                if n > LIMITE_CAT:
                    refus.append(f"`cat {f}` ({n} lignes)")
        if mots[0] == "sed" and "-n" in mots:
            for m in mots:
                r = re.fullmatch(r"'?(\d+),(\d+)p'?", m)
                if r and int(r.group(2)) - int(r.group(1)) > LIMITE_SED:
                    refus.append(f"`sed -n {m}` ({int(r.group(2)) - int(r.group(1))} lignes)")

if bavardes:
    sys.stderr.write("Commande refusée (approche 4, sobriété) : " + ", ".join(sorted(set(bavardes)))
        + " doit passer par l'enveloppe : `scripts/q.sh <agent>-<étape> <commande>` (sortie complète dans .logs/, "
        "seules les 20 dernières lignes affichées).\n")
    sys.exit(2)
if marqueurs:
    m = sorted(set(marqueurs))[0]; slug, v = m.rsplit("-", 1)
    sys.stderr.write(f"Modification refusée : lance d'abord `scripts/marqueur.sh MARQUEUR-RECTIFICATION {slug} {v}` "
        "(fin de l'identification), puis corrige.\n")
    sys.exit(2)
if refus:
    sys.stderr.write(
        "Lecture refusée par la règle de sobriété (agents/sobriete.md) : " + ", ".join(refus)
        + ". Lis la plage utile : `grep -n <motif> <fichier> | head -20`, puis `sed -n 'a,bp'` sur 60 lignes au plus, "
        "ou l'outil Read avec offset/limit. Pour un journal : `tail -20`.\n")
    sys.exit(2)
sys.exit(0)
