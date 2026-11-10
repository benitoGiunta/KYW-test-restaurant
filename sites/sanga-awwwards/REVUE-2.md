# Revue awwwards · Sanga · passe 2
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site : inchangée depuis la passe 1 (bol de ramen en crêtes sur indigo, fil vermillon qui descend la page, kanji 山河) ; la page « Venir » remplace « Réserver » sans casser la composition.

Scores /10
- Design : 8. Hero « Venir » et 404 composés (crête vermillon réelle), `sangaaw-r2-404-d.png`, `-m.png`, `sangaaw-r2-venir-d0.png`.
- Usabilité : 8. Header à 320 px : marque 135, nav 217, menu 304 (< 320), 0 débordement ; « Appeler » en `tel:` partout.
- Créativité : 8. Inchangée, rien n'a été cassé.
- Contenu : 7. Procédure inventée retirée (page, méta, nav, pied) ; reste un titre « Une table ? » suivi d'un seul bouton « Appeler » en fin de carte (F2-1).
- Technique : 9. axe 0 violation sur 5 pages x 1440/390/320 ; 0 erreur console ; 0 requête en échec ; 0 débordement sur 5 pages x 6 largeurs (1440, 1024, 768, 390, 360, 320) ; liens internes de l'accueil et de Venir tous en 200 ; cibles < 24 px : 0.

## Méthode
`QA-revue2.md` absent ; `.shots-sanga-awwwards-revue2` ne contient que l'accueil (carte et 404 en `shootFailed`, navigateur fermé). `dist/sanga/awwwards` (15:03:54) postérieur à `src/` : build réutilisé, non refait. 3 scripts maison (axe-core de node_modules, console, requêtes, débordement, méta, cibles ; captures 404, Venir, fin de carte, en-tête 320 ; survol `.tel-grand` et opacités après défilement complet) ; grep Python sur le texte visible du `dist/` (réserv*, table, appelez, tiret cadratin, citation, crédit).

## Vérification des corrections annoncées (REVISION-1)
| id | verdict | preuve |
|---|---|---|
| F1-1 | corrigé à 90 % | `/reservation/` absent (404 serveur), sitemap : 0 « reservation » ; `venir/` titre « Venir | Sanga », description sans « réserver », chapô « pas de réservation en ligne : on vient, on appelle ou on commande en ligne » (conforme à `donnees.json` : « Aucune réservation de table ; commande en ligne et téléphone ») ; en-tête « Appeler » (`tel:+3281241038`), menu « Venir », « appelez avant de venir » : 0 ; JSON-LD `acceptsReservations: false`. Reste « Une table ? » (F2-1) |
| F2-1 | corrigé | a-propos : « assez connu pour ses ramen » exact (dossier.md:17), « la carte est la même » : 0, « au même prix affiché » |
| F2-2 | corrigé | `scrollWidth` = largeur sur 5 pages à 320, 360, 390 (mesure) ; bouton Menu finit à 304 |
| F3-1 | corrigé | `.perdu__pic` : clip-path `polygon(0 100%, 0 62%, 14% 34% …)` à 1440 et 390 ; montagne visible |
| F3-2 | corrigé | 404 : 0 canonical ; 4 autres pages avec canonical propre |
| F3-3 | corrigé en partie | « Excellent et délai respecté […] » ; mais « (orthographe rectifiée) » est à l'intérieur des guillemets (F3-1) |
| F3-5 | corrigé | `.tel-grand:hover` : washi rgb(236,230,216) puis vermillon rgb(232,81,47) + souligné (mesuré) |
| F3-6 | corrigé | « Photos du restaurant, origine à confirmer » |
| F3-7 | corrigé | « salade et une soupe (miso pour le chashu-don) » conforme au dossier |
| F3-4 | refusé, accepté | finition hors liste F0-F2 |

## Findings (par gravité)

### F0 / F1
Aucun. Build présent, mention « Maquette KYW, certaines données sont illustratives », logo KYW, `noindex, nofollow`, `lang="fr"` et un seul `h1` sur les 5 pages ; 0 fait faux relevé (téléphone 081 24 10 38, rue Saint-Loup 8, horaires mardi-dimanche 12-14 h / 18-22 h, livraison 25 et 35 €, paiements : conformes au dossier).

### F2 mineur
- **F2-1 · reste d'une promesse de table par téléphone.** `carte.astro:63` : `<h2>Une table ?</h2>` suivi du seul bouton « Appeler le 081 24 10 38 » (`sangaaw-r2-carte-fin.png`). Le dossier dit « Aucune réservation de table » ; la REVUE-1 demandait de retirer « table ». Correction : titre « Envie d'un bol ? » ou « Venir chez Sanga », boutons « Appeler » et « Horaires et accès » conservés.

### F3 finition
- **F3-1** · `site.ts:91` : « (orthographe rectifiée) » est dans les guillemets de la citation, donc attribué au client. Sortir la mention des guillemets, après la source.
- **F3-2** · « Venir » n'est pas dans la navigation de bureau (La carte, La maison, Appeler) : atteinte par le menu du téléphone, l'accueil et le pied seulement. Ajouter « Venir » dans `Header.astro` `liens` (place suffisante à 1440, 320 px reste masqué par `.tete__sec`).
- **F3-3** · « Photos du restaurant, origine à confirmer » est répété 5 fois sur la carte (légende de chaque photo) : une mention en pied de page suffit.

## Ce qui est bien (à ne pas casser)
1. La page « Venir » : chapô franc (pas de réservation en ligne), téléphone et commande en ligne, horaires, livraison, paiement, et ce qui n'est pas connu dit comme tel.
2. La 404 : crête vermillon dessinée, ton de la marque (« Rien sur cette rive »), un seul h1, noindex, pas de canonical.
3. Le fil de l'eau, le sceau et le cadre en crête : 0 débordement de 320 à 1440, 0 violation axe.
