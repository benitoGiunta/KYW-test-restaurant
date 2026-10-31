# Revue portfolio · Les Potes au Feu · passe 1

Verdict : BLOQUANT

Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : deux chefs, deux couleurs (vert sapin et moutarde) séparées par une frontière verticale qui dérive, chaque page est coupée en deux colonnes « à quatre mains » et le nom du restaurant est coupé par la frontière.

Méthode : build OK (`node scripts/build-site.mjs`, 6 pages, `dist/` inchangé), serveur sur le port 4457, `shoot.mjs --nav` sur les 6 pages (captures dans `.shots-rp-portfolio/<page>/`), `audit.mjs`, vérification de 35 URL internes (0 dead), puis mini-scripts Playwright (`elementsFromPoint`, clics souris réels, `getBoundingClientRect`, défilement fin à la molette). DESIGN.md et RAPPORT.md non lus avant la fin des captures.

Scores /10 :
- Design 7 : la frontière vert/moutarde, le nom coupé et les portraits en duotone sont une vraie idée tenue sur 6 pages (`d-01-hero.png`), mais trois grands vides (carte entre soir et midi, `rp-carte2-sheet`) et deux photos mal cadrées (portrait de profil presque noir, cocktail flou) abîment le rythme.
- Usabilité 4 : en haut de chaque page desktop, la navigation et le bouton « Réserver » ne répondent pas à la souris (6 clics sur 6 sans navigation) et le pied de page KYW n'est pas visible (voir F0-01 et F0-02).
- Créativité 8 : frise à deux voix, étiquettes D et F, scène de photos qui suit la liste des plats, loader qui se divise en deux couleurs ; pas d'équivalent générique.
- Contenu 6 : texte propre, vouvoiement, pas de tiret cadratin, faits recoupés avec le dossier (adresse, téléphone, horaires, prix, Zenchef, note Google marquée « à confirmer »), mais une citation Michelin modifiée, un fait non prouvé et beaucoup de répétitions.
- Technique 5 : 0 erreur console, 0 requête en échec, 0 violation axe, CLS 0, LCP mobile 1,0 à 2,4 s, pas de débordement à 390 px ; mais deux défauts de couches (z-index et clip-path) qui cassent des fonctions obligatoires.

## Findings

### F0 (bloquants)

**F0-01 · Pied de page KYW et bandeau « Maquette KYW » invisibles sur desktop (≥ 768 px), sur les 6 pages.**
Preuve : `.shots-rp-portfolio/index/d-07-scroll.png`, `carte/d-07-scroll.png` et capture du bas de page `rp-p/carte-bottom-1440b.png` : sous les colonnes d'adresse il n'y a que du vert et du moutarde. Le DOM est pourtant là (`.footer__bas` y=760, `.kyw-footer` y=837, logo 110×22 chargé). Cause mesurée : `#fond` est `position: fixed; z-index: 0` (`src/styles/base.css:23`) tandis que `.footer` (`base.css:282`) et `.kyw-footer` (`packages/kyw-footer`) sont `position: static; z-index: auto` ; le fond fixe est peint par-dessus. `elementsFromPoint` les liste en tête car `#fond` a `pointer-events: none`, ce qui masque le défaut à l'audit automatique. Avec `#fond { display: none }` injecté, la bande « Maquette KYW, certaines données sont illustratives. », le logo « Réalisé par Know Your Website » et la mention apparaissent (`rp-p/carte-bottom-nofond.png`). En mobile, `#fond` est masqué (`base.css:305`) et le pied de page est visible (`rp-p/carte-bottom-390.png`).
Correction attendue : `.footer, .kyw-footer { position: relative; z-index: var(--z-content); }` (ou équivalent), puis recapturer le bas de chaque page à 1440 px. Une fois corrigé, la mention apparaît deux fois à la suite (voir F3-04).

