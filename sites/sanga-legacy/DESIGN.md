**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** : full, Sanga (ramen japonais, Rue Saint-Loup 8, Namur) ; contenu et liens gardés, système et composition changés.
- **Before** : `.hallmark/before.txt` (138 FAIL, 82 REFLEX, 7 WARN), `AUDIT.md`.
- **Keeps** : one-page ; carte en six rubriques ; téléphone `tel:081241038` ; lien Commander (Order & Eat) ; lien Google Maps ; liens de catégories vers sanganamur.be ; conditions générales et confidentialité ; baseline « le premier restaurant de ramen à Namur ».
- **Files** : `src/pages/{index,404}.astro`, `src/layouts/Base.astro`, `src/components/{Nav,Hero,Ramen,Rubrique,Plein,Nouilles,Complements,Livraison,Horaires,Pied}.astro`, `src/data/site.ts`, `src/styles/{tokens,base,page}.css`.
- **Shape** : Catalogue (kept, empreinte Heading serif|Body sans|Divider hairline et ink bar|Button pill|Image photo client|Reveal none) ; draw 1c8dc9 (Marquee Hero) non retenu comme forme : l'original est un catalogue de rubriques, la forme gardée est celle du site d'origine. Du draw sont pris : hero Counter, footer mast.
- **Theme** : Solstice, dealt 1/3, seed `restaurant-namur-japanese-ramen-b876·839c6a6f·2026-11-10·r0`. Écartés : Squeeze (vert forêt, tuiles arrondies, fruits : lit « jus de fruits », pas un bol fumant) ; Atelier (limewash et cartes de coton, galerie : trop silencieux pour un ramen de quartier). Solstice : crème, encre brune (le texte brun de l'original), un vermillon (la laque des bols), filets dorés.
- **Chrome** : nav : edge-aligned, wordmark « Sanga 山河 », trois ancres, une action (« search-led bar » du draw écarté : pas de recherche sur une carte de 33 lignes) · footer : mast (le nom à 11 rem sur bande d'encre, liens, légal).
- **Hero** : Counter. Le titre de sept mots, la phrase du client, un puits (filet d'encre, ombre dure) qui porte le téléphone en Yeseva et le bouton Commander ; photo verticale du ramen au chashu à droite.
- **Signature** : le puits de commande, le numéro de téléphone posé comme un prix de comptoir.
- **Sections** : Hero (Counter) · Ramen (Rows, tête 4 colonnes, trio de bouillons) · Plein (Showcase 21:9, deux bols vus de dessus) · Udon, soba et donburi (Rows sur deux colonnes) · Compléments (Band encre, Index sur trois colonnes) · Livraison (Figures : deux paliers 25 € et 35 €) · Horaires (Schedule + adresse) · Pied (mast).
- **Material** : real : tout le dossier (carte, prix, horaires, zones, paiement, adresse, téléphone) · pictures : 3 photos du client sur 7 (hero ramen, deux bols de dessus, aucune photo de salle) · absent : avis et note (non vérifiés), histoire, équipe, réseaux, e-mail (Gmail personnel non repris), photo de salle ou de façade.
- **Comp** : 2 built, no key · c1 chosen (`comp.md`).
- **Sweep** : phase 3.

## Approche conservée

- **Macrostructure** : Catalogue (kept).
- **Posture** : une seule page (aucune route supprimée : les routes d'origine hors accueil sont la boutique Order & Eat, lien Commander conservé) ; hero Counter (le site d'origine ouvrait par une photo, l'action est la commande) ; calme ; aucun scroll animé.
- **Dérogations** : tuiles de catégories identiques (24b) remplacées par des Rows ; `vh` du hero remplacé par `dvh` si utilisé ; gabarit hero, carte, livraison, horaires gardé en séquence (`waive 8`) ; aucune image de stock (un tiers de photos sous le hero au plus).
- **Test miroir** : un voisin avec le même site (ramen, une rue, carte et livraison) obtiendrait crème, brun et vermillon avec le puits téléphone en hero ? Seulement s'il tire Solstice et Counter ; décision propre à cette version : le trio de bouillons (miso, shio, shoyu) devient le fil de la carte, et le téléphone est le chiffre le plus gros de la page.

## Thème et tokens

Source : `src/styles/tokens.css` (Solstice). Papier `oklch(94% 0.03 80)`, encre `oklch(27% 0.05 50)`, vermillon `oklch(54% 0.20 24)`, or `oklch(74% 0.14 75)` (filets et chiffres sur bande d'encre seulement). Polices : Yeseva One (titres, prix des plats en nom), Archivo (corps), Archivo Narrow (petits textes). Lumière `long-light`. Boutons : pilule vermillon 48 px, secondaire souligné or.

## Composants

- **Carte** : Rows (nom en Yeseva à gauche, prix `tabular-nums` à droite, description en dessous, filet de 1 px) ; jamais de tuiles icône ni de carte dans une carte ; une rubrique par colonne ; lien « Commander : <rubrique> » vers la catégorie de sanganamur.be ; nom et prix visibles à 375. Le trio de bouillons est un `<ul>` de pilules. Rubrique Compléments sur la bande d'encre (une seule bande sombre).
- **Horaires** : Schedule en `<table>` à `<time>` : lundi « Fermé » en `--color-muted`, jamais barré ; dits une fois, en fin de page ; jour courant : phase 2 (étape de surface, sans icône d'horloge).
- **Pied** : forme mast (le nom en grand sur encre, accueil « Irashaimase ! Bienvenue ! » repris du site, cinq liens, mention légale et crédit des photos), puis `<KywFooter />` ; ni « Tous droits réservés » ni newsletter.
- **Photo** : `<figure><div data-slot data-alt><img></div><figcaption></figcaption></figure>`, `width` et `height`, hero `fetchpriority="high"`, la photo large en `lazy`, légende = le sujet réel du fichier (`photos/index.json`).
- **Nav, bouton, formulaire, reveal** : phase 2 (menu mobile, états, un reveal au plus).

## Sur-utilisation

- [x] 1. Hallmark lu : SKILL.md, redesign.md, layout.md, gates.md (Floor), anatomy.md, comp.md, design-md.md, theme solstice.md · preuve : `.hallmark/log.json`, stamp de `src/styles/page.css:1`
- [x] 2. Audit avant refonte · preuve : `AUDIT.md`, `.hallmark/before.txt`
- [x] 3. Deal, draw et scaffold tracés · preuve : `page.css:1-3`, `src/styles/tokens.css`
- [x] 4. Comp avant build, deux variantes sur un axe · preuve : `.hallmark/comps/c1.html`, `c2.html`, `comp.md`
- [x] 5. Floor sans FAIL sur le CSS aplati et la page · preuve : sloplint, 0 FAIL, 1 WARN (écarts de gouttière, corrigé ensuite) ; les FAIL restants du build concernent `packages/kyw-footer`, jamais modifié
- [x] 6. Aucun tiret cadratin, apostrophes typographiques, insécables avant « : ; ! ? € » · preuve : `src/data/site.ts`, contrôle ci-dessous
- [ ] 7. Hero review et rendu (`--render`) · à faire en phase 2 et 3
- [ ] 8. Motion, menu mobile, états des contrôles · phase 2
