# ETAT, mon-epi awwwards, construction-1 (phase 1 sur 3)

## Fait
- Brief, 3 concepts, Concept Card, système, checklist 1 à 18 : `DESIGN.md`.
- Scaffold Astro 5, engine copié verbatim d'un site livré (atelier-de-bossime-awwwards), `tokens.css` et `site.css` au système Monepi, Base.astro (head, JSON-LD Bakery, noindex), Header, Footer, `KywFooter`.
- Contenu réel : `src/data/site.ts` (carte complète sauf quiches, farines, histoire, four, points de vente). 18 photos du client via `astro:assets`.
- Pages : `/`, `/carte/`, `/histoire/`, `/reservation/`, `404.html`. Build passe ; `dist/mon-epi/awwwards/` écrit. Mesures hero aux 4 viewports : CTA dans la flottaison, aucun débordement horizontal.
- favicon SVG + PNG, apple-touch-icon, og.png composée, robots.txt.

## Reste (phases 2 et 3)
- Phase 2 : motion (reveal `data-split`/`data-reveal` à poser, `data-intro` toujours avec l'un des deux), échelle qui se remplit (scrub), grain de farine au repos, transition de page (rideau braise), aperçu photo au survol des lignes de carte, menu mobile si besoin, hovers de liens.
- Phase 3 : QA navigateur, shoot, jury, axe, LCP, poids d'og.png (645 Ko, à recompresser), RAPPORT.md final, `pnpm index`.
- `dist/mon-epi/awwwards/` contient le build de phase 1 ; `pnpm index` à faire en phase 3.

## Décisions et hypothèses
- Boulangerie, pas restaurant : « Commander » remplace « Réserver », CTA `tel:` seul (pas d'e-mail, pas d'URL de réservation, pas de formulaire).
- Seul horaire publié : vendredi 9 h à 18 h ; pas de jour « fermé » affiché.
- Taux d'extraction « environ » ; année du four « début des années 2000 » (2000 ou 2002 selon le site client).
- Avis du site client non repris (non vérifiables) ; rubrique Quiches omise (404 chez le client).
- Aucun contenu fictif, aucun `placeholder: true`.
- Photo 22 (boulanger) légendée sans nom (identité non précisée) ; logo non réutilisé en image.
