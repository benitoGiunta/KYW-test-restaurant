# Revue awwwards · Chez Guillaume · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : le site est une « conduite » de régie de spectacle : chaque section porte un time-code (18:30, 11:30, Fin) à gauche, le rideau rouge sert de transition, et la soirée se lit comme un déroulé repas puis scène.

Preuves : captures de l'agent captures (`.shots-chez-guillaume-awwwards-revue1/` : home, carte, 404 brut) lues par planche puis une à une ; captures ciblées ajoutées par moi pour les pages non couvertes par `--crawl` (`p-histoire/`, `p-reservation/`, `p-404html/`, sur `/404.html` réel, `--hovers 0`) ; texte extrait du `dist/` et confronté à `donnees.json`, `dossier.md` et `photos/index.json` ; contraste mesuré sur chaque nœud texte (canvas 1x1, opacité cumulée, 5 pages desktop après défilement). Build non relancé (dist de 19:31 postérieur aux sources, QA-revue1 : build OK). Serveur propre sur le port 4617, PID 5046, arrêté.

Scores /10
- Design 8 : système typographique cohérent (Tanker + Schibsted, rouge `#CD3B08`, rideau bordeaux), lisible à 1440 et 390 px (`d-01-hero`, `m-01-hero`) ; petits défauts d'alignement sur la liste de menus (F3-1).
- Usabilité 8 : CTA « Réserver une soirée » et téléphone au-dessus de la flottaison partout, 0 cible < 24 px, 12 arrêts de focus sans piège, burger mobile fonctionnel ; le champ « Spectacle de 15 h aussi ? » est un texte libre (F2-2).
- Créativité 8,5 : le time-code collant et le rideau comme transition (`d-90-transition-b`) donnent une vraie idée propre à un comedy club ; la 404 « On va voir qui ? » reprend le ton du site actuel.
- Contenu 8 : faits conformes à `donnees.json` (adresse, 081 26 25 65, hello@, prix 29/39/49 €, brunch 35/15/20 €, lundi 12 €, horaires FAQ), cheffe marquée « à confirmer », avis et chiffres absents ; une légende non prouvée (F2-1), quelques traits de ponctuation (F3-3).
- Technique 9 : 0 erreur console, 0 requête en échec, 0 violation axe sur les 5 pages réelles, LCP mobile 1,2 s, CLS mobile 0,02 (accueil) et 0 ailleurs, 60 FPS, 0 débordement, 0 texte caché en mouvement réduit, poids max ~402 Ko, JSON-LD Restaurant complet (adresse, horaires), canonical, OG 1200×630, `lang="fr"`, un seul h1 par page.

## Findings

### F2 (à corriger)
- **F2-1 · T-invente · `src/pages/carte.astro:53`** : la légende « Une assiette de la maison, hors menu du mois. » (photo du boudin) affirme que le plat n'est pas au menu du mois. Rien dans `donnees.json`, `dossier.md` ni `photos/index.json` ne le dit (le sujet de la photo est seulement « boudin, purée et compote, verre de vin rouge »). Aucune carte ne cite le boudin, mais cela ne prouve pas qu'il soit hors menu. Correction : « Une assiette de la maison. » ou « Boudin, purée et compote. » (alt déjà conforme à la photo : une main verse bien le jus, vérifié sur le fichier). C'est le seul écart bloquant la mention PUBLIABLE (« 0 invention non marquée »).
- **F2-2 · Usabilité · `src/pages/reservation.astro` (formulaire brunch, champ `spectacle`)** : le champ « Spectacle de 15 h aussi ? » est un `<input type="text" placeholder="oui ou non">` (capture `p-reservation/d-03-scroll.png`). Un choix binaire doit être une paire de boutons radio ou un `<select>` (oui / non), sinon la réponse arrive en texte libre dans le mail. Correction attendue : radios « Oui » / « Non » avec libellés, groupe `fieldset` + `legend`.

