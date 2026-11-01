# ETAT · chez-guillaume-legacy · construction-1 (phase 1 sur 3)

## Fait
- Audit (`AUDIT.md`, `.hallmark/before.txt`), deal Hum 3/3, draw 4e5b8c, scaffold, stamp, comp (2 comps, c1 choisie), `DESIGN.md` (Picks, Approche, Tokens, Composants, case à cocher), entrée dans `.hallmark/log.json`.
- Paquet Astro : `Base`, `Nav` (pilule), `Footer` (lettre), `Fig`, `src/data/site.ts` (toutes les données), 7 pages : `/`, `/agenda/`, `/restaurant/`, `/privatisation/`, `/bon-cadeau/`, `/faq/`, `404`.
- Build passe (`scripts/q.sh build pnpm build:site sites/chez-guillaume-legacy`), `dist/chez-guillaume/legacy/` ; KywFooter, noindex et mention sur les 7 pages (grep). sloplint statique sur `src` : 0 FAIL (reste WARN 23, F4, F7 répondus au stamp).
- 8 photos du client en WebP dans `public/photos/`, logo `public/logo.svg` (marque rouge `#cd3b08`).

## Reste
- Phase 2 : motion (un reveal, volet collant du Feature Stack à valider, barre de billetterie), états des contrôles (:active, :disabled), nav mobile, `comp.md` (trois questions de reproduction), vérifier `dvh` et mesures 1440/1280/1024/390.
- Phase 3 : sloplint `--render` sur les 7 pages (installer les captures par `--url`), contraste du rouge sur crème et du texte clair sur rouge (calcul à faire), fold, jugées gates § 5, RAPPORT.md, `pnpm index`.
- À vérifier visuellement : le grain « fibre » du papier (stries horizontales marquées en comp), clip-path déchiré du hero et du pied (bord de photo à droite), `.close__photo` et `.stack` à 1024 et 390, hauteur de la photo « La salle » (portrait 1000 px étiré en pleine largeur, flou possible).

## Décisions et hypothèses
- Thème Hum (papier crème, bords déchirés) avec l'accent poire remplacé par le rouge du logo, lu dans `photos/12-logo.svg`.
- Macrostructure tirée : Feature Stack, routes conservées ; hero Stage avec billetterie dans le billet ; action = barre collante « Réserver un spectacle » (billetterie `https://chezguillaume.be/events/`).
- Horaires de la FAQ retenus (lun-sam 18 h 00 à minuit, dim 10 h 00 à 18 h 00), à confirmer (ELLE 2025 disait mer-sam 10 h 00 à minuit).
- Agenda = relevé du 1er novembre 2026 (28 dates, fiches d'origine liées) ; vieillit : à rafraîchir ou à mentionner. Heures données seulement pour les trois spectacles du hero.
- Nav : « Spectacles » et « Programme » fusionnés dans le bouton Réserver (même destination `/events/`) ; « Agenda » pointe vers la page `/agenda/` du site (l'original : `/#agenda`) ; « Contact » = `#contact` du pied.
- Reworded : accroche du hero raccourcie (gate 58), « On y rit, on y mange, on y vit » devient le titre des trois moments ; FAQ condensée (12 questions sur ~34, humour gardé quand court, tirets retirés, « 18h-00h » devenu « 18 h 00 à minuit ») ; pas de coordonnées GPS ni schema.org (non géocodé, rien d'inventé).
- Non repris : dessins au trait de l'original (aucun fichier source), calendrier mensuel en tableau (remplacé par l'Index), affiches des spectacles, Lottie, fiche « Contact » séparée.
- Pièges : `build-site.mjs` ne vérifie que `index.html` (grep fait sur les autres routes) ; aucun placeholder fictif ajouté ; `gabarits/` non touché.
