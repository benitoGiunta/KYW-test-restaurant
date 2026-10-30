# Rapport « Journée »

**Concept en une ligne** : la page d'accueil est un cadran ; six moments (7h → 23h) tournent le ciel (deux arrêts,
aube → nuit), font descendre un soleil qui devient lune sur la frise fixée à droite, et le site s'ouvre à l'heure
réelle du visiteur (loader 00:00 → heure, ciel du hero à l'heure, badge « ouvert jusqu'à » sur les horaires réels,
arrivée douce au moment en cours).

## État

- Gabarit complet : accueil (hero + 6 moments + finale), carte heure par heure, brunch, histoire, réservation, 404 ;
  `dist/gabarits/journee/` buildé (`node scripts/build-site.mjs gabarits/journee` : OK, 6 pages, noindex et pied de
  page KYW contrôlés, une seule mention « Maquette KYW »).
- QA mécanique, passe 1 (shoot des 6 pages une par une, `.shots-journee/<page>/`, planches `planche-<page>.png`) :
  0 erreur console, 0 requête échouée, 0 débordement sur les 6 pages ; reduced-motion : 0 texte caché, rien ne bouge ;
  clavier : focus visible partout, pas de piège ; axe : 1 violation sérieuse (`.bande` défilable sans focus) corrigée ;
  `audit.mjs` : 0 FAIL, 3 WARN (robots.txt et sitemap cherchés à la racine de l'origine, 404 de l'origine : normaux sous `base`).
- Passe 2 (après corrections) : accueil et brunch re-shootés (`.shots-journee/accueil2`, `brunch2`) : 0 erreur, 0 débordement,
  0 petite cible, hover complet, reduced-motion OK ; accueil : LCP 268 ms desktop / 1 288 ms mobile, CLS 0 / 0,003,
  FPS 54 / 35 ; brunch : LCP 212 ms / 4 016 ms (photo hero, passée en `fetchpriority="high"` ensuite), CLS 0,001 / 0,003.
  Axe passe 2 sur l'accueil (ciel corail au moment de la mesure, 17h) : 30 nœuds `color-contrast` (texte doux et
  étiquettes « exemple » à 4,13:1 sur le soleil) → `--encre-doux` du thème corail passé de 0,7 à 0,84 d'encre (≈ 5,5:1),
  rebuild fait, non remesuré par axe (à confirmer par la revue).
- Dernier build après la passe 2 : contraste corail, `fetchpriority` des photos de hero, point du badge « ouvre à »
  cerclé d'encre (invisible sur le ciel corail), pulsation du disque élargie. Non re-shooté.
- Critique `jury` : non lancée ici (règle des agents : revue par un agent distinct).

## Mesures (passe 1, CPU partagé avec deux autres agents)

| Page | LCP desktop (élément) | LCP mobile throttlé | CLS d / m | FPS scroll d / m |
|---|---|---|---|---|
| Accueil | 292 ms (h1 nom) | 1 628 ms | 0 / 0,002 | 41 / 52 |
| Carte | 248 ms (p.lead) | 1 184 ms | 0 / 0 | |
| Brunch | 244 ms | 10 556 ms (photo hero sous `data-intro`, corrigé) | 0 / 0,001 | |
| Histoire | 172 ms | 9 048 ms (idem, corrigé) | 0 / 0,009 | |
| Réservation | 240 ms | 1 268 ms | 0 / 0,002 | |
| 404 | 156 ms | 1 196 ms | 0,001 / 0,004 | |

Loader desktop : 3 064 ms jusqu'à `is-loaded` (plancher 1,1 s + compte + sortie 0,8 s) ; le hero est peint dessous
(LCP 292 ms). Mobile : pas de loader (`#loader` masqué), `loaderMs` 4 611 ms = boot JS throttlé.

Hover par rôle (accueil) : bouton (fond + couleur + transform magnétique), chip (fond soleil), lien flèche (4 px),
carte apéro (lever), marque (opacité). Correction passe 1 → 2 : le lien de navigation de la page courante ne
réagissait pas (soulignement déjà plein) → couleur au survol ; cible « Les Potes au Feu » 20 px → 28 px.

