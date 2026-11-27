# Revue awwwards · NE5T Hôtel & Spa (restaurant Intuition) · passe 2
Verdict : A_CORRIGER (0 F0, 0 F1, 1 F2, 5 F3)
Lecture en une ligne de l'idée du site : un menu dégustation raconté en « impressions » (Première, Deuxième, Dernière) : grand didone crème sur bleu nuit, rail vertical qui change de nom selon la section, ambre réservé aux appels à réserver. Inchangée depuis la passe 1.

Méthode : `dist/` (09:01) postérieur à `src/` (dernier fichier 09:00) et aux captures de `QA-revue2.md` (09:13) : planches `home` et `ne5t-item` (carte) réutilisées, lues. Serveur propre port 4883 (PID 9596, arrêté). Scripts maison via `scripts/q.sh` (`.shots/ne5t-aw-r2-*.mjs`, captures dans `.shots/ne5t-aw-r2/`) : 5 pages (dont `404.html` réel) x 1440 et 390 px : axe-core complet, console, requêtes, débordement, cibles, balises ; hero à 1280x720, 1366x768, 1440x900, 1920x1080, 1024x700 ; couleurs calculées des boutons de `/carte/` + repos/survol/focus ; LCP/CLS sous CPU x4 + 4G, 2 passes, 4 pages mobile ; reduced-motion sur 4 pages. Planches lues : QA home, QA carte, heros, histoire/reservation/404 (1440), bouton repos/survol/focus.

Scores /10 (relecteur, pas un jury indépendant)
- Design 7,5 : identité typographique nette (didone + sans, trois couleurs) ; hero désormais compact sur écran bas ; longues zones vides sous les h1 de page toujours présentes (histoire, réservation, 404).
- Usabilité 8 : appel et menu à 1 clic, 0 débordement, cibles >= 24 px sauf un lien en ligne de l'accueil (23 px de haut).
- Créativité 7 : rail « impression », 404 « Pierre numéro 404 » ; reste un gabarit éditorial sobre.
- Contenu 7,5 : fidèle à `donnees.json` ; les deux écarts de procédure sont levés ; un nouveau défaut sur le nom d'une personne (F2-1).
- Technique 8,5 : 0 erreur console, 0 requête en échec, 0 violation axe (10 cas), 1 seul `<footer>`, LCP 1,0 à 1,2 s partout, CLS 0.

## Vérification des corrections annoncées (REVISION-1)
| id | verdict | preuve |
|---|---|---|
| F1-1 | confirmé | `dist/…/reservation/index.html` : description « … à Namur : par téléphone au 081 58 88 88. Lunch carte blanche … » ; `ou par courriel` : 0 occurrence |
| F1-2 | confirmé | `/carte/` : `.btn--plein` rgb(122,74,18) sur rgb(233,225,208) = 5,73:1 (canvas) ; survol : fond bleu nuit, texte crème, lisible ; focus : anneau ambre visible (`btn-*.png`) |
| F2-1 | confirmé | `footers=1` sur les 5 pages ; axe complet 5 pages x 2 largeurs : 0 violation, plus de `landmark-*` ; 1 `.kyw-footer__logo` par page, mention « Maquette KYW, certaines données sont illustratives » et noindex présents partout |
| F2-2 | confirmé | LCP mobile `/carte/` 1096 et 1052 ms (avant 2676) ; accueil 1180/1140, histoire 1004/1020, réservation 1048/1064 ; CLS 0 partout |
| F2-3 | partiel, nouveau défaut | « Gersdorff » ne désigne plus Christine, mais voir F2-1 ci-dessous |
| F2-4 | confirmé | `Sept jours` : 0 ; l'accueil affiche « Fermé le lundi et le mardi (à confirmer). » (planche QA home, bloc « Du mercredi soir au dimanche midi ») |
| F2-5 | confirmé | hero 639 px pour 720, 679/768, 767/900, 1093/1080 ; boutons dans la fenêtre (y 468-520 à 720 ; 491-543 à 768 ; 527-579 à 900) ; à 1024x700 les deux boutons s'empilent mais restent visibles (467-585) ; 0 débordement horizontal |

