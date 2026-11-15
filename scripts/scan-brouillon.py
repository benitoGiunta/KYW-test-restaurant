#!/usr/bin/env python3
"""Liste les libellés de brouillon visibles (à confirmer, exemple, illustratif, démonstration, placeholder…) dans dist/.
Usage : python3 scripts/scan-brouillon.py <sortie.json> <slug> [<slug>…]. Seule exception admise : la mention du pied KYW."""
import re,sys,glob,json,html
pat=re.compile(r"(à confirmer|a confirmer|exemple|illustrati\w*|placeholder|photo à (?:venir|fournir)|à venir|todo|lorem|xx\b|\?\?|non vérifié|à vérifier|provisoire|démo|démonstration|fictif|fictive)",re.I)
res={}
OUT=sys.argv[1]; sys.argv=sys.argv[1:]
for slug in sys.argv[1:]:
  for v in ("portfolio","awwwards","legacy"):
    hits={}
    for f in glob.glob(f"dist/{slug}/{v}/**/*.html",recursive=True):
      t=open(f,encoding="utf-8",errors="ignore").read()
      t=re.sub(r"(?s)<(script|style)[^>]*>.*?</\1>"," ",t)
      t=re.sub(r'(?s)<footer[^>]*kyw-footer.*?</footer>',' ',t)
      t=html.unescape(re.sub(r"<[^>]+>","\n",t))
      for line in t.split("\n"):
        l=" ".join(line.split())
        if l and pat.search(l) and "Maquette KYW" not in l:
          hits.setdefault(l[:110],set()).add(f.split(f"/{v}/")[1])
    res[f"{slug}/{v}"]={k:sorted(p) for k,p in hits.items()}
for k,h in res.items():
  print(f"\n### {k} : {len(h)} libellés")
  for l,p in list(h.items())[:12]: print(f"  - {l}  [{', '.join(p)[:60]}]")
json.dump(res,open(OUT,'w'),ensure_ascii=False,indent=1)
