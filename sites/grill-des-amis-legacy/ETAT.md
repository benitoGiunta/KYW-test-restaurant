# ETAT · grill-des-amis · variante legacy · fin de la phase 1 (construction-1)

## Fait
- Audit (`AUDIT.md`), approche gardée (Photographic, hero Poster), deal/draw/scaffold/stamp, deux comps (`comp.md`), `DESIGN.md` (Picks, Approche, Thème, Composants, Sur-utilisation), entrée du journal partagé.
- Paquet Astro complet : `Base.astro` (noindex, JSON-LD, polices, `hallmarkSlots`, KywFooter), composants Nav (slab), Fig, Plats, Horaires, Footer (letter close) ; 8 pages : accueil, carte, viandes, a-propos, traiteur, reserver, contact, 404.
- Données réelles dans `src/data/site.ts` et `carte.json` (carte complète du 14/10/2026) ; 12 photos du client en WebP dans `public/photos/`.
- Build passe : `scripts/q.sh build pnpm build:site sites/grill-des-amis-legacy` → `dist/grill-des-amis/legacy/` (noindex, mention et signature KYW vérifiés sur les 8 pages). sloplint accueil : 0 FAIL, 0 REFLEX.

## Reste (phase 2 et 3)
- REFLEX ouverts sur les pages intérieures (sloplint à 1440) : 44c « hero text ends N px short of its visual » (viandes, a-propos, reserver, contact : rapprocher texte et visuel à 48-120 px, colonne de texte plus large) ; 44c carte (hero finit à 950 px) ; 71 `h3.row__t` de a-propos (espace dessus au moins double du dessous) ; 77 sections minces (« Le midi » de la carte, « Venez partager » de a-propos, « De la conception » de traiteur) ; 79 traiteur (202 px vides sous le hero). Ou `waive` avec raison.
- Relancer sloplint sur l'accueil après le remplacement de la photo du showcase (verres).
- Phase 2 : nav mobile (popover ou `details` actuel à valider 320 à 375 px), états des boutons, un reveal au plus (aucun pour Darkroom), `prefers-reduced-motion`, jour courant, mesure du hero à 320x568.
- Phase 3 : QA navigateur, contraste mesuré (stamp « to measure »), `RAPPORT.md`, hero review `self`, `pnpm index` puis publication (non fait : site incomplet).
- Le logo client (`logo.webp`, losange et nom) est petit sur la barre (2,5 rem) : vérifier lisibilité et fond transparent.

## Décisions et hypothèses
- Darkroom colourway rouge ; photos gardées en couleur (waive d'imagerie documenté dans `DESIGN.md` et `page.css`).
- Draw 5306cc : slab et letter close pris ; Feature Stack et Stage refusés pour garder Photographic et Poster (`waive 8`). Le draw excluait Statement et Split : aucun des deux utilisé.
- Photo `03-salle-vue-comptoir` : pixels pivotés de 90 degrés dans le fichier source, non utilisée. `15-patrons-tabliers` non utilisée (identité à confirmer).
- Horaires : lundi, jeudi, vendredi, samedi (site) ; mardi, mercredi, dimanche « Fermé » déduit, à confirmer. Pas d'e-mail, pas de réseaux, pas d'avis : rien affiché.
- Réservation : lien externe Wix conservé (`https://www.legrilldesamis.be/reserver`) et `tel:+3281617260` ; aucune donnée fictive, aucun `.fill`.
- Retirés (lignes `dropped` dans `page.css`) : actualités, événements, connexion, panier, médaillons, marquee, témoignages Wix, formulaire d'inscription, galeries /terrasse et /plats ; PDF de la carte non repris (contient « Votre texte de paragraphe »).
- Menu Viandard : le tarif « 59 € le jeudredi soir » n'est pas repris (coquille de la carte).
