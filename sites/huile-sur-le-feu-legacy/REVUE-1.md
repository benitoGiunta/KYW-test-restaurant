# Revue legacy · L'Huile sur le Feu · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : un restaurant méditerranéen sobre, bordeaux et crème, ouvert sur la photo de flambage du site d'origine, qui range sa matière en petites tuiles (huile, pâtes, boutique, histoire) autour d'un seul appel : réserver.

Méthode : QA-revue1.md (captures 16:07, postérieures au dist 16:01, postérieur à src 15:48) réutilisé sans recapture complète ; un script maison (axe-core de node_modules, console, requêtes, débordement, cibles, balises, 6 pages x 5 largeurs 1440/1024/768/390/320, défilement à la molette) ; un script ciblé (CLS desktop x3 et sources, menu burger tactile à 390, Échap, reduced-motion sur 3 pages, Tab, survol CTA, jour courant) ; confrontation par script des textes et des prix à `donnees.json` et à `site-actuel/pages/*.txt` ; `sloplint --genre editorial --url` sur accueil et carte. Serveur port 4871, PID 29667, arrêté.

Scores /10
- Design 7 : palette bordeaux, crème, orange tenue, titres en Marcellus, hero plein cadre lisible (`d-01-hero.png`) ; mais la tuile « L'huile d'abord » garde ~175 px de vide sous 3 lignes (`d-04-scroll.png`) et la composition reste un bento classique.
- Usabilité 8 : « Réserver » dans la barre et en hero, burger qui s'ouvre et se ferme (Échap), jour courant marqué (« Mardi, Aujourd'hui »), rail de catégories de la carte ; 0 débordement de 1440 à 320 px, mobile pensé (hero, boutons pleine largeur).
- Créativité 5 : une seule idée (le flambage en hero), le reste est une grille de tuiles ; l'idée de l'huile choisie par plat n'est portée par aucun dispositif visuel propre (pas de lien plat-huile).
- Contenu 8 : 0 fait faux, 0 invention, 51 prix de carte identiques à `donnees.json` (seuls écarts : apostrophes typographiques), textes repris mot pour mot du site client, vouvoiement, 0 cadratin ; manques : pas de dates en dur, pas d'avis inventé.
- Technique 8 : build OK, 0 erreur console, 0 requête en échec, 0 lien mort (liens internes testés par curl, externes conformes au dossier), 1 h1 par page, `lang="fr"`, axe sans violation sauf `region` moderate ; LCP 520 ms bureau / 892 ms mobile (QA), CLS bureau 0,055.

## Findings

Aucun F0 ni F1 : tous les critères de publication « durs » sont tenus (build, console, liens, faits, inventions, débordement, axe critique, mention, logo, noindex).

