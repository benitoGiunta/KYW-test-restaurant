# Révision 1 · La Brasserie du Quai · portfolio

Révision ciblée (règle de sobriété n° 4) : F1 et F2 de `REVUE-1.md` (aucun F0). Les F3 ne sont pas traités, sauf la moitié
de F3-9 réglée en passant par F2-5 (« Bon à savoir » devient un h2). Pas de QA complète : la revue suivante s'en charge.

Build : `scripts/q.sh revision-bdq-portfolio-build node scripts/build-site.mjs sites/brasserie-du-quai-portfolio` → exit 0, 7 pages.
Vérification : grep sur `dist/brasserie-du-quai/portfolio/` et mini-script Playwright (serveur `serve.mjs dist --port 4623`,
arrêté par `kill`) ; captures dans `.shots-brasserie-du-quai-portfolio-rev/` (planche `planche-rev1.png`).

| Finding | Décision | Ce qui a été changé (fichier) | Preuve de vérification |
|---|---|---|---|
| F1-1 JSON-LD : horaires déclarés pour des jours non confirmés | corrigé | `src/layouts/Base.astro` : `openingHoursSpecification` retiré. Aucun jour n'est confirmé dans `donnees.json`, pas même lundi ou jeudi à samedi. Un commentaire indique comment le rétablir. | `grep -c OpeningHoursSpecification` = 0 sur les 7 pages ; `"@type":"Restaurant"` toujours présent |
| F2-1 Horaires de lundi et de jeudi à samedi affichés sans réserve | corrigé | `Footer.astro` : phrase « Heures de saison publiées par la maison ; jours d'ouverture et de fermeture à confirmer. ». `Maree.astro` : note réécrite (trait plein = jours du banc d'écailler, pointillé = jours sans information, tous à confirmer). `motion/setup.ts` : le badge ne dit plus « Ouvert » ni « Fermé ». Il affiche « Service du midi jusqu'à 14h30 (horaires de saison) », « Prochain service … » ou « Horaires à confirmer par téléphone ». | phrase du pied de page présente sur 7 pages sur 7 (grep) ; note de la frise présente dans `index.html` |
| F2-2 « Pierre-Alexandre et son équipe vous accueillent en salle » | corrigé | `src/data/site.ts` : « Pierre-Alexandre et son équipe font vivre la maison. », rôle « L'équipe de la maison ». `histoire.astro` : description méta « avec Pierre-Alexandre et son équipe », h2 de l'équipe « Ceux qui font le Quai ». | `grep -rl "en salle" dist/brasserie-du-quai/portfolio` → aucun résultat |
| F2-3 Pastille « P » à la place d'une photo | corrigé | `histoire.astro` et `base.css` : la colonne sans photo devient une carte texte (accroche réelle du site actuel, « Une expérience au fil de l'eau. », filet et fond clair), sans initiale. | `media--vide` = 0 ; captures `d-histoire-equipe.png` (1440) et `m-histoire-equipe-carte.png` (390) |
| F2-4 Navigation mobile réduite à 2 liens sur 4 | corrigé | `Header.astro` : plus de `data-mobile-hide`. `base.css` : sous 768 px, les 4 rubriques passent sur une seconde ligne sous la marque ; de 768 à 1023 px, les sous-lignes mono sont masquées et les 5 liens tiennent sur une ligne ; `.hero--texte` reçoit 2,5 rem de plus en haut sous 768 px. | Playwright : 4 liens visibles de 16 à 374 px à 390, de 16 à 304 px à 320, hauteur 29 px ; débordement 0 à 320, 390, 768, 1024 et 1440 ; en-tête 94 px et h1 à 112 px (carte, réservation, 390), sans chevauchement ; `hero__ctas` sans chevauchement avec la nav à 768, 1024 et 1440 ; capture `m-index-header.png` |
| F2-5 Surtitres mono et filet partout | corrigé | 15 surtitres retirés (accueil : carte, règles, réserver ; carte × 2 ; écailler × 2 ; maison × 4 ; réservation ; terrasse ; plan ; marée). Restent ceux qui portent une information : jours de l'écailler (accueil, écailler), « Le lieu, la cuisine » (seul repère d'un bloc sans titre), 404 « Marée basse ». « Bon à savoir » (terrasse) devient un `h2`. | nombre de `class="eyebrow` : accueil 1, écailler 1, maison 1, carte 0, réservation 0, terrasse 0 |
| F2-6 Plan supposé, mention « schéma » en 6 px | corrigé (option « agrandir la mention ») | `Plan.astro` : mention sortie du SVG, en paragraphe de 14 px sous la légende : « Schéma, pas à l'échelle : l'orientation de la Meuse et la place de la terrasse sont indicatives. », avec un lien « Itinéraire jusqu'à la Rue du Quai 9 » (Google Maps, coordonnées de `site.geo`). Le tracé n'a pas été refait d'après OSM (hors révision ciblée). | `planNote fontSize 14px` (Playwright) ; lien présent sur l'accueil et la réservation (grep) ; capture `d-index-plan.png` |

Corrigés : 7 · refusés : 0 · impossibles : 0.

## Hypothèses notées
- La phrase de remplacement pour Pierre-Alexandre (« font vivre la maison ») ne lui donne pas de rôle précis. Le dossier
  dit seulement qu'il « met en avant son équipe ».
- Le banc d'écailler du jeudi au lundi est confirmé. Il justifie le trait plein de ces jours sur la frise, mais pas un
  « Ouvert » affirmatif. D'où le badge neutre.

## Reste pour la revue suivante
- Les F3-1 à F3-8 et le contraste du libellé « MAINTENANT » (F3-9) ne sont pas traités.
- Le plan reste à retracer d'après OpenStreetMap si l'on veut lever la réserve « indicatives ».
