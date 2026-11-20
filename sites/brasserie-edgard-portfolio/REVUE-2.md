# Revue portfolio · Brasserie Edgard · passe 2
Verdict : PUBLIABLE (0 F0, 0 F1 ; restent 2 F2 et 8 F3, dont la LCP mobile déjà annoncée « partielle » par REVISION-1)
Lecture en une ligne de l'idée du site (sans avoir relu DESIGN.md) : une brasserie vue comme une table dressée et ludique (objets dessinés qui tombent dans le hero, tirages de photos à déplacer sur fond bleu, carte en fiche crème à pastilles de prix, signature « À table ! » en pied), palette crème, bleu nuit, corail. Idée inchangée depuis la passe 1.

Preuves : fraîcheur contrôlée (`find src public -newer dist/…/index.html` vide ; dist 21:45, QA-revue2 et captures 21:52-21:53, donc réutilisés) ; QA-revue2.md et planche maison des 8 vues desktop et 6 vues mobile de l'accueil (captures `.shots-brasserie-edgard-portfolio-revue2/home`) ; mesures maison sur mon serveur (port 4812, PID 31983, arrêté) : axe-core de node_modules (axe complet, après défilement et 2,3 s de repos) sur 7 pages (dont le vrai `404.html`) x 1440, 1024, 768, 390, 360 px, avec console, requêtes, `scrollWidth`, enfants hors fenêtre, cibles < 24 px, h1, lang, noindex, mention, logo, contentinfo (35 cas) ; horloge simulée fuseau belge sur 7 créneaux ; reduced-motion ; LCP/CLS CDP (CPU x4, 1,6 Mbit/s, 150 ms) en 3 passes ; extraction du texte de `<main>` des 7 pages du dist confrontée à `dossier.md` et `photos/index.json` ; 24 captures de fenêtre (salle, groupes, reservation, lunch à 1440 et 390 px, non couvertes par le QA) en planches. Build non relancé par moi : exit 0 et 7 pages selon QA-revue2, dist postérieur à tout `src/`.

## Vérification des corrections annoncées (REVISION-1)

| id | annonce | constat passe 2 | verdict |
|---|---|---|---|
| F1-1 | « à toute heure » retiré | grep sur les 7 pages du dist : 0 ; `lunch` : « Et les suggestions du moment. » | confirmé |
| F1-2 | « Fermé aujourd'hui » le lundi soir | horloge simulée : lun 23:00 et sam 22:45 « Fermé en ce moment, réouverture demain à 10:00 » ; mer 09:00 et dim 08:00 « ouverture à 10:00 » ; mar 16:30, ven 12:00, dim 22:20 « Ouvert jusqu'à 22:30 » (7 cas sur 7 justes) | confirmé |
| F2-1 | « arrivée jusqu'à » retiré | grep : 0 ; « Ouvert jusqu'à 22:30 » | confirmé |
| F2-2 | bandeau « Ouvert tous les jours, 10 h à 22 h 30 » | visible sur toutes les captures (`edgard-p2-cap-*`, planche accueil), « Service du soir » : 0 occurrence | confirmé |
| F2-3 | titre de l'accueil | `<title>Brasserie Edgard \| Brasserie à Saint-Servais (Namur)` ; « Bistronomie » : 0 | confirmé |
| F2-4 | « au Chaussée » | `salle` : « …22 h 30, située Chaussée de Waterloo 473… » ; « au Chaussée » : 0 (la phrase reste lourde, voir F3-7) | confirmé |
| F2-5 | « habitués » | accueil : « la Brasserie Edgard (« Mr Edgard ») vous accueille » ; 0 « habitués » | confirmé |
| F2-6 | « par téléphone » | `reservation` : « Réservation en ligne via Barestho. Les réservations par e-mail ne sont pas enregistrées. » ; numéro gardé en bouton « Appeler » | confirmé (reste F3-8 sur `/groupes/`) |
| F2-7 | répétition entre pages | « petit creux / grande faim / dîner d'affaires » : accueil seul ; `salle` et `groupes` parlent de leur objet (verifié sur le texte extrait). Seule phrase longue restant sur plusieurs pages : la carte « Lunch : plat et dessert 21,50 € Du lundi au vendredi, le midi. » (accueil, carte, lunch : donnée, pas du texte rédigé). Bloc horaires/bandeau toujours sur 6 pages (structure du gabarit, annoncé non touché) | confirmé |
| F2-8 | partiel, non résolu | LCP mobile accueil 3276, 3260, 3320 ms (3 passes), élément `photos/facade.webp`, CLS 0,0044. Aucune amélioration depuis 3,3 s (passe 1) : le preload et `fetchpriority` sont bien dans `Base.astro:93` et `index.astro:40` mais ne changent rien sous ce protocole | non résolu (F2-8 ci-dessous) |
| F2-9 | landmarks | `landmark-no-duplicate-contentinfo` : 0 sur 35 cas (1 seul `<footer>`, 1 seul `.kyw-footer__logo`). `region` (moderate) reste sur 35 cas sur 35, mais son nœud a changé : c'est désormais `<div class="wrap footer__cols">` du pied du site (le `<footer>` est devenu `<div role="presentation">`, son contenu est donc hors de tout landmark) ; le bandeau, lui, est bien dans `<aside>` | partiel (F2-9 ci-dessous) |

