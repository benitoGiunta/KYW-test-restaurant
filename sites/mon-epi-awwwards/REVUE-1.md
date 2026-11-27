# Revue awwwards · Monepi Boulangerie · passe 1
Verdict : A_CORRIGER
(0 F0, 3 F1, 6 F2, 3 F3. Build OK, 0 erreur console, 0 requête échouée, 0 débordement, 0 violation axe critique, 0 lien mort, mention + logo KYW + noindex présents. Les 3 F1 sont des erreurs de fait ou de sens visibles par le visiteur ; elles interdisent PUBLIABLE.)

Lecture en une ligne (avant DESIGN.md) : une boulangerie lue comme une mouture, le « taux d'extraction » (65 / 75 / 80 %) devient le motif graphique, la jauge d'en-tête et les barreaux, sur fond suie avec une flamme de four à bois.

Limites de cette revue : `QA-revue1.md` n'existe pas dans le dossier (aucune planche de l'agent « captures »). Preuves utilisées : captures du constructeur `.shots/{home,histoire,reservation}` (08:25-08:27, avant le dernier commit 8f31d2d1 de 08:28 ; rebuild `dist/` 08:31), `QA-build.md` (captures de 08:18, avant correction), et une capture ciblée de la carte par le relecteur (`.shots-mon-epi-awwwards-rev1/carte/`, bureau seulement ; `report.json` non arrivé à la clôture). Non vérifiés : carte et 404 en mobile après correction, contraste réel (axe « à vérifier »). Serveur propre port 4471, arrêté en fin de tâche.

## Scores /10
- Design 8 : concept tenu de bout en bout (75 % géant + flamme en arche, barreaux, titres Tanker en capitales, rythme suie / crème), `d-01-hero.png`, `m-01-hero.png`.
- Usabilité 7 : CTA tel clair partout, menu burger mobile OK, mais en-tête sans fond qui chevauche le contenu au défilement (F2-2) et deux liens à 22 px de haut (F2-3).
- Créativité 8 : un seul gag lisible (extraction = barreaux = jauge), jamais décoratif ; 404 « restée dans le son » cohérente.
- Contenu 6 : faits du dossier respectés, rien d'inventé (avis, e-mail, horaires hors vendredi absents), mais trois erreurs de sens sur les farines, le four et l'illustration sans gluten (F1-1 à F1-3).
- Technique 8 : 0 erreur, LCP mobile 0,88 à 0,94 s, CLS 0 à 0,02, FPS 60, reduced-motion 0 texte caché, tous arrêts clavier avec focus visible, poids accueil ~775 Ko dont images 649 Ko, og.png 143 Ko.

## Findings

