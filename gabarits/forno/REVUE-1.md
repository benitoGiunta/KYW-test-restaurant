# Revue gabarit forno · Les Potes au Feu · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée (sans DESIGN.md) : le site est une fournée, il naît dans le noir d'un four brun, la photo « lève » comme une pâte jusqu'au plein écran, puis la farine prend la page pour la carte, pendant qu'un compte à rebours du prochain service bat dans l'en-tête.

Méthode : captures refaites (`.shots-forno-revue/<page>`, port 4421) car celles du constructeur dataient d'avant le dernier build (reports 21:51-22:08, dist 22:09:43). 7 pages, une planche par page (mini-script PIL du scratchpad, `planche.py` déforme le mobile). `page.clock` + `Europe/Brussels` sur 7 instants, mesures 390 px par Playwright. Le jury aveugle (sous-agent) est indisponible en session d'agent : auto-score.

Scores /10 (barème quality-bar.md, pondéré 40/30/20/10 = 7,6)
- Design 8 : `d-01-hero` index, nom 20 vw en capitales sur brun, photo collée en bas, un langage reconnaissable (brun/farine/tomate, Big Shoulders + Erode) ; retire 1 point : accents de capitales perdus dans les titres (F1-2), disques à lettres creuses (F2-6).
- Usabilité 7 : LCP mobile 0,98 à 1,27 s, CLS 0, 53 à 60 fps, 0 axe, focus visible ; mais bandeau d'exemple invisible (F1-1), compte à rebours mobile sans libellé (F1-3), « Réserver » coupé du menu mobile, en-tête de 122 px sur 844.
- Créativité 8 : la levée (photo 320 px vers plein écran + marquee des services du menu) et le compte à rebours calculé sont propres à ce sujet ; la carte et les pages intérieures retombent sur un catalogue classique.
- Contenu 7 : le texte réel vient du dossier, vouvoiement, pas de filler, histoire sans date relative ; retire 1 point pour le compteur « 08 » et le jargon de production visible (« d'après le dossier »).
- Technique 8 : audit 0 FAIL, 0 erreur console, 0 requête en échec, 33 URL internes en 200, noindex + mention + JSON-LD sur les 7 pages ; retire 1 point pour la 404 sans robots/sitemap (WARN normal sous `base`) et le compte à rebours à corriger.

## Findings (gravité, preuve, correction)

### F1 majeurs
- **F1-1 Bandeau « Page d'exemple » invisible** (`pates`, `a-emporter`). Playwright : `.bandeau` occupe y 0-40 (desktop) et 0-82 (390 px) sous l'en-tête fixe 0-72 / 0-122 ; `d-01-hero` et `m-01-hero` de ces pages n'en montrent rien. La FICHE promet « bandeau d'exemple peint sans JS » : faux. Seules les étiquettes « illustratif » par produit signalent encore l'exemple. Correction : `padding-top: var(--hdr)` (valeur réelle de l'en-tête, 122 px en mobile) sur le bandeau, ou le placer sous l'en-tête en `position: sticky`.
- **F1-2 Accents des capitales perdus dans les titres display.** `m-01-hero` de la 404 : « FOUR ETEINT » alors que le DOM contient « FOUR ÉTEINT » ; idem « FRAICHES » (pates d-01), « LES FOURNEES » (a-emporter), « L'EQUIPE » (histoire). Faute d'orthographe visible sur 4 titres de page, probablement `line-height` < 1 plus `overflow: clip` des lignes `data-split`. Correction : `padding-top: 0.12em` sur les lignes SplitText des `h1`/`h2` display (ou `line-height` ≥ 1,05) et recontrôler les quatre titres.
- **F1-3 Compte à rebours mobile sans libellé et état « ouvert » muet.** À 390 px `.compte__lib { display: none }` (base.css:61) : on lit « 02j 20h 47min 23s » sans « Prochain service » ; pendant le service seul « jusqu'à 14:00 » s'affiche, sans « C'est ouvert » (capture `open-390.png`). Correction : garder le libellé en mobile (ligne de 11 px au-dessus ou « Service » en préfixe) ; l'état ouvert doit dire « Ouvert jusqu'à 14:00 ».

