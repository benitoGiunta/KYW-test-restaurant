# ETAT.md · Li Micougni · awwwards · construction phase 1

## Fait
- Brief, 3 concepts, Concept Card, système (palette, typo, grille, plan), checklist 1 à 18 dans DESIGN.md.
- Scaffold Astro 5 (engine copié de le-servais-awwwards, sans GL), `tokens.css`, `engine.css`, `site.css`, polices Young Serif et Schibsted Grotesk dans `public/fonts/`.
- Contenu : `src/data/site.ts`, `src/data/carte.json` (50 lignes réelles du PDF transcrit), `src/lib/photos.ts` (16 photos du client + logo, redimensionnées à 1600 px).
- Pages : `/`, `/carte/`, `/histoire/`, `/reservation/`, 404 ; composant `Demi.astro` (la coupe en deux moitiés), Header, Footer (pied composé + KywFooter).
- Build OK (`scripts/q.sh build pnpm build:site sites/li-micougni-awwwards`), `dist/li-micougni/awwwards/` commité.
- Mesures Playwright : h1, CTA et média du hero à 1440×900, 1280×720, 1024×768, 390×844 ; `scrollWidth` = largeur sur les 5 pages à 390 px.

## Reste (phases 2 et 3)
- Phase 2 : recollement scrub des moitiés (`--ecart` vers 0, `src/motion/`), repos (respiration de la faille), survols décrits dans DESIGN.md, reveals, transition de page déjà posée (`motion/setup.ts`). `data-reveal` à ne pas poser sur un bloc avec lien.
- Phase 3 : QA navigateur (captures, axe, clavier, reduced motion, LCP), OG composée (`public/og.png` est provisoire : logo + grill), RAPPORT.md final, sloplint, vérifier la coupe à 55 % sur chaque titre (descendantes de « g » et « p » coupées ou non).
- À contrôler : les images lazy sous le pli, le contraste du texte sur la photo si un texte y est posé (aucun pour l'instant).

## Décisions
- Concept A « Les demi-fous » ; pas de loader, pas de GL ; palette ardoise + orange du logo.
- Horaires : affichés avec « à confirmer », aucun JSON-LD d'horaires ; adresse d'exploitation Rue des Brasseurs 110 ; aucune personne nommée (administrateurs de la BCE non cités).
- Réservation : tel:, mailto: (formulaire `action="mailto:"`), lien vers le formulaire du client ; rien n'est envoyé par le site.
- `Demi.astro` coupe chaque mot séparément (retour à la ligne naturel) ; la moitié basse est `aria-hidden`.
- Aucun contenu `placeholder: true` : toute la carte, les coordonnées et les réseaux viennent de donnees.json.

## Pièges
- Une règle `@media` posée avant la règle de base du même sélecteur ne s'applique pas (en-tête mobile) : placer les adaptations téléphone en fin de `site.css`.
- Le serveur de mesure (python http.server, port 4400) est tué en fin de phase.
