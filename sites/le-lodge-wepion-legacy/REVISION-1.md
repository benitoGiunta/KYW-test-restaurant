# REVISION-1 · Le Lodge Wépion · legacy (20/11/2026)

Constat : à l'ouverture de cette passe, les sources contenaient déjà les correctifs de F1 et F2 (ils figuraient dans l'arbre commité, `dist/` à jour après rebuild) ; cette passe les a vérifiés un par un, rebuild final via `scripts/q.sh`, sans nouvelle modification de code. Serveur `serve.mjs dist --port 4893` arrêté (PID noté, `kill`).

| id | décision | changement (fichier) | preuve |
|---|---|---|---|
| F1-1 favicon | corrige | `public/favicon.svg`, `<link rel="icon">` dans `Base.astro` | `rel="icon"` présent sur 3 pages ; 0 erreur console/HTTP à 1440, 390, 360, 320 |
| F1-2 JSON-LD, OG | corrige | `Base.astro` : `Restaurant` (adresse, tél., url, sameAs, sans `openingHours`), `og:image/type/url`, `public/og.jpg` | grep `ld+json`, `og:image` : 1 par page sur les 3 pages |
| F2-1 inventions | corrige | `index.astro` : « en attendant la réouverture », « vallée mosane » retirée, titre « Produits cités sur la carte » | grep `reconstruction|vallée|Mil.pat` dans `dist/` : 0 |
| F2-2 hero mobile | corrige | `page.css` sous 60rem : photo en bandeau 4/3 au-dessus de la plaque | capture 390 px : façade de nuit visible (image 108-401 px, plaque dès 361 px) |
| F2-3 focus du menu | corrige | `Base.astro` : `inert` sur skip, main, pied, barre, kyw-footer à `beforetoggle` | 8 Tab menu ouvert : Fermer, 4 liens, Réserver, puis sortie navigateur, retour à Fermer ; 0 élément hors menu ; Échap rend le focus à « Menu » |
| F2-4 landmarks | corrige | `Footer.astro` : `<section aria-labelledby>` ; `.collant` en `<aside aria-label="Réservation">` | 1 seul `<footer>` par page dans `dist/` (axe non relancé : hors périmètre) |
| F2-5 onglets | corrige | `site.ts` « Entrées » ; `.seg` sur une ligne (`overflow-x: auto`) sous 60rem | tops des 4 onglets identiques à 390, 360, 320 px ; scrollWidth = fenêtre |

Bonus F3 déjà en place : F3-1 `nowrap` sur « tea-room » (le titre fait 3 lignes à 1440 px, pas de coupure au trait d'union), F3-3 « Où nous trouver », F3-5 `home={false}` sur cookies et 404 (aucune barre fixe, mesuré).
Non traité : F3-2 (espaces insécables avant « : », non revérifié), F3-4, F3-6.
Hypothèse : aucun changement de design, DESIGN.md inchangé.
