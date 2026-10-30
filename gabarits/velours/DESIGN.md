# DESIGN — gabarit « Velours »

## Concept Card
- **Idée** : la maison se raconte par ses nombres vrais. Chaque chapitre est un rideau vert sapin qui se lève sur un chiffre
  cuivre monumental posé à cheval sur une photo sombre, puis le texte suit. Ici : **4** services, **67** euros (le menu
  unique), **2** chefs, et **2020** en carte de clôture. Aucun nombre inventé : le nombre de tables est inconnu dans le
  dossier, le chapitre « tables » du cahier est donc remplacé par le prix unique (67 €), un fait du dossier.
- **Métaphore** : le lever de rideau d'une petite salle de théâtre. **Émotion** : l'attente heureuse, la rareté.
- **Verbe de motion** : « se dévoile comme un rideau ». Loader = rideau baissé (vert sapin, nom en cuivre, compteur
  tabular) qui se lève ; transition de page = même rideau ; chaque chapitre = rideau `clip-path inset(0 0 100% 0) → inset(0)`,
  1,1 s expo.inOut, une fois, au tiers de l'écran ; chiffre qui compte 0 → valeur (0,9 s, tabular) et parallaxe 40 px scrubbée.
- **Capture signature** : le chapitre « 4 » : photo du boeuf confit sur assiette rouge, un « 4 » cuivre de 260 px à cheval sur
  le coin supérieur gauche, « SERVICES » en petites capitales, texte à droite en colonne de 500 px.
- **Test de généricité** : un modèle ferait un site noir et doré avec un serif et des étoiles. Ici les chapitres sont des
  nombres réels de la maison, le vert sapin et le rideau construisent un théâtre, le site est court (8 sections).

## Système
- **Palette** (cahier) : `--c-bg #1B3730` vert sapin, `--c-deep #0E1512` profond (citation, loader), `--c-accent #C48F60`
  cuivre (aplat, jamais dégradé), `--c-copper-light #E2BE94` texte secondaire (6,9:1 sur sapin), `--c-fg #EEE6D8` ivoire
  (11,7:1). `--c-muted` = cuivre clair. Texte doux sur sapin ≥ 4,5:1 vérifié aux deux arrêts (sapin, profond).
- **Typo** : Boska (Fontshare, slug `boska`, 400/700 + italiques) pour le nom, les chiffres (tabular, line-height 0,9),
  les titres en capitales (+0.08em) ; Source Serif 4 (Google, 300/400 + italiques) corps 17 px, interlignage 1,55.
  Auto-hébergées dans `public/fonts/`, `@font-face` dans Base.astro (chemins sous base), préchargement Boska 400 + SS4 300.
- **Grille** : `.wrap` 1140 px (`min(100% - 2*gutter, 71.25rem)`), textes en colonne de 500 px (`--col-texte: 31.25rem`),
  photos qui débordent jusqu'au bord (`.chapitre__photo` en `grid-column` jusqu'au bord via `calc`), 200 px entre
  chapitres (`--chapitre: clamp(6rem, 4rem + 8vw, 12.5rem)`).
- **Radius** : 0 ; seul le logo cerclé (en-tête) est rond.
- **Motion language** : ease `expo.inOut` pour les rideaux, `expo.out` pour les entrées ; gros = lent (rideau 1,1 s,
  chiffre 0,9 s, lettres 0,9 s stagger 18 ms). Idle : aucun (site calme, décision écrite) sauf les onglets qui tournent
  toutes les 6 s (pause au survol/focus, désactivé en reduced motion). Curseur : point cuivre + cercle retardé (natif
  conservé, fine pointer seulement).

