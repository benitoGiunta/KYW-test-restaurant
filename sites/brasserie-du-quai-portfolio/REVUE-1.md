# Revue portfolio · La Brasserie du Quai · passe 1
Verdict : A_CORRIGER (0 F0, 1 F1, 6 F2, 9 F3)

Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une brasserie au bord de la Meuse racontée par la ligne d'eau (houle entre les sections, loader en « marée », horaires en frise de marée), sobre, bleu Meuse sur blanc cassé, sérieuse sur la carte.

## Réserve de méthode (à lire d'abord)
- `QA-revue1.md` annoncé par la consigne n'existe pas : le shoot `brasserie-du-quai-portfolio-revue1-shoot` a échoué (`.logs/…-revue1-shoot.log` : « Target page, context or browser has been closed » ×3, trois shoots Chromium lancés en parallèle). Aucune planche de revue n'a donc été produite.
- Preuves utilisées à la place : build `dist/` du 17:01 (identique au commit courant), texte extrait des 7 pages et comparé à `donnees.json`, 30 liens internes testés en `curl` (serveur 4511), un shoot ciblé de l'accueil (`.shots-rev-bdq-portfolio/` : report.json, desktop, mobile, clavier, hover, reduced) et un passage Playwright sur les 5 pages intérieures + 404 (1440, 390, 390 reduced) : `.shots-rev-bdq-portfolio/cibles/`. Les captures de survol ne couvrent qu'une cible (hovers 0 demandé pour la sobriété) ; les captures reduced-motion de l'accueil n'ont pas été relues image par image (mesure : `hiddenText` 0 sur les 7 pages).
- Les captures `.shots-brasserie-du-quai-portfolio-build/` datent d'avant les corrections de la phase 3 : non utilisées comme preuve.
- Les artefacts « Aller au contenu » et barre « Réserver une table » au milieu des captures pleine page sont des éléments fixes, pas des défauts.