`idleMotion` : false en passes 1 et 2 parce que l'arrivée automatique quitte le hero (l'horloge et son anneau y tournent
chaque seconde) → ajout d'une pulsation du disque de la frise (3 s, composée, coupée par reduced-motion), visible sur
toutes les pages. Décision écrite : l'idle du gabarit est l'horloge du hero (anneau et secondes, chaque seconde) ; le
script ne la voit pas parce qu'il mesure après l'arrivée automatique, hors du hero.

## Placeholders (`placeholder: true` dans `src/data/site.ts`, mention visible à chaque endroit)

Les moments 7h, 9h, 17h et 23h en entier (accroche, lignes, prix) ; 5 des 7 plats de la semaine ; happy hour ;
horaires du bar ; e-mail de contact ; rôles de Sara et Jordan ; accord mets et vins et cocktail ; deux avis clients ;
attribution des photos tartare / Saint-Jacques / pâte au brunch ; page brunch entière (bandeau « illustratif »).
Réels : nom, adresse, téléphone, horaires de cuisine, menu dégustation 67 € et ses services, formule 52 € et lunch
40 €, suppléments fromage, bon cadeau, histoire, chefs, avis Michelin, photos.

## Ce qui manque ou reste ouvert

- Pas de critique extérieure ni de passe « retire un accessoire » : à faire par l'agent de revue (candidats : la
  pulsation du disque, le titre courbé répété deux fois autour des médaillons).
- L'arrivée automatique au moment courant fait que les captures desktop « premier écran » montrent le moment en
  cours et non le hero (l'aperçu est pris avec `#accueil`). À valider par la revue : garder, ou la réserver au clic
  sur une chip.
- Le ciel tweené écrit des variables sur `<html>` (invalidation de style du document à chaque changement de
  section, 1,1 s) : FPS desktop 41 sous contention ; à remesurer seul.
- Les médaillons supposent des assiettes vues du dessus : seule la rosace de pommes l'est vraiment.
- `scrollable-region-focusable` : `.bande` et `.medaillons` portent `tabindex="0"` ; à vérifier au clavier par la revue.
- Le badge lit l'heure du navigateur (pas de jours fériés, pas de fuseau).

## Leçons structurelles (à reporter dans agents/lecons.md)

- Un conteneur `display: grid` (section à `align-content: center`) donne à son enfant `.wrap` un `min-width: auto` :
  une bande `grid-auto-flow: column` ou une rangée de chips `nowrap` à l'intérieur élargit le `.wrap` et crée un
  débordement horizontal (scrollWidth 1565 px sur 1440) même avec `overflow-x: auto` sur la bande → `.wrap { min-width: 0 }`
  et `.cols > * { min-width: 0 }` dans le socle.
- Une bulle masquée par `clip-path` compte toujours dans `scrollWidth` : la borner (`max-width: calc(100vw - 2rem)`,
  ancrée à droite dans l'en-tête mobile).
- Une photo de hero en `data-reveal="clip" data-intro` reste `visibility: hidden` jusqu'à la fin du loader : en mobile
  throttlé c'est l'élément LCP (9 à 10,5 s). Les photos au-dessus de la ligne de flottaison se peignent au premier
  rendu, seules les lignes de texte et les blocs secondaires se révèlent.
- Un mécanisme qui quitte le hero au chargement (arrivée automatique) fait perdre l'`idleMotion` mesuré dans le hero :
  prévoir une respiration sur un élément fixe (frise), ou désactiver l'arrivée pendant la mesure.
- Un petit script Playwright dans le scratchpad fonctionne si l'on importe `launch()` de
  `.claude/skills/awwwards/scripts/browser.mjs` par chemin absolu (pas besoin de copier dans `scripts/`), lancé avec
  `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers` ; il vérifie console, thème, débordement et éléments restés cachés en
  20 s avant un shoot de 14 min.
