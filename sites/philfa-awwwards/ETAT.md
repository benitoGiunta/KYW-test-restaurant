# ETAT : philfa-awwwards, construction-1 (phase 1 sur 3)

## Fait
- DESIGN.md : brief, trois concepts notés, Concept Card, système, checklist 1 à 18 cochée avec preuves.
- Contenu : `src/data/site.ts`, `src/data/carte.json` (24 plats réels, généré de donnees.json), `src/lib/photos.ts` (11 photos du client).
- Engine copié verbatim de sanga-awwwards (`src/engine/*.ts`, `engine.css`, `lib/url.ts`) ; `motion/setup.ts` = transition deux volets roses seulement.
- Pages : `/`, `/carte/`, `/histoire/`, `/reservation/`, `/404` ; Base (head complet, JSON-LD Restaurant, noindex), Header, Footer + KywFooter.
- Polices Archivo (variable largeur+graisse) et Newsreader en local. Favicon, apple-touch, og.png générés (PIL, police système).
- Build OK (`dist/philfa/awwwards/`). Mesures Playwright à 1440, 1280, 1024 et 390 : pas de débordement, pas de requête échouée.

## Reste (phases 2 et 3)
- Phase 2 : entrées (`data-split`/`data-reveal` toujours avec `data-intro`), la couture qui s'ouvre au hero et respire au repos, choix éclairant sa moitié dans `Menu.astro`, transitions testées, `idle.ts`, hovers des plats.
- Phase 3 : QA navigateur, audit, jury, OG raffinée (Archivo), `RAPPORT.md`, points 42 à 63 de la checklist.
- Captures à relire : pages carte, histoire, réservation, 404 et bas d'accueil n'ont pas été vues (seulement mesurées).

## Décisions et pièges
- Aucun loader, aucun GL (justifié dans DESIGN.md). Header sans menu JS : la nav tient en une ligne (« L'histoire » masqué sous 52 rem, présent dans le pied).
- Hero et pied : `.display` à `left: 0` mesuré (conteneurs pleine largeur, le texte est calé sur la couture) : faux positif du contrôle de gutter.
- Placeholders : aucun plat fictif. Textes d'histoire (recit) = paraphrase de dossier.md ; « on y vient pour une cuisine de brasserie qui suit les saisons » vient de philfa.be.
- Données douteuses : téléphone du site écrit « +32 081 226 111 » (nous : +32 81 22 61 11) ; note G&M 2025 « à confirmer » pour le millésime 2027 (non repris) ; avis non vérifiés (non repris) ; e-mail inconnu (aucun mailto).
- Photo 09 (façade, 400 px) non utilisée. Aucune photo de plat.
