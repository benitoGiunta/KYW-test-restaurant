# Revue legacy · El Greco · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : fiche typographique sobre, crème et encre noire, titres en Didone (Bodoni) qui ressemblent à un menu imprimé, lignes de carte à filets avec prix en chasse fixe, un trait bleu pour seule couleur ; aucun effet, aucune animation.

Scores /10
- Design : 7,5. Hiérarchie nette, rythme de filets constant, mobile pensé (menu popover, lignes à 56 px) ; le logo de l'en-tête est un trait de pinceau sans nom (F1-1) et la photo de stock en noir et blanc fait seule le décor (planches home, `aboutus-390-0`).
- Usabilité : 8. Menu mobile ouvert/fermé par Échap vérifié, formulaire : 5 champs invalides + focus sur le premier, message honnête « Rien n'a été envoyé » une fois valide, focus 2 px visible, premier Tab = « Aller au contenu » ; cibles de liens isolés à 21 px au bureau (F2-2).
- Créativité : 6,5. Parti pris cohérent (Specimen, repères de guides en 1 px sous le titre) mais très réservé, sans photo propre au lieu ; correct pour du legacy.
- Contenu : 7,5. 62 plats confrontés à `donnees.json` : 0 écart de nom, de prix ni de description ; horaires lundi à mercredi « À confirmer », photos étiquetées stock, avis sans note inventée ; reste du texte client un peu creux (F3-1).
- Technique : 6. Build OK (6 pages), 0 débordement (390 et 1440 sur les 6 pages), CLS ≤ 0,02, LCP ≤ 750 ms ; mais aucun JSON-LD, OG, favicon ni canonical, une erreur console (favicon) et un doublon de `contentinfo` sur chaque page.

Méthode : QA-revue1.md et ses 3 planches lues (home, our-menu, 404 brute) ; pages non capturées (about-us, carte-des-boissons, contact) et `404.html` réel mesurés et capturés par script maison sur son port 4811 (axe-core complet, console, requêtes, débordement, images, cibles, 6 pages x 1440 et 390 px), puis menu mobile, formulaire, Tab et reduced-motion. Aucun lien mort relevé (0 réponse >= 400 hors favicon). Hypothèse : `sloplint` non relancé (non fait par le constructeur, aucun cas d'AI slop visible : pas d'eyebrow, pas de trois cartes, pas de dégradé, pas de reveal).

## Findings
### F0 : aucun

### F1 (majeurs)
- **F1-1 Nom de l'enseigne illisible dans l'en-tête (toutes les pages).** `src/components/Nav.astro:9` affiche `public/img/el-greco-logo.png` ; ce fichier (`photos/05-logo.png`, détourage « removebg ») ne contient qu'un trait de pinceau bleu, le lettrage a disparu (vérifié sur fond crème et blanc, aucun pixel clair). Preuve : `planche.png` home, `aboutus-1440-0.png`, `eg1-menu390.png` : une tache bleue sans mot. L'alt est vide, le nom n'existe que par `aria-label`. Seul le pied de page écrit « El Greco ». Correction : écrire « El Greco » en texte (Bodoni, même taille que les titres de ligne) à côté ou à la place du trait, ou retirer l'image ; garder `aria-label` ou texte visible, jamais les deux sources divergentes.
- **F1-2 Métadonnées et SEO manquants sur les 6 pages.** `src/layouts/Base.astro:12-23` : 0 JSON-LD (le prompt § C exige `Restaurant` avec adresse et horaires structurés), 0 `og:*`, 0 `canonical`, 0 `link rel=icon`. Conséquence mesurée : `GET /favicon.ico` = 404, seule erreur console (home, bureau), ce qui interdit PUBLIABLE. Audit : 90 WARN dont ces absences. Correction : JSON-LD `Restaurant` (nom, adresse Rue de Sardanson 22, 5004 Bouge, `telephone`, `geo`, `openingHoursSpecification` jeudi 18-22, vendredi et samedi 12-15 + 18-22, dimanche 18-23, sans inventer lundi à mercredi), `og:title/description/type`, `canonical` (avec `noindex` conservé), favicon (data URI ou fichier sous le `base`) ; l'image OG peut être omise si aucune photo propre.

