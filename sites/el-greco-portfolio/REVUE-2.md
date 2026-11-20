# Revue portfolio · El Greco · passe 2
Verdict : PUBLIABLE
Lecture en une ligne de l'idée du site (reprise de la passe 1, inchangée) : une maison grecque de quartier racontée par des objets bleus au trait et des tirages de photos de stock à déplacer, fond crème et bleu marine, carte complète, réservation par téléphone.

Méthode : `QA-revue2.md` n'existe pas (aucune planche de passe 2 fournie). Captures et mesures ciblées faites par moi sur le `dist/` courant (serveur port 4520, arrêté par `kill`). Build relancé : OK, 5 pages, `dist/` inchangé (git propre). Script maison (Playwright, axe-core 4.14 de node_modules après 3,5 s de repos) : 5 pages x 1440, 390, 360, 320 (console, requêtes, `scrollWidth`, débordement, h1, lang, robots, bord droit du dock) ; axe à 1440 et 390 ; navigation par clic dock à 390 et 320 ; horloge figée sous fuseau UTC ; reduced-motion x 4 pages à 390 (texte à opacité 0, cibles < 24 px, 4 premiers Tab) ; 121 liens locaux confrontés aux fichiers de `dist/` ; captures du pied de page à 320 et 1440.

Scores /10
- Design 8 : mot final « Kalí órexi ! » désormais entier, accent compris (pied de page vu à 320 et 1440), pied de page allégé ; accueil moins répétitif.
- Usabilité 8 : dock entier à 320 (bord droit 270/320, 4 liens), 0 débordement à 4 largeurs, clavier visible (outline 2 à 3 px), 0 cible < 24 px.
- Créativité 7 : inchangé, la signature (objets au trait, tirages saisissables) tient ; limitée par les photos de stock, assumées.
- Contenu 8 : title et OG corrects, plus de texte dupliqué, plus de promesse non sourcée, horaires allégés ; reste du filler hérité du site client (F3).
- Technique 8 : 0 erreur console, 0 requête en échec, 0 violation axe (1440 et 390), 0 lien mort sur 121, lang fr, 1 h1 par page, noindex partout, JSON-LD présent ; 2 avertissements GSAP sur l'accueil (F3-8).

## Vérification de REVISION-1 (une ligne par correction annoncée)
- **F1-1 débordement /carte/ mobile : confirmé.** `scrollWidth === innerWidth` sur les 5 pages à 1440/390/360/320 (20 mesures), et après navigation par clic dock (Carte, La maison, Réserver, Accueil) à 390 et à 320. Seuls dépassent la piste et les groupes du marquee, rognés par `overflow-x: clip`.
- **F2-1 title/OG : confirmé.** `<title>` et `og:title` : « El Greco | Restaurant grec à Bouge (Namur) », 0 « Bistronomie » dans `dist/`.
- **F2-2 dock 320 px : confirmé.** 4 liens (Accueil, Carte, La maison, Réserver) entiers, bord droit 270 px sur 320 (m-320 : f320.png).
- **F2-3 ouvert/fermé : confirmé.** Navigateur en UTC, horloge figée : vendredi 23:24 à Bruxelles : « Fermé aujourd'hui, prochain service samedi à 12:00 » ; jeudi 21:30 Bruxelles : « Ouvert, arrivée jusqu'à 22:00 » ; jeudi 22:30 : « Fermé aujourd'hui, prochain service vendredi à 12:00 » ; mercredi : « Horaires du jour à confirmer, appelez-nous » ; dimanche 11:30 : « Fermé en ce moment, ouverture à 18:00 » (dimanche 18:00 à 23:00 conforme à `donnees.json`).
- **F2-4 promesse de réponse : confirmé.** « Appelez-nous au +32 81 20 07 47, ou écrivez-nous. » ; plus de promesse de confirmation.
- **F2-5 texte dupliqué : confirmé.** Accueil : une phrase + « Toute l'histoire » ; /histoire/ garde le texte complet.
- **F2-6 horaires redondants : confirmé.** Pied de page : « jeudi à dimanche » + renvoi à la page Réservation (1 occurrence par page) ; le tableau complet n'est que sur accueil et réservation.
- **F2-7 « Kalí órexi ! » rogné : confirmé.** Mot entier à 320 et à 1440, la barre « Maquette KYW » le pose sur le bord sans masquer les lettres.
- Non traités par choix de la révision (F3) : voir ci-dessous.

