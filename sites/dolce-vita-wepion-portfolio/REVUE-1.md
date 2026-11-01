# Revue portfolio · La Dolce Vita (Wépion) · passe 1
Verdict : A_CORRIGER (0 F0, 0 F1, 6 F2, 8 F3)

Lecture en une ligne de l'idée du site (avant DESIGN.md) : une pizzeria italienne de Wépion en vert forêt, crème et tomate, dont le nom en grosses capitales condensées ouvre sur la façade, puis une pizza qui « lève » au défilement, une carte lisible et un compte à rebours du prochain service.

Méthode : QA-revue1.md et planche de l'accueil (agent captures), puis mesures ciblées de ma part sur les 5 pages que le shoot n'avait pas couvertes (pizze, histoire, à emporter, réservation, vraie 404.html) à 1440 et 390 px : console, requêtes, débordement, cibles < 24 px, alt, h1, contraste nœud par nœud (canvas 1x1 + opacité cumulée) sur les 7 pages. Texte du `dist/` extrait et confronté à `donnees.json`, `dossier.md` et `photos/index.json`. Serveur de contrôle local (port 4571), arrêté par `kill` du PID noté.

## Scores /10
- Design 7 : identité nette (vert/tomate/crème, capitales condensées, façade plein cadre, `d-01-hero.png`), mais portraits vides, numéros décoratifs et photo de pied répétée affaiblissent la finition.
- Usabilité 8 : navigation en 5 liens, état « C'est ouvert jusqu'à 22:00 » correct, 0 cible < 24 px, 0 focus invisible, 0 débordement de 320 à 1440 px ; un défaut de mise en page mobile sur les étiquettes (F2-1).
- Créativité 7 : la levée de la pizza et le compte à rebours sont propres au lieu ; le reste des pages suit un gabarit (eyebrow + titre + liste).
- Contenu 8 : 86 plats et 86 prix identiques à `donnees.json` (contrôle automatique, 0 écart), horaires, adresse, téléphones, e-mail, réseaux et 3 avis conformes ; aucune invention ; deux passages creux ou non étayés (F2-4).
- Technique 9 : build OK (7 pages), 0 erreur console, 0 requête en échec sur 8 pages, 29 liens internes tous en 200 et sous le préfixe `/dolce-vita-wepion/portfolio/`, aucune image > 300 Ko, CLS 0,001, LCP mobile 1384 ms, un seul h1 par page, JSON-LD `Restaurant` avec adresse et horaires sur chaque page, noindex, mention et un seul logo KYW partout.

## Findings

