# Design : Le Grill des amiS (variante legacy)

**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full : contenu et wiring gardés, système et composition neufs
- **Before** · `.hallmark/site-actuel/`, `AUDIT.md`
- **Keeps** · routes réserver, carte, à propos, traiteur, contact, spécial viandes ; liens `tel:` et réservation Wix ; losange GS ; photos du client ; devise
- **Files** · `src/styles/{tokens,base,page}.css`, `src/layouts/Base.astro`, `src/components/{Nav,Fig,Plats,Horaires,Footer}.astro`, `src/data/{site.ts,carte.json}`, 8 pages
- **Shape** · Photographic (08, gardée : l'original ouvrait sur une photo plein écran). Tirage 5306cc proposait Feature Stack, Stage, slab, letter close : slab et letter close pris, Feature Stack et Stage refusés (macrostructure et posture gardées), `waive 8`
- **Theme** · Darkroom, dealt 1/3 (seed restaurant-namur-steakhouse-grill-694e·8a7750ac·2026-11-10·r0), colourway rouge. Écartés : Vellum (parchemin clair, gothique, étranger à la salle noire), Midnight (bleu nuit, la marque est rouge et or)
- **Chrome** · nav slab (barre pleine largeur, logo, cinq liens, Réserver) · pied letter close (« Pour le plaisir de nos amis. », Elise et Gaëtan, adresse, liens) puis KywFooter
- **Hero** · Poster (gardé) : grill et pince plein cadre, plaque basse à gauche sur la zone la plus sombre
- **Signature** · la pièce saisie à la pince au-dessus du feu, sous un titre en capitales fines
- **Sections** · Hero · Grid (trois temps) · Rows (carte) · Showcase (verres) · Band (réservation et horaires) · Pied
- **Material** · real : adresse, téléphone, horaires, carte complète, copie du client, 13 photos · absent : avis, réseaux, e-mail, année d'ouverture, presse
- **Comp** · 2 built, no key, c1 choisie (`comp.md`)
- **Sweep** · phase 3

## Approche

Macrostructure Photographic (08), empreinte `Sofia 200|Barlow|Filets 1 px|Bouton plein rouge|Photo plein cadre|Aucun reveal`. Posture : Poster, calme, aucune chorégraphie de scroll. Dérogations : médaillons du hero retirés (18), marquee retiré, témoignages Wix retirés (46a), formulaire d'inscription retiré (85), galeries /terrasse et /plats repliées. Test miroir : un voisin avec le même site aurait une steakhouse noire et or en Poster ; la décision différente est le rouge de marque contre l'ambre du thème et les photos gardées en couleur.

## Thème

Darkroom, colourway rouge : fond noir chaud (`--color-paper` oklch 12,5 % 0,008 55), encre blanche cassée, signal `oklch(62% 0.19 32)`, `--color-accent-deep` `oklch(44% 0.16 32)`. Sofia Sans Extra Condensed 200 en capitales (titres, prix), Barlow (texte). Rayon 0, filets 1 px, grain sur deux bandes au plus. Couleur de marque : le rouge vif du losange client est lu sur les captures, le colourway rouge du thème s'en approche sans le copier. Écart au thème : les photos restent en couleur (le rouge des verres et du feu est l'identité), `filter: none` dans `page.css`.

## Composants

- **Carte** : Rows (nom à gauche, prix à droite en `tabular-nums`, description sous le nom), index sticky par ancres (le midi, entrées, plats, grillades, bambins, boissons), filets de 1 px, jamais de tuiles. Nom et prix visibles au téléphone. Référence : `layout.md` § 5.5.
- **Horaires** : Schedule en `<dl>`, `<time>`, jours fermés en `--color-muted` non barrés, jour courant par la surface `--color-paper-3`, dits une fois par page, dans le Band.
- **Pied** : letter close, un seul logo KYW dans le paquet, adresse, téléphone, liens, `data-credits`.
- **Photo** : `<figure data-slot data-alt>` avec `width`/`height`, hero `fetchpriority="high"`, autres lazy.

## Sur-utilisation

- [x] 1. Audit lancé avant la refonte · preuve : `AUDIT.md`, `.hallmark/before.txt` non produit (HTML Wix non exécuté), captures lues
- [x] 2. Floor lu en entier · preuve : stamp `src/styles/page.css:1`
- [x] 3. Deal puis draw tirés dans le journal partagé · preuve : `.hallmark/log.json` (draw 5306cc)
- [x] 4. Scaffold du thème, tokens uniques · preuve : `src/styles/tokens.css`
- [x] 5. Stamp, critique, waivers dans les 40 premières lignes · preuve : `src/styles/page.css:1-20`
- [x] 6. Deux comps avant build, choix écrit · preuve : `comp.md`
- [x] 7. sloplint avec rendu, 0 FAIL · preuve : `.logs/gda-sloplint.log` (accueil : 0 FAIL, 0 REFLEX)
- [ ] 8. REFLEX des pages intérieures (44c, 71, 77, 79) · à lever en phase 2, voir ETAT.md
