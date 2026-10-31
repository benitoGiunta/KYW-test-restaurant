# Les Potes au Feu · variante legacy · 31/10/2026

Hypothèses prises sans poser de question (agent autonome) :
- Le site d'origine est relu en direct (le HTML sauvegardé n'est pas commité) ; `--before` tourne sur les 5 routes en ligne.
- L'orange #f38935 est la couleur du gabarit E-net, pas une charte : le logo est gardé, la palette vient de Solstice.
- Les pages utilitaires E-net (boîte à idées, recommandation, partenaires, cookies, conditions, services en ligne) ne font pas partie du restaurant : elles sont retirées ; le bon cadeau pointe vers la page en ligne du client.
- Pas d'outil de sous-agent dans cette session : hero review et finish review faites par l'agent lui-même sur les captures, consignées comme telles (`self`), pas comme revues indépendantes.

## Approche conservée vs site d'origine
| | Site d'origine | Variante legacy |
| --- | --- | --- |
| Type | multi-pages, 5 routes + 6 pages utilitaires E-net | multi-pages, les 5 routes (slugs gardés) |
| Hero accueil | diptyque des deux chefs plein cadre, carte blanche centrée sur la couture, flèche de défilement | Poster en `dvh` : même diptyque, la rencontre posée bas sur un puits crème, l'offre (quatre mains, 67 €) dans la phrase, un primaire + un lien |
| Pages intérieures | bannière photo + titre centré sur un navet | Banner : titre à gauche, accroche à droite, photo panoramique ou 21:9 |
| Nav | barre supérieure (Namur, tél., statut, partage) + masthead à logo centré, bouton orange | masthead d'une ligne, logo centré, 4 destinations + « Réserver », menu Popover sous 60rem |
| Accueil | Comme des Potes, Moment de cuisine (zigzag photo), bandeau CTA, vidéo, 3 piliers en icônes | même séquence : Split, Statement sur bande d'encre, Showcase lié à la vidéo, piliers en rangs, puis clôture horaires + réservation |
| Carte | 3 blocs photo + texte, menu en liste centrée | Switcher soir/midi, services numérotés, prix tabulaires, avis Michelin en citation + photo du plat |
| Réservation | iframe Zenchef + widget flottant ouvert d'office | module Zenchef chargé à la demande dans son cadre + lien direct, téléphone et horaires à côté |
| Contact | formulaire, carte Leaflet, horaires, avis E-net 5/5 | formulaire honnête (rien n'est envoyé), lien plan OSM, horaires avec jour courant, mentions |
| Animations | lightslider, scroll-to-top, widget flottant | aucune (Solstice still) ; rail de galerie manuel |
| Footer | noir, badges HTTPS/GDPR, plugin Facebook, liens d'agence | index columns sur papier, adresse, téléphone, plan, Facebook, mentions, puis KYW |

Dérogations : zigzag → la photo garde son côté (layout § 7, 83) ; photo du dessert retirée de l'accueil (jamais deux sections photo de suite) ; bandeau CTA → clôture (77, anatomy book) ; vidéo embarquée → photo liée (même URL) ; piliers en icônes → rangs (3, 67) ; galerie 12 → rail 8 (83) ; barre supérieure retirée (63) ; iframe Zenchef → chargée à la demande (26a non prouvable sur une iframe tierce) ; cookies, widget, avis E-net et badges retirés (46a).

## Axes d'amélioration traités (depuis AUDIT.md)
1. Accessibilité de base → focus visible partout, contraste, 13 px minimum, `overflow-x: clip`, `dvh` · preuve : sloplint 0 FAIL (26a, 40, 75, 34, 6a absents).
2. Libérer l'écran → plus de bannière cookies ni de widget flottant · preuve : captures `.hallmark/shots/*-375.png`.
3. Faux avis retirés → aucun avis E-net, seule la citation Michelin réelle · preuve : le-menu-des-potes.astro.
4. Un système → Solstice, 3 familles (dont 1 outlier), 3 graisses, accent sous 5 % · preuve : tokens.css, page.css stamp.
5. Recomposition → hero c2, Split, Statement, Showcase, Rows, Schedule, Rail · preuve : comp.md, captures 1440 full.
6. Carte et clôture → Switcher soir/midi, clôture horaires + adresse + réservation sur 3 pages · preuve : Cloture.astro.
Non traités : carte Leaflet (remplacée par un lien OpenStreetMap, pas de bibliothèque tierce), statut « ouvert maintenant » en temps réel (remplacé par le jour courant marqué), version NL/EN (absente à l'origine).

## Résultat sloplint
Before   Floor 140 FAIL · Reflex 129 · WARN 48 (`.hallmark/before.txt`)
After    Floor 0 FAIL · Reflex 0 ouvert, 2 waived (8 séquence gardée ; 59 couture pied de page / crédit KYW) · Finish answered F6, F16 · dismissed 25 (citation), 28a (logo du pied de page), 77 ×2 (pages réservation et contact à 4 blocs comme à l'origine) · NOTE 58 ×4 (textes du client)
Kept     `--kept` de sloplint ne compare pas : le record porte sur les URL lespotesaufeu.be et le sweep sur localhost (« WARN kept : not compared »). Comparaison faite à la main sur `before.json` et `dist/` :
         routes 5/5 · Zenchef 1/1 · tel 1/1 · Facebook 1/1 · bon cadeau 1/1 (URL en ligne) · YouTube 1/1 (lien au lieu de l'embed) · champs de contact 7/7 (objet, civilite, nom, prenom, email, telephone, message) · titres de page 5/5 · ancre `#horaire-contact` 1/1
Dropped  pages utilitaires E-net (boîte à idées, recommandation, partenaires, services en ligne, cookies, conditions, vie privée), `#cookies-box_intro`, liens de partage Facebook/Twitter/LinkedIn/Pinterest et `javascript:void(0)`, handlers `eventAnalytics`, `e-net-b.be`, `/avis-satisfaction-client.html` et le bloc 11 avis 5/5, champs anti-spam et cookies E-net (captcha, recaptchav3, token, f_email_ts, emailAt, email_from, email_f_2, joindre, redirect_url, buttonSendMailShare, subject, description, cookie_choice), carte Leaflet · tout est consigné dans le stamp de `src/styles/page.css`
Reworded 3 lignes : « Découvrez notre concept en vidéo » → « Notre concept en vidéo » (19) ; « Il y a quatorze ans, François et Damien aiguisent » → « François et Damien aiguisent » (date relative non datée) ; « HOME MADE / PRODUITS DES SAISONS / RENCONTRE ET CONVIVIALITÉ » → casse de phrase (67). Ajouts de copie (titres de structure tirés du dossier) : « Une rencontre », « Deux parcours », « Un lieu », « Le concept », « Le soir ou le midi », « Votre table en trois choix » ; phrases des piliers tirées du dossier (cuisine ouverte, producteurs du coin, chefs qui servent).
Render   5 captures par page dans `.hallmark/shots/localhost-4331-les-potes-au-feu-legacy-*-{1280x800,1440x900,1920x1080,1440-full,375}.png` ; avant : `.hallmark/before/` · Compare : non généré (kept non comparé), planches avant/après faites à la main
Build    `pnpm build:site sites/les-potes-au-feu-legacy` OK → `dist/les-potes-au-feu/legacy/` (5 pages, chacune avec `noindex` et `kyw-footer`, vérifiées par grep) · `pnpm index` OK

## Hero review et finish review
hero-review: self (pas d'outil de sous-agent) · 3 findings · 3 resolved : le puits passait sous les photos (z-index) ; à 1280 le titre faisait trois lignes et couvrait le menton de François (taille bornée, deux lignes) ; c1 cachait un visage entier (comp c2 retenue).
finish-review: self · 5 findings · 3 resolved 2 unresolved · gap: la vidéo promise par le titre n'est qu'une photo liée à YouTube.
- résolu : citation Michelin compressée à 427 px sur 9 lignes (F17) → colonne de 7/12 ;
- résolu : focus invisible sur l'iframe Zenchef (26a) → module chargé à la demande ;
- résolu : liens du pied de page qui repliaient à 1024 et 320 (49b) → `nowrap`, adresse non liée, « Voir le plan » ;
- non résolu : la photo du Showcase (1140 px) est étirée à 1312 px, un peu molle (matériel) ;
- non résolu : l'accueil ne montre pas le menu (la structure d'origine ne l'avait pas ; le prix est dans le hero et « Le menu des potes » est à un clic).
Ce que l'ancien site faisait mieux : il montrait trois assiettes sur la page carte (une par formule) et le dessert sur l'accueil ; la variante n'en garde qu'une (le boeuf confit en 1600 px), parce que les autres n'existent qu'en 550 px.

## Placeholders et faits manquants
| Élément | Où | Valeur illustrative | À remplacer par |
| --- | --- | --- | --- |
| aucun | | | |
Aucun `data-placeholder` : tout le contenu affiché vient du site d'origine ou du dossier. Slots texte `.fill` : 0.
À vérifier par le client : prix de la formule midi 52 € (affiché sur le site d'origine le 28/10, Le Fooding dit « à confirmer ») ; « au bord de la Meuse » (fiche Michelin) ; attribution des portraits (fichiers `damien.jpg` / `francois.jpg` du site) ; légendes de galerie (aucun nom de Sara ou Jordan, rôles inconnus). Avis repris : seul l'avis de l'inspecteur Guide MICHELIN Belgique 2026, verbatim. La note Google 4,8/212 (Rankeat, 2025) n'est pas affichée.

## Demande de matériel
- `hero-francois`, `hero-damien` : 720x724 chacun à 1440 (50vw), portraits 3:4 ; les originaux 1500x1999 suffisent.
- `potes` : 750x680 à 1440 ; source 800x725, juste : un tirage du trio en 1600 px.
- `video` : 1312x562 (21:9) ; source 1140x642, molle : une image de l'aftermovie « Alfonse » en 2400 px, ou la vidéo elle-même hébergée.
- `banner-salle` (à propos) : 1312x341 ; source 2000x520, OK.
- `galerie-*` : 8 photos à 430x242 ; sources 1140x642, OK.
- `banner-carte` : 1312x562 ; source 1140x642, molle.
- `plat-boeuf` : 520x520 ; source 1600x1600 (Michelin), OK.
- `salle-jour` (réservation) : 460x460 ; source 1600 (Michelin), OK.
- `banner-contact` : 1312x416 ; source 1140x642.
La photo qui changerait le plus la page : **les assiettes du menu actuel en haute définition** (Saint-Jacques / butternut / passion, soufflé caramel / chaï / poire, 2000 px), pour donner à la carte une image par service au lieu d'une seule.

## Leçons structurelles (reportées dans agents/lecons.md)
- `sloplint --before --url <site en ligne>` puis `--kept --url localhost` ne compare rien (« WARN kept : not compared ») : le record est indexé par URL ; faire la comparaison du câblage à la main (before.json `pages[*].links/fields` contre `dist/**/index.html`).
- `sloplint` groupe CSS et documents par dossier : un `Base.astro` dans `src/layouts/` qui importe `page.css` en frontmatter n'est pas relié au CSS → FAIL 34 « no overflow-x: clip » ; importer la feuille dans un `<style is:global>@import "../styles/page.css";</style>` du layout.
- Les `<img>` des slots (`base.css`) sont `position: absolute; z-index: 1` : tout texte posé en grille par-dessus (hero Poster) doit être `position: relative; z-index: var(--z-raised)`, sinon il disparaît sous la photo.
- Une iframe tierce (Zenchef) donne un FAIL 26a impossible à lever (le test `blur()` ne sort pas le focus d'une iframe cross-origin) : charger le module à la demande derrière un bouton, garder le lien direct.
- Le journal partagé `.hallmark/log.json` est ignoré par `.gitignore` (`.hallmark/`) : sans `git add -f`, les sessions des autres restaurants ne le voient pas et la rotation ne marche pas.
