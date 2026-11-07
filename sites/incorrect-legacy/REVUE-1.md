# Revue legacy · INCORЯECT · passe 1
Verdict : A_CORRIGER (0 F0, 0 F1, 3 F2, 5 F3)

Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une affiche de gig imprimée en deux passes, papier journal, encre noire et un bleu-vert d'imprimeur, où la photo de table passe en duotone teal et où les prix de la carte sont lus comme sur une addition.

Scores /10 (la revue repose sur QA-revue1.md, ses planches et un script maison, 1440 et 390 px)
- Design : 8. Palette tenue (papier, encre, teal, une carte orange), titre Anybody large, photos en gris ou duotone cohérentes (d-01-hero, d-06-scroll) ; le trio de chiffres et le logo à bloc d'adresse minuscule retirent un point.
- Usabilité : 9. Réservation visible en nav et au hero, menu Popover mobile qui s'ouvre et se ferme, onglets au clavier, 0 débordement (scrollWidth 1440 et 390), 0 cible < 24 px, focus 2 px visible.
- Créativité : 7. Idée claire et sobre, mais une seule page, motion « still » voulue, pas de moment mémorable en dehors du duotone.
- Contenu : 8. Tous les faits recoupés avec donnees.json et site-actuel/page.html ; horaires marqués « à confirmer » ; trois défauts mineurs ci-dessous.
- Technique : 9. Build OK, 0 erreur console, 0 requête en échec, axe complet 0 violation à 1440 et 390 (script maison, axe-core de node_modules), contraste canvas 0 écart, LCP 396 ms desktop et 836 ms mobile, CLS 0,004 et 0,026, 1 seul h1, `lang="fr"`, un seul `<footer>`.

Contrôles faits (preuves) : `noindex` sur index.html et 404.html (dist) ; mention « Maquette KYW, certaines données sont illustratives. » et un seul `.kyw-footer__logo` ; `/404.html` servi 200, `lang=fr`, 1 h1, title « Page introuvable, INCORЯECT », 0 erreur ; liens Barestho et PDF de carte répondent 200, Instagram et Facebook identiques à donnees.json ; carte : prix, noms et descriptions comparés au JSON (src/data/donnees.json identique à data/restaurants/incorrect/donnees.json) ; fournisseurs (Bodson à Awans, Vequée, Brasserie {C}, Wild Speciality Coffee Roaster), « moins de vaisselle », « chouchou », « infaillibles » retrouvés dans site-actuel/page.html : pas d'invention. Aucun tiret cadratin, aucun tutoiement.

## Findings

### F2-1 · JSON-LD sans horaires
`src/layouts/Base.astro` l.11-17 : le `Restaurant` porte adresse, géo, téléphone, `sameAs`, mais aucun `openingHoursSpecification` (`grep openingHours dist/incorrect/legacy/index.html` : 0). Le prompt § C exige adresse et horaires structurés. Correction : ajouter l'`openingHoursSpecification` tirée de `horaires` (mar-ven 18:30-21:30 ; sam 12:00-14:00 et 18:30-21:30), en gardant l'avertissement « à confirmer » visible dans la page.

### F2-2 · Prix à décimales incohérentes dans la carte
`src/data/site.ts` l.34-37 : `prix()` supprime `,00`. Résultat sur les captures d-06-scroll et m-05-scroll : suppléments « 2,50 € » à côté de « 2 € », « 3 € » ou « 6 € » à côté de « 6,50 € ». Une colonne de prix se lit mal. Correction : garder deux décimales partout (« 2,00 € ») ou n'en afficher aucune quand toutes les valeurs de la liste sont entières ; la règle doit être la même par groupe.