Aucune régression trouvée : 0 erreur console, 0 requête en échec ou 4xx, `scrollWidth` = fenêtre sur 35 cas, 0 h1 ≠ 1, `lang="fr"`, `noindex` et mention « Maquette KYW, certaines données sont illustratives » présents, 0 cible < 24 px, 0 violation axe sérieuse ou critique à 1440, 1024, 768, 390 et 360 px. Le débordement SVG à 768 px signalé par le constructeur n'apparaît pas (aucun élément de `main` à `right` > fenêtre hors rails défilants ; les liens de l'index de la carte à 390 et 768 px sont dans `nav.carte__index` à `overflow-x: auto`, scrollWidth 902 pour 356 : voulu). Un `DIV.carte` à `right` 1056 vu à 1024 px pendant le défilement est un état de reveal (échelle 1,0056) : au repos `right` = 988 pour 1024 de fenêtre, idem à 1100 et 1280.

Reduced-motion : 0 animation en cours, 0 titre ou texte à opacité 0, bandeau fixe (relevé à 2 instants). (Le « movingReduced = false » du QA vient du motif défilant du bandeau en mode normal ; non reproduit avec `reducedMotion: 'reduce'`.)

Scores /10
- Design 7,5 : inchangé depuis la passe 1, direction nette (planches accueil et pages intérieures), mais motif eyebrow + mot en italique toujours sur 5 titres (« Un cadre contemporain », « Quand venir », « Salle et terrasse », « Le lunch », « Suggestions du moment ») et signature « À table ! » toujours coupée en pied (planche d-07, m-06).
- Usabilité 8 : focus visible (0 focus invisible au QA), 0 cible < 24 px sur 35 cas, réservation Barestho en un clic depuis chaque page, formulaire honnête (« sans envoi »), nav mobile fixe en bas qui masque le bas de chaque capture mais reste utilisable.
- Créativité 8 : tirages déplaçables, objets dessinés, état d'ouverture calculé juste sur 7 créneaux.
- Contenu 8,5 : les deux faits faux et les cinq inventions de la passe 1 sont corrigés (vérifié sur le texte extrait du dist) ; reste de la finition de rédaction (F3-3, F3-7, F3-8). Carte non touchée (71 plats, 0 écart en passe 1, `carte.json` inchangé depuis).
- Technique 7,5 : 0 erreur, 0 débordement, 0 violation axe sérieuse sur 35 cas, CLS 0,004 ; LCP mobile 3,3 s (> 2,5 s) et `region` modéré sur chaque page.

## Findings (triés par gravité)

### F0 : aucun
### F1 : aucun

### F2
- **F2-8 LCP mobile accueil 3,3 s, non résolu** : 3276 / 3260 / 3320 ms sous CPU x4 + 4G lente, élément `facade.webp` (29 Ko) ; pas de gain par rapport à la passe 1 (3,35 s). REVISION-1 l'a signalé comme hors périmètre. Correction attendue : différer le JS de mouvement (GSAP, Draggable) après la première peinture de l'accueil (import dynamique après `load`) ou rendre l'image dans le HTML sans attendre l'hydratation ; mesure à refaire avec ce même protocole, cible < 2,5 s. Sans effet bloquant (page lisible, CLS 0,004).
- **F2-9 `region` moderate sur 7 pages sur 7 (35 cas sur 35)** : `src/components/Footer.astro:8`, le contenu du pied du site (`div.wrap.footer__cols`) est hors landmark depuis que `<footer>` est devenu `<div role="presentation">`. Correction : `<section aria-label="Coordonnées et horaires">` autour de `.footer__cols` (au lieu de `role="presentation"` sur le conteneur). Vérifier ensuite `landmark-no-duplicate-contentinfo` = 0.

