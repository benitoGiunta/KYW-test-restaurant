#!/usr/bin/env python3
"""Hook PreToolUse (Bash) : refuse la lecture complète d'un gros fichier (règle de sobriété, 10/11/2026).

Bloque `cat <fichier>` (et `cat a b …`) quand un fichier lu dépasse 200 lignes, et `sed -n 'a,bp'` sur plus de
120 lignes. Laisse passer `cat > fichier`, `cat <<EOF`, `cat` en fin de tube et les fichiers courts.
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

if refus:
    sys.stderr.write(
        "Lecture refusée par la règle de sobriété (agents/sobriete.md) : " + ", ".join(refus)
        + ". Lis la plage utile : `grep -n <motif> <fichier> | head -20`, puis `sed -n 'a,bp'` sur 60 lignes au plus, "
        "ou l'outil Read avec offset/limit. Pour un journal : `tail -20`.\n")
    sys.exit(2)
sys.exit(0)
