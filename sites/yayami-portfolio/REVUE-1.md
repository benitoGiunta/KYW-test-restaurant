# Revue portfolio · Yayami Sushi · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une enseigne au néon rouge sur ardoise noire (« SUSHI À NAMUR » en tubes qui crépitent), des photos de plats sur fond noir en volets et en mosaïque, et une commande en ligne omniprésente (barre « Appeler / Commander » fixe).

Hypothèses de revue : `QA-revue1.md` et `.shots/` absents (seul `.shots-yayami-portfolio-build/`, 3 pages, daté 23:16-23:26 donc antérieur au dernier build de 23:35). `dist/` plus récent que `src/` : réutilisé tel quel, mesures refaites par scripts maison (axe-core de node_modules, 7 pages dont `404.html` réel x 1440 et 390 px, défilement par 300 px, contraste canvas, CDP CPU x4 + 4G en 2 passes, reduced-motion, Tab). Serveur propre sur le port 4811, arrêté.

Scores /10
- Design 8 : identité forte et cohérente (néon rouge #ff4438, volets de photos, bandeau KYW clair), planches home/carte/maison 1440 et 390 propres ; points faibles : vides sur mobile, titres en contour fins.
- Usabilité 8 : carte à puces collantes + scrollspy, barre fixe Appeler/Commander, Tab OK (14 arrêts, contour visible partout), 0 lien mort ; pas de lien « Commander » dans l'en-tête sous 520 px (barre basse en compensation).
- Créativité 7 : signature « enseigne » mémorable, mais gabarit Nocturne reconnaissable, `/maison/` réduite à une photo et 4 phrases.
- Contenu 6 : 56 prix et noms confrontés à `donnees.json` : 0 écart ; mais 2 affirmations non prouvées, description de l'accueil bancale, fortes répétitions.
- Technique 8 : 0 erreur console, 0 requête en échec, `scrollWidth` = fenêtre sur 14 cas, LCP mobile CPU x4 + 4G 1,56 à 1,99 s, CLS 0 à 0,01, 2 violations axe moderate seulement.

## Findings
Aucun F0 : build `dist/` présent et à jour, 0 erreur console, 0 lien mort (18 liens, 11 URL testées en 200), mention « Maquette KYW, certaines données sont illustratives » + 1 logo KYW (`.kyw-footer__logo`) + `noindex, nofollow` sur 7/7 pages, un seul h1 par page, `lang="fr"`, JSON-LD Restaurant (adresse, géo, horaires) sur chaque page, `og:image`, favicon, 404 designée (`/404.html`).

### F1
- **F1-1 · T-invente · `src/data/site.ts` (`accroche.complementAdresse`, `accroche.maison`)** : « Rue de Bruxelles, au centre de Namur. » (accueil, bloc « Venir ») et « Un restaurant japonais de quartier » (méta description et chapeau de `/maison/`) ne figurent ni dans `donnees.json` ni dans `dossier.md` (le dossier dit seulement « Rue de Bruxelles 15, 5000 Namur »). Preuve : texte extrait du `dist/` (`index.html`, `maison/index.html`) confronté au dossier. Correction : retirer « au centre de Namur » et « de quartier » (ex. « Un restaurant japonais au 15 rue de Bruxelles, à Namur : des sushi, des plats chauds et la commande en ligne. »).

### F2
- **F2-1 · Méta description de l'accueil fausse par omission** : « Ouvert 7 jours sur 7, de 18h à 22h le soir » (`src/pages/index.astro:18`, via `serviceSoir`) : le midi (12h à 14h) disparaît, la phrase se lit comme « ouvert tous les soirs seulement ». Preuve : `<meta name="description">` de `index.html`. Correction : « Ouvert 7 jours sur 7, de 12h à 14h et de 18h à 22h » (`site.regles[0]`).
- **F2-2 · axe `landmark-no-duplicate-contentinfo` (moderate)** sur les 14 cas : `.footer` du site + `kyw-footer` = deux `contentinfo` de premier niveau. Correction : passer le pied du site en `<div>` ou `<section aria-label="Contact">` en gardant le `<footer>` du paquet KYW (ne pas repeindre le paquet).
- **F2-3 · axe `region` (moderate)** sur les 14 cas : le texte des coins fixes (`.coin--gauche > span`, « Appeler » / « Commander ») est hors de tout landmark. Correction : envelopper `Coins.astro` dans `<nav aria-label="Contact rapide">`.
- **F2-4 · Répétitions** : les horaires apparaissent 4 fois sur l'accueil (statut du hero, « À savoir », bloc « Venir », pied de page) et 2 fois ailleurs ; « Livraison gratuite à partir de 30 €, dans sept codes postaux autour de Namur » 3 fois sur l'accueil, 2 sur `/commander/` ; « 10 % de remise » 5 fois (audit WARN). Correction : sur l'accueil, supprimer le tableau d'horaires du bloc « Venir » (le pied de page le porte) et ne garder qu'une des deux phrases de livraison (le mode « Livraison » suffit) ; sur `/commander/`, retirer la règle livraison déjà dite par la page `/livraison/`.
- **F2-5 · Loader trop long** : `html.is-loaded` arrive 2,7 s après `load` sans limitation (seuil 2,6 s), et 4,3 à 6,1 s sous CPU x4 + 4G (accueil 6,1 s) : le contenu est retenu derrière le rideau d'ouverture. Correction : plafonner le loader à ~1,8 s et ne pas le conditionner à la fin des polices/images.
- **F2-6 · Mobile 390 px, vides** : sur l'accueil et `/maison/` la scène collante laisse ~300 px de noir entre la phrase et le titre suivant (planche `home-390`, vues 4-5 ; `maison-390`, vue 1). Correction : réduire la hauteur de la scène (`--s`) sous 520 px ou remonter le contenu suivant.
- **F2-7 · `/maison/` mince** : un titre, 4 phrases courtes (dont 2 répétées de l'accueil mot pour mot) et une mosaïque ; aucun contenu propre à la page. Correction : soit fusionner `maison` dans l'accueil, soit y ajouter un contenu vrai et distinct du dossier (liste des spécialités avec prix de départ : nigiri 4,50 €, maki dès 5,50 €, temaki 6 €, udon dès 15,80 €), sans rien inventer.
- **F2-8 · Titres de carte/boissons en contour fin (desktop, pointeur fin)** : « ASAHI », « KIRIN ICHIBAN », « SAPPORO » à ~20 px en trait rouge de 1 px sur noir (planche `boissons-1440`) : lisibles mais fatigants, contraste du trait non mesurable par axe. Correction : remplir les tubes en dessous de ~32 px (comme sur mobile, où ils sont pleins).

### F3
- **F3-1 · Numéros décoratifs 01/02/03** devant chaque ligne de carte, règle de « À savoir », menu et box (home, carte, commander) : chiffres sans fonction (pas d'ordre ni de numéro de plat côté client). Correction : les retirer ou les remplacer par un simple filet rouge.
- **F3-2 · Alt** : « Maki saumon grillé, photo de la carte (Maki) » (`/maison/`) reprend le champ `sujet` tel quel (méta-texte) ; « …, fond noir » dans 8 alt décrit le fond, pas le plat ; « Nouilles sautées au boeuf » sans ligature (le plat s'appelle « Nouilles udon au bœuf »). Correction : « Maki au saumon grillé », retirer « fond noir », « bœuf ».
- **F3-3 · Apostrophes droites** (`l'emporter`, `d'algues`, `n'existe`…) : 4 sur l'accueil, 3 sur `/livraison/`, 2 sur 404 ; passer en ’ comme le reste de la typographie. Correction : remplacer dans `site.ts` et les `.astro`.
- **F3-4 · « limonade japonaise à bille »** (`accroche.boissons`) : détail de produit absent du dossier (déduit des marques, comme « Bière japonaise »). Correction : « la limonade japonaise ramune » ou marquer l'hypothèse dans RAPPORT.md (déjà signalée pour « Bière/Limonade japonaise »).
- **F3-5 · Mobile** : nav en 4 liens posée directement sur la photo du hero (« La maison », « Livraison » touchent le rouleau) : lisible, mais sans voile ; pas de « Commander » en haut sous 520 px.
- **F3-6 · `robots.txt`/sitemap** : présents dans `dist` (le WARN de l'audit est un faux positif). `<link rel="canonical">` de la 404 pointe sur `/404/` : cosmétique (page noindex).

### Faux positifs écartés
`skipLinkFirst: false` (Tab 1 = « Aller au contenu »), axe 404 `color-contrast` (fondu d'entrée), texte « Appeler/Commander » à opacité 0 en bas de page (coins qui s'effacent près du pied, présents ailleurs), `?img` du test de contraste sur les titres en tube (fond à dégradé, jugés sur capture : rouge/blanc sur noir), puces de carte à `right < 0` sur 390 px (rangée défilante).

## Ce qui est bien (à ne pas casser)
1. Signature « enseigne » : titre en tubes qui s'allume, volets de photos du hero, tout en reduced-motion sans texte caché (0 sur accueil et carte ; `scrollWidth` = fenêtre).
2. Carte exacte : 47 plats + 9 menus/box, noms, prix et descriptions identiques à `donnees.json` (0 écart), puces collantes avec scrollspy ; prix à virgule non tabulaires.
3. Honnêteté du contenu : pas de faux avis, pas d'e-mail, pas de réservation inventée, horaires du jour marqués en heure de Bruxelles, JSON-LD complet, pied de page KYW conforme.
