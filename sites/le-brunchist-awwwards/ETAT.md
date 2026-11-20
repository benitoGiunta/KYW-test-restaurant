# ETAT : Le Brunchist, variante awwwards, phase 1 (construction-1)

## Fait
- DESIGN.md (brief, 3 concepts, Concept Card, système, checklist 1 à 18).
- Scaffold Astro, engine verbatim (sans GL), tokens, site.css, polices (Cabinet 500/800, DM Mono 400).
- Contenu `src/data/site.ts` (placeholders marqués), 5 pages statiques : /, /carte/, /histoire/, /reservation/, 404. Pied KYW, noindex, JSON-LD Restaurant.
- Build OK (`scripts/q.sh build pnpm build:site sites/le-brunchist-awwwards`). Mesures 1440/1280/1024/390 : aucun débordement, h1 et CTA du hero dans le viewport.

## Reste (phases 2 et 3)
- Phase 2 : pilote du cadran (`src/motion/setup.ts` est un squelette vide) : heure, disque en clip-path, règle d'heures, respiration au repos, reveals, état « ouvert » calculé depuis `jours`.
- Phase 3 : QA navigateur, shoot/audit, OG (`public/og.png` absent : balise og:image pointe dessus), favicon-32/apple-touch non faits (SVG seulement), RAPPORT.md, checklist 42 à 63.
- Vérifier le SplitText/data-reveal : aucun attribut posé en phase 1.

## Décisions
- Aucune photo (aucune fournie ; stock écarté) : compositions typographiques et disque CSS. Pas de loader, pas de GL.
- Prix, descriptions et classement par moment illustratifs (`placeholder: true`), signalés sur la carte. Aucun e-mail, aucun avis, aucune note.
- Réservation : tel + réseaux, mention honnête que les sources divergent. Pas de formulaire.
- Source des faits douteux : horaires (9 h 30 à 15 h 30 retenus), adresse (place d'Armes) et téléphone récents ; rue des Brasseurs citée comme ancienne adresse (namur.top 2023).
- Serveur de mesure sur le port 4400 arrêté en fin de phase.
