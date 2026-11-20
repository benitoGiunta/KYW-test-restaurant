# Revue portfolio · PhilFa · passe 2
Verdict : PUBLIABLE (aucun F0, aucun F1 ; 1 F2 résiduel non bloquant, 7 F3 de la passe 1 non traités, hors périmètre de la révision)
Lecture en une ligne de l'idée du site : une brasserie namuroise présentée comme une table dressée, avec des pictogrammes au trait (parasol, verre, citron, cornet de frites) et une « table » de tirages photo posés en vrac que le visiteur déplace, sur fond crème, olive et ocre.

Preuves : `dist/philfa/portfolio/` (17:02) plus récent que les sources modifiées (16:57 à 17:00), QA-revue2 et ses planches, puis mesures propres sur serveur 127.0.0.1:4931 (arrêté, PID 1807) : 6 pages x 390 et 1440 px (console, réponses >= 400, axe-core complet, h1, contentinfo, mention, noindex, débordement, texte à opacité 0), glisser-déposer souris à 0,3 / 1 / 3,5 s, clavier, « Ranger la table », LCP sous CPU x4 + 4G à DPR 1, 2 et 3, captures `.shots-philfa-portfolio-revue2/rev2-planche-d.png` et `rev2-planche-m.png`.

## Vérification des corrections annoncées (REVISION-1)
| id | annoncé | constaté |
|---|---|---|
| F1-1 drag souris | corrigé | **Confirmé.** 1 s et 3,5 s après l'arrivée de la section : tirages 3 et 5 déplacés (dx > 180 pour 180 px de geste, la rotation retombe à 0 et élargit la boîte), `is-drag` posée ; clavier : flèches OK (dx 16 à 19) ; « Ranger la table » apparaît après le premier geste et remet dx = 0 ; 0 erreur page. À 0,3 s les tirages sont encore à `autoAlpha` 0 et ne se saisissent pas (voulu, annoncé). |
| F2-1 LCP mobile | corrigé (1944 / 1864 ms) | **Partiel.** Reproduit à DPR 1 : 2192 / 2196 ms (< 2,5 s). Mais à DPR 2 et 3 (les téléphones réels, et le profil mobile du QA : 4084 ms), `sizes="100vw"` à 390 px demande 780 à 1170 px, donc le navigateur choisit la variante 1200 w (218 Ko) et non la 600 w : LCP 4472 / 4440 ms (DPR 2), 4448 / 4460 ms (DPR 3), élément `salle-table-longue.webp`. Le loader n'est pas en cause (`#loader` en `display: none` sous 768 px). Voir F2-1 ci-dessous. |
| F2-2 axe | corrigé | **Confirmé.** axe-core complet, 6 pages x 390 et 1440 px : 0 violation, 0 « à vérifier » hors contraste ; un seul contentinfo par page (celui de `kyw-footer`) ; le bloc coordonnées garde son rendu (`rev2-planche-d.png` et `rev2-planche-m.png`, pied de page). |
| F2-3 équipe mobile | corrigé | **Confirmé.** 390 px : grille 2 x 2 (boîte `.equipe` 356 x 302 px), pictogrammes 40 px, page La maison 5634 px (7035 avant), `scrollWidth` 390 (`rev2-m-equipe.png`). |

Mesures de contrôle sur les 12 vues (6 pages x 2 largeurs) : 0 erreur console, 0 réponse >= 400, 0 violation axe, 1 `h1`, `lang="fr"`, `noindex`, mention « Maquette KYW, certaines données sont illustratives » et logo KYW présents, 0 débordement horizontal, 0 texte masqué à l'opacité 0. Liens internes et assets : contrôlés en passe 1, `dist` régénéré sans changement de liens ; `robots.txt` et sitemap présents.

Scores /10 : design 8 (inchangé, pied de page et équipe mobile propres) · usabilité 8 (la signature répond désormais à la souris et au clavier ; +2) · créativité 8 · contenu 7 (faits conformes, F3 de typographie restants) · technique 7 (0 erreur, 0 axe ; LCP mobile DPR 2 encore à 4,4 s).

## Findings

### F2 (mineur)
- **F2-1 · LCP mobile encore à 4,4 s à DPR 2 et 3** (mesure CPU x4 + 4G lente, 2 passes chacun : 4472 / 4440 ms à DPR 2, 4448 / 4460 ms à DPR 3 ; QA-revue2 : 4084 ms). Cause : `src/pages/index.astro`, `srcset` 600 w / 1200 w avec `sizes="(max-width: 47.99rem) 100vw, 40vw"` ; un écran 390 px à DPR 2 réclame 780 px, donc la 1200 w (218 Ko) part en concurrence avec le JS de 144 Ko et les images du rail. La correction précédente n'agit qu'à DPR 1. Correction attendue : ajouter une variante intermédiaire de 800 w (cible 60 à 90 Ko) au `srcset`, ou compresser plus fort la 1200 w (qualité 60) ; remesurer à DPR 2. Non bloquant : aucun test de publication ne porte sur le LCP et la page reste utilisable.

### F3 (finition, tous encore présents, non traités par la révision, périmètre déclaré)
- F3-1 espace insécable manquant avant « : » (chapeau de Terrasse) · F3-2 apostrophes droites et courbes mélangées · F3-3 badge « Attrapez-moi » dont début et fin se chevauchent (visible dans `rev2-table-drag.png`, « ATTR ATTRAPEZ-MOI ») · F3-4 avis d'exemple à 5 étoiles et 4e carte seule · F3-5 marquee d'ouverture sans fuseau `Europe/Brussels` (0 occurrence dans `src/`) · F3-6 horaires « 12:00 à 14:30, 18:15 à 21:00 » répétés (pied de page, visible sur `rev2-m-footer.png`) · F3-7 pictogramme canard mobile qui dépasse de 8 px (masqué, `scrollX` = 0).

## Ce qui est bien (à ne pas casser)
1. La table de tirages : maintenant saisissable dès l'arrivée, avec clavier, bouton « Ranger la table » et grille droite en reduced-motion.
2. Exactitude du contenu (24 plats et prix conformes, avis étiquetés « exemple », réservation honnête vers Barestho) et méta complètes (noindex, mention, logo, JSON-LD, 404 designée).
3. Accessibilité propre : 0 violation axe sur 12 vues, un seul contentinfo, focus visible, skip link.
