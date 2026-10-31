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

- Build final : OK, garde-fou noindex + pied de page KYW passé.
- Mini-script Playwright (`launch()` de browser.mjs, serveur 4533 arrêté par le script) sur 6 pages en 1440×900 et
  390×844 : 0 erreur console, `scrollWidth` = largeur de fenêtre partout, 0 élément `[data-reveal]`/`[data-split]` resté
  caché après défilement, 7 liens d'en-tête sur 7 cliquables à scrollY 0 (`elementFromPoint` = le lien) sur chaque page ;
  capture de fenêtre du bas de chaque page après défilement à la molette : branche du mois, colonnes, mention
  « Maquette KYW, certaines données sont illustratives » et logo KYW visibles.
- Hero accueil 1440×900 : h1 et vignette dans la fenêtre. Pages carte et histoire : h1 raccourcis (« Lunch et Moments »,
  « Depuis 2011 ») pour garder l'accroche au-dessus de la ligne de flottaison.
- shoot.mjs / audit.mjs : voir section suivante.

## Shoot et audit

Série de fond `.shots-bossime-pf/` (serveur 4534 lancé et tué par le script, 6 pages en série, puis `audit.mjs`) :

| Page | Erreurs | Débordement d/m | LCP d/m (ms) | CLS d/m | axe sérieux | Texte caché (reduced) | Clavier |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Accueil | 0 | non / non | 140 / 1356 | 0 / 0,007 | 0 | 0 | OK, pas de piège |
| Carte | 0 | non / non | 128 / 1316 | 0 / 0,028 | 0 | 0 | OK |
| Saisons | 0 | non / non | 140 / 1204 | 0 / **0,105** → 0,0001 après correction | 0 | 0 | OK |
| Ferme | 0 | non / non | 104 / **3368** → image LCP peinte à 200 ms après correction | 0 / 0,022 | 0 | 0 | OK |
| Histoire | 0 | non / non | 140 / 1184 | 0 / 0,002 | 0 | 0 | OK |
| Réservation | 0 | non / non | 160 / 1236 | 0 / 0,028 | 0 | 0 | OK |

- Navigation `--nav` (accueil → carte) : OK ; scroll 60 fps desktop et mobile throttlé ; idle de la roue détecté.
- `audit.mjs` : **0 FAIL**, 9 WARN : horaires répétés 5 à 10 fois par page (corrigé : horaires groupés « lundi au
  vendredi / samedi / dimanche », 3 lignes au lieu de 7), et les trois WARN « site » connus sous `base` (robots.txt,
  sitemap et 404 cherchés à la racine de l'origine, faux positifs, voir lecons.md).
- `smallTargets` « A 42x22 » sur l'accueil mobile : liens de navigation de l'en-tête du gabarit (inchangés).
- Corrections après le shoot : (1) `.hero__accroche` bornée en `em` au lieu de `ch` (CLS au swap de l'italique,
  corrigé aussi dans `gabarits/verger`) ; (2) photo du potager de /ferme/ peinte au premier rendu ; (3) horaires
  groupés, un créneau par ligne ; (4) note sous la roue raccourcie. Vérifiées par mini-scripts (layout-shift et LCP sous
  CPU ×4, scrollWidth, clics d'en-tête, bas de page) sur le build final ; pas de second shoot complet.

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
  nombres sourcés remplace la page producteurs de démonstration.
- Défaut du gabarit corrigé dans `gabarits/verger/src/styles/base.css` : `.hero__accroche { max-width: 32ch }` →
  `17em` (CLS 0,105 en mobile au swap de la police italique non préchargée). Le `dist/gabarits/verger/` n'a pas été
  reconstruit (le rebuild efface `apercu.png`, voir lecons.md) : à faire avec la prochaine passe du gabarit. Leçon
  reportée dans `agents/lecons.md`.
