# Revue gabarit nocturne · Les Potes au Feu · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : un bistrot de nuit, noir et ambre, dont les titres sont des tubes néon en contour, éclairés par une lampe qui suit le curseur, avec un badge « ouvert ce soir » vivant et une histoire qui se lit phrase par phrase.

Méthode : captures du constructeur (carte, cocktails, histoire, soirées, réservation, 404 : 17:16 à 17:20, antérieures au build de 17:41 : relues avec prudence), accueil et carte recapturés (`.shots-nocturne-revue/`), planches (`.shots-nocturne-revue/pl/`), mini-script Playwright à 390 px (h1, éléments cachés après défilement, débordement) et simulation de la date pour le badge. Auto-score : le critique aveugle de la skill jury n'est pas disponible dans une session d'agent.

Scores /10 (quality-bar)
- Design 7,5 : système typographique net (Panchang en contour pour les titres, Supreme en texte), palette noir/ambre tenue, volets du hero (`index/d-01-hero`), mosaïque éclairée par la lampe ; mais sous-pages au vide important et cartes de formules petites (`carte/d-02`).
- Usabilité 7 : 0 violation axe, clavier propre (skip link premier arrêt, focus visible `k-01`, `k-03`), mobile 390 px sans débordement, LCP mobile 1,2 s ; retranché pour le badge faux avant 19 h, le formulaire qui interdit le midi et les grands vides de hero sur sous-pages mobiles (`carte/m-01`).
- Créativité 8 : tubes néon + lampe + horloge de loader 19:00 → 21:00 + badge calculé, une idée qui ne se déplace pas chez un autre restaurant ; l'origin story en scène collante est plus convenue.
- Contenu 6,5 : texte spécifique et sans filler, aucun tiret cadratin ; points retirés pour les avis fabriqués, les « il y a quatorze ans » datés et deux formulations hors dossier.
- Technique 7,5 : 0 erreur console, 0 requête en échec, 0 lien mort (liens internes en 200), noindex partout, JSON-LD Restaurant, 404 avec h1 ; reduced-motion `hiddenText: 0`. Desktop fps 34 à 53 (GPU logiciel, plancher), CLS ≤ 0,019, page d'accueil 841 Ko.
Note pondérée : 7,4 (40 % design, 30 % usabilité, 20 % créativité, 10 % contenu).

## Findings (triés par gravité)

### F1 majeurs
- **F1-1 · T-faux · badge « ouvert » 30 minutes trop tôt.** `src/motion/setup.ts`, fonction `statut()`, ligne `m >= mn(c.ouverture) - 30`. Mesuré avec date simulée (Bruxelles) : vendredi 18:45 et lundi 18:40 affichent « Ouvert, dernier service à 21h » alors que le service commence à 19:00 (`donnees.json` : 19:00-21:00). Correction : `m >= mn(c.ouverture)` ; avant l'ouverture, afficher « Ouvert ce soir dès 19h ».
- **F1-2 · Fonctionnel · le formulaire de réservation interdit le midi.** `src/pages/reservation.astro`, `<input type="time" min={s.ouverture} max={s.fermeture}>` donne min 19:00, alors que mercredi et vendredi on sert de 12:00 à 14:00. Un convive ne peut pas saisir 12:30. Correction : pas de `min`/`max` globaux (ou 12:00 à 21:00), et mentionner que le midi existe mercredi et vendredi.
- **F1-3 · T-invente · avis clients fabriqués.** `src/data/site.ts`, `avis` : « Claire D. » et « Thomas V. », source « Avis Google », avec dates 2026 ; la fiche client indique `google.note: null`. Ils sont marqués (`placeholder: true`, pastille « illustratif », note sous le titre « On en dit »), mais la note fait 10 px et les noms plus la source donnent une apparence d'avis réels (`histoire/d-06`). Correction : les garder uniquement si le drapeau est lisible (pastille ambre par avis, déjà là, plus une note de corps normal) et retirer la source « Avis Google » (mettre « Avis d'exemple »), ou n'afficher que l'extrait MICHELIN.

