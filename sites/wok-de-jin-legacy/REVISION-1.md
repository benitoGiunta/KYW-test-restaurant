# Révision 1 · Wok de Jin · legacy
Hypothèse : les F3 liés (remplissage, chiffres 1-2-3) sont traités quand le correctif F1/F2 les couvre ; 0 F0 dans la revue.

| id | décision | changé (fichier) | preuve |
|---|---|---|---|
| T-faux (F1) | corrigé | crédit « Rendez-vous en ligne » retiré (`data/site.ts`, `Pied.astro`) ; « Confidentialité » gardé | grep dist : 0 occurrence |
| T-invente-1 (F1) | corrigé | section « Votre soirée, pas à pas » et données `deroule` supprimées (`reveillon.astro`, `site.ts`) | grep « pas à pas » : 0 |
| T-invente-2 (F1) | corrigé | « DJ » seul, « décompte » et « places limitées » retirés, « sans acompte » et « solde » retirés, « enrichi » remplacé par les plats du dossier | grep « décompte / limitées / toute la soirée » : 0 |
| landmark double contentinfo (F2) | corrigé | `.pied` devient `<section aria-label="Coordonnées">` (`Pied.astro`) | axe complet node_modules : 0 violation, index et réveillon, 1440 et 390 |
| JSON-LD Restaurant (F2) | corrigé | bloc dans `Base.astro` (adresse, tél., horaires, mardi absent) | `grep -c ld+json` = 1 sur index, réveillon, 404 |
| placeholder À emporter (F2) | corrigé | « À emporter : oui, à retirer au restaurant. Appelez le 081 30 68 88. » sans slot (`index.astro`) | grep « lien de commande » : 0 |
| alignement `.menu-rows` (F2) | corrigé | `.menu-rows .row p { grid-column: 1 / -1 }` (`page.css`) | décalage gauche p/h3 = 0 px à 1440 et 390 |
| vides et rythme (F2) | corrigé | `--section-gap` 144 à 104 px, `-s` 120 à 88 px (`tokens.css`) ; 2 `head-line` génériques supprimés ou remplacés par des faits (buffet, salle) ; en-tête réveillon réécrit en faits | build OK ; pas de débordement (scrollWidth = fenêtre) |
| F3 remplissage | corrigé en partie | « Une maison de partage » devient « La salle » ; phrases des plats remplacées | grep |

Non fait : sloplint et capture visuelle complète (révision ciblée). Publiable : oui.
