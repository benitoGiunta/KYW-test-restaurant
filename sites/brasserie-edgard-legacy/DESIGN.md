**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full · 6 routes (/, /la-carte/, /lunch-et-suggestions/, /menu-groupe/, /galerie/, /contact/) plus 404
- **Before** · 121 FAIL, 73 REFLEX, 42 WARN (`.hallmark/before.txt`) : hero de 2011 px, sections à 0 px d'écart, pied sur une newsletter, 4 graisses ; la carte et le menu groupe restent
- **Keeps** · les 56 liens (Barestho, Facebook, Tripadvisor, tel:, mailto:, ancres #entrees à #desserts), le formulaire groupe (11 champs, mêmes `name`), la newsletter, toute la carte (71 plats), le lunch, les suggestions, les menus de groupe, la façade en plein écran
- **Files** · create: tout `sites/brasserie-edgard-legacy/` · edit: aucun autre dossier · delete: none
- **Shape** · Photographic (08), gardée de l'original (photo plein écran d'abord) ; le tirage Letter est écarté car la page n'est pas une lettre
- **Theme** · Atelier, dealt 2/3 (seed restaurant-namur-belgian-brasserie-5a9e·5694bca8·2026-11-20·r0) ; écartés : Vellum (gothique, trop musée pour une brasserie), Ink (catalogue noir et blanc, froid face aux bois et aux lumières chaudes)
- **Chrome** · nav : edge-aligned, logo à gauche, cinq liens, une action de réservation à droite (tirage « search-led bar » écarté : aucune recherche à faire) · footer : letter close
- **Hero** · Poster : façade plein cadre, plaque de papier en bas à gauche (titre, une phrase, réserver)
- **Signature** · la façade de nuit en plein écran, avec le nom et la réservation sur une plaque de papier
- **Sections** · Hero · Rows (carte) · Figures (lunch, bande) · Showcase 8+4 (salle) · Statement (groupes) · Schedule + adresse · Split (réservation et terrasse) · Footer
- **Material** · real : carte, prix, horaires, adresse, téléphone, 31 photos du client, logo · pictures : le client uniquement, aucune photo de bibliothèque · absent : avis, notes, histoire, équipe, boissons (aucun inventé)
- **Comp** · c1 (plaque sur photo plein cadre) choisie contre c2 (texte et photo en Stage)
- **Sweep** · phase 3

# Design : Brasserie Edgard (Mr Edgard), variante legacy

Système verrouillé. Les pages le partagent et ne diffèrent que par la composition.

## Approche

- **Macrostructure** : Photographic (08). Empreinte `Heading petit sur plaque | Body bandes photo et Range | Divider arête de l'image | Button lien typographique | Image plein cadre | Reveal aucun`.
- **Posture** : multi-pages, routes d'origine gardées (Accueil, La carte, Lunch et suggestions, Menu groupe, Galerie, Contact) ; hero Poster ; calme ; aucun pattern de scroll (phase 2 : un seul reveal).
- **Dérogations** : slider auto d'origine remplacé par une photo fixe (18) ; `vh` remplacé par `dvh` (6a) ; formulaires sans envoi, `data-endpoint=""` (70) ; menus dupliqués du HTML d'origine dédoublonnés ; « Cuisine fermé » corrigé (la cuisine est fermée de 15 h à 18 h) ; prix sans « € » complétés ; `waive 8` (séquence conservée, compositions neuves).
- **Test miroir** : un voisin avec la même brasserie obtiendrait une plaque de papier sur façade, rows, figures. Décision changée : l'ordre met le lunch (figures) avant les photos de salle, et la salle est un showcase 8+4 sans titre ; les adresses et horaires forment une bande à part.
- **Reformulations** : « Lunch & Suggestions » devient « Lunch et suggestions » ; « Heures d'ouverture » devient « Horaires » ; « Réservez votre table » devient « Réserver une table ». Les textes de conditions et de consentement du formulaire sont repris tels quels.

## Thème

