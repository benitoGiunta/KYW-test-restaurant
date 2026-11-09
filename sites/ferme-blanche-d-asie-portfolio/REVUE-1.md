# Revue portfolio · La Ferme Blanche d'Asie · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : un menu défilant à l'horizontale (« le rouleau ») sur papier ivoire, avec un titre vertical sur la photo de la salle, qui évoque la table ronde à plateau tournant ; sobre et lisible, mais sans aucune photo de plat.

Scores /10
- Design 7 : papier ivoire, serif, hero photo plein écran et plan dessiné forment un ensemble cohérent (planche home) ; le plan SVG déborde sur ses traits et le rouleau repose sur des chiffres fantômes faute de photo de plat.
- Usabilité 8 : 12 arrêts clavier, 0 cible trop petite, appel et itinéraire visibles en bas de page, liens d'en-tête opérationnels ; pas de réservation en ligne, ce qui est exact (dossier : téléphone ou sur place).
- Créativité 7 : le rouleau et le titre vertical sont des idées propres au sujet (table qui tourne) ; la section « En images » et les numéros 01 à 06 sont du gabarit.
- Contenu 7 : faits, prix, horaires et menus conformes à `donnees.json` (aucun écart relevé) ; 3 ajouts non prouvés et une note de chantier visible sur le site public.
- Technique 8 : 0 erreur console et 0 requête en échec (6 pages × 2 largeurs), 0 débordement, aucun lien mort ; 1 violation axe modérée sur toutes les pages ; 4 images dépassent 300 Ko.

## Méthode
Build et captures de l'agent captures (`QA-revue1.md`, planches). Complété par un script maison (Chromium, axe-core complet de `node_modules`, débordement, console, requêtes, liens, balises) sur 6 pages (accueil, carte, maison, salles, réservation, `/404.html`) à 1440 et 390 px, serveur propre sur le port 4733 (PID 787, arrêté). Captures ciblées : « En images », plan, 404, salles mobile. Le QA ne couvrait que 3 pages et sa « 404 » est la réponse brute de `serve.mjs` : la vraie `404.html` est correcte (h1 « Le rouleau s'arrête ici », title, lang fr, 2 CTA, pied de page). Il dit aussi « pas de robots.txt ni de sitemap » : `dist/ferme-blanche-d-asie/portfolio/` contient `robots.txt` (Disallow: /), `sitemap-index.xml` et `sitemap-0.xml` (faux positif). `noindex, nofollow` conforme au prompt de production.

## Findings

### F0 bloquant
Aucun.

### F1 majeur
Aucun.

### F2 mineur
- **F2-1 · T-invente · « reste à la carte toute l'année »** (`src/pages/salles.astro:56`, section « Pour tous les jours »). Le dossier donne le menu découverte à 29 € (menu.php), mais rien sur sa disponibilité « toute l'année ». Correction : « Le menu découverte à 29 € par personne, cinq services dès deux personnes, est proposé à la carte. » (ou supprimer la fin de phrase).
- **F2-2 · T-invente · « avec vue sur la terrasse »** (`src/pages/maison.astro:29`, salle à poutres). Aucune source ne lie la salle à poutres à la terrasse ; seul `salle_vip` mentionne « accès à la terrasse ». Correction : supprimer « avec vue sur la terrasse » (garder « plus intime » seulement si on l'assume comme description de la photo).
- **F2-3 · Note de chantier publique** (`src/data/site.ts:98`, affichée sur `/salles/`, capture 390 px) : « Dessert au choix : le détail n'est pas lisible sur l'affiche d'origine, à compléter par le restaurant. » Un visiteur lit une remarque interne à l'agence. Correction : « Dessert au choix. » (le dossier dit exactement « dessert au choix »).
- **F2-4 · Plan SVG : texte sur les traits** (`src/components/Plan.astro`, captures `plan-390.png` et `plan-1440.png`). Le libellé « La Ferme Blanche d'Asie » (158 px de large dans le viewBox) dépasse le rectangle du bâtiment (≈ 60 px), croise son bord droit et le losange « Jardin et kiosque ». Mesuré par `getBBox` : 158 px à 390 et 1440. Correction : mettre le libellé sous ou au-dessus du bâtiment, ou le réduire à « Ferme Blanche » hors des tracés, et décaler le losange.
- **F2-5 · Deux numérotations concurrentes dans le rouleau** (`Rouleau.astro`, capture `d-02-scroll.png`). Le chiffre fantôme géant « 02 », « 03 », « 04 » est un rang, alors que « n° 81 », « n° 48 », « n° 49 » (minuscules, sous le nom) est le numéro de carte ; sous « Canard laqué », le « 02 » lu en premier est faux pour qui cherche son plat. Le menu découverte porte « 01 » alors que le n° 1 de la carte est le Potage piquant. Correction : faire du chiffre géant le numéro de carte (et masquer le rang), ou garder le rang et retirer « n° … » ; au minimum, aligner le compteur « 02 / 12 » sur la même logique.
- **F2-6 · Le rouleau « mots » : deux descripteurs vides ou inventés** (`src/data/site.ts:158-159`). « fruits de mer, casserole » répète le nom du plat ; « spécialité de la carte » (Plat royal n° 49) n'est pas au dossier (la ligne n'a pas de description). Correction : laisser le sous-titre vide pour ces deux plats, ou n'afficher que « n° 48 » / « n° 49 ».
- **F2-7 · Poids d'images** : `parking.webp` 343 Ko, `facade-jardin.webp` 339 Ko, `facade-kiosque.webp` 330 Ko, `terrasse.webp` 308 Ko (`dist/…/portfolio/photos/`). Page la plus lourde ~1998 Ko d'images (QA). LCP mobile de la carte 2256 ms (limite 2500). Correction : recompresser ces 4 images à ≤ 250 Ko (qualité WebP 72) ou les servir en 960 px sur mobile.
- **F2-8 · axe `landmark-no-duplicate-contentinfo` (modérée) sur les 6 pages** à 1440 et 390 px : `<footer class="footer">` du site et le pied de `kyw-footer` sont deux `footer` de premier niveau. Le QA ne la voit pas (axe de shoot.mjs). Correction : passer le pied du site en `<div class="footer">` (ou `<section aria-label="Coordonnées">`) et ne laisser que le pied KYW comme `contentinfo`, sans repeindre le composant `kyw-footer`.