**F0-02 · Navigation d'en-tête et bouton « Réserver » inertes en haut de page sur desktop (index, carte, les-deux-chefs, histoire, 404).**
Preuve : clic souris réel aux coordonnées de « La carte » (990, 42), « Notre histoire » (1235, 42), « Réserver » (1360, 42) sur index, carte, les-deux-chefs, histoire : « NO NAVIGATION » dans 6 cas sur 6. `elementsFromPoint` au centre de chaque lien renvoie `SECTION.hero` (index, carte, histoire, 404) au lieu du lien ; `report.json` de l'index : `hover.covered = ["a La carte", "a Réserver"]` et `notes: --nav: no link to another page could be clicked`. Cause : la copie « face » de l'en-tête est coupée à la moitié verte par `clip-path: inset(0 calc(50% - 0.17px) 0 0)` (le clip-path exclut aussi le test de survol) et la copie « écho » qui s'affiche sur la moitié moutarde est `inert` + `pointer-events: none` (`src/components/Header.astro`, `.header__echo`). Les liens sont donc dessinés mais morts dès que la frontière passe sous l'en-tête, c'est-à-dire à l'arrivée sur chaque page (et jusqu'à ~400 px de défilement sur l'accueil et la 404). Seul le clavier fonctionne (stops `k-*`). Sur `histoire/` à 400 px et `reservation/` à 1200 px, une image recouvre aussi les liens (`COVERED IMG`).
Correction attendue : rendre la moitié moutarde cliquable (par exemple une couche d'en-tête non clippée qui porte les liens, `pointer-events: auto`, avec les deux couleurs en `mix-blend-mode` ou deux calques de texte sans clip sur la zone de clic), puis tester par `page.mouse.click` sur les 4 liens à scrollY 0 sur chaque page.

### F1 (majeurs)

**F1-01 · Citation Michelin modifiée entre guillemets** (`src/data/site.ts`, `presse[0].texte`, rendue par `src/pages/histoire.astro:101`). Affiché : « Un duo d'amis revisite le concept de bistronomie avec pour fil rouge la créativité. Légumes cultivés localement… » (`histoire/d-06-scroll.png`). Dossier (`dossier.md`, Réputation) : « Un duo d'amis, Damien Gorjanec et François Schepens, revisite le concept… ». Les noms sont retirés sans « […] ». Correction : citer exactement avec « […] » à la place des noms, ou passer `citation: false` et résumer sans guillemets.

**F1-02 · Fait non prouvé et non marqué : « Le premier service, à deux. »** (`site.ts:151`, étape 2020 de François, `placeholder: false`, affichée sur l'accueil et sur histoire). Le dossier ne dit rien du premier service ni du nombre de personnes en salle (Sara et Jordan « épaulent », date d'arrivée inconnue). Correction : « Les clés en main, le restaurant ouvre. » ou marquer `placeholder: true`.

### F2 (mineurs)

**F2-01 · Texte clair sur fond moutarde pendant la bascule de fond sur la carte.** À scrollY 1620 à 1710 (1440×900), les deux dernières lignes du menu du soir (« Fromage avant le dessert », « +15 € », « Supplément ») restent en papier clair alors que le fond est déjà moutarde, contraste ≈ 1,8:1 (`rp-p/rp-carte2-sheet.png`, quatrième et cinquième vignettes ; reproduit par `carte/d-03-scroll.png`). Le fond bascule dès que la section « midi » entre, avant que la précédente soit sortie. Correction : déclencher la bascule quand la section précédente a quitté le viewport, ou garder la couleur de texte de la colonne le temps de la transition.

**F2-02 · La liste de l'accueil « Le menu du soir, 67 € » mélange le menu réel et des plats absents du menu** (`index.astro:109`, `site.ts` `carteQuatreMains`) : « Tartare de boeuf aux tuiles » et « Rosace de pommes » sont notés « hors du menu actuel, illustratif » dans une liste titrée « La carte à quatre mains » sous « Le menu du soir, 67 € », « Fromage » est présenté comme un service numéroté 06, la mignardise du vrai menu est absente (`index/m-04-scroll.png`, `r-02-mid.png`). Correction : séparer « Le menu actuel » et « Vus en photo », ou ne garder que les 6 services du dossier.

**F2-03 · Ordre chronologique inventé dans les frises.** Les étiquettes « Ensuite », « Puis », « Ailleurs » (`site.ts`, parcours de Damien : Belgique puis Shanghai ; de François : États-Unis puis Montréal) donnent un ordre que le dossier ne fournit pas (« États-Unis et Montréal », « Belgique, notamment Shanghai »). Correction : « Parcours » sans ordre, ou lieux listés sans « Ensuite/Puis ».

**F2-04 · Photos mal cadrées ou sans rapport avec le texte.**
- `portrait-damien-profil.webp` (1140×642, qualité 3 au dossier) coupée en 4:5 sur l'accueil : presque noire, silhouette illisible (`index/d-02-scroll.png`, `m-02-scroll.png`).
- `bar-cocktails.webp` (1140×642, 46 Ko) coupée en 4:5 et agrandie sur la page réservation : visage et verre flous (`reservation/d-03-scroll.png`, `m-03-scroll.png`).
- Scène de l'accueil : « Fromage » illustré par une main qui sale une viande (alt « Une main sale une pièce de viande tranchée »), « Mises en bouche » par les chefs au dressage, « Soufflé » par François à la poêle (`site.ts`, `carteQuatreMains[].photo`) : l'alt décrit une autre chose que la légende affichée. Correction : recadrer avec `object-position` sur la zone nette, ou utiliser un format paysage ; ne mettre en scène que les plats dont on a la photo (boeuf confit, Saint-Jacques, tartare, dessert aux pommes).

**F2-05 · Loader trop long.** `loaderMs` 3 136 à 3 262 ms desktop sur chaque page, 3 636 à 5 059 ms mobile throttlé (seuil du prompt : 2,6 s) ; il repart à chaque chargement de page. Correction : plancher ≤ 1,6 s, et ne pas rejouer le compteur sur les pages intérieures (sessionStorage).

**F2-06 · Cinq `<figure tabindex="0">` non interactives** dans « Coulisses » (`src/pages/histoire.astro:79`) : arrêts de clavier sans rôle ni action, `keyboard.stuck: true` dans `histoire/report.json`. Correction : retirer `tabindex`.

**F2-07 · Formulaire de réservation qui jette la saisie** (`src/pages/reservation.astro`, script de fin de fichier) : le JS ouvre `form.action` sans les champs ; nom, date, heure et couverts, tous requis, sont perdus. Le texte « Formulaire de démonstration sans envoi » est honnête mais le formulaire reste inutile. Correction : retirer le formulaire (le bouton Zenchef suffit) ou le marquer facultatif et supprimer `required`.

**F2-08 · Répétitions entre sections et pages** (audit : « sentence repeated » ×8). La phrase du concept (« Une cuisine bistronomique à quatre mains… ») apparaît en citation de Damien sur carte et sur les-deux-chefs, puis en paragraphe (`histoire[3]`) sur histoire (équipe) et sur les-deux-chefs (« Ensemble »). Le paragraphe « Début de l'hiver 2019… » est lu trois fois sur histoire (rencontre + deux frises) et deux fois sur l'accueil. La frise de chaque chef est répétée sur accueil, les-deux-chefs et histoire. Correction : une seule occurrence par page, la frise détaillée sur histoire seulement.

**F2-09 · Citations rattachées aux chefs alors que ce sont des phrases du site** (`site.ts:131` et `:153`, affichées en blockquote dans la colonne de Damien puis de François sur carte et les-deux-chefs). La source dit « Le concept, sur le site du restaurant » mais la mise en page les fait lire comme des paroles des chefs. Correction : une seule citation, signée « Le site du restaurant », hors des colonnes de chef.

**F2-10 · Identité de Sara non confirmée dans l'équipe** (`histoire.astro`, `equipe[2]` avec `photo: service-frites.webp`) : le dossier dit « vraisemblablement Sara, à confirmer » ; la carte n'a que « (rôle illustratif) » et la photo laisse croire à une identification certaine. Correction : « (photo à confirmer) » ou retirer la photo.

**F2-11 · Mention d'une carte plus large non prouvée** (`site.ts:203` : « La carte complète se découvre à table ») : le dossier ne dit rien d'une carte des boissons. Correction : retirer la phrase.

### F3 (finitions)

**F3-01 · Pas d'espace insécable.** Aucun U+00A0 dans les 6 pages : « ! » + « » » seul en fin de ligne sur la citation Michelin de l'accueil (`index/d-06-scroll.png`), « » » en début de ligne dans le colophon mobile (`index/m-06-scroll.png`). Correction : U+00A0 dans « {a.texte} », dans les guillemets et avant `: ; ? !`.

**F3-02 · « Boeuf », « Oeuf » (×9 dans `site.ts`) : écrire « bœuf », « œuf »** (liaison typographique ; le dossier reprend la graphie du site).

**F3-03 · Meta description de la 404 : « sur le site de Les Potes au Feu »** (`src/pages/404.astro:7`) → « sur le site des Potes au Feu ».

**F3-04 · Mention « Maquette KYW, certaines données sont illustratives » dupliquée** (bande `footer__bas` + note du composant `kyw-footer`) : la corriger de F0-01 les rendra visibles l'une sous l'autre ; garder celle du composant et passer la bande sur « Les Potes au Feu, Namur » seul.

**F3-05 · Vides.** Environ 300 à 500 px de fond uni entre la fin du menu du soir et le bloc midi (`rp-carte2-sheet.png`, vignettes 4 à 6) ; colonne gauche moutarde vide sur 800 px (`index/d-03-scroll.png`) ; bas de la section Damien vide (`index/d-02-scroll.png`).

**F3-06 · Photos répétées.** `salle-banquette` sert de hero à histoire puis d'image de tête de « Coulisses » en duotone vert ; les portraits des chefs reviennent à l'identique dans l'équipe.

**F3-07 · « Depuis 2020, avenue de la Plante »** (`histoire.astro:16`, meta description) : le dossier ne date l'ouverture que par la création de la société (14/01/2020) et marque « début 2020 déduite » ; écrire « Depuis 2020 » reste acceptable, mais à confirmer.

**F3-08 · JSON-LD `sameAs`** contient une URL de vidéo YouTube (`watch?v=dZtMOajOefE`), pas la chaîne (`Base.astro:52`, `site.reseaux`).

**F3-09 · `aria-labelledby="hero-titre"` de la section hero de l'accueil** pointe vers le `<span>` « Chef, de la Belgique à Shanghai » (`index.astro:20`), pas vers le `<h1>` ; la région prend le nom de la légende de Damien.

**F3-10 · Détails de performance** : LCP mobile de `les-deux-chefs` 2 380 ms (limite 2 500), défilement mobile de l'accueil 25 ips en throttlé (`index/report.json`), page histoire ≈ 1,06 Mo d'images (audit) ; `contrastNeedsReview` 39 à 91 par page non tranchable par axe, mais les couples muted mesurés (encre 72 % sur moutarde 5,2:1, papier 72 % sur vert 5,6:1) passent.

## Ce qui est bien (à ne pas casser à la révision)

1. La frontière vert/moutarde qui coupe le nom, l'en-tête et les sections en deux voix, avec sa version mobile propre (le nom sur deux bandes, menu plein écran lisible, `index-menu-m.png`) : l'idée est lisible dès la première capture et tient sur toutes les pages.
2. L'honnêteté des données : e-mail absent, avis inventés retirés, note Google marquée « à confirmer », plats d'exemple et attribution des plats « illustratifs », formulaire annoncé comme démonstration ; 0 fait faux sur adresse, téléphone, horaires, prix, URL Zenchef, Facebook, Michelin.
3. Le socle technique : 0 erreur console, 0 requête en échec, 0 lien mort (35 URL), un seul `h1` par page, `lang="fr"`, lien d'évitement, JSON-LD `Restaurant` avec adresse, horaires et réservation, `noindex` sur les 6 pages, 0 débordement, reduced-motion sans texte caché (`hiddenText: 0`), 404 dessinée dans le ton du site.
