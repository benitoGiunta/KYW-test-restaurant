# Revue portfolio · Wok de Jin · passe 2
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir relu DESIGN.md) : un buffet asiatique en « table de guinguette » (lin, bordeaux, corail, pictos au trait), dont la signature est la table de 12 photos-tirages que l'on déplace ; ton simple, prix et horaires d'abord, et désormais une photo de sashimi dès le premier écran.

Hypothèses : `dist/` (00:04:26) est postérieur à tout `src/` et `public/` (`find -newer` vide), et les captures du QA-revue2 (00:04 à 00:11) lui sont postérieures : réutilisées (accueil, tarifs, 404 brute, planches). Serveur propre sur le port 4795 (PID 10704, arrêté par `kill`). Mesures maison via `scripts/q.sh` : axe-core complet (violations + « à vérifier ») à 3 positions de défilement, 7 pages x 1440 et 390 px (console, requêtes, débordement, balises, noindex, logo, mention, JSON-LD) ; contraste canvas ; 10 horloges x 3 fuseaux ; formulaire (7 cas) ; 38 liens internes ; texte extrait du `dist/` confronté au dossier. Le « WARN pas de robots.txt/sitemap » du QA est faux (présents, voir passe 1) ; la « 404 » de la planche est la réponse brute du serveur, `/404.html` mesurée à part.

