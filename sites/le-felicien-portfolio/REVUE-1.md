# Revue portfolio · Le Félicien · passe 1
Verdict : A_CORRIGER

Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une brasserie « à l'ardoise » : fond vert sombre, noms et prix écrits à la craie, onglets carte / midi / bar, suggestion du jour qui s'efface et se réécrit, barre fixe Réserver / Appeler / Événements.

Scores /10 :
- Design 7 : système cohérent sur les 7 pages (planches desktop et mobile relues), hiérarchie nette sur la carte ; l'accueil desktop laisse la moitié droite du hero vide et le corps de texte est petit (formules.png desktop).
- Usabilité 7 : 27 arrêts Tab distincts, focus `outline: solid 2px`, en-tête à trois liens sans burger, barre fixe lisible ; l'aperçu au survol ne suit pas le curseur (F1).
- Créativité 7 : l'écriture à la craie et la suggestion du jour sont propres à ce site ; la page salle repose sur six photos libres génériques, sans lien avec le lieu.
- Contenu 7 : 68 lignes de carte confrontées à `donnees.json` par script, 0 absent, 0 écart de prix ; horaires et JSON-LD justes ; quelques ajouts non prouvés et des répétitions (F2, F3).
- Technique 8 : 0 erreur console, 0 requête en échec, 0 lien interne mort, 0 débordement, 0 violation axe critique ou grave, LCP mobile 1,07 s (CPU x4 + 4G, 2 passes), CLS 0, loader 2,0 s.

Preuves : build `dist/` (00:29) antérieur aux captures QA (00:35), réutilisées ; en plus, un script maison (7 pages x 1440 et 390 px, axe-core complet de `node_modules`, contraste par nœud, débordement, console, liens) et trois scripts ciblés (clavier, reduced-motion, loader, LCP/CLS, formulaire, aperçu). Serveur propre sur le port 4741.

## Findings

### F1 majeur
- **F1-1 · L'aperçu photo au survol de la carte cesse de suivre le curseur** (desktop ≥ 1024 px). `src/motion/setup.ts:209` et `:211` : `gsap.to(box, { autoAlpha, scale, …, overwrite: true })` tue aussi les tweens `quickTo` de `x`, `y` et `rotate` posés ligne 201 à 203 sur la même boîte. Mesure (`rev1-fel-apercu3`) : 20 `pointermove` reçus, curseur à (596, 447), boîte restée à `translate(157.988px, 145.863px)`, rect `158, -52, 317 px` (visible, opacité 1) ; identique après un second déplacement. Capture `rev1-fel-apercu2.png` : la photo de pâtes s'affiche en haut à gauche de la fenêtre, coupée par l'en-tête, loin de la ligne « Linguine aux gambas rôties » survolée. Correction : `overwrite: 'auto'` (ou animer `autoAlpha`/`scale` sur un enfant `.apercu__in`, les `quickTo` restant sur la boîte). Même cause pour le focus clavier (`focus()` ligne 217 à 220 n'a plus d'effet après le premier affichage).

