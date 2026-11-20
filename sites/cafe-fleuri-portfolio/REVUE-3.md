# Revue portfolio · Café Fleuri · passe 3
Verdict : PUBLIABLE
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une journée en cinq moments (9h, 10h30, 12h, 14h, 16h) où le ciel, la couleur et l'astre (une tasse rouge) suivent l'heure réelle ; 6 pages cohérentes, idée intacte après deux révisions.

Base de la passe : dist (02:59) postérieur à src (02:58) ; QA-revue3.md et planches (03:06) postérieurs au dist, réutilisés (accueil, carte, 404 brute). Mesures maison complémentaires : 6 pages x 5 largeurs (320, 390, 768, 1024, 1440) = 30 contextes (molette, console, requêtes, scrollWidth, titres tronqués, cibles, flèches, axe-core à 390 et 1440), texte du dist par script Python, 200 liens et ressources internes testés dans dist, JSON-LD, planche mobile accueil.

Scores /10
- Design 7 : thèmes aube / midi / goûter / nuit distincts (home d-01 à d-07), « Nous trouver » sobre ; chips du hero mobile toujours coupées à droite (« 12h Le déj », m-01) et photo d'oignon sur Histoire.
- Usabilité 8 : flèches de jour 44 x 44 à toutes les largeurs, 0 cible < 24 px, 0 lien mort, statut de fermeture visible sur « Nous trouver ».
- Créativité 8 : horloge réelle, astre, transition d'orange entre pages (d-90 a/b/c) et ciel inchangés.
- Contenu 8 : faits conformes à `donnees.json` (adresse, téléphone marqué à confirmer, prix 21,95 et 11,95 €, note 4,2 / 223 avis, mardi étudiants), statut annoncé, chapeau de midi neutralisé, doublons de carte supprimés ; reste de la typographie fine (F3).
- Technique 9 : 0 erreur console, 0 requête en échec, 0 débordement (30 contextes), LCP mobile bridé 1300 ms accueil et 1180 ms carte, CLS ≤ 0,014, reduced-motion : 0 texte caché, axe : 0 sérieuse ou critique sur les pages du site.

## Vérification des corrections annoncées (REVISION-2.md)
| id | résultat | preuve |
|---|---|---|
| F1-1 statut | confirmé | réservation : « statut à confirmer : Des sources signalent une fermeture définitive du lieu : ses horaires et son numéro peuvent ne plus être valables. » (1 occurrence, bloc « Nous trouver », au-dessus du bouton Appeler) ; formulation fidèle à `donnees.json` (« fermé définitivement (à confirmer) »), sans citer le repreneur |
| F2-1 flèches 768 | confirmé | `.horo__fleche` mesuré 44 x 44 sur accueil et réservation à 320, 390, 768, 1024, 1440 (0 sur 2 sous 44) |
| F2-2 chapeau 12h | confirmé | carte : « Plats cités par un annuaire en ligne, à titre d'exemple : pancakes au gravlax, œufs Benedict sur épinards. » ; « se prend aussi à midi » = 0 dans dist (plats présents dans `donnees.json`, catégorie « Plats cités (Flexiroom) » et brunch salé) |
| F2-3 doublons carte | confirmé | carte : Limonade 1, Thé glacé 1, Café et boissons chaudes 1, Pancakes 1 ; « Boissons » = 0 ; la phrase « Prix relevé dans un guide ancien, à confirmer » reste 3 fois sur la carte (WARN audit, voir F3-1) |

Aucune régression : build 6 pages, LCP et CLS inchangés, mention, logo et noindex toujours présents.

## Findings (triés par gravité)

Aucun F0, F1 ni F2.

### F3 finitions (non bloquantes)
- **F3-1 Phrase répétée sur la carte.** « Prix relevé dans un guide ancien, à confirmer. » 3 fois (QA-revue3 : WARN audit). Garder la mention sous les deux prix seulement, ou un seul avertissement au-dessus du bloc « Prix à confirmer ».
- **F3-2 `landmark-no-duplicate-contentinfo` (moderate)** sur les 6 pages à 390 et 1440 (axe) : deux contentinfo (pied du site et pied KYW). Le paquet `kyw-footer` étant imposé, passer le pied du site en `<div>` ou `<section aria-label>` plutôt que `<footer>`.
- **F3-3 Typographie.** Apostrophes droites : 404 (4 : « L'adresse », « Retour à l'accueil »…) et réservation (« mentionnée par les sites d'avis » ; « Vendredi (Aujourd'hui) ») ; 0 espace insécable avant « : » (3 à 7 espaces U+0020 par page), le deux-points peut passer à la ligne.
- **F3-4 Répétitions.** « Le mardi, une boisson offerte aux étudiants » sur accueil, brunch, histoire, réservation ; « Le moment de la maison : salé, sucré ou mixte… » sur brunch, accueil et carte.
- **F3-5 404.** Meta description citant « la réservation » alors que la page s'appelle « Nous trouver » ; titre « Cette page a fermé » : jeu de mots malvenu sur un lieu signalé comme fermé, à neutraliser.
- **F3-6 Mobile 390.** Chips du hero coupées à droite (m-01) et en-tête fixe de ~110 px (pas de défaut de débordement : pistes à défilement horizontal, `scrollWidth` = `clientWidth`).
- **F3-7 JSON-LD.** `openingHoursSpecification` 09:00 à 16:00 sept jours et `telephone` déclarés comme faits alors que le site les marque « à confirmer » (page noindex, donc sans effet réel) : retirer les horaires du JSON-LD ou marquer l'incertitude dans `description`.

## Mesures sans défaut
`lang="fr"`, un `h1` par page (30/30), `noindex, nofollow` (conforme prompt § 3.3), mention « Maquette KYW, certaines données sont illustratives » sur 6/6 pages, logo KYW unique, `og:image`, favicon, `<title>` et description présents, JSON-LD `Restaurant` avec adresse, 0 tiret cadratin, 0 image sans alt, 200 liens et ressources internes sans 404 ni hors base, 0 cible < 24 px, 0 `Camélia` ou repreneur cité (fait non prouvé côté lieu actuel). Le défaut de contraste 404 du QA (`.kyw-footer__note` 4,36:1) concerne la 404 brute de `serve.mjs` (titre « Page introuvable · KYW »), pas `404.html` du site (`#55646a` dans le CSS, axe : moderate seulement).

## Ce qui est bien (à ne pas casser)
1. Astre du hero visible dès le premier rendu (LCP mobile 1,3 s) avec la montée animée conservée.
2. Honnêteté du marquage : badges illustratif / exemple / à confirmer, crédits photos, réseaux « non communiqués », et maintenant statut de fermeture signalé.
3. « Nous trouver » : horaires Salle et Brunch dans la même carte, aucun outil de réservation inventé, numéro et statut à confirmer.
