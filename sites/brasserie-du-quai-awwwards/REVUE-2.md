# Revue awwwards · La Brasserie du Quai · passe 2
Verdict : PUBLIABLE
Lecture en une ligne de l'idée du site (sans avoir relu DESIGN.md) : le titre en capitales condensées pose sur une ligne d'eau en laiton, sous laquelle la page devient la Meuse de nuit (ardoise) avec le reflet inversé des lettres ; la pierre pâle alterne avec l'eau d'une section à l'autre, y compris sur mobile et sur la 404 (« À l'eau »).

Hypothèses de passe : `QA-revue2.md` ne couvre que l'accueil, la carte et le 404 de repli de `serve.mjs` ; les captures sont postérieures au build (dist 17:28:20, captures 17:28:33 et après, aucune source plus récente que dist). Les pages `/histoire/` et `/reservation/`, où portent les corrections F1-01, F2-01 et F2-03, n'avaient pas de capture : j'ai servi `dist` sur mon propre port (4531, PID 17091, arrêté en fin de tâche ; le serveur 4502 du QA n'est pas à moi, non touché) et fait un `shoot.mjs` ciblé par page (`.shots-brasserie-du-quai-awwwards-revue2/histoire/`, `/reservation/`), plus trois mini-scripts Playwright (mesures sur 4 pages × 2 tailles, 404 réelle, focus clavier). Les deux 404 axe (`document-title`, `html-has-lang`) de `QA-revue2.md` viennent de la réponse « Not found » brute de `serve.mjs` pour une URL absente, pas du site : `404.html` a `lang="fr"`, un `<title>` « Page introuvable », `noindex, nofollow`, un `h1` et la mention KYW. Le « lien d'évitement en premier : non » de shoot.mjs est un faux négatif : `keyboard.stops[0]` = « Aller au contenu ».

## Vérification des corrections de REVISION-1 (6 sur 6 confirmées)
| id | verdict | preuve |
|---|---|---|
| F1-01 rôle inventé | corrigé | `dist/histoire` : `Pierre-Alexandre</h3><p>Avec son équipe.` ; « En salle » : 0 occurrence ; texte conforme à `donnees.json > equipe[0].role`. Voir F3-07 pour la formulation. |
| F2-01 « à confirmer » doublé | corrigé | `dist/reservation` : `Jours de fermeture hebdomadaire : <span class="exemple">à confirmer</span>` ; `à confirmer à confirmer` : 0 sur 5 pages ; pied de page « … : à confirmer. » une seule fois. |
| F2-02 photos hors sujet | corrigé | `dist/index` : une seule vignette dans la liste (sole, alt vide car décorative, le nom du plat est à côté) ; vol-au-vent et Plateau du Quai sans photo (`home d-05-scroll`, capture lue). |
| F2-03 hero « Le quai » | corrigé | `d-histoire-hero`, `m-histoire-hero` : terrasse, tables, Meuse ; alt « La terrasse au bord de la Meuse, vue en hauteur, tables de teck sous les parasols. » décrit la photo ; ligne d'eau et reflet intacts. |
| F2-04 cibles < 24 px | corrigé | Playwright 1440 et 390 sur accueil, carte, histoire, réservation : 0 `a`/`button` sous 24 px ; shoot ciblé histoire et réservation : `smallTargets` 0 (bureau et mobile) ; focus clavier : 39 arrêts sur /reservation/, tous avec contour 2 px, aucun sans. Reste un lien en phrase sur la 404 (F3-08). |
| F2-05 JSON-LD | corrigé | `openingHours` et `Cuisine belge` : 0 sur 5 pages ; `"servesCuisine":["Brasserie","Fruits de mer"]` ; `Restaurant` avec adresse conservé. |

Non-régression : 0 erreur console et 0 requête en échec (accueil, carte, histoire, réservation, bureau et mobile) ; `scrollWidth` = `clientWidth` (1440 et 390) sur les 4 pages ; liens internes (11 cibles distinctes dont ancres de carte) tous en 200, aucun lien sans préfixe `/brasserie-du-quai/awwwards/` ; axe 0 violation sur histoire et réservation (comme accueil et carte) ; reduced-motion : 0 élément caché ; CLS 0 partout ; LCP mobile 1,0 à 1,6 s (histoire 1564 ms, réservation 1008 ms), bureau 144 à 364 ms ; `noindex, nofollow` et mention « Maquette KYW, certaines données sont illustratives » sur les 5 pages ; un seul logo KYW (`kyw-signature-720.webp`) ; réservation en ligne = `https://www.brasserieduquai.be/reservation/` (dossier). Audit : 0 FAIL, 4 WARN, tous examinés en passe 1 sans suite (sitemap et robots : page en noindex).

