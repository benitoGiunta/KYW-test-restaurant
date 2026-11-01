# Revue legacy · Chez Guillaume · passe 1
Verdict : PUBLIABLE (0 F0, 0 F1, 3 F2, 6 F3). Les F2 sont des finitions à traiter si une passe de révision a lieu, aucun ne bloque.
Lecture en une ligne de l'idée du site (avant DESIGN.md) : un site de comedy club sur fond crème papier, titres ronds noirs, rouge brique pour l'action, bords de papier déchirés ; l'agenda des spectacles est le cœur, le restaurant vient en soutien.

Sources de preuve : `QA-revue1.md` et ses planches (`.shots-chez-guillaume-legacy-revue1/`, captures postérieures au build : mtime report 19:32 > dist 19:26 > src 19:15), plus quatre contrôles ciblés de cette passe : texte extrait du `dist/` confronté à `donnees.json`, `dossier.md` et `site-actuel/` ; contraste calculé nœud par nœud (6 pages, bureau) ; liens du `dist/` ; captures pleine page des 4 pages intérieures et de `404.html` (bureau et mobile 390 px).

## Scores /10
- Design 7,5 : identité fidèle au client (logo manuscrit rouge, crème, rideaux rouille), hero « On va voir qui ? » lisible, photo de scène cadrée avec la carte « Prochains spectacles » qui la chevauche ; les pages intérieures (restaurant, FAQ, bon cadeau) sont sobres jusqu'à l'aridité (`rev1_planche_d`).
- Usabilité 8 : agenda en lignes avec bouton « Réserver » ou « Complet », 27 liens « Réserver » tous nommés par `aria-label` (« Réserver : Salva, jeudi 19 novembre »), onglets Menu du soir et Brunch fonctionnels (`aria-selected`, `#brunch` ouvre le bon panneau), 14 `details` en FAQ, burger mobile présent.
- Créativité 6,5 : bords de papier déchirés, carte qui chevauche la photo, bande rouge de privatisation ; le reste est un gabarit propre sans moment marquant.
- Contenu 8,5 : textes repris du site client, chaque fait retrouvé dans `donnees.json` ou `site-actuel/` (horaires, 29/39/49 €, brunch 35 € et 15 €, ticket 20 €, lundi 12 €, 081 26 25 65, hello@chezguillaume.be, IBAN du bon cadeau) ; aucun avis, chiffre ou nom d'équipe inventé ; alts conformes au champ `sujet` de `photos/index.json`.
- Technique 8,5 : build exit 0, 0 erreur console, 0 requête en échec, 0 débordement (10 mesures bureau et mobile), 0 violation axe sur les 3 pages réelles, LCP mobile 1056 ms, CLS 0,001, page la plus lourde 407 Ko, plus grosse image 122 Ko, contraste texte/fond : 0 écart sur 6 pages.

## Findings

### F2 (mineurs)
- **F2-1 · JSON-LD `Restaurant` absent** : `grep ld+json` donne 0 sur les 7 pages ; `src/layouts/Base.astro` n'en émet pas. Le prompt relecteur § C demande adresse et horaires structurés. Correction : un bloc `Restaurant` (nom, adresse Rue Lelièvre 4, 5000 Namur, téléphone, `openingHoursSpecification` lun-sam 18:00-00:00 et dim 10:00-18:00) dans `Base.astro`, à partir de `src/data/site.ts`. Les pages sont `noindex` : impact réel faible.
- **F2-2 · Barre fixe « Réserver un spectacle » sur mobile** : elle recouvre une ligne de l'agenda et masque en partie le bouton « Complet » (`home/m-03-scroll.png` : « Denis [barre] mplet »). Elle double le bouton « Réserver » déjà fixe dans l'en-tête. Correction : retirer la barre sous 700 px, ou lui ajouter un `padding-bottom` de page et la masquer pendant le défilement dans l'agenda.
- **F2-3 · Page `/restaurant/` : vide à l'ouverture sur l'onglet Brunch** : les liens d'accueil « La carte du mois » et « Les menus et le brunch » pointent tous deux vers `/restaurant/` (onglet soir) ; le panneau brunch n'est joignable qu'après un clic, alors que `#brunch` fonctionne. Correction : lier le brunch (carte de l'accueil « Le dimanche, brunch stand-up ») vers `restaurant/#brunch`.

