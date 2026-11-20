# Révision 1 · Champs Elysées · portfolio (F2 seulement, ciblée)

Hypothèses : les F3 ne sont pas traités (hors périmètre de la consigne). 7 corrigés, 0 refusé, 0 impossible. Mesures : Playwright mobile (serveur `serve.mjs dist --port 4873`, PID arrêté), build `scripts/q.sh` OK.

| id | décision | changement (fichier) | preuve |
|---|---|---|---|
| F2-1 | corrige | Libellé « Terrasse » (au lieu de « Terrasse et fêtes ») dans `Header.astro` ; nav mobile `padding-inline: .5em; font-size: .8rem` (`base.css`) | à 360 et 390 px : `scrollWidth` = `clientWidth` = 320, 5 liens entre 25 et 335 px (avant 455 pour 362) ; `document.scrollWidth` = fenêtre |
| F2-2 | corrige | Section « Votre demande » (formulaire) et son script supprimés de `reservation.astro` ; restent « Réserver sur Zenchef » et « Appeler » | `/reservation/` : 0 `<form>` |
| F2-3 | corrige | `Base.astro` : « Bistro convivial à Jambes » | `document.title` de l'accueil mesuré |
| F2-4 | corrige | `site.ts` : « Une terrasse donne sur l'avenue Albert Ier. » | `/terrasse/` : ni « spritz » ni « places » dans le texte |
| F2-5 | corrige | `Footer.astro` : `<footer class="footer">` devient `<section class="footer" aria-label="Pied du site">` (paquet `kyw-footer` intact) | 1 seul `<footer>` par page (accueil, réservation, terrasse) ; pas de violation `region` attendue car la section est nommée (axe non relancé) |
| F2-6 | corrige | `index.astro` : image « salle » en `srcset` (480 w nouvelle `salle-baie-480.webp`, 38 Ko, depuis le 800 px existant ; 800 w) + `sizes` + `fetchpriority="high"` | LCP mobile CPU x4 + 4G, deux passes : 1368 et 1352 ms (avant 2508 ; mesure initiale de cette session 2700 et 2676) |
| F2-7 | corrige | `base.css` : `.carte-avis cite a { display:inline-block; min-height:24px; padding-block:.25rem }` | hauteur des boîtes à 390 px : 41 et 42 px (avant 21 et 20) |

DESIGN.md : inchangé (aucune décision de design modifiée). Le libellé de nav « Terrasse » reste cohérent avec la page (titre « Terrasse et fêtes »).
