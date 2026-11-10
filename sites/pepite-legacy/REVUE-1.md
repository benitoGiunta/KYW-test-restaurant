# Revue legacy · Pépite, cave à manger · passe 1
Verdict : A_CORRIGER (0 F0, 2 F1, 4 F2, 4 F3)

Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une page unique sombre (brun café, saumon), serif Young Serif, qui ouvre sur la photo des bouteilles et enchaîne carte de la semaine en rangées, bandeau vins, portrait de la cave, presse, horaires ; sobre et cohérent, mais presque sans image sous le hero.

Base de la revue : dist (13:13) postérieur à src (13:11), QA-revue1 (13:18) et captures `.shots-pepite-legacy-revue1/home/` (13:15) postérieures au dist : réutilisés tels quels, aucun nouveau shoot. Lu : planche, d-01 à d-07, m-01 à m-06, report.json (hover, clavier, a11y), source des 8 composants, dist (méta, JSON-LD, 404.html réelle, liens, ancres), dossier.md, donnees.json, site-actuel/page.html.

Scores /10 :
- Design 7 : hiérarchie nette, hero lisible (`d-01-hero`), grain discret ; mais grands vides à droite du bandeau vins et sous le portrait (`d-03`, `d-05`), page très typographique.
- Usabilité 7 : CTA « Réserver » présent en nav, hero et horaires, menu mobile et clavier OK (12 arrêts, 0 focus invisible), jour courant signalé ; une seule destination de réservation (Tablebooker), lien `tel:` mal formé.
- Créativité 6 : les étiquettes de bouteilles du hero portent le site ; ensuite rangées et bandeaux standards, aucun moment mémorable.
- Contenu 6 : faits et prix conformes à donnees.json, mais une phrase inventée, une fausse (samedi) et un bandeau vins vide.
- Technique 8 : build OK, 0 erreur console, 0 requête en échec, 0 violation axe, 0 débordement, LCP 404 ms / 848 ms mobile, CLS 0,001, 477 Ko.

## Findings

### F1 majeurs
- **F1-1 · T-invente + T-faux · `src/components/Venir.astro:8`** : « La boutique ouvre l'après-midi, la cave à manger dès 19 h 00. À toute heure, une assiette ou un verre selon l'envie. » (preuve : `d-06-scroll`). (a) « l'après-midi » est faux le samedi (boutique dès 10 h 30, `donnees.json`, `data/site.ts` lignes horaires). (b) « À toute heure, une assiette ou un verre selon l'envie » n'est dans ni le dossier ni `site-actuel/page.html` (grep vide) : promesse de service inventée. Correction : « La boutique ouvre dès 16 h (dès 10 h 30 le samedi), la cave à manger dès 19 h. » Supprimer la seconde phrase.
- **F1-2 · Contenu vide · `src/components/Vins.astro:10-12`** : trois libellés « Chou », « Chouchou », « Chou Chéri » dans trois colonnes égales, sans une ligne d'explication (preuve : `d-03-scroll`, `m-03-scroll`). Un visiteur ne comprend pas que ce sont les sélections de vins de la maison (le titre d'origine : « Les sélections de pépite : Chou, Chouchou & Chou Chéri », `site-actuel/page.html:104`). Correction : ajouter l'intitulé « Les sélections de Pépite » visible au-dessus de la liste (texte du site) et relier la liste au bouton « Commander en ligne » ; pas de description par sélection (non fournie, ne rien inventer).

### F2 mineurs
- **F2-1 · `src/data/site.ts` (telHref)** : `tel:0476/620182` contient une barre oblique, non valide en URI `tel:` ; certains téléphones n'appellent pas. Correction : `tel:+32476620182` (même numéro que le JSON-LD), affichage inchangé.
- **F2-2 · mentions de production visibles · `Lieu.astro:12` et `Pied.astro:19`** : « Catherine Mathieu, fondatrice. Texte du site d'origine. » et « Photographies : Pépite. » (`d-04`, `d-07`). La première est une note de travail publiée ; la seconde attribue les photos à Pépite sans preuve (elles viennent du site/capture, `photos/index.json`). Correction : « Catherine Mathieu, fondatrice » seul ; retirer « Photographies : Pépite » ou écrire « Photographies : site d'origine » (conserver « Graphisme d'origine : Studio Otamendi », sourcé).
- **F2-3 · menu périmable · `Carte.astro:9`, `data/site.ts` (menu)** : h2 « À partager cette semaine » alors que le menu n'est valable que du jeudi 12 au samedi 14 novembre 2026 (la fréquence de renouvellement n'est pas écrite, `donnees.json:6`). Après le 14, le titre est faux. Correction : h2 « À partager en ce moment » ou « Le menu du 12 au 14 novembre » sans « semaine », et lien « Voir la carte de la semaine » du hero reformulé en « Voir le menu » (`Hero.astro:11`).
- **F2-4 · composition desktop · `page.css` (`.lieu__grid`, `.vins__in`, `.venir__grid`)** : zones vides de 300 à 400 px (colonne droite du bandeau vins `d-03` ; sous le texte du portrait puis 250 px avant « Ils en ont parlé » `d-05` ; colonne gauche sous « Jeudi, vendredi, samedi » `d-06/d-07`). Deux photos du dossier (`couvert`, `vitrine`) sont publiées dans `dist/photos/` mais jamais affichées. Correction : réduire `--section-gap` entre Lieu et Presse, aligner le texte du portrait en haut de la photo ou ajouter `couvert.webp` (alt = sujet « Couvert et serviette sur table en bois, poivre et sel ») dans le bandeau vins ; supprimer les fichiers non utilisés.

