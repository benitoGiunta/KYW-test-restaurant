# ETAT · novobel-awwwards · construction-1 (phase 1 sur 3)

## Fait
- Brief, 3 concepts notés, Concept Card, système (palette, typo, grille, plan de composition) : DESIGN.md.
- Scaffold Astro, engine copié de chez-guillaume-awwwards (socle verbatim, sans GL), tokens.css, engine.css, Base.astro, Header, Footer (+ KywFooter), Photo.
- Contenu : `src/data/site.ts` (hypothèses en tête), 9 photos redimensionnées (≤ 1800 px) dans `src/assets/photos/`.
- Pages : `/`, `/projets/`, `/a-propos/`, `/contact/`, 404 ; mise en page statique complète et responsive (media 900 et 520).
- Build OK (`scripts/q.sh build pnpm build:site sites/novobel-awwwards`), noindex et pied KYW présents ; mesure Playwright : aucun scroll horizontal, `.display` ≥ gutter, aucune requête en échec.
- Polices : Barlow Condensed 600/800, Public Sans variable, dans `public/fonts/`.

## Reste (phases 2 et 3)
- Motion : tracé de la ligne de cote (`.cote`, scaleX au scroll), compteurs des 4 cotes, reveals `data-reveal` / `data-split` (déjà posés dans le HTML), hover des lots, rideau (déjà branché).
- QA navigateur complète, captures, axe, jury, Lighthouse ; contrôle de contraste de `--c-accent-texte` (non utilisé en texte pour l'instant).
- Retirer la graisse 600 si inutilisée ; vérifier que `og.png` (police par défaut Pillow) est à refaire avec Barlow Condensed ; `RAPPORT.md` final, points 19+ de la checklist.

## Décisions
- Slug non restaurant : maquette d'entreprise de rénovation, pages renommées (projets, contact). Pas de loader, pas de GL.
- Pas de formulaire en ligne : `mailto:` seulement ; aucun faux envoi.
- Pas d'horaires, pas d'avis, pas de « 25 ans ».

## Pièges
- `engine.css` : `#curtain` utilise `--c-curtain` ; `data-split` cache le texte sous `.motion` tant que l'engine ne l'a pas révélé.
