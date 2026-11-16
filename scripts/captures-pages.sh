#!/usr/bin/env bash
# Captures par page (approche 4, 16/11/2026) : pour chaque variante d'un restaurant, accueil + pages cibles
# (carte/menu, réservation, contact, horaires/prix/infos ; 6 pages au plus), desktop et mobile, un scripts/capture-page.mjs par page (4 vues desktop + 4 mobile)
# avec délai de 60 s (une relance sur la seule page si expiré), puis une planche par page.
# Usage : scripts/q.sh captures scripts/captures-pages.sh <slug> [variante…]
# Sorties : .shots-a4-<slug>-<v>/<page>/{d-*,m-*}.png + planche.png ; data/review/<slug>/couverture-<v>.json
set -u
ROOT="$(git rev-parse --show-toplevel)"; cd "$ROOT"
slug="$1"; shift; vars="${*:-portfolio awwwards legacy}"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
port=$((4500 + RANDOM % 400))
node .claude/skills/awwwards/scripts/serve.mjs dist --port "$port" >/dev/null 2>&1 & srv=$!
trap 'kill $srv 2>/dev/null' EXIT
curl -s --retry 15 --retry-connrefused --retry-delay 1 -o /dev/null "http://127.0.0.1:$port/"
mkdir -p "data/review/$slug"
for v in $vars; do
  base="dist/$slug/$v"; [ -d "$base" ] || { echo "absent : $base"; continue; }
  # pages : accueil, puis pages cibles par mot-clé, puis complément jusqu'à 6
  mapfile -t toutes < <(find "$base" -mindepth 2 -maxdepth 3 -name index.html | sed "s#^$base/##; s#/index.html##" | grep -vE '^(kyw|_astro|fonts|photos|images|node_modules)(/|$)' | sort)
  cibles=("."); for p in "${toutes[@]}"; do echo "$p" | grep -qiE 'carte|menu|reserv|contact|horaire|prix|info|tarif' && cibles+=("$p"); done
  for p in "${toutes[@]}"; do [ ${#cibles[@]} -ge 6 ] && break; printf '%s\n' "${cibles[@]}" | grep -qx "$p" || cibles+=("$p"); done
  cibles=("${cibles[@]:0:6}")
  out=".shots-a4-$slug-$v"; rm -rf "$out"; vus_d=(); vus_m=(); ratees=()
  for p in "${cibles[@]}"; do
    nom=$([ "$p" = "." ] && echo accueil || echo "$p" | tr '/' '-')
    url="http://127.0.0.1:$port/$slug/$v/$([ "$p" = "." ] || echo "$p/")"
    for essai in 1 2; do
      timeout 60 node scripts/capture-page.mjs "$url" "$out/$nom" >/dev/null 2>&1 && break
    done
    ls "$out/$nom"/d-*.png >/dev/null 2>&1 && vus_d+=("$nom")
    ls "$out/$nom"/m-*.png >/dev/null 2>&1 && vus_m+=("$nom")
    # contrôle automatique des bords (scripts/controle-bords.mjs) : un JSON par variante, fusion des pages et des deux vues
    for vue in 1440 390; do
      timeout 120 node scripts/controle-bords.mjs "$url" --viewport "$vue" --out "$out/$nom/bords-$vue.json" >/dev/null 2>&1 || true
    done
    if ls "$out/$nom"/[dm]-*.png >/dev/null 2>&1; then
      python3 scripts/planche.py "$out/$nom/planche.png" "$out/$nom"/d-*.png "$out/$nom"/m-*.png --colonnes 4 --largeur 480 >/dev/null 2>&1
    else ratees+=("$nom"); fi
  done
  python3 - "$slug" "$v" "$out" <<'PY2'
import json, glob, os, sys
slug, v, out = sys.argv[1:4]; res = {"variante": v, "pages": {}, "total": 0}
for f in sorted(glob.glob(f"{out}/*/bords-*.json")):
    page = f.split('/')[-2]; vue = os.path.basename(f)[6:-5]
    try: d = json.load(open(f))
    except Exception: res["pages"].setdefault(page, {})[vue] = {"erreur": "sortie illisible"}; continue
    n = len(d["violations"]) + (1 if d["debordementPage"] and d["debordementPage"]["deborde"] else 0)
    res["total"] += n; res["pages"].setdefault(page, {})[vue] = {"ok": d["ok"], "debordementPage": d["debordementPage"], "violations": d["violations"], "defilements": d["defilements"]}
json.dump(res, open(f"data/review/{slug}/bords-{v}.json", "w"), ensure_ascii=False, indent=1)
print(f"{v} : contrôle des bords, {res['total']} défaut(s)")
PY2
  noms=(); for p in "${cibles[@]}"; do noms+=("$([ "$p" = "." ] && echo accueil || echo "$p" | tr '/' '-')"); done
  python3 - "$slug" "$v" "$out" "${#noms[@]}" "${noms[@]}" "--d" "${vus_d[@]}" "--m" "${vus_m[@]}" <<'PY'
import json, sys
a = sys.argv[1:]; slug, v, out, n = a[0], a[1], a[2], int(a[3]); noms = a[4:4 + n]; r = a[4 + n:]
i_d, i_m = r.index('--d'), r.index('--m'); d, m = r[i_d + 1:i_m], r[i_m + 1:]
c = dict(variante=v, dossier=out, pages_cibles=noms, desktop=d, mobile=m,
         complete=all(p in d and p in m for p in noms), manquantes=[p for p in noms if p not in d or p not in m])
json.dump(c, open(f'data/review/{slug}/couverture-{v}.json', 'w'), ensure_ascii=False)
print(f"{v} : {len(d)}/{n} desktop, {len(m)}/{n} mobile" + (f" · manquantes {c['manquantes']}" if c['manquantes'] else ""))
PY
done
