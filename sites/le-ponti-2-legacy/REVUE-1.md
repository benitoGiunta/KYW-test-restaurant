# Revue legacy · Le Ponti 2 · passe 1
Verdict : A_CORRIGER (0 F0, 1 F1, 3 F2, 4 F3)
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : un site vitrine de trattoria en crème, bordeaux et or, à en-tête à trois parties, dont l'accueil est un sommaire de la carte en neuf rubriques, un encart « Menu 3 services 40 € » et un puits d'horaires avec état ouvert/fermé.

Preuves : QA-revue1.md est absent ; `.shots-le-ponti-2-legacy-revue1` (05:19) est postérieur au dist (05:16) et `src/` est plus ancien que le dist, donc réutilisé pour l'accueil (menu et 404 y sont en échec : « browser closed »). Menu, contact et 404 réel couverts par captures ciblées (1440 et 390) et 3 scripts maison (`/tmp/lp1/*.mjs`, via q.sh) : axe-core (wcag2a/aa, 21aa, best-practice) sur 4 pages x 1440/390/320, console, requêtes, débordement, balises, liens, Tab, menu mobile, 8 horloges, 99 plats confrontés à donnees.json.

Scores /10
- Design 7 : palette et typographie (Yeseva One + Archivo) cohérentes et chaleureuses, hiérarchie claire (d-01, m-01) ; affaibli par la grille de neuf cases dont six vides (d-03, d-04).
- Usabilité 8 : réservation visible partout, barre mobile 64 px, index collant de la carte, menu `<dialog>` OK (focus sur « Fermer », retour sur « Menu » après Échap), 0 lien mort, 0 ancre manquante.
- Créativité 5 : propre mais convenu ; la signature tient à un chiffre en grand corps dans un cadre vide, répété six fois.
- Contenu 8 : 98 plats sur 99 identiques (nom et prix), le 99e (suppléments pizzas) reformaté sans écart de prix ; aucune invention ; texte spécifique au restaurant, pas de filler.
- Technique 9 : 0 erreur console, 0 requête en échec, 0 débordement à 1440/390/320, LCP desktop 588 ms, LCP mobile 2 040 ms, CLS 0,018, poids max 192 Ko, `lang="fr"`, un seul h1, JSON-LD Restaurant complet, état d'ouverture juste sur 8 horloges.

## Findings

### F1 (majeur)
**F1-1 · Accueil, sommaire de la carte : six cartes sur neuf sont des cadres vides portant un gros chiffre** (`src/pages/index.astro` bloc `.cats`, `src/styles/page.css:59-61`). Preuve : d-03/d-04 (cases 416 x 312 px vides, chiffre 9, 13, 4, 3, 12, 12, 10), mesure `.cat__n` = 416x312 pour six cases ; m-02/m-03 : une case de 340 px de haut par rubrique, le texte utile (nom, plage de prix) passe sous le cadre. Le chiffre répète la ligne « 9 plats, de 12 € à 24 € » juste dessous. C'est le motif « grille de cartes égales » et « chiffres décoratifs » du § C, et la zone vide la plus grande de la page (environ 1 900 px de défilement mobile pour neuf liens). Correction attendue : remplacer les six cases numériques par des lignes typographiques (nom de rubrique en serif, sous-titre, plage de prix, flèche) dans une liste à deux colonnes, et garder les deux photos (pizzas, escalopes) en vignettes ; si le cadre est conservé, y mettre l'une des deux photos restantes (pâtes-900 est déjà utilisée en héros, la façade en bande) plutôt qu'un chiffre.

