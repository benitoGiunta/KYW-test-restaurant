# Revue awwwards · Les Potes au Feu · passe 1
Verdict : BLOQUANT
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : non évaluable depuis un rendu, aucune page n'existe. D'après `src/data/site.ts` et les composants seuls : un menu en quatre services « servi à table par les chefs », navet du logo comme motif, rideau de transition, scroll Lenis/GSAP.

Scores /10 (revue partielle, source uniquement, rien n'a pu être vu dans un navigateur)
- Design : non noté (0 page rendue, aucune capture possible ; `src/styles/site.css` fait 363 lignes mais ne se juge pas sans HTML).
- Usabilité : 0 (le site publié serait vide ; `Header.astro` et `Footer.astro` pointent vers `/carte/`, `/histoire/`, `/reservation/` qui n'existent pas).
- Créativité : non noté (intention lisible dans `src/motion/service.ts` et `Navet.astro`, aucune preuve visuelle).
- Contenu : 6 (données du dossier fidèles, voir F2/F3 ; mais `faits`, `services`, `formules`, `histoire`, `equipe` ne sont rendus par aucune page).
- Technique : 1 (`build-site.mjs` échoue ; moteur, tokens et layout présents, mais 0 page, pas de `og.png`, pas d'`apple-touch-icon.png`).

## Findings

### F0 (bloquants)
- **F0-1 · Aucune page : le build échoue.** `src/pages/` est un dossier vide (créé à 13:03, rien depuis). `node scripts/build-site.mjs sites/les-potes-au-feu-awwwards` sort « 0 page(s) built », « [@astrojs/sitemap] No pages found! », puis plante dans `scripts/build-site.mjs:37` : `ENOENT … dist/les-potes-au-feu/awwwards/index.html`. Preuve : sortie du build, `ls -R src/pages` vide. Conséquence : ni serveur, ni `shoot.mjs`, ni `audit.mjs`, ni axe, ni capture, ni test de liens ou de console n'ont pu être exécutés ; toute la section C est non vérifiée. Correction attendue : créer au minimum `src/pages/index.astro`, `carte.astro`, `histoire.astro`, `reservation.astro` (liens du header et du footer) et `404.astro`, qui consomment `site`, `services`, `formules`, `histoire`, `equipe`, `faits` de `src/data/site.ts`, puis relancer le build jusqu'à ce qu'il réussisse. Le dossier ne contient pas non plus de `DESIGN.md` ni de `RAPPORT.md` (cités dans l'en-tête de `site.ts`) : le producteur a manifestement été interrompu avant la fin.
- **F0-2 · Liens internes tous morts.** `src/components/Header.astro:6-7,19,29-32` et `src/components/Footer.astro:30` émettent `<base>/carte/`, `/histoire/`, `/reservation/` (trois fois, y compris le CTA « Réserver » du header et le lien « Contact »). Aucune de ces routes n'existe (voir F0-1). À corriger avec les pages, puis vérifier chaque lien avec `curl -w '%{http_code}'` sur le build servi.

### F1 (majeurs)
- **F1-1 · Réservation sans page.** Le CTA principal du header mène à `/reservation/` (inexistant) alors que l'outil du client est Zenchef (`https://bookings.zenchef.com/results?rid=379477`, bien présent dans `site.reservation.url`). Décider : soit `/reservation/` est une vraie page (téléphone, horaires, lien Zenchef, adresse, carte), soit le header pointe directement vers Zenchef ; le lien « Contact » du footer exige cette page.
- **F1-2 · Meta et assets référencés mais absents.** `Base.astro:21,30` référence `/og.png` (valeur par défaut de `image`) et `/apple-touch-icon.png` ; ni l'un ni l'autre n'est dans `public/` (seulement `favicon.svg`, `robots.txt`, deux polices). Les balises `og:image` et `twitter:image` renverraient donc un 404. Ajouter `public/og.png` (1200×630, photo réelle du dossier) et `apple-touch-icon.png`.
- **F1-3 · Rôle de Sara et de Jordan inventé (marqué).** `site.ts` `equipe` : « en salle et au bar (rôle à confirmer) » avec `placeholder: true` ; le dossier dit seulement « épaulés par la pétillante Sara et Jordan » et `donnees.json` donne « rôle inconnu » pour Jordan. C'est marqué `placeholder`, donc pas un `T-invente`, mais le texte visible affirmerait « en salle et au bar » avec « à confirmer » comme mention de coulisse. À la création de la page : soit n'afficher que les prénoms sans rôle, soit rendre la pastille « illustratif » visible à côté du rôle.
- **F1-4 · Photos : une légende explique un trou de contenu.** `services[0].legende` : « Assiette non photographiée : le navet du logo tient la place. » et `services[3].legende` : la photo montre la rosace de pommes, « un dessert d'une carte précédente ». Honnête, mais le service 4 (« Soufflé au caramel ») afficherait la photo d'un autre dessert ; à vérifier au rendu que la légende est visible (au moins en reduced-motion) et lisible.

### F2 (mineurs)
- **F2-1 · « Boeuf » sans ligature.** `site.ts` (`services[2].titre`, `formules[0].lignes`) : « Boeuf confit ». Le français correct est « Bœuf » ; la source du client écrit « Boeuf », mais un titre display en grand corps le rend visible. Utiliser « Bœuf » (vérifier que Bricolage Grotesque a le glyphe « œ »).
- **F2-2 · Prix des boissons non confirmés.** `formules[2]` (« Au bar », « dès 9 € ») : trois prix du Fooding (juillet 2026) marqués `aConfirmer: true` ; le dossier les donne bien (amaretto sour 13 €, Anjou Domaine Olivier 9 €, Syrah Stéphane Ogier 50 €). Le « dès 9 € » est une extrapolation (le minimum de trois exemples n'est pas le minimum de la carte) : remplacer par « exemples » ou retirer le « dès ». Vérifier que « à confirmer » est visible au rendu.
- **F2-3 · Formule midi présentée comme confirmée.** `formules[1]` (id `midi`) affiche « 52 € » comme prix du bloc ; le dossier précise que le prix midi de 52 € est « à confirmer » (Le Fooding, le site actuel ne le mentionne pas, `donnees.json` `manques`). L'en-tête de `site.ts` écrit « confirmé par Le Fooding » : écart de ton. Ne pas afficher 52 € comme un fait sans réserve ; ajouter la mention d'illustration.
- **F2-4 · « 2020 » présenté comme ouverture.** `faits[3]` : « Ouverture avenue de la Plante, au bord de la Meuse. » ; l'année vient de la création de la société (14/01/2020) et `donnees.json` classe la date d'ouverture dans `manques` (« début 2020 déduite »). Écrire « début 2020 » ou « société créée en 2020 ».
- **F2-5 · Lien YouTube sur une vidéo unique.** `site.reseaux` : `https://www.youtube.com/watch?v=dZtMOajOefE` est une vidéo, pas la chaîne ; le libellé « YouTube » du footer promet davantage. Libellé « Vidéo YouTube » ou URL de la chaîne si elle est connue.
- **F2-6 · `noindex, nofollow` au lieu de `noindex`.** `Base.astro:19` : le cahier demande `<meta name="robots" content="noindex">` ; `nofollow` est superflu mais inoffensif (aligner avec les autres variantes pour une vérification automatique stricte).
- **F2-7 · Mention maquette seulement via le composant KYW.** « Maquette KYW, certaines données sont illustratives. » arrive par `KywFooter` (`packages/kyw-footer/KywFooter.astro:9`), inclus dans `Footer.astro:44`. Correct, mais à vérifier au rendu (pas masqué par le rideau, le scroll ou un `overflow: hidden`), y compris sur la 404 future.
- **F2-8 · Footer : samedi sans « fermé ».** `Footer.astro:27` : « Samedi : privatisation » ; le dossier dit « fermé (privatisation possible) ». Écrire « fermé, privatisation possible », comme dans `site.horaires`.

### F3 (finitions)
- **F3-1 · Horaires dupliqués à la main.** `Footer.astro:24-28` répète les horaires en dur au lieu de dériver de `site.horaires` : risque de divergence avec le JSON-LD (`Base.astro:26`).
- **F3-2 · Typographie des heures.** `fmt` (`Footer.astro:5`) produit « 19 h à 21 h » avec espaces ordinaires ; utiliser des espaces insécables autour de « h » pour éviter une césure.
- **F3-3 · Crédits.** `credits.photos` : « photos : Les Potes au Feu » commence par une minuscule en tête de phrase (`Footer.astro:38`). Capitaliser.
- **F3-4 · `<link rel="sitemap">`** (`Base.astro:22`) sans effet pour les moteurs ; le `robots.txt` suffit.

## Faits vérifiés contre `donnees.json` (source, sans rendu)
Conformes : nom, adresse (Avenue de la Plante 4, 5000 Namur), téléphone `+32 81 64 04 44` / `tel:+3281640444`, URL Zenchef `rid=379477`, coordonnées, horaires (lundi, mardi, jeudi 19-21 h ; mercredi et vendredi 12-14 h et 19-21 h ; samedi fermé avec privatisation ; dimanche fermé), menu 67 € et suppléments +7 € / +15 €, lunch 40 €, bons cadeaux 50 / 75 / 100 / 150 €, citation Michelin et sa source, histoire (François, Damien, Plage d'Amée, hiver 2019, Shanghai, Montréal), « bord de Meuse » (dossier.md l. 128), absence d'e-mail (aucune adresse inventée), Facebook et YouTube. Aucun avis client, aucune note chiffrée, aucune récompense inventée : aucun `T-invente` détecté. Rien n'est vérifiable au rendu (0 page).

## Non vérifié faute de pages (à refaire en passe 2)
Console et requêtes en échec, liens morts, débordements, desktop 1440 / mobile 390 / reduced-motion, hover par rôle, `idleMotion`, clavier (`k-*`), burger, loader, rideau de transition, LCP, CLS, poids, axe, `h1` unique et ordre des titres, `<title>` et description uniques par page, JSON-LD rendu, alt des images (16 photos dans `src/assets/photos/`), 404 designée, AI slop.

## Ce qui est bien (à ne pas casser)
1. **Données propres et sourcées.** `src/data/site.ts` reprend le dossier fidèlement, marque `placeholder` et `aConfirmer` là où le dossier est incertain, n'invente ni e-mail, ni avis, ni récompense ; la citation Michelin est correctement attribuée.
2. **Idée structurante cohérente avec le restaurant.** Menu unique en quatre services (`services[]`) qui calque la vraie carte, navet du logo comme motif (`Navet.astro`, `Assiette.astro`), vouvoiement (« À table ? Les chefs vous attendent. », « dites-le nous à la réservation ») et peu de filler.
3. **Socle technique sain.** `Base.astro` : `lang="fr"`, `noindex`, canonical dérivé de `base`, JSON-LD `Restaurant` avec adresse, géo, horaires et `sameAs`, police critique préchargée, classes `js`/`motion` posées avant le premier rendu, skip link, `<main id="main">`, tous les liens via `u()`.