### F3 (finition)
- **F3-1 Apostrophes droites** (F3-1 de la passe 1, non traité, non demandé) : 7 occurrences dans `<main>` : accueil 1 (« Ce qu'on pose »), carte 1 (« Dans l'assiette »), groupes 1 (« jusqu'à »), salle 1 (« elle ne s'arrête pas »), 404 3. Les titres et chapeaux voisins utilisent « ’ » : harmoniser.
- **F3-2 Format d'heures** : « 10 h à 22 h 30 » dans les paragraphes et le bandeau, « 10:00 à 22:30 » dans les listes d'horaires (accueil, réservation, pied) et « jusqu'à 22:30 » dans l'état d'ouverture. Choisir « 10 h à 22 h 30 » partout.
- **F3-3 Jours fériés** : la liste d'horaires dit « cuisine continue » le samedi et le dimanche ; « et jours fériés » (dossier : « sauf week-end et jours fériés ») n'y figure toujours pas (présent seulement dans `/salle/`).
- **F3-4 Motif répété** : eyebrow au-dessus de plusieurs titres (« LA MAISON », « HORAIRES », « HORAIRES ET ADRESSE », « DU LUNDI AU VENDREDI, LE MIDI ») et mot en italique dans 5 titres ; en garder deux.
- **F3-5 Signature « À table ! » coupée** : en pied, la moitié basse du mot est masquée par la bande KYW à 1440 px (planche d-07) et à 390 px (m-06). Si l'effet est voulu, le consigner ; sinon laisser le mot entier au-dessus de la bande.
- **F3-6 `aria-prohibited-attr` (incomplete)** : `div.marquee` porte `aria-label="État du restaurant"` sans rôle, à l'intérieur de `<aside aria-label="Informations pratiques">` (`Marquee.astro:8`, `Base.astro:108`). Retirer l'`aria-label` du `div` (ou lui donner `role="group"`).
- **F3-7 Rédaction de `/salle/`** : « Terrasse couverte et salle, pour des tables de toutes tailles : la brasserie est ouverte tous les jours de 10 h à 22 h 30, située Chaussée de Waterloo 473… » enchaîne trois idées sans lien et répète « terrasse couverte » 4 fois en deux phrases ; « pour des tables de toutes tailles » n'est pas dans le dossier. Écrire par exemple « La salle et la terrasse couverte sont ouvertes tous les jours de 10 h à 22 h 30. » et laisser l'adresse au pied.
- **F3-8 `/groupes/`** : « Renseignements et demandes : +32 81 46 08 00 » suggère que les groupes se renseignent par téléphone ; le dossier donne un formulaire pour les groupes (site actuel). Même nature que F2-6 : écrire « Demandes de groupe : formulaire de la brasserie » si l'URL existe, sinon garder le numéro comme simple coordonnée.

Limites : contraste texte par texte (canvas) non refait ; les « color-contrast à vérifier » d'axe (15 à 22 par page) restent non tranchés, aucune violation certaine ; liens externes non retestés (inchangés depuis la passe 1) ; build non relancé (dist postérieur à src).

### Faux positifs du QA à ne pas corriger
- « no robots.txt / sitemap » : présents dans `dist/brasserie-edgard/portfolio/`.
- La « 404 » capturée (`404/planche.png`, `.kyw-footer__note` 4,36:1, 1 cible petite) est la réponse brute de `serve.mjs` ; le vrai `404.html` du site a 0 violation sérieuse, 1 h1, lang, noindex, JSON-LD.
- « Mouvement réduit non respecté » et « lien d'évitement non premier » : non reproduits (reduced-motion = 0 animation ; le premier arrêt clavier est « aller au contenu »).
- « Survol sans changement » sur la 404 brute : même cause.
- Les 10 « sentence repeated » du bloc horaires : structure du gabarit.

## Ce qui est bien (à ne pas casser)
1. L'état d'ouverture calculé : 7 créneaux sur 7 justes en fuseau belge, avec « demain » ou le nom du jour, sans « Fermé aujourd'hui » abusif.
2. La carte et les pages de contenu : 71 plats exacts, 0 `T-invente` résiduel de la passe 1, alt des photos pris dans `photos/index.json`, formulaire honnête, JSON-LD présent sur 7 pages sur 7.
3. L'accessibilité de fond : 0 violation sérieuse à 5 largeurs sur 7 pages, un seul `<footer>` et un seul logo KYW, 0 débordement, reduced-motion propre.
