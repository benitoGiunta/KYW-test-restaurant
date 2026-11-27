# Revue portfolio · La Bergerie de Lives · passe 1

Verdict : A_CORRIGER

Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une maison d'hôtes et un domaine de mariage vert sapin, hero photo plein écran puis grands chiffres rose poudré (1, 3, 20, 30, 2017) en filigrane, requalifiée sans restaurant (le dossier le prescrit).

Scores /10
- Design 7 : palette sapin et rose cohérente, hero d'accueil fort (`d-01-hero`), monogramme BL qui se remplit au scroll ; mais 5 pages intérieures ont un hero sans image, un demi-écran vide à droite à 1440 px (`P-1440-chambres`, `P-1440-seminaires`, `P-1440-contact`) et une seule photo de chambre sur la page Chambres.
- Usabilité 7 : navigation, tel et e-mail clairs, 0 débordement, 0 lien interne mort ; le curseur « Voir » de la galerie n'ouvre rien et la bande de galerie mobile n'est pas atteignable au clavier.
- Créativité 6 : la signature (rideau, filet, monogramme) est discrète ; le motif « eyebrow + titre + chiffre fantôme » se répète sur chaque section, la 404 « Rideau » est obscure.
- Contenu 5 : faits de base exacts (adresse, tél, e-mail, 20 €, 2017, 30 min), mais une attribution inventée, des notes de recherche affichées au client, des répétitions et du filler (« cadre d'exception »).
- Technique 8 : build OK, 0 erreur console, 0 requête en échec, 0 débordement, CLS 0, LCP mobile 1,4 s (QA-build), noindex, lang fr, un seul h1 par page ; reste 2 violations axe « serious » et un landmark `contentinfo` en double.

Preuves : mesure maison `scrollWidth`, axe-core 4.x et console sur 7 pages x 1440/390 (`brv1-mesure`, journal `.logs/brv1-mesure.log`), planches `P-1440-*.png` et `P-390-*.png` du scratchpad (8 vues par page, défilement par 0,9 écran), `QA-build.md` (accueil, chambres, 404, dist antérieur de 7 min au dernier build mais identique hors 404 d'après ETAT.md). `QA-revue1.md` était absent : captures faites par moi (ciblées, pas de shoot complet).

## Findings

Aucun F0 : build OK, 0 erreur console, 0 lien mort (6 pages internes, tel, mailto, OSM, presse vérifiés), mention « Maquette KYW, certaines données sont illustratives » et logo KYW sur 7 pages sur 7, `noindex, nofollow` sur 7 pages sur 7 (conforme au prompt § 3.3).

### F1 (majeurs)

- **F1-1 · T-invente · `src/data/site.ts:59` (page Le domaine, chapô).** « Le site actuel de la maison résume leur idée en une phrase : recevoir chez soi, plutôt que loger ou louer. » Cette phrase n'existe pas dans `site-actuel/` : le site dit « nous vous recevons chez nous » (`texte-mariage-et-location.txt:19`), rien sur « loger ou louer ». Attribution fausse au client. Correction : « Les propriétaires vous reçoivent chez eux » ou supprimer la phrase.
- **F1-2 · T-faux (à confirmer) · `site.ts:60` (Le domaine, § La maison).** « Aujourd'hui, la Bergerie ne tient plus de table ouverte » est affirmé comme un fait ; le dossier dit « renoncé au restaurant (à confirmer) » et « saluait » interprète L'Avenir. Correction : retirer la phrase ou la marquer « à confirmer », et citer seulement les deux titres d'articles.
- **F1-3 · T-invente apparent · h1 `Chambres d'hôtes` (`HeroPage.astro:12`).** Le filigrane « 3 » et le préfixe `sr-only` font lire « 3 Chambres d'hôtes » (nom accessible, `hs` du rapport) alors que la page écrit « le nombre de chambres n'est pas publié ». Idem « 1 Votre mariage », « 2017 Le domaine ». Correction : ne pas préfixer le h1 par le chiffre (supprimer le `sr-only`), et n'afficher un chiffre filigrane que s'il est prouvé (retirer le « 3 » de Chambres).
- **F1-4 · axe serious · `color-contrast` sur `/le-domaine/` (`.chiffre > span`, 1440 et 390).** Le « 2017 » filigrane est jugé illisible par axe. Correction : monter le contraste ou sortir le chiffre de l'arbre mesuré (`aria-hidden` n'exempte pas ici), ou le retirer au profit du chapô.
- **F1-5 · axe serious · `scrollable-region-focusable` sur l'accueil à 390 px (`.galerie__bande`, `base.css:159`).** Bande de galerie à défilement horizontal sans arrêt clavier. Correction : `tabindex="0"` + `role="region"` + `aria-label="Galerie du mariage"` sur la bande.

### F2 (mineurs)

- **F2-1 · Notes de recherche affichées au client.** `site.ts:111-112` : « (le site actuel ne publie pas de grille) », « Le nombre de chambres n'est pas publié par le site actuel » ; `:123` : « une source annonce 150 personnes, un annuaire 250 » ; pied de page de chaque page (7 sur 7) et contact : « Horaires d'accueil non publiés : appelez ou écrivez… ». Langage d'audit dans la bouche du restaurant. Correction : « Tarifs sur demande, par téléphone ou e-mail » avec le badge « à compléter », capacité « à préciser avec la maison » (sans les deux chiffres), horaires : retirer du pied de page.
- **F2-2 · Répétitions.** `/chambres/` : le chapô du hero et le premier paragraphe « Les chambres » sont identiques (WARN audit), petit déjeuner et piscine dits trois fois (section, « Services inclus », accueil) ; `/seminaires/` : « Un cadre d'exception pour vos réunions » en eyebrow et en chapô, expression creuse ; accueil : la photo `ceremonie-jardin` sert deux fois (chapitre 1 et fond « Vos événements »). Correction : un seul énoncé par fait, remplacer « cadre d'exception » par un fait (salles, véranda, jardin).
- **F2-3 · Photo hors sujet.** `/chambres/` § « Le petit déjeuner » montre `veranda-table-dressee` (verres, vases, cheminée, sujet « veranda table dressee ») et la même photo illustre « 30 minutes de visite » sur `/mariage/` : un décor de mariage présenté comme petit déjeuner. Correction : une autre photo (chambre, cuisine) ou retirer l'image.
- **F2-4 · Casse automatique fautive · `base.css:263` (`.horaires dt { text-transform: capitalize }`).** Rendus : « Sauna Et Jacuzzi », « Piscine Extérieure Chauffée », « Le Marché Du Samedi », « La Citadelle De Namur », « Les Caves À Vin », « Journée Piscine » (captures `P-1440-chambres`, `P-1440-le-domaine`). Correction : retirer `capitalize`, la casse vient des données.
- **F2-5 · Inférences non marquées.** Séminaires : « Chambres sur place pour prolonger la réunion », « Formules adaptées à la taille et à la durée » (`site.ts:134-135`) ; accueil et chambres : « Vous ne dormez pas à la Bergerie ? … ouverte aux visiteurs », « Le bassin du jardin, la tonnelle et les pelouses font partie de la promenade » ; Le domaine : « La forteresse qui domine la ville », « Le rendez-vous des producteurs en ville », « Visites et dégustations dans la région » (`site.ts:140-143`), alors que le site dit « caves à vins dans les souterrains de Namur » et « la plus belle citadelle d'Europe ». Correction : reprendre les formulations du site actuel ou marquer « illustratif ».
- **F2-6 · `landmark-no-duplicate-contentinfo` (moderate) sur 7 pages x 2 largeurs.** Le `<footer class="footer">` du site (`Footer.astro:8`) et celui du paquet KYW sont tous deux `contentinfo`. Correction : passer le pied du site en `<div>` ou `<section aria-label>` (ne pas toucher au paquet KYW).
- **F2-7 · Curseur « Voir » trompeur · `index.astro:95` (`data-cursor="Voir"`).** La galerie noir et blanc annonce « Voir » mais n'ouvre rien (ETAT.md le reconnaît). Correction : retirer `data-cursor` ou ajouter la lightbox.
- **F2-8 · Pages intérieures pauvres.** Chambres : une seule photo de chambre pour une maison d'hôtes ; Séminaires, Contact, Chambres : hero texte seul avec un demi-écran vide à droite à 1440 px. Correction : photo de hero ou composition à deux colonnes (`chambre.webp` en grand sur `/chambres/`, `veranda-salon` sur `/seminaires/`).

### F3 (finitions)

- **F3-1 · Typographie française.** 0 espace insécable sur 7 pages : 22 occurrences d'espace ordinaire avant « : », « ? », « ! » (`complet :`, `Bergerie ?`) ; risque de deux-points orphelin à 390 px. « coeur » (x2 sur Chambres), « noeud », « voeux » (alt, accueil) devraient être « cœur », « nœud », « vœux ». Correction : U+00A0 par Python sur `site.ts`, puis `œ` (lister les mots avant).
- **F3-2 · Slop léger.** Eyebrow au-dessus de chaque titre et chiffre fantôme (1, 3, 20, 30, 2017) sur presque chaque section ; 404 intitulée « Rideau » (h1 sans sens pour un visiteur) : préférer « Page introuvable ».
- **F3-3 · Alt et image.** Alt « Tonnelle de vigne » (`site.ts:77`) : le sujet du dossier est « tonnelle automne », la vigne n'est pas prouvée ; `veranda-salon.webp` (1024 px) rendu à 1440 px sur l'accueil (échelle 1,4).
- **F3-4 · Méta.** Description de `/le-domaine/` : « son histoire, ses jardins » ; le contenu n'a ni histoire développée ni section jardins.

## Ce qui est bien (à ne pas casser)

1. Le hero d'accueil (façade, titre Boska en capitales, bouton rose) et le monogramme BL qui se remplit au scroll ; bascule mobile pensée (hero plein écran, menu + « Nous écrire » toujours visibles).
2. Rigueur sur les faits clés : adresse, téléphone, e-mail, 20 € la journée piscine, 30 minutes de visite, 2017 conformes au dossier ; pas d'avis, d'horaires, de réseaux ni de prix de chambre inventés ; données manquantes marquées « à compléter » ou « illustratif ».
3. Technique propre : 0 débordement horizontal à 1440 et 390, 0 erreur console, 0 contenu caché en opacité 0 après défilement, un seul h1, JSON-LD `LodgingBusiness` avec adresse, pied KYW et noindex partout.
