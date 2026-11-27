# Révision 2 · Novobel legacy

| id | décision | changement | preuve |
|---|---|---|---|
| F1-A | corrigé | `src/pages/projects.astro` : les deux `<Photo>` (prop `slot`, lue par Astro comme nom de slot) sont enveloppés dans `<section class="band"><div class="container">` | `grep -o '<img'` sur dist/projects = 3 (visite-chantier, cuisine, logo KYW) ; mesure Playwright : images 414 et 552 px de haut à 1440, 183 et 245 px à 390 ; scrollWidth = largeur |
| F2-A | corrigé | `index.astro` : « (délai illustratif) » | grep « à confirmer » = 0 |
| F2-B | corrigé | `Base.astro` : og:image en URL absolue via `Astro.site` | `https://kyw-test-restaurant.vercel.app/novobel/legacy/photos/combles.webp` |
| F2-C | corrigé | `jobs.astro` : « Écrivez-nous. » | grep = 0 |
| F2-D | corrigé | `data/site.ts` : « 14 boîte 1, Rue Emile Cuvelier » (pied et JSON-LD alignés) | grep streetAddress |

Hypothèses : serveur de mesure lancé sur le port 4871 (il a quitté en erreur, la mesure a répondu quand même, sans doute port déjà servi par un autre agent sur le même dist/) ; capture non relue visuellement faute de budget, mesures de boîtes à la place. Pas de sloplint relancé (changements de structure minimes).
