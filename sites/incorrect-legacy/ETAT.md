# ETAT · incorrect · variante legacy · fin de la phase 3 (construction-3)

## Fait (phase 1 + 2)
- Phase 1 : AUDIT, DESIGN, comp, thème Overprint, one-page (Hero, Maison, Pâte, Carte à onglets, Venir, Pied, KywFooter), 404, photos clientes.
- Phase 2 : nav edge-aligned avec menu Popover sous 60rem (fermeture au clic, lien actif par `aria-current`), états des boutons et onglets (survol sous `hover: hover`, actif, désactivé, focus), motion « still » (aucun reveal, aucune transition), reduced motion (smooth scroll conditionnel), hero en `svh` avec photo 1:1, correction de la passe teal du hero (bande grise), phrase d'accroche corrigée (« rue Haute Marcelle 35 à Namur »), horaires fermés lisibles sur l'encre (FAIL 40), `nowrap` sur les boutons, grilles `minmax(0, 1fr)`, finitions. Base.astro importe `page.css` par `<style is:global>@import` (sinon sloplint 34 faux FAIL).
- Mesuré : aucun débordement horizontal de 320 à 1920 ; menu mobile, onglets au clavier, scroll-spy, sans script (panneaux visibles, menu natif). sloplint hero : 0 FAIL, 8 WARN (23 volontaire, 28a faux positif sur images sous le pli, 49 résolu depuis). Build `scripts/q.sh build` OK, noindex + KywFooter + mention sur `index.html` et `404.html`.
- Hero review : **self** (pas d'outil Agent). Comp : trois questions ci-dessous.

## Reproduction du comp (1280x800)
- Masse : comp photo 5:4 sur 6 colonnes, build 1:1 (environ +25 % de surface), titre identique (4 lignes). Intervalle : comp titre puis lead à 8 px, build 24 px avec actions (le comp n'avait pas de boutons ni de nav). Entrée : comp sans nav, build avec nav 72 px ; photo toujours à droite en duotone teal. Plus grand écart : le recadrage carré de la photo (REFLEX 79 : 169 px de vide sous le hero à 1440 avec le 5:4) ; gardé, le titre et l'action restent lus d'abord.

## Reste (phase 3)
- Passe complète sloplint `--render` par route (sur `dist/` servi), axe, QA 1440 et 375 par l'agent « captures », contraste du texte sur passe teal, RAPPORT.md, § Sweep du Picks, `pnpm index`, commit de `dist/` final.
- Compléter la case 8 de DESIGN.md § Sur-utilisation.

## Décisions et hypothèses
- Motion : still, pas de reveal (le thème Overprint l'interdit, prime sur « un reveal par page »). Pas d'état « ouvert » (horaires à confirmer). Pas de formulaire (réservation = lien Barestho de l'original).
- Nav renommée « edge-aligned » (le log avait « ruled bar », dont la forme est la même mais hors liste) ; `.hallmark/log.json` mis à jour.

## Pièges
- Astro dev affiche une barre d'outils en bas des captures (pas dans le site). Le « Réalisé par » du KYW footer mesure 24 px (composant partagé, non touché).
- Un `}` en trop dans `page.css` donne un HTTP 500 en dev : sloplint `--render` l'affiche comme « page did not render », pas comme une erreur CSS.

## Phase 3
- Contraste teal corrigé (accent 67 %), build et index passés, RAPPORT.md écrit.
- Reste : sloplint --render final, finish review, log theme.mjs, 72 cases DESIGN.md, sitemap/robots non voulus.
