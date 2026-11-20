# Revue portfolio · Café Fleuri · passe 2
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une journée en cinq moments (9h, 10h30, 12h, 14h, 16h) où le ciel, la couleur et l'astre (une tasse rouge) suivent l'heure réelle ; idée intacte après révision, 6 pages cohérentes.

Base de la passe : dist (02:38) postérieur à src (01:34) ; QA-revue2.md (02:46) postérieur au dist, réutilisé (accueil, carte, 404 brute ; build 6 pages OK, audit 0 FAIL). Mesures maison complémentaires : 6 pages x 5 largeurs (320, 390, 768, 1024, 1440), molette, axe-core (390 et 1440), `Range` contre fenêtre, LCP/CLS CDP (CPU x4, 4G lente, 2 passes), reduced-motion 4 pages, 173 liens/ressources internes testés dans dist, captures ciblées (accueil, brunch, réservation à 390 ; réservation à 1440).

Scores /10
- Design 7 : thèmes aube / midi / goûter / nuit toujours distincts, « Nous trouver » propre (capture res-d) ; photos libres peu liées au lieu (oignon rouge sur Histoire) et chips du hero mobile « 12h Le déj » toujours coupées (home-m).
- Usabilité 7 : « Horaires et contact » remplace « Réserver », la page dit clairement qu'aucun outil n'est connu, 0 lien mort ; flèches de jour de 14,6 x 44 px à 768 (F2-1).
- Créativité 8 : horloge réelle, astre et ciel inchangés et visibles dès le premier rendu.
- Contenu 6 : horaires brunch, prix, source, emporter, procédure et téléphone corrigés ; le statut probable de fermeture reste absent du site (F1-1), un chapeau inventé reste à midi (F2-2).
- Technique 8 : LCP mobile bridé accueil 1296 et 1296 ms (avant 5320), histoire 1752/1736 (avant 3448), brunch 1888/1916, carte 1180/1172, réservation 1192/1212 ; CLS ≤ 0,016 ; 0 erreur console, 0 requête en échec, 0 débordement (scrollWidth et Range, 30 contextes), reduced-motion : 0 texte à opacité 0, `p[aria-label]` = 0.

## Vérification des corrections annoncées (REVISION-1.md)
| id | résultat | preuve |
|---|---|---|
| F1-1 LCP | confirmé | mesures ci-dessus, élément LCP de l'accueil = P (texte), plus l'image |
| F1-2 horaires brunch | confirmé | réservation : « Brunch ILLUSTRATIF 10:30 à 14:30 » ; brunch « dès 10h30 » ; `09:00 à 14:30` absent |
| F1-3 statut | non corrigé (arbitrage laissé) | voir F1-1 ci-dessous ; seul RAPPORT.md en parle |
| F2-1 prix mixte | confirmé | « Brunch mixte : un peu de chaque » sans prix ; 21,95 € seulement dans les formules (carte), libellé « Prix relevé dans un guide ancien, à confirmer » ; 11,95 € petit-déjeuner conforme à donnees.json |
| F2-2 source/plateau | confirmé | carte : « annuaire en ligne », plateau « plutôt à l'apéritif du soir selon l'annuaire », plus de plateau au déjeuner ; pancakes retirés du goûter |
| F2-3 emporter | confirmé | `emporter` : 0 dans les 6 pages ; goûter = limonade, thé glacé, mardi étudiants |
| F2-4 procédure | confirmé | « Aucun outil de réservation en ligne n'est connu. Téléphone, à confirmer : », bouton accueil « Horaires et contact » ; résiduel 404 (F3-3) |
| F2-5 téléphone | confirmé | badge « À CONFIRMER » + note sous le bouton (res-d) |
| F2-6 légendes | confirmé en grande partie | brunch « Quelques images libres », alt terrasse « chaises rouges, figurine, tableau noir » ; la photo d'oignon reste sur Histoire (alt exact, légende « La maison ») |
| F2-7 axe aria-prohibited-attr | confirmé | axe 390 et 1440 sur 6 pages : plus de `aria-prohibited-attr` |
| F2-8 `--:--` | confirmé | `--:--` : 0 dans dist, hero affiche « ouvre à 09:00 » |
| « Œufs Benedict » | confirmé | `oeufs` : 0 dans dist |

