# ETAT · ferme-blanche-d-asie · legacy · construction-1 (09/11/2026)

## Fait
- Audit (`AUDIT.md`, `.hallmark/before.txt`), deal Spore 1/3 (colourway head-torch, ocre = jaune d’origine), draw 03eb15 (shape Letter échangée contre Photographic), scaffold, stamp, comps c1/c2 (`comp.md`, c1 retenue), `DESIGN.md` (Picks, Approche, Thème, Composants, Sur-utilisation 1 à 6).
- Données : `src/data/site.ts` (+ `donnees.json`) : carte de 56 plats nettoyée (apostrophes, « Bœuf », nom tronqué « nid d’hirondelle » commenté `reworded`), horaires, menus de fêtes transcrits, avis Resto.be mot pour mot.
- Pages (6) : `/` (hero Poster, offre 29 €, salle plein cadre, carte, salles privées, avis, horaires), `/menu` (onglets, menus de fêtes), `/reserve`, `/photos`, `/contact`, `404`. KywFooter, noindex et mention présents sur les 6 pages (grep).
- Photos : 10 WebP recadrés sous le filigrane (800 et 1400) ; `parking-*` produit mais non utilisé.
- Build : `pnpm build:site sites/ferme-blanche-d-asie-legacy` passe (exit 0), `sloplint src/styles/page.css` 0 FAIL, 0 WARN réel.

## Reste (phases 2 et 3)
- Phase 2 : nav mobile (menu `popover`, pour l’instant deux rangées statiques sous 60rem), un reveal CSS/IntersectionObserver au plus, états des contrôles, QA navigateur (375, 1440, 1920), contrôles 44 px, `--render --kept` sloplint (faux FAIL 34 possible : doubler `overflow-x: clip` ; waiver 59 probable).
- Phase 3 : sweep, jugées gates § 5, RAPPORT.md, `preflight.json`, `index` (`pnpm index`), publication.

## Décisions et hypothèses
- Réservation : téléphone ou sur place seulement (comme l’original) ; aucun formulaire inventé.
- « -10 % » affiché « −10 % » (signe moins) ; plat « Potage crème nid d » complété en « nid d’hirondelle » (écrit ainsi dans le menu de Noël).
- Avis : deux extraits de Resto.be et Trouve Ton Resto repris mot pour mot, sans note ni nombre d’avis (non affichés par le site client) ; à faire valider.
- Photo `10-table-ronde` légendée neutre : rien ne prouve que ce soit la salle V.I.P. Filigrane « Find Your Place » recadré mais crédité en pied : droits des photos à vérifier avec le client.
- Aucun fait fictif ; aucun `.fill` ni `data-placeholder` (horaires, tél. et adresse sont réels).
- Pièges : `sites/ferme-blanche-d-asie-awwwards` non suivi par git (autre agent) : ne pas l’ajouter ; `pnpm-lock.yaml` modifié hors de ce chantier : non commité.