### F2 (majeurs légers, à corriger)
- **F2-1 Étiquette coupée en pleine syllabe sur mobile.** Pizze n° 12 : « VÉGÉTARIE / N » (planche `m-sheet0` colonne pizze, 390 px). Cause : `.fiche__nom { overflow-wrap: anywhere }` (`src/styles/base.css:159`) s'applique aussi à `.fiche__tag`. Correction : `.fiche__tag { display: inline-block; white-space: nowrap; overflow-wrap: normal }` (ou étiquette sous le nom à 390 px) ; contrôler « Quattro formaggi » et « Végétarienne » à 390 et 320 px.
- **F2-2 Portraits vides en grand format (accueil, histoire).** Deux cartes vert foncé avec une initiale « A » de 144 px et « Photo à fournir » (`src/pages/histoire.astro:50`, bloc « Les gens » de `index.astro`) : la page donne l'impression d'être inachevée, et c'est ce qui est vu en premier dans « L'équipe ». Correction : remplacer par une liste de texte (nom, rôle) sans cartes tant qu'aucune photo n'est fournie, ou cartes réduites sans initiale géante. L'initiale (contraste mesuré 2,33, `aria-hidden`, purement décorative) disparaît avec ce changement.
- **F2-3 Pizze numérotées 01 à 24 dans des disques (chiffres décoratifs).** `src/pages/pizze.astro:33` (`disque={String(n).padStart(2,'0')}`). `donnees.json` ne contient aucun numéro de pizza : le site fait croire à une numérotation de carte (un client dira « la 5 » au téléphone) et reprend le motif « chiffres 01/02/03 décoratifs » du prompt § C. Les compteurs `cat__num` (06, 05, 03, 02) ajoutent le même bruit. Correction : disque sans chiffre (initiale, ou la photo ronde quand elle existe, comme sur l'accueil), et supprimer ou réduire les compteurs d'en-tête de section aux seules listes où le total aide.
- **F2-4 Texte creux et affirmation non étayée sur « À emporter ».** « Pizze, pasta et dolci voyagent aussi bien que la carte est longue. » (page à emporter, chapeau) est du remplissage, et « Les plats de la carte se prennent aussi à emporter » généralise : le dossier ne dit que « livraison gratuite dès 2 plats, 18h à 22h ». Correction : « À emporter : livraison gratuite dès 2 plats, de 18 h à 22 h. » puis le contact du restaurant (déjà présent) ; ne rien ajouter sur la procédure de commande.
- **F2-5 Loader long sur mobile.** `report.json` : `loaderMs` 2470 ms au bureau (sous le seuil), 3006 ms en mobile ralenti (CPU x4, 4G lente), page « réglée » à 5367 ms. Mesure d'une seule passe (celle du QA), à confirmer en deux passes en série ; au-delà de 2,6 s le prompt § C classe le loader en défaut. Correction : plafonner à ~2,2 s sur mobile, ou ne le jouer qu'à la première visite de la session.
- **F2-6 Même photo répétée.** « Ce qui nous anime » (histoire) affiche la salle au mur olive, puis le grand pied de page avec le nom et la même photo juste dessous ; sur la réservation, à emporter et la 404, le pied reprend cette photo (réservation mobile : photo de salle et pied avec la même salle l'une sous l'autre, planche `m-sheet0`). Correction : photo de pied différente (néon, terrasse) ou pas de photo dans le pied quand la page en montre déjà une.

### F3 (finition)
- F3-1 Format d'heures incohérent : « 12:00 à 14:00 » (horaires, services) mais « 18 h à 22 h » (à emporter, méta description). Choisir « 12 h à 14 h » partout (vouvoiement et typographie française).
- F3-2 La 404 déclare `rel="canonical"` vers `…/portfolio/404/` qui n'existe pas (`dist/…/404.html`). Retirer le canonical de la 404.
- F3-3 Eyebrow au-dessus du titre de chaque page (« Pizzeria », « Notre histoire », « À emporter », « Réserver ») : motif générique du prompt § C ; garder au plus l'accueil.
- F3-4 « Ce qui nous anime » (histoire) garde des puces de liste par défaut alors que le reste a reçu un traitement dédié (ETAT.md : puces retirées ailleurs).
- F3-5 Survol : changement de couleur seul sur « La carte » et « Toutes les pizze » de l'accueil (`report.json`, hover) ; ajouter un soulignement animé ou un déplacement de flèche.
- F3-6 Images molles : façade du hero (poster 960 px étiré en 1440, `d-01-hero.png`) et pizza zoomée de la levée à 390 px (`m-02-scroll.png`, variante 960 px). Servir les variantes 1800 px / 1600 px déjà présentes dans `public/photos/` à partir de 768 px de large pour ces deux images.
- F3-7 Libellés abrégés repris du client sur l'ardoise : « Esc. Panée, jambon, mozza., crème tomate et chicons » (carte). Développer (« Escalope panée, jambon, mozzarella… ») sans changer le sens.
- F3-8 Le filet tomate `levee__rail` sous l'en-tête mobile se lit comme un indicateur d'onglet actif sous « La carte » / « Pizze » (`m-02-scroll.png`) ; le placer en haut de l'écran ou le masquer sous 768 px.

## Écarts du QA écartés (faux positifs, rien à corriger)
- Axe sur la « 404 » (`document-title`, `html-has-lang`) : réponse brute de `serve.mjs` ; `404.html` réelle : `lang="fr"`, `<title>` « Page introuvable | La Dolce Vita », un h1.
- `skipLinkFirst: false` : le lien « Aller au contenu » existe (premier texte du `<body>`) ; WARN robots/sitemap : présents dans `dist/dolce-vita-wepion/portfolio/` (`robots.txt`, `sitemap-index.xml`) ; `Disallow: /` et `noindex, nofollow` conformes au prompt § 3.3.
- Contraste « à vérifier » d'axe (44 accueil, 32 carte) : après défilement à la molette, 0 nœud sous le seuil sur la carte et sur les 5 autres pages ; sur l'accueil seule reste la légende de la levée, en fondu volontaire (`opacity: calc(1 - var(--p) * 2)`), et l'initiale décorative (F2-2).
- WARN « phrase répétée » (horaires) : le bloc d'horaires est répété dans le pied de page de chaque page, voulu.

## Ce qui est bien (à ne pas casser)
1. Exactitude : toute la carte (86 plats, 86 prix), les horaires (mardi fermé, mercredi et samedi soir seulement), les deux téléphones, l'adresse, les réseaux et les avis de Google (initiales comme sur le site client) correspondent au dossier ; réservation « téléphone uniquement » respectée, pas de faux formulaire ; aucune note ni nombre d'avis inventé.
2. Signature : la levée de la pizza (scrub) et le statut « C'est ouvert jusqu'à 22:00 » / compte à rebours donnent un site propre à ce restaurant, avec reduced-motion en état final lisible (0 texte caché).
3. Robustesse : 0 erreur console, 0 débordement, 0 cible trop petite, focus visibles, JSON-LD complet, mention KYW, un seul logo, noindex sur 7 pages sur 7.
