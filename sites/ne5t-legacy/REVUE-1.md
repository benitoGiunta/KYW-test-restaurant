# Revue legacy · NE5T Hôtel & Spa (restaurant Intuition) · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une ferme en pierre éclairée de nuit, tout en brun chaud, serif à empattements doux et corail, qui vend une table à prix affichés (60, 75, 50 €) et un spa, sans slogan creux ; sobre, atmosphérique, plutôt crédible.

Preuves utilisées : `QA-revue1.md` et planches (`.shots-ne5t-legacy-revue1/{home,ne5t-item,404}`), captures ciblées `.shots-ne5t-legacy-revue1/rel/`, 3 scripts maison (réseau + ordre du Tab sur 7 pages ; débordement, images, reveal, axe wcag2a/aa sur 7 pages x 390 et 1440 px, `404.html` réel inclus ; liens internes confrontés à `dist/` : 144, 0 mort), `sloplint` sur 6 pages, grep du `dist/`. Serveur : celui de la QA (port 4503, PID 17481), non lancé par moi, non arrêté.

Scores /10
- Design 7,5 : hero façade de nuit (`d-01-hero.png`) tenu, hiérarchie serif/sans nette, rythme de bandes sombres ; mais le bloc suites est une liste nue (`d-04-scroll.png`).
- Usabilité 7,5 : téléphone en CTA partout, menu `popover` testé au téléphone (`m-02-scroll.png`), skip link, pas de débordement ; cibles de 18 à 20 px sur les liens en ligne.
- Créativité 6,5 : parti pris cohérent (dalle de prix `35 €`, hero poster) mais peu de moment mémorable après le hero ; pages intérieures très proches les unes des autres.
- Contenu 7 : faits conformes au dossier, aucune invention, placeholders signalés ; suites sans aucune description.
- Technique 8 : build OK, 0 erreur console hors favicon, axe 0 violation sur les 7 pages à 2 largeurs, LCP 0,5 à 1,8 s, CLS 0 à 0,029.

## Findings (par gravité)

Aucun F0. Build OK, 0 lien mort (144 internes testés), 0 fait faux, 0 invention non marquée, 0 débordement, 0 violation axe, mention + logo KYW + `noindex` présents sur les 7 pages.

### F1 (majeur)
- **F1-1 Suites : six noms et rien d'autre.** `src/pages/suites.astro` et le bloc « Quatre suites, deux duplex » de `index.astro:67-80` n'affichent que des noms ; les 6 entrées de l'accueil pointent toutes vers la même page `suites/` (`d-04-scroll.png`), la page suites n'a que 3 photos génériques (salon cheminée, chambre, salon clair). Une page de produit hôtelier sans une ligne ni une photo par chambre n'aide pas à choisir. Correction : utiliser les photos déjà dans `photos/` et non employées (`23-suite-terrasse-bain`, `24-duplex-vauban`, `19-duplex-salle-a-manger`, `22-cuisine-ilot`) légendées par le nom que le fichier porte (Suite Terrasse, Duplex Vauban) et rien de plus ; pour les autres chambres, un seul slot `.fill` « description à fournir » plutôt qu'un vide ; sur l'accueil, remplacer les 6 liens identiques par une photo + 1 lien, ou des noms non cliquables.

