# ETAT : makimono-legacy (fin de la phase 1 sur 3)

## Fait
- Audit (`AUDIT.md`, `.hallmark/before.txt`), approche conservée (Photographic, one-page, Poster), deal Halftone 1/3, draw 8e190a, scaffold, stamp, comp (2 comps, c1 choisie), `DESIGN.md`, `comp.md`.
- Contenu : `src/data/site.ts` + `carte.json` (copie de la carte transcrite par la recherche, lue seule depuis le portfolio ; apostrophes typographiques par `ap()`).
- Pages : `/` (Hero, Carte, Photos, Composer, Boxes, Livraison et événement, Horaires et adresse, Pied) et `/404`. Photos WebP (1600 et 800) dans `public/photos/`.
- Switcher de la carte (script inline minimal dans `Base.astro`, sans lui tout est visible), nav mobile par `popover`.
- Build : `pnpm build:site sites/makimono-legacy` passe (2 pages) ; sloplint `--render --url` sur page.css : 0 FAIL, 0 REFLEX. KywFooter et noindex présents sur `/` et `/404`.

## Reste (phase 2 et 3)
- Phase 2 : un reveal (IntersectionObserver, visible par défaut, `prefers-reduced-motion`), lien de nav actif, jour courant dans les horaires, finitions des états de contrôle (focus visible mesuré), vérification 375 et 1920, hauteur des tuiles du bento, trame de points.
- Phase 3 : `sloplint --kept` sur les mêmes cibles que `--before` (WARN « not compared » en attente), RAPPORT.md, revue des gates jugées (§ 5), entrée finale du journal, QA navigateur.

## Décisions et hypothèses
- Pas de réservation de table connue : l'action « book » devient « Commander en ligne » (`https://makimono.be/online_order/fr/order/`, lien du site d'origine). Autres outils (Deliverect, Ordering Club, Uber Eats) non repris faute de choix.
- Hero Poster gardé malgré le draw (Index) : l'original ouvre sur la photo. Titre « Des uramaki créatifs, faits avec amour » = traduction de la baseline anglaise, qui devient le mot du pied (reworded noté).
- Téléphone du site (+32 483 03 88 47) gardé ; celui de restaurants.json (+32 495 90 82 74) non repris, à confirmer. `wtai:` converti en `tel:`.
- Carte : « Korean Futo » 10,50 ou 11,00 € à confirmer ; la mention interne est retirée du texte affiché, le prix affiché reste « 10,50 à 11,00 € » tel que transcrit. Edamame et Wakame (4,50 € chacun) : alignement à confirmer.
- Dropped (au stamp) : #blog, #team, lightbox et liens images/portfolio/N.jpg (photos montrées en figures), modale de recrutement #promotie (image absente, texte en commentaire). Photos du client non utilisées : 01, 02, 03, 07, 08, 10, 11, 16.
- Aucune donnée fictive, aucun `.fill`. Pas de note ni d'avis affichés (46a). E-mail `contact.makimono@gmail.com` du site actuel, pas l'ancien Miss Maki.

## Pièges
- `capture.mjs` écrit toujours `screen-home-desktop.png` : renommer entre deux comps.
- sloplint sur un fichier `dist/` local sous `base` rend sans CSS (chemins absolus) : servir `dist` (`serve.mjs --port`) et passer `--url http://127.0.0.1:<port>/makimono/legacy/`.
- Waiver sloplint : trois champs (gate · garde · raison), sinon REJECTED.
- Les figures n'ont pas `data-slot` (la règle de base.css masque alors la légende).
