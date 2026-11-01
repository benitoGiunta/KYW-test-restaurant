# ETAT : brasserie-du-quai, variante awwwards (fin de construction-1, 01/11/2026)

## Fait (phase 1 sur 3)

- `DESIGN.md` : brief, hypothèses, trois concepts (ligne d'eau, étiquette de bourriche, échelle de crue),
  test de l'échange, Concept Card « La ligne d'eau », palette, typographie, grille, hovers, plan de
  composition des 5 pages, test de généricité, liste de sur-utilisation (3 cases cochées).
- Scaffold Astro (config, tsconfig, package.json `@kyw/footer`), engine copié de `sites/partage-awwwards`
  (lui-même copie verbatim d'engine.md, sans GL), `engine.css`, `menu.ts` repris tels quels.
- Polices `font.mjs` : Big Shoulders Display 800, Schibsted Grotesk 400 et 600 (`public/fonts/`), 2 préchargées.
- Contenu : `src/data/site.ts` (contacts, horaires saisonniers, faits, classiques, équipe, histoire, hypothèses
  en tête), `src/data/carte.ts` généré depuis donnees.json (10 catégories, 52 lignes dont 3 desserts
  placeholder sans prix), `src/lib/photos.ts` (24 photos, alt rédigés).
- Composants : `Quai.astro` (titre sur la ligne d'eau + reflet inversé + photo et son reflet), `Header`,
  `Footer` (échelle de crue, logo, horaires, contacts, colophon « Photos : La Brasserie du Quai »), `Photo`.
- Pages : `/`, `/carte/`, `/histoire/`, `/reservation/`, `404`, mise en page statique complète desktop et
  390 px (CSS `site.css`), transition d'eau (rideau qui monte), en-tête qui s'écarte, menu mobile.
- Build OK : `scripts/q.sh build pnpm build:site sites/brasserie-du-quai-awwwards` → `dist/brasserie-du-quai/awwwards/`
  (5 pages, 9,3 Mo, noindex et pied KYW validés par build-site.mjs).

## Reste

1. **Phase 2 (motion)** : module pilote `src/motion/quai.ts` : reflet ondulant (filtre SVG feTurbulence,
   ticker GSAP, pause hors écran via IntersectionObserver, zéro en mouvement réduit), ligne d'eau qui monte
   au défilement, reveals déclaratifs (`data-split="lines"` sur les titres, `data-reveal` jamais sur un bloc à lien),
   verbe « accoster » (x: -24 → 0 avec tangage). Le mettre dans `setup.ts`.
2. `public/og.png` absent (référencé par le layout) : `og.mjs` avec le serveur lancé, phase 2 ou 3.
3. Jamais vu en navigateur : mesurer avant tout shoot (lecons « 3.6 bis ») le h1, les CTA et la photo du hero
   à 1440×900, 1280×720, 1024×768, 390×844 ; vérifier que les CTA de l'accueil tiennent au-dessus de la
   ligne de flottaison (le reflet est rogné à 55 % de la hauteur du titre pour ça) ; vérifier le calage
   du titre sur la ligne (`margin-bottom: -0.06em` de `.quai__titre`, à ajuster à l'œil).
4. Contrastes à mesurer : `--c-accent` #B3813B sert de texte sur l'eau (titres de pied, `.reperes__titre`,
   `.equipe__nom`) : à vérifier (≥ 4,5:1 attendu sur #16282B) ; `--c-accent-ink` sur ground.
5. KywFooter sous le pied sombre : vérifier sa lisibilité (surcharger les variables du site si besoin, pas le paquet).
6. Phase 3 : QA (QA-<étape>.md de l'agent « captures »), jury, RAPPORT.md, `pnpm index`, commit de dist.

## Décisions

- Concept A « La ligne d'eau » (nom + lieu), pas de loader, pas de GL (filtre SVG pour le reflet).
- Palette froide (ciel pâle, pierre bleue, Meuse de nuit, laiton du logo) : défaut n° 1 évité.
- Logo SVG blanc et or réservé au pied de page sombre ; en-tête en marque typographique.
- Desserts placeholder sans prix, mention « exemple » ; aucun vin ni formule inventés ; notes d'avis et
  Gault&Millau non affichés ; Michelin 2026 cité (source officielle).
- Jours de fermeture : « à confirmer » à l'écran ; JSON-LD sur lundi, jeudi, vendredi, samedi (horaires d'hiver).
- Réservation : téléphone en CTA principal, lien externe vers la page Réservation du site actuel, mailto.
- Navigation : « La carte », « Le quai » (page histoire), téléphone, « Réserver ».
