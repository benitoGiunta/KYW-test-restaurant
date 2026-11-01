# ETAT · brasserie-du-quai · variante legacy · fin de la phase 1 (construction-1, 01/11/2026)

## Fait
- Concept et système : thème Spore (deal 1/3, seed `restaurant-namur-brasserie-seafood-a026·4879f0a6·2026-11-01·r0`, genre atmospheric), colourway head-torch (ocre ≈ or du logo) ; draw `333a6d` ; `tokens.css` + `base.css` scaffoldés (`--redesign full`) ; stamp provisoire en tête de `src/styles/page.css` (champs « pending » à remplir).
- `DESIGN.md` : Picks, Approche (forme et posture conservées, échanges du draw, dérogations, test miroir), Thème, Système, Composants.
- Contenu : `src/data/site.ts` (coordonnées, câblage Zenchef rid 379458 et Brydge, saisons, jours du banc d'écailler, formatage des prix, galerie), `carte.json` (49 lignes de `donnees.json`), `photos.json` (24 photos client en WebP 640/1140/1600/max dans `public/photos/`, logo SVG).
- Pages (routes d'origine conservées) : `/`, `/reservation/`, `/cheque-cadeau/`, `/la-carte/`, `/lecailler/`, `/galerie/`, `404`. Composants : Nav (banner-over-bar + menu Popover), Footer (statement), Saisons (Schedule), Photo (slot Hallmark).
- Build OK : `scripts/q.sh build pnpm build:site sites/brasserie-du-quai-legacy` → `dist/brasserie-du-quai/legacy/` ; `noindex` et `kyw-footer` vérifiés par grep sur les 7 pages.

## Reste (phases 2 et 3)
- Audit Hallmark (`AUDIT.md`) : `sloplint --before` sur `.hallmark/site-actuel` (copier `page.html` du client) ou `--url https://www.brasserieduquai.be/`, avec `HALLMARK_PUPPETEER` et `CHROME_PATH` (prompt § 3).
- `comp.md` : deux comps HTML du premier écran (axe : poids à gauche / à droite), `capture.mjs`, inventaire des médiums, trois questions de reproduction.
- QA navigateur : `sloplint src --render --stage hero --url http://localhost:4321/brasserie-du-quai/legacy/` (serveur `KYW_BASE=/brasserie-du-quai/legacy/ pnpm exec astro dev --root sites/brasserie-du-quai-legacy --port 4321`, noter le PID, `kill <PID>`) ; hero review (self) ; sweep par page ; vérifier contraste du voile du hero, la largeur du bandeau au téléphone (adresse tronquée par ellipse), la table des huîtres à 320 px, la grille de la galerie (`dense`).
- Un reveal au plus (Spore : « nothing reveals », donc probablement aucun ; à décider et écrire).
- Stamp complet (contrast, fold, comp, hero-review, critique pré-émission), liste de sur-utilisation cochée dans `DESIGN.md`, `RAPPORT.md`, `theme.mjs log --log $ROOT/.hallmark/log.json` puis `git add -f .hallmark/log.json`, `pnpm index`, leçons dans `agents/lecons.md`.

## Décisions et hypothèses
- Genre atmospheric (site d'origine sombre bleu nuit et or) ; Spore head-torch plutôt que Midnight (pas de serif, voix logicielle) ou Darkroom (photos N&B).
- Pas de formulaire maison : la réservation reste Zenchef (lien direct + iframe à la demande, leçon les-potes-au-feu sur la gate 26a). Bon cadeau : module Brydge conservé de la même façon (clé publique `pub_` reprise du HTML public d'origine).
- Horaires : seules les deux saisons sont publiées ; jour de fermeture en slot `.fill` « à confirmer par la maison ». Desserts, vins : slot `.fill` en fin de carte. Aucun avis ni note repris (paraphrases seulement dans le dossier).
- Flux Instagram et carte Google intégrée remplacés par des liens (dropped au stamp). Labels « Restauration » et « Chèque cadeau » transformés en titres (reworded au stamp).
- Les horaires sont dits une fois par page qui les porte (accueil section « Venir », réservation) ; le pied de page ne les répète pas.
- Aucune photo de bibliothèque : 24 photos client, crédit « Photographies : La Brasserie du Quai » au pied.
