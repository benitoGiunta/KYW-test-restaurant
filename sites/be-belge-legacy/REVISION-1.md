# Révision 1 · be-belge legacy (ciblée F1, F2)
| id | décision | changé (fichier) | preuve |
|---|---|---|---|
| F1-1 JSON-LD + og:image | corrige | `src/layouts/Base.astro` : JSON-LD `Restaurant` (adresse, tél., geo, horaires générés depuis `jours`), `og:image` absolue (façade jardin), `twitter:card` summary_large_image | `grep -c ld+json` = 1 sur 7 pages sur 7 ; og:image = https://…/be-belge/legacy/photos/02-facade-jardin-1600.webp |
| F2-1 ponctuation | corrige | U+00A0 avant « ! ? : ; » dans `data/site.ts`, `Contact.astro`, `reservation.astro`, `carte.astro`, `index.astro`, `Footer.astro`, `menu.astro` | grep du texte servi : plus d'espace simple avant ponctuation haute (hors JSON-LD méta) |
| F2-2 menu périmé | corrige | « Dernier menu publié, proposé du… » dans `Formules.astro` (accueil) et `carte.astro` ; « Une table pour ce soir ? » devient « Envie de venir ? » | grep dist : 2 occurrences « Dernier menu publié » sur accueil/carte, 0 « pour ce soir » |
| F2-3 contentinfo double | corrige | `Footer.astro` : `<footer>` devient `<section aria-label="Coordonnées">` ; `kyw-footer` intact | mesure Playwright : 1 repère footer/contentinfo par page (6 pages, 1440 et 390 px) |
| F2-4 cibles < 24 px | corrige | `styles/page.css` : `min-block-size: 24px` + `display:inline-block` sur `.link`, `.close a`, `.counter a`, `.wall a` | mesure : 0 lien/bouton < 24 px de haut sur 6 pages à 1440 et 390 px, 0 débordement horizontal |
| F2-5 héros bureau | corrige | `index.astro` : `pos="50% 22%"` | capture 1440x900 : façade éclairée visible dans le bandeau |

F3 non traités (hors périmètre de la passe). Build `pnpm build:site` : OK. Sloplint : voir journal. Hypothèse : `Astro.site` (kyw-test-restaurant.vercel.app) sert de base absolue pour og:image/JSON-LD.
