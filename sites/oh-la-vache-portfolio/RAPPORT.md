# RAPPORT, oh-la-vache-portfolio (QA, 27/11/2026)

## Résultat
Build OK (`dist/oh-la-vache/portfolio/`, 6 pages). Audit (agent captures) : 0 FAIL, 7 WARN, tous faux positifs ou connus. Axe : 0 violation sur accueil et carte. Console et requêtes : aucune erreur. LCP mobile 1,1 à 1,2 s, CLS < 0,02.

## Corrigé
- Barre de navigation mobile (dock fixe en bas) : le 5e lien « Contact » était coupé à 390 px et défilait à 320 px. Police `--t-xs`, marges réduites (et 0,45em sous 340 px). Vérifié par mesure à 320, 360, 390 (dernier lien entièrement visible, aucun débordement de page) et par capture ciblée à 320.

## Non corrigé, faux positifs (justifiés)
- Axe `color-contrast` sur la 404 : mesuré sur la vraie `404.html`, la note du pied est `#55646a` sur `#f3f2ef` (environ 5,3:1) ; l'alerte vient de la réponse brute du serveur statique, sans les styles du site.
- « la page d'accueil » 128x20 px : texte du 404 du serveur, absent des sources du site.
- WARN robots.txt / sitemap : connus sous `base` (le build écrit `sitemap-index.xml`).
- WARN « phrase répétée » (horaires du pied sur 5 pages) : pied de page identique voulu.

## Placeholders
Aucun `placeholder: true`. Données à confirmer : horaires (note « à confirmer » affichée), « salle sous tente » (déduit des photos), e-mail non affiché.

## Points ouverts
- `gabarits/UTILISATION.md` (guinguette -> oh-la-vache) et report des corrections dans `gabarits/guinguette/` : non faits (mode figé, gabarits protégés).
- Sloplint et captures complètes de pages histoire/terrasse/réservation non relancés (une capture ciblée seulement).

## Leçons structurelles
Un dock de navigation mobile à 5 liens doit être mesuré (`scrollWidth` vs `clientWidth` de `.nav`) à 320, 360 et 390 : le défilement horizontal masque un lien sans débordement de page.