### F3 finition
- **F3-1** : rangée du jour courant décalée de 16 px (« Fermé » à x=912 contre 896 pour les autres, `d-06-scroll`) : le padding gauche de `.hor[aria-current]` déplace le `dd` ; compenser par `margin-left` négative ou `border-inline-start` sans padding.
- **F3-2** : Jeudi et Vendredi répètent « Boutique dès 16 h 00 / Cave à manger dès 19 h 00 » (WARN audit) ; regrouper en une rangée « Jeudi et vendredi ».
- **F3-3 · `Presse.astro`** : le nom du média et la date se touchent (« Le Vif29 novembre 2022 », `d-05`) : ajouter une marge ou une ponctuation ; l'entrée « Chef Magazine » est un titre d'article (« Pépite, le vin en partage ») présenté comme extrait, sans guillemets ni mention « titre ».
- **F3-4** : audit : quatre polices livrées en TTF/OTF et non WOFF2 (poids polices 244 Ko) ; convertir ou autohéberger en WOFF2.

## Vérifications sans écart
- Faits : adresse (44 rue Notre-Dame, 5000 Namur), tél. 0476/620182, e-mail, horaires, menu 58 €, plats, fromages 12 €, vin au verre 5,50 à 12,50 €, gin 45 € / 50 cl, citation de la patronne, extraits Le Vif 2022, Juliette & Victor, So Soir : tous retrouvés dans `donnees.json` ou `site-actuel/` (0 faux hors F1-1). 0 invention de chiffre, d'avis ou de récompense (le prix POP of the year est cité par Juliette & Victor).
- Méta : `lang="fr"`, un seul h1, `noindex` sur `/` et `404.html`, mention « Maquette KYW, certaines données sont illustratives. », 1 logo KYW (`kyw-signature`), title/description/OG/twitter:card, JSON-LD `Restaurant` (adresse, téléphone, géo), favicon, 404 réelle designée (h1, nav, retour accueil), sitemap généré.
- Liens : 6 ancres internes (`#carte #vins #lieu #presse #venir #contenu`) présentes ; chemins `base` corrects (`/pepite/legacy/…`) ; liens externes (Tablebooker, Google Forms, Facebook, Instagram, Maps) non testés (réseau), URL identiques à celles du site d'origine.
- Faux positifs ignorés : `skipLinkFirst: false` (lien d'évitement bien premier arrêt), WARN robots/sitemap et « 404 sans h1 » de la 404 brute de `serve.mjs`, « no link … could be clicked » (page unique), contraste « à vérifier » 42 (fond grain ; `--color-muted` ≈ 5:1 sur `--color-paper`, axe 0 violation).
- AI slop : pas d'eyebrow systématique, pas de trois cartes avec icônes, pas de dégradé violet, pas de fade-up global (reveal limité aux rangées de la carte), palette brun/saumon propre au lieu ; seule alerte = trio égal du bandeau vins (F1-2).

## Ce qui est bien (à ne pas casser)
1. Le hero sur la photo des bouteilles : texte à droite sur zone sombre, une seule action principale, remplit l'écran à 1440x900 et à 390 px (`d-01-hero`, `m-01-hero`).
2. La carte de la semaine en rangées numérotées, avec « 58 € » en grand et le détail des plats fidèle au site d'origine (`d-02-scroll`, `m-02-scroll`).
3. Horaires avec « Aujourd'hui » calculé côté client, pied KYW propre, accessibilité clavier et mobile (menu `popover`, boutons pleine largeur, cibles 44 à 48 px).