### F2 (mineurs)
- **F2-1 `landmark-no-duplicate-contentinfo` (moderate) sur les 6 pages.** Deux `<footer>` de premier niveau : `.pied` (`src/components/Footer.astro:5`) et celui de `@kyw/footer`. Preuve : `eg-rev1-mesure.log`, `footers: 2` partout, axe `.pied`. Correction : transformer `.pied` en `<div class="pied">` (ou `<section aria-label="Coordonnées">`) ; ne pas toucher au pied KYW (un seul logo : 1 `kyw-footer__logo`, 1 `kyw-signature`, vérifiés).
- **F2-2 Liens isolés de 21 px de haut au bureau** : téléphone, e-mail, « Itinéraire », « Lire notre histoire » (home 6, contact 6, our-menu 3 ; 404 : « la page d'accueil » 20 px, aussi à 390 px). Hors phrase, donc non exemptés de la règle des 24 px. Correction : `display: inline-block; padding-block: 0.15rem` ou `min-height: 24px` sur `.lieu a, .contact a, address a, .note a`.
- **F2-3 Mention d'origine des photos affichée là où il n'y a pas de photo** : `Footer.astro:19` « Photographies d'ambiance : banque d'images (Pexels), à remplacer par celles du restaurant. » apparaît aussi sur la carte, les boissons, la contact et la 404, ce qui fait croire à des images absentes et dit « à remplacer » au visiteur. Correction : ne l'afficher que sur l'accueil et Notre histoire (les deux pages avec photo), formulée comme les légendes (« Photographie de stock, pas le restaurant »).

### F3 (finitions)
- **F3-1 Texte repris du client, creux et non daté** : `site.ts:58-59` « avec passion et fierté », « héritage gastronomique riche et précieux », « l'amour qu'une mère mettrait… héritées de nos ancêtres » ; texte exact du site d'origine mais la page « Notre histoire » n'a que ces deux phrases, alors que le dossier signale un changement de propriétaire récent à confirmer. Correction : garder la citation, ajouter une ligne « Texte repris du site d'origine, à faire confirmer » comme sur les avis, ou la rendre en citation.
- **F3-2 Prix entiers affichés sans décimales** : « 31 € », « 29 € », « 28 € », « 6 € » (`carte.json:273-303`) à côté de « 29,90 € » dans la même liste (boissons) ; les données disent 31.00, 29.00, 6.00. Correction : « 31,00 € » dans la liste pour un alignement constant (la colonne de chiffres en chasse fixe l'y invite).
- **F3-3 Procédure déduite** : `Resa.astro:9` « Par téléphone au … ou par e-mail. », `contact.astro:9` « appelez-nous ou écrivez-nous » ; le dossier ne prouve que le téléphone et le bouton « Réservation » du site (cible non vérifiée). Correction : « Téléphone : … · E-mail : … » sans promettre un mode de réservation par e-mail.
- **F3-4 Résidu de travail dans le HTML** : attribut `data-verify="avis Trustindex…"` sur `section.avis` de l'accueil (`index.astro:52`) ; invisible mais lisible dans le source. À retirer au build final.
- **F3-5 Polices** : 13 `.ttf/.otf` livrés (521 Ko sur about-us et contact selon QA), Google Fonts chargé en CDN avec 3 familles ; préférer woff2 locaux (non bloquant, LCP mobile 748 ms).

## Vérifié sans écart
- Faits : nom, adresse (Rue de Sardanson 22, 5004 Bouge (Namur)), 081 20 07 47 (`tel:+3281200747`), e-mail, Facebook et Instagram du dossier, horaires jeudi à dimanche identiques à `donnees.json` avec « À confirmer » pour lundi à mercredi ; « 36 lignes de carte » recompté (6+7+7+8+1+1+3+3). Les trois avis cités sont mot pour mot ceux de `donnees.json`, sans note ni nombre d'avis.
- `noindex`, `lang="fr"`, un seul `h1`, `<title>` et description uniques, mention « Maquette KYW, certaines données sont illustratives » et logo KYW (un seul) sur les 6 pages dont `404.html`.
- Aucun débordement horizontal (scrollWidth = fenêtre sur 12 cas), 0 requête en échec hors favicon, reduced-motion : 0 texte caché, 0 animation.
- Dans le QA, la violation axe de la « 404 » (4,36:1) vient de la réponse brute de `serve.mjs` : le vrai `404.html` n'a aucune violation hors le doublon de `contentinfo`.

## Ce qui est bien (à ne pas casser à la révision)
1. La carte : filets, noms en Didone, prix en chasse fixe alignés, sommaire d'ancres, 0 écart avec les données, lisible à 390 px (`our-menu`, `cartedesboissons-390-*`).
2. Le menu mobile en popover (Échap, 56 px par lien, « Réserver » toujours visible) et le formulaire honnête (validation au blur, message clair, avertissement « Formulaire de démonstration »).
3. La sobriété visuelle assumée : pas de reveal, pas de décor générique, photos de stock étiquetées comme telles.
