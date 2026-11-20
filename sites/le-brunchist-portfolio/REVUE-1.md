# Revue portfolio · Le Brunchist · passe 1
Verdict : A_CORRIGER (0 F0, 2 F1, 8 F2, 4 F3)

Lecture en une ligne de l'idée du site (avant DESIGN.md) : une journée de brunch qui se déroule comme une frise horaire (9h30 à 15h30), dont le ciel, la couleur et l'horloge suivent l'heure réelle du visiteur ; chaque page est un moment de la journée.

Contexte de la revue : QA-revue1.md et .shots absents (l'agent captures n'a rien déposé). Mesures refaites par la présente passe, serveur propre sur le port 4811 (PID 11678, arrêté) : build non relancé (dist du 20/11 01:10, aucun fichier de src plus récent). Script maison (launch, axe-core de node_modules complet, console, requêtes, débordement, cibles, balises) sur 6 pages (accueil, carte, brunch, histoire, reservation, 404.html réel) x 1440 et 390 px, 6 captures par cas (planches), puis script ciblé (galerie, état ouvert sous horloge, reduced-motion, LCP/CLS CDP CPU x4 + 4G deux passes, liens, focus).

## Scores /10
- Design 7 : concept cohérent, ciel qui change par heure, titres massifs et frise lisibles (planches home, carte) ; mais galerie d'histoire cassée sur bureau et grandes plages vides entre sections.
- Usabilité 7 : nav et frise toujours visibles, 0 lien mort (liens internes testés, tous 200), cible < 24 px : 0 ; focus visible adaptatif (2 px, `rgb(27,27,27)` sur page claire, crème sur page sombre) ; l'état « ouvert » dépend du fuseau du navigateur.
- Créativité 8 : horloge en direct, médaillons à texte circulaire, thème qui suit la journée ; trois photos libres de tasses réutilisées sur plusieurs pages.
- Contenu 6 : faits (nom, adresse, téléphone, horaires, réseaux, avis) conformes à donnees.json ; titre d'accueil faux (« Restaurant bistronomique »), horaires de service et fermeture de cuisine inventés non marqués, carte répétée 2 à 3 fois.
- Technique 8 : build OK, 0 erreur console, 0 requête en échec, scrollWidth = fenêtre, h1 unique, lang fr, noindex, mention et logo KYW (1 seul) partout ; LCP mobile 1,16 à 1,34 s, CLS 0,0001 (accueil) et 0,013 (carte) sous CPU x4 + 4G ; reduced-motion : 0 élément à opacité < 0,5 ; 394 Ko au chargement de l'accueil. Retranché : 2 violations axe.

## Findings (par gravité)

### F1 majeurs
- **F1-1 · Galerie « Ambiance » écrasée sur bureau et tablette** (`src/pages/histoire.astro:54`). Les trois `<figure class="c1-4 photo photo--3x2">` portent une classe `c1-4` qui n'existe dans aucun CSS (seul `.cols > * { grid-column: 1 / -1 }` existe, uniquement sous 768 px, `base.css:16`) : chaque photo tient dans 1 colonne sur 12. Mesures `getBoundingClientRect` : 75 x 50 px à 1440, 50 x 33 à 1024, 34 x 23 à 768 ; 357 x 238 à 390 (correct). Preuve visuelle : `rs1-pl-histoire-1440.png` (trois vignettes minuscules sous « Décontracté, convivial »). Correction : définir l'étendue de colonnes réellement utilisée (ex. `grid-column: span 4` sur `.cols > figure`, comme pour les autres pages) et re-mesurer à 768, 1024, 1440.
- **F1-2 · `<title>`, og:title et twitter:title de l'accueil faux** (`src/layouts/Base.astro:18`) : « Le Brunchist | Restaurant bistronomique à Namur ». Le dossier décrit un café-brunch ; « bistronomique » est un fait faux (T-faux) et diffère de la description juste (« café-brunch à Namur »). Sort dans les résultats de partage et l'onglet. Correction : `Le Brunchist | Café-brunch à Namur`.