### F3 finition
- **F3-1 · Téléphone écrit de deux façons sur la même page** : « +32 81 44 64 89 » (pied de page, `site.telephone`) et « 081 44 64 89 » (CTA « Appeler », réservation, emporter, salles). Correction : une seule forme, « 081 44 64 89 » (forme du dossier), `tel:+3281446489` conservé.
- **F3-2 · Ajouts d'usage non prouvés** : « repas de famille » pour la grande salle privée (`site.ts:119`, `salles.astro`), « Un coin salon … accueille avant ou après le repas » (`maison.astro:30`), « Les tables rondes » au pluriel alors que le dossier cite une salle à table ronde. Correction : « Pour les réceptions et les fêtes de groupe. » (l'accueil en parle déjà au conditionnel de la fête de fin d'année, à garder si la source « fêtes » est assumée), « Un coin salon avec canapés en cuir. », « La table ronde à plateau tournant se partage ».
- **F3-3 · Photo des salles** : « Salle V.I.P. » et « Grande salle privée » sont illustrées par `salle-ronde` et `salle-longue` ; le dossier ne dit pas laquelle est la V.I.P. (les `sujet` du `photos/index.json` sont neutres). L'alt est neutre, mais la légende suggère une identité. Correction : mention « photo illustrative » ou photos de salles non légendées.
- **F3-4 · Légende rognée en mobile** (planche, section « En images » à 390 px) : « Coin salon avec canapés en cu… » coupée par la colonne voisine. Correction : `overflow-wrap`/largeur de légende égale à celle de l'image.
- **F3-5 · AI slop léger** : numéros de section décoratifs « 01 » à « 06 » en rouge sous chaque titre (accueil, maison, salles, réservation) ; titre de section « Privées » (h2 découpé en lettres) sans le mot « salles » sur `/salles/`. À réduire à ce qui sert (compteur du rouleau) ; le chiffre fantôme du rouleau est assumé comme signature.
- **F3-6 · Vides** : grands blancs entre « En images » et « Venir » et dans `/salles/` mobile (≈ 150 px sans contenu, `390-salles.png`). Resserrer.
- **F3-7 · Rouleau sans photo de plat** : 12 plats uniquement en texte (aucune photo lisible au dossier : ETAT.md). Pas un défaut de fait ; à noter pour la phase suivante si le client fournit des photos.

## Vérifications sans écart
- Faits : adresse, téléphone, e-mail, horaires (lundi-vendredi, samedi jusqu'à minuit, dimanche 12:00 à 15:30), 56 références, menu découverte 29 €, Noël 45 €, réveillon 65 € et acompte 20 €, salle V.I.P. 26, grande salle 300, -10 % à emporter, paiements, langues, Facebook : conformes à `donnees.json`. 11 prix du rouleau recoupés avec `carte.json`. Resto.be « à confirmer » correctement signalé ; avis cités mot pour mot.
- Mention « Maquette KYW, certaines données sont illustratives » : présente sur 6 pages ; un logo `.kyw-footer__logo` par page ; `noindex, nofollow` sur 6 pages.
- `lang="fr"`, un seul `h1` par page, `<title>` uniques, description 124 à 159 caractères (63 sur la 404), OG image, favicon, JSON-LD `Restaurant` (adresse et horaires) sur chaque page.
- 0 erreur console, 0 requête en échec, 0 image cassée, 0 image sans alt, `scrollWidth` = fenêtre à 390 et 1440 sur 6 pages, 0 élément débordant hors conteneur masqué.
- Liens internes (5 pages) : 200 ; externes : Facebook du dossier, OpenStreetMap avec les coordonnées du dossier, `mailto:` et `tel:` corrects.
- QA : reduced-motion sans texte caché ni animation, 12 arrêts clavier, 0 cible < 24 px mobile, CLS 0, LCP mobile 1276 ms (accueil) et 2256 ms (carte). Les images partielles de « En images » sur les captures mobiles du QA sont l'état de révélation, pas un défaut (rendu complet après défilement, `img-390.png`).

## Ce qui est bien (à ne pas casser)
1. Le hero (photo de salle assombrie, titre vertical en serif, phrase « Une grande table asiatique, ronde, qui tourne et se partage ») et le rouleau horizontal, propres à ce restaurant.
2. Un contenu honnête : aucune note, récompense ni histoire inventée, menus de fêtes transcrits fidèlement, note Resto.be marquée « à confirmer », réservation par téléphone assumée.
3. La 404 « Le rouleau s'arrête ici », le pied de page (coordonnées, horaires groupés, bouton FB, bandeau KYW clair) et l'en-tête à 4 liens lisible à 390 px.
