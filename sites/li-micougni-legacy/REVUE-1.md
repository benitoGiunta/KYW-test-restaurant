# Revue legacy · Li Micougni · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une enseigne wallonne en bordeaux profond, lettrage gothique doré et plaque de titre posée sur la photo de salle ; la carte est lisible comme une ardoise (lignes à filets, prix en or).
Scores /10 :
- design 7 : palette bordeaux/or cohérente, plaque du hero et rail de la carte soignés (`d-01-hero`, `menu/m-02-scroll`) ; la grille de la vitrine casse la composition (F1-1).
- usabilité 8 : 0 débordement, h1 unique sur 8 pages, menu mobile et rail fonctionnels, focus visible (`k-*`), formulaire honnête (« Rien n’a été envoyé ») ; cibles de 21 px en pied de page (F2-3).
- créativité 7 : gothique + plaque + rail d'ancres, aucun motif d'AI slop relevé (pas d'eyebrow systématique, pas de trois cartes égales, pas de dégradé) ; pages Événement et À propos très sobres.
- contenu 8 : 50 plats, prix et descriptions de la carte recoupés avec `donnees.json` par script (0 écart) ; adresse, téléphone, e-mail, réseaux conformes ; horaires incertains marqués « heures à confirmer » ; deux formulations non prouvées sur la vitrine (F2-2).
- technique 7 : build `dist/` du 10/11 09:52, postérieur aux sources ; 0 erreur console, 0 requête en échec, 0 violation axe, 0 lien interne mort (contrôle des href/src/srcset sur 8 pages, 200 sur les 7 routes + 404 + PDF) ; LCP mobile 4,5 s sur la vitrine (F2-1).

Preuves : le fichier `QA-revue1.md` annoncé n'existait pas pour cette variante ; captures faites par moi, page par page en série (`.shots/lm-legacy-r1/<page>/`, `--hovers 3`, port 4471). Pages lues à l'œil : accueil, menu, contact, vitrine, événement privé (desktop + mobile). À propos : seulement mesures (`report.json`). Terrasse : HTML et texte relus, capture non terminée à la clôture (aucune mesure, voir ETAT.md).

## Findings
### F1 majeur
- **F1-1 · Vitrine, mosaïque desktop cassée** · `src/styles/page.css:189-190` (`.bento__lead` / `.bento__lead2`). Preuve : mesure Playwright à 1440 px, `.bento__lead` fait 1429 × 1072 px (x de 64 à 1493, soit au-delà de la fenêtre) au lieu de 8 colonnes (~860 px) ; les vignettes `.bento__t` (x 960, 416 × 520) le recouvrent, visible sur `vitrine-du-restaurant/d-02-scroll.png` et `d-03-scroll.png` (photo du saumon coupée, rouget et velouté posés dessus). Cause probable : `min-height: 100%` combiné à `aspect-ratio: 4/3 !important` sur un élément qui couvre deux rangées, la largeur est déduite de la hauteur. Correction : retirer `min-height: 100%` et l'`aspect-ratio` forcé sur `.bento__lead` (laisser la cellule de grille fixer la taille, `height: 100%` sur l'image avec `object-fit: cover`), puis remesurer que chaque cellule fait sa largeur de colonne.

