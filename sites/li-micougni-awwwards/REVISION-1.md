# Révision 1 · Li Micougni · awwwards

| id | décision | changement (fichier) | preuve |
|---|---|---|---|
| F1-1 | corrigé | `src/pages/carte.astro` : photos retirées pour « Les pâtes » et « Desserts » | dist/carte : 0 alt « poisson en sauce » ; « velouté » 1 occurrence = nom de plat |
| F1-2 | corrigé | `src/styles/site.css` : `.hero__photo picture {display:block;height:100%}`, `object-position: 50% 85%` | mesure : img 776x485 = cadre à 1440, 350x262 à 390 ; capture : flammes visibles ; scrollWidth 1440/390 |
| F2-1 | corrigé | `src/data/site.ts` : phrase boulettes neutralisée (formulation proposée par la revue) | grep dist : 0 « restent. » |
| F2-2 | corrigé | `src/components/Footer.astro` : `<footer>` en `<section aria-label="Contact et liens">` | dist/index : 1 seul `<footer>` |
| F2-3 | corrigé | `site.css` : `.carte-index ul` en `flex-wrap` dès 48 rem | à 1440 : scrollWidth rail = clientWidth = 1440 |
| F2-4 | corrigé | `carte.astro` : « Elle évolue au fil des mois. » | grep dist : 0 « appelez avant » |

Hors liste, faits au passage : F3-2 (« produits locaux » à la place de « producteurs d'ici »), F3-3 (largeur 1200 retirée du hero, plus grosse webp 364 Ko, la 960 sert aux écrans courants), F3-4 (14 px sur légendes et « Terrasse arrière »).
Non traités : F3-1 (og.png à recomposer), F3-5 (photo 404). Axe-core non relancé (hors périmètre ciblé).
Hypothèse : « Les escargots sont de Namur » (F3-2) n'existe plus dans src ; rien à changer.
Refus : 0 · Impossibles : 0. DESIGN.md inchangé.