## Wireframes (desktop 1440 / mobile 390)
```
HERO (100svh, photo salle pleine largeur, scrim sapin 55 %)        | MOBILE
[◯ logo]   MENU  CARTE  LES CHEFS  PRIVATISER   [RÉSERVER]         | [◯]  ≡ (nav repliée en liste) [RÉSERVER]
                                                                   |
        L E S   P O T E S   A U   F E U   (Boska caps cuivre)      | LES POTES / AU FEU (plafonné 390)
        Bistronomie à Namur. (accroche ivoire, peinte au 1er rendu)| accroche
        [Réserver une table]  Voir le menu ↓                       | [Réserver]
-------------------------------------------------------------------
BANDE DISTINCTIONS  « Sélectionné par le Guide MICHELIN Belgique 2026 » (cuivre, petites capitales, fondu)
-------------------------------------------------------------------
CHAPITRE 1   ┌photo boeuf (déborde à gauche)┐   4 SERVICES         | 4 (160 px) SERVICES
             │  4 (260 px cuivre à cheval)  │   texte 500 px       | photo pleine largeur
             └──────────────────────────────┘   [Le menu]          | texte, bouton
CHAPITRE 2   texte 500 px  ┊ filet pointillé ┊ ┌photo salle (droite)┐  67 EUROS, LE MENU UNIQUE
CITATION (fond profond)  « Un restaurant décontracté qui swingue… » mots qui s'allument au scrub, Boska italique 48 px
CHAPITRE 3   ┌portrait N&B Damien┐ ┌portrait N&B François┐   2 CHEFS  bio courte (phrases du dossier)
ONGLETS      PRIVATISATION ▬▬▬▬  MARIAGE ▬▬  CHEF À DOMICILE ▬  (barre cuivre 6 s)  photo de fond qui change
GALERIE N&B  bande horizontale de 5 photos de hauteurs variées (scroll natif en mobile)
CLÔTURE      « Depuis 2020 »  adresse  3 lignes d'horaires  [Réserver]  (rideau)
FOOTER       logo cerclé, liens, KywFooter
```
Pages : `/` accueil, `/menu/` (4 services détaillés), `/carte/` (3 formules + options + bons cadeaux), `/histoire/`
(2 chefs, Sara et Jordan), `/privatisation/` (samedi : privatisation, mariage, chef à domicile), `/reservation/`, 404.

## Règles dures (preuve)
- [x] Grille et alignements : `.wrap` unique, colonnes de texte 500 px, chiffres optiquement décalés (`margin-left: -0.06em`).
- [x] Corps 17 px / 1,55 ; petites capitales 12-13 px cuivre clair à 6,9:1.
- [x] Hover/focus/actif par rôle : CTA = remplissage cuivre qui monte (clip-path, verbe « rideau ») ; nav = filet cuivre
  qui se lève sous le libellé ; photos de galerie = levée du voile N&B (curseur « Voir ») ; liens utilitaires = couleur.
- [x] Idle : décision « site calme » (cahier) ; seuls les onglets tournent (6 s, pause au survol, off en reduced motion).
- [x] Une famille d'easing (`ease` du moteur) ; gros = lent.
- [x] Transform/opacity/clip-path seulement ; une horloge (GSAP ticker, ScrollTrigger) ; tout dans `onPage()`.
- [x] Reduced motion : rideaux levés, chiffres à leur valeur, citation allumée, onglets fixes, Lenis coupé (moteur).
- [x] Premier cadre : hero photo + nom peints sous le rideau du loader dès le premier rendu (preload, fetchpriority).
- [x] UI fixe : en-tête absolu sur le hero puis sticky opaque sapin ; aucun coin occupé par un instrument.
- [x] Nav visible sur chaque page, `aria-current`. Curseur natif conservé. Loader ≤ 2,6 s (plancher moteur).
- [x] 390 px : chiffres 160 px au-dessus des photos, galerie en scroll natif, titre plafonné (mot le plus long « BISTRONOMIE »
  ne figure pas dans le h1 ; « POTES » tient), curseur désactivé.
- [x] Un h1 par page, landmarks, titles uniques, OG, canonical, sitemap, robots, JSON-LD, 404 (socle).
- [x] Copies décoratives (chiffre dupliqué pour le filigrane) hors des titres, `aria-hidden`.
- [x] Copy : pas de tiret cadratin, pas de filler, vouvoiement, phrases du dossier neutralisées (pas de « il y a quatorze
  ans »), chaque donnée non prouvée a son drapeau et sa marque visible.
