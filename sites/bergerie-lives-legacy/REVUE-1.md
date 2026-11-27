# Revue legacy · La Bergerie de Lives · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : maison d'hôtes et domaine de mariage sur fond vert forêt, titres en serif Prata, boutons vert citron, lignes d'index sobres ; sobre, cohérent, nettement distinct du crème-terracotta par défaut.

Périmètre : maison d'hôtes et mariage, pas un restaurant (dossier.md, requalification assumée). `dist/` (08:31) postérieur à `src/` (08:00) : pas de rebuild, QA-revue1 (08:38) et `QA-build.md` réutilisés. Mesures propres sur port 4871 : 4 pages (accueil, mariage-et-location, reservations, 404.html réel) × 1440/1024/768/390/360 px, axe-core complet de `node_modules`, défilement par 400 px, contraste canvas sur chaque nœud texte, mots de titres coupés (rectangles), liens du `dist/`, extraction du texte confrontée à `donnees.json`, `dossier.md` et `site-actuel/`. La page `/reservations/` n'avait aucune capture dans le QA : capturée ici (desktop et mobile).

Scores /10
- Design 7 : palette verte maîtrisée, hiérarchie claire, photos du client bien cadrées (hero façade 1440 et 390 propres) ; plombé par le titre brisé de /reservations/ et de grands vides verticaux sur l'accueil.
- Usabilité 6 : navigation et menu popover corrects, CTA clairs, 0 cible tactile < 24 px, clavier sans blocage ; mais « Réserver » renvoie au site Wix d'origine et « Ouvrir la brochure » n'ouvre pas de brochure.
- Créativité 5 : cohérent mais convenu (liste d'index titre/texte répétée sur 4 sections, un seul recadrage de hero) ; pas de défaut de slop (ni eyebrow, ni trois cartes, ni dégradé).
- Contenu 7 : tout vient du site actuel ou du dossier ; aucun chiffre, avis ou récompense inventé ; deux petites inventions (F2) et de la répétition de copie client (F3).
- Technique 7 : 0 erreur console, 0 requête en échec, 0 débordement sur 20 cas, 0 contraste < seuil sur chaque nœud texte (canvas), `lang="fr"`, un seul h1, noindex, JSON-LD LodgingBusiness ; une violation axe modérée sur 4 pages sur 4 (F2), un titre à 15 px de large (F1).

## Findings

### F1 · majeurs
- **F1-1 · Titre « Nous trouver » cassé lettre par lettre sur /reservations/ (tous les écrans).** `src/pages/reservations.astro:70` : le `<h2 id="h-venir">` est un enfant direct d'un `.container.grid12` sans `grid-column` ; il tombe dans la colonne 1 sur 12. Largeur mesurée du h2 : 80 px à 1920 et 1440, 67 px à 1280, 45 px à 1024, 31 px à 768, 15 px à 390, 9 px à 320 ; il occupe 5 à 11 lignes (« No / us / tro / uv / er »). Aucun axe, aucun `scrollWidth` ne le signale (0 débordement). Preuve : captures `br1-res-2/3` (1440) et `br1-resm-2/3` (390, une lettre par ligne sur ~350 px de haut) ; le même cas pour `#contact` est déjà corrigé par `page.css:102` (`#contact > .container > h2 { grid-column: 1 / span 12 }`). Correction attendue : étendre la règle à `#h-venir` (ou classe `.sec__title { grid-column: 1 / -1 }` sur tous les h2 de grille) ; le défaut absent du QA car `/reservations/` n'a pas été capturée.

### F2 · mineurs
- **F2-1 · Deux `<footer>` de premier niveau : axe `landmark-no-duplicate-contentinfo` (moderate), 20 cas sur 20 (4 pages × 5 largeurs).** `src/components/Footer.astro:6` (`<footer class="foot">`) + `@kyw/footer`. Correction : passer le pied du site en `<div class="foot">` sans rôle, ou en `<section aria-label="Coordonnées">` (vérifier ensuite que `region` n'apparaît pas), et garder le `<footer>` du paquet KYW (règle : ne pas toucher au paquet).
- **F2-2 · Légende inventée sur /mariage-et-location/.** `src/pages/mariage-et-location.astro:46` : « Sortie de cérémonie, dans le jardin du domaine. » ; `photos/index.json` donne seulement le sujet « sortie ceremonie » (le lieu n'est pas prouvé ; alt de `site.ts:32` : « Sortie de cérémonie »). Correction : légende « Sortie de cérémonie. » ou la retirer.
- **F2-3 · « Ouvrir la brochure » et « Voir le calendrier » ne mènent à aucun document.** `src/data/site.ts:89-90` : les deux boutons pointent sur `https://www.bergerielives.be/mariage-et-location` (la page entière), le PDF n'a pas été récupéré (dossier.md « Ce qui manque »). Le libellé promet un PDF. Correction : « Voir la page sur le site d'origine » (ou équivalent) et retirer « Le PDF explicatif et tarifaire. » tant que le fichier n'est pas lié.
- **F2-4 · Mention de crédit photo non fondée.** `src/components/Footer.astro:35` : « Photographies : La Bergerie de Lives. » sur chaque page ; ni le dossier ni `site-actuel/` ne donne l'auteur des photos (aucun résultat pour « photographi » dans `site-actuel/`). Correction : supprimer, ou « Photographies : site d'origine » (provenance connue).
- **F2-5 · Réservation d'une chambre et d'une visite = renvoi vers le site Wix.** `src/pages/reservations.astro:20,26` : deux liens identiques `https://www.bergerielives.be/reservations` (page décrite « vide hormis le contact » dans dossier.md). Cohérent avec « bouton Réserver Wix » de donnees.json et honnête (« Réserver sur le site d'origine »), mais le lien « Réserver une visite » n'annonce pas la sortie du site : ajouter « (site d'origine) ». À défaut, le CTA principal de l'en-tête (« Réserver ») et le formulaire non relié (« Ce formulaire n'est pas encore relié », pas de faux envoi, conforme) laissent le visiteur sans réservation directe : à assumer dans RAPPORT.md.

### F3 · finition
- **F3-1 · Répétition de copie.** Accueil : « l'un des plus beaux moments de votre vie » trois fois (statement, service « Mariage », bandeau mariage) ; « Piscine / Piscine extérieure chauffée… » (titre et première phrase) ; page mariage : « Depuis 2017 » répété avec l'accueil. Reformuler le service « Mariage » et le bandeau.
- **F3-2 · Créneau « Accueil des hôtes : horaires à renseigner »** (`reservations.astro`, dashed `.fill`) : lisible comme un lien (soulignement pointillé, couleur de lien) alors que ce n'en est pas un. Option : le marquer « illustratif » ou le supprimer tant que le dossier ne donne pas d'horaires (manque listé).
- **F3-3 · Polices : trois familles ttf servies depuis Google Fonts (QA : 4 .ttf, 376 Ko, WARN × 3 pages)** sans préchargement ; pas de CLS (0,002 desktop, 0,02 mobile max), LCP mobile ≤ 1,08 s, donc non bloquant. Auto-héberger en woff2 si l'on veut effacer les WARN.
- **F3-4 · Texte courant à 12-14 px** (≈ 480 caractères à 14 px, 62 à 12 px sur chaque page) : lisible (contraste ≥ 4,5 sur tous les nœuds) mais petit pour le texte de service sur la planche desktop. Passer le texte des rangées d'index à 16 px.
- **F3-5 · Vide vertical** sur l'accueil entre le statement et « Nos chambres » (≈ 300 px à 1440) et au-dessus de « Nous écrire » : resserrer.

## Faux positifs du QA à ne pas corriger
- Axe « serious `color-contrast` sur `.kyw-footer__note` (4,36) » et « 404 sans lien d'évitement » : mesurés sur la réponse brute de `serve.mjs` pour une URL inexistante, pas sur le vrai `404.html` (mesuré ici : 0 contraste < 4,5, 1 h1, lang fr, noindex, lien « la page d'accueil » absent car remplacé par deux boutons de 48 px).
- WARN « pas de sitemap » : `sitemap-index.xml` et `sitemap-0.xml` existent dans `dist/bergerie-lives/legacy/` ; pas de `robots.txt` : sans objet (site noindex sous préfixe).
- 3 `color-contrast` « à vérifier » d'axe : 0 cas réel au contrôle canvas sur chaque nœud texte (accueil, mariage, réservations, 404 ; 1440 et 390 px).
- `JSON-LD` sans `openingHours` : le dossier n'en donne aucune (horaires `null`) ; ne rien inventer.

## Critères de publication
Build : OK (QA-build.md, dist plus récent que src). Console : 0. Requêtes en échec : 0. Liens internes du `dist/` : 0 mort sur 4 pages (liens externes non testés, hors réseau). Faits faux : 0 (nom, adresse, téléphone, e-mail, 20 € par personne, avril à octobre, 2017 conformes). Inventions non marquées : 2 mineures (F2-2, F2-4). Débordement : 0 sur 20 cas. Axe critique : 0 (1 modérée, F2-1). Mention KYW, logo `kyw-signature` (1 par page) et `noindex` : présents sur les 4 pages. Titre cassé F1-1 : non publiable en l'état.

## Ce qui est bien (à ne pas casser à la révision)
1. Hero de l'accueil et de la page mariage : photo plein cadre, panneau vert de 27 rem avec CTA « Réserver » + téléphone, moutons et façade entiers à 1440 et 390 px.
2. Honnêteté du contenu : « Weelness » corrigé en « Bien-être », « depuis plus de 3 ans » neutralisé, prix unique « 20 € par personne » repris tel quel, formulaire qui dit clairement « n'est pas encore relié » avec e-mail de secours.
3. Navigation mobile : menu popover (Menu/Fermer, liens soulignés, adresse et pied KYW dans le menu), 0 débordement de 320 à 1920 px, un seul h1 par page, ordre des titres sans saut.