## Findings
### F2
- **F2-1 · T-invente / nom déduit · `src/data/site.ts:81`** (page `histoire`, « Les voix de la maison », planche `planche-pages.png`). La correction de F2-3 a remplacé « Christine Gersdorff » par « Christine et Pierre Brahy ». Écrit ainsi, le nom lit comme deux personnes de la famille Brahy : Christine devient « Christine Brahy », nom que le dossier ne donne pas (`donnees.json` : « Christine (épouse du propriétaire) » ; seul Pierre Brahy est nommé, comme architecte d'intérieur). Le marquage `placeholder` n'est pas visible à l'écran. Correction : « Christine, épouse du propriétaire, et Pierre Brahy, architecte d'intérieur » ou deux lignes séparées (« Christine » / « Pierre Brahy »), détail inchangé.

### F3
- **F3-1** `histoire` : l'accroche « Une ancienne ferme en carré, au-dessus de la Meuse. » ouvre le premier paragraphe mot pour mot (planche `planche-pages.png`, colonne 1). Non traité (hors consigne).
- **F3-2** `reservation` : le numéro géant est répété (bloc de page puis « Dernière impression : la vôtre. »), et la mention de réservation répétée trois fois ; CTA « Réserver » ambre dans la nav sur la page Réserver (planche, colonne 2). Non traité.
- **F3-3** `index.astro:31` : « on commence par une phrase, on découvre le détail à table » reste dans le dist, non étayé par le dossier. Non traité.
- **F3-4** JSON-LD `Restaurant` : adresse et téléphone, aucun `openingHoursSpecification` (`grep -c openingHours` = 0) ; alt de la photo de service : « de sauce » dépasse le `sujet` de `photos/index.json`. Non traité.
- **F3-5** Accueil : le lien « Découvrir la maison » mesure 162 x 23 px (390 px : 145 x 20), sous le seuil de 24 px (`index.astro:82`). Correction : `padding-block` ou `min-height: 24px` sur `.lien`.

## Vérifié sans défaut
Build présent et à jour (dist postérieur à src) ; 0 erreur console ; 0 requête en échec ; 0 image cassée ; 0 débordement à 1440 et 390 ; `lang=fr`, un `h1` et un `main` par page ; titres uniques ; axe : 0 violation sur 10 cas, les « à vérifier » restants sont `pseudoContent` (remplissage au survol des boutons) et `bgGradient` (pied/numéro), identiques à la passe 1, contraste des boutons mesuré à la main ; reduced-motion : le seul texte à opacité 0 est le mot du rideau de chargement (`.curtain__mot`), qui n'est pas affiché ; 404 réelle designée ; mention KYW, logo et noindex sur chaque page ; faits (prix, horaires, téléphone, adresse) inchangés depuis la passe 1.

## Ce qui est bien (à ne pas casser)
1. Le rail « Première / Deuxième / Dernière impression » et le vocabulaire des « impressions », repris dans le 404.
2. Les incertitudes visibles et honnêtes (« Fermé le lundi et le mardi (à confirmer) », « Parking et accès : à confirmer », « Heures exactes : à confirmer par téléphone »).
3. Performance et motion : LCP ~1,1 s sur toutes les pages sous CPU x4 + 4G, CLS 0, hero compact sur écran bas, bouton plein sur nappe lisible au repos, au survol et au focus.

## Hypothèses
Adresse Avenue Vauban 46 (`donnees.json`), contradiction avec `restaurants.json` toujours à trancher par le client. Un seul F2 restant : la passe suivante (ou la correction) doit lever F2-1 pour atteindre PUBLIABLE ; les F3 sont tolérés pour une maquette.
