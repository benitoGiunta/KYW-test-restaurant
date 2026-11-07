# ETAT · l-essentiel · legacy · fin de la phase 2 (construction-2)

## Fait (phase 2)
- Nav : en-tête sticky, barre fine qui se rétracte (CSS pur), « Réserver » outlined, menu `<dialog>` modal sous 60rem (script `src/scripts/ui.ts`), repli sans script.
- Boutons à états (repos, survol, focus, actif, désactivé), un seul primaire rempli par page.
- Formulaires réservation et contact : composant `Field.astro`, validation blur puis input, jours fermés refusés, aide des couverts, message « Rien n’a été envoyé » ; `data-endpoint=""`.
- Switcher carte/menus : masqué sans script, flèches avec script. Horaires : jour courant marqué (`aria-current="date"`).
- Motion : thème still, donc aucun reveal (`waive` écrit dans DESIGN.md) ; le comptoir se pose en 420 ms ; reduced motion couvert. Fibre SVG sur bandes, formulaire, comptoir, en-tête.
- Mobile : photo du hero ne déborde plus à 375 ; aucun débordement à 375, 768, 1024 sur 6 pages ; cibles tactiles (liens des pieds et adresses) à 44 px en `pointer: coarse`.
- Hero review en auto-notation (`self`, aucun outil Agent) ; sloplint `--stage hero --render` : 0 FAIL, 0 REFLEX, 0 WARN. Questions de reproduction du comp : `comp.md`.
- `pnpm build:site` passe ; noindex, mention et pied KYW vérifiés sur les 7 pages. Pas de shoot complet (agent « captures »).

## Reste (phase 3)
- sloplint complet (`--render` sur chaque route), gates § 5, revue, `RAPPORT.md`, entrée du journal par `theme.mjs log`, `pnpm index`, publication.
- Captures : l’agent « captures » doit défiler à la molette (aucun reveal, mais images lazy) ; les panneaux de la carte : cliquer l’onglet « La carte » pour voir le second.
- Vérifier au rendu : contraste de `--color-error` sur le fond papier-2 du formulaire (annoncé ≥ 4,5:1, non mesuré), barre fine à 375 (téléphone, Facebook, Instagram en une ligne).

## Pièges
- sloplint règle 34 ne lit pas `base.css` importé : `html`/`body` en `overflow-x: clip` aussi dans un `<style is:global>` de `Base.astro` (doublon voulu). `q.sh` n’affiche que 20 lignes : relire `.logs/*.log` par `grep` pour ne pas manquer un FAIL en tête.
- Les comps `c1.html`/`c2.html` rendent le même PNG ; le fichier c1 est en miroir du build (voir comp.md).
- Aucune donnée inventée en phase 2 : les textes de formulaire sont des formats, des aides ou des faits du dossier (jours fermés, plus de six couverts : menu uniquement).
