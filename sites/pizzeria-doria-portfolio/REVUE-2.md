# Revue portfolio · Pizzeria Doria · passe 2
Verdict : PUBLIABLE
Lecture en une ligne de l'idée du site : une pizzeria de quartier en « guinguette » tricolore (crème, vert sapin, corail), pictos au trait, titre serif et scène signature « La table de Doria » où l'on attrape des tirages de photos pour les poser sur une table verte.

Scores /10
- Design 7,5 : tricolore et scène tenus, les eyebrows et les italiques redondants ont disparu (accueil, réservation : captures t-390-home, t-1440-histoire) ; reste un manifeste italique voulu et un mot géant de pied coupé à droite.
- Usabilité 8 : la barre mobile montre ses 5 entrées à 390, 360 et 320 px, et les taps sur Emporter, Contact, Vins, Carte mènent à la bonne page (tests tactiles à 390 et 320).
- Créativité 7 : inchangée (scène, bandeau d'état calculé, pictos) ; le reste suit un patron de sections classique.
- Contenu 7,5 : plus d'état inventé, plus de « par téléphone » exclusif, histoire distincte de l'accueil, tout vérifié contre dossier.md et photos/index.json ; il reste une triple occurrence de « famille » sur /histoire/ (F3).
- Technique 8 : build vert, dist identique au commit (git status propre après rebuild), 0 erreur console, 0 requête en échec, 0 débordement, 0 lien interne mort, axe sans violation critique.

## Vérification des corrections annoncées dans REVISION-1.md
Tous les points sont confirmés, sans régression.
- **F1-1 nav mobile : confirmé.** Mesure à 390 : `nav` scrollWidth = clientWidth = 332, 5 liens (Carte, Vins, Maison, Emporter, Contact), dernier bord droit 356 px ; à 320 : 256 = 256 ; à 1440 : 6 liens dont Accueil. Hauteur minimale des liens 34 px, largeur 35 px (Vins à 320). Taps réels : Emporter → /emporter/, Contact → /reservation/, Vins, Carte OK à 390 et 320. Planche p-mob1 : barre complète, entrée courante en pastille noire.
- **F1-2 bandeau : confirmé.** `page.clock` (fuseau America/New_York, calcul Europe/Brussels), 12 instants : lundi 12 h 30 « Ouvert jusqu'à 13 h 30 », jeudi 18 h 30 « Ouvert jusqu'à 21 h 30 », vendredi 21 h 45 « Ouvert jusqu'à 22 h », lundi 15 h « Fermé en ce moment, ouverture à 18 h », mardi et mercredi « prochain service jeudi à 12 h », dimanche 22 h « prochain service lundi à 12 h ». 0 « arrivée jusqu » dans dist.
- **F2-1 réservation : confirmé.** Bandeau, pied de page, /reservation/ : « Réservation : +32 81 44 44 08 » ; 0 `acceptsReservations` dans le JSON-LD.
- **F2-2 horaires : confirmé.** « Cuisine fermée » : 1 occurrence sur / et /reservation/, 0 sur /emporter/ et /histoire/ ; le pied de page ne porte plus que « Fermé le mardi et le mercredi » + lien « Voir tous les horaires ».
- **F2-3 histoire : confirmé.** L'accueil ne garde qu'une phrase (« Une pizzeria de famille, installée depuis 2023 dans une ancienne banque de Malonne ») ; /histoire/ a son propre texte ; « racontée sans chichis » et « de pâte et de four » absents. Faits recoupés avec dossier.md (famille, octobre 2017, mai 2023, Rocco et Luigi, Eggusto, vins italiens choisis par Luigi, Philomène et Vulpio) et `sujet` de la photo (casiers métalliques, tables en bois, chaises noires).
- **F2-4 cartes vides : confirmé.** « Aux commandes » : deux cartes textuelles compactes (Rocco, Luigi), plus de cadre à picto.
- **F2-5 eyebrow + italique : confirmé.** 0 `class="meta"` sur l'accueil, 1 `<em>` dans la carte (+ manifeste d'accueil), titres de sections en romain (captures t-*).
- **F2-6 texte non prouvé : confirmé.** « Pâtes fraîches, pizzas et antipasti » ; lien « Voir comment commander » ; 0 « grande tablée ».

## Findings restants (aucun F0, aucun F1, aucun F2)
**F3-1 · Mot géant du pied de page coupé à droite** (non traité, F3 hors périmètre de la révision). `.footer__finale` : scrollWidth 1694 pour 1440 px, 818 pour 390 ; capture 1440-histoire-bas : « Buon appetit » se lit « Buon appetit » sans le « o ! », à 390 « Buon a ». Décoratif, `aria-hidden`. Correction : `font-size` en `vw` pour que « Buon appetito ! » tienne en largeur.

