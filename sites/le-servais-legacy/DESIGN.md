**Hallmark · v2.0.0 · variante legacy KYW**
- Redesign : full, contenu et routes gardés, système et composition neufs.
- Before : leservais.be (Wix), captures du 10/11/2026, `AUDIT.md`.
- Keeps : routes (accueil, groupes-privatisation, événements, carte-cadeau, contact), liens PDF cuisine et bar, `book.leservais.be`, réseaux, adresse « au départ du téléphérique », horaires, turquoise.
- Files : `src/styles/{tokens,base,page}.css`, `src/data/site.ts`, `src/components/*`, `src/pages/*`.
- Shape : accueil Counter sur structure Wix conservée ; 5 pages intérieures.
- Theme : Overprint (dealt 1/3, seed restaurant-namur-brasserie-cocktail-d06f·59136cc0·2026-11-10·r0). Écartés : Squeeze (vert forêt, éloigné du turquoise de marque), Halftone (crème et vermillon, pas de turquoise).
- Chrome : barre d'encre flottante, disque LS, un seul bouton plein par vue.
- Hero : Counter (titre, une phrase, réserver à côté de la photo du comptoir teintée turquoise).
- Signature : surimpression, un carré orange qui croise la photo turquoise (le moss se forme au croisement).
- Sections : hero, offres (bande d'encre), spécialités (lignes), groupes, lieu, horaires.
- Material : photographies du client, imprimées en une encre (niveaux de gris + multiply).
- Comp : 2 construites, c1 choisie (`comp.md`).
- Sweep : phase 3.
- Échanges avec le draw (4e6e56) : Marquee Hero remplacé par Counter statique (l'original n'avait pas de bandeau) ; « prochains créneaux en boutons » remplacé par la bande d'offres (aucune donnée de créneaux) ; « salle en pleine page sans titre » écarté (une seule photo du lieu, 1158 px de large).

# Système

## Approche
Macrostructure : accueil en une page + pages (empreinte Heading|Body|Divider|Button|Image|Reveal : grandes capitales, lignes sous filet, bouton plein, photo teintée, un reveal en phase 2). Posture : calme, un pattern de scroll au plus. Dérogations : carrousel d'affiches auto remplacé par la page Événements en lignes (18) ; photos de stock Wix écartées (83) ; `vh` en `dvh` (6a). Test miroir : un voisin avec le même site aurait une photo plein cadre et un titre centré ; ici titre en deux lignes à gauche, photo à droite et carré orange, le plan d'accueil commence par les offres (décision changée : bande d'encre juste après le hero).

## Thème
Overprint, papier journal gris, encre quasi noire, Anybody 900 large sur Archivo, deux encres : turquoise (la marque) et orange.

## Tokens
```css
--color-paper: oklch(91.5% 0.014 92); --color-ink: oklch(17% 0.008 60); --color-accent: oklch(65% 0.12 212);
--color-accent-2: oklch(71% 0.19 50); --color-focus: oklch(44% 0.1 220); --color-mix: oklch(35.5% 0.121 142);
--font-display: "Anybody"; --font-body: "Archivo"; --font-outlier: "Archivo Narrow";
--radius-card: 0; --radius-pill: 0; --rule-hair: 1px; --rule-bar: 4px; --display-stretch: 140%;
```
Le turquoise de marque (#1b7f87) est plus sombre que l'accent du thème : l'accent reste celui du thème (65 % de clarté) pour porter du texte d'encre ; le #1b7f87 n'apparaît plus qu'en photo.

## Controls
- Primaire : plein turquoise, texte encre, rayon 0, 48 px, bord 4 px d'encre.
- Secondaire : contour d'encre, même gabarit, rempli d'encre au survol.

## Motion
Phase 2 : un seul reveal, rien d'autre. Reduced motion : tout visible immédiatement.

## Composants
- Carte : Rows (nom large en colonne, prix à droite, filet 4 px au-dessus, filets fins entre lignes) ; page carte avec lien de saut par rubrique, tout visible sans script ; PDF cuisine et bar en liens.
- Horaires : Schedule en `dl`, `time` par ligne, jour courant en phase 2, dits une fois (section finale) et rappelés sur la page contact et carte.
- Pied : colophon (nom en grand, adresse et contacts, routes, réseaux) sur l'encre, puis KywFooter.
- Photo : `<figure data-slot data-alt data-credits>`, `width`/`height`, `srcset`, hero `fetchpriority="high"`, les autres lazy.
- Nav, bouton, formulaire, reveal : phase 2 (nav : liens masqués sous 48 rem en attendant le menu).

## Sur-utilisation
- [x] 1. Hallmark Floor lié · preuve : sloplint src 0 FAIL, 0 WARN
- [x] 2. Deal puis draw tirés contre `$LOG` · preuve : `.hallmark/log.json`
- [x] 3. Stamp en première ligne de page.css · preuve : src/styles/page.css:1
- [x] 4. Comp avant build · preuve : .hallmark/comps/c1.png, c2.png
- [x] 5. Aucun tiret cadratin, insécable avant € · preuve : contrôle Python sur src/
- [ ] 6. Rendu navigateur (`--render`) · à faire en phase 3
