# REVISION-1 (makimono-portfolio, passe 1)

| id | décision | changement (fichier) | preuve |
|---|---|---|---|
| F1-1 | corrigé | `base.css` : `.horaires` en `minmax(0,1fr)`, heures `clamp(1.5rem,2.4vw,2.6rem)` nowrap (4,2,1 colonnes) | `right` des 7 cartes ≤ largeur de fenêtre à 390, 768, 1024, 1280, 1440, 1920 (ex. 1416 à 1440) |
| F1-2 | corrigé | style inline retiré (`index.astro`, `commander.astro`), classe `etapes__trois` (3 col. dès 1024, 1 col. dessous) | `ol` 342 px à 390, 720 à 768 ; scrollWidth = largeur partout |
| F1-3 | corrigé | `base.css` : liste `min(3.2vw, 6.6svh)` nowrap, plat `min(…, 34svh)`, prix borné `11svh` | à 1280x720, 1440x780, 1440x900, 1920x1080 : 5 étapes et prix sous le bas de scène (mesure reduced-motion, `getBoundingClientRect`) |
| F2-1 | corrigé | `site.ts` (`note: true`, « Geys_ 70 »), `index.astro` : notes sans guillemets | grep dist |
| F2-2 | corrigé | `site.ts`, `venir.astro` : « Pas d'outil de réservation en ligne trouvé. Téléphone : … (à confirmer) », « par téléphone » retiré | grep dist |
| F2-3 | corrigé | `carte.json` : phrase de travail retirée, prix « 10,50 à 11,00 € (à confirmer) » | grep dist : « page photo » = 0 |
| F2-4 | corrigé | `carte.json` : note de catégorie « Prix selon la protéine choisie, le plus bas est affiché » | grep dist |
| F2-5 | corrigé | `carte.json` : 51 minuscules normalisées + « piments mexicains », « graines de sésame » | grep dist : 0 occurrence |
| F2-6 | corrigé | classe `display--mot` (nowrap, `min(mega, 8.6vw)`) sur les h1 composer/commander | h1 d'une seule ligne à 390, 1440, 1920 |
| F2-7 | corrigé | écart entre étapes 0,5em, sous-titre collé au titre (`base.css`) | mesure de hauteur, pas de capture visuelle (hypothèse) |
| F2-8 | corrigé | état éteint opacité 0,62 (≈ 6:1 calculé sur #17261f), numéro allumé en saumon | calcul, pas de passe axe (passe suivante) |

Hypothèse : F2-7 et F2-8 non revérifiés à l'œil ni à axe (révision ciblée). Aucun changement de DESIGN.md.
