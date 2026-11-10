# Revue legacy · Le 54 · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : papier chaud et encre, une plaque claire posée sur la photo noir et blanc de la salle, typographie serif posée, tout le contenu en colonnes sobres ; un site de table gastronomique calme, sans effet.
Scores /10 :
- Design 7 : hero 1440 (`home/d-01-hero.png`) net, plaque lisible, hiérarchie propre sur les 7 pages ; mobile 390 sans composition propre (voir F2-5) et pages intérieures très aérées, peu de contraste d'échelle.
- Usabilité 7 : 0 débordement (7 pages x 390/1440), Tab 1 = « Aller au contenu » partout, menu burger et CTA « Réserver » présents ; formulaire non relié (F2-3), cibles de 21 px de haut (F2-4).
- Créativité 5 : cohérent mais convenu (genre « atelier » calme), signature limitée à la plaque du hero et à la lettrine de À propos ; aucun slop (pas d'eyebrow, pas de trois cartes, pas de dégradé).
- Contenu 7 : horaires, adresse, téléphones, e-mail, prix 48/65 €, supplément wagyu 40 € et Royale/Impériale conformes à `donnees.json` ; 0 donnée inventée ; défauts de langue et de légendes (F2-1, F2-6).
- Technique 7 : build OK (7 pages), 0 erreur console, 0 requête en échec, 0 lien interne mort (6 liens, 14 pages x largeurs), LCP mobile 868 ms (home) et 1336 ms (carte) sous CPU x4 + 4G, CLS 0,026 (home, mesuré) ; axe : 1 serious + 1 moderate récurrents (F2-2).

## Findings
F0 : aucun. F1 : aucun.

**F2-1 · T-langue · « du Le 54 » / « au Le 54 » dans tous les titres.** Preuve : `<title>` et og:title « Menus du Le 54 : trois ou quatre services, à Dave », « À propos du Le 54 : … », « Contact du Le 54, … », « Photos du Le 54 : … », « Réserver une table au Le 54, à Dave », `og:description` carte (« Le menu du moment du Le 54 »). Contraction fautive devant un nom propre commençant par « Le ». Correction : « Menus du restaurant Le 54 », « À propos de Le 54 » ou reformuler sans article (« Le 54 : menus de trois ou quatre services, à Dave »), idem pour les 7 titres, descriptions et OG (src/pages/*.astro).

**F2-2 · A11y · `label-content-name-mismatch` (serious) et `landmark-no-duplicate-contentinfo` (moderate) sur les 7 pages x 2 largeurs.** Preuve : script axe-core, nœud `.nav__mark` ; `Nav.astro:9` `aria-label="Le 54, Dave : accueil"` alors que le texte visible est « Le 54 Dave » (la virgule casse l'inclusion) ; deux `<footer>` (`Footer.astro:5` `.foot` et `KywFooter.astro:12` `.kyw-footer`). Correction : `aria-label="Le 54 Dave, accueil"` (ou supprimer l'aria-label, le texte suffit) ; donner à `.foot` un `role="presentation"`/le passer en `<div>` ou `<section aria-label="Coordonnées">` pour qu'un seul `contentinfo` reste (ne pas toucher au composant `kyw-footer`). Le « 404 sans titre ni lang » du QA est faux : `404.html` a `lang="fr"`, `<title>` et un `h1`.

**F2-3 · Fonctionnel · formulaire de contact non relié.** Preuve : `contact/index.html` `<form method="post" action="" data-endpoint="">` ; `contact.astro:52` annonce après envoi « Rien n'a été envoyé : ce formulaire n'est pas encore relié ». Honnête, mais le visiteur remplit quatre champs avant de l'apprendre. Correction : afficher cette limite avant le formulaire (une phrase sous le titre « Écrire au restaurant », avec les téléphones et le `mailto:`) ou remplacer le formulaire par le `mailto:` et les téléphones.

**F2-4 · A11y · cibles tactiles de 21 px de haut (WCAG 2.5.8).** Preuve : mesure `getBoundingClientRect`, 390 px, home : « Le chef et la maison » 142x21, « Toute la carte » 99x21, « Voir sur la carte » 114x21, téléphones 115x21 et 124x21, e-mail 192x21, « Tous les horaires » 121x21, Facebook 70x21, Instagram 71x21, Photos 49x21, Menus 47x21, « le54dave.be » 76x18 (QA : 8 cibles < 24 px). Correction : `min-height: 24px` (idéalement 44 px sur mobile) via `padding-block` sur les liens autonomes de `.foot`, `.link` et des listes de contact.

**F2-5 · Responsive · hero mobile recadré sur le mur sombre.** Preuve : `home/m-01-hero.png` (390 px) : les deux tiers du hero montrent un mur noir et une plante, la salle et les tables (le sujet de la photo) sont rognées sous la plaque ; le desktop montre tout. Correction : `object-position` (≈ 70 % 60 %) sur l'image du hero sous 40 rem, ou hauteur du hero réduite pour que la plaque ne cache pas les tables.

**F2-6 · Contenu · légendes de photos qui annoncent des plats absents de la carte.** Preuve : `lacarte/` légende « Velouté » sous la photo (alt « Velouté mousseux, pièce rouge et herbes ») et accueil légende « Tartare » à côté du menu du moment (veau tonnato, wagyu, cochon de lait ou zarzuela, plaisir sucré) : ni velouté ni tartare ne figurent au menu du dossier. `photos/index.json` : « Velouté mousseux… (homard à confirmer) ». Correction : légendes neutres (« Une assiette de la maison », « Photographie : Le 54 ») ou retirer la photo de la page carte.

**F2-7 · SEO · JSON-LD `Restaurant` sans horaires.** Preuve : `index.html` JSON-LD (nom, adresse, geo, tél., e-mail, sameAs) sans `openingHoursSpecification` ni `priceRange` (leçon récurrente de la variante legacy). Correction : ajouter les horaires jeudi, vendredi, dimanche (12:00-14:00, 18:30-21:00), samedi (18:30-21:00), sans le lundi (à confirmer, dossier contradictoire) ; `priceRange` « 48 € - 65 € » (prix du site).

**F3-1 · `twitter:card` absent** sur 5 pages (audit `audit.mjs`) ; ajouter `summary_large_image` dans `Base.astro`.
**F3-2 · Polices.** `Base.astro:36-41` : Fontshare (Sentient) et Google Fonts (Hanken Grotesk) en feuilles externes bloquantes ; `Hanken Grotesk` reste `unloaded` hors ligne (repli sans-serif) ; l'audit relève aussi un `.ttf` livré (6 pages). Héberger en woff2 local avec `preload` des deux fichiers utiles.
**F3-3 · Mesure CLS.** Le QA relève 0,124 en mobile (accueil) ; ma mesure CPU x4 + 4G donne 0,026 (sources : `hero__in`, `nav__cta`, `nav__burger`, swap des polices). Sous le seuil de 0,05 ici, mais à surveiller avec F3-2.
**F3-4 · Contact.** « BE 437 634 306 » est le numéro BCE de la raison sociale « LE PERE MICHEL » (restaurants.json), affiché sous « Le 54 » sans nom légal : soit ajouter la dénomination, soit retirer la ligne.
**F3-5 · Extras.** Pas de `robots.txt` dans `dist/` (sitemap présent, ce que le QA dit absent est partiellement faux) ; phrase répétée contact/réservations (adresse, téléphones), sans gravité. « garniture estivale » (texte du client) figure sur une carte consultée en novembre : à signaler au client, pas à corriger.

Conformité vérifiée (7 pages x 2 largeurs, script axe-core de node_modules) : `noindex` oui, mention « Maquette KYW, certaines données sont illustratives » oui, logo KYW unique (`kyw-footer__logo`) oui, `lang="fr"`, un seul `h1`, un seul `main`, 0 débordement, 0 erreur console, 0 requête en échec, 0 violation axe critique, Tab 1 sur le lien d'évitement, aucun tiret cadratin. Les captures du QA ne couvrent que accueil, carte et 404 brute : À propos, Photos, Contact, Réservations relus par captures ciblées (1440 et 390), RAS visuel hors F2-4 à F2-6. Hypothèses : lundi « à confirmer » conservé (dossier contradictoire) ; JSON-LD sans horaires jugé F2 car la variante legacy vise le SEO local. sloplint non relancé (genre absent de DESIGN.md, auto-notation du constructeur : 0 FAIL).

## Ce qui est bien
1. Hero 1440 : plaque claire sur photo de la salle, titre et deux actions lisibles, rien ne se superpose (`home/d-01-hero.png`).
2. Horaires et carte rigoureux : lundi marqué « à confirmer », suppléments wagyu et Royale/Impériale exacts, aucune donnée inventée, jour courant mis en évidence.
3. Technique propre : 0 débordement, 0 erreur, 0 lien mort, LCP mobile < 1,4 s, états de focus visibles, mouvement réduit sans contenu masqué.
