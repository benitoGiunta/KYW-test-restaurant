# Revue awwwards · Le Grill des amiS · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une grillade noire et crème, braise rouge sur le S d'« amiS », où l'on suit la pièce de viande du brut au feu en quatre gestes (acheter, découper, maturer, griller), avec une lame qui « tranche » les photos et les transitions.

Scores /10 (relecture adversaire, mesures maison, pas de jury indépendant)
- Design 8 : typographie condensée géante contre serif, trois fonds (fonte, os, bordeaux) tenus sur 5 pages, photos du client bien cadrées ; défauts : en-tête translucide et og.png.
- Usabilité 7 : menu mobile en `<dialog>` (focus sur « Fermer », Échap rend la main), liens de réservation et d'appel partout ; mais l'état d'ouverture de l'en-tête affiche une information fausse (F1-1).
- Créativité 8 : le geste « trancher » est cohérent du hero à la 404 (« Pièce introuvable »), pas de loader ni de GL gratuit.
- Contenu 7 : 68 plats et prix exacts, aucun avis ni chiffre inventé ; deux affirmations hors dossier (F1-2) et une formulation non prouvée (F2-3).
- Technique 8 : 0 erreur console, 0 requête en échec, 0 violation axe, 0 débordement, LCP mobile 1,0 à 1,2 s, CLS ≤ 0,004, 60 fps ; la cible de 22 px du logo (F2-4) est le seul écart mesuré.

Sources de preuve : `QA-revue1.md` n'existe pas (agent captures absent). Réutilisé : `.shots/` du constructeur (captures de 02:15 à 02:18, postérieures à `site.css` 02:15:48 et `tranche.ts` 02:10 ; `dist/` de 02:26 sans changement de `src/`). Mesuré par moi sur `dist/` servi (port 4471) : 5 pages × 1440 et 390 px (console, requêtes, débordement, axe complet, méta, JSON-LD, images, cibles tactiles, texte transparent), état d'ouverture sous horloge simulée, contraste de l'en-tête pixel par pixel sur 46 positions de défilement, menu mobile, reduced-motion, 68 plats confrontés à `donnees.json`.

## Findings (par gravité)

### F0 : aucun
Build : le `dist/` de 02:26 est cohérent avec `src/` (aucune source plus récente) ; je n'ai pas relancé le build.

### F1 majeurs
- **F1-1 · T-faux · État d'ouverture faux, sur toutes les pages (en-tête desktop, menu mobile).** `src/motion/menu.ts:21` : toute heure hors créneau affiche « Fermé, demain dès 12 h », sans regarder si demain est ouvert. Mesuré sous horloge simulée : mardi 12 h → « demain dès 12 h » (mercredi est fermé) ; lundi 23 h → idem (mardi fermé) ; samedi 23 h → idem (dimanche fermé). Aujourd'hui (mardi 10/11/2026) c'est ce que voit tout visiteur, et la même ligne figure sur `og.png`. Les créneaux justes (« Ouvert, cuisine jusqu'à 14 h », « la cuisine ouvre à 18 h ») fonctionnent. Correction : chercher dans `services` le prochain jour ouvert sur 7 jours et écrire « Fermé, rouvre jeudi à 12 h » (ou le jour réel) ; sinon supprimer la ligne.
- **F1-2 · T-invente · « à vue de la salle » et « se voient depuis les tables ».** `src/data/site.ts:40` (geste Maturer : « Deux chambres de maturation éclairées en bleu, à vue de la salle ») et `src/pages/index.astro:78` (« Le gril et les deux chambres de maturation se voient depuis les tables »). Le dossier dit seulement « les 2 chambres du restaurant » et la photo (`sujet` : « Deux armoires de maturation éclairées en bleu ») ne montre pas leur place par rapport à la salle ; rien ne prouve non plus que le gril se voie des tables. Correction : « Deux chambres de maturation, éclairées en bleu. » et retirer la phrase du gril et des chambres de la section « La salle » (garder mur de bûches, lampes rouges, enfilade, baie vitrée, qui viennent du `sujet` de la photo).

### F2 mineurs
- **F2-1 · En-tête translucide qui laisse voir le contenu.** `src/styles/site.css:43` : `linear-gradient(#14100e 40%, #14100e00)` sur 4,5 rem. Le texte qui passe dessous se lit à côté du logo : « 5 VIANDES » et « choisies par le chef » sur `m-04-scroll` (accueil mobile), bouton « Réserver une table » sous le logo sur `m-06-scroll`, ligne « Mardi, mercredi, dimanche : fermé (à confirmer) » sous la nav sur `reservation/d-03-scroll`. Le contraste du logo reste correct (pire cas 4,5:1 sur 46 positions desktop, 4,5 sur 43 mobile), c'est un défaut de propreté et de lisibilité de l'état. Correction : fond opaque (`background: #14100e`, comme déjà fait sur la carte, `site.css:177`) ou dégradé qui atteint l'opacité pleine avant la ligne de texte (stop à 85 %).
- **F2-2 · `og.png` est une capture d'écran de la page d'accueil**, avec la nav, l'état faux « Fermé, demain dès 12 h » et l'intro coupée en bas (1200 × 630, 278 Ko). Déjà signalé « non recomposée » dans RAPPORT.md. Correction : composer une image dédiée (nom, baseline, photo de braise) sans interface.
- **F2-3 · Formulation non prouvée dans la terrasse.** `src/pages/index.astro:81` : « Quelques tables dehors, devant la porte, rue Saint-Joseph ». Sources : médaillon « Terrasse du restaurant » et photo « Terrasse avec chaises colorées devant le restaurant » ; ni le nombre de tables ni « devant la porte » n'y figurent. Correction : « La terrasse est devant le restaurant, rue Saint-Joseph. L'intérieur est climatisé. »
- **F2-4 · Cible tactile du logo de 186 × 22 px** (toutes pages, desktop et mobile ; `smallTargets` de shoot.mjs et mes mesures). Sous les 24 px de WCAG 2.2 (2.5.8). Correction : `min-height: 2.75rem` (ou padding vertical) sur `.tete__marque`.

