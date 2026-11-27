# ETAT : dumont-bouge-portfolio, phase 1 sur 3 (construction)

## Fait
- Gabarit **journee** choisi (matrice dans DESIGN.md), copié, retaillé 7h-18h (frise, thèmes, rose #ef5d9c du logo).
- `src/data/site.ts` + `src/data/carte.json` (211 lignes, 23 catégories, tirées de donnees.json ; tirets cadratins retirés).
- Pages : accueil (6 moments), carte complète, brunch, maison (remplace histoire), réservation, 404. Header, footer, horaires Bouge / Namur adaptés.
- Photos WebP dans `public/photos/` (facade, vitrine, salade-chevre, plateau-mini-sandwichs, tarte-framboises), og.jpg, favicon rose. Build OK (`dist/dumont-bouge/portfolio/`, 6 pages, 2,2 Mo), noindex et mention maquette présents.

## Reste (phases 2 et 3)
- QA navigateur (desktop, mobile, reduced motion), contrastes du rose et du texte sur corail, texte du `.menu-soir`/`.happy` non retouché, médaillons (anneau texte), disque et frise à 11h30/14h/15h30 (crans proches).
- Logo : `public/photos/logo.png` copié mais non utilisé (en-tête = nom + disque) ; décider.
- Animations : driver `journee.ts` inchangé hors thèmes ; vérifier arrivée au moment courant et badge ouvert (horaires 7h-18h).
- Photo du tea-room / brunch : aucune (non inventée) ; chercher des photos libres si on veut les marquer placeholder.
- RAPPORT.md non écrit (phase 3).

## Décisions / hypothèses
- Prix formule Dumont : 13,80 € (embed menu actuel) ; menus de donnees.json disait 13,50 € (écarté).
- Les heures 14h, 15h30, 17h30 sont éditoriales (aucune donnée horaire hors petit-déjeuner 7h-11h et brunch 11h30-15h) ; accroches sans promesse d'horaire.
- Aucune donnée fictive : pas d'avis, d'équipe, d'histoire, de GPS (itinéraire = recherche OSM par adresse). E-mail public du site repris (non placeholder).
- `gabarits/UTILISATION.md` non modifié (dossier protégé) : à ajouter par la session mère : `journee | dumont-bouge`.
- Leçon proposée : data/usage/test-3/lecons-proposees/dumont-bouge.md.
