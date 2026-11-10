# ETAT · Sanga · variante awwwards · construction-1 (phase 1)

## Fait
- Brief, trois concepts notés, Concept Card, système (palette, typo, grille, plan de composition) : `DESIGN.md` (§ Sur-utilisation points 1 à 18).
- Scaffold Astro 5 (`package.json`, `astro.config.mjs`, `tsconfig.json`), engine copié de le-royal-awwwards (`src/engine/*`, `engine.css`, sans GL), `Base.astro` (ClientRouter, JSON-LD Restaurant, OG, noindex, curtain), `Header`, `Footer` (+ `KywFooter`), `Horaires`, `Photo`.
- Contenu : `src/data/site.ts` (coordonnées, horaires, carte complète de 6 catégories, bouillons, avis réels, livraison). Aucun e-mail ni réseau (inconnus), aucune équipe ni histoire inventée.
- Pages : `/` (hero, énoncé, index des ramen, paire udon et teriyaki, venir), `/carte/` (sommaire + 6 biefs + photos en crête), `/a-propos/` (La maison : nom, bouillon, avis), `/reservation/` (tel, commande en ligne, horaires, adresse, livraison, paiement), 404 « Rien sur cette rive. ».
- Polices (4 fichiers, 2 préchargés), favicon SVG + PNG, `og.png` composée.
- Build : `scripts/q.sh sanga-build pnpm build:site sites/sanga-awwwards` passe (5 pages). Mesures 1440, 1280, 1024, 390 : pas de débordement (`scrollWidth` = largeur), aucun `.display` à moins de 16 px du bord, hero lisible et CTA visible au premier écran.

## Reste (phases 2 et 3)
- Phase 2 : mouvement. Signature « le fil de l'eau » (filet `scaleY` lié au scroll + sceau qui glisse), révélations `data-reveal`/`data-split` (aucun attribut posé pour l'instant : tout est visible), hover d'index avec aperçu photo, états de repos, transition (déjà posée : deux volets indigo, à régler).
- Phase 3 : QA navigateur, audit axe, LCP, clavier, survol, sloplint, jury (auto-notation `self`), RAPPORT.md, points 42 à 63.
- Vérifier le contraste du texte vermillon `#e8512f` sur indigo (4,6:1, limite AA) et le sceau de l'en-tête (kanji 1 rem sur vermillon).
- `pnpm index` exécuté après le build (voir commit).

## Décisions
- Pas de loader, pas de GL (voir Concept Card). Pas de curseur suiveur.
- Page « histoire » remplacée par `/a-propos/` titrée « La maison » : l'histoire réelle est inconnue, la page tient sur le nom, les bouillons et les avis réels.
- Photos 05 (vue de dessus, fond blanc) et 06 (edamame) non utilisées : aspect banque d'images, origine à confirmer. Aucune photo de salle : la composition typographique (kanji, crêtes) porte l'ambiance.
- Textes de plats nettoyés (doublons « Bouillon au choix », « des algues », fautes d'usage) ; à lister dans RAPPORT.md en phase 3. Libellés « Miso taste » remplacés par « Miso » (bouillon au choix en note de catégorie). Le sens des bouillons (pâte de soja fermentée, sel, sauce soja) est de la culture générale, pas une recette de la maison.
- Les avis affichés viennent de `donnees.json` (extraits datés) ; la note Google 4,6 sur 892 est reprise de Rankeat (4 mars 2026), signalée « non revérifiée ».
- Livraison : « gratuite » et seuils 25 et 35 € repris du site client.
- Horaires rendus une seule fois par page (pas dans le pied) pour éviter les WARN de phrases répétées.

## Pièges
- `--t-kanji` doit rester petit : à 34 vw le kanji de 2 caractères passait à la ligne (hauteur 882 px). Une pile verticale (`span` en `display: block`) est le parti pris du hero, horizontale sous 52 rem.
- `<picture>` d'astro:assets ne remplit pas un cadre `clip-path` sans `picture { display: block; height: 100% }`.
