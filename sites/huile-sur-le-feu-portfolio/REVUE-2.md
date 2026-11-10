# Revue portfolio · L'Huile sur le Feu · passe 2
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans relire DESIGN.md) : un site d'huile d'olive et de flambage, ivoire et bordeaux, nom géant planté dans une flamme, houle d'huile entre les sections et frise d'horaires « marée » ; la carte et les huiles se lisent comme un menu de table.
Scores /10 :
- Design 8 : hero inchangé (nom pleine largeur, flamme), /histoire/ n'a plus de bloc vide (fiche de 68 px à 1440, `planche-1440-histoire.png`) ; la frise d'horaires est tronquée au bureau (F2-1).
- Usabilité 7 : 0 débordement de page et 0 cible < 24 px sur 7 pages x 4 largeurs (1440, 1024, 390, 320), 0 lien interne mort (25 liens) ; frise à défilement horizontal caché au bureau.
- Créativité 8 : loader, filet de flamme, frise « maintenant », gouttes ; la structure en bandes reste classique.
- Contenu 8 : notes internes, horaires de boutique inventés, « table de famille » : tout retiré (grep dist) ; faits, 2005, Pouilles et épicerie conformes au dossier ; il reste des espaces insécables absents et « truffe blanche ».
- Technique 8 : build OK (dist 16:22 postérieur à src 16:22), 0 erreur console, 0 requête en échec, axe : 0 serious ni critical sur 28 cas, seulement `region` moderate ; CLS mobile à recontrôler (F3-3).

Sources de preuve : dist (16:22:52) postérieur à src (16:22:24), réutilisé sans rebuild. `QA-revue2.md` absent (shoot encore en cours, accueil seul) : mesures par scripts maison (axe-core de node_modules, 7 pages dont `404.html` réelle x 4 largeurs après défilement à la molette, `Range.getClientRects` contre la fenêtre, cibles, console, requêtes, noindex, mention, logo `naturalWidth`), captures ciblées (`.shots-huile-sur-le-feu-portfolio-revue2-r/`, planches histoire et boutique, frise 4 largeurs), grep Python du dist.

## Vérification des corrections annoncées (REVISION-1)
| id | verdict | preuve |
|---|---|---|
| F1-1 bloc vide /histoire/ | CONFIRMÉ | `.media--vide` : 0 ; fiche Giuseppe 68 px (1440) et 53 px (390) ; `planche-1440-histoire.png` |
| F2-1 notes internes | CONFIRMÉ | grep dist « date du site », « bientôt en ligne », « Les prix sont ceux », « à confirmer », « association avec » : 0 ; les « (menu Gourmet) » restants sont des libellés de plat |
| F2-2 boutique | CONFIRMÉ | « Mardi au samedi » : 0 ; badge « Horaires du restaurant, affichés en bas de page » ; meta description sans « coffrets » (« Coffrets cadeaux (illustratif) » reste, marqué) |
| F2-3 histoire | CONFIRMÉ | « table de famille » : 0 ; galerie à 3 figures (oliveraie, façade, branche), portrait 05 absent ; la fiche Giuseppe n'a plus d'image |
| F2-4 aria-prohibited-attr | CONFIRMÉ | `<p class="citation" role="text">` ; 0 `aria-prohibited-attr` sur 28 cas axe |
| F2-5 horaires répétés | CONFIRMÉ | liste retirée de `Acces` (frise + pied) ; scrollWidth = largeur partout |
| F2-6 eyebrows / numéros | CONFIRMÉ en partie | numéros : 0 ; eyebrows 1 par page (2 sur accueil et réservation) ; chaque h1 garde son eyebrow (F3-4) |
| bonus F3-3 | CONFIRMÉ | « Voir le plan » sur accueil et réservation |

## Findings

### F0 / F1
Aucun.

### F2 (mineur)
- **F2-1 · Frise d'horaires tronquée au bureau, service du soir caché.** `src/styles/base.css:110-111` : `.maree__scroll { overflow-x: auto }` contient `.maree__grille { min-width: 44rem }` (704 px) dans une colonne de 437 px (1440), 387 px (1280) et 307 px (1024). On ne voit que 08h à 14h : les barres du soir (18h00 à 21h15) et l'étiquette « 23h » sont hors cadre (`right` 1485 à 1555 pour une fenêtre de 1440), sans barre de défilement visible (`maree-1440.png`). Seul 390 px est correct (`min-width: 0`). Absent de la revue 1, qui n'a regardé la frise qu'à 390 px. Correction : `min-width: 0` dès 1024 px, ou élargir la colonne (frise sur toute la largeur du bloc), ou échelle 11h à 22h.

### F3 (finition)
- **F3-1 · 0 U+00A0 dans le dist (7 pages)** : 59 « € » précédés d'une espace simple sur la carte, « Une question : », « « … » » (non traité, déjà F3-1 de la passe 1). Correction : U+00A0 dans `site.ts` et les pages.
- **F3-2 · Hovers inertes sur la carte** (passe 1 F3-2, non traité).
- **F3-3 · CLS mobile de l'accueil à recontrôler** : 0,12 à 390 px dans mon script (décalage de `.hero__bas` à 99 ms, 0,119, puis 0,013), alors que le QA donne 0,013 ; bureau 0,043. Écart de méthode non tranché, à remesurer par l'agent captures ; piste : réserver la hauteur de `.hero__bas` avant le chargement des polices.
- **F3-4 · Hero : 3 boutons empilés au bureau, eyebrow au-dessus de chaque h1** (passe 1 F3-4 et reste de F2-6, non traités).
- **F3-5 · « truffe blanche »** associée au toast et au carpaccio (accueil, huiles) alors que la carte dit « à la truffe » (passe 1 F3-5, non traité).
- **F3-6 · `region` (moderate) corrigé dans son attribution** : ce n'est pas le paquet KYW (son `<footer>` est un landmark) mais le `<div class="footer" role="group" aria-label="Coordonnées">` du site (7 pages) et, à 390 et 320 px, `.barre-mobile` (`<div aria-label="Actions rapides">` sans rôle). Correction : `role="contentinfo"` impossible (doublon avec kyw-footer) ; mettre le bloc de coordonnées dans un `<section aria-label>` ou `<nav>` et donner `role="region"` à la barre mobile.

## Contrôles passés
Build du dist postérieur à src ; `lang="fr"`, 1 `h1`, 1 `<footer>`, `noindex`, mention « Maquette KYW, certaines données sont illustratives », logo KYW (720 px chargé) sur 7 pages x 4 largeurs ; 0 erreur console, 0 requête en échec ; 0 débordement de page, 0 texte hors fenêtre hors frise ; 0 cible < 24 px ; liens internes 25/25 en 200, liens externes = dossier (Barestho, Facebook, Instagram, mailto, tel) ; histoire 2005, Pouilles, épicerie conformes au dossier ; LCP mobile 1,16 à 1,18 s (accueil, 4G lente, CPU x4).

## Ce qui est bien (à ne pas casser)
1. Le hero (nom pleine largeur, flamme, filet de flamme), mobile compris.
2. La page /histoire/ allégée : trois repères, fiche courte, galerie de trois images sans portrait ambigu.
3. L'honnêteté des données : placeholders marqués (illustratif), horaires de boutique renvoyés à ceux du restaurant, aucune invention.
