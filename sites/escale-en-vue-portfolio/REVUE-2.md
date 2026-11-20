# Revue portfolio · Escale en Vue ! · passe 2
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une guinguette de papier découpé (objets au trait, tirages de photos posés sur une table verte, aplats corail et paille), ton franc, avec un bandeau d'état qui dit honnêtement que la saison 2026 est finie.

Méthode : dist (02:37) postérieur à `src/` (02:37), donc QA-revue2.md et ses planches réutilisés ; 4 scripts maison sur mon port 4871 (PID 3216, arrêté) : 6 pages x 320/390/1024/1440 (console, requêtes, débordement, axe-core complet, h1, `lang`, noindex, mention, logo KYW), contraste nœud par nœud, captures de fenêtre (hero 1024/320, avis 320/390), CLS/LCP avec `sources` (desktop sans limitation, mobile CPU x4 + 4G, deux passes) ; extraction du texte du `dist` confrontée à `donnees.json` et `dossier.md` ; 147 liens internes testés sur le `dist`.

Scores /10
- Design 8 : signature intacte (`d-03-scroll.png`), hero mobile bien composé (`ev-rev2-hero-320`) ; un parasol d'ornement passe sur le titre « Fraîche, familiale et locale » à 320 et 390 px.
- Usabilité 7 : nav 4 liens sans coupure à 320 px (navSW 271 = navCW 271), CTA cohérent avec la saison ; le lien « Contact » mène à une page titrée « Réserver ».
- Créativité 8 : objets saisissables, loader, bandeau d'état calculé ; rien de cassé par la révision.
- Contenu 7 : faits identiques au dossier sur 6 pages, plus de note chiffrée ni de voix d'agence ; restent « Parking gratuit » non confirmé, « prochaine ouverture à confirmer » dans le bandeau et une redite sur l'accueil.
- Technique 7 : 0 erreur console, 0 requête en échec, 0 débordement de page (24 cas), 0 lien mort ; mais axe `color-contrast` serious (4 nœuds) apparu avec la révision, CLS desktop 0,059.

## Vérification des corrections de REVISION-1

| id | verdict | preuve |
|---|---|---|
| F1-1 notes tierces | confirmé | texte du dist : plus de « 93 avis », « 4,9 », « 5,0/5 » ; 4 cartes « On y parle de … » sans chiffre (paraphrase de thèmes, présents au dossier). Mais voir F1-1 ci-dessous (contraste de ces cartes). |
| F1-2 saison / réservation | confirmé | hero : « Saison 2026 terminée (du 19 juin au 6 septembre). Habituellement ouvert … » ; boutons « Contacter la maison », nav « Contact » ; marquee sans JS « Saison terminée » ; plus de « Réserver une table ». Réserve : voir F2-3. |
| F2-1 nav mobile | confirmé | `nav320 sw 271 / cw 271`, 4 liens de 31 px de haut ; 390 px : 0 `NAV` dans le script sur 24 cas |
| F2-2 phrases de suivi | confirmé en partie | « à confirmer » et « nous les ajouterons » absents des 6 HTML ; reste `src/motion/setup.ts:42` (« prochaine ouverture à confirmer », écrit par JS dans le bandeau, visible sur `ev-rev2-hero-1024`) et « Parking gratuit » (F2-2 ci-dessous). La vérification « grep dist = 0 » de REVISION-1 ne couvrait que les HTML, pas le JS. |
| F2-3 « vue sur les posts » | confirmé | « au menu en 2026 » sur accueil et carte |
| F2-4 contraste slogan | confirmé | slogan `#b83a26` sur lin = 4,69:1 ; axe : 0 violation sur `.hero__slogan` à 320, 390, 1024, 1440 |
| F2-5 landmark `region` | confirmé | axe complet : 0 `region` sur 24 cas |

## Findings

Bilan : F0 0 · F1 1 · F2 5 · F3 4. Build OK (QA), 0 erreur console, 0 lien mort, 0 fait faux, 0 invention non marquée sur les faits, mention Maquette + logo KYW unique + `noindex, nofollow` + `lang="fr"` + 1 seul h1 sur les 6 pages x 4 largeurs, 404.html designée (axe : 0 violation).

### F1 majeur
- **F1-1 · Contraste insuffisant des cartes « On y parle de »** (`src/styles/base.css:294`, `.carte-avis__theme`, `src/pages/index.astro:124`). Régression de la révision : texte `--c-corail-ink` #b83a26 sur la paille #f1cf6b = 3,78:1 (mesure canvas + calcul), à 20 px (320, 390) et 23,7 px (1024), poids 500, donc texte non « grand » ; axe `color-contrast` serious, 4 nœuds, sur 320, 390 et 1024 (seul 1440 passe, 26 px). Correction : texte en `--c-ink` (11,4:1 sur paille) ou corail à #9f2f1e (4,79:1), ou corps ≥ 24 px à toutes les largeurs.

