# ETAT.md : wok-de-jin awwwards (fin de la phase 3 sur 3)

## Fait
- Concept « La semaine à volonté », DESIGN.md (brief, 3 concepts notés, Concept Card, système, checklist 1 à 18).
- Scaffold, engine verbatim (copié de le-royal-awwwards, sans GL), tokens.css, engine.css, polices Tanker et Switzer.
- Contenu `src/data/site.ts` (réel : tarifs, horaires, adresse, téléphone, réveillon) ; photos du client dans `src/assets/photos/` (visages 10 et 11 écartés).
- 5 pages statiques : `/`, `/carte/`, `/a-propos/`, `/reservation/`, 404. Pied composé (`Footer.astro`) + `KywFooter`.
- Build OK (`pnpm build:site sites/wok-de-jin-awwwards` vers `dist/wok-de-jin/awwwards/`). Mesures Playwright 1440, 1280, 1024, 390, 360, 320 : pas de débordement horizontal, `.display` left >= gouttière.

## Fait en phase 2 (construction-2)
- Pilote `src/motion/semaine.ts` (service du moment par `Intl` Europe/Brussels, en cours sinon prochain ; distribué à la case de la grille, au tarif du bandeau du hero et à la pastille du jour au pied ; recalcul chaque minute par `gsap.delayedCall`).
- Signature : les cases se servent jour après jour (`--rempli` sur `::before`, prix qui monte, filet du jour `--trait`), déclenchée par IntersectionObserver.
- Repos : bande de vapeur hachurée qui s'écoule (14 px/s, `gsap.ticker`, `--flux` sur le porteur visible), accélérée au pointeur ; case visée = ligne de légende allumée.
- Intro du hero sans texte caché (filet du bandeau, prix +18 px, photo 1,08 vers 1). Hero recalé : titre `19svh`, photo `54svh`, bandeau sans marge : les trois prix tiennent dans 1440×900 (bas 875) et commencent à 686 px à 1280×720.
- Reveals : `data-split="lines,words,chars"` sur tous les h2 de section, `data-reveal="clip"` sur les cadres photo non prioritaires (aucun sur un bloc à lien).
- Menu mobile `<dialog>` (`Header.astro`, `motion/menu.ts` adapté de le-54 : monte du bas, boucle de Tab, Échap, focus rendu) ; « Menu » et « Réserver » à 44 px au téléphone.
- Survols sous `(hover: hover)`, mêmes états au `:focus-visible`, `:active` ; or réservé aux grands textes et fonds noirs (4,2:1 sur cinabre), lien KYW souligné au survol.
- Contrôles Playwright (scratchpad `wdj2-check.mjs`) : 0 erreur console ni requête échouée sur 5 pages, aucun débordement à 1440/390/360/320, signature finie (`--rempli` = 1, 0 prix caché), réduit : 0 texte caché, captures immobiles, ni `.motion` ni Lenis.
- DESIGN.md : § Mouvement réécrit, checklist 19 à 47 (preuves du code).
- Build vert : `scripts/q.sh build pnpm build:site sites/wok-de-jin-awwwards`.

## Reste (phase 3)
- Shoot complet et audit (agent captures), puis champs `report.json` : 35 (`hover.*`), 36 (`desktop.idleMotion`, `idleAt`, `settledMs` non nul), 39 (`reduced.*`), 44, 45 (contraste des étiquettes et états), 47 (`smallTargets`).
- Repos : la bande de vapeur fait ~0,2 % de l'écran à 1440×900 (au-dessus du seuil 0,05 %, sous le seuil `settled` 1 %) ; à vérifier dans `report.json`. Au téléphone le bandeau est sous la ligne de flottaison (908 px) : repos invisible au premier écran mobile, accepté.
- OG composée (actuelle provisoire), RAPPORT.md, checklist 9, `pnpm index`, commit final avec `[publier]`.

## Pièges notés
- Le hachuré `::after` du porteur passe au-dessus de l'étiquette absolue du bandeau (pseudo peint après les enfants) : `z-index: 1` sur `.etiquette`.
- `pnpm-lock.yaml` apparaît modifié dans l'arbre : pas de mon fait, non commité.

## Décisions et hypothèses
- Pas de loader, pas de GL (voir DESIGN.md).
- Correspondance jour/tarif DEDUITE des trois onglets du site client : lundi, mercredi, jeudi, vendredi = midi 16,80 et soir 23,80 ; samedi et dimanche = 27,80 aux deux services ; marquée `hypothese: true` dans `site.ts` et signalée sur la page (« confirmez-le à la réservation »). A confirmer.
- Téléphone : 081 30 68 88 (site client) ; le mobile +32 487 888 968 de restaurants.json n'est pas utilisé.
- Réservation générale : lien vers wokdejin.com (seule URL dédiée connue : réveillon).
- Aucun placeholder fictif : rien d'inventé (pas d'avis, d'e-mail, de réseau, d'histoire, de parking).
- Photos 2048 px des salles recadrées à 1600 px (sharp) avant import.
- Serveur de mesure : port 4417, PID noté puis arrêté.

## Phase 3 (construction-3)
- QA sur preuves : 4 pages sans erreur ; seule correction : décalage au survol du téléphone (reservation). Build vert, audit 0 FAIL / 1 WARN justifié.
- Reste : critique jury indépendant, OG composée, relire les `colorOnly` (accueil, carte), `pnpm index`, commit final `[publier]` (superviseur).
- Piège : la 404 capturée par l'agent captures est la réponse brute de serve.mjs (faux positifs contraste/cible).
