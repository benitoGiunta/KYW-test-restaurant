Phase 1 sur 3 de la variante legacy (construction-1) : audit, approche conservée, deal/draw/scaffold/stamp, comp, DESIGN.md, pages statiques, build. À lire après commun.md.

# Phase 1 : de l'audit aux pages statiques

Sans motion ni reviews (phase 2). Références : `$SKILL/references/<nom>`, toutes lues.

## 1. Audit (`hallmark audit`)

Lire : `$SKILL/SKILL.md` en entier, `redesign.md` en entier (§ Before), `gates.md` § 1, 4, 5, `flow.md` § Pre-flight edge cases et § Framework projects, `anatomy.md` § book (réservation dans la nav et le hero, carte, lieu, horaires, fin sur horaires + adresse + réservation).

```bash
mkdir -p $OUT/.hallmark/site-actuel && cd $OUT && cp -r $IN/site-actuel/*.html $IN/site-actuel/*.css .hallmark/site-actuel/ 2>/dev/null   # jamais exécuté hors headless
ENV /home/user/KYW-test-restaurant/scripts/q.sh sloplint node $SKILL/scripts/sloplint.mjs .hallmark/site-actuel --genre <genre inféré> --render --before [--url https://<site>/ si le HTML ne rend pas]
```

`--before` écrit `.hallmark/before.txt`, `before.json` (liens, champs, handlers, titres, figures…), `before/<page>-*.png`. CSS externe absent : lis les tells sur `$IN/site-actuel/*.png`. **Regarde les captures avant de peser les findings.**

