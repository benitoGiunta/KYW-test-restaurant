# Révision 1 · escale-en-vue · awwwards

| id | décision | changé (fichier) | preuve |
|---|---|---|---|
| F1-1 | corrige | `reservation.astro` : phrase remplacée par « servi du jeudi soir au dimanche midi » | grep « sur place » : 0 occurrence |
| F1-2 | corrige | `index.astro` (ligne `.hero__saison` dans le héros, « En saison : » devant les horaires), `reservation.astro` (saison en tête, « En saison, » devant le plat maison), `site.css` | home 1440x900 : bas de la ligne à 534 px, dans le premier écran ; 390x844 : 554 px |
| F2-1 | corrige | `site.ts` (description, histoire), `a-propos.astro` (description) | grep Meuse / colline de Dave : 0 |
| F2-2 | corrige | `a-propos.astro` : ligne du titulaire retirée de « Sur place » | grep Evrard dans dist : 0 |
| F2-3 | corrige | `carte.astro` : `data-reveal`/`data-intro`/`data-delay` retirés du chapeau | grep data-intro carte : 0 (LCP non remesuré, pas de QA complète) |
| F2-4 | corrige | `Footer.astro` : `<footer>` du site remplacé par `<section aria-label="Contact">` | une seule balise `<footer>` (kyw-footer) sur la home |
| F2-5 | corrige | `index.astro` : cadre bol limité à 382 px, portrait 3/4 ; vignette du bol retirée de la home ; `site.ts` : vignette du plat du jour retirée | largeur mesurée 382 px (1440), 350 px (390) |

F3 non traités (hors liste). Hypothèse : la ligne de saison reprend `site.saison` (dossier). Aucune décision de design changée.
Notes : serveur port 4871 déjà occupé (EADDRINUSE), mesure faite sur ce serveur qui sert le même `dist/` ; mon PID n'existait plus.
