# Revue awwwards · El Greco · passe 1
Verdict : A_CORRIGER (0 F0, 2 F1, 5 F2, 6 F3)

Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une affiche de carte en grotesque condensée blanc cassé sur bleu nuit, où les titres géants semblent « s'étirer » à l'arrivée, avec des photos de stock de Grèce et un rideau corail entre les pages.

Preuves : QA-revue1.md (accueil, carte, 404 brute), planches `.shots-el-greco-awwwards-revue1/*/planche.png`, et un script maison (serve.mjs port 4871, `launch()`, axe-core de node_modules, 5 pages dont `404.html` réel x 1440/390/320 px, défilement par pas de 0,9 écran, console, requêtes, débordement, cibles, méta) dont les captures sont dans le scratchpad `rev1-elgreco/` (planches home/carte/histoire/reservation/404). Texte confronté à `donnees.json` : 62 plats et prix de `carte.ts` = 62 lignes, 0 écart (nom, prix, description). 115 liens locaux du `dist` résolus par script : 0 mort, 0 hors base. 0 erreur console, 0 requête en échec, 0 débordement de page, 1 `h1` par page, `lang="fr"`, `noindex, nofollow`, mention « Maquette KYW… » et un seul logo KYW sur les 5 pages, JSON-LD présent sur chaque page, 0 tiret cadratin.

Scores /10
- Design 7 : système typographique net et cohérent (planche carte desktop très lisible, navigation latérale active), mais bandes vides trop grandes sur l'accueil (cap. home-1440-01, -02, -04, -07).
- Usabilité 8 : carte, appel, horaires à deux clics, aucune cible < 24 px, 0 violation axe sauf le rail mobile (F1-2).
- Créativité 7 : l'idée « tout s'allonge » et la transition corail se voient, mais l'imagerie est entièrement du stock d'ailleurs (clocher, Santorin, église) ; aucun plat, aucune salle.
- Contenu 6 : faits exacts et honnêtes, mais une procédure déduite (réservation par e-mail) et des phrases de coulisses dans le texte client.
- Technique 8 : LCP mobile 0,9 s (accueil) et 1,5 s (carte), CLS 0, 60 fps, page 379 Ko ; un jpg de 520 Ko émis et inutilisé.

## Findings

F1-1 · T-invente (procédure) · `src/pages/reservation.astro:10` et `:20` · preuve : capture reservation-1440-00, texte « La réservation se fait par téléphone ou par e-mail ». Le dossier (`donnees.json` `reservation`) ne connaît que le téléphone et le bouton « Réservation » du site actuel ; l'e-mail comme voie de réservation (et le bouton « Écrire un e-mail » à objet « Réservation ») est déduit. Correction : « Pour réserver, appelez le 081 20 07 47 » ; garder l'adresse e-mail comme contact simple (sans objet « Réservation » ni promesse de traitement) ; garder « Page contact du restaurant » (URL du dossier, cible non vérifiée, à signaler comme à confirmer). Même vérification pour « Terrasse : citée par des clients » (acceptable, source avis du dossier).

F1-2 · Accessibilité (axe serious) · rail des crèmes (`index.astro:33`, `.cremes__piste`) · preuve : axe-core à 390 et 320 px, `scrollable-region-focusable (serious, 1)` ; à 1440 px 0 violation. Le rail défile horizontalement (« TARAM » coupé à droite, cap. home-390-02) sans être atteignable au clavier. Correction : `tabindex="0"` + `role="region"` + `aria-label` sur la piste (ou rendre les trois crèmes visibles sans défilement à 390 px, trois lignes empilées).

