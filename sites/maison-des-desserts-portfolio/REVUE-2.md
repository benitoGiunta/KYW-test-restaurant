# Revue portfolio · La Maison des Desserts · passe 2

Verdict : A_CORRIGER

Lecture en une ligne de l'idée du site : un mur de flyers collés, une couleur d'aplat par famille de produits (pâtisserie, pain, chocolat, salon de thé, fêtes), titres en cases noires à italique Caslon, et un logo en cases qui gagne une case au nom de la section (inchangé depuis la passe 1).

Périmètre et méthode. `QA-revue2.md` n'existe pas (l'agent captures n'a rien déposé) : mesures refaites ici sur un build neuf (`pnpm build:site`, 6 pages, 04:39) et mon propre serveur (port 4793, PID 6581, arrêté par `kill`). Captures et mesures dans `.shots/mdd-r2/` (`mesure.txt`, `pl-r2-a.png`, `home-1440-manifeste.png`). Mesures : 6 pages x 1440, 390 et 360 px (axe-core complet, console, 4xx, débordement, h1, noindex, mention, logo KYW), 18 horloges simulées (`page.clock`, fuseau du navigateur forcé à Auckland pour prouver que l'heure de Bruxelles est bien utilisée), libellés de la page Fêtes à 390, 360 et 320 px, mots coupés de la carte à 360 px, contraste nœud par nœud de la page Contact, loader en deux passes, LCP/CLS sous CPU x4 + 4G lente en deux passes, reduced-motion sur 3 pages.

## Vérification des corrections annoncées par REVISION-1.md

| id | annonce | constat passe 2 |
|---|---|---|
| R-01 (F1) dates des Fêtes en mobile | corrigé | **Confirmé.** Libellés à 306 px de large à 390 px (50 px avant), une seule ligne, 0 libellé sous 120 px aux trois largeurs (390, 360, 320), `scrollWidth` = fenêtre, 0 texte qui déborde de son cadre. « Commandes de Noël », « Commandes du Nouvel An », « 20 décembre », « 31 décembre » entiers sur `fetes-390-lignes.png` et `fetes-360-lignes.png`. Carte à 360 px : les seuls retours à la ligne en milieu de mot sont sur des traits d'union ou barres (« fumé/épinards », « 2026-2027 », « Paris-Brest »), normaux. |
| R-02 (F2) état d'ouverture et jours de fêtes | corrigé | **Confirmé.** 18 horloges : 25/12 11 h « Fermé, ouvre demain à 8h » ; 20/12 10 h « Ouvert jusqu'à 17h » ; 20/12 17 h 30 « Fermé, ouvre demain » ; 31/12 16 h 30 « Ouvert jusqu'à 17h » ; 31/12 17 h 30 « Fermé, ouvre samedi à 8h » ; 01/01 « Fermé, ouvre demain à 8h » ; 21, 27 et 28/12 « Ouvert aujourd'hui (jour de fêtes) » ; 26/12 17 h 59 ouvert, 18 h fermé ; mer 23/12, jeu 24/12, mar 29/12 7 h 30, dim 22/11, mar 24/11 18 h : inchangés et justes. Les 2 éléments `[data-ouvert]` de la page (hero et pied) affichent le même texte. |
| R-03 (F2) axe | corrigé | **Confirmé** sur les 18 cas page x largeur : 0 `aria-prohibited-attr`, 0 `label-content-name-mismatch`, 0 `span[aria-label]` ; titres lisibles (« H1:La Maison des Desserts », h2 complets). Une seule violation axe restante : `color-contrast` sur Contact à 1440 px, déjà écartée en passe 1 : contraste nœud par nœud (canvas 1x1, opacité cumulée) sur les 51 textes visibles de la page, 0 sous le seuil. Faux positif d'axe (fond lu sur un autre calque). La 404 passe aussi à 0 violation aux trois largeurs. |
| R-04 (F2) « Depuis 1946 » | corrigé | **Partiel**, voir R2-01. Sticker et baseline corrigés (Histoire : « Chocolaterie née en 1946, pâtisserie et salon de thé au cœur de Namur »), bulle « Repère à confirmer · 1946 » et post-it « Date à confirmer » présents (`home-1440-manifeste.png`, `home-390-manifeste.png`). Mais la phrase de tête du manifeste affirme toujours « sous un même toit, depuis 1946 ». |