## Findings (triés par gravité)

### F1 majeur
- **F1-1 Statut d'activité absent du site (reste de F1-3).** `donnees.json` : « fermé définitivement (à confirmer) … local repris par Bistro Camélia » ; le site parle au présent partout (« ouvre à 09:00 », « Tous les jours, dès 10h30 », bouton Appeler). Les badges « à confirmer » couvrent les horaires et le numéro, pas l'existence du lieu. Correction attendue : une ligne visible sur « Nous trouver » (« Statut à confirmer : des sources signalent une fermeture ») ou décision explicite de l'orchestrateur dans RAPPORT.md ; sinon la mention de page reste inchangée.

### F2 mineurs
- **F2-1 Flèches de jour trop étroites à 768 px.** `.horo__fleche` (`base.css:234`, 44 x 44 en consigne) mesure 14,6 x 44 px sur accueil et réservation à 768 (flex rétréci, bouton ovale). Ajouter `flex: none` / `min-width: 44px` ; sans effet à 320, 390, 1024, 1440.
- **F2-2 Chapeau déduit.** Carte (12h) : « Le brunch se prend aussi à midi : pancakes au gravlax, œufs Benedict » ; le dossier ne dit rien de l'heure ni du fait que ces plats sont servis à midi (Flexiroom cite les pancakes, rien de plus). Remplacer par « Plats cités par un annuaire en ligne » ou marquer « exemple ».
- **F2-3 Carte : doublons.** Café et boissons chaudes, limonade et thé glacé apparaissent deux fois (blocs « moment » et « Boissons »), 5 WARN d'audit « phrase répétée » (QA-revue2) ; fusionner.

### F3 finitions (non traitées, hors périmètre de la révision)
- F3-1 `landmark-no-duplicate-contentinfo` (moderate) sur les 6 pages : 2 `<footer>` (site + kyw-footer), axe 390 et 1440.
- F3-3 Apostrophes droites : 404 (4 : « L'adresse », « n'existe », …) et réservation (« Vendredi (Aujourd'hui) ») ; espaces avant « : » toujours U+0020 (3 à 7 par page, 0 U+00A0).
- F3-4 Répétitions : « Le moment de la maison : salé, sucré ou mixte, avec du gravlax maison et un granola maison » (accueil, brunch, carte) ; « Le mardi, une boisson offerte aux étudiants » (accueil, brunch, histoire, réservation).
- F3-6 Meta description 404 : « la réservation » alors que la page s'appelle « Nous trouver » ; lien « la page d'accueil » de la 404 (QA : cible < 24 px).
- F3-8 Mobile 390 : chips du hero coupées (« 12h Le déj »), en-tête fixe ~110 px.
- F3-9 Contraste 404 instable : le QA mesure `.kyw-footer__note` 4,36:1 ; mon axe n'a pas reproduit cette ligne en 3 passes mais a saisi une fois `.btn--soleil` 2,22:1 à 3 s (transition de couleur du thème, valeur correcte à 1,5 s et 7 s) : transitoire, à surveiller, pas un défaut de palette.

## Mesures sans défaut
`lang="fr"`, un `h1` par page, `noindex, nofollow` (conforme prompt § 3.3), mention « Maquette KYW, certaines données sont illustratives » et 1 logo KYW par page (6/6), `og:image` et JSON-LD `Restaurant` présents, 0 image sans alt, 0 tiret cadratin, 173 liens et ressources internes sans 404 ni lien hors base, 0 cible < 24 px hors F2-1.

## Ce qui est bien (à ne pas casser)
1. Astre du hero visible dès le premier rendu : LCP mobile divisé par 4 sans perdre la montée animée.
2. Honnêteté du marquage (badges illustratif / exemple / à confirmer, crédits photos, réseaux « non communiqués »), désormais cohérente d'une page à l'autre.
3. « Nous trouver » : formulation sobre (aucun outil de réservation connu, numéro à confirmer), horaires Salle et Brunch lisibles dans la même carte.
