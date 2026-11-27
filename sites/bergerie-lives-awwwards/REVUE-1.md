# Revue awwwards · La Bergerie de Lives · passe 1

Verdict : A_CORRIGER

Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : un domaine de pierre « clos » (battants qui s'ouvrent sur la façade, cadres d'angle dorés, fond vert forêt et sable), maison d'hôtes et domaine de mariage, qui se referme sur « ceux qui l'ont choisi ».

Hypothèse de périmètre : le dossier requalifie le lieu (ce n'est pas un restaurant) en maison d'hôtes et domaine de mariage ; je juge le site dans ce cadre, JSON-LD `LodgingBusiness` attendu.

Sources de preuve : `QA-revue1.md` et planches (accueil, le-domaine, 404 brute), dist (08:34) antérieur aux captures (08:37), réutilisés. Pages jamais captées par le QA (histoire, reservation, `404.html` réelle) : 1 script ciblé (3 largeurs 1440, 1024, 390, console, requêtes, axe-core, débordement, cibles, tailles de police) + planches `.shots-bergerie-lives-awwwards-revue1/cible/planche-*.png`. Serveur local port 4611 arrêté (kill 717). Liens internes et ressources : 11 URL en HTTP 200 (pages, `404.html`, `og.png`, favicons, sitemap).

## Scores /10
- Design 7,5 : palette vert profond, sable et or tenue sur 5 pages, titres Young Serif de grand corps, cadres d'angle récurrents ; photos de domaine bien choisies (`home/planche.png`). Pages histoire et réservation plus plates (peu de matière, grands vides sombres).
- Usabilité 7 : appel (tel) et visite toujours à portée, menu plein écran au téléphone, 0 cible tactile < 24 px, focus visible sur tous les arrêts (`k-*`). Le CTA « Réserver une chambre (site officiel) » renvoie vers une page que le dossier décrit comme vide.
- Créativité 7 : battants d'ouverture, rideau à deux battants entre pages, repos des piquets, signature du « Clos » cohérente jusqu'à la 404 (« Cette barrière ne s'ouvre sur rien »). Pas de pièce vraiment inattendue ensuite.
- Contenu 6,5 : texte propre à ce domaine, aucun chiffre ni avis inventé ; mais plusieurs détails non prouvés (F2), répétitions fortes entre accueil et « Le domaine », ponctuation française incomplète.
- Technique 7,5 : build OK (5 pages), 0 erreur console, 0 requête en échec, 0 débordement horizontal (`sw == cw` à 1440, 1024, 390), LCP mobile 1000 ms (le-domaine) et 2408 ms (accueil), CLS ≤ 0,016, reduced-motion sans texte caché, noindex et mention sur chaque page. Défauts d'accessibilité et de poids ci-dessous.

## Findings

Aucun F0 : 0 fait faux contre `donnees.json` (nom, adresse, tél. +32 493 86 10 29, e-mail, 20 € la journée piscine, avril à octobre, visite de 30 min, presse 2013 et 2017 : tous conformes), 0 chiffre, avis ou récompense inventé, 0 lien mort.

### F1 (majeur)
- **F1-1 · `aria-prohibited-attr` serious sur histoire, le-domaine** (axe, 1440, 1024 et 390) : `<p class="display final__titre" data-split="lines" aria-label="Le reste se visite.">` (SplitText pose un `aria-label` sur un `p` sans rôle). Le report.json du QA ne l'a pas vu (page histoire non captée ; sur le-domaine le même motif). Preuve : `cible` axe, 2 pages × 3 largeurs. Correction : ne plus poser d'`aria-label` sur les `p` découpés par `data-split` (garder le texte lisible dans le nœud, `aria-hidden` sur les lignes générées), ou donner un rôle qui admet le nom (par exemple `role="heading"` s'il s'agit d'un titre). Vérifier les autres `data-split="lines"` (home, le-domaine, reservation, 404 : axe n'y trouve rien aujourd'hui).

### F2 (mineur)
- **F2-1 · `landmark-no-duplicate-contentinfo` (moderate) sur les 5 pages** : `<footer class="pied">` du site et `<footer class="kyw-footer" aria-label="Réalisation">` du paquet sont tous deux `contentinfo`. Correction : rendre le pied du site non-`contentinfo` (`role="group"` + `aria-label`) ou le pied KYW `role="complementary"` ; ne pas toucher au bandeau clair du paquet (leçon commune).
- **F2-2 · Ponctuation française : 0 espace insécable** dans les 5 pages (compté sur le dist : 0 U+00A0 avant `:` `;` `?` `!` `»`, 19 espaces ordinaires avant `:`). Cas visibles : « Pas de carte ici : la maison » (le-domaine), « Pas de carte ici : », « a laissé son nom : la presse » (histoire), « La DH, 19 avril 2013 : La Bergerie… » (histoire), « Photos : La Bergerie de Lives » (pied, toutes pages), « Site officiel actuel : bergerielives.be ». Un retour à la ligne peut isoler les deux-points en début de ligne. Correction : U+00A0 avant `:` `;` `?` `!` et dans `« »` (Python, pas `perl`). Aussi « 20 / € » en deux nœuds : prix collé par un insécable.
- **F2-3 · Détails non prouvés par le dossier, non marqués illustratifs** : (a) histoire : « Un ancien restaurant étoilé y a laissé son nom » (le dossier dit seulement « ancien restaurant étoilé », DH 2013 ; « laissé son nom » est une déduction), et « au bord de la Meuse » ; (b) histoire et accueil : « une demi-heure pour parcourir le jardin, la véranda et les chambres » (le dossier ne dit que « visite de 30 min ») ; (c) le-domaine, séminaires : « la véranda, le jardin et la piscine pour respirer entre deux séances » et « Hébergement sur place » ; (d) accueil, le-domaine, reservation : « à quelques minutes de Namur » / « à quelques minutes de la citadelle, des musées Rops et Trema et du marché du samedi » (le dossier dit « proches » ; aucune durée). Correction : ramener à la formulation du dossier (« proches ») ou marquer illustratif ; supprimer la phrase « laissé son nom ».
- **F2-4 · Répétition entre sections** : le bloc « Sur place / Pour tous les hôtes » (piscine, jacuzzi, petit déjeuner bio, cuisine partagée, wifi + « 20 € ») est identique sur l'accueil et le-domaine ; sur le-domaine, le même contenu paraît trois fois (liste de la section Chambres, bloc « Pour tous les hôtes », phrase d'intro) ; « Journée piscine à 20 €… au 0493 86 10 29 » apparaît aussi sur reservation (3 pages) ; « Le domaine se ferme derrière vous. » clôt les 5 pages. Preuves : textes extraits du dist, planches home et le-domaine. Correction : garder le bloc complet sur une seule page, réduire l'autre à un renvoi.
- **F2-5 · Poids du dist** : 23 JPEG sources (jusqu'à 885 Ko, `08-ceremonie-assemblee`) sont livrés dans `dist/_astro/` à côté des webp ; 6 webp dépassent 300 Ko (`07-ceremonie-laique-jardin` 612 Ko). Les dist sont commités et chaque déploiement Vercel en garde une copie. Correction : purger les JPEG sources du dist (déjà noté dans `ETAT.md` du site) et recompresser les webp > 300 Ko.

### F3 (finition)
- **F3-1 · En-tête mobile 390 px** : « La Bergerie de / Lives » sur deux lignes à côté de « Appeler » et « Menu » (`m-01-hero`, toutes pages). Accepté par le constructeur ; un nom abrégé ou une taille réduite à 390 éviterait la césure.
- **F3-2 · Image agrandie au bureau** : reservation, `02-cour-domaine` servie en 489 px de large pour 671 px affichés à 1440 (srcset 480w/800w, `sizes: 34vw`) ; ajouter un cran 960w ou `sizes` plus juste.
- **F3-3 · Même photo deux fois sur le-domaine** : `17-chambre-boisee` est affichée deux fois dans la section Chambres (même alt). Remplacer la seconde par une autre vue ou supprimer.
- **F3-4 · Presse sans lien** : histoire cite La DH et L'Avenir (titres et dates exacts) sans lien vers les articles dont `donnees.json` donne les URL ; ajouter les liens (rel noopener). « Lisa et Christophe » (titre cité) contredit « Lisa et Martin » du site actuel (dossier : à confirmer) : acceptable en citation, à signaler au client.
- **F3-5 · Lien « Réserver une chambre (site officiel) »** vers `https://www.bergerielives.be/reservations` : le dossier décrit cette page comme vide hormis le contact. Je n'ai pas pu la tester (réseau). Garder si le client confirme le bouton Wix, sinon renvoyer vers l'e-mail.
- **F3-6 · LCP mobile de l'accueil 2408 ms** (seuil 2,5 s, marge de 90 ms, 4G lente ralentie 4x) ; 21 éléments « contraste à vérifier » côté axe (accueil) et 20 (le-domaine) non tranchés : mesurer en priorité les libellés dorés minuscules sur sable (« AVANT DE VENIR », « DANS LA PRESSE »).

### Faux positifs écartés (cités par le QA)
- Violation `color-contrast` serious et cible tactile 128x20 de la « 404 » : c'est la réponse brute de `serve.mjs` (page du dépôt, sans rapport avec le site). La vraie `404.html` du site : 0 erreur, 0 cible < 24 px, h1 « Cette barrière ne s'ouvre sur rien. », lang fr, noindex, mention présente (axe : seulement F2-1).
- WARN `robots.txt` et sitemap de `audit.mjs` : `sitemap-index.xml` et `sitemap-0.xml` répondent en 200 sous la base ; pas d'écart.
- Débordement signalé par mes mesures sur l'accueil (`.battant`, `.mur__img`, jusqu'à 1869 px) : éléments de mise en scène hors cadre, `scrollWidth == clientWidth` à 1440, 1024 et 390 ; pas de défaut.
- `noindex, nofollow` : conforme au prompt de production (§ 3.3 pour portfolio et awwwards).

## Ce qui est bien (à ne pas casser à la révision)
1. Le concept « Clos » tenu de bout en bout : battants du hero, cadres d'angle dorés, rideau de transition, 404 sur le thème de la barrière ; 0 console, 0 requête en échec, 60 FPS mesurés.
2. Honnêteté des données : aucune note, aucun avis, aucun horaire inventé (« Les horaires d'accueil ne sont pas publiés : le plus simple est de téléphoner »), et le texte assume « pas de carte ici : la maison reçoit ».
3. Fondamentaux solides : un seul `h1` par page, `lang="fr"`, lien d'évitement, JSON-LD `LodgingBusiness` avec adresse, téléphone et équipements du dossier, `og.png`, favicons et sitemap en 200, pas de débordement à 390, mention KYW, logo et noindex partout.
