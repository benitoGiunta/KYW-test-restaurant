# Révision 1 · La Ferme Blanche d'Asie · portfolio
Révision ciblée des F2 (aucun F0/F1). 8 corrigés, 0 refusé, 0 impossible. F3 non traités. Aucun changement de DESIGN.md.

| id | décision | changement | preuve |
|---|---|---|---|
| F2-1 | corrige | `pages/salles.astro` : « est proposé à la carte » | grep `dist/` : « toute l’année » absent, nouvelle phrase présente |
| F2-2 | corrige | `pages/maison.astro` : « plus intime. » | grep `dist/` : « vue sur la terrasse » absent |
| F2-3 | corrige | `data/site.ts` : note = « Dessert au choix. » | grep `dist/` : « à compléter » absent |
| F2-4 | corrige | `components/Plan.astro` : libellé « Ferme Blanche » dans le rectangle du bâtiment (x 240, y 137) | getBBox : x 240 à 336 < bord 340, 1440 et 390 px ; capture plan 390 px lue, rien ne croise le losange |
| F2-5 | corrige | `Rouleau.astro` : le chiffre en tête est le numéro de carte (rien pour le menu découverte, qui n'en a pas) ; fin de ligne « n° … » conservée | HTML : 81, 48, 49, 57… ; plus de rang concurrent |
| F2-6 | corrige | `data/site.ts` : sous-titres vides pour Casserole de fruits de mer et Plat royal ; seul « n° 48 » / « n° 49 » reste (sans « · » en tête) | HTML : `<p class="plat__mots"><span class="plat__carte">n° 48</span></p>` |
| F2-7 | corrige | `public/photos/` : parking, facade-jardin, facade-kiosque (1280 px, WebP q62), terrasse (q60) | `dist/` : 224, 221, 210, 251 Ko (tous <= 251 Ko) |
| F2-8 | corrige | `components/Footer.astro` : `<footer>` du site devenu `<section aria-label="Coordonnées et horaires">` ; seul `kyw-footer` reste `contentinfo` | axe (landmark-no-duplicate-contentinfo, landmark-unique, region) : 0 violation sur /, /salles/, /reservation/ à 1440 et 390 px ; 1 `<footer` par page |

Build : `pnpm build:site` OK (6 pages). Hypothèse : la page /carte/ n'a pas de rouleau, vérifié sur l'accueil.
Le `.plat__carte` redevient redondant avec le chiffre de tête en mode épinglé (même numéro, aucun conflit).
