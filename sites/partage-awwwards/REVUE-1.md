# Revue awwwards · Partage · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : le mot PARTAGE est coupé en deux et la table se glisse entre PAR et TAGE (photo, bande de chêne, volets de transition), sur fond ardoise et ocre : « les plats au milieu de la table » devient le principe de composition.

Méthode : lecture de `QA-revue1.md`, des planches `.shots-partage-awwwards-revue1/` (home, carte, 404-sonde), de captures de phase 3 (`.shots/404`, `reservation`, `histoire`) pour les pages non couvertes par la revue 1, du texte extrait de `dist/partage/awwwards/**/*.html` comparé à `data/restaurants/partage/donnees.json` et `dossier.md`, des `curl` sur les liens. Aucun shoot complet relancé, aucun serveur lancé par moi (le serveur 4502, PID 10810, est celui de l'agent captures : non arrêté).

Hypothèses : (1) `noindex, nofollow` est accepté comme équivalent de `noindex` ; (2) les captures de `.shots/` (phase 3) correspondent au build actuel (aucune source modifiée depuis le commit « Publie… ») ; (3) l'état « sonde 404 » de la revue 1 n'est pas la page `404.html` du site.

## Scores /10
- Design 8 : principe unique tenu sur 4 pages (home `d-01-hero`, `m-01-hero`, carte `d-02`), palette ardoise/ocre/chêne cohérente avec la salle ; le vide bas des panneaux (home `d-03-scroll`, `d-04-scroll`, 150 à 400 px d'ardoise nue) est un peu lâche.
- Usabilité 7 : 0 violation axe, clavier sans piège, focus visible, mais numéro de téléphone illisible en police d'affichage sur la page Réserver (F1) et deux cibles tactiles de 23 px.
- Créativité 9 : coupure du mot pilotée par une variable, transition à volets (`d-90-transition-a/b/c`), état de repos et mouvement réduit propres (`r-01-hero`).
- Contenu 7 : faits du dossier justes (adresse, carte, prix, équipe, citations), mais quelques affirmations hors dossier (F2) et des horaires de service présentés comme certains hors page Réserver.
- Technique 8 : build OK, 0 erreur console, 0 requête en échec, LCP mobile 1,05 à 1,19 s, CLS ≤ 0,036, FPS 60, page la plus lourde 485 Ko, liens internes tous en 200, JSON-LD `Restaurant` avec adresse, géo et horaires, un `h1` par page, `lang="fr"`.

## Findings

### F1 majeur
- **F1-1 · Numéro de téléphone illisible sur la page Réserver** (`src/styles/site.css:246`, classe `.resa__tel`, police `--f-display` Panchang 800). Preuve : `.shots/reservation/d-03-scroll.png` affiche « 0818100 / 98 » (espaces quasi absents, retour à la ligne dans la colonne chêne étroite à 1440 px) ; `m-02-scroll.png` (mobile) affiche « 0818100 98 ». C'est le CTA principal de la page. Correction : composer le numéro en police de texte (General Sans, `font-weight: 600`, `letter-spacing: 0.02em`, `white-space: nowrap`) ou séparer chaque groupe de chiffres par une espace insécable fine ; vérifier qu'il tient sur une ligne à 1280, 1440 et 390 px.

### F2 mineur
- **F2-1 · Horaires de service présentés comme certains.** Le pied de page de toutes les pages et l'accueil (« Soir, 18 h 30 à 22 h : du mardi au samedi », « Lunch à 38 € du mercredi au samedi midi ») ne portent aucune réserve ; seul `reservation/` dit « à confirmer par téléphone ». Le dossier signale 18:30-22:00 contre 19:00-21:00 et « mardi soir (à confirmer) » ; `src/data/site.ts:44-45` marque bien `placeholder: true`. Correction : ajouter « (à confirmer) » ou une astérisque « horaires illustratifs » dans le bloc Service du pied de page (`src/components/Footer.astro`).
- **F2-2 · Affirmations hors dossier, non marquées.** `src/pages/carte.astro:21` « Elle change avec les saisons : la salle vous dira ce qui arrive ce soir. » et `carte.astro:53` « Menu du 21 octobre 2026, il change chaque semaine. » : rien dans `donnees.json` ni `dossier.md` (seule la date du 21/10/2026 est sourcée). Correction : retirer les deux propositions (garder « Carte du 28 septembre 2026. » et « Menu du 21 octobre 2026. »).
- **F2-3 · Titre de presse reconstitué.** `src/data/site.ts:89` : titre du Vif Weekend « Partage à Namur, où la sharing food retrouve ses lettres de noblesse » déduit du slug de l'URL ; le dossier dit « contenu du Vif Weekend (HTTP 405) » non lu et ne retient que « Le resto de la semaine : Partage à Namur ». Correction : afficher « Le resto de la semaine : Partage à Namur » (titre du dossier) et retirer l'anglicisme repris du slug.
- **F2-4 · Cibles tactiles mobile de 23 px.** `QA-revue1.md` : « Lire la carte et les prix » 156×23 et « Ouvrir le plan » 94×23 (sous les 24 px de WCAG 2.5.8, liens isolés et non en phrase). Correction : `min-height: 44px; display: inline-flex; align-items: center` sur `.lien` sous 700 px, en gardant le trait dessiné.

### F3 finition
- **F3-1 · Ligatures incohérentes** sur la carte : « Filet pur de boeuf Holstein » (`donnees.json` a « boeuf ») à côté de « Œuf mimosa aux œufs de saumon » : corriger en « bœuf » (graphie française) dans `src/data/carte.ts`.
- **F3-2 · Titre La Libre tronqué sans points de suspension** (`site.ts:88` : « …à la cuisine gourmande », le titre complet continue « , avec des touches raffinées ou voyageuses ») : donner le titre complet ou ajouter « … ».
- **F3-3 · Points décoratifs** de la liste « Ce qu'on se passe » (`home/d-04-scroll.png`) : quatre pastilles noires sans fonction dans la colonne chêne, et 400 px d'ardoise vide dessous. Pas du slop lourd (la colonne est le « chemin de table »), mais remplacer les pastilles par un indice utile (numéro de page de presse, ou la source) ou les retirer.
- **F3-4 · Faux positifs de l'outil à ne pas corriger** : (a) `noHoverChange` « 081 81 00 98 » sur la carte : `partage-item/h-07-rest.png` (trait 1 px) vs `h-07-hover.png` (trait 3 px) montrent une réaction réelle ; (b) `skipLinkFirst = false` : le premier arrêt est bien « Aller au contenu » (leçon déjà notée) ; (c) 404 « sans titre ni lang » : c'est la sonde du serveur statique, `dist/partage/awwwards/404.html` a `lang="fr"`, un `h1`, un titre.
- **F3-5 · 404 non servie par Vercel à cette adresse (hypothèse)** : Vercel sert un `404.html` à la racine de `dist/`, pas dans `dist/partage/awwwards/` ; la 404 dessinée n'apparaîtra qu'en navigation interne. À confirmer à l'index, sans action sur le site.
- **F3-6 · JSON-LD** `priceRange: "€€"` alors que les plats vont de 24 à 45 € : `€€€` ou retirer le champ.

### Points vérifiés sans écart
Adresse, téléphone 081 81 00 98 (l'autre numéro volontairement écarté), prix de toute la carte (mêmes lignes que `donnees.json`), lunch du 21/10/2026 et suppléments, équipe, citations (DH 2024, La Libre 2025), liens Instagram, Facebook, bon cadeau, réservation en ligne identiques au dossier, mention « Maquette KYW, certaines données sont illustratives. » et logo KYW sur les 5 pages, `noindex` sur les 5 pages, vouvoiement, pas de tiret cadratin, ponctuation française correcte, 0 débordement horizontal, reduced motion sans texte masqué, `robots.txt` absent (sans conséquence : en-tête `X-Robots-Tag` dans `vercel.json`).

## Ce qui est bien (ne pas casser à la révision)
1. La coupure du mot PARTAGE (PAR / photo / TAGE) et sa transition à volets : idée unique, fidèle au nom, repli statique propre en mouvement réduit.
2. La carte : prix posés au milieu sur la bande chêne, navigation par ancres, boissons complètes sans débordement à 390 px (`carte/m-02`, `m-05`).
3. La sobriété technique : 61 Ko de JS gzip, LCP mobile ≈ 1,1 s, aucune erreur console, focus et survols tous visibles.
