# Revue awwwards · Le Royal Namur · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une brasserie « face au Théâtre » dont les pages se coupent en deux faces (brique clair / ardoise nuit) séparées par un axe vertical rouge, avec un rideau rouge-ardoise entre les pages ; sobre, typographique (Melodrama + Host Grotesk), la photo de la terrasse porte le premier écran.

Scores /10
- Design 8 : `d-01-hero.png` (accueil 1440) hiérarchie nette, titre display massif, photo de la terrasse cadrée à droite, deux CTA lisibles ; l'accueil reste très aéré (listes courtes, 150 px de vide sous « À la table du Royal »).
- Usabilité 8 : lien d'évitement en premier arrêt Tab, 0 petite cible, menu à trois entrées, « Réserver » rouge partout, tél. cliquable ; `reservation/` et `a-propos/` à 390 px sans débordement.
- Créativité 7 : l'axe et le contre-défilement sont cohérents mais discrets (la planche de transitions n'en montre que le rideau) ; pas de loader ni de GL, choix assumé ; aucun accessoire marquant hors du rideau.
- Contenu 6,5 : faits exacts, mais maigre (À propos = 2 paragraphes + repères) et deux phrases laissent voir les coulisses de la maquette (voir F2-1, F2-2).
- Technique 7,5 : build OK, 0 erreur console, 0 lien mort, 0 débordement, 927 Ko, CLS 0, LCP mobile accueil 2348 ms (marge de 150 ms) ; mais axe complet : 1 violation « serious » (`aria-prohibited-attr`) non vue par le QA.

Périmètre vérifié (aucun shoot complet relancé) : lecture de `QA-revue1.md` et des planches accueil et carte ; script maison sur 5 pages (accueil, carte, a-propos, reservation, 404.html) à 1440 et 390 px : console, requêtes en échec, débordement, h1, ponctuation, alt ; axe complet (sans runOnly) sur les 10 cas ; contraste nœud par nœud (canvas 1x1, opacité cumulée) sur accueil et a-propos : 0 nœud sous le seuil ; captures ciblées a-propos 1440 et reservation 390 ; 62 prix et noms de `carte.json` comparés à `donnees.json` ; liens vérifiés par curl. Le QA ne couvrait ni `a-propos`, ni `reservation`, ni la vraie `404.html` : ils sont couverts ici.

## Findings

### F0 (bloquant)
Aucun. Build exit 0 ; 0 fait faux ; 0 invention de métrique, récompense ou avis ; mention, logo KYW unique (`.kyw-footer__logo` = 1) et `noindex, nofollow` présents sur les 5 pages du `dist/` (conforme au prompt § 3.3).

### F1 (majeur)
- **F1-1 · aria-prohibited-attr (serious), accueil ×2, a-propos ×1** : SplitText (GSAP) pose un `aria-label` sur des `<p>` sans rôle : `p.hero__lieu` et `p.duo__grand` (accueil), `p.duo__grand` (a-propos). Preuve : axe complet 1440 et 390, message « aria-label attribute cannot be used on "p" elements ». Le shoot/QA ne le signale pas (piège connu de la fiche revue). Correction : dans `src/engine/reveal.ts`, créer les SplitText avec `aria: 'hidden'` (et garder le texte lisible via le parent) ou `aria: 'none'`, ou retirer l'attribut après split ; rejouer axe : 0 violation serious.