### F3 finitions
- **F3-1** « Ouvert, cuisine jusqu'à 14 h » (`menu.ts:18`) : les horaires du dossier sont ceux du restaurant (fin de service 14 h 30 et 21 h 30 ou 22 h « à confirmer »). Écrire « Ouvert jusqu'à 14 h ».
- **F3-2** JSON-LD `priceRange: '€€'` (`src/layouts/Base.astro:24`) non sourcé par le dossier ; retirer ou le déduire de la carte (18 à 40 €).
- **F3-3** `<link rel="canonical">` de la 404 pointe vers `/grill-des-amis/awwwards/404/` (page inexistante) ; retirer le canonical sur la 404.
- **F3-4** Carte mobile (`carte/m-03-scroll`) : l'unité « pers. » du Menu Viandard passe à la ligne sous le « 69 € ». Forcer l'unité sur la même ligne ou l'écrire dans la description.
- **F3-5** « Gaëtan découpe sur place : côte à l'os, hampe, onglet » (`site.ts`, geste Découper) : seule la côte à l'os est attestée par la photo ; hampe et onglet viennent de la carte, pas de la découpe. Ramener à « côte à l'os ».

## Vérifié, sans écart
- Faits : nom, adresse (Rue Saint-Joseph 10, 5000 Namur), téléphone (081 61 72 60, `tel:+3281617260`), horaires (lundi, jeudi à samedi, 12 h à 14 h et 18 h à 21 h 30 ; mardi, mercredi, dimanche « fermé (à confirmer) »), URL de réservation `https://www.legrilldesamis.be/reserver`, Menu Viandard (69 €, 5 viandes, 3 services, dès 2 personnes), lunch 15,50 €, steak du midi 17 €.
- Carte : 68 plats sur 68 présents, 10 catégories, prix identiques (les 9 écarts du script étaient des formats : « 3,5 € » affiché « 3,50 € », unités « pers. »). Aucun avis, note, année, e-mail ni réseau social affiché ; aucun placeholder à signaler.
- Typographie : 0 tiret cadratin, 0 tutoiement, ponctuation française propre (espaces insécables), pas de filler (« passion » = fruit de la passion et « passionné de vin », cités par le dossier).
- Mention « Maquette KYW, certaines données sont illustratives » et un seul logo KYW (`kyw-signature`) sur les 5 pages ; `noindex, nofollow` partout (conforme au prompt, leçon commune) ; `lang="fr"`, un seul `h1`, landmarks header/nav/main/footer, lien d'évitement « Aller au contenu » premier arrêt, titres et descriptions uniques, OG et favicon, JSON-LD Restaurant (adresse, géo, horaires) ; les 5 pages répondent 200, liens internes préfixés `/grill-des-amis/awwwards/`.
- Axe complet : 0 violation sur 10 combinaisons page × largeur ; 5 « à vérifier » de contraste (`.tete__nom`, `.cta--petit`) levés par la mesure pixel (4,5:1 mini). Reduced-motion : 0 texte transparent après défilement. Menu mobile : ouvert, focus sur « Fermer », Échap ferme, liens de 54 à 58 px.
- Poids : plus gros fichier 314 Ko (`04-salle-mur-buches.jpg`, repli ; la version avif servie est plus légère), polices Anton et Newsreader préchargées.

## Ce qui est bien (à ne pas casser à la révision)
1. Le fil « Du brut au feu » : quatre gestes numérotés, photos tranchées, 69 € géant sur fond bordeaux, la 404 « Pièce introuvable » dans le même vocabulaire.
2. La discipline des faits : carte exacte, horaires « à confirmer » assumés, photo des patrons légendée sans nom, aucun avis inventé.
3. La tenue technique : 60 fps, LCP mobile ~1,1 s, CLS ~0, aucune erreur, menu `<dialog>` accessible, reduced-motion complet.

## Points non vérifiés
Liens externes (client, Google Maps) non testés faute de réseau ; survol et focus clavier repris du `report.json` du constructeur (`noHoverChange` vide, `invisibleFocus` vide, 11 à 12 arrêts, pas de `stuck`) ; pas de critique jury indépendant (outil Agent absent).
