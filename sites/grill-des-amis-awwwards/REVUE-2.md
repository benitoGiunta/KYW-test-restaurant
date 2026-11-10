# Revue awwwards · Le Grill des amiS · passe 2
Verdict : PUBLIABLE
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : inchangée depuis la passe 1, une grillade noire et crème, braise rouge sur le S d'« amiS », qui suit la pièce de viande du brut au feu en quatre gestes, avec une lame qui « tranche » photos et transitions.

Scores /10 (relecture adversaire, mesures maison, pas de jury indépendant)
- Design 8 : en-tête désormais opaque, plus aucun texte lisible à côté du logo (`tete-390-home-*`, `tete-1440-reservation-*`) ; l'og.png est sobre mais hors identité typographique (F3-1).
- Usabilité 8 : l'état d'ouverture est juste sur 10 horloges simulées, cible du logo 186 x 44 px, menu `<dialog>` OK (focus sur « Fermer », Échap ferme, liens de 54 à 58 px).
- Créativité 8 : le geste « trancher » n'a pas bougé, la révision n'y a pas touché.
- Contenu 8 : les deux phrases hors dossier et la terrasse sont corrigées, 0 invention restante hors un adjectif d'alt (F3-2).
- Technique 9 : 0 erreur console, 0 requête en échec, 0 violation axe (5 pages x 1440 et 390 px, avant et après défilement), 0 débordement, LCP mobile 1,08 à 1,18 s (CPU x4 + 4G, 2 passes), CLS ≤ 0,0023.

Sources de preuve : `QA-revue2.md` (Haiku) lu : 0 erreur console, 0 requête en échec, 0 débordement, axe 0 sur accueil et carte ; ses WARN (sitemap, robots, 404 sans h1, violations axe de la « 404 » sans `<title>` ni `lang`) sont les faux positifs connus de la 404 brute de `serve.mjs` (leçon commune) : `404.html` ouverte directement a un `<title>`, `lang="fr"`, un `h1`. Fraîcheur : `dist/` (02:54) postérieur à tout fichier de `src/` et `public/` (`find -newer` vide), correctif commité (6711792) ; je n'ai pas relancé le build. Mesuré par moi sur `dist/` servi (port 4768, arrêté) : 5 pages x 2 largeurs (console, requêtes, axe-core complet avant et après défilement, débordement, méta, noindex, mention, logo), 4 liens internes (0 mort), état d'ouverture sous `page.clock.install` (10 horloges x 2 largeurs), en-tête sous contenu (7 captures), LCP/CLS CDP, reduced-motion, menu mobile.

## Vérification des corrections annoncées dans REVISION-1.md

| id | annoncé | constat | preuve |
|---|---|---|---|
| F1-1 | corrigé | CONFIRMÉ | 10 horloges : mardi 12 h, lundi 22 h, mercredi 9 h (jeudi, demain), jeudi 22 h (demain), samedi 23 h (lundi), dimanche 10 h (demain), plus les 4 créneaux ouverts ou entre deux services, justes à 1440 et 390 px ; espace insécable avant « h » (U+00A0) ; au 10/11/2026 le rendu est « Fermé, rouvre jeudi à 12 h » sur les 5 pages |
| F1-2 | corrigé | CONFIRMÉ | 0 occurrence de « à vue de la salle » et « se voient depuis » dans `dist/` ; reste « Deux chambres de maturation éclairées en bleu » (photo) |
| F2-1 | corrigé | CONFIRMÉ | `background-color: rgb(20, 16, 14)`, `background-image: none` sur les 10 cas ; captures d'en-tête : le contenu est coupé net au bord de l'en-tête, rien de lisible à côté du logo |
| F2-2 | corrigé | PARTIEL | 1200 x 630, 37 Ko, sans interface ni état d'ouverture : le défaut est levé. Mais la description « photo de braise, nom, baseline » est inexacte : aucune photo, et les polices sont des serifs de repli, pas Anton ni Newsreader (F3-1) |
| F2-3 | corrigé | CONFIRMÉ | « La terrasse est devant le restaurant, rue Saint-Joseph. L’intérieur est climatisé. » ; 0 « Quelques tables » |
| F2-4 | corrigé | CONFIRMÉ | `.tete__marque` 186 x 44 px à 1440 et 390 px sur les 5 pages ; `scrollWidth` = largeur |
| F3-1 | corrigé | CONFIRMÉ | « Ouvert jusqu’à 14 h » (source et bundle) |
| F3-2 | corrigé | CONFIRMÉ | 0 `priceRange` ; JSON-LD toujours présent avec `openingHoursSpecification` |
| F3-3 | corrigé | CONFIRMÉ | 0 `rel="canonical"` dans `404.html`, présent et correct sur les 4 autres pages |
| F3-4 | corrigé | SANS EFFET, SANS GRAVITÉ | `white-space: nowrap` ne change rien : `.plat__prix small` est `display: block`, l'unité reste sous le prix (« pers. » sous « 69 € »). Mesuré : 5 unités, 1 ligne de 20 px chacune, 0 hors de la ligne à 390 et 1440 px. Présentation cohérente, à ne plus traiter comme un défaut |
| F3-5 | corrigé | CONFIRMÉ | « côte à l’os » seule ; 0 « hampe, onglet » |

