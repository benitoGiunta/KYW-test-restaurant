# ETAT : le-ponti-2 legacy (phase 1 sur 3)

## Fait
- Audit (AUDIT.md), DESIGN.md, comp.md, deal Solstice, draw 781aef, scaffold, stamp, 2 comps.
- Contenu : src/data/site.ts + carte.json (99 lignes réelles, rien d'inventé, aucun placeholder).
- Pages : /, /menu/, /contact/, 404 ; Nav masthead, Footer index columns, Horaires, Lieu, Reserve, Fig.
- Photos du client en WebP (public/photos). Build vert ; noindex, mention KYW et kyw-signature présents sur les 4 pages. sloplint --render propre.

## Reste
- Phase 2 : menu mobile (popover), nav sticky, jour courant dans Horaires (`data-jour` déjà posé), ouvert/fermé, un reveal, index de la carte collant, survols.
- Phase 3 : QA navigateur (5 largeurs), revue finish, hallmark Sweep, RAPPORT.md, `pnpm index`.
- Photos : seulement 4 usables ; sept rubriques de la carte sont typographiques (chiffre en Yeseva).

## Décisions
- Accent = bordeaux du client (#701f2b lu dans site-actuel/page.html) à la place du vermillon de Solstice. Le logo PNG est blanc sur transparent : nom en Yeseva dans la nav.
- FR seul ; EN/NL non fournis. Réservation = lien Barestho existant ; téléphone 081 30 40 75. E-mail du site repris.
- Itinéraire : lien Google Maps construit sur les coordonnées GPS du dossier.
- 404 non lintée (le serveur de dev répond 404 HTTP). Gate 8 non déclenchée, pas de waiver.
