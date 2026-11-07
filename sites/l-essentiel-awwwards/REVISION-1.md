# Révision 1 · L'Essentiel awwwards

| id | décision | changement (fichier) | preuve |
|---|---|---|---|
| F1-1 | corrige | `site.ts` (`histoire.accueil` raccourci), `histoire.astro` (« à confirmer » retiré) | grep dist : 0 occurrence |
| F1-2 | corrige | `site.css` : `.infos__col .marge__titre { grid-column: auto }` | Playwright : 1 colonne de 358 px à 390, 3 colonnes à 768 et 1024, 0 débordement |
| F1-3 | corrige | `tabindex="0"` sur les deux `ul.bandes` (`index.astro`, `histoire.astro`) | grep dist : présent ; axe non relancé |
| F2-1 | corrige | `site.css` : `.gros__val` et `.pied__tel` en Hanken Grotesk (`--f-body`) | CSS ; capture non relue |
| F2-2 | corrige | `reservation.astro` : tuile e-mail déplacée dans « Adresse », description sans « par e-mail » | grep dist : 1 mailto, 0 « par e-mail » |
| F2-3 | corrige | « la mode » retiré de `retrait.biffes` ; 404 : « Il reste l'essentiel » | grep dist : 0 occurrence |
| F2-4 | corrige | `photo` retiré des 3 plats (entrée, poisson, biche) ; petits gris gardé | `site.ts` |
| F2-5 | corrige | `aria-label="Moyens de réserver"` | grep dist : 1 |

F3 non traités (hors périmètre). Build : OK via scripts/q.sh. Hypothèse : le focus visible des rails reprend l'outline global 3 px.