**F3-2 · bouchons.webp 317 692 octets** (> 300 Ko), inchangé. Requalité à 70 ou largeur 1000 px.

**F3-3 · Typographie.** Apostrophes droites restantes : accueil 2, carte 1, emporter 1, 404 3, `d'origine` sur /histoire/, et `Ouvert jusqu'à` / `Fermé aujourd'hui` dans `motion/setup.ts:53-58`. Formats d'heure mélangés : « 12:00 à 13:30 » (accueil, réservation) contre « 21 h », « 13 h 30 » (bandeau, note). La note fériés de /reservation/ (« Jours fériés : 18:00 à 21:30 (mardi et mercredi fériés : fermé) ») est recopiée du dossier et se lit mal. Correction : U+2019 (Python) et format unique « 12 h à 13 h 30 ».

**F3-4 · Doublon « 5 pièces »** toujours dans /carte/ (« Pains (maison, 5 pièces) » + description « 5 pièces », 2 occurrences). Vider la description quand elle répète le nom.

**F3-5 · axe `region` (modéré)** sur `.marquee`, 7 pages × 3 largeurs (non traité). Mettre le bandeau dans le `<header>` ou lui donner `role="region"`.

**F3-6 · « famille » trois fois sur /histoire/** (6 occurrences du mot sur la page) : chapeau « Pizzeria de famille à Malonne », titre « Une histoire de famille », puis phrase « Une histoire de famille. ». Supprimer la phrase courte ; « casiers métalliques d'origine » : « d'origine » n'est ni dans le dossier ni dans le `sujet` de la photo, à retirer.

**F3-7 · Avertissement console GSAP** « target not found » (2 par chargement de l'accueil, à 1440, 390 et 320). Mesuré aussi sur le dist de la passe 1 (commit 1e097fa) : antérieur à la révision, ce n'est pas une régression ; un tween vise une cible vide (probablement un SplitText). 0 erreur, effet visible nul. À chercher dans `engine/reveal.ts` ou `motion/setup.ts`.

**F3-8 · « Fermé aujourd'hui, prochain service … » après la dernière fin de service d'un jour ouvré** (lundi 21 h 45, samedi 22 h 30) : le site était ouvert aujourd'hui. Libellé suggéré : « Fermé en ce moment, prochain service … ».

## Mesures
- Build : `node scripts/build-site.mjs sites/pizzeria-doria-portfolio` OK, 7 pages ; `git status` sur dist/ et sites/ vide après rebuild (dist = source).
- 7 pages × 1440, 390, 320 : console erreurs 0 (3 avertissements GSAP, voir F3-7), requêtes en échec 0, `scrollWidth` = fenêtre, 1 `h1`, `lang="fr"`, `noindex` sur les 7 pages, mention « Maquette KYW, certaines données sont illustratives » et un seul logo KYW et un seul `<footer>` partout, 0 texte masqué à l'opacité 0.
- axe-core complet : seul `region` (modéré). Une violation `color-contrast` sérieuse vue une fois sur l'accueil à 1440 pendant le défilement n'est pas reproduite à la seconde mesure (même parcours, avec 9 s d'attente du loader) : état d'animation transitoire, noté sans finding.
- Liens : 25 distincts, 0 interne mort ; externes conformes (Facebook pizzeriadoria, pizzy.be/pizzeria-doria, tel:+3281444408, mailto:info@pizzeriadoria.be).
- QA-revue2.md absent : aucune planche d'agent captures ; captures et mesures faites par moi (rel2-* dans le scratchpad).

## Ce qui est bien (à ne pas casser)
1. La scène « La table de Doria » et le hero à pictos : signature intacte du bureau au mobile.
2. Barre de navigation mobile à 5 entrées, pastille de page courante, taps fiables jusqu'à 320 px.
3. Données exactes et assumées : bandeau d'état calculé sur les horaires du dossier, réservation = téléphone sans exclusivité, texte d'histoire entièrement recoupé.

## Hypothèses
- Le « note de cuisine » du dossier a changé depuis la passe 1 (21 h du mardi au jeudi et le dimanche, 21 h 30 vendredi et samedi) ; le bandeau suit le tableau d'horaires (fermeture 21 h 30 le jeudi), la note de cuisine reste affichée sur /reservation/ : cohérent avec le dossier.
- L'avertissement GSAP est jugé F3 : antérieur, sans effet visible, aucune erreur.
