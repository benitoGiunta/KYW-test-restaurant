# ETAT, don-dino-portfolio (phase 2 sur 3 terminée)

## Fait
- Gabarit guinguette copié (sans dist, node_modules, rapports), package renommé, build OK (`pnpm build:site`, 6 pages, 2,2 Mo).
- Contenu : `src/data/site.ts` + `src/data/carte.json` (115 plats, prix formatés, généré de donnees.json). Horaires 7j/7, adresse, GPS, téléphone, réservation = https://dondino.be/fr/reservations, Facebook.
- Photos : 11 WebP + 11 carrés `s/` dans `public/photos/` (taille limitée à la source réelle), OG, favicon. Logo copié en `public/photos/logo.png` (non utilisé).
- Pages : accueil, carte, maison (histoire + patron), terrasse et groupes, réservation, 404. Page emporter supprimée, nav mise à jour.
- Palette rouge/vert (tokens.css), objets pizza / chope / basilic.
- DESIGN.md (matrice, décisions, adéquation 78 %).

## Phase 2 (faite)
- Défaut du gabarit corrigé : `.table__rail { display: none }` écrasé par `.rail { display: flex }` : rail visible en desktop (`.table .table__rail`, idem en mobile).
- Marquee d'état : heure et jour de Bruxelles par `Intl.DateTimeFormat('fr-BE', { timeZone: 'Europe/Brussels' })` (plus de `new Date().getDay()` local).
- Interaction ajoutée, page carte : pastilles de rubriques (14, clic = `scrollToTarget` décalé de 96 px, `aria-current`), recherche sans accent ni casse (nom du plat, description, rubrique), compte annoncé en `aria-live`, état « aucun résultat », bouton « Effacer ». Rubriques vides masquées.
- Signature de l'accueil : bouton « Ranger la table » (desktop, apparaît dès qu'un tirage a bougé, les ramène en rebondissant, focus rendu au premier tirage). Masqué en mobile et sans motion.
- Mobile : nav basse de 5 liens tenait à 477 px (dernier lien coupé) : « Accueil » masqué (la marque l'est), « Terrasse et groupes » devient « Terrasse », texte 12 px, aucun défilement horizontal à 320 et 390. Tirages inclinés des grilles : marge 1,25 rem, demi-inclinaison, `overflow-x: clip` (viewport élargi de 4 à 14 px). Prix de plat qui sortait à 320 px (`.plat__nom { min-width: 0 }`). Objets de hero de page bornés à la largeur.
- Mesures (Playwright, 3 largeurs, 6 pages) : `innerWidth` = largeur demandée et `scrollWidth` = `innerWidth` à 320 et 390 sur 6 pages ; 0 texte caché en reduced motion (5 pages, `html.motion` absent) ; 5 liens d'en-tête atteignables (elementFromPoint = `<a>`) ; 0 erreur console ; filtre carte et « ranger » testés au pointeur réel ; bas de page 1440 : mention maquette et logo KYW visibles.
- Build OK (6 pages), `pnpm index` fait.

## Reste (phase 3 et captures)
- Agent « captures » : shoot/audit complets (non faits ici), contraste rouge/vert, LCP.
- Tirages à faible source (358/424/500 px) : à regarder aux captures desktop.
- Logo manuscrit (`public/photos/logo.png`) toujours non utilisé ; pas de police script ajoutée (aucune police script locale, pas de réseau).
- RAPPORT.md, sloplint, `gabarits/UTILISATION.md` (session mère).
- Pas de scrollspy sur les pastilles de rubriques (volontaire : `aria-current` posé au clic seulement).

## Pièges
- Un autre agent a lancé `git pull --rebase --autostash` pendant la passe : trois de mes fichiers sont revenus à HEAD et le stash est resté (`git stash list`). Récupérés par `git checkout stash@{0} -- <fichiers>`, puis commit immédiat ; ne pas supprimer ce stash (il n'est pas à moi).
- Un masquage `display:none` élément par élément ne trouve pas un viewport élargi (le redimensionnement l'efface) : balayer les `getBoundingClientRect` hors `marquee`/`curtain`, `span` compris.

## Décisions et hypothèses
- Slogan = baseline réelle du site actuel ; citation « Les meilleures de la région, paraît-il ! » attribuée au site de la maison.
- Aucun avis réel : 4 avis d'exemple marqués. Google 4,3 non affiché (1033 ou 350 avis, à confirmer).
- Desserts et boissons : 6 lignes `placeholder: true`, marquées sur la page carte.
- Photo « salle-pizza » (homme à la pizza) non légendée par un nom (identité non confirmée).
- Placeholders : email (jamais affiché), avis d'exemple, desserts et boissons.
- « carbonnara » conservé tel que dans la carte du client.
