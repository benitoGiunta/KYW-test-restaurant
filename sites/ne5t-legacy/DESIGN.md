# Design: NE5T Hôtel & Spa (restaurant Intuition), variante legacy

**Hallmark · v2.0.0 · variante legacy KYW**
- Redesign : full, contenu et wiring gardés, système et composition neufs
- Before : `.hallmark/before.txt` (62 FAIL, 17 REFLEX)
- Keeps : liens externes (RoomRaccoon, Facebook, Instagram, TripAdvisor, presse), `tel:`, `mailto:`, hero photo plein écran, réservation par téléphone
- Files : `src/styles/{tokens,base,page}.css`, `src/components/*`, `src/pages/*`, `src/data/site.ts`
- Shape : multi-pages à hero photographique (draw e74411 : Marquee Hero écarté, Poster gardé car posture d'origine)
- Theme : Spore, dealt 1/3. Écartés : Vellum (gothique, trop savant pour « décomplexée »), Refract (lumière du jour, contredit la façade de nuit)
- Chrome : nav en dalle (tirée), pied en phrase (tiré)
- Hero : Poster accueil et spa, Stage restaurant et suites, Corridor histoire, infos et 404
- Signature : la façade de nuit, bassin allumé, plein cadre
- Sections accueil : Hero, photo plein cadre sans titre, menu du mois (rangées), chiffre du spa (puits), suites (rangées), horaires et adresse, réservation + photo, pied
- Material : real = carte, formules, prix spa et chambres, horaires par jour, équipe ; pictures = 16 photos du client ; absent = avis, notes, presse détaillée, heures exactes
- Comp : c1 choisi (voir comp.md)
- Sweep : phase 3

## System
- Genre : atmospheric · Théme : Spore (colourway cellar) · Axes : dark/roman-serif/warm · posture : committed
- Dérogations : 13 routes d'origine fusionnées en 6 (accueil, restaurant, spa, suites, histoire, infos) ; environs, presse, packages, séminaire, réservation, tarifs, contact renvoient à Infos ou au site actuel.

## Tokens
Source de vérité : `src/styles/tokens.css` (paper oklch 15/19/24 %, ink parchemin, accent rose oklch 77 % 0.09 30, Young Serif + Instrument Sans).

## Composants
- Carte : rangées (`.row--carte`, catégorie col. 1 à 4, plats col. 5 à 12), prix Young Serif rose à droite, filets 1px, pas de tuiles.
- Formules : rangées nom, note, prix flush right.
- Horaires : Schedule en `<dl>`, jours fermés en `--color-muted`, jour courant en phase 2.
- Pied : statement (une phrase, plan, adresse, réseaux, `data-credits`) puis KywFooter.
- Photo : `<figure data-slot data-alt>`, width/height, hero `fetchpriority="high"`, autres lazy, alt = `sujet` de photos/index.json.
- Boutons : pilule rose pleine et pilule contour, 48px, huit états.

## Controls
- Primary : accent plein · pilule · 48px. Secondary : contour 1.5px ink-2 · même forme.

## Motion
- Phase 1 : aucune. Cible : calme, un reveal au plus.

## Sur-utilisation (Hallmark)
- [x] 1. Deal, draw, scaffold, stamp · preuve : page.css:1-4, `.hallmark/log.json`
- [x] 2. Audit avant/après · preuve : AUDIT.md, `.hallmark/before.txt`
- [x] 3. Comp avant build · preuve : comp.md, `.hallmark/comps/`
- [x] 4. Sloplint sur page.css · preuve : 0 FAIL CSS ; 34 et 26a sur le HTML sont des faux positifs (CSS externe, règles dans base.css:2 et :focus-visible)
- [ ] 5. Sloplint `--render` et revues · phase 2 et 3
