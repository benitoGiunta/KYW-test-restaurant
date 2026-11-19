#!/usr/bin/env python3
"""Produit le message de lancement d'une session de production, prêt à passer à create_session.

Usage : python3 scripts/message-lancement.py <campagne> <etape> <slug>
  <campagne> : nom d'un fichier agents/production/campagnes/<campagne>.json (paramètres + file de restaurants)
  <etape>    : developpement | correction
Le texte vient du bloc de code du fichier agents/production/2-developpement.md ou 3-correction.md (la version en
vigueur) ; chaque <paramètre> est remplacé par la valeur de la campagne. S'arrête si un paramètre reste non rempli."""
import json, re, sys
from pathlib import Path

RACINE = Path(__file__).resolve().parent.parent
FICHIERS = {"developpement": "2-developpement.md", "correction": "3-correction.md"}

def main():
    if len(sys.argv) != 4 or sys.argv[2] not in FICHIERS:
        sys.exit(__doc__)
    campagne, etape, slug = sys.argv[1:]
    conf = json.loads((RACINE / f"agents/production/campagnes/{campagne}.json").read_text())
    texte = (RACINE / "agents/production" / FICHIERS[etape]).read_text()
    m = re.search(r"## Message de lancement\s*```\n(.*?)```", texte, re.S)
    if not m:
        sys.exit(f"bloc « Message de lancement » introuvable dans {FICHIERS[etape]}")
    msg = m.group(1)
    valeurs = {**conf["parametres"], "slug": slug}
    for _ in range(2):  # deux passes : une valeur peut elle-même contenir <slug> ou <campagne>
        for cle, val in valeurs.items():
            msg = msg.replace(f"<{cle}>", str(val))
    if "A_REMPLIR" in msg:
        sys.exit("paramètre « A_REMPLIR » dans la campagne (ex. session-mere) : le remplir avant de lancer")
    reste = sorted(set(re.findall(r"<(slug|phase|campagne|lecons|consigne-lecons|seuil-hebdo|heure-limite|session-mere|session-reporting|vars|extra)>", msg)))
    if reste:
        sys.exit(f"paramètres non remplis : {', '.join(reste)}")
    sys.stdout.write(msg.strip() + "\n")

main()
