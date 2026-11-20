# Revue legacy · Les Terrasses de Crupet · passe 1
Verdict : A_CORRIGER (0 F0, 0 F1, 3 F2, 8 F3 ; les critères PUBLIABLE sont tous tenus sauf une invention mineure non marquée, F2-1)

Lecture en une ligne de l'idée du site (avant DESIGN.md) : une brasserie de village sur fond brun-noir chaud, serif « Young Serif » crème et accent orange cuivré, photo de salle plein écran, carte à onglets lisible et réservation toujours à portée (bouton orange répété).

Scores /10 :
- Design 7 : palette cuivre sur noir cohérente avec les fauteuils orange du hero, hiérarchie nette (d-01-hero, d-05-scroll) ; un peu sage, aucune idée graphique propre au lieu (village, chalet).
- Usabilité 8 : « Réserver une table » en en-tête, hero, horaires, réservation ; burger mobile sobre (m-01-hero) ; contenu complet sans JS (6 panneaux d'onglets visibles, mesuré) ; liens de pied à 20 px de haut.
- Créativité 5 : mise en page classique (hero photo, deux colonnes, liste, galerie décalée) ; le chalet d'hiver et « Après-ski » (20-chalet-hiver-table) sont le seul trait distinctif et restent en bas de page.
- Contenu 8 : prix, plats, bières, vins, horaires et postes vérifiés contre carte.txt et donnees.json ; une procédure ajoutée (F2-1), peu de filler.
- Technique 8 : 0 erreur console, 0 requête échouée, 0 violation axe (accueil et 404.html réelle, à 390 et 1440), pas de débordement de 320 à 1440, un h1, lang fr, lien d'évitement, CLS 0,01, LCP mobile 776 ms ; polices Google non auto-hébergées.

## Findings

Preuves : QA-revue1.md (dist 04:14, QA 04:19, src antérieur : captures valides) ; planches et `d-/m-` de `.shots-terrasses-de-crupet-legacy-revue1/home/` ; mesures ciblées dans `.shots-terrasses-de-crupet-legacy-revue1/rev1/` (`404-1440.png`, `galerie-1440.png`) et `.logs/rev1-mesure.log` (5 largeurs, axe-core, cibles, h1).

**F2-1 · T-invente · `src/components/Reservation.astro:15`** : « Un bon cadeau peut s'offrir au restaurant. » Le site client dit seulement « Offrez un Bon Cadeau » (infos.json) ; le lieu d'achat est une procédure déduite (leçon commune : procédure = invention). Correction : « Des bons cadeaux sont proposés. » ou lien vers la page du site d'origine.

**F2-2 · 404 : pied KYW au milieu de l'écran** : sur `404.html` à 1440 × 900, la bande claire « Maquette KYW… Réalisé par » s'arrête à y = 591 et 300 px de noir restent dessous (`rev1/404-1440.png`). Le pied doit coller au bas de la fenêtre (`min-height: 100dvh` sur le conteneur flex, `main` en `flex: 1`). La 404 de `QA-revue1` est la réponse brute de `serve.mjs`, non représentative (leçon commune).

**F2-3 · Cibles tactiles < 24 px** : 6 liens de pied (Itinéraire 65 × 20, téléphone 93 × 20, e-mail 229 × 20, Facebook 72 × 20, Instagram 74 × 20, lien « lesterrassesdecrupet.be » 155 × 18), mêmes mesures à 320, 390 et 1440 (`rev1-mesure.log`) ; `report.json` : 6 cibles petites (desktop), 1 (mobile). Correction : `display: inline-block; padding-block: .5rem` (ou `min-height: 24px`) sur ces liens.

**F3-1 · Polices Google externes** : `fonts.googleapis.com` / `fonts.gstatic.com` (`layouts/Base.astro:35-36`), 5 TTF de 291 Ko au total (WARN audit), sans `preload`. Auto-héberger deux familles en woff2 (RGPD, rendu hors ligne, FOUT).

**F3-2 · Hero un peu mou** : `09-tables-fauteuils-orange.jpg` fait 1200 × 800 et s'affiche à 1440 × 828 (agrandie 1,2 ×, davantage au-delà de 1440), sous un voile sombre (`d-01-hero.png`). Texte lisible (axe : 3 « à vérifier » = texte sur photo, contrôlé à l'œil), mais l'image paraît floue. Option : photo d'une autre source plus définie ou voile plus léger.

**F3-3 · Galerie : vides noirs** : la bande décalée laisse ~330 px de noir au-dessus de la photo du milieu et ~130 px au-dessus de la première (`rev1/galerie-1440.png`) ; au premier regard, on croit à des images manquantes. Resserrer le décalage ou aligner les têtes de colonnes.

**F3-4 · Alt non prouvé** : `Apropos.astro:11` « La terrasse et ses tables, côté rue » : `photos/index.json` dit « terrasse tables », « côté rue » est ajouté. Écrire « La terrasse et ses tables ».

**F3-5 · Libellé « Job »** (`data/site.ts:23`, nav + sections) : anglicisme repris du site d'origine ; « Emploi » ou « Recrutement » en français.

**F3-6 · Cocktail « Maison 12 € »** sans contexte dans l'onglet Boissons (carte.json:169) ; la source dit « Maison ♥ » sous « Cocktails ». Écrire « Cocktail maison ».

**F3-7 · Horaires** : le site client précise « tous les jours durant les congés scolaires » ; le pied écrit « Tous les jours, 12 h 00 à 14 h 00 et 18 h 00 à 22 h 00 » sans nuance, et le dossier n'a pas levé l'ambiguïté. À confirmer avec le client ; en attendant, garder la formulation et la noter dans les hypothèses.

**F3-8 · Balises et finitions** : `twitter:card` absent (WARN audit) ; JSON-LD `Restaurant` complet (adresse, horaires, sameAs) mais sans `hasMenu`/`servesCuisine` détaillé ni `priceRange` (geo inconnu, donc absent à raison) ; hover sans effet sur 3 cibles sur 8 (onglet « À partager », Itinéraire, téléphone) ; médaillon du logo à 44 px (source 300 × 300) dont la ligne de texte est illisible. Robots/sitemap : WARN connus et sans objet (page `noindex`).

Pas de finding sur : `skipLinkFirst: false` (faux positif connu, `keyboard.stops[0]` = « Aller au contenu »), 404 brute sans h1.

Vérifié sans écart : nom, adresse (Rue Basse 13, 5330 Crupet), 083 655 111 (`tel:+3283655111`), e-mail, URL Zenchef rid 367820, Facebook, Instagram, prix de la carte (échantillon : plats, bières au fût, vins, cafés), menus de fêtes (37/44/53/59/69 €, retrait 24 et 31 décembre, 10 h à 15 h), postes ; liens internes et ancres (#apropos, #carte, #horaires, #job, #contact) 200/présents ; PDF 200 ; `noindex`, mention « Maquette KYW… » et pied KYW sur accueil et 404.

## Ce qui est bien (à ne pas casser)
1. Exactitude : carte et prix repris fidèlement, mention de prudence « Carte du 15 octobre, les prix peuvent avoir changé », aucun avis ni chiffre inventé.
2. Réservation omniprésente et mobile propre : en-tête « Réserver » + « Menu », CTA orange répétés, aucun débordement de 320 à 1440 (`m-01-hero.png`).
3. Robustesse : contenu complet sans JavaScript, 0 console, 0 axe, CLS 0,01, LCP mobile 776 ms.
