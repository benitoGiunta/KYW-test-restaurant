# Révision 1 · Le Servais · legacy
| id | décision | changé (fichier) | preuve |
|---|---|---|---|
| F1-1 | corrige | `src/styles/page.css` : h1 `clamp(1.6rem, 7.2vw, 4rem)` sous 48 rem, `overflow-wrap: normal` | mesure Playwright : 6 pages x 360/390/768/1440 px, 0 mot plus large que le h1, 0 débordement horizontal |
| F1-2 | corrige | `src/pages/evenements.astro` : « concerts gratuits » retiré | grep `dist/` : 0 occurrence |
| F2-1 | corrige | `Horaires.astro` (accueil, contact) : « Le bar ouvre dès 9 h, la cuisine est ouverte sans interruption de 11 h 30 à 22 h. » ; `carte.astro` : « non stop » retiré | grep `dist/` : 0 « non stop » |
| F2-2 | corrige | `carte-cadeau.astro`, `contact.astro` : photo terrasse en colonne droite ; `page.css` : espacements d'en-tête réduits | capture carte-cadeau 1440 : en-tête rempli, plus de vide |
| F2-3 | corrige | `Lieu.astro` : faits du dossier (7/7 dès 9 h, petit-déjeuner week-end, 3 + 1, Verrière) | lecture du source |
| F2-4 | refuse | faux positifs du QA, rien à corriger | revue |
F3 non traités (hors périmètre). Hypothèse : le texte Chalet garde « Du 27 novembre au 31 décembre » sans année.