## Scores /10
- Design 7,5 : identité cohérente (houle, serif Gambetta, bleu Meuse, photo terrasse plein écran), mais pages intérieures avec beaucoup de vide entre sections (padding 112 px, `d-*` pleine page) et carte en liste plate.
- Usabilité 7 : focus visible (`k-01..04`), hover qui réagit (`h-01`), 0 cible < 24 px, barre mobile Réserver/Appeler ; nav mobile réduite à 2 liens sur 4, sans burger.
- Créativité 7,5 : la frise des horaires en marée avec curseur « maintenant » et le plan au trait portent le concept ; le reste est un gabarit propre mais attendu.
- Contenu 7 : carte exacte (49 plats et tous les prix contrôlés), faits justes, marquage « à confirmer » soigné ; deux affirmations non prouvées (F1, F2) et du JSON-LD plus affirmatif que le texte.
- Technique 8,5 : build OK (7 pages), 0 erreur console, 0 requête en échec, 0 débordement (7 pages × 3 viewports), axe 0 violation (30 contrastes « à revoir » sur l'accueil : muted sur écume mesuré à 4,7:1, donc OK), LCP desktop 240 ms, mobile throttlé 1 180 ms, CLS 0,002 / 0,004, un h1 par page, `lang="fr"`, noindex, mention KYW et logo présents, aucune image WebP > 300 Ko, polices préchargées.

## Findings

### F1 majeur
- **F1-1 · T-faux · données structurées.** Le JSON-LD `Restaurant` de l'accueil (`dist/brasserie-du-quai/portfolio/index.html`, 14 `OpeningHoursSpecification`) déclare ouverts mardi, mercredi et dimanche, 12:00-14:30 et 18:00-21:30. `donnees.json` : mardi « inconnu », mercredi « inconnu », dimanche « inconnu (à confirmer) ». Le texte visible porte « à confirmer », pas le JSON-LD. Preuve : extraction du JSON-LD (jours Tuesday, Wednesday, Sunday présents). Correction : ne générer que les jours confirmés (ou retirer `openingHoursSpecification` tant que les jours de fermeture ne sont pas connus) ; générer depuis la même source que la frise (`horairesGroupes()` / `aConfirmer` dans `src/data/site.ts`).

### F2 mineur
- **F2-1 · T-invente · horaires.** `donnees.json` marque lundi, jeudi, vendredi, samedi « (à confirmer) » ; l'accueil, le pied de page et la frise les affichent sans réserve (`rev-index` : « lundi midi 12h00 à 14h30 soir 18h00 à 21h30 » ; pied de page : « lundi, jeudi à samedi 12:00 à 14:30, 18:00 à 21:30 »). Pour mardi, mercredi, dimanche des heures sont affichées alors que le dossier dit « inconnu » (marquées « à confirmer », donc tolérées). Correction : soit une phrase unique « horaires de la saison selon le site de la maison, jours de fermeture non publiés » près de la frise (déjà en note, mais pas dans le pied de page), soit pointiller aussi lundi/jeudi-samedi.
- **F2-2 · T-invente · rôle de Pierre-Alexandre.** « Pierre-Alexandre et son équipe vous accueillent en salle » (`site.ts:442`, page La maison, meta description de `/histoire/`) et « La maison et la salle » (`site.ts:447`). Le dossier dit seulement que le site « cite Pierre-Alexandre et son équipe » et que le rôle est à confirmer. Correction : « Pierre-Alexandre et son équipe » sans « en salle », ou marquer `placeholder: true` et le dire.
- **F2-3 · Design · pastille « P ».** Page La maison, bloc équipe : un « P » seul dans une colonne vide à la place d'une photo (`cibles/d-histoire.png`, trois colonnes dont une vide). Lit comme un élément cassé. Correction : retirer la colonne ou une carte texte pleine (nom, rôle) sans faux avatar.
- **F2-4 · Usabilité mobile · navigation.** À 390 px l'en-tête n'affiche que « La carte » et « La maison » ; L'écailler et La terrasse (les deux signatures) ne s'atteignent que par le pied de page (`m-01-hero.png`, `cibles/m-404html.png`). Pas de burger. Correction : burger ou défilement horizontal des 4 liens ; au minimum ajouter « L'écailler » dans l'en-tête mobile.
- **F2-5 · AI slop · surtitre.** Un surtitre mono en capitales avec filet doré au-dessus de presque chaque titre (La carte, Les incontournables, Règles maison, Le plan, Réserver, Marée des services, Au fil de l'eau, L'équipe…). Correction : n'en garder que là où il apporte une info (jours, saison) ; titres seuls ailleurs.
- **F2-6 · Contenu · plan.** Le plan (accueil `d-06-scroll.png`, réservation) est un schéma dont l'orientation de la Meuse et la position de la terrasse sont supposées (ETAT : « à retracer sur OSM »). Il est légendé « schéma, pas à l'échelle » en 6 px. Correction : tracer depuis OSM (coordonnées du dossier 50.46563, 4.87950) ou agrandir la mention ; sinon remplacer par un lien itinéraire.

### F3 finition
- **F3-1** Numéros 01, 02, 03… devant chaque ligne de carte, de l'écailler et du plan (`rev-carte` : 01 à 09) : chiffres décoratifs, sans fonction. Retirer.
- **F3-2** Formats d'heure mélangés : « 12h00 à 14h30 » (frise) contre « 12:00 à 14:30 » (pied de page, note, terrasse). Choisir « 12 h 00 » ou « 12:00 » partout.
- **F3-3** Notes publiques sans date ni source de l'agrégat : « 4,3 / 5 Google, 1 832 avis », « 9,3 / 10 Resto.be », « 3,9 / 5 Tripadvisor » viennent de Rankeat, 07/2026 (dossier). Ajouter « relevé de juillet 2026 ».
- **F3-4** L'étiquette « Tripadvisor, avis résumé (résumé, pas une citation mot à mot) » est répétée 3 fois (audit : « sentence repeated 3x ») et redondante : une seule note sous le bloc.
- **F3-5** Le nom « La Brasserie du Quai » (hero et pied de page) est calé bord à bord sans marge : « La » touche x = 0 et « Quai » le bord droit à 1440 et à 390 (`d-01-hero.png`, `m-01-hero.png`). Prévoir au moins 8 à 16 px de marge ou le dire voulu.
- **F3-6** Repère « Ouverture (à confirmer) : Année d'ouverture à confirmer par la maison » sur La maison : texte qui s'adresse au client dans une page publique. Remplacer par un repère réel ou retirer.
- **F3-7** Alt et légende « au poste de l'écailler » pour la photo 24 que le dossier décrit comme « cuisinier ouvrant des coquilles Saint-Jacques » : supposition (ETAT la signale). Légender « Un cuisinier ouvre des coquillages ».
- **F3-8** Mobile throttlé : `loaderMs` 3 972 ms (> 2,6 s) alors que le compteur est masqué en CSS < 768 px ; le hero était lisible sur `m-01-hero.png`, mais vérifier que le retrait du `#loader` ne retarde pas l'interaction. Desktop : `loaderMs` 2 140 ms, écran stable à 4,4 s (`settledMs`).
- **F3-9** Libellé rouge « MAINTENANT » (accent #d73c2c sur fond clair) à 4,43:1, juste sous 4,5:1 pour un petit texte ; la page terrasse n'a aucun h2 (le « Bon à savoir » n'est qu'un surtitre).

## Ce qui est bien (à ne pas casser à la révision)
1. La carte : 49 plats et prix identiques à `donnees.json`, sauts de ligne et espaces insécables corrects dans les guillemets, desserts exemples marqués « illustratif / exemple », aucun avis critique tronqué ni invention de note Gault&Millau.
2. L'accueil : hero terrasse plein écran avec nom fitté, voiles qui rendent la nav lisible, barre mobile Réserver/Appeler, focus clavier visible et hover réel sur les CTA.
3. Honnêteté du formulaire (« Formulaire de démonstration sans envoi : la validation vous conduit vers la page Réservation de la maison ») et de la frise (jours inconnus en pointillé, badge qui ne dit jamais « ouvert » un jour non confirmé) ; 30 liens internes en 200, liens externes conformes au dossier, noindex, mention KYW et logo sur les 7 pages.

## Vérifications faites (faits, sans réserve)
Build : `dist/` 17:01, 7 pages. Liens : 30 internes 200, 0 sans préfixe `/brasserie-du-quai/portfolio/`. Externes présents : michelin, facebook, instagram, brasserieduquai.be/reservation et /cheque-cadeau (non requêtés : réseau sortant non utilisé). Titre accueil 64 caractères. Les alertes « title 78 caractères » et « phrase répétée » de `QA-build.md` sont corrigées dans le build actuel (horaires regroupés).
