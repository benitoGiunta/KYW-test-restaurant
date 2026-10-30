# Révision 1 · gabarit verger (30/10/2026)

Travail fait en deux temps : un premier réviseur a appliqué les corrections dans `src/` (build 18:58) mais a été coupé
avant ce fichier ; le second a vérifié chaque correction dans `src/` et `dist/`, rebuildé (`node scripts/build-site.mjs
gabarits/verger`, 7 pages, 21:34), recapturé accueil, saisons, histoire, réservation, carte (`.shots-verger-rev/<page>`,
serveur :4429) et testé l'horloge par `page.clock` (mars, juillet, octobre 2026, Europe/Brussels).

| Finding | Décision | Ce qui a été changé (fichier) | Preuve de vérification |
| --- | --- | --- | --- |
| F1-1 « carte du mois » / « carte en cours » | corrigé | `index.astro` : étiquette du hero « Le menu unique de saison », pastille « Le menu actuel · unique, il suit les saisons » ; `Roue.astro` : plats « Service n · menu actuel » + phrase « le menu unique actuellement servi, qui ne change pas avec le mois affiché » | grep `carte du mois|carte en cours` = 0 dans `dist/` ; `page.clock` mars/juillet/octobre : étiquette, pastille et 4 libellés de plats identiques, seuls roue, légende et « Nous sommes en … » changent |
| F1-2 h1 « Quatre cartes par an » | corrigé | `saisons.astro` : h1 « Au fil des saisons », eyebrow « Calendrier indicatif », chapeau marqué `*`, note « le rythme de la carte n'est pas connu » ; meta description sans chiffre | `dist/saisons` : « quatre cartes » = 0 ; capture d-01/m-01 saisons |
| F1-3 `platsDuMois` sans drapeau, « en ce moment » figé | corrigé | `site.ts` : `liaisonPlaceholder: true` sur les 4 plats, lien plat → ingrédient → mois non affiché ; `Roue.astro` : plus de bloc « en ce moment », la légende lit `ingredients[].mois` du mois affiché | `page.clock` : légende au début du pin « mars · Radis, Épinard », « juillet · Cerise, Fève, Courgette, Tomate » ; clic « décembre » : « Topinambour, Poireau, Légumes racines, Chou de Bruxelles, Pomme » ; centre « nous sommes en » reste sur le mois réel ; 0 erreur console |
| F2-1 photo du hero hors fenêtre | corrigé | `index.astro` + `base.css` : `.hero--duo` deux colonnes ≥ 1024 px | photo 191→704 px dans 1440×900, 182→628 dans 1280×720, 166→567 dans 1024×768 ; mobile inchangé (photo 513→753 dans 844) |
| F2-2 h1 de 388 px | corrigé | `base.css` : h1 `clamp(5.5rem, 9.6vw, 10rem)` en deux lignes dans `.hero--duo` | h1 641 px de large à 1440 (501 à 1024) ; d-01-hero |
| F2-3 contrastes `.exemple` et bouton du mois 10 | corrigé | `base.css` : `.exemple` en `--c-terre` (#5a4634), `.mois-btn[data-courant]` texte terre, rose en trait seulement | axe sur le build 21:34 : 0 violation sur accueil, saisons, histoire, réservation, carte (bouton du mois 10 compris) |
| F2-4 LCP histoire 3,9 s | corrigé | `histoire.astro` : premier paragraphe sans `data-reveal` | LCP mobile histoire 1,15 s (`p.lead`), saisons 1,28 s, accueil 2,33 s (img) ; loader mobile accueil 6,1 s (loaderMs = boot JS sous 4x CPU, leçon braise), LCP desktop accueil 3,1 s derrière le loader (prévu par le socle) |
| F2-5 e-mail sans marque | corrigé | `reservation.astro` : bouton inerte « E-mail à communiquer » marqué « illustratif », aucun `mailto:` ; pied de page : adresse en texte « adresse illustrative » | `mailto` = 0 dans les 5 pages de `dist/` |
| F2-6 « il y a quatorze ans » | corrigé | `site.ts` / `histoire.astro` : seulement « Début de l'hiver 2019 » (fait du dossier) | grep `quatorze` = 0 dans `src/` et `dist/` |
| F2-7 « Le concept » en double, horaires répétés | corrigé en partie | `index.astro` : le paragraphe n'apparaît qu'une fois (escalier) ; horaires gardés dans la bande Réserver et le pied de page (le pied de page est commun à toutes les pages, la bande sert l'action) | « Le concept » = 1 occurrence sur l'accueil et 1 sur histoire |
| F2-8 mois désordonnés, Épinard/Poireau incohérents | corrigé | `site.ts` : un seul tableau `ingredients` (`mois` trié, `pic` ∈ `mois`) ; `saisons.astro` filtre par intersection des `mois`, la roue lit les mêmes | Épinard [3,4,10] apparaît au printemps et en automne sur /saisons/ et dans la roue d'octobre ; Poireau [1,2,11,12] en automne et en hiver |
| F3-1 ligatures | corrigé | `site.ts` : « Bœuf », « Œuf » dans les textes, chemins `plat-boeuf-confit*.webp` intacts | grep `Boeuf|Oeuf` hors chemins = 0 |
| F3-2 eyebrow « Archive » / schéma eyebrow + titre | corrigé (« Archive ») / refusé (schéma) | `saisons.astro` : « Calendrier indicatif » ; le couple étiquette + titre est le système typo de `DESIGN.md` (condensée + mots empilés), F3 | d-01 saisons |
| F3-3 404 sans h1 dans le HTML | corrigé | `404.astro` : h1 « Rien de mûr ici » en dur | `dist/404.html` contient le `<h1>` |
| F3-4 champs non transmis à Zenchef | corrigé | `reservation.astro` : phrase « la validation ouvre Zenchef, où la date, l'heure et le nombre de couverts sont à saisir de nouveau » | capture réservation |

Bilan : 15 findings, 14 corrigés (dont F2-7 en partie), 1 refusé en partie (F3-2 schéma eyebrow + titre, conforme à
DESIGN.md), 0 impossible. Mesures : 0 erreur console, 0 requête en échec, 0 débordement, `hiddenText` 0 en reduced
motion, CLS ≤ 0,055 ; LCP mobile réservation 1,22 s, carte 1,28 s.

Publication : publiable comme gabarit du portfolio. Reste hors révision : loader mobile de 6 s mesuré par `loaderMs` (boot JS sous 4x CPU, sans effet sur le LCP), photos macro des ingrédients et producteurs réels à fournir à l’adaptation.
