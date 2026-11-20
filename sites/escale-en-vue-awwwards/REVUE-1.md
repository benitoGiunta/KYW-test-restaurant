# Revue awwwards · Escale en Vue ! · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une terrasse au-dessus de la vallée, où un soleil orange glisse sur le trait d'horizon de chaque page et descend avec le défilement (l'heure qui avance), sur fond bleu pâle et vert du soir, titres géants en Anybody.
Scores /10 :
- Design 7 : palette tenue (bleu pâle, vert sombre, orange), typographie forte, grille propre (home `d-01-hero.png`), mais grands vides en bas du héros et une home à 3 photos seulement.
- Usabilité 6 : 3 liens + CTA à 44 px, focus 3 px visible sur 14 Tab, 0 débordement ; mais la fin de saison n'apparaît pas dans le héros (F1-2).
- Créativité 7 : le soleil-horloge relie défilement, titre et heure (404 figée par `data-heure`) ; transition « panneau du soir » ; idée cohérente, mais peu de matière visuelle autour.
- Contenu 6 : faits conformes à `donnees.json` (adresse, tél., e-mail, 4 horaires, liens), transparence sur l'absence de carte et de prix ; une procédure inventée et deux détails géographiques absents du dossier.
- Technique 8 : build vert, 0 erreur console, 0 requête en échec, 0 débordement (5 pages x 1440/390), contraste canvas : 0 écart sur tous les nœuds texte, 0 texte caché en reduced-motion, CLS mobile 0,018 ; LCP mobile CPU x4 + 4G : 2368 ms (home), 2652 ms (carte).

Méthode : captures et audit de l'agent captures (`QA-revue1.md`, postérieures au dist 01:30, aucun `src/` plus récent) ; la « 404 » de `.shots-…/404/` est la réponse brute de `serve.mjs` (ignorée). Pages hors QA (a-propos, reservation, `404.html`) vues sur `rev1/planche-*` et mesurées par script maison : axe-core complet à 2 positions de défilement, contraste canvas 1x1 par nœud, débordement, console, requêtes, images, LCP/CLS CDP en 2 passes, reduced-motion, 14 Tab. Aucun finding ne contredit `DESIGN.md` (non lu).

## Findings

### F1 (majeurs)
- **F1-1 · T-invente · `src/pages/reservation.astro:14`** : « L'apéro planchette se prend sur place. » Le dossier ne donne aucune procédure pour la planchette (seulement « du jeudi soir au dimanche midi ») ; une procédure déduite est une invention (leçon commune). Preuve : `grep "sur place" dossier.md` ne trouve que « QR code sur place » (carte, menukaart). Correction : supprimer la phrase, ou « L'apéro planchette est servi du jeudi soir au dimanche midi. »
- **F1-2 · Usabilité/contenu · `index.astro` (héros) et `reservation.astro:14`** : saison 2026 terminée (dossier : « saison terminée »), mais le héros dit au présent « Du jeudi soir au dimanche après-midi » avec le CTA « Appeler le 0493 46 79 71 » ; l'info n'apparaît qu'en petit gris sous le tableau des horaires (`d-05`/`m-05`) et en 12 px sur la page réservation. Un visiteur appelle un restaurant fermé jusqu'à une date inconnue. Correction : ligne visible dans le héros (« Saison 2026 terminée, dates de la prochaine saison non communiquées ») et mise en tête du bloc de réservation ; verbes au passé ou « en saison ».

