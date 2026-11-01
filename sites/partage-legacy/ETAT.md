# ETAT · partage-legacy · fin de phase 3 (QA) · 01/11/2026

## Phase 3 faite
- Corrections QA-build : nom accessible du logo, page 404 (`src/pages/404.astro`), og:image + twitter:card, robots.txt, survol des liens texte, cibles du pied ≥ 24 px, en-tête des horaires visible (FAIL 73 levé).
- Build OK (5 pages), `pnpm index` OK ; sloplint render `/` + `/carte/` : 0 FAIL, 12 REFLEX ouverts (liste dans RAPPORT.md).
- RAPPORT.md écrit (QA, sloplint, placeholders, matériel).

## Reste
- REFLEX 44c / 79 (hero de /carte/), 59 (écart 56 px), 77 (horaires), 49b (adresse, à waiver) : lever ou waiver avec raison.
- Hero review et finish review (sous-agent), 72 cases de DESIGN.md, entrée `theme.mjs log` + `git add -f .hallmark/log.json`.

# ETAT · partage-legacy · fin de phase 1 (construction-1) · 01/11/2026

## Fait
- Thème : `theme.mjs deal` (journal partagé) → Atelier 2/3, seed `restaurant-namur-sharing-plates-e651·ed7c7216·2026-11-01·r0` ; draw `cdb6cc` (pris : floating pill, letter close, Switcher sur la carte, horaires en section propre) ; scaffold `--redesign full` dans `src/styles/`.
- `DESIGN.md` (Picks, Approche, Thème, Système, Composants), `AUDIT.md` provisoire (sur captures).
- Contenu : `src/data/site.ts` (texte d'origine mot pour mot, carte et lunch depuis `donnees.json` copié dans `src/data/`, horaires, Zenchef rid=371394 trouvé dans le HTML sauvegardé) ; 19 photos client en WebP (`public/photos/`, `src/data/photos.json`, script : scratchpad `photos-legacy.mjs`, lancé depuis $ROOT pour résoudre `sharp`).
- Pages : `/` (hero Poster, présentation + tirage, plats à partager + lunch, réservation, en images, horaires et venir), `/carte/` (Switcher 4 panneaux, tous lisibles sans script), `/bon-cadeau/`, `/politique-de-confidentialite/` ; `page.css` avec stamp.
- `pnpm build:site sites/partage-legacy` OK (4 pages, noindex + kyw-footer + mention sur chacune) ; sloplint statique `0 FAIL, 5 WARN, 1 NOTE`.

## Reste (phases 2 et 3)
- Phase 2 : `sloplint .hallmark/site-actuel --genre editorial --render --before` (avec HALLMARK_PUPPETEER/CHROME_PATH) puis compléter AUDIT.md ; comps c1/c2 + `comp.md` ; captures et `--stage hero` ; texture `--grain`/`--fibre` (texture.md) ; décider l'« air » (still CSS ou rien) ; option : module Zenchef à la demande derrière un bouton (garder le lien direct).
- WARN à traiter : F15 (3 gaps de colonnes : unifier sur `--gap-columns` ou `--space-3xl`), 41 (hero : vérifier), 49 (libellés longs), écho possible « Fermeture » du footer avec la table des horaires sur l'accueil (69).
- Phase 3 : `sloplint src --render --kept --url …` par page, reviews (self, stampées), cocher les 72 points de DESIGN.md, RAPPORT.md, entrée `theme.mjs log`, `git add -f` du journal `.hallmark/log.json`, `pnpm index`, lecons.md.

## Décisions et hypothèses
- Routes du site d'origine conservées ; les 16 liens JPG de la galerie et le crédit La-Carte.be sont abandonnés (à consigner `dropped`).
- Réservation = lien direct Zenchef (même URL que l'iframe d'origine), pas de formulaire mimé.
- Heures de service marquées à confirmer (`data-placeholder`), jours de fermeture officiels ; menus presse (49 €, 67 €) non affichés (absents du site, non confirmés).
- Bons cadeaux : « lunch pour deux 76 € » dérivé du lunch à 38 € ; deux autres formules illustratives (`placeholder: true`). Politique de confidentialité : texte illustratif.
- Aucun avis affiché (aucun extrait réel), aucune photo de bibliothèque.
- Téléphone affiché : 081 81 00 98 (celui du site officiel).

# ETAT · partage-legacy · fin de revue 1 (relecteur-site) · 01/11/2026

## Fait
- `REVUE-1.md` écrit : verdict A_CORRIGER (F0 0, F1 2, F2 2, F3 4). Mesures ciblées : 5 pages x 2 largeurs (console, requêtes, débordement, images DPR 2), contraste (0 écart), menu mobile, onglets, 27 liens locaux, `sloplint src` (0 FAIL, 0 WARN).
- Serveur 4701 arrêté (PID noté puis `kill`). Aucun fichier du site modifié.

## Reste (réviseur)
- F1-1 page bon cadeau (phrases inventées : téléphone, « avec un bon », « un midi au choix ») ; F1-2 carte (« change chaque semaine », « la cuisine s'adapte »).
- F2-1 légendes « citronnier » / « le soir » ; F2-2 « boeuf » et apostrophes droites de la carte.
- F3 : numéro BE et attablezvous.be « à confirmer », « en une minute », `priceRange`, composition de la page bon cadeau.
- Les 12 REFLEX `sloplint --render` de `RAPPORT.md` ne sont pas retranchés (hero accueil : 900 px, chiffre 912 périmé).

## Pièges
- Ne pas confondre la « 404 » des captures (repli de `serve.mjs`) avec `404.html`.

# ETAT · partage-legacy · fin de revue 2 (relecteur-site) · 01/11/2026

## Fait
- `REVUE-2.md` : verdict A_CORRIGER (F0 0, F1 0, F2 3, F3 6). F1-1, F1-2, F2-1 de la passe 1 vérifiés corrigés ; F2-2 corrigé en partie (3 apostrophes droites : `\w` ASCII dans `nettoie`).
- Serveur 4811 arrêté (PID noté, `kill`). Aucun fichier source modifié.

## Reste (réviseur)
- F2-1 `nettoie` : `/(\p{L})'(\p{L})/gu` ; F2-2 retirer « elle change avec les saisons » (`carte/index.astro:20`) ; F2-3 lettre signée de `Cloture.astro` (parole attribuée à des personnes réelles, absente du dossier).
- F3 : BE 0451 659 813 à marquer ou retirer, « en une minute », `priceRange`, doublon du bouton sur `bon-cadeau`, reprise de « Ici, l'expérience se vit dans le partage ».
- 12 REFLEX de `RAPPORT.md` toujours non tranchés.

## Pièges
- `sloplint --render` échoue en root (Chromium sans `--no-sandbox`) ; pas d'option dans l'outil.
- Les planches 12 colonnes sont illisibles ; mesurer par script.
