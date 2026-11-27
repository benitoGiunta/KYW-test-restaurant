# ETAT Bayti portfolio, phase 3 sur 3 terminée (27/11/2026)

Phase 3 (QA) faite : voir RAPPORT.md (pied KYW z-index, tirets, photo allégée). Build OK, audit 0 FAIL. Reste : `pnpm index`, commit dist, publication par la session mère.


## Fait en phase 1 (inchangé)
Gabarit Journée adapté (données, 6 pages, palette vert sapin, photos WebP, favicon, OG). Voir DESIGN.md.

## Fait en phase 2 (motion, signature, mobile, finitions)
- **Signature du hero** : un soleil (lune ivoire la nuit) sur un arc pointillé 7h-23h (`.soleil`, `index.astro`, `base.css`, `journee.ts` fonction `soleil`). Il part de l'aube à l'entrée et rejoint l'heure réelle (2,4 s, rejoint la timeline `intro`, donc après le loader), puis se recale chaque minute. Couronne de 60 crans qui tourne en 60 s, halo qui respire. Au défilement il monte et s'efface (scrub). Reduced-motion : posé à l'heure, sans trajet ni rotation (règle globale 0,01 ms d'engine.css).
- Médaillons : couronne de texte qui tourne (48 s, 12 s au survol), zoom de la photo au survol.
- **Correctif mobile** : débordement horizontal de 10 px (scrollWidth 400 pour 390) causé par la figure `data-reveal="scale"` de « Chez vous » avant révélation ; `.moment { overflow-x: clip }`. Mesuré 390/390 ensuite.
- Vérifié par scripts Playwright maison (heure simulée 12h30, 19h/19h30, 22h30 ; 1440 et 390) : thèmes et `--heure` à chaque moment (midi 11, ocre 15, nuit 18, nuit profonde 21), invitation « moment présent » cachée à 22h30 et visible le jour, badge « ouvert jusqu'à 21:00 » / « fermé, ouvre demain à 11:00 », aucune erreur console, frise mobile à 3 crans propre.
- Clics réels de l'en-tête (5 pages x 5 liens), pied KYW visible en bas de page, contenu visible en reduced-motion, dépassement horizontal à 320, 375, 768, 1024 : script `bayti-p2-final.mjs` du scratchpad (résultat dans le compte rendu final).

## Reste (phase 3 et agent captures)
- Shoot complet (agent captures) : desktop, mobile, 4 largeurs, reduced-motion, clavier, audit axe/LCP ; contraste du texte doux sur le vert à relire.
- Photos : poids ~8 Mo, pas de variantes 960 px ni `<picture>` ; à décider selon le LCP mesuré.
- Hero : le soleil remplit la moitié droite ; vérifier sur 1280 x 720 que la piste ne touche pas la baseline (largeur min(36rem, 40vw)).
- Pages internes (carte, chez-vous, histoire, réservation) : motion du gabarit inchangé ; états du formulaire de réservation non retouchés en phase 2.
- `pnpm index`, commit de `dist/bayti/`, publication : non faits (consignes de phase).

## Pièges
- `q.sh` met en tampon la sortie : un script Playwright long (> 120 s) part en arrière-plan et sa sortie reste vide jusqu'à la fin.
- Les captures de test (heure simulée par `addInitScript` qui surcharge `Date`) sont dans le scratchpad, pas dans `.shots/`.
- Serveur de test : port 4417, PID dans `/tmp/claude-0/bayti-p2.pid` (à tuer avec `kill`).
- `gabarits/UTILISATION.md` toujours à compléter par la session mère : « journee | bayti ». Le correctif `overflow-x: clip` serait aussi à reporter dans `gabarits/journee/` (non touché : consigne).