### F2 (mineurs)
- **F2-1 · T-invente · `src/data/site.ts:8` (description, reprise dans `<meta description>`, OG et JSON-LD), `site.ts:62`, `a-propos.astro:6`** : « vallée de la Meuse » et « colline de Dave » ne sont pas dans le dossier (« vallée » seulement ; « colline au fond » est la légende d'une autre photo). Correction : « au-dessus de la vallée » et « posés à Dave ».
- **F2-2 · Contenu · `site.ts` (équipe) / `a-propos` « Sur place »** : « Olivier Evrard, Titulaire de l'établissement » est rangé parmi Tables, Paiement, Parking (`a-propos_d-3.png`) alors que le dossier dit « rôle exact inconnu » (titulaire BCE). Correction : sortir la ligne de la grille « Sur place » ou l'étiqueter « Titulaire BCE » ; ne pas laisser croire à un portrait d'équipe.
- **F2-3 · Performance · `carte.astro:11`** : le chapeau (élément LCP) porte `data-reveal="up" data-intro data-delay="0.6"` : LCP mobile 2652 ms en deux passes identiques (home 2368 ms, a-propos 980 ms où le chapeau n'a pas de reveal). Correction : retirer `data-reveal`/`data-delay` du chapeau de carte (même traitement que a-propos), cible < 2,3 s.
- **F2-4 · Accessibilité · tous les gabarits** : axe complet signale `landmark-no-duplicate-contentinfo` (moderate) sur les 5 pages x 2 largeurs (pied du site + `kyw-footer`, deux `<footer>` de premier niveau) ; absent du QA (axe lancé sans ce contrôle). Correction : transformer le pied du site en `<div>` ou `<section aria-label>`, ou lui retirer le rôle `contentinfo`, en gardant `kyw-footer` intact.
- **F2-5 · Image · `src/assets/photos/bol-soleil.jpg` (382 x 510)** : source déclarée « faible résolution » (`photos/index.json`, qualité 3) affichée à 673 x 505 px sur la home (rangée « Sur la table ») = agrandissement x1,8, flou visible sur `d-03`/`d-04` ; la même photo sert aussi de vignette au « Plat du jour » (home et carte), alors qu'elle montre un bol-salade, pas le plat maison (parmigiana, tagliatelles). Correction : limiter son affichage à ≤ 382 px de large (cadre portrait), retirer la vignette du plat du jour ou la remplacer par la planchette.

### F3 (finitions)
- **F3-1** : pas de `robots.txt` dans `dist/` (WARN de l'audit réel ici ; `noindex, nofollow` est bien dans le `<head>`, conforme au prompt) ; ajouter un robots.txt `Disallow: /`.
- **F3-2** : h1 « Escale en vue ! » (v minuscule) contre le nom « Escale en Vue ! » partout ailleurs et dans les `<title>` (« Escale en Vue ») : harmoniser la casse du h1 ou le noter dans DESIGN.
- **F3-3** : répétitions : « Toutes les tables sont dehors / Tables en extérieur uniquement / Une alternative végé… » reviennent sur la home, le lieu et la réservation (3 formulations de la même donnée) ; en garder une par page.
- **F3-4** : cibles : lien-logo 29 px de haut, lien inline « page Facebook » 20 px sur `reservation/` (1 « petite cible » axe/QA) ; passer le logo à 44 px (zone cliquable) ; le lien inline est toléré.
- **F3-5** : héros desktop (`d-01-hero.png`) : ~110 px vides sous les CTA et la photo, colonne gauche vide sous les boutons ; ajuster la hauteur du héros pour que la prochaine section affleure.

## Ce qui est bien (à ne pas casser)
1. Le soleil-horloge : posé sur le trait d'horizon de chaque page, 404 figée, reduced-motion sans contenu caché (0 nœud à opacité 0), focus 3 px sur chaque arrêt de tabulation.
2. Honnêteté du contenu : aucune carte ni prix inventés, avis non rendus, « à confirmer » sur le parking et la liste des trappistes, horaires = affiche du site, JSON-LD `Restaurant` avec adresse et `openingHoursSpecification`.
3. Technique propre : 0 erreur, 0 lien mort (liens internes, tel, mailto, OSM, Facebook, Instagram, kyngroup), 0 écart de contraste mesuré, CLS 0,018, poids ~750 Ko, `noindex`, mention « Maquette KYW… » et un seul logo KYW sur chaque page.

## Mesures de référence
Liens : 11 distincts, tous au bon préfixe `/escale-en-vue/awwwards/` ; images 0 cassée ; polices préchargées (2) ; `h1` unique, `lang="fr"` partout ; planche mobile (`m-0x`) : titre en 3 lignes, 3 liens visibles, pas de burger nécessaire.