`$OUT/AUDIT.md` (`# Audit Hallmark · <Nom> · <date>`) : source, genre inféré et pourquoi ; **lecture en quatre lignes** (pour quoi et l'action unique ; ce qui reste ; ce qui se lit généré, par gate ; ce qui est cassé) ; **structure d'origine** (pages, nav, footer, sections et posture du hero, animations, images, mobile 375, copie) ; **findings par tier** depuis before.txt (Floor, Reflex, Finish, jugées gates.md § 5 : 6b, 8, 9, 23, 29, 44, 54, 58, 63, 66, 69, 77-79, 80-85, une ligne chacune) ; **axes d'amélioration** classés par coût, et ce que seul full règle.

## 2. Approche conservée (DESIGN.md § Approche)

Lire : `macrostructures.md` (§ The fingerprint) puis le SEUL `macrostructures/<nn>-<slug>.md` du site d'origine (souvent 08, 03, 02, 13, 11, 15, 16), `layout.md` § 6 (postures de hero) et § 7 (nav, footer).
- **Macrostructure** nommée, empreinte `Heading|Body|Divider|Button|Image|Reveal`.
- **Posture** : mêmes routes (aucune supprimée sans plan) ; hero Poster si plein écran photo, Index si la carte ouvrait, Counter si la réservation ouvrait ; immersif ou calme ; un pattern de scroll au plus (`scroll-choreography.md` § Budget).
- **Dérogations** (gate ou raison) : carrousel auto → Rail/Switcher (18) ; pluie de reveals → un (craft.md § 5) ; `vh` → `dvh` (6a) ; faux envoi → `data-endpoint=""` (70) ; stock → un tiers (83) ; gabarit « hero, 3 cartes, CTA » : séquence gardée, composition neuve (`waive 8`).
- **Test miroir** (SKILL.md § 2) : un voisin avec le même site obtiendrait-il cette combinaison ? Si oui, change une décision et dis laquelle.

## 3. Deal, draw, scaffold, stamp

Lire : SKILL.md § 1 et § 3, `genres/<genre>.md` (editorial le plus souvent ; atmospheric si sombre, cave ; playful si friterie, snack), `themes/README.md`, puis les TROIS `themes/<slug>.md` tirés et leurs `.jpg` (le choix se fait sur l'image).

```bash
cd $OUT && node $SKILL/scripts/theme.mjs deal --genre <genre> --log $LOG \
  --prompt "restaurant in Namur, <cuisine>, seasonal food, wine bar, tasting, cellar, market, bar, slow, craft, hospitality, <ton en anglais>"
```

Prompt en ANGLAIS (aucun thème n'a `restaurant` ; en français le deal retombe sur Manifesto/Sport/Newsprint). Mots-clés connus : food, wine, wine bar, cellar, tasting, bakery, coffee, roastery, seasonal, market, harvest, produce, craft, slow, hospitality, hotel, bar, club, nightlife, venue, night market, food brand, snack, drinks, family, local, fresh, moody, night, heritage, artisan, old world, luxury. Thèmes adaptés : Spore, Vellum, Solstice, Atelier, Garden, Hedgerow, Halftone, Squeeze, Overprint, Darkroom, Editorial, Newsprint, Ink, Studio/Brutal, Kiln.

DESIGN.md § Thème : celui dont la matière porte le site d'origine, `dealt n/3, seed <seed>`, une ligne par écarté. Re-deal (`--reroll 1`) seulement si aucun ne convient, et dis-le. Couleur de marque imposée : lis `brand-truth.md`, couleur lue dans les fichiers du client, jamais de mémoire, scaffold `--brand`.

```bash
node $SKILL/scripts/theme.mjs draw --material photo --job book --theme <slug> --log $LOG   # garde le seed : stamp (draw:) et photos --seed
mkdir -p $OUT/src/styles && node $SKILL/scripts/theme.mjs scaffold <slug> --dealt "<n>/3, seed <seed>" --redesign full --dir $OUT/src/styles
#   ou : theme.mjs scaffold --brand --redesign full --dir $OUT/src/styles   (refuse d'écraser sans --force)
```

Du draw, prends ce qui ne contredit pas l'approche conservée et nomme chaque échange. Le scaffold écrit `tokens.css`, `base.css` et imprime stamp, imports, script `hallmarkSlots`. **Stamp** (`gates.md` § 2, SKILL.md § 6) en PREMIÈRE ligne de `src/styles/page.css`, tous champs remplis (`kept` là où l'original impose ; `redesign: full` règle le mode kept de sloplint), puis la ligne de critique pré-émission, puis `waive`/`answered`/`dropped`/`reworded`, le tout dans les 40 premières lignes, puis `@import url("./tokens.css"); @import url("./base.css");` (`export-formats.md`). Champs : shape (kept), genre, theme (deal n/3, seed), redesign: full, hero (kept), nav, footer, imagery, signature, draw, axes, posture, contrast, fold, job: book, v2.0.0 ; puis `pre-emit critique: P H E S R V · weakest: …`.
Lis `design-md.md` et écris DESIGN.md depuis `tokens.css` (jamais depuis le thème), format § Format, avant la première section.

## 4. Comp avant build

Lis `comp.md` en entier. Deux comps HTML du premier écran, `.hallmark/comps/c1.html` et `c2.html`, avec `tokens.css`/`base.css`, variant sur UN axe (poids gauche/droite, type-led/image-led, symétrie/asymétrie) ; `ENV node $SKILL/scripts/capture.mjs .hallmark/comps/c1.html --sizes desktop --out .hallmark/comps`. Choisis (raison écrite). Inventaire des médiums : région `code`, `raster` (source réelle) ou `neither` ; région non soutenue par la copie coupée ici. `comp.md` : chemins, axe, choix, inventaire (les trois questions de reproduction viennent en phase 2). Stamp : `comp: 2 built, no key · c1 chosen`.

## 5. Build statique

Lire (SKILL.md § 4 Load) : `layout.md`, `anatomy.md` § book, `imagery.md`, `craft.md`, `genres/<genre>.md`, `themes/<slug>.md` et son image, `gates.md` § 1 à 4, `patterns.md` ; `texture.md` si le thème nomme une texture ; `dark-mode.md` si l'original avait deux modes ; `fonts.md` si une police d'origine est intenable ; `data-viz.md` si chiffre réel.
1. `Base.astro` : `lang="fr"`, `<title>` dans les mots du restaurant, description d'une phrase, meta robots noindex, `<link>` fonts du Build hint avec `preconnect`, `<script>document.documentElement.classList.add('js')</script>` en tête (gate 62), import de `page.css` ; `src/components/` (Nav, Hero, Carte, Horaires, Lieu, Reservation, Footer + un par section conservée) ; `src/pages/` une par route ; `hallmarkSlots` avant `KywFooter` si `data-slot`.
2. Hero d'abord, puis les sections dans l'ordre conservé, chacune une composition de `layout.md` § 5 avec masse (visuel ≥ 360px, trois éléments en largeur, liste de trois lignes, ou statement) ; jamais deux voisines au même squelette ni deux sections photo de suite ; photos ≤ un tiers sous le hero (45 % en Photographic).
3. Copie du client gardée sauf gates 19, 54, 58, 63, 69 ; ligne changée : `/* Hallmark · reworded "<avant>" to "<après>" · <gate> */`. Un eyebrow devient le titre, il n'est pas juste supprimé.
4. DESIGN.md § Composants (décision + référence) : **Carte** en Rows (titre col. 1 à 5, prix à droite `tabular-nums`, F6), Switcher midi/soir (`role="tablist"`, premier panneau visible sans script) ou Index/Table ; jamais tuiles icône (3) ni carte dans carte (4) ; second nom dans le style du thème ; filets, pas bordure + ombre (F24) ; nom et prix visibles au téléphone (F25). **Horaires** : Schedule (`layout.md` § 5.16), `<time>` ou `<dl>`, jour fermé en `--color-muted` jamais barré, jour courant par étape de surface, pas d'icône horloge, dits une fois (69) et à la fin. **Pied** : forme nommée (mast, statement, colophon block, letter close), 200 à 400px, adresse, horaires, téléphone, réseaux, `data-credits`, jamais « Tous droits réservés » ni newsletter réflexe (85), puis KywFooter. **Photo** : `<figure data-slot data-alt>`, `width`/`height`, `srcset`/`sizes`, `object-position`, hero `fetchpriority="high"` jamais lazy, autres lazy, légende = un fait. Nav, bouton, formulaire, reveal : phase 2.
5. Bloc **Picks** en tête de DESIGN.md (SKILL.md § 5 précédé des quatre lignes de `redesign.md` § The plan) : `**Hallmark · v2.0.0 · variante legacy KYW**`, Redesign, Before, Keeps, Files, Shape, Theme (+ écartés), Chrome, Hero, Signature, Sections, Material, Comp, Sweep (phase 3).

Build `cd $ROOT && scripts/q.sh build pnpm build:site sites/$SLUG-legacy`, ETAT.md, commit.