### F1 (majeurs)
- **F1-1 · T-faux · Le four attribué à Dirk Longin depuis 1992 alors qu'il date de 2000/2002.** `src/pages/index.astro:63` : « C'est ce four que Dirk Longin conduit depuis la reprise de l'atelier, en 1992. » Le même site (histoire, repères) date le four « début des années 2000 » ; `donnees.json` : reprise 1992, four 2000 ou 2002. Preuve : `home/d-04-scroll.png` (phrase sous le titre « Un four breton »). Correction : « Dirk Longin conduit ce four ; il a repris l'atelier en 1992. » ou supprimer la dépendance « depuis ».
- **F1-2 · Illustration fausse de la rubrique « Sans gluten ».** `src/data/site.ts:82` : `photo: 'seigle'` ; alt « Un pain de seigle entier… » (`src/lib/photos.ts:34`). Le seigle contient du gluten : une photo de seigle au-dessus d'un pain sans gluten induit en erreur sur un allergène. Preuve : `.shots-mon-epi-awwwards-rev1/carte/d-06-scroll.png`. Correction : une autre photo non ambiguë (aucune photo de pain sans gluten dans `photos/index.json`) ; sinon retirer la photo de cette rubrique ou prendre un plan sans pain identifiable.
- **F1-3 · T-faux · Notes des quatre farines contredisant la carte du même site.** `src/data/site.ts:36` : blé blanc « pain de mie tendre, baguette, pistolet » ; baguette et pistolet sont en farine d'épeautre blanche sur la carte, et aucun pain de mie n'existe à la carte (donnees.json). `site.ts:38` : épeautre demi-gris « base de la viennoiserie » ; la carte affiche « farine d'épeautre blanche » pour toute la viennoiserie. `index.astro:43` : « Chaque pain de la carte part de l'une d'elles » ; faux pour le blé complet, le seigle complet, l'épeautre blanc et le sans gluten (la carte dit d'ailleurs « Farine complète » sans barreau). Correction : décrire chaque farine par les pains de la carte qui l'utilisent réellement (blé blanc : « Blé blanc, 800 g » ; épeautre demi-gris : « pur épeautre, épeautre + seigle ») et reformuler « La plupart des pains de la carte nomment l'une d'elles ».

### F2 (mineurs)
- **F2-1 · Mention interne affichée au visiteur.** `src/data/site.ts:92` : « (2000 ou 2002 selon les pages du site client) ». Note éditoriale destinée à l'agence, pas au client final. Correction : « Début des années 2000 : le four à bois breton est construit. » (garder l'incertitude dans DESIGN.md).
- **F2-2 · En-tête sans fond qui chevauche le contenu au défilement.** `reservation/d-05-scroll.png` : le titre « SUIVRE » passe sous les liens de nav et se mélange ; `histoire/d-06-scroll.png` : logo MONEPI sur une photo. Correction : fond suie à 85-90 % ou `backdrop-filter` sur l'en-tête dès le défilement.
- **F2-3 · Cibles < 24 px.** `reservation/report.json` : « Voir sur le plan (OpenStreetMap) » 263 × 22 (mobile 235 × 20), « Facebook » 80 × 22 (mobile 72 × 20). Correction : `min-height: 24px` (idéalement 44 px mobile) sur les liens de texte isolés.
- **F2-4 · Légende qui associe Dirk Longin à une photo d'inconnu.** `histoire` : photo `22-boulanger-four` (identité « non précisée par le site » selon `photos/index.json`) placée juste au-dessus de « Dirk Longin conduit ce four » (accueil) ; à l'accueil l'alt dit « Un boulanger ». Correction : ne pas placer le nom à côté de ce portrait, ou légende « Photo : atelier Monepi ».
- **F2-5 · Contraste non vérifié.** axe : 16 (accueil), 11 (histoire), 12 (réservation), 52 (carte, QA-build) éléments « à vérifier », beaucoup de petits textes gris sur suie (`d-02-scroll` carte : compositions en ~10 px gris). Mesurer et relever les gris secondaires ; `QA-build.md` signale aussi 1 violation axe « serious » sur la 404 (non détaillée, ETAT.md l'attribue au pied KYW du paquet : à confirmer, ne pas repeindre le paquet).
- (Dans F2) **Titre H1 « le pain tamisé à 75 % »** généralise un taux qui n'est que celui du demi-gris, et répète le « 75 % » géant juste au-dessus (`home/d-01-hero.png`) : « Monepi, pain au levain cuit au feu de bois » serait exact ; le 75 % est déjà le visuel.

### F3 (finition)
- Arche de la flamme coupée à plat en bas (`home/d-01-hero.png`) : voulu ou non, à cadrer.
- Texte du paragraphe d'accueil mobile coupé au bas du premier écran (`m-01-hero.png`), acceptable mais à surveiller.
- Audit : WARN « no sitemap » faux positif connu (`sitemap-index.xml` répond 200) ; `robots.txt` en `Disallow: /` (cohérent noindex).

## Vérifications positives (preuves)
- Faits : nom, adresse Rue Es Fays 43 5101 Loyers, tél. +32 491 18 29 35 (`tel:+32491182935`), vendredi 9 h à 18 h seul horaire, Facebook, prix et compositions de la carte conformes à `donnees.json` ; points de vente (Biomanie, Ferme de Graux, Bio&Co, L'épicerie d'Ernest) conformes ; aucun avis, e-mail ni note inventés ; citation L'Avenir 28/03/2016 conforme au dossier.
- Ton : vouvoiement, pas de tiret cadratin, pas de filler, `lang="fr"`, un seul h1 par page, `noindex, nofollow` conforme au prompt, JSON-LD `Bakery` (adresse, vendredi, geo), titres et descriptions uniques (accueil 51 caractères), OG présent, 404 designée (`404.html` répond 200 sous `/mon-epi/awwwards/`), liens internes tous 200 (`/`, `carte/`, `histoire/`, `reservation/`, og.png, favicon, robots, sitemap-index).
- Techniques : `scrollWidth` sans débordement, `smallTargets` accueil 0, clavier 12 arrêts avec focus visible, reduced-motion 0 texte caché.

## Ce qui est bien (à ne pas casser à la révision)
1. Le système « extraction » : 75 % géant + flamme en arche, barreaux de farine, jauge d'en-tête 65 à 80 % liée au défilement.
2. La carte : lignes à filet proportionnel, prix alignés, compositions complètes, fourchettes (« 4,00 à 8,00 € ») et l'honnêteté « pas de table à réserver, appelez ».
3. La rigueur de données : horaires limités au vendredi, « appelez avant de venir », aucun contenu fictif.
