# Revue awwwards · Champs Élysées · passe 2
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans DESIGN.md) : une journée de brasserie de 11 h à 22 h, une horloge fixe qui suit le défilement et fait passer le fond du crème au vert nuit ; sobre, lisible, ancré dans la façade et la carte réelles.

Base : `QA-revue2.md` absent (l'agent captures n'a rien produit, `.shots/` antérieur à la révision). `dist/` (21:38:15) est postérieur à `src/` (21:37:01) et à REVISION-1. Mesures maison sur ce `dist/`, serveur propre port 4981 (PID 19859, arrêté) : 5 pages × 1440 et 390 px, axe-core complet à 4 positions de défilement, contraste nœud par nœud (canvas 1x1, opacité cumulée) à chaque pas de 450 px, console, requêtes, débordement, balises, mention, logo, JSON-LD, horloge (display et boîte) à chaque palier, échelle horaire à 360/390/412. Planches lues : `rev2-planche-m.png` (6 vues mobiles), `rev2-planche-carte.png`, `rev2-planche-home.png`. LCP/CLS non remesurés (aucun changement structurel de chargement, valeurs du RAPPORT reprises, non recontestées).

Scores /10 (auto-notation du relecteur, pas un jury indépendant)
- Design 7,5 : palette tenue sur 5 pages, titres énormes, façade en héros (`rev2-planche-home.png`) ; mur de photos toujours répétitif.
- Usabilité 7,5 : plus de cadran sur l'index de la carte, boutons lisibles (4,6:1 et 5,6:1 mesurés), régions défilantes focalisables.
- Créativité 7,5 : le cadran est maintenant présent à 390 px (2,5 rem, en bas à droite, accueil, histoire, réservation, 404), la signature survit au mobile.
- Contenu 8 : promesse « sans pause » retirée, plages 11-22 h / 11-16 h conformes à `donnees.json` ; F3 de contenu non traités.
- Technique 7,5 : 0 erreur console, 0 requête en échec, 0 débordement, 0 violation axe stable sur 10 cas ; une échelle de graphique mal placée (F2-4).

## Vérification des corrections annoncées
| id | verdict | preuve |
|---|---|---|
| F1-1 | OK | `.btn--plein` fond rgb(240,106,54) sur clair, rgb(255,125,74) sur sections sombres, texte rgb(18,48,42) : ratios 4,60 et 5,59 (calcul) ; 0 texte sous seuil sur 10 cas (mesure nœud par nœud, boutons visibles inclus). |
| F1-2 | OK | `#horloge` `display:none` sur /carte/ à 1440 et 390 ; `rev2-planche-carte.png` (défilement 150 et 450) : « Trappistes… » et l'index entièrement lisibles. |
| F1-3 | OK | axe : 0 `aria-prohibited-attr` sur 5 pages × 2 largeurs (accueil, carte, histoire, réservation, 404). Réservation désormais couverte aussi. |
| F1-4 | OK | axe : 0 `scrollable-region-focusable` à 390 ; `dist` : `.strip` porte `role="region" aria-label tabindex="0"` (index, histoire). |
| F2-1 | OK | grep `dist` : plus de « pause », « ne ferme pas », « toujours ouvert » ; textes réécrits présents (« De 11 h à 22 h, la salle reste ouverte », « 15 h, la salle est ouverte », pied « La salle est ouverte de 11 h à 22 h »). |
| F2-2 | OK | horloge `grid` 40×64 px à (334,768) à 390 sur accueil, histoire, réservation, 404 ; capture `rev2-planche-m.png` : cadran et étiquette « 11 h / 16 h / 17 h / 22 h » lisibles, sans recouvrir de texte. Absente sur /carte/ à 390 (assumé par REVISION). |
| F2-3 | PARTIEL | « 20 » et « 22 » ne se chevauchent plus à 360, 390, 412 px (échelle 8, 14, 22), mais voir F2-4 : l'échelle est mal placée, ce que la passe 1 n'avait pas relevé. |

## Findings (par gravité)
**F2-4 · L'échelle horaire du graphique est rendue dans la colonne des jours, pas sous les barres.** `site.css:138` `.week__scale span { position: absolute }` s'applique aussi aux deux `<span></span>` vides de `index.astro:56` et `:58` ; ils sortent de la grille et le `<div>` des graduations tombe dans la colonne 1. Mesure à 390 : graduations à x = 13 à 96 px (« 8 », « 14 », « 22 »), alors que les barres occupent environ 90 à 230 px ; à 1440 (`rev2-planche-home.png`, planche de droite) « 8 11 14 17 20 22 » est tassé sous « Dimanche » (x 1117 à 1220) et « 20 22 » se touchent, les barres commencent à x 1252. L'échelle est donc fausse (11 h devrait tomber au début de la barre orange) et le chevauchement de F2-3 n'est masqué que sur mobile. Correction : `.week__scale > span { position: static }` (ou `.week__scale > div span`), puis recontrôler que 8/14/22 (mobile) et 8 à 22 (desktop) tombent sous les barres sans se toucher.

**F3-1 · Légende « Portraits d'après La DH, 4 août 2024. »** (`histoire.astro:36`) encore présente (`rev2-planche-m.png`, vue histoire) alors qu'aucun portrait n'est montré. Non traité (hors périmètre annoncé).

**F3-2 · Répétitions** : « plus de dix personnes » deux fois dans /reservation/ (grep : 2). Non traité. Le pied unique est désormais « La salle est ouverte de 11 h à 22 h. » : la répétition 5 pages subsiste mais n'est plus une fausse promesse.

**F3-3 · Étiquette « Novembre » en dur** dans /reservation/ (grep : 1). Non traité.

**F3-4 · Code postal 5100** (10 occurrences) contre 5000 sur le site client, noté « à confirmer » seulement dans le RAPPORT. Non traité.

Non reproduit : une violation axe `color-contrast` isolée sur `.horloge__h` à 1440 sur /histoire/ pendant le défilement continu ; à l'arrêt, 7 positions × axe contraste seul : 0, et couleurs mesurées rgb(238,240,232) sur rgb(18,48,42) (≈ 11:1). Probablement un état de fondu de l'étiquette ; à surveiller, pas un finding.

Vérifiés sans écart : 0 erreur console, 0 requête en échec, `scrollWidth` = fenêtre sur 10 cas, aucun élément hors fenêtre hors `.strip`, h1 unique, `lang="fr"`, `noindex, nofollow` (conforme au prompt), mention « Maquette KYW, certaines données sont illustratives » et un seul logo KYW sur 10 cas, 1 JSON-LD par page, `og.png`, favicon, apple-touch-icon présents.

## Ce qui est bien (à ne pas casser)
1. La carte : index latéral désormais lisible, 94 lignes exactes, prix alignés.
2. Le cadran mobile 2,5 rem : signature conservée sans gêner la lecture.
3. Le texte d'horaires désormais prudent (plages seules), cohérent partout y compris 404 et pied.