F2-1 · Texte de coulisses dans le texte du client · `src/pages/histoire.astro:16` (« nous ne le savons pas, et nous préférons ne rien inventer ») et `:30` (« Ce site lui emprunte seulement une règle de dessin : tout s'allonge ») · preuve : planche histoire 1440, blocs 2 et 4. Un client lirait un aveu de recherche et un commentaire de designer. Correction : supprimer les deux phrases ; garder un appel neutre (« Appelez le 081 20 07 47 »).

F2-2 · Fait hors dossier · `histoire.astro:29` · « Domínikos Theotokópoulos, peintre né en Crète, célèbre pour ses figures étirées vers le haut ». Exact dans le monde mais absent du dossier, et le texte avoue juste après que le restaurant ne dit pas d'où vient son nom : on suggère une origine du nom non prouvée. Correction : retirer la biographie, ou la marquer « illustratif » et ne pas lier le nom du restaurant au peintre.

F2-3 · Rythme vertical de l'accueil, bandes vides · preuve : home-1440-01 (≈ 420 px de fond bleu avant « Les crèmes »), -02 (≈ 300 px sous les crèmes), -04 et -07 (≈ 250 à 400 px sous « Six plats » et sous « Venir »), mobile home-390-04 et -07. Correction : plafonner `--aere`/padding des `.sec` (≈ 6 à 8 rem), supprimer les hauteurs minimales qui servent à l'effet d'étirement.

F2-4 · Imagerie sans rapport avec le restaurant · hero (clocher), mezze (terrasses de Santorin avec piscine), histoire (église). Marqué « illustration, pas le restaurant » partout, donc honnête ; mais aucune image de table, de plat ou de Bouge, et la photo de Santorin fait penser à un hôtel. Correction : à défaut de photo client, remplacer la photo de Santorin par un traitement typographique (le prix 31,90 € suffit) ou n'en garder qu'une ; noter dans RAPPORT « photos du lieu à fournir ».

F2-5 · Carte des crèmes : espace entre le nom et la description · preuve : home-1440-02 (nom en haut, description 150 à 200 px plus bas, décalée d'une carte à l'autre) et home-390-02. Peut être un état de reveal (contrôle par capture après 3 s non refait) ; si ce n'est pas un état d'animation, rapprocher la description du nom (gap ≤ 1 rem) et aligner les trois descriptions.

F3-1 · `public/`/`_astro` : `02-stock-santorin-terrasses.B_953AgT.jpg` (520 Ko) émis dans `dist/el-greco/awwwards/_astro/` sans aucune référence (grep 0 dans html/css/js) : alourdit `dist/` commité (stockage Vercel). Utiliser `getImage()`/le `Picture` sans conserver l'original, ou le supprimer du `dist`.
F3-2 · Typographie : espace simple (pas U+00A0) avant « : » et « ; » dans tout le site (ex. « Paiement : Espèces », « Ouzo revisité : cerise ») et à l'intérieur de « le Grec » (`histoire.astro:29`) ; risque de « : » orphelin à 320 px.
F3-3 · 320 px : `h1` « El Greco » (285 > 280 px) et « Réserver » (294 > 280 px) dépassent leur boîte de 5 à 14 px (`white-space: nowrap`), sans scroll de page ni coupe visible (marge de gouttière mangée). Réduire le `clamp` minimal du titre.
F3-4 · Répétition : « Depuis 1986, selon le site du restaurant » apparaît dans le hero, l'histoire (deux fois, texte et repère), la description méta et l'OG ; la section « Trois repères » (1986, 4,0 / 5, 30 €) reprend des chiffres déjà dits et le « 30 € » vient d'une source ancienne : garder un seul repère par fait.
F3-5 · Titre de la page histoire : h1 « Le Grec » alors que le menu et le `<title>` disent « L'histoire » ; incohérence légère de repérage pour un lecteur d'écran.
F3-6 · Textes secondaires (légendes, descriptions de plats, « Paiement ») très petits sur captures (≈ 11 à 12 px), contraste correct par construction (tokens 6,8 à 8:1) mais confort de lecture limité ; mesure `getComputedStyle` non faite, à relever à la révision. `contrastNeedsReview` : 13 (accueil), 63 (carte), 72 (carte, 390 px) sans violation ; non relus nœud par nœud.

Faux positifs écartés : la « 404 » du QA (réponse brute de serve.mjs, `color-contrast` et cible 128x20 px) : `404.html` réel mesuré à 1440, 390 et 320 px = 0 violation axe, 0 cible < 24 px, h1 « Trop long », noindex, mention et logo présents ; « no robots.txt / no sitemap » de l'audit (voir `sitemap-index.xml` dans dist, noindex sur chaque page) ; `skipLinkFirst: false` ; le texte « Trop long » de la 404 est un clin d'œil assumé du concept.

## Ce qui est bien (à ne pas casser)
1. La carte : 62 lignes exactes, navigation latérale sticky avec état actif, hiérarchie nette, prix alignés (planche carte desktop).
2. Honnêteté des données : horaires lundi à mercredi « à confirmer par téléphone », photos légendées « pas le restaurant », aucun avis ni équipe inventés.
3. Technique : 0 erreur, LCP mobile ≤ 1,5 s, CLS 0, focus et hover mesurés, pied KYW unique avec mention, 115 liens valides sous la base.