Aucune régression mesurée : 0 erreur console et 0 requête 4xx sur 18 cas, `scrollWidth` = fenêtre partout, 1 seul `h1`, `lang="fr"`, `noindex, nofollow`, mention « Maquette KYW, certaines données sont illustratives. » et un seul logo KYW de pied de page sur toutes les pages aux trois largeurs, 404 comprise. LCP mobile (CPU x4, 4G lente) 1016 à 1064 ms (deux passes, accueil et Fêtes) ; CLS 0,0166 (accueil, `hero__inner`, inchangé) et 0,0001 (Fêtes). Loader : `is-loaded` à 2,43 à 2,49 s (1440 et 390 px, deux passes, sans bridage), sous le seuil de 2,6 s mais avec peu de marge ; sous CPU x4 + 4G lente il dure 4,8 à 5,3 s (mesure bridée, non comparable au seuil). Reduced-motion : seuls restent à opacité 0 les 3 mots du loader et le compteur `sr-only`, aucun texte de contenu caché (accueil, Fêtes, Histoire). Les fichiers modifiés par la révision (`Footer.astro`, `Logo.astro`, `reveal.ts`, `base.css`, `site.ts`, `setup.ts`, `contact.astro`, `index.astro`) ne touchent ni `tokens.css`, ni `public/`, ni la carte : les F3 non traités sont donc inchangés.

## Findings

### F2 mineur
- **R2-01 · Le manifeste de l'accueil affirme encore « Pain, pâtisserie, chocolat et salon de thé, sous un même toit, depuis 1946 »** (`src/data/site.ts:107`, rendu `index.astro` hero du manifeste). La page contredit sa propre bulle juste à côté (« En 1993, elle ouvre le salon de thé et la pâtisserie de la rue Haute Marcelle ») et le dossier (`dossier.md:46-50` : 1946 = chocolaterie rue de Fer ; salon de thé et pâtisserie = 1993 ; « même toit » = bâtisse actuelle). Le post-it « Date à confirmer » atténue la date mais la phrase combine deux faits du dossier en un troisième que le dossier ne donne pas. Preuve : `home-1440-manifeste.png`. Correction : phrase neutre qui ne date pas la réunion des métiers, par exemple « Pain, pâtisserie, chocolat et salon de thé, sous un même toit, au cœur de Namur. » avec l'italique sur « au cœur de Namur », ou « Une chocolaterie née en 1946, devenue maison de pain, de pâtisserie et de salon de thé. » ; garder le post-it « Date à confirmer ».

### F3 finition
- **R2-02 · Exceptions de fêtes sans année** (`site.ts:158-167`, clés « MM-JJ ») : en 2027 le 21/12 (mardi) afficherait « Ouvert aujourd'hui (jour de fêtes) » à la place des horaires normaux, et le 20/12 une fermeture à 17 h. Acceptable pour une maquette datée « 2026-2027 » ; ajouter l'année 2026-2027 aux clés et limiter les exceptions à cette période avant toute mise en ligne réelle. Le 20/12 « ouvre à 8h » reste une hypothèse du réviseur (le dossier ne donne que la fermeture à 17 h).
- **R-05 (non traité, confirmé présent)** : apostrophes droites (accueil 8, carte 17, fêtes 8, histoire 2, contact 1, 404 3) et heures en 4 formats (« 18 h », « 18h00 », « 08:00 », « 18h »).
- **R-06 à R-09 (non traités, inchangés)** : accueil à quatre sections jumelles, texte à 11 px (`tokens.css:27`), sommaire de carte coupé à 1440 px, `og.jpg` à la façade de Noël.
- **R-10 (partiel)** : `REVUE-1.md` et `REVISION-1.md` décrivent maintenant ce site ; `FICHE.md` décrit toujours le gabarit « Collage » (autre restaurant, scène, brunch). À supprimer avant le commit de publication (hors `dist/`).

## Ce qui est bien (à ne pas casser)
1. La page Fêtes en mobile : libellé puis valeur empilés, lisibles à 320, 360 et 390 px, sans perdre le style mono des lignes (`fetes-390-lignes.png`).
2. L'état d'ouverture : calculé sur l'heure de Bruxelles quel que soit le fuseau du visiteur, aligné sur la page Fêtes, sans inventer d'horaire les jours où le dossier n'en donne pas.
3. L'honnêteté du contenu et la signature du logo à case de section : carte complète, 0 donnée inventée, repères de date signalés, accessibilité propre après la correction de SplitText (`aria: 'none'`) et du nom accessible du logo.

## Scores /10 (auto-score, pas de sous-agent critique : `self`)
Design 8, usabilité 8 (Fêtes mobile et état d'ouverture réparés), créativité 7 (métaphore du mur de flyers toujours limitée au logo, à la 404 et à un titre, R-06), contenu 8 (une phrase de manifeste à neutraliser, R2-01), technique 9 (0 erreur, 0 débordement, 0 violation axe réelle, LCP 1,0 s).

Décompte : F0 0, F1 0, F2 1, F3 5 (R2-02, R-05, R-06 à R-09 regroupés, R-10). Une seule correction (R2-01, une phrase dans `site.ts`) sépare le site de PUBLIABLE.
