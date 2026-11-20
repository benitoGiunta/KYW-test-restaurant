# REVISION-1 — Le D’Arville, awwwards (révision ciblée F1, F2)

Hypothèse : F0 absent de la revue ; seuls F1-1 et F2-1 à F2-8 traités. Build : `pnpm build:site` OK.

| id | décision | changement | preuve |
|---|---|---|---|
| F1-1 accents rognés | corrigé | `engine.css` : `.split-line` `padding-top/margin-top 0.28em` ; `site.css` : `.page-tete .etiquette + .display` marge compensatoire (l’accent du À de la réservation chevauchait l’eyebrow) | captures `.shots-le-d-arville-awwwards-rev/acc-d-carte-0, acc-m-carte-0, acc-d-hist-0, m-resa-top` : À visibles à 1440 et 390 ; 0.16em ne suffisait pas à 390 px |
| F2-1 LCP | corrigé | `Photo.astro` prop `repli`, hero `repli={800}` + `sizes` 55vw mobile (`index.astro`) | LCP mobile (4x CPU, 4G lente, DPR 2,6) 1 024 / 1 048 ms, AVIF 97 Ko ; repli `src` 800 w = 129 Ko |
| F2-2 contentinfo | corrigé | `Pied.astro` : `footer` devient `section aria-label` | axe `landmark-no-duplicate-contentinfo` et `region` : 0 violation sur 4 pages x 1440/390 (404 non remesurée) |
| F2-3 route d’Arville | corrigé | `site.ts` : « rue d’Arville » | grep dist : 0 occurrence |
| F2-4 apéritif | corrigé | `index.astro` : « Terrasse, jardin et point d’eau entourent la ferme. » | grep dist |
| F2-5 procédures | corrigé | `reservation.astro`, `site.ts` (Offrir : « voir le site du restaurant, ledarville.be »), `carte.astro` (Bon Plan, eyebrow « jusqu’au 20 décembre 2026 ») | grep dist : 0 « se demandent / demandez-les / à confirmer » |
| F2-6 desserts | corrigé | `site.ts` : « Prix non communiqués. Le dessert de la carte fait partie des deux menus. » | texte |
| F2-7 filigrane | corrigé | cadres chef 4/5 + `object-position` haut (`site.css`), bas de photo coupé | `chef.png` : filigrane absent. À signaler au client. |
| F2-8 formulaire | corrigé | `method="get"`, champ `body` | grep. Non testé avec un client mail réel. |

Débordement horizontal : scrollWidth = largeur à 1440 et 390 sur 4 pages. Findings corrigés 9, refusés 0, impossibles 0. Publiable : oui.