### F3 (finitions)
- **F3-1 · « Mentions légales »** (pied de page, 7 pages) pointe vers `chezguillaume.be/politique-de-confidentialite/` : libellé trompeur. Renommer « Confidentialité » (`site.ts` `mentions`, `Footer.astro:24`).
- **F3-2 · Texte repris tel quel du client** : « Besoin d'infos ou des difficultés avec votre réservation ? » (pied de page, 7 pages) : lire « ou de difficultés ». Le titre « Certains lundis ou mardis, spectacle sans repas » (accueil) diffère de la ligne qui suit (« les lundis » seuls) : harmoniser avec la FAQ (« généralement un lundi ou un mardi »). Sur `/privatisation/`, le titre de la bande rouge « On y retourne quand ? » ne convient pas à une demande d'événement privé.
- **F3-3 · Agenda daté du 1er novembre** : la page `/agenda/` l'indique (« Programme relevé… le 1er novembre 2026 »), l'accueil non, et ses trois « Prochains spectacles » sont fixés dans `site.ts` : lignes périmées après le 16 novembre. Acceptable pour une maquette ; l'ajouter en note à l'accueil.
- **F3-4 · Titres sautés** sur `/bon-cadeau/` (h1 vers h3, WARN `audit.mjs`) : passer les trois blocs en h2.
- **F3-5 · En-tête translucide** : le texte défilant se voit à travers la pastille en bas de bureau (`home/r-02-mid.png`, ligne « 1 soirée… » sous la pastille) et le sous-titre du logo « restaurant & comedy club » fait ~7 px. Opacifier le fond de l'en-tête ; agrandir ou retirer ce sous-titre.
- **F3-6 · Méta et finitions** : `twitter:card` absent (6 WARN), pas de `robots.txt` ; polices Chillax servies depuis `api.fontshare.com` sans préchargement ; survol sans effet sur le logo et « Voir sur la carte » (`h-04`, `h-05`) ; photo « La salle » de 1000 px étirée à plein bureau (déjà signalée dans ETAT.md).

## Constats écartés (faux positifs, citer en cas de doute)
- Axe sur « 404 » (`document-title`, `html-has-lang`) et « 404 sans h1 » : c'est la réponse brute de `serve.mjs` ; `dist/chez-guillaume/legacy/404.html` a title, `lang="fr"`, un h1, noindex et pied de page (leçon commune).
- `keyboard.stuck: true` sur l'agenda : 45 appuis sur Tab donnent 45 arrêts distincts, pas de piège ; `skipLinkFirst: false` : `stops[0]` est « Aller au contenu ».
- « 2 textes cachés » en mouvement réduit : aucun texte à opacité < 0,1 sur les 4 pages mesurées sous `reducedMotion`.
- Axe « contrast needs review » (94 et 114) : arrière-plan texturé ; contraste calculé couleur contre fond plat sur chaque nœud texte : 0 sous 4,5 (3 pour les grands textes).
- Palette crème et brique : ce n'est pas le défaut générique, elle reprend l'identité du client (dossier § Identité). Pas de dégradé violet, pas d'eyebrow, pas de trois cartes égales, pas de chiffres décoratifs.
- Doublons « 2 services 29 €… » et « Riz au lait… » de `/restaurant/` : menu Cheffe et végétarien partagent ce dessert chez le client.

## Ce qui est bien (à ne pas casser)
1. Agenda en lignes avec `aria-label` complet par bouton, état « Complet » grisé distinct, heure affichée seulement quand le client la donne.
2. Zéro invention : avis, équipe et abonnés absents plutôt que fabriqués ; mention « Maquette KYW, certaines données sont illustratives », logo KYW unique et noindex sur les 7 pages.
3. Mobile pensé : titre, accroche, deux actions puis photo et carte qui la chevauche ; menu burger ; aucun débordement.

## Liens et méta vérifiés
Liens internes du `dist/` : 0 mort, 0 lien hors `/chez-guillaume/legacy/` ; externes : chezguillaume.be (fiches et billetterie présents dans `site-actuel/`), Facebook, Instagram, Maps = URL du dossier. Titres et descriptions uniques par page, OG image présente, favicon présent, `lang="fr"`.