Scores /10
- Design 8 : le bouton « Ranger la table » est lisible (`rev2-btn-ranger.png`) et le héros porte une photo (`rev2-home-hero-390.png`) ; reste une théière qui frôle le « e » de « asiatique » à 1440 px (F3-N2) et une photo qui n'apparaît qu'à 158 px sur 900 à 1440 px.
- Usabilité 8 : le formulaire ne ment plus (« Rien n'a été envoyé », mardi et heures hors service refusés, 0 onglet ouvert) ; la réservation reste un renvoi vers la page d'accueil du restaurant, faute d'URL d'outil dans le dossier (hypothèse acceptée).
- Créativité 7 : la table de photos reste la signature ; il reste cinq titres à mot italique coloré et deux eyebrows sur l'accueil.
- Contenu 7 : prix, horaires, adresse, téléphone, réveillon conformes ; mais la page « À emporter » affirme maintenant « Carte à emporter : sur demande par téléphone », procédure absente du dossier (F2-N1).
- Technique 9 : 0 erreur console, 0 requête en échec, 0 débordement (`scrollWidth` = fenêtre, 14 cas), 0 lien mort sur 38, 0 violation axe sur 14 cas (les trois familles de la passe 1 ont disparu), un seul `<footer>`, LCP mobile accueil 1,55 s et CLS 0,006 (QA, sans la photo de héros en cause).

## Vérification des corrections annoncées (REVISION-1)
| id | annoncé | verdict | preuve |
|---|---|---|---|
| F1-1 | `btn--lin` | CONFIRMÉ | texte et bordure `rgb(244,233,222)` sur `rgb(92,22,38)` : 10,99:1 (était 1,34:1) ; `rev2-btn-ranger.png` |
| F1-2 | formulaire honnête | CONFIRMÉ | mardi 2026-12-01 19:00 : « fermé ce jour-là » ; mercredi 03:00, 14:00, 15:00 et dimanche 22:30 : « hors des heures de service (12:00-14:00, 18:00-22:30) » ; mercredi 19:00 : « Rien n'a été envoyé : cette maquette ne transmet pas la demande » + lien et téléphone ; 0 onglet ouvert ; bouton « Vérifier ma demande » ; champ date vide bloqué par `required` |
| F2-1 | « service jusqu'à » + heure de Bruxelles | CONFIRMÉ | 10 horloges identiques en Europe/Brussels, America/Los_Angeles et Asia/Tokyo : lun 13:30 « Ouvert, service jusqu'à 14:00 » ; lun 14:00 « ouverture à 18:00 » ; mar 13:00 « prochain service mercredi à 12:00 » ; `grep` « arrivée jusqu » : 0 |
| F2-2 | page « À emporter » | PARTIEL | « Commander », « commande », « consultable » : 0 ; bouton « Site du restaurant » ; téléphone en tête ; mais voir F2-N1 |
| F2-3 | landmarks | CONFIRMÉ | axe complet : plus de `landmark-no-duplicate-contentinfo`, `region` ni `aria-prohibited-attr` sur 14 cas ; 1 `<footer>`, 1 logo KYW, mention présente |
| F2-4 | italiques et eyebrows | PARTIEL, déclassé F3 | restent en `<em>` coloré : « Au wok et à la plaque », « Réveillon du 31 décembre » (accueil), « Une grande salle, une grande tablée » (maison), « 80 €, boissons comprises » et « Réserver le réveillon » (réveillon), plus la 404 ; l'annonce « table et réveillon gardés » omet « Au wok et à la plaque » et la page maison ; eyebrows `.meta` : 2 sur l'accueil ; cartes « Pour tous » inchangées (annoncé) |
| F2-5 | héros | PARTIEL | photo de sashimi présente : top 742 px / 900 à 1440 px (158 px visibles sous les CTA), top 613 / 866 à 390 px (bien visible, `rev2-home-hero-390.png`) ; lanterne à 40 px du « B » (`rev2-home-hero-1440.png`) ; théière à droite non traitée (F3-N2) |
| F3-5 | Itinéraire | CONFIRMÉ | lien Google Maps du dossier (`maps.app.goo.gl/Je47suHkwBY6jtC66`), `openstreetmap` : 0 |

## Findings

### F0 / F1 : aucun

### F2 (mineur)
- **F2-N1 · T-invente : « Carte à emporter : sur demande par téléphone ».** `src/pages/emporter.astro` (ligne `hcarte__ligne`, `<span>Carte à emporter</span><span>sur demande par téléphone</span>`), visible sur `rev2-emporter.png`. Le dossier (`dossier.md` l. 27 et `manques`) dit : à emporter oui, carte non consultable ; rien ne prouve qu'on la donne « sur demande » ni « par téléphone ». La phrase d'intro (« Pour la carte à emporter, appelez le +32 81 30 68 88 ») est, elle, acceptable (téléphone prouvé). Correction : remplacer la ligne par « Vente à emporter » / « oui » ou par « Carte à emporter » / « à demander au restaurant » marqué illustratif, ou supprimer la ligne et garder téléphone et adresse.

### F3 (finitions)
- **F3-N2 · Théière contre le titre.** À 1440 px la boîte du pictogramme (1102..1241, 180..319) recouvre la ligne « Buffet asiatique » (droite à 1124, 245..374) : le tracé touche le « e » (`rev2-home-hero-1440.png`) ; à 1920 px elle surplombe la fin du mot (`rev2-home-hero-1920.png`) ; à 1280 px 13 px d'écart. Correction : décaler `canard` de la même manière que la lanterne (x + 3 à 4 %).
- **F3-N3 · Photo du héros** à 1440 x 900 : seulement 158 px visibles sous les CTA ; la remonter (réduire la marge de 4 u ou la placer à côté du titre) pour qu'elle soit lisible sans défilement.
- **F3-N4 · Italiques résiduels** (cf. F2-4) : retirer l'italique de « Au wok et à la plaque » et de « Une grande salle, une grande tablée » ; garder ceux de la table, du réveillon et de la 404.
- **F3 de la passe 1 restés tels quels (hors liste de la révision, comptés ici)** : F3-1 chapeau « Un seul prix par personne… » ; F3-2 « Boissons comprises : Bière… » (majuscule) ; F3-3 « tirage » (1 occurrence visible, 51 dans le HTML) et légende « Un verre à pied » (visible sur `rev2-btn-ranger.png`) ; F3-4 horaires et « Réservation en ligne via Rendez-vous en ligne » répétés (WARN audit 12x) ; F3-6 loader de 2,29 s ; F3-7 `og.jpg` anonyme.

### Faux positifs du QA-revue2 (à ne pas reporter)
- Axe 404 `color-contrast` sur `.kyw-footer__note` (4,36:1) : ne se reproduit pas sur `/404.html` réelle (axe complet à 3 positions : 0 violation, 0 « à vérifier » en dehors du marquee).
- « À vérifier » `color-contrast` sur le bandeau défilant (27 nœuds, axe ne peut pas l'évaluer en mouvement) : mesuré au canvas, 10,27:1 (« Fermé en ce moment », corail sur `rgb(35,21,23)`) et 14,74:1 pour les autres segments.
- « No robots.txt / sitemap » : présents. 404 « sans h1 / titre KYW » : réponse brute du serveur.

## Ce qui est bien (à ne pas casser)
1. La table « La grande tablée » (12 tirages, rebond, rail nommé en mobile) et son bouton « Ranger la table », désormais lisible.
2. Le formulaire de réservation honnête : validation sur les jours et heures de service, message sans fausse promesse, lien et téléphone, aucun onglet ouvert.
3. L'hygiène technique : 0 erreur, 0 débordement, 0 violation axe, un seul pied de page KYW, mention + noindex + JSON-LD d'horaires sur les 7 pages, état « ouvert » juste dans les trois fuseaux testés.

## Compte
F0 : 0 · F1 : 0 · F2 : 1 · F3 : 3 nouveaux + 6 hérités de la passe 1

Publiable après correction de F2-N1 (une ligne) : build, console, liens, axe, débordement, mention, logo et noindex sont conformes ; seule une procédure non prouvée subsiste.
