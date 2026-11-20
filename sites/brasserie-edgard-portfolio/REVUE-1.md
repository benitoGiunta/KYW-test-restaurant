# Revue portfolio · Brasserie Edgard · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une brasserie vue comme une table dressée et ludique (objets dessinés qui tombent dans le hero, tirages de photos à attraper et déplacer sur fond bleu, carte en fiche crème à pastilles de prix, grande signature « À table ! » en pied), palette crème, bleu nuit, corail.

Preuves : QA-revue1.md (build exit 0, 7 pages, dist postérieur à src : `find -newer` vide), planches des trois pages capturées, puis mesures maison sur mon propre serveur (port 4761, PID 20820, arrêté) : axe-core de node_modules à 2 positions de défilement, console, requêtes, débordement, balises, JSON-LD, liens, 7 pages (dont le vrai `404.html`) x 1440 et 390 px ; LCP/CLS sous CPU x4 + 4G lente en 2 passes ; reduced-motion ; 16 Tab ; horloge simulée (`page.clock`) sur 5 créneaux ; 8 vues de fenêtre desktop et 8 mobile de l'accueil (planches) ; confrontation de `carte.json` (71 plats) à `donnees.json`.

Scores /10
- Design 7,5 : direction nette et propre au lieu (planche d-00 à d-07, objets dessinés, tirages en polaroïds, carte lisible), mais le motif « eyebrow + mot en italique » revient sur 5 titres et la signature « À table ! » est coupée en pied.
- Usabilité 8 : 16 Tab visibles (outline sur tous les arrêts), liens d'en-tête OK, réservation Barestho en deux clics, nav mobile à 6 cibles de 31 px de haut, formulaire honnête (« sans envoi »).
- Créativité 8 : tirages déplaçables + objets qui tombent, état d'ouverture calculé ; rien de générique dans le hero.
- Contenu 6 : carte exacte (71 plats, 0 écart de nom, prix ou description), mais une invention contradictoire (« à toute heure »), un état « Fermé aujourd'hui » faux le lundi soir, un « Bistronomie » absent du dossier, des répétitions entre pages.
- Technique 7 : 0 erreur console, 0 requête en échec, 0 débordement (scrollWidth = fenêtre sur 14 cas), 0 violation axe critique ou sérieuse, mais LCP mobile accueil 3,3 s (CPU x4 + 4G) et 2 violations axe modérées sur chaque page.

## Findings

### F0 (bloquants) : aucun
Build OK, 0 erreur console, 0 lien mort (6 liens internes testés sur le dist, 5 externes dont Barestho, Facebook, openstreetmap, tel:), `noindex, nofollow` sur 7 pages sur 7 (conforme au prompt § 3.3), mention « Maquette KYW, certaines données sont illustratives » et logo KYW (un seul `.kyw-footer__logo`) présents partout.

### F1 (majeurs)
- **F1-1 T-invente · « à toute heure »** : `src/pages/lunch.astro:14`, « Et les suggestions du moment, à toute heure. » Le dossier ne dit rien des heures de service des suggestions, et la cuisine ferme de 15 h à 18 h en semaine (dossier, § Pratique). Preuve : texte extrait de `/lunch/`. Correction : retirer la phrase ou écrire « Et les suggestions du moment. »
- **F1-2 T-faux · état d'ouverture « Fermé aujourd'hui » le lundi soir** : `src/motion/setup.ts:52`. Sous horloge simulée, lundi 23:00 donne « Fermé aujourd'hui, prochain service mardi à 10:00 » alors que la brasserie ouvre tous les jours de 10 h à 22 h 30 : ce lundi a été ouvert. Mercredi 09:00 : « Fermé en ce moment, ouverture à 10:00 » (juste). Mardi et samedi 16:30, dimanche 22:20 : « Ouvert » (juste). Correction : si le jour courant a un créneau déjà passé, écrire « Fermé en ce moment, réouverture demain à 10:00 » (ou « mardi à 10:00 ») ; réserver « Fermé aujourd'hui » à un vrai jour sans service (aucun ici).

