# Révision 1 · bergerie-lives legacy (ciblée : F1, F2 ; pas de F0)
| id | décision | changé | preuve |
|---|---|---|---|
| F1-1 | corrige | `src/styles/page.css` : `#h-venir` étendu sur 12 colonnes | largeur du h2 mesurée : 1086 px (1440), 55 px de haut ; 358 px à 390 et 328 à 360 (1 ligne) ; scrollWidth = largeur fenêtre aux 5 largeurs |
| F2-1 | corrige | `Footer.astro` : `<footer>` devenu `<section class="foot" aria-label="Coordonnées">` | 1 seul `<footer>` par page (grep dist) ; axe : 0 violation sur mariage et réservations, `color-contrast` « à vérifier » sur l'accueil (faux positif déjà documenté par la revue, 0 cas réel au canvas) ; pas de `region` |
| F2-2 | corrige | légende ramenée à « Sortie de cérémonie. » | grep dist : 0 occurrence de l'ancienne |
| F2-3 | corrige | `site.ts` : boutons « Voir la page sur le site d'origine », mention PDF retirée | grep dist : « Ouvrir la brochure » absent |
| F2-4 | corrige | crédit « Photographies : site d'origine. » | grep dist : ancienne mention absente |
| F2-5 | corrige | « Réserver une visite (site d'origine) » | source |
F3 non traités (hors périmètre ciblé). Build : OK. Sloplint et DESIGN.md non touchés (aucune décision de design changée).
