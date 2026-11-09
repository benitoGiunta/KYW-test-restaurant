# Révision 1 · legacy · La Ferme Blanche d'Asie

Périmètre : F2 seulement (aucun F0/F1). F3 non traités (hors consigne). Rebuild OK via `scripts/q.sh` (6 pages).

| id | décision | changé (fichier) | preuve |
|---|---|---|---|
| F2-1 | corrigé | `src/layouts/Base.astro` : `openingHoursSpecification` (6 blocs, horaires de `donnees.json`) + `email` dans le JSON-LD ; import `semaine` retiré | `grep -c openingHoursSpecification dist/…/index.html` = 1 ; `"email":"lafermeblanchedasie@gmail.com"` présent |
| F2-2 | corrigé | `src/components/Horaires.astro` (deux `span.plage`, « et » collé à la première), `src/data/site.ts` (« à minuit » au lieu de « 00 h 00 »), `src/styles/page.css` (`.plage{white-space:nowrap}`) | Playwright 390 px : 7 jours, chaque plage tient sur une ligne (hauteur 20 px), retour à la ligne entre plages ; 1440 px : une ligne ; 0 occurrence « 00 h 00 » dans `dist/` ; `scrollWidth` = fenêtre |
| F2-3 | corrigé | `src/data/site.ts` (`fix()`) : « (contient œuf, gluten, soja, sésame) », « Tofu sauté au beurre d'ail » | `grep` dist : « (contient Œuf, gluten, soja, sésame) » ; 0 « Contient », 0 « ,) », 0 « sautés au beurre ail ». Reste : « Œuf » majuscule interne, venant de la source. Libellé du tofu à valider avec le client |
| F2-4 | corrigé | `src/data/site.ts` (`credits`) : parenthèse « filigrane recadré » retirée | 0 occurrence « filigrane » dans `dist/`. Droit d'usage des 10 photos à valider avec le client (à répéter dans le RAPPORT) |
| F2-5 | corrigé | `src/styles/page.css` : `.dl dd a{display:inline-flex;min-block-size:44px}` | Playwright contact : téléphone, e-mail, Facebook = 44 px à 390 et 1440 px |

Hypothèses : « Œuf » interne laissé tel quel (source) ; DESIGN.md inchangé (aucune décision de design modifiée).
sloplint (`src` + URL, genre atmospheric) : 0 FAIL, 3 WARN (49, libellés de boutons préexistants), 2 NOTE.