### F2 (mineur)
- **F2-1 Favicon absent.** Aucun `<link rel="icon">` dans le `<head>` (`src/layouts/Base.astro`) : chaque page déclenche `GET /favicon.ico` 404 (mesure réseau : `Failed to load resource 404 @ /favicon.ico`). C'est l'erreur console « non identifiée » de la QA (accueil, bureau). Correction : icône SVG en data-URI (monogramme NE5T) ou fichier `public/favicon.svg` avec le préfixe `/ne5t/legacy/`.
- **F2-2 Méta incomplètes.** Ni `og:title/og:description/og:image`, ni `canonical`, ni JSON-LD `Restaurant` (nom, adresse Avenue Vauban 46, téléphone, `servesCuisine`, `openingHoursSpecification` limité aux jours connus) sur les 7 pages (grep du `dist/`). Correction : les ajouter dans `Base.astro` ; ne pas inventer d'heures (jours seulement, ou omettre `opens/closes`).
- **F2-3 « Des chambres sous poutres » généralisé.** `suites.astro` (lead du hero). Seule la photo `18-chambre-lit` montre des poutres ; le dossier dit seulement « chacun avec son style, du design contemporain à l'ambiance chaulée et bois vieilli ». Correction : « Chacune a son style, dans la pierre de la ferme. »
- **F2-4 « Une sélection de vins accompagne chaque formule ».** `restaurant.astro:74`. Le dossier donne l'accord vins comme supplément (40 € avec 3 services, 50 € avec 4), pas comme inclus. Correction : « Une sélection de vins à table est proposée avec chaque formule, en supplément. » Le titre « Le vin et le rhum » promet du rhum, dont rien n'est dit : ajouter « Manu choisit aussi les rhums » (dossier : « vin et rhum ») ou retitrer.
- **F2-5 Cibles tactiles < 24 px.** Mesure : « 081 58 88 88 » 81 x 18 et 93 x 20, « info@ne5t.com » 111 x 20, « la page du spa » 90 x 18 (spa), liens de pied de page 20 px de haut, à 390 et 1440 px (aussi dans QA : 8 en bureau). Les liens du pied sont espacés (exception d'espacement), pas le téléphone et l'e-mail empilés par `<br />`. Correction : `display: inline-block; min-height: 24px; padding-block: 2px` sur `.addr a` et `.link` en ligne.

### F3 (finition)
- **F3-1 Deux images > 300 Ko.** `photos/01-facade-nuit-piscine.webp` 311 Ko, `photos/03-ailes-batiment.webp` 454 Ko. Recompresser (q 70) ou réduire à 1600 px.
- **F3-2 Polices Google chargées depuis un CDN** (`<link href="https://fonts.googleapis.com/…">`, sans préchargement) : dépendance externe, léger FOUT, souci RGPD pour un vrai site. Auto-héberger en woff2 à l'étape de production. Les 68 WARN « ttf shipped » de l'audit sont des faux positifs : `dist/` ne contient aucun `.ttf` (le CSS Google est servi en ttf à un client sans user-agent).
- **F3-3 Dalle « 35 € » seule.** `index.astro:53` : `aria-label="35 euros"` et chiffre géant sans « résidents », qui n'apparaît que dans la ligne suivante ; un lecteur d'écran et un regard rapide lisent « spa à 35 € » alors que les non-résidents paient 70 €. Correction : `aria-label="35 euros pour les résidents"` et « résidents » dans le chiffre ou juste dessous.
- **F3-4 Mentions de pied de page** : texte de la maquette et logo KYW en petit gris sur bande claire, présents et discrets, conformes ; rien à corriger. Note sur la QA : le seul `color-contrast` serious (4,36 : 1, `.kyw-footer__note`) concerne la page 404 racine générique de KYW (le serveur de `dist/` répond par `dist/404.html` à toute URL inconnue, `404/d-01-hero.png` : « Retrouvez les maquettes de sites de restaurants namurois… »), pas le `404.html` du site, dont l'axe donne 0 violation (`rel/404_html-1440.png`, designé, nav et pied du site). Le composant est partagé (`packages/kyw-footer`) : à signaler à la session mère, hors périmètre de ce site.
- **F3-5 Écarts avec `QA-revue1.md`** (pour ne pas corriger à tort) : le lien d'évitement est bien le premier arrêt du Tab (mesuré : « Aller au contenu »), contrairement à « Clavier : lien d'évitement en premier : non » ; ETAT.md déclare faux positifs les 12 FAIL de `sloplint` sans `--render` (26a, 34) : confirmé, le CSS externe contient `:focus-visible` (5), `:active` (3), `overflow-x: clip` ; la QA n'a capturé que 3 pages sur 7, mais l'axe et le débordement des 7 pages sont couverts par mon script.
- **F3-6 Libellé visible « Heures exactes : à confirmer auprès du restaurant »** (restaurant, infos, accueil) : sens correct (placeholder déclaré, heures inconnues du dossier) mais lu comme une note interne ; si le client ne confirme pas, tourner en « Les heures du service se donnent par téléphone ».

## Contrôles de conformité
- Faits : nom, adresse Avenue Vauban 46 5000 Namur, 081 58 88 88, info@ne5t.com, prix (60/75/50 €, vins 40/50 €, 14 € + 9 €, 35/70 € spa, 90 à 195, 95 à 145, 50 à 95, 260 à 400 €, 26/30 €), plats, équipe (Benoît Gersdorff, Christine, Pierre Brahy, Nico, Manu), réseaux (Facebook, Instagram, TripAdvisor), RoomRaccoon : tous conformes à `donnees.json`. Aucun avis, note, presse ou distinction inventés. L'adresse contradictoire (Allée de Menton) est notée au dossier, le site garde la source ne5t.com.
- Texte : vouvoiement, pas de tiret cadratin (0 occurrence), ponctuation française correcte (« : » précédé d'une espace), pas de filler (« unique » n'apparaît que dans « uniquement »), pas d'eyebrow, pas de trois cartes égales, pas de dégradé, `h1` unique par page, `lang="fr"`, titres et descriptions uniques.
- Mouvement : reveal sans texte masqué (0 élément à opacité < 0,5 après 2,6 s), `prefers-reduced-motion` présent dans le CSS (QA : 0 texte masqué).
- Slop : un chiffre géant (« 35 € ») et le hero « poster » sont des choix assumés, pas du slop ; aucun gabarit générique repéré.

## Ce qui est bien (à ne pas casser)
1. Le hero de l'accueil : façade de nuit, titre serif posé sur la zone sombre du bassin, deux CTA lisibles dont le téléphone en premier (`d-01-hero.png`).
2. La page restaurant : carte du mois en lignes propres, catégories en serif, prix corail ; formules et vins lisibles sans décor (`ne5t-item/d-02-scroll.png`).
3. Le mobile pensé : menu `popover` avec bouton « Réserver » raccourci, lignes de prix empilées, 0 débordement à 390 px sur 7 pages (`m-02-scroll.png`).