### F2 mineur
- **F2-1 · Une seule photo de pâtes de 2020 sert de vignette à trois plats différents** (Rigatoni jambon fromage gratinés, Cannelloni de volaille à la truffe, Linguine aux gambas rôties) et une photo libre de café illustre « Café gourmand (4 variétés) ». Mobile 390 : vignettes 56 x 56 px permanentes à côté de chaque ligne (`THUMBS` : même `apercu-pates.webp`, `alt=""`), sans mention « illustration ». `photos/index.json` indique que le plat est « probablement absent de la carte actuelle ». Un visiteur lit une photo de plat. Correction : retirer les vignettes de plats, ou les marquer « photo d'illustration » (légende ou `title`) ; la photo des pâtes reste utilisable comme ambiance dans la page salle, où elle est déjà signalée (2020).
- **F2-2 · « par téléphone » présenté comme mode de réservation** : `reservation/index.html` (« En ligne via Tablebooker, ou par téléphone »), méta description de la page (« … ou par téléphone au 081 39 53 23 ») et bouton « Appeler le 081 39 53 23 » dans le bloc Réserver. Le dossier donne le numéro comme contact et Tablebooker comme seul outil de réservation ; la procédure téléphonique n'est pas prouvée (leçon commune : procédure déduite = invention). Correction : « Réservation en ligne via Tablebooker » ; garder le numéro comme « Contact » sans promettre la prise de réservation.
- **F2-3 · Répétitions entre sections et pages** (audit : 9 WARN). Accueil et `histoire/` recopient mot pour mot l'accroche « Une brasserie pour tous, au cœur du Business Village Ecolys, ouverte 7 jours sur 7. » et les deux paragraphes « Lancé fin 2019 … » / « La brasserie a rouvert le jeudi 22 janvier 2026 … ». Sur `formules/`, « Menus à partir de 27 € hors boissons » / « dès 27 € hors boissons » apparaît trois fois (carte formule, bloc événements, pastille) ; « Entrée et plat 25 €, plat seul 18 € » est redit dans la note de l'onglet Midi de l'accueil et sur `formules/`. Correction : l'accueil ne garde qu'une phrase de teaser et renvoie à la page ; une seule mention du prix des banquets par page.
- **F2-4 · Accessibilité, violations axe modérées et à vérifier** (axe complet, 7 pages x 2 largeurs, absent du shoot du QA) : `region` sur `.etat` (bandeau d'état fixé hors de tout landmark) sur les 14 cas ; `aria-prohibited-attr` : `aria-label` sur `div.etat` (sans rôle) et sur 5 `div.ligne__in[tabindex=0]` (accueil, carte), 1 par page ailleurs ; `heading-order` sur l'accueil (h3 « Entrées · à partager » du panneau de carte). Correction : `role="region"` ou `<aside aria-label>` pour le bandeau, `role="group"` ou `role="button"`/retrait de `tabindex` pour les lignes, vérifier que les titres de catégorie (h3) suivent un h2 dans l'ordre du DOM (axe : « Heading order invalid » sur `#cat-entr-es-partager-carte`).

### F3 finition
- **F3-1** Doublon « maison » : nom + badge MAISON sur « Boulets à la liégeoise maison », « Vol-au-vent maison » (carte et bambins), planches carte et accueil. Retirer le badge ou le mot du nom.
- **F3-2** Ajouts non prouvés, mineurs : bambins « Midi et soir » (aucune plage donnée dans `donnees.json`, `menus`) et « avec frites ou pâtes » (frites seulement sur 3 lignes) ; `histoire/` « À eux deux, plus de trente années d'expérience » (le dossier cite la phrase du site sans dire qu'elle porte sur le duo) et « La carte reste celle des grands classiques » (continuité avant/après la faillite non établie). Reformuler au plus près du dossier.
- **F3-3** Accès : « informations à venir (non communiquées par la maison) » est visible côté public sur l'accueil : formulation interne. Écrire « Stationnement : à confirmer » ou retirer.
- **F3-4** « exemples de la semaine du 3 au 6 novembre » : date en dur tirée du PDF, marquée exemple mais déjà périmée au 10/11 ; passer à « exemples d'une semaine d'automne 2026 ».
- **F3-5** Typographie : horaires en `12h00` dans le bandeau et `12:00 à 14:00` dans les tableaux ; apostrophes droites (« L'Avenir », « d'Ecolys », « Jusqu'à ») ; unifier.
- **F3-6** Formulaire de réservation : méthode GET vers `reservations.lefelicien.be` avec nom et message en paramètres d'URL (non documentés côté Tablebooker, à ne pas envoyer à un tiers) ; le texte « formulaire de démonstration sans envoi » est honnête. Préférer un simple lien.
- **F3-7** Page salle : six photos libres sans rapport (grains de café, framboises) pour une brasserie ; marquées « photo libre d'illustration » et créditées (auteurs et URLs vérifiés sur `picsum.photos/id/<n>/info`), donc conforme, mais faible. À remplacer dès qu'une photo de salle existe.

### Faux positifs du QA écartés
- « Survol sans changement » sur `h-02` : onglet déjà sélectionné ; le survol d'un onglet inactif change bien (mesuré).
- 404 « sans title ni lang » : réponse brute de `serve.mjs` ; `404.html` a `<title>`, `lang="fr"`, un `h1`, noindex.
- `skipLinkFirst: false` : le premier arrêt Tab est « Aller au contenu ». « Pas de robots.txt / sitemap » : `robots.txt` et `sitemap-index.xml` présents dans `dist/le-felicien/portfolio/`.
- Contraste « à vérifier » (4 sur l'accueil) : script canvas par nœud texte, 0 nœud sous 4,5 (3 pour le grand texte) après défilement.

## Ce qui est bien (à ne pas casser)
1. La carte : 68 lignes, 0 écart de prix ou de nom avec `donnees.json`, formats « 10 € (2 pièces) / 16 € en plat » rendus correctement ; horaires et JSON-LD `Restaurant` (adresse, géo, 14 plages d'ouverture) conformes ; presse et réseaux avec les vraies URL du dossier.
2. L'honnêteté des données : « suggestion illustrative », capacité « selon L'Avenir (2026), à confirmer », photos libres créditées, mention « Maquette KYW, certaines données sont illustratives », un seul logo `kyw-footer`, `noindex, nofollow` sur 7 pages sur 7.
3. Technique et accessibilité de base : LCP mobile 1,07 s, CLS 0, loader 2,0 s au plus (masqué en mobile), reduced-motion (0 nœud masqué, 0 animation), focus visible sur 39 arrêts sur 40 testés (le 40e est le retour au document), onglets de carte fonctionnels, aucun débordement de 390 à 1440 px (mots géants contenus : `Range` 42 à 338 px sur 390).
