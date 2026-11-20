# Revue legacy · El Greco · passe 2
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site : fiche typographique crème et encre, titres en Didone, carte à filets et prix en chasse fixe, un seul trait bleu ; sobre, sans animation (inchangé depuis la passe 1).

Scores /10
- Design : 8. Le nom « El Greco » en Bodoni dans l'en-tête règle le défaut principal de la passe 1 (`eg2-head-390.png`, planche home `m-01`) ; reste un en-tête sans aucune identité à 360 px (F2-1).
- Usabilité : 7,5. 0 violation axe sur 18 cas, Tab : « Aller au contenu » puis « El Greco » ; mais le lien d'accueil mesure 111 x 0 px à 360 px et 20 px de haut à 390 et 412 px.
- Créativité : 6,5. Inchangé, parti pris réservé et cohérent, sans photo propre.
- Contenu : 7,5. Faits et prix inchangés (0 écart en passe 1, `carte.json` non touché) ; JSON-LD conforme à `donnees.json` ; F3 de contenu non repris (non annoncés dans REVISION-1).
- Technique : 8,5. 0 débordement, 0 erreur console, 0 requête en échec, 0 violation axe, 1 seul `<footer>`, SEO complet ; CLS bureau/mobile <= 0,016 et LCP mobile <= 864 ms (QA-revue2, captures postérieures au `dist`, réutilisées).

Méthode : dist (21:37) postérieur à `src/`, captures QA-revue2 (21:43) postérieures au dist : réutilisées. Les 3 planches (home, our-menu, « 404 ») lues. Script maison sur mon port 4823 (axe-core complet de node_modules, console, requêtes, débordement, balises, `<footer>`, cibles < 24 px, 6 pages dont `404.html` réel x 1440, 390, 360 px = 18 cas), puis script ciblé (en-tête 360, 390, 412, textes, Tab) et grep sur `dist/`. `sloplint` et `audit` non relancés (hors du périmètre de la correction, aucun cas d'AI slop visible). La « 404 » de la planche QA est la réponse brute de `serve.mjs` (non notée ; le vrai `404.html` : 0 violation axe, noindex, mention, logo).

## Vérification des corrections annoncées (REVISION-1)
- F1-1 nom de l'enseigne : CORRIGÉ à 390, 412 et 1440 px (texte « El Greco » visible, 141 x 20 px à 390, aucun chevauchement avec « Menu » sur `eg2-head-390.png`). NON corrigé à 360 px : voir F2-1.
- F1-2 SEO : CORRIGÉ. Sur les 6 pages : `canonical`, `og:title`, `link rel=icon`, `noindex`, 0 erreur console, 0 requête 404 (plus de `/favicon.ico`). JSON-LD `Restaurant` sur l'accueil seulement (1), adresse, téléphone, `geo` (50.4749656 ; 4.8775723, identiques à `donnees.json`), horaires jeudi, vendredi-samedi (2 plages), dimanche ; lundi à mercredi non inventés.
- F2-1 doublon de contentinfo : CORRIGÉ. `.pied` est un `<section>`, 1 seul `<footer>` par page (6 pages x 3 largeurs), `landmark-no-duplicate-contentinfo` disparu, 1 `.kyw-footer__logo`.
- F2-2 cibles de 24 px : PARTIEL. 0 lien de contenu sous 24 px à 1440 px ; à 390 et 412 px le lien-logo d'en-tête reste à 20 px (F2-2 ci-dessous), ce qui contredit « 0 lien isolé sous 24 px à 360, 390 et 1440 ».
- F2-3 mention des photos : CORRIGÉ (accueil et about-us seulement, absente de la carte, des boissons, du contact et de la 404) ; formulation voir F3-1.
- Mention « Maquette KYW… », noindex, `lang="fr"`, un seul `h1` : présents sur 18 cas sur 18.

## Findings
### F0 : aucun
### F1 : aucun

### F2 (mineurs)
- **F2-1 En-tête sans nom ni logo à 360 px (largeur courante d'Android).** `Nav.astro` : sous 24 rem le texte passe en visually-hidden (`clip`, 1 x 1 px) et le trait est masqué sous 40 rem. Mesure à 360 px : lien « El Greco, accueil » 111 x 0 px, rien de visible à gauche de « Menu » (`eg2-head-360.png`). Le nom, « Menu » et « Réserver » tiennent pourtant ensemble (77 + 76 + 117 px < 360). Conséquence : même défaut que F1-1 (enseigne absente de l'en-tête) sous 384 px, et lien d'accueil de hauteur nulle (focus clavier invisible). Correction : retirer le palier 24 rem (garder le texte visible dès 320 px) ou, au minimum, donner au lien une hauteur réelle.
- **F2-2 Lien-logo de 20 px de haut à 390 et 412 px** (141 x 20 et 163 x 20) : sous les 24 px de la règle de cible (`.lieu a, .contact a, address a, .note a` ne couvre pas l'en-tête). Correction : `min-height: 24px` (ou `padding-block: .15rem`) sur le lien de marque, `display: inline-flex; align-items: center`.

### F3 (finitions)
- **F3-1 Mention de photos redondante** : « Photographies d'ambiance : photographies de stock (Pexels), pas le restaurant. » (accueil, about-us) ; écrire « Photographies d'ambiance : banque d'images (Pexels), pas le restaurant. ».
- **F3-2 (reste de la passe 1, non repris)** `data-verify="avis Trustindex…"` toujours dans le HTML de l'accueil (`index.astro:52`) ; prix « 31 € », « 29 € », « 6 € » sans décimales à côté de « 29,90 € » (boissons) ; « Par téléphone au 081 20 07 47 ou par e-mail. » (about-us) et « appelez-nous ou écrivez-nous » (contact) déduisent un mode de réservation par e-mail ; texte d'histoire creux non marqué « à faire confirmer ».
- **F3-3 JSON-LD** : les horaires (« à confirmer » dans `donnees.json`) sont publiés comme fait structuré ; acceptable pour une maquette noindex, à signaler au client. URL canonique et `og:url` sur `kyw-test-restaurant.vercel.app` (hypothèse de REVISION-1, issue de `astro.config.mjs`).

## Ce qui est bien (à ne pas casser)
1. La carte : filets, Didone, prix en chasse fixe, 0 écart avec `donnees.json`, lisible à 390 px.
2. Le nom « El Greco » en Bodoni à 390 px, cohérent avec les titres, et le pied de page à une seule balise `<footer>`.
3. Le JSON-LD `Restaurant` sobre (aucune donnée inventée pour lundi à mercredi) et la sobriété visuelle sans reveal.
