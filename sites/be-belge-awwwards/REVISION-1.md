# Révision 1 · Be Belge… et d’ailleurs · awwwards

| id | décision | changement (fichier) | preuve |
|---|---|---|---|
| F1-1 | corrigé | `src/engine/reveal.ts` : SplitText `aria: 'none'` | axe complet après défilement : 0 violation sur 4 pages × 1440/390 px ; 0 `p.statement__texte[aria-label]` |
| F2-1 | corrigé | U+00A0 avant `! : ;` et dans « » : `site.ts`, `index/histoire/carte.astro`, `Footer.astro` | script sur `dist/` : plus d'espace ASCII avant `! ? : ;` dans le texte visible (hors méta) |
| F2-2 | corrigé | note de coulisses supprimée (`histoire.astro`) ; `periodeMenu` = « Menu du chef proposé du 13 août au 6 septembre 2026. » ; « relevé sur le site… » retiré | grep `dist/` : 0 occurrence |
| F2-3 | corrigé | dates gardées une seule fois (bas de `/carte/`), retirées du chapo carte et de l'accueil | grep `dist/` |
| F2-4 | corrigé | « carte du jour », allergie, « régime particulier », « par téléphone » retirés (`carte.astro`, `reservation.astro`) | grep `dist/` : 0 occurrence. Mailto de privatisation gardé : l'e-mail `info@` est dans `donnees.json` |
| F2-5 | corrigé | `couples` : seuls Kriek Boon, liégeoise/cassis (d'ici) et risotto/chorizo (d'ailleurs) classés ; ligne absente non rendue (`site.ts`, `index.astro`) | capture accueil, section couples |
| F2-6 | corrigé | id `c-0..2` (`carte.astro`) | axe : 0 violation, 0 `aria-valid-attr-value` |
| F2-7 | corrigé en partie | `10-salle-profondeur.jpg` recadrée à 1640 px de large (bande blanche retirée) | capture `/histoire/` 1440 px ; inclinaison et enseigne coupée en mobile non traitées |

F3 non traités (hors liste). DESIGN.md inchangé. Build exit 0 ; scrollWidth = fenêtre à 1440 et 390 px.
