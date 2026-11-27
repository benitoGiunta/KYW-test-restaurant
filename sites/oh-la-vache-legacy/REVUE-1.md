# Revue legacy · Oh la Vache ! · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une page unique sobre, crème et brun, qui met la façade et l'enseigne vache en plein écran avec une carte blanche « Grill d'Erpent, ouvert 7 jours sur 7 », puis horaires, carte à onglets, photos de plats et un seul appel à l'action, le téléphone.

Preuves réutilisées : `QA-revue1.md` et ses planches (dist du 10:12, captures du 10:16, postérieures à `src/`). Mesures complémentaires du relecteur (script maison, axe-core de node_modules, 2 pages × 320/390/768/1024/1440, menu, onglets, reduced-motion, liens) : journal `.logs/olv-relecteur1-mesure.log`, captures `.shots-oh-la-vache-legacy-revue1/cible/`. `sloplint` non lancé (le genre ne figure pas dans DESIGN.md et le serveur était déjà arrêté) : la section AI slop est une auto-notation `self`.

## Scores /10
- Design 7 : hero pleine largeur sur la photo de façade (`d-01-hero.png`), typographie serif lisible, hiérarchie nette ; la palette crème et brun reste proche du défaut, sans signature propre à la vache hors photo.
- Usabilité 7,5 : tél. cliquable partout, menu mobile fonctionnel (`menu-390.png`, `aria-expanded` vrai), 6 onglets de carte opérationnels (1 panneau visible chacun), 0 cible < 24 px, 0 débordement de 320 à 1440 px.
- Créativité 5,5 : une seule idée visuelle (la photo d'enseigne), le reste est un gabarit propre mais attendu (« À table », carte à onglets).
- Contenu 7 : prix et noms des 231 lignes de carte identiques à `donnees.json` (comparaison par script, 0 écart), aucune invention de chiffre ; mais une adresse e-mail non retenue par le dossier et une offre d'emploi présentée comme actuelle.
- Technique 8 : build OK, 0 erreur console, 0 requête en échec, LCP mobile 2304 ms, FPS 60 ; manques de méta (canonical, og:image, JSON-LD).

## Findings

### F1 majeurs
- **F1-1 · T-faux/T-invente · e-mail de la société affiché comme celui du restaurant.** `sites/oh-la-vache-legacy/src/data/site.ts:10` (`mailto:sprl-lacroix@hotmail.com`, commentaire « à confirmer ») et le lien « Écrire au restaurant » de la section Réserver (dist `index.html`, lien `mailto:`). `donnees.json` : `email: null` ; `dossier.md` : « E-mail du site : sprl-lacroix@hotmail.com (société, non repris dans les données) ». Le libellé présente une adresse de société, volontairement écartée, comme canal du restaurant, sans marque « illustratif ». Correction : retirer le lien et le mailto (le dossier dit « téléphone uniquement », `reservation.outil`), ou le marquer visiblement « adresse de la société, à confirmer ».

### F2 mineurs
- **F2-1 · 404.html : 4 ancres mortes dans l'en-tête.** `dist/oh-la-vache/legacy/404.html` : `href="#horaires"`, `#carte`, `#photos`, `#reserver` alors que la page n'a que `id="contenu"` et `id="menu"` ; les liens du menu restent sur la 404 sans effet (même défaut pour le menu mobile). Correction : dans `src/components/Nav.astro` (ou `404.astro`), préfixer par `/oh-la-vache/legacy/` quand la page n'est pas l'accueil.
- **F2-2 · SEO/méta incomplet.** Accueil et 404 : pas de `link rel=canonical`, pas de `og:image`, pas de JSON-LD (mesuré : `canon false, ogimg false, ld false` aux 5 largeurs). Le prompt (§ C) attend un JSON-LD `Restaurant` avec adresse et horaires : tout est dans `donnees.json` (adresse, `geo`, téléphone, horaires, réseaux). Correction : ajouter le JSON-LD (`@type: Restaurant`, adresse Chaussée de Marche 581, 5101 Erpent, `openingHoursSpecification` des 7 jours, `telephone`), un `og:image` (facade.webp 1200x630 recadrée) et la canonical dans `layouts/Base.astro`.
- **F2-3 · Horaires donnés comme certains.** « Ouvert tous les jours, à midi comme le soir. » et 11:00-23:45 le vendredi, sans réserve. `dossier.md` et `donnees.json.manques` : vendredi inclus ou non dans le « weekend » à confirmer, Rankeat annonce vendredi/samedi jusqu'à minuit, un agrégateur parle d'une fermeture le mardi. Correction : conserver les valeurs de `donnees.json` mais ajouter à côté du tableau « Horaires à confirmer avec le restaurant » (texte de la section Horaires, `Horaires.astro`).
- **F2-4 · Offre d'emploi affichée comme actuelle.** Section Réserver : « Nous cherchons une personne de salle (H/F). Véhicule conseillé : pas de bus ni de train à proximité. » Reprise de l'offre du site actuel (dossier : « Offre d'emploi affichée », date inconnue). Hors sujet pour une page client et potentiellement périmée. Correction : retirer la phrase de l'emploi ; garder « pas de bus ni de train à proximité » seulement si reformulé en accès (« Accès : voiture conseillée, pas de bus ni de train à proximité (site actuel) »).
- **F2-5 · Axe : `landmark-no-duplicate-contentinfo` (moderate) sur l'accueil et la 404** aux 5 largeurs (2 éléments `footer`/`contentinfo` : pied du site + pied KYW). Correction : transformer le pied du site (sombre) en `<section aria-label="Contact">` ou `div`, garder le pied du paquet `kyw-footer` comme seul `contentinfo`.
- **F2-6 · En-tête fixe translucide : le texte passe sous la barre.** `.shots-oh-la-vache-legacy-revue1/home/d-03-scroll.png` : « Cuisine français… Tomahawk d'env… » reste lisible à travers la barre, à gauche du logo et sous le menu. Correction : fond opaque (`--bg` à 100 %) sur `.nav`, sans flou.
- **F2-7 · Bande vide sous la photo de l'entrecôte à 390 px.** `m-04-scroll.png` : ~90 px de fond beige entre la photo (rapport portrait) et sa légende « Entrecôte grillée, frites et sauce ». Correction : donner au cadre le rapport de l'image (`aspect-ratio: 3 / 4` ou `height: auto`) à l'échelle mobile.

### F3 finitions
- **F3-1 · Titre du hero cassé à la main sur desktop** : « Grill d'Erpent, / ouvert / 7 jours sur 7 » (`d-01-hero.png`), « ouvert » seul sur sa ligne. Retirer le `<br>` ou lier « ouvert 7 jours sur 7 » par espaces insécables, avec `text-wrap: balance`.
- **F3-2 · Hover sans réaction** sur `button "Menus"`, le lien téléphone de l'en-tête et le logo (rapport hover : 3 cibles sur 7). Ajouter un changement de couleur ou de soulignement.
- **F3-3 · CLS mobile 0,051** (seuil 0,05) sur l'accueil : réserver la hauteur des images de la galerie (`width`/`height` déjà posés ; vérifier que le CSS ne les écrase pas) .
- **F3-4 · Poids** : `photos/terrasse-canapes.webp` 316 Ko (> 300 Ko) ; police livrée en TTF (`ieVq2YZ….ttf`, audit WARN) : passer en woff2.
- **F3-5 · AI slop (self, non lancé)** : pas d'eyebrow, pas de trois cartes égales, pas de dégradé ni de glassmorphism ; reste une palette crème-brun peu marquée et un « fade » de reveal absent (reduced-motion : 0 élément à opacité < 0,1). RAS bloquant.

### Faux positifs écartés (à ne pas corriger)
- QA-revue1 « 404 : color-contrast serious sur `.kyw-footer__note`, cible 128x20, 0 h1 » : ce sont les mesures de la 404 brute de `serve.mjs`, pas de `404.html` ; sur la vraie `404.html` (5 largeurs) : 0 violation de contraste, 1 h1, `lang="fr"`, noindex, mention présente.
- WARN `audit.mjs` sitemap/robots (`sitemap-index.xml` existe, HTTP 200), « pas de robots.txt » sous `base`, `skipLinkFirst` (lessons communes).

## Critères de publication
Build OK, 0 erreur console, 0 requête en échec, 0 débordement (320 à 1440), 0 violation axe critique/sérieuse (accueil), mention + logo KYW + noindex présents, liens externes (Facebook `restoohlavache`, Instagram `resto_oh_la_vache`) conformes au dossier ; 0 lien interne mort sur l'accueil. Non PUBLIABLE à cause de F1-1 (donnée non retenue par le client) ; aucun F0.

## Ce qui est bien (à ne pas casser)
1. La carte : 231 lignes, noms et prix identiques à `donnees.json`, onglets accessibles, aucune invention (avis, histoire, équipe laissés vides).
2. Le hero sur la photo de façade avec l'enseigne, légende honnête, 237 Ko, LCP mobile 2,3 s.
3. Robustesse responsive : 0 débordement de 320 à 1440 px, menu mobile et CTA téléphone cohérents, reduced-motion sans contenu caché, alts fidèles au champ `sujet` de `photos/index.json`.
