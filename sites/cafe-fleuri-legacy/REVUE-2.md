# Revue legacy · Café Fleuri · passe 2
Verdict : PUBLIABLE
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : un site de quatre pages tout en vert forêt, dont le héros est le prix du brunch (21,95 €) en chiffre géant à gauche face au titre, avec une barre d'appel mobile fixe ; plus honnête qu'en passe 1 (statut du lieu signalé, un seul cadre photo vide) mais toujours monochrome.

Base de la revue : REVISION-1.md vérifié ligne par ligne contre `src/`, `dist/cafe-fleuri/legacy/` (construit 02:39, postérieur aux sources de 01:42, pas de rebuild nécessaire) et un script maison (axe-core complet de node_modules, console, requêtes, débordement, cibles, balises, hauteurs) sur accueil, carte, venir et `404.html` réel à 1440, 1024 et 390 px, plus un défilement mobile de la barre d'appel sur 3 pages et 2 planches (`.shots-cafe-fleuri-legacy-revue2/r2/planche-desktop.png`, `planche-mobile.png`). QA-revue2.md (3 pages, 404 brute) lu : sa violation axe `color-contrast` sur « 404 » est la réponse brute de serve.mjs ; sur la vraie `404.html`, 0 contraste. Serveur propre sur le port 4813, arrêté par `kill 25704`.

Scores /10
- Design 7 : héros sur deux colonnes à 1440 (`planche-desktop.png`, home-1440-0), plus aucun cadre vide sur l'accueil et la carte ; reste monochrome vert et trois tuiles égales.
- Usabilité 8 : barre d'appel affichée de 0 à 2100 px sur l'accueil et masquée seulement devant un bouton Appeler (mesure `is-away`), 0 cible < 24 px, 0 débordement (scrollWidth = fenêtre sur 12 cas).
- Créativité 5 : le prix géant et « Mardi » restent la seule signature ; rien de propre à un café-brunch (pas d'image, par construction).
- Contenu 8 : statut de l'établissement visible sur accueil et Venir, « Gravlax, granola et limonades maison » conforme au dossier, 0 tiret cadratin, 0 tutoiement, 0 invention.
- Technique 8 : 0 erreur console, 0 requête en échec, 0 lien mort (10 liens distincts), 1 h1, lang fr, noindex, mention et un seul logo KYW sur 12 cas ; un `region` moderate par page (F2-1).

## Vérification des corrections annoncées
| id | annoncé | constat |
|---|---|---|
| F0 | rien | confirmé, dist présent, 0 console |
| F1-1 | corrigé | OK : `.statut` présent sur accueil et Venir (1 chacun), 0 sur carte et 404 ; texte « les sources divergent, le lieu serait fermé ou repris », fidèle au dossier ; consigné dans RAPPORT.md:27 |
| F1-2 | corrigé | OK : `.fig__ph` = 0 sur accueil et carte, 1 sur Venir (autorisé) ; héros deux colonnes à 1440 et 1024 (h1 à droite, prix à gauche, `home-1440-0.png`) ; sur 390 px colonne unique |
| F2-1 | corrigé | PARTIEL : 1 seul `<footer>` par page, `landmark-no-duplicate-contentinfo` disparu, mais axe complet signale désormais `region` (moderate, 1 nœud : `div.colophon role="group"`) sur les 12 cas (F2-1 ci-dessous) |
| F2-2 | corrigé | OK : 0 « tout est fait » ; lead, bande et méta disent « granola, limonades et thé glacé maison » |
| F2-3 | corrigé | OK : note « plats relevés sur une ancienne fiche, à confirmer » sous la liste (`carte.astro:36`) |
| F2-4 | corrigé | OK : légende « Le brunch, prix d'un ancien guide, illustratif, à confirmer. » (`home-1440-0.png`, `home-390-0.png`) |
| F2-5 | corrigé | OK : « Téléphone 081 65 89 15 (illustratif) » sur l'accueil, « 081 65 89 15 (illustratif) » sur Venir |
| F2-6 | partiel | Confirmé partiel : `openingHours` présent dans le JSON-LD, og:image absente (0 sur 12 cas), `telephone` JSON-LD inchangé ; voir F2-2 ci-dessous |

## Findings

### F0 bloquant
Aucun.

### F1 majeurs
Aucun.

### F2 mineurs
- **F2-1 · Accessibilité · `Footer.astro:5`.** Le pied du site en `div role="group"` n'est plus un landmark : axe complet, `region` (moderate) sur toutes les pages à 1440, 1024 et 390 px (absent du QA). Correction : `<section class="colophon" aria-label="Coordonnées">` (ou `role="region"`), pas de `contentinfo`.
- **F2-2 · SEO / données structurées · `Base.astro:13`.** Le JSON-LD affirme `openingHours: 'Mo-Su 09:00-16:00'` et `telephone: '+3281658915'` sans marque « illustratif » alors que le dossier donne des horaires contradictoires et deux numéros, et que le lieu est peut-être fermé ; pas d'`og:image`. La page est noindex et le prompt § C attend ces champs : à documenter dans RAPPORT.md (omission assumée de l'image, valeurs illustratives) plutôt qu'à bloquer.

### F3 finition
- **F3-1 · Nav fixe** (`page.css:35`, non traité) : `.nav-wrap` sans fond, barre à 12 px du haut ; le texte défile dans la bande et derrière la pastille (`home-390-600.png`, `home-1440-1400.png`). Correction : fond plein sur `.nav-wrap`.
- **F3-2 · `404.html`** (non traité) : pied fini à 559 px sur 900 (1440) et 672 sur 844 (390), reste = fond vert vide (`e404-1440-0.png`). Correction : `body` en flex colonne, `min-height: 100dvh`.
- **F3-3 · Répétition créée par F2-2** : « Gravlax, granola et limonades maison » apparaît deux fois sur l'accueil (lead du héros et titre de la bande, 2 occurrences dans `dist/…/index.html`). Varier le titre de la bande (par exemple « Ce qui est fait maison ») ou le lead.
- **F3-4 · Héros mobile** : 330 px de vide vert entre le prix et le titre à 390 px (`home-390-0.png`), voulu par `space-between` mais peu dense ; réduire `min-height` du héros sous 600 px.

## Vérifications sans écart
- Build : dist du 20/11 02:39, 4 pages (`/`, `carte/`, `venir/`, `404.html`), servies sans erreur ; sources antérieures au build.
- Faits : adresse, 2020, Bistro Bisou, brunchs, prix 21,95 et 11,95 (marqués), mardi étudiants, limonade framboise, thé glacé pêche : tous dans `donnees.json`. `email: null`, `reseaux: []` : rien d'inventé.
- Liens : 10 distincts, internes tous en 200 sous `/cafe-fleuri/legacy/`, OSM et kyngroup.be externes, `tel:` identiques. Mention « Maquette KYW, certaines données sont illustratives », 1 `.kyw-footer__logo`, `noindex` et `lang="fr"` sur les 4 pages.
- Barre d'appel mobile : visible partout sauf à côté d'un bouton Appeler (accueil à partir de 2400 px, carte 1500, venir 1200), opacité 1.
- Texte : 0 tiret cadratin, 0 tutoiement dans les 4 pages.

## Ce qui est bien (à ne pas casser)
1. Le prix géant du héros, désormais en regard du titre sur deux colonnes à 1440 et 1024 px, et le « Mardi » géant.
2. La barre d'appel mobile qui s'efface devant un bouton Appeler, cibles de 44 px.
3. L'honnêteté du contenu : statut du lieu signalé, prix, horaires et téléphone marqués « illustratif », rien d'inventé.
