# Yayami Sushi : variante awwwards
**Concept** : « le sceau se pose » : une pièce rouge pleine et son jumeau en filet pointillé, les deux pièces d'un nigiri vendu par deux. **Stack** : Astro 5 + GSAP + Lenis, sans OGL (aucun besoin de WebGL). Base `/yayami/awwwards/`.
**Lancer** : `scripts/q.sh build pnpm build:site sites/yayami-awwwards` puis `node .claude/skills/awwwards/scripts/serve.mjs sites/yayami-awwwards/.qa-root --port 4400` (racine QA : `yayami/awwwards/` + `404.html` + `robots.txt`).

## Scores du critique jury
Non réalisés : aucun outil Agent en session d'agent, donc aucun critique neuf ni passe indépendante. Self-score, non indépendant, non chiffré : la QA repose sur les mesures `report.json` / `audit.log` (captures complètes par l'agent captures, puis corrections vérifiées par shoots complets de l'accueil, de la carte, de la réservation, de la maison et de la 404 réelle). Le superviseur doit lancer `/jury` avec un critique neuf.

## Mesures (passe finale, serveur 4400)
| Page | LCP mobile | CLS | console / requêtes en échec | axe | noHoverChange | idleMotion |
|---|---|---|---|---|---|---|
| Accueil | 1096 ms (img) | 0 | 0 / 0 | 0 | vide | vrai (haut) |
| Carte | 1016 ms | 0 | 0 / 0 | 0 | vide | faux |
| Réservation | 1028 ms | 0 | 0 / 0 | 0 | vide | faux |
| La maison | 1492 ms | 0 | 0 / 0 | 0 | vide | faux |
| 404 (404.html) | 992 ms | 0 | 0 / 0 | 0 | vide | faux |

Aucun débordement horizontal, `reduced.hiddenText` 0, `reduced.moving` false, clavier : focus visible partout, pas de blocage. FPS 60 desktop et mobile (plancher headless). Pas de loader (`loaderMs` null), `settledMs` 2250 à 2520 ms. Audit : 0 FAIL, 1 WARN (« no sitemap » : faux positif sous `base`, `sitemap-index.xml` présent dans `dist/yayami/awwwards/`). Poids : page la plus lourde 414 Ko, JS 60 Ko gz, images 281 Ko, pas de ttf/otf.

## Corrections de la passe
- Accueil : piste des menus focusable au clavier (`tabindex="0"`, `aria-label`), axe `scrollable-region-focusable` supprimé (un `role="region"` sur la liste avait fait apparaître `listitem`, retiré).
- Carte : phrase répétée (« 10 % de remise... ») retirée de l'introduction, gardée dans le pied.
- Liens « Ouvrir le plan » : zone de clic relevée (`inline-block` + `padding-block`).
- Survol : lien de la page courante (rouge), marque (opacité) et numéro de téléphone de la réservation (filet tiré) réagissent désormais.
- Repos : le jumeau pointillé tourne à 18 degrés par seconde et respire de 7 % (9 degrés par seconde n'était pas détecté) ; `idleMotion` vrai sur l'accueil.

## Points non résolus
- [Creativity] `idleMotion` faux sur carte, réservation, maison, 404 : pas de paire visible dans la zone mesurée, immobilité voulue (pages de lecture et de commande). Pour monter : un repos discret sur ces pages.
- [A11y] `contrastNeedsReview` (8 à 16 par page) non revu à l'œil un par un ; source probable : la note du pied KYW (paquet non modifiable ici).
- [Process] Pas de critique jury indépendant, pas de score chiffré, pas de seconde passe.

## Placeholders et hypothèses (à remplacer par le client)
Aucun `placeholder: true` : plats, menus, prix, horaires et coordonnées viennent de `donnees.json`. Hypothèses : photos du site client, créditées « photos : Yayami Sushi » ; accroche « le nigiri se vend par deux » à valider par le client.

## Décisions de théâtre
Pas de loader (LCP 1,1 s, rien à masquer), pas de GL (photos réelles suffisantes), pas de curseur suiveur. Repos : rotation et respiration du jumeau. Accessoire retiré : non fait faute de seconde passe ; candidat le plus faible, la transition à deux demi-volets.

## Leçons structurelles
Voir `data/usage/test-1/lecons-proposees/yayami.md`.