### F2 mineurs
- **F2-1 Libellé orphelin « HEURES » en service.** Desktop mer. 12:30 : « C'EST OUVERT · jusqu'à 14:00 / HEURES » (`open-1440.png`) ; masquer `small` quand `.is-ouvert`.
- **F2-2 Accord singulier/pluriel du texte lecteur d'écran.** « dans 0 jours 1 heures 59 minutes » (mer. 10:00) : « 1 heures », « 0 jours » ; accorder (setup.ts, `const t`).
- **F2-3 Sans JS le compte à rebours affiche « 00 jours 00 heures 00 minutes 00 secondes »** (Playwright `javaScriptEnabled: false`) alors que la FICHE promet « Prochain service » ; `.compte__nums` caché tant que `is-ready` manque est déjà la règle, mais `:not(.is-ready)` ne s'applique pas ici (zéros visibles) : vérifier la spécificité ou poser `hidden` dans le HTML.
- **F2-4 Compteur « 08 » et disques 01 à 08 sur le menu** (index `d-04`, carte `d-01`) alors que le menu compte 4 services et 6 lignes : les deux suppléments fromage (+7 €, +15 €) deviennent « 07 » et « 08 ». Annoncer le nombre réel (constante `services: 4` ou 6) et laisser les suppléments sans numéro (même piège que la leçon comptoir). Idem « Les formules 04 » qui compte le bon cadeau.
- **F2-5 Jargon de production visible** (`a-emporter`) : « Service en salle uniquement d'après le dossier » ; de plus « uniquement » n'est pas dans `donnees.json` (T-invente non marqué). Réécrire : « Pour toute question, appelez le restaurant » sans affirmation.
- **F2-6 Disques à initiale sans sens** : « M », « A », « A », « C » (carte, Options et Boissons, `d-03`) ; les lettres ne servent à rien. Remplacer par un trait/icône ou supprimer le disque quand il n'y a ni photo ni numéro.
- **F2-7 Menu mobile : « Réserver » coupé** (« RÉ » à 390 px sur les 7 pages ; `nav` 404 px dans 358 px, `overflow-x: auto`). Le défilement fonctionne mais le CTA principal est caché, et rien n'indique qu'on peut défiler. Réduire l'espacement (gap 0,8 rem) pour tout faire tenir, ou ajouter un dégradé de bord ; l'en-tête mobile prend 122 px (14 % de 844) : passer le compte à rebours à droite de la marque.
- **F2-8 Formulaire de réservation qui jette la saisie** : nom, date, heure, couverts ne sont pas transmis (ouvre Zenchef dans un nouvel onglet). C'est dit au-dessus du formulaire, mais l'utilisateur ressaisit tout. Pour le client : remplacer par le seul bouton Zenchef, ou noter dans la FICHE que le formulaire est de démonstration à supprimer à l'adaptation.
- **F2-9 « Douze produits détourés »** (`pates`, lead) : aucun produit n'est une photo détourée, ce sont des disques numérotés. Écrire « Douze produits » seulement.
- **F2-10 Double drapeau bruyant** sur `pates` : « EXEMPLE » puis « *ILLUSTRATIF » sur la même ligne pour 4 produits (tagliatelle, rigatoni, tortellini, ...) ; un seul drapeau par fiche suffit.

