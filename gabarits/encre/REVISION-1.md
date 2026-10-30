# Révision 1 · gabarit encre · Les Potes au Feu

Revue traitée : `REVUE-1.md` (0 F0, 3 F1, 5 F2, 4 F3). Vérité : `data/restaurants/les-potes-au-feu/donnees.json` et
`dossier.md` (take-away / livraison : inconnu ; e-mail : inconnu ; menu unique 4 services 67 €).
Mesures : mini-script Playwright (`launch()` de browser.mjs), 6 pages × 390 et 1440 px, serveur :4431 arrêté par son PID ;
captures `shoot.mjs` de index, emporter, carte, réservation dans `.shots-encre-rev/<page>` (planches `planche-<page>.png`).

| Finding | Décision | Ce qui a été changé (fichier) | Preuve de vérification |
| --- | --- | --- | --- |
| F1-1 bandeau sur l'en-tête (emporter) | corrige | Bandeau déplacé dans le hero, sous l'en-tête (prop `bandeau` de `HeroPage.astro`, retiré de `emporter.astro`) ; style ivoire + filet vermillon, colonne 3 de la grille du hero en desktop (`base.css`) | 390 px : en-tête 0–107, bandeau 295–415 ; 1440 px : en-tête 0–75, bandeau 353–498 (x 676–931). Aucun recouvrement. Capture `emporter/m-01`, `d-01` |
| F1-2 plats d'exemple non marqués | corrige | Pastille « exemple » (`.illu--pastille`, cerclée vermillon, 12 px) dans chaque `h3.plat__nom` (`Rouleau.astro`) ; CTA « Dérouler un exemple de carte » (`index.astro`) ; lien « Voir la vraie carte (4 services, 67 €) » en fin de rouleau et sous le rouleau de l'accueil | 12 pastilles / 12 plats sur index et carte, aux deux largeurs ; liens vers `/carte/` (200) |
| F1-3 Emporter dans la nav | corrige | Lien retiré de la navigation principale (`Header.astro`) ; lien « À emporter · page d'exemple » dans le pied de page (`Footer.astro`) ; prix supprimés de `site.emporter.lignes`, affichés « Prix à définir » (`emporter.astro`, `site.ts`) | Nav = La carte, L'histoire, Réserver sur les 6 pages ; 4 « Prix à définir », 0 prix chiffré sur emporter |
| F2-1 loader 3,2 s | corrige | `engine/loader.ts` : plancher 1,1 → 0,9 s, convergence 0,12 → 0,2 ; `motion/setup.ts` : sortie 0,45+0,9 → 0,3+0,6 s | Mini-script `goto` + fin du loader : 2,05 à 2,27 s (12 mesures) ; shoot.mjs `loaderMs` desktop 2 338 (index), 2 354 (emporter), 2 623 (carte, loadMs 755), 2 175 (réservation), contre 3 195/3 220 avant |
| F2-2 concept effacé en mobile | corrige | h1 accueil 46 px en ≤ 767 px ; « Le rouleau » reste vertical (28 × 162 px) à gauche de la note ; bande alignée en haut, padding réduit (`base.css`) | 390 px : h1 46 px, mot le plus long dans 358 px, scrollWidth 390 ; `writing-mode: vertical-rl` mesuré ; capture `index/m-02` |
| F2-3 e-mail inventé | corrige | Retiré du pied de page et de la réservation (« Une question : par téléphone ou via Zenchef. ») ; donnée gardée `placeholder: true` dans `site.ts`, non affichée | `@lespotesaufeu` absent du texte des 6 pages et de `dist/` (grep) |
| F2-4 survol CTA et sceau | corrige | CTA : la flèche descend de 0,3 em en plus du trait raccourci, aussi au focus (`base.css`) ; sceau inchangé (déjà correct) | Mini-script : `::after` matrix(1) → matrix(0.3), `::before` → translateY 4,6 px ; sceau `rotate(8°)` (matrix 0.990, 0.139) au survol |
| F2-5 `.illu` 10,2 px | corrige | `.illu` en `max(12px, var(--t-xs))`, graisse 400 ; astérisque `max(12px, 0.85em)` | Taille minimale des `.illu` visibles = 12 px sur les 12 mesures |
| F3-1 horaires répétés | corrige | `horairesGroupes()` (`site.ts`) : jours consécutifs identiques regroupés dans Venir, pied de page, réservation | `dist/index.html` : « lundi et mardi 19:00 à 21:00 », mercredi, jeudi, vendredi, samedi, dimanche (les jours non consécutifs restent séparés : les horaires du dossier alternent) |
| F3-2 404 sans signature | refuse | F3 de finition qui touche la composition des pages intérieures ; hors des corrections demandées, à reprendre lors d'une passe design | — |
| F3-3 contraste muted | refuse (vérifié) | Aucun changement : `#66605A` sur `#F6F1E6` = 5,5:1, accent `#C6341F` = 4,77:1 (calcul WCAG) ; axe ne tranche pas à cause de la texture, mais les couleurs passent | calcul de luminance relative |
| F3-4 formulaire date/heure | corrige (heure) / impossible (format de date) | `min`/`max` du champ heure calculés par `plageHoraire()` (12:00–21:00), pas 15 min ; le format `mm/dd/yyyy` vient de la locale du navigateur (contrôle natif) | attributs présents dans `dist/reservation/index.html` |

Bilan : 10 corrigés (3 F1, 5 F2, 2 F3), 2 refusés (F3-2, F3-3), 1 impossible partiel (format de date natif).

## Contrôles après correction (shoot.mjs, `.shots-encre-rev/<page>/report.json`)
- index, emporter, carte, réservation : 0 erreur console, 0 requête échouée, 0 violation axe, `overflowX` false en 1440 et 390.
- Survol : CTA du hero « Dérouler un exemple de carte » `moves` (transform) ; seuls restent sans retour détecté le lien
  « Voir la vraie carte » de fin de rouleau (dans la piste épinglée, hors champ au moment du survol ; `.link` change de
  couleur et de soulignement) et le lien courant « La carte » (déjà souligné, `aria-current`).
- Mobile throttlé : `loaderMs` 4,8 à 5,9 s = démarrage JS (leçon braise), hors périmètre de cette revue ; à surveiller en passe 2.
- Planches lues : `planche-index.png` (pastilles « EXEMPLE » sur chaque plat, « Le rouleau » vertical en 390 px, CTA
  renommé), `planche-emporter.png` (bandeau sous l'en-tête, « Prix à définir », lien d'exemple en pied de page),
  `planche-reservation.png` (plus d'e-mail : « Une question : par téléphone ou via Zenchef. »).
- `apercu.png` régénéré depuis `index/d-01-hero.png` (libellé du CTA changé), galerie relancée après le rebuild.
