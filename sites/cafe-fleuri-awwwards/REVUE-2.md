# Revue awwwards · Café Fleuri · passe 2
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : un café tout en typographie sur fond rose pâle, dont « Fleuri » déborde sur le filet de la rue et dont deux disques framboise et aneth se chevauchent, avec une transition framboise et un pied « 38 » rose sur prune ; la passe 1 a été corrigée sur le fond, il reste des affirmations de procédure non prouvées et l'absence d'image.

Scores /10
- Design 7 : inchangé, palette et serif cohérents (`home/planche.png`, `passe2/planche-tops.png`) ; desktop désormais moins étroit (colonnes élargies) mais toujours aucune image.
- Usabilité 8 : 0 lien mort (tous les liens internes testés en GET, 200, ancres `#sale/#sucre/#mixte` comprises), 12 arrêts de tabulation sans piège, 0 focus invisible (QA-revue2) ; cible « Lire l'histoire du lieu » toujours 156x22 (142x21 à 390).
- Créativité 7 : le « trop-plein » tient sur l'accueil ; les pages intérieures restent un disque dans l'en-tête et des listes.
- Contenu 7 : les deux inventions majeures de la passe 1 sont retirées et les horaires, le numéro et les prix sont marqués ; restent une procédure de réservation affirmée et un plat de l'ancien occupant présenté comme celui du café sur l'accueil.
- Technique 9 : axe-core complet (node_modules) 0 violation sur 5 pages x 3 largeurs (1440, 1024, 390), 0 erreur console, 0 requête en échec, `scrollWidth` = largeur partout, CLS 0, LCP mobile 0,90 s (accueil) et 2,11 s (carte) sous CPU x4 + 4G lente (QA-revue2), un seul `h1`, `lang="fr"`, `noindex, nofollow`, mention KYW et un seul logo sur les 5 pages, 0 tiret cadratin.

Build : exit 0 (QA-revue2.md). `dist/` (02:44) postérieur à tout fichier de `src/` et `public/` (`find -newer` vide) ; captures QA (02:46) et QA-revue2 (02:50) postérieures : réutilisées. Histoire, reservation et la vraie `404.html` ne sont pas dans le QA : mesurées et capturées à 1440 et 390 sur mon port 4783 (`.shots-cafe-fleuri-awwwards-revue2/passe2/`, serveur arrêté par kill du PID noté).

