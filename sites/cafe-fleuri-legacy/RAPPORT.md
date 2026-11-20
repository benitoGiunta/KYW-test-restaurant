# RAPPORT QA · cafe-fleuri / legacy (phase 3)

Source : QA-build.md (captures et audit de l'agent « captures » : 0 erreur console, 0 requête en échec, 0 débordement, 0 FAIL audit, CLS 0, LCP < 750 ms mobile).

## Corrigé
- Petite cible tactile (lien téléphone du pied de page, 90x22 px sur les 3 pages) : zone de clic portée à 44 px de haut (`.colophon__txt a`). Vérifié par mesure ciblée à 375 px sur accueil, venir, 404 : plus aucune cible < 24 px.
- `twitter:card` manquant : ajouté dans Base.astro (summary).
- 404 `color-contrast` (4,36:1) : non reproduit à l'état stable (note du pied de page `#55646a`, opacité 1) ; mesure prise en cours de transition par l'audit. Aucune modification.
- Lien d'évitement « pas en premier » : faux positif, le premier arrêt de tabulation est bien `.skip` sur les 3 pages.

## Non corrigé (hypothèses)
- Polices ttf signalées : viennent de Google Fonts (le navigateur reçoit du woff2) ; pas d'auto-hébergement ici.
- `og:image` absent : aucune image fournie par le client ; à produire avec les photos.
- `robots.txt` absent : voulu (maquette noindex).
- Page `venir` sans planche dédiée ; contrôlée par mesure uniquement.

## Placeholders
- Téléphone `081 65 89 15` (placeholder dans site.ts).
- Horaires illustratifs (sources contradictoires, pas de badge « ouvert »).
- 3 photos client à fournir : salle, façade, table (slots `data-slot`).
- Structure du site supposée (site d'origine inaccessible).
- Mention « Maquette KYW, certaines données sont illustratives » et noindex présents via Base/pied KYW.

Build final : `pnpm build:site sites/cafe-fleuri-legacy` exit 0 (dist/cafe-fleuri/legacy/). Pas de `pnpm index`, pas de `[publier]`.
