# ETAT · dolce-vita-wepion · legacy · fin de la phase 1 (construction-1)

## Fait
- Audit (`AUDIT.md`, `.hallmark/before.txt`), approche, deal 2/3 Spore, draw 1646b9, scaffold, stamp, comps c1/c2 (c1 choisi, `comp.md`), `DESIGN.md` (Picks, Approche, Thème, Composants, Sur-utilisation 1 à 8).
- Pages : `/` (Poster, 8 sections), `/carte/` (86 plats en Rows, index de catégories, 4 photos), `/la-dolce-vita/`, `/infos/` (Counter), `404`. Composants Nav, Fig, Fin (Schedule midi/soir), Footer (mast), KywFooter partout.
- Données : `src/data/site.ts`, `carte.json` (tiré de donnees.json), `photos.json` (14 photos en WebP 1600 et 800, alt = `sujet`).
- Build passe (`scripts/q.sh build pnpm build:site sites/dolce-vita-wepion-legacy` → `dist/dolce-vita-wepion/legacy/`), `sloplint src --genre atmospheric` : 0 FAIL, 3 WARN 49 (faux positifs, `.btn` est `nowrap`). Noindex, mention et pied KYW vérifiés sur les 5 routes.

## Reste (phases 2 et 3)
- Phase 2 : nav en barre qui se rétracte et menu Popover mobile, un reveal, états « ouvert » et « ce soir » depuis les horaires (`data-jour` déjà posé, tester avec `page.clock`), états hover/focus à vérifier, QA navigateur 1440/1024/390 (rien vu en rendu : mesures de débordement, `scrollWidth`, h1 et plaque du hero à 1280×800), photo 14 (607 px) à contrôler, trois questions de reproduction de `comp.md`, `sloplint --render` (root : `chrome-nosandbox.sh`).
- Phase 3 : sweep, gates jugées § 5, `RAPPORT.md`, entrée de log finale, `pnpm index`, commit de `dist/index.html`.

## Décisions et hypothèses
- Accent Spore remplacé par la terracotta du client (#b4523e lu sur la capture, foncée pour 4,5:1).
- Pages légales, espace patron, bandeau cookies et carte OSM non reproduits (`dropped`, aucune donnée) ; lien d'itinéraire Google Maps direct.
- Fermeture exceptionnelle du 26 au 29 octobre : passée, non reprise (`fermetureExceptionnelle: null`).
- Suppléments (pizza 1 €, spéciaux 3 €, burrata 4 €, accompagnement 3 €, sauces 3,50 €) repris du dossier.
- À faire vérifier : les 3 avis Google (mot pour mot, apostrophes typographiées), « 4,3 sur 5, plus de 500 avis » (affichage du site client), « depuis 2017 », Armando et Antigone (site client).
- Slots `.fill` : aucun. Photos de bibliothèque : aucune.
- Reworded : titre de /carte/ (gate 58), « Quand nous joindre » (gate 69), commentaires dans les `.astro`.
- Hors périmètre : `gabarits/` non touché.