### F2 mineurs
- **F2-1 · Horaires de service et fermeture de cuisine inventés, non marqués** (`src/data/site.ts:152-178`, tous `placeholder: false`) : « 11h Le brunch », « 12h30 Le salé », « 14h30 La terrasse », « 15h30 Le rideau », et « La cuisine ferme à 15h30 » (index, 15h30). Le dossier ne donne que l'ouverture 9h30 à 15h30 (et des sources contradictoires). T-invente léger : passer `placeholder: true` avec mention « repères illustratifs » ou reformuler en « La maison ferme à 15h30 ».
- **F2-2 · « l'histoire des deux chefs »** (`src/pages/404.astro:11`) : le dossier parle de fondateurs (Mélisande et Arnaud, à confirmer), pas de chefs. Écrire « l'histoire de la maison ».
- **F2-3 · État « ouvert » calculé sur l'heure du navigateur** (`src/motion/journee.ts:35,132,140` : `getHours()`/`getDay()` sans `Europe/Brussels`). Sous horloge simulée la logique est juste (lundi, mardi : « ouvre mercredi/demain à 09:30 » ; mercredi 08:00 « ouvre à 09:30 » ; mercredi 10:00 « ouvert jusqu'à 15:30 » ; vendredi 16:00 « fermé, ouvre demain à 09:30 » ; dimanche 15:45 « fermé, ouvre mercredi à 09:30 »), mais un visiteur hors fuseau belge (ou le sandbox en UTC : 01:14 affiché pendant le test) voit une heure et un ciel décalés. Utiliser `Intl.DateTimeFormat('fr-BE', { timeZone: 'Europe/Brussels' })`.
- **F2-4 · Libellé « Ouvert » contradictoire sur les jours fermés** (`src/components/Horaires.astro:18`) : lundi et mardi (aujourd'hui) affichent `Ouvert` + `fermé` (texte du DOM « Ouvertfermé »). Libeller « Horaires » ou « Service ».
- **F2-5 · Carte répétée** : sur `/carte/`, chaque plat figure dans la section horaire puis à nouveau dans « Brunch et salé » et « Cafés et boissons » (Œufs brouillés 2 fois dans les sections, 3 fois avec la liste) ; l'accueil en reprend trois séries (moments, « À boire », puis `/brunch/` les redonne). Garder une seule présentation par page ou supprimer les listes de bas de page.
- **F2-6 · Eyebrow (« chapeau » à pastille) au-dessus de 12 titres sur 14** (« La carte », « Du mercredi au dimanche », « Les assiettes », « Depuis 2022, à Namur », « La maison », « Ambiance », « Horaires », « Avant de venir », « Erreur 404 »… ; `.chapeau`, `base.css:32`) : tic de gabarit, mêmes mots que le titre dans plusieurs cas. En retirer au moins la moitié.
- **F2-7 · axe `aria-prohibited-attr` (serious)** sur accueil et carte : `p[aria-label="9h30"]` (6 et 4 nœuds), SplitText pose `aria-label` sur des `<p>`. Passer l'option `aria` de SplitText à `none` ou poser `role`, ou retirer l'attribut.
- **F2-8 · axe `landmark-no-duplicate-contentinfo` (moderate) sur les 6 pages** : pied du site + `kyw-footer` sont deux `<footer>` de premier niveau (`.footer`). Passer le pied du site en `<div>` (ou `role="presentation"` n'est pas suffisant : changer d'élément), garder `kyw-footer` en `contentinfo` (conforme à la leçon commune).
- **F2-9 · Méta « de Le Brunchist »** (« Le brunch de Le Brunchist », « La carte de Le Brunchist », « L'histoire de Le Brunchist », « sur le site de Le Brunchist » en 404) : élision absente. Écrire « du Brunchist » ou reformuler.

### F3 finition
- **F3-1** Deux avis Google en anglais non traduits (« Best egg topped Avocado toast ever. », « Very cozy, good fresh foods […] ») dans un site français : ajouter `lang="en"` sur la citation et une traduction ou une mention « (en anglais) ; la citation reste fidèle au dossier ».
- **F3-2** Le nom complet d'une personne privée (« Wendy Sajid-Witte », avis Restaurant Guru) est repris ; prénom seul comme pour David.
- **F3-3** Titre « Rondes, vues du dessus » (`/brunch/`) alors que les médaillons montrent une tasse de framboises, une tasse de café et un pot de miel ; légendes « Fruits frais », « Café au lait », « Miel » nomment des plats que le dossier ne cite pas (seuls granola, pancakes… sont cités). Neutraliser (« Ambiance de la table, photos illustratives »).
- **F3-4** Mobile 390 : la rangée de puces horaires du hero et les médaillons de `/brunch/` défilent horizontalement (puces coupées à droite : « 12h30 Le sal… ») sans indice autre que la coupe ; acceptable, mais ajouter un fondu ou un décalage de bord.

## Ce qui est bien (à ne pas casser)
1. Les faits sont exacts et sourcés : adresse Place d'Armes 8, 5000 Namur, +32 474 06 92 27, horaires mercredi à dimanche 9h30 à 15h30 (conforme à donnees.json), réseaux Facebook/Instagram, JSON-LD `Restaurant` avec adresse et `openingHoursSpecification` ; incertitudes marquées « à confirmer » et « prix illustratif » partout, aucune donnée client inventée (pas d'e-mail, pas de note Google, crédits des 9 photos Unsplash en pied).
2. Le dispositif de journée : ciel, thème, horloge et frise suivent le défilement et l'heure ; état d'ouverture juste sur 7 horloges simulées ; mobile pensé (nav + frise en en-tête, signature conservée) et reduced-motion propre (contenu entièrement visible).
3. Technique propre : 0 erreur, 0 lien mort, LCP mobile ~1,3 s sous throttling, CLS ~0, 404 designée avec title, h1 et lang, og.jpg 1200 x 630 pertinent, mention « Maquette KYW, certaines données sont illustratives » et un seul logo KYW sur chaque page, `noindex, nofollow` conforme au prompt.

## Preuves
Planches : `/tmp/claude-0/-home-user-KYW-test-restaurant/4a6f67a1-5f33-5823-96d3-1413d7443722/scratchpad/rs1-pl-<page>-<largeur>.png` (6 pages x 2 largeurs) ; journaux `.logs/rs1-mesure.log`, `.logs/rs1-cible.log`, `.logs/rs1-focus*.log`.
Hypothèses : fuseau du sandbox = UTC (horloge 01:14 lors de la mesure), donc le ciel nocturne sur les captures n'est pas un défaut ; un seul passage de `axe` par position de défilement (après défilement par 300 px et 1,5 s de repos).