## Findings (par gravité)

### F0 : aucun
### F1 : aucun
### F2 : aucun

### F3 finitions
- **F3-1 · `public/og.png` : composition annoncée non conforme.** Image 1200 x 630 : « LE GRILL DES AMIS » en serif de repli (Liberation Serif) avec un S rouge, filet rouge, baseline du dossier ; pas de photo de braise (REVISION-1 le dit) ni de condensée Anton. L'aperçu de partage est propre et exact mais sans le caractère du site. Correction attendue : rendre l'image avec Anton et Newsreader (polices du site chargées avant la capture) et incruster la photo de braise du client, ou corriger la ligne de REVISION-1.
- **F3-2 · alt de la terrasse** (`src/lib/photos.ts:21`) : « chaises colorées autour des tables » ; le `sujet` de la photo est « Terrasse avec chaises colorées devant le restaurant », « autour des tables » n'y figure pas. Correction : « La terrasse devant le restaurant, avec des chaises colorées. »
- **F3-3 · CSS F3-4 inutile** (`site.css:193`) : `white-space: nowrap` sur un bloc de texte court, sans effet ; peut rester.

## Vérifié, sans écart (rappel passe 1, contrôlé à nouveau pour les points mesurables)
- Faits, carte (68 plats), horaires, URL de réservation, téléphone : non modifiés par la révision (diff de 7 fichiers : `site.ts` 2 lignes, `index.astro` 2 lignes) ; aucun avis, chiffre ni réseau inventé.
- Mention « Maquette KYW, certaines données sont illustratives » présente, un seul logo `kyw-signature` (1 par page), `noindex, nofollow` sur les 5 pages (conforme au prompt), `lang="fr"`, un seul `h1` par page, titres uniques, 0 tiret cadratin, JSON-LD Restaurant.
- Reduced-motion : 0 texte ou média caché après défilement. Liens externes (Google Maps, kyngroup.be, legrilldesamis.be/reserver, tel:) non testés faute de réseau, URL conformes au dossier.

## Ce qui est bien (à ne pas casser)
1. Le fil « Du brut au feu » et la lame qui tranche, intacts après la révision, jusqu'à la 404 « Pièce introuvable ».
2. L'état d'ouverture calculé, désormais juste sur toute la semaine, avec le jour de réouverture.
3. L'en-tête opaque à hauteur fixe, qui tient la bande des rubriques de la carte sans fuite de texte.

## Points non vérifiés
Pas de jury indépendant (outil Agent absent) ; survol et focus clavier repris du `report.json` du QA (7 cibles, 0 sans changement, 12 arrêts, 0 focus invisible) ; `skipLinkFirst: false` du QA est le faux positif connu (lien d'évitement lu dans `keyboard.stops[0]` en passe 1).
