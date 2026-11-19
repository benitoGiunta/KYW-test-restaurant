# Revue legacy · Pizzeria Doria · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une one-page de pizzeria en vert sapin et pêche, hero photo plein écran, cartes de plats à gros prix, horaires en tuiles de casiers au pied de page ; fidèle à la carte du client mais composée comme un gabarit de restaurant.

Méthode : build et captures du jour réutilisés (dist 23:41 postérieur à src 23:34, QA-revue1 23:48 postérieure au dist). Mesures propres, serveur local (port 4731) : 5 pages (accueil, menu, vins, contact, 404.html réelle) x 5 largeurs (320, 390, 768, 1024, 1440) après défilement : axe-core, console, requêtes, `scrollWidth`, `Range.getClientRects` contre la fenêtre, cibles < 24 px, méta ; burger tactile à 390 ; reduced-motion ; prix des 181 lignes confrontés à `donnees.json` (écart 0, y compris l'ordre) ; ancres et URL internes (200).

Scores /10
- Design 6 : palette cohérente et lisible (`d-01-hero.png`), mais hero en photo de stock sous une plaque sombre, tuiles et cartes égales ; la signature (casiers) n'apparaît qu'en bas.
- Usabilité 8 : burger tactile fonctionnel (popover ouvert, 4 liens de 52 px, fermeture à Échap), 0 débordement et 0 cible < 24 px sur 25 combinaisons, `Réserver` et téléphone toujours à portée.
- Créativité 5 : la structure (hero, suggestions, 3 tuiles, 3 avis, réservation) est celle de n'importe quel site de pizzeria ; seul le mur de casiers est propre au lieu.
- Contenu 7 : tous les prix, horaires, adresse, téléphone, e-mail et liens du dossier sont exacts ; deux paragraphes copiés du site client sont vagues et les avis ne sont pas dans `donnees.json`.
- Technique 8 : 0 erreur console, 0 requête en échec, LCP 464 ms (desktop) et 764 ms (mobile), CLS 0, 584 Ko ; réserves : pas de JSON-LD ni d'og:image, 2 violations axe récurrentes.

## Findings

### F0 (bloquant)
Aucun. Build OK (5 pages, code 0), 0 fait faux, 0 invention (les 3 avis viennent de `site-actuel/infos.json`, voir F2-1), noindex, mention KYW et logo présents sur les 5 pages.

### F1 (majeur)
- **F1-1 Nom accessible du logo différent du texte visible** (axe `label-content-name-mismatch`, serious, 2.5.3). `src/layouts/Base.astro` : `<a class="slab__marque" aria-label="Pizzeria Doria, accueil">` pour le texte visible « Doria pizzeria ». Présent sur les 5 pages à 768, 1024 et 1440 px (absent à 320 et 390 où le texte visible est le même mais l'axe ne le relève pas). Correction : commencer l'aria-label par le texte visible (« Doria pizzeria, accueil ») ou supprimer l'aria-label.
- **F1-2 Composition générique, signature enfouie.** Preuve : `home/d-01-hero.png` (hero = photo de stock de pizzaiolo sous une plaque verte pleine, titre générique), `d-05-scroll.png` (trois avis en cartes égales), `m-03-scroll.png` (trois tuiles égales « Pizzas et pains / Pasta / Viandes et salades »). Le mur de casiers, seule idée propre au lieu, n'arrive qu'après 6 000 px. Correction attendue : remonter les casiers (ou la photo de la salle des coffres, photo du client) dans le hero ou juste dessous ; remplacer au moins une des deux séries de trois cartes égales par une mise en page différente (liste, deux colonnes inégales) ; hero sur la photo de la salle des coffres plutôt que sur une photo de stock.

### F2 (mineur)
- **F2-1 Avis : source non consignée et pseudonyme brut.** `src/data/site.ts` lignes `avis` : trois avis Tripadvisor de 2023 (texte exact de `site-actuel/infos.json`, donc pas inventés) mais `donnees.json` a `extraits_avis: []` et le dossier note « Aucun extrait cité tel quel ». Le troisième s'affiche sous l'identifiant « Roam63401968725 » (`home/m-05-scroll.png`). Correction : remplacer l'identifiant par « Un client », ajouter les trois extraits à `donnees.json` avec leur source, titre de section « Avis publiés sur Tripadvisor en 2023 » pour ne pas laisser croire à des avis récents.
- **F2-2 SEO/méta incomplets.** Sur les 5 pages : aucun `og:*` (pas d'og:image), aucun JSON-LD `Restaurant` (adresse, horaires, téléphone sont pourtant disponibles), favicon = le PNG du logo seulement. Correction : balises og (title, description, image, locale fr_BE) dans `Base.astro` et un JSON-LD `Restaurant` sur l'accueil avec `openingHoursSpecification` tiré de `horaires`.
- **F2-3 Hiérarchie des titres.** axe `heading-order` (moderate) sur /menu/ (3 noeuds, `#pizza .carte__corps`) et /vins/ (2 noeuds, `#v0`) : les noms de plats sont des `h4` sous un `h2` sans `h3` (`menu/index.html`, `<h4 class="row__nom">`). Correction : `h3` pour les noms de plats, ou `p` avec rôle visuel.
- **F2-4 Deux pieds de page.** axe `landmark-no-duplicate-contentinfo` (moderate) sur les 5 pages à toutes les largeurs : `.pied` du site et `kyw-footer`. Correction : passer `.pied` en `<div>` (ou `<section aria-label="Coordonnées">`) et ne garder qu'un `contentinfo` (le paquet KYW doit rester intact).
- **F2-5 Deux paragraphes vagues copiés du client.** Accueil, « Une histoire de famille » : « passionnés par la « cuisine italienne » » (guillemets sans objet, mot-filler) et « reste toujours dans la même idée… Vous régalez vos papilles… » (points de suspension, ne dit pas quelle idée, faute de construction reprise du client). Correction : réécrire avec les faits du dossier (ouverte en octobre 2017, Rocco et Luigi, ancienne banque depuis mai 2023, pâtes Eggusto bio, fior di latte sans lactose).
- **F2-6 Note interne visible.** Pied de chaque page (`404.html`, `contact/`) : « Photographies d'illustration : Unsplash (…), à remplacer par des photos du restaurant ». Le texte est juste mais s'adresse à KYW, pas au visiteur, en 12 px gris sur vert ; rien n'indique « illustratif » près des photos de stock (hero et pâte). Correction : légende « Photo d'illustration » sous les deux photos de stock et retrait de « à remplacer … » du pied.
- **F2-7 Redite.** Accueil : le chiffre géant « 7,50 € » est suivi immédiatement de « Du marinara à 7,50 € à la Maradona à 18 € » (`home/m-03-scroll.png` en bas, `d-04-scroll.png`). Correction : garder soit le chiffre géant, soit la phrase.
- **F2-8 REFLEX sloplint non levés** (ETAT.md de construction : 44c/59/79, « hero à 569 px de 900 », écart de 20 px avant le pied). Non retestés ici faute de preuve contraire : à lever à la révision.

### F3 (finition)
- **F3-1** Espace insécable manquant avant « € » : 3 occurrences sur l'accueil (« à partir de 50 € » se coupe en « 50 » / « € » à 390 px, `home/m-02-scroll.png`) ; les 154 prix du menu sont corrects.
- **F3-2** Deux-points précédés d'une espace simple (5 par page, ex. « Dimanche et jours fériés : 18:00 à 21:30 ») : mettre U+00A0.
- **F3-3** Texte de 12 px : méta des avis et pied de page (contraste correct, taille limite). `audit.mjs` signale aussi des polices ttf/otf expédiées (286 Ko de polices) : passer en woff2.
- **F3-4** Faux positifs écartés (ne pas corriger) : « 404 » du QA = réponse brute de `serve.mjs` (ses 2 `color-contrast` et sa cible tactile n'existent pas sur `404.html`, réelle : h1, title, noindex, pied, mention) ; `skipLinkFirst: false` (lien « Aller au contenu » en 1er arrêt) ; `color-contrast` ponctuel sur `.casier dd time` à 1440 sur /menu/ (fondu en cours : opacité 1 après 1,5 s, blanc sur vert 47 %).

## Ce qui est bien (à ne pas casser)
- Exactitude du contenu : 181 lignes de carte identiques à `donnees.json` (noms, prix, descriptions), horaires et note de cuisine, cornets et paninis, suggestions de novembre 2026, 0 coquille du site d'origine reprise (« Décrouvrez », « Disclamer »…), 0 tiret cadratin, vouvoiement partout.
- Technique solide : 0 erreur console, 0 requête en échec, 0 débordement et 0 texte hors fenêtre sur 25 combinaisons page x largeur (dont 320), reduced-motion sans contenu caché, burger tactile avec fermeture à Échap, LCP < 0,8 s.
- Les horaires en tuiles de casiers avec « aujourd'hui » calculé à l'heure de Bruxelles (vérifié : vendredi à 00:55 Bruxelles) et jour fermé en contour : bonne idée locale, claire sur mobile comme sur desktop.
