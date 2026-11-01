# Révision 1 · dolce-vita-wepion awwwards (ciblée : F0, F1, F2)

Hypothèse : F3 non traités (hors périmètre), sauf F3-1 et la reformulation « maison » de F3-4, corrigés car triviaux.

| id | décision | changement (fichier) | preuve |
|---|---|---|---|
| F0 | aucun finding | — | — |
| F1-1 | corrige | `src/engine/reveal.ts` : `aria: 'none'` dans `SplitText.create` | axe `aria-prohibited-attr` : 0 sur accueil, carte, histoire, réservation à 1440 et 390 px |
| F1-2 | corrige | `index.astro` (`ul.table__mur` : `tabindex=0`, `aria-label`), `histoire.astro` (`.salle__bande` : `role=region`, `tabindex=0`, `aria-label`) | axe `scrollable-region-focusable` : 0 à 390 px |
| F2-1 | corrige | `carte.astro` : « prix TVA comprise » devient « prix en euros » | grep `TVA` dans `dist/…/carte/index.html` : 0 |
| F2-2 | corrige | `index.astro` : « 2 » remplacé par « 18 h à 22 h · À emporter : livraison gratuite dès deux plats » (dossier.md l. 21 et 51) | build OK, texte lu dans le HTML |
| F2-3 | corrige | `site.css` : le bouton « Réserver au … » n'est plus masqué sous 768 px | mesure à 390×844 : bouton affiché, top 318 px, hauteur 48 px |
| F2-4 | corrige | `site.css` : `row-gap: 1.25rem` sur `.page-tete__titre` | mesure à 390 px : 20 px entre le tube et l'étiquette (avant : contact) |
| F2-5 | refuse | — | le relecteur lui-même conseille de garder ; redondance voulue (accessibilité) |
| F3-1 | corrige | `Footer.astro` : « Réserver » devient « Réserver une table » | build OK |
| F3-4 | corrige en partie | `data/site.ts` : « sont faits ici » devient « sont maison » ; `lang` du champ date non touché | grep |
| F3-2, F3-3, F3-5 | non traités | — | F3-2 touche `packages/kyw-footer` ; F3-3 et F3-5 sont des non-défauts connus |

DESIGN.md inchangé. Rebuild via `scripts/q.sh` : 5 pages, OK. Serveur arrêté. Site estimé publiable.