### F3 (finition)
- **F3-1 · Alignement · accueil, liste des menus** : sur la ligne active « Menu de la Cheffe », le point rouge décale le titre de 7 px vers la droite (x = 312 contre 305) et la colonne de prix de 7 px ; « 49 € » finit à x = 1414 alors que le filet s'arrête à 1407 (`home/d-04-scroll.png`). Correction : réserver la largeur du point (positionnement absolu dans la marge) pour que la ligne ne bouge pas.
- **F3-2 · Hover par couleur seule · accueil `h-02`, `h-04`, carte `h-06`** : « Appeler le 081 26 25 65 », « Lire la carte complète… » et le téléphone de la carte ne changent que la couleur du soulignement (QA-revue1). Ajouter un second signal (épaisseur ou décalage du soulignement).
- **F3-3 · Typographie française · accueil, carte, histoire** : au moins 15 « : » précédés d'une espace sécable (accueil et carte : « Photos : », « Polices : », « tables… : on dîne », « services : voici ») et des « « » suivis d'une espace sécable (« « face à la crise » » ×2, « « Chez Guillaume » » dans les titres de presse). Remplacer par U+00A0 (` `) pour éviter un « : » ou un « » » seul en début de ligne.
- **F3-4 · Citation tronquée · `histoire`, bloc Presse** : le titre L'Avenir du 11/09/2025 est coupé en « …huit mois après l'ouverture » alors que `donnees.json` donne « …après l'ouverture de « Chez Guillaume » à Namur ». Un titre de presse cité doit être complet ou finir par « … ».
- **F3-5 · Libellés · `histoire`** : le repère « Été 2025 » porte « Complet sur complet jusqu'au 30 juin » (30 juin n'est pas l'été ; la source dit « jusqu'au 30 juin 2025 »), et l'eyebrow « Ils sont venus » au-dessus de « Dans la presse » suppose une visite que le dossier ne prouve que pour La DH. Proposition : « Premier semestre 2025 » et « Presse ».
- **F3-6 · Non vérifié** : le formulaire brunch repose sur `action="mailto:…" method="post" enctype="text/plain"` ; le corps du message dépend du client mail (iOS Mail, Gmail web). Les liens mailto directs du même page marchent. Pas testé en réel, à signaler au client dans la maquette.

### Écartés (faux positifs ou conformes au prompt)
- 404 « sans h1, title, lang » de `QA-revue1` : réponse brute de `serve.mjs`. La vraie `/404.html` a `lang="fr"`, h1 « ON VA VOIR QUI ? », title « Page introuvable | Chez Guillaume », 0 violation axe (`p-404html/report.json`).
- `skipLinkFirst: false` : `keyboard.stops[0]` = « Aller au contenu ». WARN robots.txt/sitemap : sitemap présent sous `base` (`sitemap-index.xml`). `noindex, nofollow` conforme au § 3.3 du prompt.
- 29 / 17 / 21 / 12 « contrastes à vérifier » d'axe : mesurés nœud par nœud, 0 échec ; seul le « : » clignotant de l'horloge (1,5:1) est sous le seuil, décoratif.
- Phrases répétées de la carte (prix, « Riz au lait… ») : ce sont les données du dossier (deux menus partagent le dessert).
- Liens : 4 pages internes + 404 répondent 200 sur le serveur local, 6 ancres `#…` de la carte existent, aucun lien `base` cassé ; liens externes = URL de `donnees.json` (non appelés, hors réseau).

## Ce qui est bien (à ne pas casser à la révision)
1. Le time-code collant à gauche et la fermeture « Fin de conduite / Rideau. » : une idée de site propre à un comedy club, tenue sur les 5 pages et conservée en mobile (barre de régie sous l'en-tête).
2. Honnêteté du contenu : « Carte relevée en octobre 2026 », « à confirmer pour 2026 », « Horaires du site actuel, à confirmer par téléphone », « Ce formulaire n'envoie rien lui-même », aucun avis ni chiffre inventé, alt fidèles à `photos/index.json`.
3. Performance et accessibilité : 60 FPS, LCP mobile ~1,2 s, 0 axe, focus visible, mouvement réduit propre ; pied de page avec la mention et un seul logo KYW sur chaque page, `noindex` partout.

Décompte : F0 0 · F1 0 · F2 2 · F3 6.
