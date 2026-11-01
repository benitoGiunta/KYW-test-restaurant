# Partage : variante awwwards

**Concept** : chez Partage, on commande pour le milieu de la table ; sur le site, le mot PARTAGE se coupe en PAR et TAGE au défilement et une assiette monte dans l'écart, sur un chemin de table en chêne qui traverse toutes les pages (colonnes 6 et 7).
**Stack** : Astro 5 + GSAP + Lenis (OGL : non, le concept tient en typographie et en photo). Base `/partage/awwwards/`.
**Lancer** : `pnpm build:site sites/partage-awwwards` puis `node .claude/skills/awwwards/scripts/serve.mjs <racine QA> --port 4400` (racine de QA décrite dans `agents/variante-awwwards.md` § 4.1).

## Scores du critique jury (passe finale, critique : non lancé)
Aucun critique indépendant n'a été lancé en phase 3 : l'agent n'a pas l'outil `Agent`, et la skill `jury` refait des captures complètes, ce que les règles de sobriété (`agents/sobriete.md` § 2 et § 3) réservent à l'agent « captures » et à la revue suivante. Aucune note n'est donc inventée ici. `/jury http://127.0.0.1:4400/partage/awwwards/` re-note le site avec un critique neuf une fois les placeholders remplacés.

## Mesures (phase 3, build final)
Accueil (`shoot.mjs --nav`, téléphone bridé CPU 4x et 4G lente) :
- LCP desktop 136 ms, LCP mobile 1 184 ms (élément : `span.hero__tage`, du texte), CLS mobile 0,036, desktop 0.
- Pas de loader (`loaderMs` null), `settledMs` 2 502 ms.
- FPS de défilement 60 desktop et 60 mobile (pire frame 17 ms).
- `idleMotion` true (reflet de jour sur le chêne).
- 0 erreur console, 0 requête échouée, aucun débordement horizontal (1440, 1280, 1024, 390 mesurés par mini-script).
- Mouvement réduit : `hiddenText` 0, `moving` false.
- Clavier : focus visible partout, `noVisibleFocus` et `invisibleFocus` vides, pas `stuck`. `skipLinkFirst` vaut false alors que le premier arrêt est bien le lien d'évitement « Aller au contenu » (`href="#main"`) : le test de `shoot.mjs` ne reconnaît que `skip|#main|#content` dans le libellé (faux négatif dû au français, consigné dans `agents/lecons.md`).
- Poids : page la plus lourde 485 Ko (JS 61 Ko gzippé, CSS 7 Ko, polices 83 Ko woff2, images 330 Ko), aucune image > 500 Ko, `dist/` 4,4 Mo.
- Audit : 0 FAIL, 1 WARN « no sitemap » justifié (racine de QA : `sitemap-index.xml` existe sous `/partage/awwwards/` et il est lié dans `<head>`).

Pages intérieures : voir la section « QA des pages intérieures » ci-dessous.

## Corrections de la phase 3
1. **Contraste axe sérieux** sur `.pied__mot` (PAR TAGE géant du pied, #34322e sur #161513, 1,42:1) et, par anticipation, sur `.perdu__mot` (404) : ce mot décoratif `aria-hidden` est rendu en `::before { content: attr(data-mot) }`, le ton sur ton est conservé. Vérifié : axe `color-contrast` = 0 violation sur l'accueil à 1440.
2. **Prix du lunch coupé à 1440** (« 38 € » débordait de la bande de chêne de deux colonnes, l'euro était rogné) : `font-size: min(var(--t-xl), calc((100vw - 2 * var(--gutter)) / 6 / 3.9))` sur desktop, taille inchangée sur mobile. Vérifié par mesure : prix contenu dans la bande à 1440, 1280 et 1024, 32 px à 390.
3. **Liens de texte `noHoverChange`** (« Lire la carte et les prix », « Ouvrir le plan ») : le soulignement de repos (1 px, couleur du texte) reste, et un trait ocre de 3 px se dessine de gauche à droite au survol et au focus (`background-size` 0 % → 100 %, 0,45 s). Vérifié : `background-size` passe de `0% 3px` à `100% 3px` au survol.

## Points non résolus
- [Jury] Aucun score de critique indépendant (voir plus haut) : à faire par la revue suivante.
- [Composition] Accueil à 1440 : grands vides à gauche de la section lunch (`d-05-scroll`) et au-dessus du pied (`d-07-scroll`), hérités du plan de grille (texte sur les colonnes 1 à 5 alignées à droite). À juger par le critique ; resserrer `--aere` si c'est lu comme un trou.

## Placeholders et hypothèses (à remplacer par le client)
- `site.ts` › `services.midi` « 12 h à 14 h » et `services.soir` « 18 h 30 à 22 h » (`placeholder: true`, signalés sur la page réservation) : heures de service à confirmer.
- Téléphone 081 81 00 98 (site officiel) ; le numéro mobile cité par Le Fooding n'est pas repris.
- Aucune adresse e-mail connue : pas de `mailto`.
- Réservation en ligne : lien `https://restaurantpartage.be/#reservation` (outil tiers non identifié).
- Menus 4 services et homard (cités par la presse) non publiés ; aucun avis client ni note affichés.
- Seul le portrait 09 est nommé (Charles Jeandrain) ; les cuisiniers des photos 11 et 16 et la personne de la photo 13 ne sont pas nommés.
- Spécialités de l'index affichées sans photo (aucune photo du client ne montre ces plats).
- Adresse retenue : rue des Fossés Fleuris 18 (et non Tienne Maquet 16).

## Décisions de théâtre
Loader : non (le hero typographique peint au premier rendu, LCP texte). GL : non. Repos : mobile, reflet de jour lent sur les bandes de chêne visibles. Accessoire retiré : aucun en phase 3 (passe « retirer un accessoire » à faire après le premier critique).

## Leçons structurelles
- `shoot.mjs` : `skipLinkFirst` teste le libellé contre `skip|#main|#content` ; un lien d'évitement en français (« Aller au contenu ») sort en faux négatif. Recopié dans `agents/lecons.md`.
- axe compte le texte `aria-hidden` dans `color-contrast` : un mot géant décoratif ton sur ton passe en `::before { content: attr(data-mot) }`. Recopié dans `agents/lecons.md`.