### F2 (mineur)
- **F2-1 · aveu de maquette dans le texte public** : `src/pages/a-propos.astro` (paragraphe sous « Repères ») : « L'histoire de la maison et son équipe ne sont pas documentées : cette maquette n'invente rien. » Capture `apropos-1440` (section nuit). La mention KYW du pied suffit ; remplacer par une phrase neutre ou supprimer. Même registre, `src/pages/reservation.astro` : « La carte indique une ouverture de 11 h à 23 h ; la cuisine, elle, sert de 12 h à 14 h 30 et de 18 h à 22 h » expose une contradiction de données au visiteur ; ne garder que les horaires de cuisine (le dossier demande de confirmer, pas de publier le doute).
- **F2-2 · phrase non prouvée** : `src/pages/index.astro` (face « Côté théâtre ») : « Le Royal accueille la pause qui l'encadre : une planche à partager, un verre, un vrai repas. » « Planche » n'existe ni dans `carte.json` ni dans `carte.txt` (seule la photo 07 en montre une, sujet « planche de charcuterie ») ; « la salle » (même section, face brasserie) n'est pas non plus attesté (aucune photo ni texte de salle). Correction : « un verre, un repas » et « la terrasse et la brasserie ».
- **F2-3 · Note TripAdvisor** : `a-propos.astro`, « 3,7/5, 272 avis ». Le dossier précise que la fiche est celle de « l'ancienne adresse Le Royal » : rattachement incertain. Afficher seulement la note Google (Rankeat) ou marquer « à confirmer ».
- **F2-4 · landmark-no-duplicate-contentinfo (moderate), 5 pages** : `<footer class="pied">` du site et `<footer>` de `@kyw/footer` sont deux `contentinfo` de premier niveau. Correction : donner au pied du site `role="presentation"`/le sortir de la portée `body > footer` (par exemple `<div class="pied">` dans `<section aria-label="Contact">`), sans toucher au composant KYW.
- **F2-5 · LCP mobile accueil 2348 ms** (`report.json` accueil, élément `img` du héros) : sous le seuil de 2,5 s de 150 ms seulement, mesuré CPU ×4 + 4G. Vérifier `fetchpriority="high"` sur la photo héros et que le `srcset` sert bien la variante 480 w à 390 px ; non mesuré en deux passes ici.
- **F2-6 · page `reservation` : horaires redondants** : 7 lignes identiques « 12 h à 14 h 30 et 18 h à 22 h » (capture `resa-390`), puis les mêmes horaires deux fois dans le pied. Une ligne « Tous les jours » suffit.
- **F2-7 · `idleMotion`** : `false` sur a-propos, reservation et 404 (assumé dans ETAT.md). Pas contraire au prompt, noté pour mémoire.

### F3 (finition)
- Le « 0 » de Melodrama se lit « Ø » en grand corps (« 4,0 » sur `apropos-1440`, section Repères) : écrire « 4 » ou « 4,0 » en Host Grotesk.
- La façade (photo 03 façade, accueil `d-03-scroll.png`) est très saturée (ciel et briques), visible à côté de la photo de la planche ; baisser légèrement la saturation en CSS (`filter: saturate(.85)`) ou accepter (source client).
- « Voir toute la carte » seul sous une liste de 5 plats : lien souligné peu visible au regard du titre display, passer en `.cta--vide`.
- Formulaire e-mail de `reservation` : « Ouvrir mon e-mail » (mailto) est honnête, pas de faux « merci » ; champ « Date souhaitée » en texte libre (acceptable).

## Vérifications sans écart
- Faits : adresse Place du Théâtre 13, 5000 Namur, 081 22 01 33, resto@leroyalnamur.be, horaires 12 h–14 h 30 / 18 h–22 h 7 j/7, Zenchef `rid=383850&pid=1001`, Facebook et Instagram identiques à `donnees.json` ; 62 plats/prix identiques (écarts de normalisation typographique seulement) ; fêtes 50 € / 65 € et « apéritif maison et mises en bouche, trois verres, café ou thé » conformes à `fete.txt` ; moules 1,350 kg, ardoise 20 € mardi/jeudi signalée « à confirmer ».
- Méta : `<title>` et description uniques par page, `lang="fr"`, 1 `h1` par page, og:image présente (452 Ko), favicon svg + png, JSON-LD `Restaurant` avec adresse, geo, horaires, `sameAs` ; `404.html` designée (h1, title, lang) ; sitemap-index présent.
- Liens : curl 200 sur `/`, `/carte/`, `/a-propos/`, `/reservation/`, `404.html`, `sitemap-index.xml`, `og.png`, `favicon.svg` ; `tel:`, `mailto:`, plan OSM, Zenchef et réseaux corrects ; 0 requête en échec, 0 erreur console sur 10 cas.
- Texte : 0 tiret cadratin, 0 espace manquante avant `: ; ? !`, vouvoiement (les 5 « tu » de `carte` sont des faux positifs dans des mots de menu, ni « tu » ni « ton » en phrase), aucun filler type « passion », « expérience unique ».
- Mobile 390 px : 0 débordement, composition repensée (colonne unique, menu à 3 entrées sans burger, rubriques de la carte en liste), signature des deux faces conservée.

## Ce qui est bien (à ne pas casser)
1. Hero accueil : titre display + photo terrasse avec l'ardoise lisible, CTA « Réserver une table » / « Appeler le 081 22 01 33 » dès le premier écran, 1440 et 390.
2. Carte : 62 prix fidèles, rubriques ancrées, lignes « nom ........ prix » lisibles à 390 px, chaque photo décrite par son `sujet` réel (alt vérifiés).
3. Sobriété technique : 927 Ko, aucune police ttf/otf, 2 polices préchargées, CLS 0, 60 fps, 0 contraste sous seuil mesuré nœud par nœud.
