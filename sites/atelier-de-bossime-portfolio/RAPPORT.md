# RAPPORT — L'Atelier de Bossimé, variante portfolio (gabarit Verger)

Production du 31/10/2026, agent variante-portfolio. Build : `node scripts/build-site.mjs sites/atelier-de-bossime-portfolio`
→ `dist/atelier-de-bossime/portfolio/` (7 pages : accueil, carte, saisons, ferme, histoire, réservation, 404).

## Placeholders et données à confirmer

Chaque donnée non prouvée porte son drapeau dans `src/data/site.ts` et une marque visible.

| Donnée | Drapeau | Marque visible |
| --- | --- | --- |
| Calendrier des 24 produits de la roue et de la page saisons (savoir général, pas les 45 variétés du potager) | `ingredients[].placeholder` | « Calendrier indicatif* » sous la roue, astérisque et note sur /saisons/ |
| Libellés des 4 assiettes autour de la roue (décrites d'après la photo, noms réels dans le livret) | `platsDuMois[].nomDescriptif` | note sous la roue |
| Saison de chaque assiette photographiée (/saisons/) | `saisons[].saisonPlaceholder` | « saison indicative » |
| Portrait attribué au chef (photo 18, « à confirmer » dans photos/index.json) | `equipe[0].photoPlaceholder` | « portrait à confirmer » ; alt neutre (ne nomme personne) |
| Année du titre Gault&Millau « jeune chef de l'année » (2018 selon le logo du site, 2017 selon Naboo) | `distinctions[1].anneePlaceholder` | « année à confirmer » |
| Modalités des chèques-cadeaux | `menus[3].placeholder` | « modalités à confirmer » |
| FAQ « Où se garer ? » | `questions[6].placeholder` | « exemple » |
| E-mail info@bossime.be (base KYN, non vu sur le site du client) | aucun (donnée de la base) | affiché ; à confirmer par le client |
| Heures de fermeture 16:00 et 23:30 (Guide MICHELIN ; le site ne donne que « dès 12 h » et « dès 19 h ») | aucun | à confirmer |
| Volume de l'eau à 12 € (libellé « Eau l » du site) | — | « volume à confirmer » dans la carte |

Aucun plat, avis, chiffre, producteur ni récompense inventé. Les trois avis cités sont des extraits Mapstr réels, liés
à la source (orthographe normalisée : « inattendu », « maraîchers », espace avant « ! »). L'avis négatif du dossier n'est
pas repris (choix éditorial, signalé ici). Le bloc « 4,84/5 (38 avis) » du site (module E-net) n'est pas repris.

## Vérification

- Build : OK, garde-fou noindex + pied de page KYW passé.
- Mini-script Playwright (`launch()` de browser.mjs, serveur 4533 arrêté par le script) sur 6 pages en 1440×900 et
  390×844 : 0 erreur console, `scrollWidth` = largeur de fenêtre partout, 0 élément `[data-reveal]`/`[data-split]` resté
  caché après défilement, 7 liens d'en-tête sur 7 cliquables à scrollY 0 (`elementFromPoint` = le lien) sur chaque page ;
  capture de fenêtre du bas de chaque page après défilement à la molette : branche du mois, colonnes, mention
  « Maquette KYW, certaines données sont illustratives » et logo KYW visibles.
- Hero accueil 1440×900 : h1 et vignette dans la fenêtre. Pages carte et histoire : h1 raccourcis (« Lunch et Moments »,
  « Depuis 2011 ») pour garder l'accroche au-dessus de la ligne de flottaison.
- shoot.mjs / audit.mjs : voir section suivante.

## Shoot et audit

(à compléter après la série de fond `.shots-bossime-pf/`)

## Points ouverts

- Logo du client en 270 px seulement : la marque de l'en-tête est redessinée en texte + SVG (trois accents orange) ;
  un fichier vectoriel du client la remplacerait.
- Producteurs : aucun nom publié (40 ou 70 selon les pages du site) ; la page « Producteurs » du gabarit a été retirée
  au profit de « La ferme ».
- Noms des plats : non publiés (livret à table) ; la roue reste un calendrier indicatif.
- Soirée NeZ ZeN : passée (22/10/2026), citée comme « la dernière en date » de l'agenda gourmand.

## Leçons structurelles

- Verger suppose des plats nommés et des producteurs : quand ni l'un ni l'autre n'existe, les vraies photos d'assiettes
  (libellé descriptif signalé) remplacent avantageusement les cartes de saison d'exemple, et une page « La ferme » en
  nombres sourcés remplace la page producteurs de démonstration. Rien à corriger dans le gabarit lui-même.