## Findings

Aucun F0, F1 ni F2.

### F3 (finition, aucun ne bloque la publication)
- **F3-1 Apostrophes droites restantes (reprise de la passe 1).** « Toute l'histoire », « Ce qu'on partage à table » (`src/pages/index.astro`), « Cette table n'existe pas », « Retour à l'accueil » (404), « arrivée jusqu'à » et « Fermé aujourd'hui » dans `src/motion/setup.ts:54-57` ; le reste du site utilise ’. Uniformiser.
- **F3-2 « La carte de El Greco »** (meta description et og:description de /carte/) → « d'El Greco ».
- **F3-3 Citation Trustindex sans `[…]`** (reprise passe 1) : remettre la coupe et la minuscule d'origine, ou arbitrer la sélection 4 positifs sur 7 avec le client.
- **F3-4 Horaires non confirmés exposés dans le JSON-LD** (`openingHoursSpecification`, toujours présent) : acceptable pour une maquette, à retirer tant qu'ils ne sont pas confirmés.
- **F3-5 Format d'heure « 18:00 à 22:00 »** : usage belge « 18 h à 22 h », cohérent partout, donc finition.
- **F3-6 Légende de la 3e photo de /histoire/** : « Terrasses blanches d'Oia au-dessus de la mer (photo de stock, pas le restaurant) photo de stock » (double mention, toujours présente).
- **F3-7 Slogan « à partager, comme à la maison exemple »** : étiquette placeholder conforme, à arbitrer.
- **F3-8 Deux avertissements console « GSAP target  not found » sur l'accueil seul** (1440 et 390, aussi sous horloge figée ; 0 sur carte, histoire, réservation, 404). Non introduits par la révision : le diff de REVISION-1 ne touche dans `setup.ts` que `marquee()`. Cause probable : un `gsap.to/from` sur une sélection vide dans `src/motion/setup.ts` ou le chargement (les cibles `[data-loader-out]`, `[data-obj]`, `[data-carte-avis]` existent toutes, donc plutôt le rideau `.curtain__panel` ou la sortie du loader). Aucun effet visible ; à tracer en passant par `gsap.config({ nullTargetWarn: false })` seulement après avoir identifié la cible.
- **F3-9 Pied de page de /reservation/ : « Détail des horaires sur la page Réservation »** alors que le visiteur y est déjà. Masquer cette ligne sur cette page.
- **F3-10 `canonical` et `og:url` de `404.html`** pointent vers `/el-greco/portfolio/404/` (page inexistante ; `<meta noindex>` présent donc sans conséquence). À aligner sur `/404.html` ou à retirer.
- **F3-11 Filler hérité du client** : « célèbre avec passion et fierté les traditions culinaires familiales » (accueil et /histoire/) ; c'est une citation du site actuel, attribuée comme telle dans le dossier, donc à garder ou à reformuler avec le client.

## Ce qui est bien (à ne pas casser)
1. La signature : objets bleus au trait et tirages de photos à déplacer ; elle reste lisible à 320 px et l'état clavier (flèches) est conservé.
2. Le pied de page : un mot final entier, bleu plein, mention « Maquette KYW, certaines données sont illustratives » et logo « Réalisé par Know Your Website » discrets, présents sur les 5 pages.
3. L'honnêteté des marquages et la logique d'état : « de stock », « à confirmer », lundi à mercredi non inventés, libellé d'ouverture calculé sur Europe/Brussels et testé à 5 horaires.
