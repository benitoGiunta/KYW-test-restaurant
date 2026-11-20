# ETAT, epices-et-nous-portfolio (construction-1 faite)

## Fait
- Gabarit Velours copié (sans node_modules/dist), package renommé, `pnpm install` ok.
- Jetons brun café / orange épice, favicon, OG, 19 photos WebP (hero, chapitres, espaces, galerie N&B, plats, histoire) dans `public/photos/`.
- `src/data/site.ts` réécrit depuis `donnees.json` / `dossier.md` : carte complète, menu 3 services (2 propositions par service), horaires, guides, chiffres prouvés. Aucun placeholder.
- Pages : accueil, menu, carte (détaillée), maison (remplace privatisation), histoire, réservation, 404. En-tête, pied de page (+ KywFooter), JSON-LD sans geo.
- Build : `scripts/q.sh epn-build node scripts/build-site.mjs sites/epices-et-nous-portfolio` ok (7 pages), meta noindex et mention KYW présentes.
- DESIGN.md (matrice, décisions, adéquation).

## Reste (phases 2 et 3)
- QA navigateur : captures 1440/390, débordements (nom « ÉPICES & NOUS » en 390, `.carte`, `.menu__desc` à deux options), contraste du voile du hero sur la photo de table, clics d'en-tête, bas de page.
- Animations : rideau, compteurs, citation allumée, onglets : non touchés, hérités du gabarit, à vérifier avec les nouveaux textes (`data-compteur` 1999).
- Galerie : classes `haute/basse/moyenne` du gabarit, ratios des nouvelles photos à contrôler.
- `dist/` non commité par cet agent (pas de commit demandé). `pnpm index` à lancer en fin de restaurant.

## Pièges et décisions
- **23 photos de Les Potes au Feu restent dans `public/photos/`** (et donc dans `dist/`) : `rm` refusé par le contrôle de sécurité. À supprimer (tout sauf les 19 fichiers référencés dans `site.ts` + `og.jpg`), puis rebuild. Aucun n'est référencé.
- `gabarits/UTILISATION.md` non modifié (consigne : ne jamais toucher gabarits/) : ajouter `velours | epices-et-nous`.
- Hypothèses : citation = « Maison familiale aux saveurs épicées » (description G&M du dossier, sans date) ; Michelin = « Restaurant recommandé », sans année ; 1999 pris comme année d'ouverture (« Depuis 1999 » du site) ; menu 52 € sans créneau annoncé (non prouvé) ; fromage 9 € / 17 € du dossier ; carte non datée, mention « Boissons et vins : informations à demander au restaurant » sur la carte (prudente, à retirer si jugée inventée) ; terrasse illustrée par la façade (alt explicite).
- Pas d'e-mail, pas de GPS : lien « Itinéraire » par recherche d'adresse OpenStreetMap.
