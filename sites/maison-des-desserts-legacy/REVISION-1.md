# Révision 1 · legacy · La Maison des Desserts

Hypothèses : F0 absent ; F3 non traités (révision ciblée F0/F1/F2). Corrigés 7 / refusés 0 / impossibles 0.

| id | décision | changement (fichier) | preuve |
|---|---|---|---|
| S1 | corrige | JSON-LD `Bakery` (adresse, tél., horaires mar-sam 8-18, geo, sameAs) dans `src/layouts/Base.astro` | grep : 1 `application/ld+json` sur index et contact |
| C1 | corrige | `src/data/site.ts` : « Pâtisseries et macarons faits maison. » ; « …spécialité de la maison. » | texte dans dist |
| B1 | corrige | `src/scripts/site.js` : `Number(parts.day/month)` | horloge simulée 2027-01-01 10:00 : « Fermé aujourd’hui » ; vendredi 12:00 : « Ouvert maintenant » |
| C2 | corrige | `src/data/carte.json` : « La cuisine de midi » / « La cuisine de l’après-midi » | index et H2 de dist/carte |
| C3 | corrige | `site.ts` (`lignes`) + `index.astro` : panneau Chocolaterie = Pralines artisanales, Biétrumés, Macarons de Paris | dist/index.html |
| M1 | corrige | canonical et og:image absolus (origine de `site`) ; 404 sans canonical ni JSON-LD (`nocanon`) | grep dist |
| N1 | corrige | `page.css` : menu popover `inset: var(--nav-h) 0 0 0`, hauteur jusqu'en bas, fond opaque | 390 px : bas du panneau 844 = hauteur fenêtre, scrollWidth 390 |

Sloplint (source + URL accueil) : 1 FAIL, 0 REFLEX nouveau, déjà signalé comme faux positif par le constructeur ; non réexaminé. Build OK (q.sh), serveur arrêté.
