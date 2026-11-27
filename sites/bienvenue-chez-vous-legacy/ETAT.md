# ETAT · bienvenue-chez-vous · variante legacy · phase 3 sur 3 terminée
Fait : sweep sloplint (0 REFLEX), corrections 39b, 49b, waivers 8/77/81, build et pnpm index OK, vérification par mesure 320/1440, RAPPORT.md, DESIGN.md.
Reste : photo boutique, numéro/horaires/e-mail à confirmer ; polices ttf/otf en woff2 (facultatif).
Pièges : FAIL 34 faux positif ; 404 brute de serve.mjs signale un contraste du pied KYW (paquet partagé, non touché).

## Publication (2026-11-27, agent publication, phase test)
- Fait : build OK des 3 variantes (scripts/build-site.mjs), pnpm index, commit et push sur claude/laughing-wozniak-vxc1fo (3d3affd5 et fa2c83a7).
- Vérifié en local (serve.mjs port 4620) : kyw-footer présent sur chaque page, index liste les 3 variantes.
- Non fait : aucun push sur publication (réservé à scripts/publier.sh, session de correction).
- Piège : rebase conflictuel sur dist/index.html (généré) ; résolu en régénérant par pnpm index.
