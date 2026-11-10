# Revue awwwards · Le Servais · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : le bar est un arrêt de téléphérique : un câble vertical court le long de la page, une cabine glisse de station en station (9 h, 11 h 30, 18 h, 1 h), la page 404 s'appelle « Terminus » et le pied « Embarquement dès 9 h ».

Scores /10
- Design 8 : grille nette, Big Shoulders condensé noir sur gris clair, orange et turquoise tenus, bandeaux sombres pour les produits et le pied (`rl-home-a.png`, `rl-home-b.png`). Retenue : 4 photos seulement, un blanc de ~160 px sous le hero à 1440 et un grand vide à droite de « 1 H Terminus » (planche d-04).
- Usabilité 8 : CTA « Réserver » dans l'en-tête et dans le hero, téléphone et e-mail en clair, menu mobile `<dialog>` ouvert (5 liens, hauteurs 50 à 63 px), 0 cible < 24 px, focus visible (`k-02-focus`), carte à ancres sur 8 rayons, toutes présentes.
- Créativité 8 : la métaphore du téléphérique est réellement tenue (cabine collante, étiquette de station dans l'en-tête, « Terminus », « Embarquement ») sans WebGL ni loader ; la signature reste à 390 px.
- Contenu 7 : faits conformes à `donnees.json` (adresse, horaires, 76 lignes de carte, prix de groupes, presse), aucun avis ni équipe inventés ; mais quelques phrases déduites (F2 ci-dessous) et une table de produits recopiée sur deux pages.
- Technique 9 : build OK, 5 pages x 2 largeurs (1440 et 390) : 0 erreur console, 0 requête en échec, 0 violation axe (complet), 0 contraste mesuré < seuil sur 74 à 256 nœuds texte par page (canvas 1x1, après défilement), 0 débordement, 1 seul `h1`, `lang="fr"`, un seul `<footer>`, un logo KYW, mention présente, `noindex, nofollow` partout (conforme au prompt § 3.3). LCP mobile 1,1 s, CLS ≤ 0,004 (QA-revue1). Reduced-motion : 0 élément à opacité < 0,9.

Preuves non refaites (déjà dans QA-revue1.md) : vitals, FPS 60, clavier, hover. Preuves refaites : axe complet par page, contraste par nœud, débordement, liens, JSON-LD, dist (texte extrait des 5 pages), captures histoire, réservation, 404.html, menu mobile.

## Findings

F0 : aucun. F1 : aucun.

### F2 (majeurs légers, à corriger avant publication)
- **T-faux-1 · décompte de la carte** · `src/pages/carte.astro` (chapeau, ~l. 20) · le texte dit « 76 lignes de la carte Cuisine et extraits de la carte du bar » ; `carte.json` compte 76 lignes au total dont 59 en cuisine (10 + 22 + 18 + 4 + 5) et 17 en bar (8 + 4 + 5). Correction : « 76 lignes : la carte Cuisine et des extraits de la carte du bar » ou deux nombres exacts.
- **T-flou-1 · phrase du chapeau de carte** · même chapeau : « Prix en euros, boissons et suppléments compris selon le menu du client » est incompréhensible (rien n'est « compris » ; les suppléments sont dans les descriptions). Correction : la retirer, ou « Prix en euros ; le Margarita reste à confirmer ».
- **T-invente-1 · procédure de réservation** · `reservation.astro` (chapeau) : « Trois façons de prendre une table : en ligne, par téléphone ou par e-mail ». Le dossier ne dit rien d'une réservation par téléphone ou e-mail (seul `book.leservais.be` est établi ; téléphone et e-mail sont des coordonnées). Correction : « Réservez en ligne ; le bar est joignable au 081 73 65 52 et à hello@leservais.be ». Même défaut en moindre : « Écrivez-nous à hello@leservais.be pour une date » (groupes) est une procédure non prouvée ; écrire « Contact pour les groupes : hello@leservais.be ».
- **T-invente-2 · règle du 3 + 1** · `site.ts:63` : « le quatrième cocktail est offert » ; le dossier et le PDF disent seulement « 3 + 1 sur les cocktails, tous les jours de 18 h à 20 h ». Correction : reprendre l'intitulé tel quel (« 3 + 1 sur les cocktails, de 18 h à 20 h ») ou marquer la règle illustrative. La liste « Spritz, Moscow Mule, Negroni, Espresso Martini » existe dans la carte, elle est correcte.
- **T-repet-1 · table « produits » dupliquée** · home (« Les produits d'ici ») et `histoire` (« Les voisins de la carte ») affichent les mêmes 5 lignes (`site.ts` `produits`). Correction : sur Histoire, remplacer par un seul produit raconté (Boninne, par Marie-Cécile Crevits, source donnees.json l. 64) ou retirer la table. Le chapeau de la home affirme que ces cinq lignes « portent le nom de celui qui produit » : faux pour « Produits à Spy » et « Bière namuroise Houppe » (marques, pas des noms de producteur) ; la colonne « lieu » affiche « Carte du client » pour le camembert (ce n'est pas un lieu). Correction : « Cinq lignes de la carte citent leur origine. » et lieu `null` pour le camembert.

### F3 (finition)
- **T-note-1 · notes de carte non sourcées** · `carte.json:424` « Servi toute la journée » (cafés) et `carte.json:395` « Au bar » (bières) : absents de `donnees.json` et du PDF lu ; retirer ou marquer.
- **T-note-2 · terrasse « côté rue »** · `reservation.astro` : « Une terrasse donne sur la façade en pierre, côté rue » ; le `sujet` de la photo 02 dit seulement « terrasse devant la façade en pierre » ; retirer « côté rue ».
- **D-mobile-1 · table produits à 390 px** · capture `rl-home-m.png` (4e vignette) : le prix passe sur sa propre ligne sous le nom, et la colonne lieu flotte à droite ; aligner prix et lieu sur une ligne ou masquer le lieu sous 48 rem.
- **D-vide-1 · respirations** · hero 1440 x 900 : ~160 px vides sous la photo (d-01-hero) ; station « 1 h Terminus » sans photo avec ~300 px vides à gauche du texte (d-04). Réduire la hauteur minimale ou ajouter la photo 05 en station 1 h (marquée illustrative).
- **P-poids-1 · `src` de repli lourd** · `01-bar-comptoir…Z1rIIXK.webp` 468 Ko comme `src` par défaut de l'`<img>` du hero (l'avif servi aux navigateurs récents pèse 258 Ko) ; fournir un `src` de 1000 w. `og.png` 431 Ko : acceptable.
- **S-seo-1 · sitemap sur site noindex** : `sitemap-index.xml` publié alors que toutes les pages sont `noindex` ; sans conséquence pour une maquette (WARN connu de `audit.mjs`, non compté).

Faux positifs écartés : « 404 sans h1 / document-title / html-has-lang » du QA = réponse brute de `serve.mjs` ; `/404.html` mesurée directement : h1 présent, `lang="fr"`, title « Page introuvable | Le Servais », 0 violation axe. « Pas de robots.txt » : conforme à la leçon commune (WARN sous `base`). Contraste « à vérifier » axe (17 à 231) : 0 échec au calcul nœud par nœud.

Vérifié sans écart : nom, adresse (Rue des Fossés Fleuris 33, 5000 Namur), téléphone 081 73 65 52 (hypothèse documentée dans `site.ts`, l'autre numéro reste « à confirmer » du dossier), e-mail, horaires 9 h à 1 h / 2 h, cuisine 11 h 30 à 22 h / minuit, petit-déjeuner 9 h 30 à 11 h 30, formules de groupes (10, 25, 20, 18 € ; 12 à 30 assis, 50 debout, 60 pour le bar entier), presse RTBF (15 mai 2025, URL exacte), réseaux, lien de réservation `book.leservais.be`. JSON-LD `Restaurant` avec adresse, `openingHoursSpecification`, sans `geo` ni note. Photo 05 marquée « illustrative, origine à confirmer ». Liens internes : 4 pages en 200, 8 ancres de carte présentes, `#groupes` et `#horaires` présents. Pas de tutoiement, pas de tiret cadratin, mention « Maquette KYW, certaines données sont illustratives » et logo KYW sur les 5 pages.

## Ce qui est bien (à ne pas casser à la révision)
1. La métaphore du téléphérique (câble, cabine collante, stations, « Terminus », « Embarquement dès 9 h ») : cohérente de la home au 404, lisible sur mobile, sans loader ni WebGL.
2. Les faits : carte de 76 lignes confrontée au client, horaires et formules de groupes exacts, aucun avis, équipe ni chiffre inventé, photo douteuse étiquetée.
3. La rigueur technique : 0 erreur, 0 violation axe, 0 contraste en défaut, pied KYW unique, menu `<dialog>` à boucle Tab, reduced-motion sans contenu caché.