## Vérification des corrections annoncées (REVISION-1.md)
| id | annoncé | constat |
|---|---|---|
| F1-1 | « sur place » retiré | Confirmé : 0 « sur place » dans les 5 pages ; titre « Les mêmes mots que sur la carte : maison. » conforme au dossier (gravlax, granola, limonade maison). |
| F1-2 | « tous les jours » et « toujours » retirés | Confirmé : 0 « toujours », 0 « brunch tous les jours » ; reste « Tous les jours, 9 h à 14 h 30 » dans le pied et sur /reservation/, avec « Horaires indicatifs, relevés chez un annuaire tiers. À confirmer avec le café. » : acceptable, marqué. |
| F2-1 | « Appelez » et « appeler le café » retirés | Confirmé pour les phrases ; « Appeler le café » subsiste comme libellé de bouton (ce n'est pas la phrase visée). Mais voir F2-1 ci-dessous : le chapeau de /reservation/ reste une procédure. |
| F2-2 | note sur le numéro | Confirmé : « Numéro relevé chez un annuaire tiers, à confirmer. » sous le numéro de /reservation/ (capture `reservation-390-top.png`). |
| F2-3 | `aria-prohibited-attr` | Confirmé : 0 violation axe sur 15 combinaisons page x largeur. |
| F2-4 | double contentinfo | Confirmé : 1 seul `<footer>` par page (celui de `kyw-footer`), 0 `landmark-no-duplicate-contentinfo`. |
| F2-5 | notes 15 px, colonnes élargies | Confirmé : notes du site à 15 px (≥ 1024) et 14 px (390). Les seuls textes à 12 px sont dans `kyw-footer` (« Maquette KYW… », « Réalisé par »), paquet à ne pas toucher. |
| F2-6 | refusé (aucune photo) | Refus admis pour une révision ciblée, mais le défaut subsiste (voir F2-3). |
F3-4 (« Google, source tierce ») : corrigé aussi, bien que non annoncé. Les autres F3 sont non traités, comme dit.

## Findings (par gravité)
Aucun F0, aucun F1.

### F2 mineurs
- **F2-1 · Procédure de réservation non prouvée** · `src/pages/reservation.astro`, chapeau : « Un appel, un message : la table se garde auprès du café. » (extrait du dist, `reservation-1440-top.png`). Le dossier dit « Réservation : inconnu » ; dire que la table se garde par appel ou message est la même invention que « par téléphone » (leçons communes). Correction : « Coordonnées du café, à confirmer. » ou « Pas de réservation en ligne sur cette maquette. » (déjà présent plus bas).
- **F2-2 · Plat d'un ancien occupant présenté comme celui du café** · `src/pages/index.astro`, section maison : « Le gravlax de saumon maison est servi avec les œufs Benedict ou en pancakes, au mascarpone et à l'aneth. » Les pancakes gravlax mascarpone viennent de Flexiroom (ancien Café Bandit, `donnees.json` « Plats cités (Flexiroom) ») ; /carte/ les classe correctement « Cité ailleurs, à confirmer », l'accueil les affirme. Correction : retirer « ou en pancakes, au mascarpone et à l'aneth » de l'accueil.
- **F2-3 · Aucune image** (reste de F2-6 de la passe 1) : ni photo ni illustration autre que les disques, vu sur toutes les planches. Hors périmètre d'une révision ciblée ; à traiter en phase DA (assiette en aplats dans les têtes de page ou sur les trois brunchs).

### F3 finitions
- **F3-1 · Espace simple avant « : »** : 4 occurrences restantes mesurées sur le texte rendu (accueil « sur la carte : maison », histoire « au 44 et 46 : les brunchs » et « maquette : aucun nom », reservation « Un appel, un message : la table »). Correction : U+00A0.
- **F3-2 · Cible tactile** « Lire l'histoire du lieu » 156x22 (1440), 151x22 (1024), 142x21 (390) : `min-height: 24px`.
- **F3-3 · Filet vertical et disque sur le texte à 390 px** (`passe2/crop390.png`) : à /histoire/ le filet traverse « ne » dans le chapeau, à /reservation/ il traverse « se » ; le disque vert mord le « r » de « Réserver ». Voulu par le concept mais le chapeau doit s'arrêter avant le filet (padding-right) et le disque se décaler d'environ 12 px.
- **F3-4 · JSON-LD** `Restaurant` avec horaires placeholder encore présent sur la 404 (et toutes les pages) ; og.png non modifié depuis la passe 1 (capture de l'accueil avec nav). Non traité.
- **F3-5 · Répétitions** : « Prix à confirmer. » juste sous « Tarifs relevés… À confirmer avec le café. » sur /carte/ ; mardi étudiants, Bisou 44 et 46 et cocooning encore répétés sur plusieurs pages.

## Ce qui est bien (à ne pas casser)
1. L'idée « Le trop-plein » : « Fleuri » qui franchit le filet, disques, transition framboise, pied « 38 » ; 404 en plaque bleue lisible et cohérente.
2. L'honnêteté des données : prix, horaires, numéro, e-mail et équipe marqués « à confirmer » ou absents, avis attribué à « Google, source tierce ».
3. La tenue technique : 0 violation axe, CLS 0, aucun débordement de 320 à 1440, un seul pied KYW, mention et noindex partout.

Décompte : F0 0 · F1 0 · F2 3 · F3 5.