### F2 mineurs
- **F2-1 · Parasol d'ornement par-dessus le titre « Fraîche, familiale et locale »** à 320 et 390 px : le trait du parasol traverse « F », « fa » et « et » (`ev-rev2-avis-320.png`, `ev-rev2-avis-390.png`). Lisible mais brouillé, et 3 lettres coupées par un trait noir. Correction : sous 600 px, décaler l'ornement au-dessus du titre (marge haute) ou le mettre en `z-index` derrière avec opacité 0,25.
- **F2-2 · « Parking gratuit » (source « Tripadvisor ») non confirmé et non marqué** (`src/data/site.ts:218`, section « À savoir » de `terrasse`) : le dossier dit « via recherche, à confirmer » et « parking : inconnu » dans les manques. Correction : retirer la ligne, ou la marquer illustrative.
- **F2-3 · Page de contact encore titrée « Réserver »** : `<title>` « Réserver et nous contacter », `h1` « Réserver » (`src/pages/reservation.astro:10`), « Le plat du jour maison se commande à l'avance » au présent, alors que le lien d'entrée dit « Contact » et que la saison est finie. Correction : h1 et title « Nous contacter », phrase « Pendant la saison, le plat du jour maison se commande à l'avance, à partir du vendredi soir ».
- **F2-4 · « prochaine ouverture à confirmer » dans le bandeau** (`src/motion/setup.ts:42`) : note de suivi d'agence dans le texte client, résidu de F2-2. Correction : « , terminée » seul, ou « , terminée : rendez-vous à la prochaine saison ».
- **F2-5 · Redite sur l'accueil** : « La cuisine se veut fraîcheur, créative, familiale et locale, avec toujours une alternative végé. Les produits viennent d'artisans locaux et d'une coopérative de paysans-artisans. » (section « Une terrasse, une vue ») puis « Une cuisine fraîcheur, créative, familiale. Des produits d'artisans locaux et d'une coopérative de paysans-artisans… » (bloc corail), et une troisième fois sur `histoire`. Correction : garder la version longue sur `histoire`, ramener le bloc corail à une phrase de conclusion (parmigiana et jardin).
- **F2-6 · CLS desktop 0,059** (> 0,05), reproduit deux fois à 1440 px : décalage de `nav` et du bouton `btn btn--plein` de l'en-tête (basculement de police), 0 sur la 404 et la carte ; mobile 0,004, LCP mobile 1,1 s. Antérieur à la révision (0,063 dans QA-revue1). Correction : `font-display: optional` ou `size-adjust` sur la police du bouton et réserver la largeur de la nav.

### F3 finitions (non traités, hors consigne de REVISION-1 ; F3-4 corrigé : « Dates de la prochaine saison : à venir. »)
- **F3-1 · 8 apostrophes droites restantes** contre 16 typographiques (« Ce qu'on pose sur la table », « Une planchette pour l'apéro… », « Cette escale n'existe pas », « d'une saison »).
- **F3-2 · 28 espaces ordinaires avant « ! »**, 0 espace insécable dans les pages (« Escale en Vue ! », « et une vue ! ») : le point d'exclamation peut passer seul à la ligne.
- **F3-3 · `photos/mur-pierre.webp` 492 Ko** (> 300 Ko ; autres 16 à 156 Ko).
- **F3-4 · Itinéraire sur GPS « à confirmer »** (`index.astro:166`, `reservation.astro:46`, `site.ts:46` et JSON-LD `geo`) : préférer un lien par adresse.

### Faux positifs écartés
- Hero à 1024 px : `P.hero__slogan` dont la boîte dépasse de 19 px (translateX 6 % + rotation) : le texte (Range) va de 211 à 929 px, rien n'est coupé.
- QA : axe 404 `.kyw-footer__note` 4,36:1 et « 404 sans h1 » : réponse brute de `serve.mjs` ; `404.html` : 0 violation. « Pas de robots.txt/sitemap » : présents dans `dist/escale-en-vue/portfolio/`. « Phrase répétée 2x » : copie `aria-hidden` du bandeau. Contraste « à vérifier » 27 : texte défilant du bandeau.
- `noindex, nofollow` : conforme au prompt de la variante portfolio.

## Ce qui est bien (à ne pas casser à la révision)
1. La table de la terrasse (tirages saisissables sur fond vert) et les objets au trait du hero : identité de guinguette, conservée en mobile.
2. Honnêteté du contenu après révision : saison terminée dite dès le premier écran, carte d'exemple marquée `*` et « illustratifs », aucun prix ni note inventés, horaires et adresse identiques au dossier.
3. Technique : 0 débordement de 320 à 1440, nav mobile qui tient en 4 liens, JSON-LD complet, 404.html designée, 147 liens internes valides.
