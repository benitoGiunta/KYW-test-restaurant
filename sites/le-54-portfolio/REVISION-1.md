# Révision 1 · Le 54 · portfolio (ciblée F0, F1, F2)

| id | décision | changé (fichier) | preuve |
|---|---|---|---|
| F1-1 | corrige | `styles/base.css` : `.header__nom` en visually-hidden sous 768 px (au lieu de `display:none`) ; texte visible conservé, pas d'aria-label (un aria-label donnait `label-content-name-mismatch` à 1440 px) | axe 360/390/1440 x 4 pages : 0 violation |
| F1-2 | corrige | `data/site.ts` `horairesResume()` : jours « à confirmer » exclus du calcul, ligne « Lundi : à confirmer » ajoutée ; `layouts/Base.astro` : JSON-LD sans le lundi | dist : « Lundi à confirmer », 0 « Monday » |
| F2-1 | corrige | méta descriptions menu, salle, carte, reservation, 404 | grep `du Le 54\|au Le 54` dans dist : 0 |
| F2-2 | corrige | `Footer.astro` : `<footer>` en `<section aria-label="Contact et horaires">` | 1 seul `<footer>` par page ; axe contentinfo 0 |
| F2-3 | corrige | `HeroPage.astro` : chiffre retiré du h1 ; `Chapitre.astro` + `Chiffre.titre` : « 3 ou 4 services » pour lecteurs d'écran | h1 `/menu/` = « Le menu » |
| F2-4 | refuse (partiel) | répétitions de contenu non retouchées (horaires du pied = normal, allergies) : arbitrage au prochain passage | - |
| F2-5 | corrige | `site.ts` citation : « …pas une seule fois nous avons été déçu… » | présent dans la page d'accueil |
| F2-6 | refuse | répartition des photos : choix éditorial laissé au prochain passage (15 photos, pas de risque de fait faux) | - |
| F3-1, F3-2 | corrigés au passage | heures « 18 h 30 à 21 h » (`hfr`), `.horaires dt` sans `lowercase` (PMR) | « Accès PMR » dans /salle/ |

Corrigés 6 (F1-1, F1-2, F2-1, F2-2, F2-3, F2-5), refusés 2 (F2-4, F2-6), impossibles 0. DESIGN.md inchangé.
Note : à 360 px la home a scrollWidth 378 (images de la galerie mobile, défilement horizontal par conception, déjà dans ETAT.md) ; non lié à la révision.
