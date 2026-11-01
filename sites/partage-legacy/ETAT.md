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