## Scores /10
- Design 8 : identité unique et tenue du hero à la 404 (`planche` accueil, `d-404`), mobile pensé (photo avant le titre, `m-histoire-hero`), mais la fin de l'accueil garde un grand vide (F3-03).
- Usabilité 9 : téléphone et « Réserver » dans l'en-tête, page Réserver à deux actions, cibles ≥ 24 px, focus visible sur chaque arrêt clavier, skip link en première position.
- Créativité 7 : la ligne d'eau et le reflet portent le site, mais après le hero les sections restent des listes classiques ; un seul vrai moment fort par page.
- Contenu 8 : copie propre au lieu, faits et prix conformes à `donnees.json`, plus aucune invention non marquée ; restent des répétitions (F3-04, F3-06) et trois desserts d'exemple (F3-01).
- Technique 9 : 0 erreur, 0 violation axe, 0 débordement, CLS 0, LCP < 1,6 s mobile throttlé, scroll 53 à 60 i/s, images 505 Ko sur la page la plus lourde (accueil 681 Ko au total).

## Findings
Aucun F0, F1 ni F2. Les F3 de la passe 1 non traités (non demandés à la révision) sont repris ici avec leur état.

**F3-01 · Desserts d'exemple** (carte, Dame blanche, Crème brûlée, Café gourmand, `placeholder`, marqués) : toujours présents ; trois lignes sans prix dans une carte réelle. Correction : une ligne « Desserts : à confirmer avec le restaurant » ou section masquée.
**F3-02 · Même photo deux fois** : `24-chef-ecailler` à l'accueil et sur la carte (`grep`, 1 occurrence dans chaque page). Correction : `14-table-dressee` ou `22-ceviche` sur la carte.
**F3-03 · Vide d'environ 300 px** sous la photo des huîtres avant « Les classiques de la maison », la ligne « Les plateaux, de 45 à 195 € » flotte seule (`home d-04-scroll`, 1440 px). Correction : réduire le padding de la section ou y accrocher le lien `carte#plateaux`.
**F3-04 · Répétition** page Le quai : le titre « Une brasserie au sens propre » ouvre le paragraphe suivant mot pour mot (`dist/histoire`). Correction : commencer à « Une carte large ».
**F3-05 · Prix à 13 px** à côté de noms à 40 px (non modifié). Correction : `--t-s` en graisse 600.
**F3-06 · Horaires dupliqués sur /reservation/** : le bloc « Horaires » de la page est répété à l'identique dans le pied de page, deux saisons et « Jours de fermeture hebdomadaire : à confirmer » deux fois à l'écran (texte rendu ; audit WARN « Midi : 12 h à 14 h 30 »). Correction : en pied de page de cette seule page, ne garder que l'adresse et le contact, ou accepter la répétition (pied commun).
**F3-07 · Ligne d'équipe vide** : « Pierre-Alexandre / Avec son équipe. » (`site.ts`, rendu histoire, `d-histoire-mid`) est conforme au dossier mais ne dit rien et se lit comme un fragment sous Martin et Rémy. Correction : retirer la ligne, ou « Pierre-Alexandre Desoignies, propriétaire cité par la presse » dès que le dossier le confirme.
**F3-08 · Lien en phrase sous 24 px sur la 404** : « 081 65 70 03 » de « Pour réserver, appelez le … » mesure 99×21 (bureau) et 93×20 (mobile) ; non agrandi volontairement (REVISION-1, interligne). Il est dans une phrase, donc couvert par l'exception WCAG 2.5.8 ; rien à faire sauf exigence interne de 24 px (alors `display: inline-block; min-height: 24px` sans padding, ou lien seul sur sa ligne).

## Ce qui est bien (à ne pas casser)
1. La ligne d'eau en laiton et le reflet inversé : identité cohérente sur les 5 pages, mobile et 404 compris, avec contenu entièrement visible en reduced-motion.
2. Page Réserver : numéro géant, « Appeler la brasserie » et « Réserver en ligne » nets, horaires saisonniers, « à confirmer » assumé et marqué (pastille `.exemple`), JSON-LD limité à ce que le dossier confirme.
3. Technique irréprochable après révision : 0 erreur console, 0 violation axe, 0 débordement, focus visible partout, cibles tactiles ≥ 24 px, LCP mobile 1,0 à 1,6 s.

Décompte : F0 0 · F1 0 · F2 0 · F3 8.
