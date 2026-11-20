# RAPPORT : Le Brunchist, variante awwwards (phase 3, QA)

## Corrections faites (preuve : capture ciblée de l'accueil et de 404.html, `.shots/`)
- Contraste axe de l'accueil (`.gomme` du mot-valise, 2,01:1) : lettres gommées en `#6b4a08` plein (plus d'opacité), animation scroll de `#21140d` vers `#6b4a08`. 0 violation axe après correction.
- Contraste axe de la 404 (note du pied KYW, 4,36:1) : surcharge locale `.kyw-footer__note { color: #4a565b }` dans `site.css`, composant du paquet intact. 0 violation sur 404.html.
- Cibles tactiles (« Lire l'histoire du lieu », « Ouvrir le plan », Facebook, Instagram) : `.lien` en bloc en ligne avec marge verticale. `smallTargets` vide.
- `hover.noHoverChange` (logo « Le Brunchist », « Ouvrir le plan ») : survol du logo (blanc + resserrement), survol des liens (couleur + épaisseur du soulignement). `noHoverChange` vide. Reste `colorOnly` sur « Ouvrir le plan » (couleur + épaisseur du trait) : lien secondaire, accepté.
- Image OG `public/og.png` créée depuis le hero réel (1200 x 630, lisible : nom, disque 9 h 30, accroche). Audit : 0 FAIL (l'ancien FAIL og:image est résolu).

## Mesures finales (accueil)
Erreurs console 0, requêtes en échec 0, CLS 0, LCP mobile 948 ms (`p.hero__lede`, texte), page la plus lourde ~135 Ko (JS 61 Ko gz). `audit.txt` : 0 FAIL, 7 WARN.

## WARN justifiés
- « 9 h 30 à 15 h 30 » répété (accueil) et lignes d'horaires répétées (réservation : page + pied) : l'horaire est le sujet du site, répétition voulue et informative.
- « no sitemap » / « no robots.txt » : artefact de la racine de QA sous `base` (le `sitemap-index.xml` existe dans `dist/`) ; noindex porté par le meta.
- `keyboard.skipLinkFirst: false` : faux positif connu, `stops[0]` est « Aller au contenu ».

## Non fait (limites)
- Pas de critique jury indépendant : aucun outil Agent en session, donc aucun score ≥ 8 prouvé ; passe jury (2 minimum) à faire par le superviseur. Auto-notation non produite.
- Passe « retirer un accessoire » et cases 61 à 63 de la checklist non faites ; DESIGN.md non mis à jour avec les cases 42 à 60.
- Vérification visuelle des heures `data-split="lines"` à insécables (carte, index) non refaite.
- Pages `/carte/`, `/histoire/`, `/reservation/` non re-shootées (seul le CSS global a changé, audit crawlé OK).

## Placeholders (`placeholder: true` dans `src/data/site.ts`)
Les 12 plats de la carte (nom, description, prix, moment) : café de spécialité, latte, matcha, jus frais, granola maison, granola bowl, pancakes, œufs brouillés, eggs benedict, toast à l'avocat, tartine du jour, filet américain. Horaires divergents selon les sources : la maquette retient mercredi à dimanche, 9 h 30 à 15 h 30.
