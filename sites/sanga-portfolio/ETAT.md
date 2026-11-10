# ETAT : sanga-portfolio, fin de la phase 1 (construction)

## Fait
- Gabarit encre copié, adapté ; `scripts/q.sh build node scripts/build-site.mjs sites/sanga-portfolio` : OK (5 pages).
- `src/data/site.ts` : carte complète du dossier (30 lignes avec prix), horaires, adresse, téléphone, livraison, paiement, avis.
- Pages : `/` (hero, concept, Rouleau 12 plats réels, bouillons, commander, galerie, venir), `/carte/`, `/maison/`,
  `/commander/` (remplace réservation et emporter), `/404`. Anciennes pages histoire, reservation, emporter supprimées.
- Photos : 6 plats en WebP (1800 max, variantes 960) dans `public/photos/` ; favicon S ; og.jpg ; DESIGN.md écrit.
- Contrôle statique de `dist/` : noindex, mention Maquette KYW, lang fr, aucun tiret cadratin, aucune trace du gabarit.

## Reste (phases 2 et 3)
- QA navigateur : shoot, audit, clics réels de l'en-tête à scrollY 0, capture du bas de page (pied KYW visible).
- Vérifier le Rouleau avec photos paysage (gyoza, teriyaki) dans le masque 400x500 ; hero clair sous voile (contraste du h1).
- Pages `/maison/` et `/commander/` : rythme, titres verticaux (`Les bouillons` etc.), mobile 390.
- Hauteur du Plan (schéma sans repères) à juger ; l'afficher ou non sur mobile.
- Photos libres (salle, façade) via photos.mjs si la revue l'exige, avec `placeholder: true` et crédit en colophon.
- RAPPORT.md, `pnpm index`, mise à jour de `gabarits/UTILISATION.md` (fait : sanga ajouté), push.

## Décisions et hypothèses
- encre retenu malgré un emploi antérieur (ferme-blanche-d-asie) : seul gabarit nommé pour ramen.
- Pas de réservation (aucun outil au dossier) : le sceau et le CTA mènent à `/commander/` (commande en ligne Order & Eat, téléphone).
- Pas d'histoire, d'équipe ni de repères de quartier inventés ; plan = rue seule. Itinéraire OSM par recherche d'adresse (GPS à confirmer).
- Avis : texte repris avec majuscule et accent corrigés (Takeaway : « a emporter »). Explications des bouillons = sens usuels (miso, sel, sauce soja).
- Zones de livraison reprises telles quelles du site ; le rayon de 6 km dès 35 € est affiché sous les cartes.
- Piège : `git rm --cached -r .` lancé par erreur à la racine, annulé aussitôt par `git reset` (index intact).
