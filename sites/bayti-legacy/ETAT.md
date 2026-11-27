# ETAT · bayti legacy · fin de phase 1 (27/11/2026)

## Fait
- AUDIT.md, DESIGN.md (Picks, système, composants), comp.md, entrée dans `.hallmark/log.json`.
- Thème Squeeze (dealt 1/3), draw 60d80a ; macrostructure Photographic gardée, hero Counter, nav dalle, pied mast.
- 8 pages statiques : /, /notre-histoire, /menu, /carte-restaurant, /avis, /galerie, /bayti-chez-vous, 404. Build OK, `dist/bayti/legacy/`. KywFooter, noindex et mention présents sur les 8 pages.
- sloplint src + URL : 0 FAIL, 0 REFLEX au dernier passage (accueil).

## Reste
- Phase 2 : animations (un reveal), nav mobile affinée (details actuellement), états des contrôles, questions de reproduction du comp.
- Comps c1/c2 non construits (budget) : à faire ou à justifier en phase 2.
- sloplint complet sur les 7 autres routes, RAPPORT.md, `--kept` contre before.json, revue.

## Décisions et hypothèses
- Horaires : « mar au sam, 18 h 00 à 21 h 00 (restaurant) et 11 h 00 à 19 h 00 (comptoir) », fermé lundi et dimanche (déduit, à confirmer, comme le dossier).
- 4,9 / 5 et « +150 avis » repris du site d'origine, listés « à vérifier ». Un seul avis (Brenda C.), mot pour mot.
- Aucune donnée fictive ni `.fill` : aucune salle, équipe ou date inventée.
- Tirets cadratins des noms de plats remplacés par des virgules (gate 19, listé dans page.css).
- Hero : phrase raccourcie (58), la baseline devient le h1.
- Photos : 33 en WebP 800/1600 depuis `data/restaurants/bayti/photos/`, alt = champ `sujet`.
- Pièges : sloplint sur dist/*.html donne de faux FAIL ; serveur de test PID noté puis arrêté.