Atelier (light/roman-serif/cool, restrained). Dealt 2/3, seed restaurant-namur-belgian-brasserie-5a9e·5694bca8·2026-11-20·r0. Choisi pour la matière : papier chaud, encre brun profond, Sentient léger, signal ardoise unique. Le signal ardoise (oklch 41 % 0,075 248) rejoint le bleu foncé du logo (#233D4D, lu dans `photos/00-logo.svg`) et le bleu du ciel de la photo d'origine. Le bouton rose-rouge (#DC0044) appartient au widget Barestho, pas à la marque : non repris.

## System
- Genre: editorial
- Shape of the first page: Photographic (08)
- Theme: Atelier
- Axes: light/roman-serif/cool · posture: restrained

## Tokens
`src/styles/tokens.css` est la source. Rôles :
```css
:root {
  --color-paper: oklch(94.5% 0.010 76);  --color-paper-2: oklch(91.8% 0.013 74);  --color-paper-3: oklch(88% 0.015 72);
  --color-ink: oklch(19% 0.024 52);  --color-ink-2: oklch(31% 0.018 54);  --color-muted: oklch(47% 0.014 60);  --color-rule: oklch(81% 0.011 70);
  --color-accent: oklch(41% 0.075 248);  --color-accent-ink: oklch(96% 0.008 76);  --color-focus: oklch(50% 0.095 248);
  --font-display: "Sentient", Georgia, serif;  --font-body: "Hanken Grotesk", system-ui, sans-serif;
  --radius-card: 0;  --radius-pill: 3px;  --rule-hair: 1px;  --shadow-card: voir tokens.css;
}
```

## Controls
- Primary: encre pleine · rayon 3 px · 52 px (`.btn--solid`)
- Secondary: contour encre 1 px, survol plein encre · même rayon et même hauteur (`.btn`) ; lien souligné ardoise (`.link`)

## Motion
- Character: still ; un reveal au plus (phase 2) ; sous reduced motion tout s'arrête.

## Composants

- **Carte** : Rows (`layout.md` § 5.5), nom en Sentient 400 sur les colonnes 1 à 5, description dessous en `--color-muted`, prix à droite en `tabular-nums` (F6) ; filets seuls, pas d'ombre sur les lignes (F24) ; nom et prix visibles à 375 px (F25). Accueil : cinq plats de la carte (`selection` dans `site.ts`) ; page carte : une section par catégorie, ancres d'origine.
- **Horaires** : Schedule (`layout.md` § 5.16), `<dl>` en sept lignes, cuisine fermée dite en `--color-muted` (jamais barrée), pas d'icône ; jour courant par étape de surface posé en phase 2 (`data-day` déjà présent) ; dits une fois sur la page (accueil, contact), le pied ne les répète pas.
- **Lunch et groupes** : Figures, vrais prix seulement (14,50 €, 21,50 €, 34 €, 39 €, 49 €).
- **Pied** : letter close, une phrase de congé en Sentient 300, adresse, téléphone, e-mail, Facebook, Tripadvisor, crédit des photos (`data-credits`), puis `KywFooter`. Ni « tous droits réservés », ni newsletter en pied (85).
- **Photo** : `<figure>` + `div[data-slot][data-alt]`, `width`/`height`, `sizes`, `object-position`, hero `fetchpriority="high"`, les autres `loading="lazy"`, légende = un fait tiré du champ `sujet`.
- **Nav** : une ligne de 80 px (72 sous 60 rem), réservation à droite ; sous 60 rem les liens passent sur une seconde ligne défilante (menu popover en phase 2).

## Sur-utilisation (Hallmark)
- [x] 1. Audit `sloplint --before` sur les 6 pages d'origine · preuve : `.hallmark/before.txt`, `AUDIT.md`
- [x] 2. Références lues : SKILL.md, redesign.md, macrostructure 08, layout § 5 à 7, anatomy § book, thème Atelier, design-md.md · preuve : ce fichier
- [x] 3. Deal, draw, scaffold, stamp · preuve : `src/styles/page.css:1-8`, entrée de `.hallmark/log.json`
- [x] 4. Deux comps du premier écran, choix écrit · preuve : `comp.md`, `.hallmark/comps/planche.png`
- [x] 5. Floor statique : tokens seulement, pas de `transition: all`, `overflow-x: clip`, `minmax(0, 1fr)`, `:focus-visible`, fallback reduced-motion · preuve : `base.css`, `page.css`
- [x] 6. Aucun chiffre, avis ni témoignage inventé · preuve : `grep -c` des données dans `AUDIT.md` (avis 4,3/461 non repris)
- [x] 7. Noindex, mention KYW et `KywFooter` sur les 7 pages · preuve : grep sur `dist/brasserie-edgard/legacy/**/*.html`
- [ ] 8. `sloplint --render` et jugées gates : phase 3 (FAIL 34 sur `Base.astro` attendu : la règle vit dans `base.css`, à prouver par `scrollWidth`)
- [ ] 9. Mobile 375, contraste mesuré, états des contrôles : phase 2