### F2 (mineurs)
- **F2-1 T-invente · « arrivée jusqu'à 22:30 »** : `src/motion/setup.ts:47`, bandeau défilant de toutes les pages. Le dossier donne l'heure de fermeture (22 h 30), pas une heure de dernière arrivée. Correction : « Ouvert jusqu'à 22:30 ».
- **F2-2 T-faux · « Service du soir du lundi au dimanche »** : `src/components/Marquee.astro:5`. La brasserie est ouverte de 10 h à 22 h 30 ; le libellé réduit l'ouverture au seul soir. Correction : « Ouvert tous les jours, 10 h à 22 h 30 » (calculé depuis `site.horaires`).
- **F2-3 T-faux · « Bistronomie » dans le `<title>` de l'accueil** : `src/layouts/Base.astro:19`, « Brasserie Edgard | Bistronomie à Saint-Servais (Namur) ». Le dossier dit « Brasserie Restaurant » / brasserie belge et française ; « bistronomie » n'y figure pas. Correction : « Brasserie à Saint-Servais (Namur) ».
- **F2-4 Faute · « au Chaussée de Waterloo »** : `src/pages/salle.astro:34` (« …au {adresseLigne()} »). Correction : « située Chaussée de Waterloo 473… » ou « à l'adresse : ».
- **F2-5 T-invente · « pour les habitués »** : `src/pages/index.astro:48`, « Mr Edgard » pour les habitués. Le dossier donne « Mr Edgard » comme nom public, pas un surnom d'habitués. Correction : « la Brasserie Edgard (« Mr Edgard »)… ».
- **F2-6 T-invente · « ou par téléphone »** : `src/pages/reservation.astro:7` (description) et `:11` (chapeau). Le numéro existe, mais le dossier ne dit pas que la réservation par téléphone est acceptée (il dit seulement que les e-mails ne sont pas enregistrés). Correction : « Réservation en ligne via Barestho. Les réservations par e-mail ne sont pas enregistrées. » ; garder le numéro dans l'encart contact.
- **F2-7 Répétition entre pages** : l'idée « petit creux / grande faim / dîner d'affaires, repas en famille, entre amis » est écrite sur l'accueil (`index.astro`, `site.ts:189`), sur `/salle/` (`salle.astro:32-34`) et, en variante, sur `/groupes/` ; le bloc horaires et le bandeau reviennent sur 6 pages (WARN de l'audit, confirmé). Correction : une seule occurrence de la formule (accueil), `/salle/` et `/groupes/` parlent de leur objet (tables, nombre de couverts 10 à 16, terrasse).
- **F2-8 LCP mobile accueil 3,3 s** : CPU x4 + 4G lente, 2 passes, 3348 et 3328 ms ; élément = `photos/facade.webp` (29 Ko), donc le délai vient de l'ordre de chargement (loader et JS avant la peinture), pas du poids. QA : 3416 ms. Carte : 1,1 s. CLS 0,006 (accueil), 0 (carte). Correction : `fetchpriority="high"` + `loading="eager"` + `<link rel=preload>` sur l'image de l'accueil, ne pas la retenir derrière le loader ; viser < 2,5 s.
- **F2-9 axe modéré sur 7 pages sur 7, 1440 et 390 px** : `landmark-no-duplicate-contentinfo` (pied du site + `kyw-footer`, deux `<footer>`) et `region` (le bandeau `.marquee` hors landmark). Correction : pied du site en `<div role="presentation">` ou `<section aria-label>`, bandeau dans `<aside aria-label="Informations pratiques">`. Les 14 à 25 « contrast to review » par page et 1 `aria-prohibited-attr` à vérifier restent non tranchés (contraste nœud par nœud non mesuré dans cette passe).