### F2 mineur
- **F2-1 · LCP mobile de la vitrine 4484 ms** (`vitrine-du-restaurant/report.json`, mobile, ralenti ×4 + 4G lente, une seule passe ; les autres pages : 0,8 à 1,7 s). Élément : `img`, probablement la grande photo du saumon (la vignette de 1280 px, 188 Ko). Reconfirmer en deux passes en série après la correction F1-1 ; si confirmé, `fetchpriority="high"` et `sizes` correct sur la première image, ou serveur d'une variante 960.
- **F2-2 · Vitrine, affirmations non prouvées** · `src/pages/vitrine-du-restaurant.astro` : « ce qu’on y mange de nouveau, et l’aventure qui prend forme » et « Nos dernières nouveautés » présentent six photos de plats comme des nouveautés alors que le dossier ne date rien ; la description méta parle de « coulisses du lancement » et le titre de « la salle en photos » alors que la page ne montre aucune photo de salle ni de coulisses. Correction : titre de section neutre (« Les plats en photos »), chapeau tiré de la page d'origine sans la promesse de nouveautés, méta et title alignés sur le contenu réel.
- **F2-3 · Cibles tactiles sous 24 px** : « Toute la carte » 99×21, « Notre histoire » 98×21 (accueil, desktop et mobile), pied de page et page contact : « Itinéraire » 64×21, téléphone 124×21, e-mail 158×21, « Instagram » 71×21, « Facebook » 70×21, « limicougni.com » 93×18 (mobile, toutes pages). Correction : `min-height: 24px` (idéalement 44 px sous `pointer: coarse`) avec `display: inline-flex; align-items: center` sur `.foot a`, `.link`, `.lieu a`.
- **F2-4 · Mosaïque mobile avec trous** (`vitrine-du-restaurant/m-03-scroll.png`) : sur 2 colonnes, le velouté et le plat en bol restent seuls sur leur rangée, cellule vide à droite. Correction : passer à un nombre pair de vignettes sous 60 rem ou faire occuper la pleine largeur à la dernière.

### F3 finition
- **F3-1** Axe signale `contrastNeedsReview` : 3 sur l'accueil, 2 sur À propos (éléments à revoir à la main, probablement le texte sur la photo du hero et les légendes) ; non tranché faute de capture ciblée.
- **F3-2** Hover « couleur seule » pour les trois CTA testés de l'accueil (`report.json` → `colorOnly`) : acceptable en legacy, ajouter un soulignement ou un déplacement pour le bouton « Voir la carte » si possible.
- **F3-3** 404 : `<meta description>` identique à celle de l'accueil, pas de canonical (normal pour une 404 ; changer la description). La 404 n'a pas été capturée à l'œil.
- **F3-4** Photo du hero mobile : recadrage sur le mur blanc de la salle (`accueil/m-01-hero.png`), la salle n'apparaît qu'en bas ; décaler `object-position` vers le bas.
- **F3-5** Espaces verticaux généreux sur Événement privé (`evenement-privee/d-02-scroll.png`, `m-02-scroll.png`) et pied de page mobile (grands vides entre colonnes) ; la page Événement reste très mince (trois lignes de texte, deux photos).
- **F3-6** `sitemap-index.xml` publié sur un site `noindex` : sans conséquence, à ignorer ou retirer.

## Contrôles conformes (pas de finding)
Faits : nom, adresse (Rue des Brasseurs 110, 5000 Namur), téléphone +32 470 59 75 96, e-mail, Instagram, Facebook, carte (50 plats, prix recoupés), terrasse 30 couverts « toute l'année », « même les demi-fous » : conformes à `donnees.json`/`dossier.md`. Horaires : « Ouvert à partir de mardi soir 17 h jusqu’à dimanche 17 h » (FAQ du site) ; samedi inconnu rendu par « heures à confirmer » ; aucun faux avis ni chiffre inventé ; menu de la semaine « prix à confirmer ». Mention « Maquette KYW, certaines données sont illustratives. », `meta robots noindex`, un seul `kyw-signature` sur les 8 pages ; `lang="fr"`, un h1 par page, JSON-LD Restaurant avec adresse (sans horaires, ce qui est honnête), OG et title uniques. Poids : plus gros fichier 244 Ko (`grill-960.webp`), aucun > 300 Ko. Mouvement réduit : 0 texte caché, rien ne bouge. Aucun tiret cadratin ni tutoiement relevés dans le texte servi.

## Ce qui est bien (à ne pas casser)
1. La plaque du hero et la hiérarchie bordeaux / or / lettrage gothique : identité propre, rien de générique.
2. La page Menu : rail d'ancres sticky avec scrollspy, lignes à filets lisibles à 390 px, 0 écart avec les données.
3. Honnêteté du formulaire et des horaires (« Rien n’a été envoyé », « heures à confirmer »), aucune invention.
