# Design : Makimono (variante legacy)

**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full · 2 pages (/, /404), one-page conservée (ancres : Carte, Photos, Livraison, Événement, Contact)
- **Before** · Floor 11 FAIL · Reflex 6 · gabarit Bootstrap à reveals cachés, texte à 8 px du bord, images cassées ; la photo plein écran et la mascotte restent
- **Keeps** · liens de commande, Google Maps, Facebook, Instagram, `mailto:`, `tel:` (ex-`wtai:`), PDF de la carte, baseline, photos, horaires, carte complète
- **Files** · create : tout le paquet `sites/makimono-legacy/` ; delete : none (le site d'origine n'est pas dans le dépôt)
- **Shape** · Photographic (08), kept ; empreinte `Small|Full-bleed bands and rows|Image edge|Typographic link|Full-bleed|None`. Draw 8e190a proposait Feature Stack, hero Index, nav edge-aligned, footer statement : swap = shape et hero gardent Photographic et Poster (l'original ouvre sur la photo), nav et pied pris au draw ; « Figures » et « Band » laissés de côté comme demandé
- **Theme** · Halftone, dealt 1/3 (seed `restaurant-namur-creative-sushi-53ef·65f2866c·2026-11-10·r0`), stock crème et vermillon. Écartés : Hum (papier grainé et bords déchirés, trop enfantin pour un fast-casual de 20 à 30 €), Squeeze (fond vert forêt, fruit : le saumon y serait gris). Halftone : une encre, la trame de points, l'étiquette : la carte se lit comme le dos d'une canette
- **Chrome** · nav : edge-aligned (mascotte à gauche, cinq liens, un bouton « Commander ») ; pied : statement (bande encre, la baseline d'origine en Ultra)
- **Hero** · Poster : photo cliente plein cadre (nigiri flambé au chalumeau), plaque crème en bas à gauche portant titre, une phrase, deux actions
- **Signature** · la carte lue comme l'étiquette d'un emballage : rangées entre filets, noms en Chivo 700, prix en Ultra
- **Sections** · Hero (Poster) · Carte (Switcher + Rows) · Photos (Bento) · Composer (deux puits) · Boxes (Rows à prix géants) · Livraison et événement (Split + puits à trame) · Horaires et adresse (Schedule) · Pied (statement)
- **Material** · real : tout le contenu (donnees.json, dossier.md, page.html) · pictures : 8 des 16 photos du client + logo · absent : histoire, équipe, citations, nombre d'avis, outil de réservation de table
- **Comp** · voir `comp.md`
- **Sweep** · phase 3

## Approche
- **Macrostructure** : 08 Photographic, one-page. Posture : Poster, calme (une seule bascule de carte, pas de scroll animé). Routes : `/` et `/404`.
- **Dérogations** : carrousel Owl supprimé, lightbox remplacée par un bento (18) ; pluie de reveals WOW.js supprimée, un reveal au plus en phase 2 (craft.md § 5) ; emoji du titre retirés (30a) ; `waive 8` (séquence gardée, composition neuve) ; modale de recrutement dropped (image absente, texte en commentaire dans l'original).
- **Test miroir** : un voisin avec le même site (sushi, photos sombres, one-page) aurait un hero plein écran sombre et une carte en cartes à icônes. Ici : plaque crème à filet de 3 px sur le cadre, carte en rangées d'étiquette, prix en slab. Décision changée par rapport au draw : le hero reste Poster (le draw donnait Index).

## Thème (tokens.css)
Halftone cream and vermilion : `--color-paper` crème, `--color-ink` brun noir, `--color-accent` vermillon (écho du saumon du logo), Ultra pour les titres et les prix, Chivo pour tout le reste. Rayons 0 et 3 px, filets de 3 px, pas d'ombre. Couleur de marque : le logo est noir ardoise, blanc et saumon ; aucun fichier de charte, donc pas de `--brand`. La trame de points ne couvre ni texte ni photo : un puits (événement) et la bande du pied.

## Composants
- **Carte** : Switcher de quatre rubriques (Rolls, Nigiri et poké, Accompagnements, Boissons), `role="tablist"`, premier panneau visible sans script (tous visibles si JS absent) ; chaque rubrique en Rows : nom col. 1 à 4, description 5 à 10, prix à droite en Ultra tabulaire (F6) ; sous 60 rem le prix passe sur la ligne du nom (F25). Filets, pas de bordure et ombre (F24), pas de tuile à icône.
- **Composer** : deux puits (Create.Your.Roll, Create.Your.Bowl), groupes en `dl`, options et prix en liste continue.
- **Boxes** : deux rangées, prix en Ultra à `--text-section`.
- **Horaires** : Schedule en `dl`, `<time>`, dimanche midi « midi fermé » en `--color-muted`, non barré ; jour courant : phase 2 ; dits une fois (69, pas repris dans le pied).
- **Pied** : statement, 200 à 400 px, adresse, téléphone, réseaux, `data-credits`, puis `KywFooter`.
- **Photo** : `<figure>` + `<img width height srcset sizes>`, hero `fetchpriority="high"`, autres `loading="lazy"`, légende = un fait tiré de `photos/index.json`.

## Sur-utilisation
- [x] 1. Floor 16 points · preuve : `sloplint --render --url` 0 FAIL, 0 REFLEX (page.css)
- [x] 2. Stamp, critique et waivers en tête de `page.css` · preuve : src/styles/page.css:1-6
- [x] 3. deal, draw, scaffold lancés et journalisés · preuve : `.hallmark/log.json` (entrée makimono-legacy)
- [x] 4. Audit `--before` · preuve : AUDIT.md, .hallmark/before.txt
- [x] 5. Comp avant build · preuve : comp.md, .hallmark/comps/c1.png, c2.png
- [x] 6. Noindex, mention et un seul pied KYW · preuve : Base.astro, `grep` dist (index et 404)
- [ ] 7. Reveal, nav active, jour courant, Switcher raffiné, `--kept` : phase 2 et 3