### F3 finition
- F3-1 Compte à rebours calculé sur l'heure et le fuseau du visiteur, sans jours fériés ni fermetures exceptionnelles : à noter dans la FICHE (un visiteur hors Belgique voit une heure fausse).
- F3-2 Le menu 67 € est répété en entier dans « Les formules » de la carte (description qui reprend les 6 lignes déjà affichées au-dessus).
- F3-3 `a-emporter` : « Soir ·lun., mar., ... ·19:00 à 21:00 » (points médians collés à la capitale, `muted` + `letter-spacing`), à espacer.
- F3-4 La même photo de salle revient dans le pied de page des 7 pages (`d-06`/`d-07` de chaque planche) ; varier ou la réserver à l'accueil.
- F3-5 Deux avis d'exemple (dont « Le bœuf confit est une merveille ») et l'e-mail `bonjour@lespotesaufeu.be` sont inventés mais bien drapeaux (« illustratif », « adresse illustrative ») : conforme à la règle, à retirer au passage en production.
- F3-6 `audit.mjs` : 9 WARN, dont « 12:00 à 14:00, 19:00 à 21:00 répété » (horaires, normal) ; 404 sans robots/sitemap sous `base` (normal).

## Règles vérifiées
- Une donnée, un drapeau : OK. Email, boissons (32 €, 12 €), 2 avis, rôles de Sara et Jordan, photos d'équipe manquantes, pates et fournées : chacun porte son drapeau à l'endroit affiché. Une seule entorse : « uniquement » (F2-5).
- Rien de daté, rien de promis : OK. Pas de « il y a quatorze ans » ni de société/date de création (DAMFRA) ; « hiver 2019 » est un fait daté du passé tiré du dossier. Les dates d'avis (2026-03-18, 2026-02-02) ne sont pas affichées. Aucune date en dur dans le gabarit (compte à rebours lu sur l'horloge).
- Le hero est vu : OK. Mesures h1/photo à 1440×900 (h1 200-530, photo 594-900), 1280×720 (125-419 / 480-725), 1024×768, 820×1180 et 390×844 (h1 top 191, 115 px de haut, 2 lignes) : h1 entier dans le viewport, photo peinte au premier rendu (LCP 248 ms desktop, 1,27 s mobile), 0 débordement (`scrollWidth` 390).
- Compte à rebours (`page.clock`, Europe/Brussels) : mer. 12:30 « C'est ouvert jusqu'à 14:00 » ; sam. 15:00 « lun. 19:00 dans 2 j 3 h 59 min » (jour fermé OK) ; mer. 10:00 « mer. 12:00 dans 1 h 59 » ; lun. 21:30 « mar. 19:00 dans 21 h 29 » ; ven. 20:00 ouvert jusqu'à 21:00 ; dim. 23:59 « lun. 19:00 dans 19 h » ; mer. 14:00 pile « mer. 19:00 dans 4 h 59 ». Aucune erreur de logique (bornes ouverture incluse, fermeture exclue) ; défauts seulement F1-3, F2-1, F2-2, F2-3.
- 390 px : h1 visible sur les 7 pages, 0 débordement, nav défilable (`overflow-x: auto`, scrollbar masquée) mais « Réserver » coupé (F2-7).
- Technique : 0 erreur console, 0 requête en échec, 0 violation axe (7 pages), reduced-motion `hiddenText` 0, `h1` unique, `lang="fr"`, noindex sur les 7 fichiers, mention « Maquette KYW… » et logo KYW sur les 7, titres uniques, OG, favicon, JSON-LD Restaurant (adresse, horaires, sans e-mail). Hover : `colorOnly` sur les flèches du carrousel, « La carte », liens texte (mineur, ils soulignent déjà).

## Ce qui est bien (à ne pas casser à la révision)
1. La levée de l'accueil (`d-02`, `d-03`) : photo des mains dans la pâte qui grossit, titre qui rétrécit, marquee des vrais services du menu ; LCP et CLS intacts.
2. Le système brun/farine/tomate avec capitales Big Shoulders géantes et le pied de page en couches (nom géant + photo qui glisse) : reconnaissable sur toutes les pages, y compris la 404 (« 404 » en croûte, trois sorties).
3. L'honnêteté des drapeaux : chaque donnée non prouvée est étiquetée à l'endroit où elle s'affiche, et le texte réel (histoire, avis Michelin, horaires, prix) est fidèle à `donnees.json`.
