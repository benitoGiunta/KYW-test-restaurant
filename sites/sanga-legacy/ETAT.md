# ETAT · Sanga, variante legacy · fin de la phase 1 (construction-1)

## Fait
- Audit (`AUDIT.md`, `.hallmark/before.txt`), approche conservée, deal/draw/scaffold/stamp (Solstice, seed `restaurant-namur-japanese-ramen-b876·839c6a6f·2026-11-10·r0`, draw 1c8dc9), deux comps (`comp.md`, c1 choisi), `DESIGN.md` (Picks, Approche, Composants, Sur-utilisation), entrée du journal `.hallmark/log.json`.
- Pages : `/` (hero Counter, Ramen, photo large, Udon et donburi, Compléments sur bande d'encre, Livraison, Horaires, pied mast) et `404`. Données dans `src/data/site.ts` (carte complète de 33 lignes, horaires, livraison, paiement), reformulations notées en tête de fichier.
- Build : `pnpm build:site sites/sanga-legacy` passe, `dist/sanga/legacy/` écrit ; noindex, mention KYW et `kyw-signature` présents sur `index.html` et `404.html`. Sloplint (CSS aplati + HTML) : 0 FAIL, 0 WARN.
- Photos : 02 (hero), 05 (webp 1600, bande large) utilisées ; 01, 03, 04 copiées dans `public/photos/` (`udon.jpg`, `gyoza.jpg`, `donburi.jpg`) mais encore non placées.

## Reste (phases 2 et 3)
- Phase 2 : menu mobile (nav masquée sous 60 rem : seuls Sanga et Commander restent), états des contrôles, jour courant dans le tableau d'horaires, un reveal au plus, hero review et rendu (`sloplint --render --url`), mesure du premier écran à 1280 x 800 et 375, 98 mots par écran, placement des photos 04 (donburi) et 01 (udon) si l'équilibre le demande, vérification visuelle de la bande large 21:9 (crop de la photo 05).
- Phase 3 : sweep, jugées gates.md § 5, `RAPPORT.md`, correction du Reflex 65 (« crème + Yeseva + accent d'hue 24 » levé sur le CSS bâti, pas sur le CSS aplati) : déplacer l'accent avant toute dérogation, `waive 65` est rejeté ; mettre à jour `agents/lecons`.
- Aucun `.fill` ni `data-placeholder` : rien d'inventé, aucun fait indispensable absent.

## Décisions et hypothèses
- Macrostructure d'origine gardée (Catalogue, une page) ; le Marquee Hero du draw n'est pas pris comme forme, seulement Counter et mast. Nav « search-led » du draw écartée (pas de recherche utile) ; recherche, compte, panier supprimés (lignes `dropped` dans `page.css` et `Nav.astro`).
- Sans outil de réservation : l'action est « Commander » (Order & Eat, URL de redirection du site) et le téléphone ; aucun faux formulaire.
- Horaires dits une fois, en fin de page ; la section horaires et adresse ne suit pas le hero (écart au draw, raison : gate 69).
- Non repris : e-mail (Gmail personnel), note Google 4,6 et nombre d'avis (non revérifiés), avis Takeaway (à citer mot pour mot avec attribution si la phase 2 veut une preuve : « Un vrai régal ! Autant a emporter que sur place ! », Takeaway, 01/11/2026, à vérifier), réseaux sociaux.
- Fautes du site corrigées à la copie (Biéres, vegitarian, Ouef, Pouple non repris) ; « Iki » classé en boissons sans catégorie de bière (nature non prouvée).
- Pièges : voir `agents/lecons/construction.md` (flatten CSS pour sloplint, `waive 65`, figcaption hors du slot).