### F2 mineurs
- **F2-1 · Badge, formulations.** Samedi 12:00 : « Fermé ce soir, prochain service lundi à 19h » (on est à midi) ; mercredi 10:00 : « Ouvert ce soir dès 19h » alors que le midi ouvre à 12h. Dire « Fermé aujourd'hui » / « Ouvert dès 12h ». À 21:00 pile le badge passe à « Fermé » alors que 21h est l'heure d'arrivée tardive (règle de la maison) : fermer à 21:00 est discutable, au moins pour le dernier arrivant.
- **F2-2 · « Rien de daté ».** « Il y a quatorze ans » dans `originStory[0]` (accueil, histoire) et `histoire[0]` : vieillira. Écrire « Un jour à la Plage d'Amée » ou « Avant 2019 ». « Guide MICHELIN Belgique 2026 » (millésime, F3 si le client le garde).
- **F2-3 · Hors dossier, drapeau absent.** Soirée « Privatisation du samedi » : « repas entre amis » (dossier : « mariage, chef à domicile ») avec `placeholder: false`. De même « on adapte » (promesse) pour allergies : le dossier dit « à signaler lors de la réservation ». Retirer « repas entre amis », remplacer « on adapte » par « à signaler ».
- **F2-4 · Boissons incohérentes.** `carte` : « Cocktail de la maison 12 € » et « Accord mets et vins 32 € » (drapeaux « illustratif » présents) contredisent les cocktails à 12 et 13 € de la page Cocktails et l'idée d'un bar sans carte publiée. Un seul jeu de données illustratives : retirer la catégorie Boissons ou la dériver de `cocktails`.
- **F2-5 · Équipe : deux gros rectangles gris vides.** `histoire` pour Sara et Jordan (`<figure aria-hidden>` sans image, `histoire/d-05`, `histoire/m-05` : bloc gris de 480 px de haut). Remplacer par une initiale en tube sur fond sombre ou un cadre « photo à fournir » drapeau, plus petit.
- **F2-6 · Sous-pages : le hero est à moitié vide.** `.hero--page` laisse environ 40 % du premier écran mobile noir sous le chapô (`carte/m-01`, `cocktails/m-01`, `histoire/m-01`) et, en desktop, tout le contenu reste dans le tiers gauche (`carte/d-01`), avec les formules coupées par le pli. Réduire la hauteur du hero de page (`min-height` plus bas) pour que la première carte ou la photo apparaisse dès l'arrivée.
- **F2-7 · E-mail illustratif utilisé comme action.** Bouton « Écrire » (soirées) et lien du pied de page en `mailto:bonjour@lespotesaufeu.be`, adresse inventée (marquée « e-mail illustratif »). Un test d'envoi partirait dans le vide. Garder, mais le marquage doit rester collé au bouton (c'est le cas en pied de page, pas sur le bouton « Écrire »).
- **F2-8 · Origin story, photo.** Le portrait de Damien en profil est noir à 70 % (`index/d-06-scroll`) : la photo ne montre presque rien et sert de support à la scène la plus longue. Choisir une photo plus lisible ou recadrer sur le visage.

### F3 finitions
- F3-1 : « Boeuf », « oeuf » sans ligature (`Boeuf confit`, `blanc d'oeuf`). `donnees.json` dit « Boeuf » : garder pour le plat client, corriger « œuf » du cocktail.
- F3-2 : « Cromesquis de pommes de terre » développe le « pdt » du client : acceptable, à signaler.
- F3-3 : le lien « YouTube » pointe vers une vidéo unique, pas la chaîne (dossier : chaîne « Les Potes Au Feu »). Libellé « Vidéo » plus exact.
- F3-4 : grille des formules en 3 colonnes avec 4 éléments : « Bon cadeau » seul sur la deuxième ligne (`carte/d-02`).
- F3-5 : la volet gauche du hero (portrait de la barmaid) est flou et très agrandi en desktop (`index/d-01-hero`) : choisir une photo plus nette.
- F3-6 : le formulaire de démonstration ne transmet ni nom ni message à Zenchef (ouverture d'un onglet en GET) : c'est dit (« sans envoi »), mais le bouton « Continuer sur Zenchef » laisse croire à un report des champs.
- F3-7 : pied KYW (« Maquette KYW, certaines données sont illustratives. Réalisé par ») très peu contrasté ; vérifier au passage `contrastNeedsReview` (14 sur l'accueil, 0 violation axe).
- F3-8 : le titre `h1` des sous-pages mobiles est de 33,6 px (contre 58,5 px sur l'accueil) : lisible mais discret, un cran de plus donnerait plus de présence.

### Constats vérifiés, sans défaut
- Hero vu : h1 « LE FEU, LA NUIT » à 390 px : top 356, bottom 467, visibilité visible, opacité 1, corps 58,5 px ; sous-pages : h1 à y 128, visibles. Après défilement complet à 390 px : aucun texte caché (seules 3 phrases de l'origin story sont à opacité 0 par conception de la scène collante, une phrase active à la fois ; en reduced-motion elles sont empilées, `hiddenText: 0`). `scrollWidth` 390 sur les 7 pages.
- Nom du pied de page : coupé (« LES POTES AU FE ») dans les anciennes captures des sous-pages, mais entier (`index/d-07`) dans le build actuel ; mesuré à 390 px : 12 à 374 px.
- Carte : les anciennes captures montraient un titre de catégorie à rallonge et des titres de formule qui débordaient de leur carte ; recapture (`carte/d-02`, `carte/d-03`) : corrigé (« Menu dégustation unique 4 services » + méta « 67 € du lundi au vendredi soir »).
- Faits : nom, adresse, téléphone, horaires, prix du menu et des formules, suppléments +7 € / +15 €, bon cadeau, réservation Zenchef rid=379477, Facebook, extrait MICHELIN : conformes à `donnees.json`. Horaires du badge : tous les cas simulés corrects sauf F1-1 et F2-1.
- Pas de tiret cadratin, vouvoiement respecté, « Maquette KYW… » et `noindex, nofollow` présents sur les pages testées.

## Ce qui est bien (à ne pas casser)
1. L'identité tube néon + lampe + loader horloge de service : reconnaissable sur un détail, cohérente de l'accueil à la 404 (« Lumière éteinte »).
2. L'honnêteté des données : chaque donnée illustrative porte sa pastille « illustratif » (cocktails, boissons, soirée au bar, e-mail), plus des notes de section.
3. La technique : 0 axe, 0 console, LCP mobile 1,2 s, mobile pensé (mosaïque en 2 colonnes, index de menu en lignes, aucun débordement).