### F2
- **F2-1 · pas d'image de partage (og:image)** : aucune des 6 pages n'a `og:image` (mesure script : `og=false` sur 6 pages x 5 largeurs ; `grep` du dist). `twitter:card=summary` sans image. Correction : ajouter `og:image` (photo 04 ou 03 en 1200 x 630, URL absolue sous le préfixe `/huile-sur-le-feu/legacy/`) dans `src/layouts/Base.astro`, et `og:image:alt`.
- **F2-2 · JSON-LD `Restaurant` sans horaires** : bloc de `index.html` (et des autres pages) avec adresse et geo mais ni `openingHoursSpecification` ni `reservation` ; le prompt § C attend adresse et horaires. Correction : ajouter Tu-Sa 12:00-14:30 et 18:00-21:15 (source `donnees.json` `horaires`) et `acceptsReservations` avec l'URL Barestho.
- **F2-3 · cibles de 21 px de haut sous pointeur fin** : 13 liens sur l'accueil (« Voir toute la carte » 131x21, « Voir la boutique » 115x21, « Découvrir la maison » 145x21, « Itinéraire » 65x21, liens de nav et de pied 52 à 158 x 21, e-mail 158x21), même liste sur chaque page, à 1440, 1024, 768 comme à 390 sans tactile. Le correctif de phase 3 ne joue que sous `(pointer: coarse)` (mobile tactile mesuré : seul « Réalisé par » 181x24, paquet KYW, hors périmètre). Correction : `min-height: 24px` (idéalement 32 px de zone avec `padding-block`) sur `.pied a`, nav, liens `.more`, hors media query.
- **F2-4 · axe `region` (moderate) sur `.pied`, 6 pages x 5 largeurs** : le pied du site est un `<div class="pied deep" role="group">` hors de tout repère (`Pied.astro:4`). Ne pas en faire un `<footer>` (doublon avec le `<footer class="kyw-footer">` du paquet, `landmark-no-duplicate-contentinfo`) ; le passer en `<section aria-label="Pied de la maison">` (ou l'inclure dans `<main>`).
- **F2-5 · photo répétée sur la boutique** : la page `boutique` montre « Étagères de la boutique (huiles, conserves) » (photo 14) en tête puis de nouveau dans la galerie de 3 (13, 14, 15) : même image deux fois dans l'écran (texte brut du dist). Correction : retirer 14 de la galerie ou remplacer par une autre photo de boutique, la galerie n'en a que 3 pour 3 emplacements ; si la boutique n'a pas d'autre photo, passer la galerie à 2.

### F3
- **F3-1 · CLS bureau 0,0554 sur l'accueil** (3 mesures identiques, seuil du prompt 0,05) : décalage unique de `.container.hero__in`, `.site-nav` et `.btn--flame` au chargement (changement de police Marcellus / Hanken swap). Correction : précharger les deux polices ou `size-adjust` sur la police de secours.
- **F3-2 · espace avant « : » sécable** : 2 occurrences sur l'accueil, 4 sur Restaurant, 1 sur la carte, 1 sur chaque autre page (espace U+0020 avant « : » : « la touche finale : truffe », « de hasard : une ville », « Photos : L'Huile sur le Feu »). Les € et les heures utilisent bien U+00A0. Correction : U+00A0 devant « : » dans `restaurant.astro`, `index.astro`, `Pied.astro`, `menu.astro`.
- **F3-3 · alt du hero accueil** : « Flambage d'une poêle, cuisine ouverte (hero actuel du site) » : la parenthèse décrit le site d'origine, pas l'image. Écrire « Flambage d'une poêle en cuisine ouverte ».
- **F3-4 · canonical de la 404** : `https://kyw-test-restaurant.vercel.app/huile-sur-le-feu/legacy/404/` (page inexistante) ; retirer le canonical de la 404.
- **F3-5 · tuile « L'huile d'abord » à moitié vide** : ~175 px de bordeaux sans contenu sous le texte (`d-04-scroll.png`, 1440) ; réduire la hauteur de la ligne de grille ou y poser la photo 06 / 08 (déjà utilisée sur Restaurant).
- **F3-6 · carte : densité** : `sloplint` carte = 1 FAIL (130 mots sur un écran), 15 sections, « Vins rouges / rosés » sans masse ; inhérent à une carte, à ne corriger que par des visuels de rubrique si le budget le permet. Accueil : 94 mots à y = 500 (WARN, sous 80 cible).
- **F3-7 · photo 01 (317 Ko) livrée dans `dist/photos` mais référencée par aucune page** ; idem 06 (264 Ko) hors Restaurant : inutile sur le poids transféré (non chargée), à purger du dist.

## Vérifié et conforme (ne pas rouvrir)
- Hypothèses : variante legacy = 6 pages (accueil, restaurant, menu, boutique, contact, 404) ; `/privacy` et `/cookies` du site d'origine non repris, sans objet pour une maquette.
- `404.html` réelle ouverte directement : title, lang, h1, liens 200, noindex. Les 2 violations axe du QA (document-title, html-has-lang) viennent de la réponse brute du serveur, pas du fichier.
- Texte : « Namur n'était pas un choix de hasard… », « rien à cacher », « Oliviers & Co, maison spécialisée… » viennent de `site-actuel/pages/restaurant.txt` (pas des inventions) ; « 21 ans plus tard » neutralisé (pas de date relative). 2005 conservé comme l'indique le dossier (Yelp 2002, Kompass 2007 à confirmer, signalé dans ETAT.md).
- Aucun e-mail, avis, note, chiffre ou procédure ajoutés ; la réservation = lien Barestho + téléphone, comme `donnees.json`.
- Pied KYW : un seul logo (`img[src*=kyw-signature]` = 1), mention présente, `noindex` sur les 6 pages ; `reduced-motion` : 0 élément à opacité 0 sur accueil, carte, restaurant ; Tab : lien d'évitement en premier, contour 2 px partout.

## Ce qui est bien (à ne pas casser)
1. Hero : photo de flambage sous voile bordeaux, titre en Marcellus et deux appels clairs, tout lisible sans scrim lourd (`d-01-hero.png`) ; le bouton orange passe de oklch(0.74 0.16 58) à une teinte plus claire au survol.
2. Nav : burger tactile qui s'ouvre sur un panneau plein, ferme à Échap, « Réserver » toujours dans la barre ; rail de catégories de la carte qui suit le défilement et défile en interne sans déborder.
3. Horaires : jour courant marqué (« Mardi / Aujourd'hui ») et fermetures lundi et dimanche explicites ; prix et heures avec espaces insécables.
