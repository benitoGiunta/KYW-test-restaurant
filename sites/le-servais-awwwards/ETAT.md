# ETAT : Le Servais, variante awwwards (fin de la phase 1 sur 3)

## Fait
- Brief, 3 concepts notés, Concept Card « La Ligne » (câble de téléphérique, stations = heures réelles), système complet et checklist 1 à 18 : `DESIGN.md`.
- Scaffold Astro 5 + engine copié de le-royal-awwwards (inchangé), polices Big Shoulders Display + Hanken Grotesk (2 fichiers), tokens, layout (head complet, JSON-LD Restaurant sans geo ni avis), en-tête, pied (`KywFooter` en dernier).
- Contenu réel : `src/data/site.ts` + `src/data/carte.json` (76 lignes tirées de donnees.json par script, prix en euros français).
- 5 pages statiques : `/`, `/carte/`, `/histoire/`, `/reservation/`, 404 « Terminus ». Mise en page complète sans JS de motion.
- Build OK : `scripts/q.sh build pnpm build:site sites/le-servais-awwwards` (5 pages, `dist/le-servais/awwwards/`).
- Mesures Playwright : h1, CTA, photo du hero à 1440x900, 1280x720, 1024x768, 390x844 ; `.display` left >= gouttière ; `scrollWidth` = largeur à 320, 360, 390 sur les 5 pages.

## Reste (phases 2 et 3)
- Phase 2 : signature (cabine sur le câble, scrub de progression + balancement au repos), `data-split`/`data-reveal` sur titres et blocs (le pied porte déjà `data-split`), aperçu au curseur et vignettes tactiles de la carte, état « ouvert maintenant » calculé (Europe/Brussels), hover plats/images.
- Phase 3 : OG composée (`public/og.png` manquant, référencé par `Base.astro`), QA navigateur complète (shoot, audit, axe, reduced motion, focus), RAPPORT.md, sloplint, `pnpm index`, leçons.
- Les 5 photos sont des JPG sources ; vérifier le LCP du hero (`fetchpriority="high"` déjà posé) et le poids de `_astro/`.

## Décisions et hypothèses
- Pas de loader, pas de GL (justifié dans la Concept Card). Pas d'équipe, de chef, d'avis, de note Google : inconnus, absents.
- Téléphone 081 73 65 52 (site, Namur Tourisme) ; l'autre numéro du dossier (+32492938796) est à confirmer.
- Photo 05 (salle végétalisée) : origine douteuse (préfixe Wix 11062b), servie avec la légende « Photo illustrative, origine à confirmer » (`placeholder`). Aucun élément fictif de contenu autrement.
- Margarita 25 € : prix ambigu dans le PDF, affiché « (à confirmer) ».
- Les menus Bar (cocktails, bières, café) sont des extraits : la mention est portée par la note de rayon.
- Aucun GPS : le plan est un lien de recherche OpenStreetMap sur l'adresse.
- Page « Histoire » limitée aux faits du dossier (ouverture mai 2025, RTBF, producteurs).

## Pièges
- SplitText : le h1 en `calc(100vw / n)` doit tenir compte de la largeur réelle du mot de 8 lettres (3,8 em) : `scrollWidth` > largeur sans qu'aucun `getBoundingClientRect` ne dépasse (texte qui déborde de sa boîte).
- Serveur de test : `node .claude/skills/awwwards/scripts/serve.mjs dist --port 4400` (arrêté, PID tué).