### F2-3 · « La plus simple des classiques » est faux
`src/components/Pate.astro` l.18 : « 14,50 € la margherita, la plus simple des classiques ». La carte classique commence par Kidz, tomates et provola, 8,50 € (d-04-scroll, donnees.json). La phrase est fausse et le chiffre est un doublon décoratif du prix déjà dans la carte. Correction : retirer cette carte du trio, ou écrire un fait vérifiable (« de 14,50 € à 21,50 € pour les pizzas classiques, hors Kidz à 8,50 € »).

### F3-1 · Trio de chiffres égal
`src/components/Pate.astro` l.15-19, capture d-03-scroll et m-03-scroll : trois cartes égales (48 h, 22,50 €, 14,50 €) en bande colorée. C'est le motif « trois cartes de chiffres » de la liste slop du prompt § C. Seul « 48 h » vient du texte du restaurant. Correction : garder « 48 h » en grand chiffre unique (signature annoncée par le DESIGN) et supprimer les deux prix.

### F3-2 · Logo du bandeau : bloc d'adresse illisible
Captures d-01-hero et k-02-focus : le SVG client embarque un bloc mono « PIZZERIA + RUE HAUTE MARCELLE N.35 5000 + NAMUR » qui, à 7,5 rem de large (6 rem sous 60 rem), tombe à environ 4 px et se lit comme de la poussière. Correction : ne pas masquer ce bloc (c'est le fichier client) mais soit agrandir le logo de nav, soit utiliser un recadrage du mot seul dans la nav, le bloc complet restant au pied.

### F3-3 · Apostrophes mélangées
10 lignes de la carte en apostrophe droite (« huile d'olive », « 'Nduja ») contre 5 lignes courbes en prose (« d’Alex »). Correction : normaliser en `’` dans les descriptions de la carte (par Python, `'Nduja` devient `’Nduja`).

### F3-4 · Polices : trois familles Google en feuille bloquante
Base.astro l.34 : CSS Google Fonts sans `preload`, QA : 511 Ko de polices et 7 WARN « ttf/otf font shipped » (audit.mjs). Pas de gêne mesurée (CLS 0,026 mobile) mais le prompt § C demande des polices préchargées. Correction : auto-héberger en woff2 sous-ensemble (Anybody 900, Archivo 400 et 600, Archivo Narrow 600) avec `font-display: swap` et `preload` du titre.

### F3-5 · Détails
(a) La colonne de droite de l'onglet Pizzas est vide sous « Suppléments » (d-06-scroll), à équilibrer en plaçant Suppléments à droite des classiques, ou en les alignant sur une ligne. (b) Les accolades de « Brasserie {C} » se lisent « (C) » dans la police du site (m-02-scroll) ; vérifier le nom exact chez le client. (c) `sitemap-0.xml` est publié pour un site `noindex` : incohérent ; le QA qui signale « pas de robots.txt ni sitemap » est périmé (les deux existent dans dist, sous la base).

## Faux positifs écartés
- QA « focus invisible : 2 » (Télécharger la carte, Réserver en ligne) : `getComputedStyle` donne `outline: 2px solid`, décalage 3 px, couleur teal (oklch 0,44 sur papier, 0,67 sur fond sombre) ; k-02 et h-01 montrent l'anneau. Rien à corriger.
- « 404 sans h1 » et `skipLinkFirst: null` : réponse brute du serveur ; `/404.html` a un h1 et `keyboard.stops[0]` est « Aller au contenu ».
- Motion « still », une seule page, pas de formulaire : décisions du thème et du prompt legacy, pas des défauts.

## Ce qui est bien (à ne pas casser à la révision)
1. Hero : titre en quatre lignes, photo carrée en duotone teal, remplit 828 px à 1440 et 772 px à 390, réservation immédiate.
2. Carte à onglets accessible (rôles tab/tabpanel, flèches, Home/End, repli sans script) avec prix alignés à droite et descriptions complètes fidèles au PDF.
3. Honnêteté du contenu : horaires marqués « à confirmer, les sources se contredisent », aucun avis ni chiffre inventé, mention KYW et noindex sur les deux pages.
