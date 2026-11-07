# ETAT · l-essentiel · legacy · fin de la phase 1 (construction-1)

## Fait
- Audit (`AUDIT.md`, `.hallmark/before.*`), approche conservée, deal/draw/scaffold/stamp (Vellum parchment, draw 109d8c), comps c1/c2 (`comp.md`), `DESIGN.md`, entrée dans `.hallmark/log.json`.
- Contenu dans `src/data/site.ts` (tout vient du dossier ; rien d’inventé). Photos converties en WebP dans `public/photos/`.
- Pages : /, /les-chambres/, /carte-menus/, /reservation/, /contact/, /recrutement/, 404. Nav, Footer (index columns), Fig, Horaires. Switcher carte/menus avec script minimal.
- `pnpm build:site` passe (`dist/l-essentiel/legacy/`), noindex, mention et pied KYW vérifiés sur les 7 pages. Rendu vérifié à la main sur l’accueil et la carte (1440 px), accueil 390 px mesuré sans débordement horizontal.

## Reste (phases 2 et 3)
- Phase 2 : barre fine qui se rétracte, un reveal, états des boutons et des formulaires (`data-endpoint=""`), jour courant dans le Schedule, fibre (texture) sur les bandes paper-2, trois questions de reproduction du comp, mobile 375 réel.
- Phase 3 : sloplint --render, gates § 5, revue, RAPPORT.md, case sloplint du DESIGN.md, `pnpm index`.
- Pas de vérif visuelle des sections sous le fold ni des autres pages (images lazy non chargées sur la capture pleine page).

## Décisions et hypothèses
- Vellum parchment : blackletter jugé tenable car tannerie = métier ancien ; ultramarine = l’unique pigment, non issu de la marque (logo noir, accent orangé d’origine abandonné).
- Logo : PNG 300 px à tracé clair inutilisable sur parchemin, mot-symbole en Grenze Gotisch ; à remplacer par un vectoriel du client.
- Routes : /carte-menus/ (origine /carte-menus-2/), /recrutement/ (origine /actualites/). « Réserver une chambre » garde /contact-2/ du site d’origine.
- Distinctions : 1 étoile Michelin (date discordante, non indiquée) et 16,5/20 Gault&Millau 2024 (DH, 27/11/2023) repris du dossier. À vérifier : chef Raphaël Adam non cité ; note Google non reprise ; photos de plats de 2018.
- Texte « La terrasse » : seule donnée disponible « vue sur les jardins », reformulée « Elle ouvre sur les jardins ». Phrase d’accroche reprise sans les points de suspension (reworded, gate 63).
- Placeholders : aucun fait fictif ; deux notes de formulaire `data-placeholder="true"` (envoi non branché).
- Espaces insécables : `~` des données et pages remplacés par U+00A0 par script Python.
