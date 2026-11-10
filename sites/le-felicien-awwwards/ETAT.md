# ETAT · le-felicien · awwwards · construction-1 (phase 1 sur 3)

## Fait
- Brief, 3 concepts notés, Concept Card, système (palette, typo, grille, plan de composition, hover, repos) et checklist 1 à 18 : `DESIGN.md`.
- Concept retenu : « L'échelle » (règle graduée de 0 à 40 €, verbe « jauger »). Pas de loader, pas de GL.
- Scaffold Astro 5 (engine copié de ferme-blanche-d-asie-awwwards, sans lignes GL), `tokens.css`, `engine.css`, `site.css`, `Base.astro` (head complet, JSON-LD Restaurant, noindex), `Header`, `Footer` (+ `KywFooter`), `Echelle.astro` (règle : pins, plage, points), `Photo.astro`.
- Contenu : `src/data/site.ts` et `carte.json` (68 lignes de la carte d'automne, prix parsés depuis `donnees.json`, typographie française). Aucun placeholder fictif.
- Pages statiques : `/`, `/carte/`, `/histoire/`, `/reservation/`, `404`. Favicon SVG + PNG, `og.png` composée.
- Build OK (`scripts/q.sh build pnpm build:site sites/le-felicien-awwwards`), `dist/le-felicien/awwwards/` écrit. Mesures hero 1440×900, 1280×720, 1024×768, 390×844, 320×568 : `.display` left ≥ gutter, `scrollWidth` = fenêtre, CTA du hero sous le pli de 720 px en dessous de 690 px.

## Reste (phases 2 et 3)
- Signature : curseur de budget (épingle qui s'accroche aux crans, phrase réécrite, plats de la carte estompés au-delà du budget) ; driver unique `--prix` dans `src/motion/`.
- Règle qui se dessine à l'arrivée, épingles du hero qui tombent par crans, trait de lecture au repos (18 s), rideau vert traversé d'un trait (transition à affiner : `motion/setup.ts` est minimal), hover de plat qui place l'épingle de rubrique.
- État « Ouvert maintenant » dans l'en-tête (Intl Europe/Brussels, détail repris du concept B).
- Règle d'heures (12 h à 14 h, 18 h à 21 h 30) dans la section « Deux services » (aujourd'hui en texte).
- Revoir en navigateur : hover, focus, reduced motion, mobile réel, LCP (photo `fetchpriority=high`), axe, contraste du jaune sur le vert (3,7:1, uniquement grands éléments et focus).
- `RAPPORT.md`, `QA`, jury/sloplint (self), photos réelles à demander au client.

## Décisions et pièges
- Pas d'Unsplash : une seule photo (2020, légendée illustrative) + illustration de couverture ; ne pas la présenter comme photo de salle.
- Interruption de fin 2025 non détaillée (dates : lancement fin 2019, réouverture 22/01/2026). Capacité 300/400 couverts, parking, avis : non affichés (inconnus).
- Réservation : lien Tablebooker `https://reservations.lefelicien.be/` (donnees.json), `tel:`, `mailto:` ; aucun formulaire.
- Étiquettes des épingles du hero cachées sous 64 rem (légende en liste dessous). Titre du hero plafonné à 32 svh pour garder les CTA au-dessus du pli.
- `font.mjs google "Schibsted Grotesk" 100..900` échoue (400): axe 400..900.
