# Revue gabarit collage · Les Potes au Feu · passe 1

Verdict : A_CORRIGER

Lecture en une ligne de l'idée du site (avant DESIGN.md) : un mur de flyers collés, un aplat de couleur par activité (vert table, rose scène, bleu brunch, jaune infos), un logo-étiquette en cases qui gagne une quatrième case au nom de la section.

Périmètre : build `dist/gabarits/collage/` (7 pages : accueil, carte, agenda, privatisation, histoire, réservation, 404). Captures `.shots-collage-revue/<page>` réutilisées : les 7 `shoot.mjs` ont fini (journal : 7 × exit 0, DONE, 22:35 à 22:50) et sont postérieures au build (dist 22:32) ; aucun fichier de `src/` ni `public/` plus récent que le build. Serveur de contrôle (liens, HTML) sur le port 4433, arrêté par PID. Les sections d'agenda, de brunch et d'avis étant des exemples balisés, elles ne comptent pas comme inventions.

## Scores /10 (auto-score, pas de sous-agent critique disponible)
- Design 8 : cases bordées 2 px, aplats francs, Caslon + Space Mono, vagues SVG, un seul système sur 7 pages (`index/d-03`, `agenda/d-01`, `m-02`).
- Usabilité 8 : menu mobile plein écran propre (`menu-ouvert.png`), CTA toujours visibles, focus clavier visible (`index/k-02-focus.png`), 0 petite cible.
- Créativité 8 : la case de section qui se colle au logo (« Table », « Scène », « Brunch ») est lisible et propre au gabarit.
- Contenu 7 : faits exacts, exemples tous balisés ; deux défauts de titre et de typographie (F1, F3).
- Technique 9 : 0 erreur console, 0 requête en échec, axe 0 violation sur 7 pages, CLS 0 à 0,001, aucun débordement, reduced-motion sans texte caché.

## Findings

### F1 majeur
- **C-01 · T-faux · `<title>` et SERP de l'accueil** : `Les Potes au Feu | Table, scène et brunch à Namur`. Le restaurant n'a ni scène ni brunch (dossier : fermé le dimanche, aucune programmation) ; la page elle-même le dit (« Les Potes au Feu n'a pas de scène »). Le titre, lui, l'affirme sans balise « exemple » et sort dans les résultats de recherche. Preuve : `report.json` index `desktop.title` et `dist/gabarits/collage/index.html`. Correction : `<title>` fondé sur les faits du dossier, par exemple « Les Potes au Feu | Bistronomie à quatre mains à Namur » ; ne pas dériver le titre de la `cible` du cahier.

### F2 mineur
- **C-02 · Pied de page mobile, « Namur » tronqué en « N… »** : la quatrième case jaune du logo du pied de page est coupée à 390 px sur les 7 pages. Preuve : `index/m-06-scroll.png`, `carte/m-06-scroll.png`, `privatisation/m-05-scroll.png`, `404/m-04-scroll.png`. Correction : laisser la case passer à la ligne ou réduire la taille du logo du pied de page en mobile (`white-space: nowrap` sans `text-overflow`, taille en `clamp`).
- **C-03 · Photo du hero d'accueil agrandie 1,5 fois** : `salle-clients-bar-960.webp` (960 px) est servie plein écran à 1440 px, d'où une image molle et empâtée. Preuve : `index/d-01-hero.png` (grain et contours flous) ; `<img width="960">` dans `index.html`. Correction : servir une 1600 px en desktop (`srcset`/`<picture>`, ~110 Ko) et garder la 960 px pour le mobile, en conservant `fetchpriority="high"` et le preload.
- **C-04 · LCP mobile de l'agenda à 2,55 s** (seuil 2,5 s) ; élément LCP : l'image. Preuve : `agenda/report.json` `mobile.vitals.lcpMs = 2548`. Mesure faite sous charge séquentielle, marge nulle. Correction : première vignette de l'agenda en `640` + `fetchpriority="high"`, sans reveal ; vérifier en série (cible < 2 s).

### F3 finition
- **C-05 · Ligatures absentes** : « Boeuf confit » (accueil, carte, alt de l'image, histoire), « Oeufs au choix » (brunch d'exemple). Écrire « Bœuf », « Œufs » (en excluant les chemins de photos `plat-boeuf-confit*.webp`). Preuve : texte extrait de `index.html`, `carte/index.html`.
- **C-06 · Alt qui nomment une personne non établie** : « Clients attablés au bar, Damien en salle… », « François verse une sauce à table… ». Le dossier n'attribue que les portraits (`damien.jpg`, `francois.jpg`) ; le reste est une supposition. Remplacer par une description neutre (« Un cuisinier verse une sauce à table devant une cliente »).
- **C-07 · Menu répété deux fois sur la carte** : le bloc « Menu dégustation » (6 lignes + suppléments) est recopié in extenso dans « Les formules » (carte, `d-05`/`d-06`, `m-04`). Réduire à « Menu dégustation unique, 67 € » + renvoi au bloc du dessus.
- **C-08 · Cartes Sara et Jordan sans photo** : deux aplats jaunes vides à côté des portraits (`histoire/d-03`). Lisible comme gabarit, mais à marquer d'un sticker « photo à venir » ou d'une silhouette collée pour ne pas paraître cassé.

## Vérifications sans défaut
- Faits contre `donnees.json` : adresse, téléphone, horaires (les 7 jours, midi mercredi et vendredi), 67 €, 52 €, 40 €, bons cadeaux 50/75/100/150, suppléments +7/+15, histoire, noms, citation Michelin, Zenchef `rid=379477`, Facebook, YouTube : tous exacts. Boissons, e-mail, agenda, brunch, avis : balisés « exemple », « illustratif ».
- Liens : 0 lien interne mort (curl sur chaque href/src des 6 pages, tous 200) ; 404 réelle renvoyée (HTTP 404) ; liens externes conformes au dossier.
- Méta : `lang="fr"`, `noindex`, mention « Maquette KYW, certaines données sont illustratives » et pied KYW (`kyw-signature`) sur les 7 pages ; JSON-LD `Restaurant` avec adresse, géo et horaires ; OG image ; favicon ; 404 designée ; un seul `h1` par page ; skip link en premier arrêt (le `skipLinkFirst:false` de shoot.mjs est le faux négatif connu).
- Tirets cadratins : aucun. Vouvoiement respecté. Ponctuation française correcte.
- Performance : LCP desktop 160 à 412 ms, LCP mobile 1,1 à 2,5 s, CLS ≤ 0,001, 60 fps desktop, 47 à 60 fps mobile throttlé, photos ≤ 257 Ko, 3 polices préchargées, loader ≈ 2,5 s desktop.

## Ce qui est bien (à ne pas casser)
1. La signature : le logo en cases qui reçoit une case colorée au nom de la section (« Table », « Scène », « Brunch »), sur desktop comme sur mobile (`index/d-03`, `m-02`, `m-03`).
2. L'honnêteté des exemples : chaque bloc inventé porte un sticker « exemple » ou « illustratif » et l'agenda renvoie vers les vrais jours de service (`agenda/m-05`).
3. Le mobile pensé, pas écrasé : menu plein écran en cases, aplats pleine largeur, cibles confortables, formulaires lisibles, 0 débordement (`menu-ouvert.png`, `privatisation/m-02`).