### F2 (mineur)
**F2-1 · Cibles tactiles < 24 px sous pointeur fin** : `081 30 40 75` 115x22 et 92x17, `Itinéraire` 62x17, `Leponti2@hotmail.be` 153x17, `Facebook` 71x17, liens « Le site » 52-57x17 (report.json `smallTargets`, 8 cibles ; le remplissage à 44 px n'existe que sous `(pointer: coarse)`). Les liens sont des listes séparées, pas des liens dans une phrase : l'exception WCAG 2.5.8 ne s'applique pas. Correction : `min-block-size: 24px` (ou `padding-block: 4px`) sur `.foot a` et `.lieu__adr a` quel que soit le pointeur.
**F2-2 · Axe `landmark-unique` (moderate) sur /contact/** : la section `.contact` et le pied `<section class="foot" aria-label="Coordonnées">` (`components/Footer.astro:5`) portent le même nom de région. Correction : renommer le pied « Coordonnées du restaurant » ou retirer le `aria-label` de la section de page.
**F2-3 · Cadrage du héros desktop et façade de nuit très sombre sur mobile** : le héros 1440 px coupe l'assiette et le verre (d-01, `object-position: 50% 62%`, hauteur 38 % de l'écran) ; la façade de /contact/ à 390 px est presque noire (contact-m-1 : la porte vitrée, sans l'enseigne), alors que l'enseigne est ce qui identifie le lieu (visible à 1440 px). Correction : `pos` de `contact__fig` vers l'enseigne (`facade-large.webp` recadrée sur l'enseigne en mobile) et un cadrage du héros qui garde le verre entier (`object-position: 50% 45%`).

### F3 (finition)
- **F3-1** Aucun `<nav>` : les liens d'en-tête sont dans un `<ul>` (`components/Nav.astro:9`) ; seul l'index de la carte est un `<nav>` (landmark non étiqueté sur /menu/). Envelopper dans `<nav aria-label="Principale">` et étiqueter l'index.
- **F3-2** Favicon vide (`<link rel="icon" href="data:,">`, `Base.astro:38`) : onglet sans icône ; `og:image` = photo de pâtes recadrée sans nom (ok pour une maquette).
- **F3-3** Texte : « pour un lunch ou un dîner » (index.astro:16, anglicisme ; le dossier dit « midi et soir ») ; descriptions de plats en 13 px (`.small`) et `.cat__meta` en 14 px, un cran sous le corps de 16 px, lisibles mais petits à 1440 px (menu-d-1). Aucun tiret cadratin, vouvoiement et ponctuation française corrects, espaces fines respectées.
- **F3-4** Survol : `noHoverChange: 1` et 6 réactions « color » seulement (soulignement ou fond) sur les cartes de rubrique ; `colorOnly: 6` dans le rapport. Ajouter un déplacement ou une bordure aux cartes.

## Vérifications sans écart
- Faits : adresse, téléphone, e-mail, horaires (mardi-dimanche 11 h 30-14 h 30 et 18 h 00-21 h 30, lundi fermé), Barestho, Facebook, menu 3 services 40 € (+ 7 €), compte et plages de prix par rubrique (20 pizzas de 14 à 23 €, 13 pâtes, 3 viandes 22-30 €, 8 escalopes 24-30 €) conformes à `donnees.json` ; aucun avis, récompense, année, chiffre ou citation inventés ; photos et alt décrivent bien la photo (pâtes, façade, pizza, escalope).
- Mention « Maquette KYW, certaines données sont illustratives. », logo KYW (un seul, `kyw-footer`) et `noindex` sur les 4 pages ; titres et descriptions uniques ; 404 réelle avec lang, title, h1, retour accueil/carte ; JSON-LD Restaurant avec adresse, géo et horaires.
- État d'ouverture sous horloge : lundi 13 h et 19 h « réouverture demain à 11 h 30 », mardi 10 h « ouverture à 11 h 30 », mardi 12 h « ouvert jusqu'à 14 h 30 », mardi 15 h « ouverture à 18 h 00 », mardi 21 h 45 « réouverture demain », dimanche 22 h « réouverture mardi », samedi 14 h 30 « ouverture à 18 h 00 » : tout est juste.
- Reduced-motion : `hiddenTextReduced: 0`, `movingReduced: false` ; axe : 0 violation à 1440/390/320 sur accueil, carte, 404, 1 moderate sur contact (F2-2) ; premier Tab = « Aller au contenu » sur chaque page, scrollY 0.
- Non vérifié : sloplint `--render` (échoue en root, noté dans RAPPORT.md), jury.

## Ce qui est bien (à ne pas casser)
1. La hiérarchie typographique et la palette crème/bordeaux/or, y compris l'encart brun « Menu 3 services 40 € » (d-05), lisible et bien contrasté.
2. La barre de réservation et le puits d'horaires avec état calculé juste (heure de Bruxelles, jour courant surligné) ; la barre mobile à 64 px et le menu `<dialog>` sains.
3. La carte complète (/menu/) : index collant, prix alignés, 0 écart avec le client, sans débordement à 320 px.
