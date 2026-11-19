# ETAT · pizzeria-doria legacy · construction-1 (phase 1 sur 3)

## Fait
- AUDIT.md (sloplint --before, 217 FAIL dont l'essentiel vient du CSS WordPress), DESIGN.md (Picks, approche, thème, composants, checklist), comp.md.
- Deal Squeeze (2/3), draw 6f9b68, scaffold, stamp en tête de `src/styles/page.css`.
- Contenu : `src/data/site.ts` + `src/data/carte.json` (carte complète de donnees.json, 181 lignes).
- Pages : `/` (9 blocs), `/menu/` (6 groupes en ancres), `/vins/`, `/contact/`, `404`. Composants : Base (nav slab, pied index columns, KywFooter), Fin (réservation, horaires en casiers, emploi), Rows.
- Photos WebP dans `public/photos/` (client : coffres, bouchons ; stock illustratif : pizza-coupe en hero, pâte ; friture, roquette, burrata, pizza-basilic convertis mais non utilisés).
- Build OK (`scripts/q.sh build pnpm build:site sites/pizzeria-doria-legacy`), noindex, mention KYW et signature vérifiés par grep sur les 5 pages.

## Reste (phases 2 et 3)
- Comps c1 et c2 non construites (budget) ; à faire ou à écarter en phase 2.
- Nav mobile (pas de popover : les liens wrappent), jour courant dans les casiers, un reveal, états des contrôles, QA navigateur (375, 1440), sloplint --render, axe.
- Utiliser ou supprimer les photos inutilisées (friture, roquette, burrata, pizza-basilic) ; hero en 1600x2400 est lourd, envisager un recadrage paysage.
- Vérifier le hero à 1280x800 (plaque + padding-top 40vh) et le contraste.
- Entrée du journal `.hallmark/log.json` ajoutée (phase 1).

## Décisions et hypothèses
- Squeeze retenu : vert de l'affiche de novembre et du logo ; écartés Vellum, Atelier.
- Shape du draw (Split Studio) échangée contre Photographic + Index pour garder one-page et routes.
- Hero : photo de stock (Unsplash, déjà sur le site d'origine) marquée `data-placeholder`, créditée dans le pied.
- Avis : 3 avis Tripadvisor d'origine repris mot pour mot (orthographe de « Roam63401968725 » conservée, ponctuation « Bel endroit, simple » espacée) ; le 4e (plainte sur le prix sur place) n'est pas repris, ligne `dropped`. À vérifier avec le client (dates 2023).
- Horaires du site : dimanche et jours fériés soir seulement ; mardi, mercredi fermés ; note cuisine reprise.
- Pas de formulaire de réservation : le téléphone est l'action (outil « Réserver une table » inconnu).
- Liens Bancontact (stores) abandonnés (`dropped`), offre d'emploi : « Postuler » devient un mailto.
- Descriptions de plats : « - » remplacé par des virgules (gate 63), minuscules après la première.