### F3 (finition)
- **F3-1 Apostrophes droites** restantes : « d'affaires », « jusqu'à » (`groupes.astro`, `salle.astro`), « n'existe » (404), « Ce qu'on pose » (accueil) ; le reste du site utilise « ’ ». Compte par page dans le texte extrait : groupes 4, salle 4, 404 5, accueil 3, carte 3, lunch 2, réservation 2.
- **F3-2 Format d'heures incohérent** : « 10 h à 22 h 30 » dans les paragraphes, « 10:00 à 22:30 » dans les horaires, « 22:30 » dans le bandeau. Choisir « 10 h à 22 h 30 ».
- **F3-3 Week-end** : la ligne « cuisine continue » (samedi, dimanche) est une inférence de « sauf week-end et jours fériés » ; la mention des jours fériés est absente de la liste d'horaires (présente seulement dans `/salle/`). Ajouter « et jours fériés » sous la liste.
- **F3-4 Motif répété** : eyebrow au-dessus des titres (« LA MAISON », « LA CARTE », « DU LUNDI AU VENDREDI, LE MIDI », « HORAIRES ») et un mot en italique dans 5 titres (« contemporain », « pose », « suggestions », « venir », « une grande faim »). Garder le motif sur 2 titres au plus (d-01, d-06, d-07).
- **F3-5 Signature « À table ! » coupée** : en pied, le mot géant est tronqué en bas par la bande KYW à 1440 px (d-07) et à droite à 390 px (« À table » sans « ! », m-07). Si l'effet est voulu, le dire dans DESIGN.md ; sinon laisser le mot entier au-dessus de la bande.
- **F3-6 Canonical** : `siteUrl` = `https://kyw-test-restaurant.vercel.app` sur des pages `noindex` ; sans effet, à garder cohérent avec le déploiement final.
- **F3-7 Tirages dupliqués** : le rail de l'accueil répète 8 légendes (liste doublée pour la boucle) ; vérifier `aria-hidden` sur la copie (non tranché : le texte extrait contient les deux copies).

### Faux positifs du QA, à ne pas corriger
- « Pas de robots.txt / sitemap » : `robots.txt`, `sitemap-index.xml` et `sitemap-0.xml` existent dans `dist/brasserie-edgard/portfolio/`.
- La 404 capturée (`404/planche.png`, « Refontes de sites de restaurants namurois ») est la réponse brute de `serve.mjs` / de la racine, avec son contraste 4,36:1 sur `.kyw-footer__note` ; le vrai `404.html` du site (« Cette table n'existe pas », h1, lang, noindex, JSON-LD, pied KYW) a 0 violation sérieuse.
- « 1 cible tactile petite » (404 racine) : même cause. Sur les 7 pages du site, 0 lien ou bouton < 24 px.
- Phrases répétées du bandeau et du pied (WARN de l'audit) : c'est la structure du gabarit, seul le bloc horaires en mot-à-mot est à alléger si on touche F2-7.
- Images « non chargées » à 390 px sur l'accueil : ce sont les tirages lazy du rail hors écran (largeur 0 ou rail horizontal), pas des 404 ; aucune requête en échec.

## Ce qui est bien (à ne pas casser à la révision)
1. La carte : 71 plats, 7 catégories, noms, descriptions et prix identiques à `donnees.json` (0 écart), index de catégories collant en mobile, pastilles de prix lisibles, prix longs (« 11,50 € / 12,50 € ») coupés proprement.
2. L'accueil : hero et tirages déplaçables, objets dessinés cohérents, reduced-motion propre (0 texte caché, 0 animation en cours), focus visible partout, nav mobile pensée (Accueil masqué, logo qui ramène).
3. Les données non prouvées sont bien tenues : pas d'avis, pas d'histoire, pas d'équipe inventée ; alt des photos pris tels quels dans `photos/index.json` (`sujet`) ; formulaire de réservation annoncé « sans envoi » et dirigé vers l'URL Barestho du dossier ; JSON-LD `Restaurant` avec adresse, géo, téléphone et 7 plages horaires.

## Limites de cette passe
Contraste texte par texte (canvas) non refait ; les « à vérifier » d'axe sont listés mais non tranchés. Survol par rôle (CTA, cartes) et drag des tirages non rejoués (déjà testés par le constructeur, ETAT.md). Mesures à 1440 et 390 px seulement (768 et 1024 non couverts : le constructeur signale des objets SVG qui dépassent légèrement à 768 px, non vérifié ici).
