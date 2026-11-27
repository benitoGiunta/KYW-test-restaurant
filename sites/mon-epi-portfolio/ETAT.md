# ETAT mon-epi-portfolio, phase 3 sur 3 faite (QA corrigée, build OK) ; reste revue, index, publication par la session mère

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

## Phase 2 (construction-2) : fait
- Signature : bande « Au fournil » = lignes manuscrites tracées (déjà là) + point d'encre vert (`.plume`, aria-hidden) qui suit la pointe de chaque ligne, tracé accéléré (0,8 au lieu de 1,1) ; tampon posé à la fin du tracé.
- Tampon d'ouverture : `prochainMidi` lit maintenant la date et l'heure à Bruxelles (Intl, `formatToParts`), plus le fuseau du visiteur ; testé avec `page.clock` en fuseau Los Angeles : ven. 10 h = « vendredi 27 novembre », ven. 19 h et samedi = « vendredi 4 décembre ».
- Titres de section : trait de marqueur jaune qui se tire sous le h2 (`--trait` 0 → 1, une fois, ScrollTrigger) ; statique à 1 sans JS et en reduced motion.
- États : `:active` (btn, cellules d'en-tête) ; hover/focus du gabarit gardés (focus visible vérifié à la tabulation : 9 arrêts, outline présent).
- Mobile : `.feuille` en `minmax(0, 1fr)` (la bande « Au fournil » faisait 411 px de large à 320-390 : tampon et manuscrit coupés), `.jour__ligne` idem ; tampon autorisé à passer à la ligne sous 600 px. Contrôle `scrollWidth` + `right` de chaque élément à 320, 360, 390, 768, 1440 sur les 7 pages : plus de débordement réel (les `right` > largeur restants sont des polaroids/timbres inclinés, ≤ 12 px, dans le `scrollWidth`).
- Reduced motion (390) : aucun texte caché (seuls les liens du menu mobile fermé le sont), pas de plume, tampon visible, tracé complet, trait = 1, loader absent.
- Menu mobile : burger 75 × 56 px, 7 liens de 64 px, Escape ferme, défilement bloqué, aria-expanded juste.
- En-tête 1440 : clics réels sur les liens OK (le loader dure ≤ 2,6 s : attendre 3 s avant de cliquer) ; pied (bande KYW, mention « Maquette KYW… », logo) visible en bas de /commander/.
- Console : aucune erreur ni pageerror sur 7 pages × 5 largeurs. Build OK (7 pages).

## Reste (phase 3 et captures)
- Shoot complet + audit axe + sloplint par l'agent « captures » ; contraste du vert épi sur kraft et sur boutons à lire dans son rapport.
- RAPPORT.md (placeholders : aucun), `pnpm index` non lancé (dist/index.html partagé, laissé à la session mère), pas de publication.
- Non traité : `.equipe` à une seule fiche (rendu correct en capture mobile, grille desktop à voir), `.formules` à 5 cartes sur points-de-vente.

## Phase 3 (QA) : fait
- Débordement horizontal mobile corrigé (html overflow-x clip, tampon), vérifié à 320 px sur 6 pages. Phrases répétées de points-de-vente retirées. Build OK. RAPPORT.md écrit. Restent : survol couleur seule, contrastes non calculables, pnpm index, publication.
