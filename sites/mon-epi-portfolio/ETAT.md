# ETAT mon-epi-portfolio, phase 1 sur 3 (construction)

## Fait
- Gabarit cahier copié (sans node_modules, dist, md), renommé « site-mon-epi-portfolio ».
- `src/data/site.ts` entièrement réécrit depuis donnees.json (identité, horaires, avis cités, valeurs) ; `carte.json` généré par script (29 lignes, prix et compositions).
- 7 pages : accueil, pains, farines, boulanger, commander, points-de-vente, 404 ; en-tête, pied, loader, plan adaptés ; JSON-LD `Bakery`.
- 24 photos converties (WebP), OG et favicon refaits. DESIGN.md écrit.
- Build : `scripts/q.sh build node scripts/build-site.mjs sites/mon-epi-portfolio` passe, 7 pages dans `dist/mon-epi/portfolio/`. Aucun shoot ni QA navigateur (hors phase).

## Reste (phases 2 et 3)
- QA navigateur : débordements 320 à 390 px, annotations longues du sommaire (composition entière) en mobile, mur de 6 timbres, fiche unique de l'équipe, tampon d'ouverture (calcul `prochainMidi`, 18 h, test `page.clock`).
- Contraste du vert épi sur kraft et sur boutons ; hover/focus.
- Vérifier `.equipe` avec une seule fiche (grille), `.formules` à 5 cartes sur points-de-vente.
- RAPPORT.md, audit, sloplint, 404 dans dist (présente).
- `pnpm index` non lancé (phase 1) ; pas de publication.

## Décisions et hypothèses
- Boulangerie : pas de réservation de table, « Commander » = téléphone (le site actuel le dit).
- Nom affiché « Monepi » (enseigne du logo), pas « Mon Épi ».
- Horaires : seul le vendredi 9 h à 18 h est publié ; autres jours « à confirmer », hors schema.org.
- Aucun `placeholder: true` : rien d'inventé (avis = extraits de monepi.be avec auteur et source ; pas d'e-mail, pas de quiches, pas de portrait).
- Taux d'extraction « environ 65 à 80 % » repris du dossier tel quel.
- Four : année non citée (2000 ou 2002 selon le site).

## Pièges
- `gabarits/` protégé : `gabarits/UTILISATION.md` à mettre à jour (cahier → mon-epi) par la session mère.
- `cahier.ts` : constante `prochainMidi` sert aujourd'hui l'ouverture du vendredi (nom conservé).
