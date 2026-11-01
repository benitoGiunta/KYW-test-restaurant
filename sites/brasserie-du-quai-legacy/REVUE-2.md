# Revue legacy · La Brasserie du Quai · passe 2
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site : une brasserie de nuit, fond café presque noir et or, la salle et la terrasse sur la Meuse en plein cadre, un « 15 € » ocre pour les six Normandes, une action « Réserver » à chaque écran.

Bilan : les 3 corrections annoncées dans `REVISION-1.md` (F1-1, F2-1, F2-2) tiennent à la mesure ; F2-3 est corrigée pour le pied de page et le bloc adresse mais la répétition subsiste à l'accueil (F2-3 ci-dessous). Aucun F0, aucun F1. Quatre F2 (dont un nouveau, un point de gabarit déjà signalé par sloplint) et quelques F3.

Scores /10
- Design 8 : palette noir/or inchangée, hero salle plein cadre propre (`home/d-01-hero.png`, `m-01-hero.png`), pied de page à 2 colonnes net (planche `home/planche.png`).
- Usabilité 8 : 0 cible < 24 px hors lien en ligne, 0 débordement (390 à 1920 mesuré, 320 aussi), CLS ≤ 0,024, menu et barre collante intacts.
- Créativité 7 : inchangé depuis la passe 1 (signature « 15 € » et badge de saison, mise en page de brasserie attendue).
- Contenu 8 : faits et carte conformes à la passe 1 ; 0 tiret cadratin ; noindex, mention et un seul `kyw-signature` sur les 7 pages (grep sur `dist/`). Réserve : horaires JSON-LD (F2-2) et phrase répétée (F2-3).
- Technique 8 : LCP mobile galerie 1 176 ms (4 128 avant), accueil 1 092 ms, carte 1 432 ms (CPU ×4, 4G lente, DPR 2) ; 0 erreur console, 0 requête en échec, 0 requête tierce ; contraste calculé 0 sous 4,5:1.

## Vérification des corrections de REVISION-1
| Réf | Verdict | Preuve |
|---|---|---|
| F1-1 LCP galerie | corrigé | `dist/.../galerie/index.html` : 1 `loading="eager"` + `fetchpriority="high"` (`07-salle-baies-vitrees`, `sizes` « … 320px »), 23 `lazy` ; mesure mobile throttlée, 2 passes : LCP 1 176 ms, élément `07-salle-baies-vitrees-640.webp` ; CLS 0 ; QA-revue2 : LCP mobile de la fiche réservation 960 ms |
| F2-1 JSON-LD horaires | corrigé sur la forme, voir F2-2 sur le fond | JSON-LD parsé : 4 `OpeningHoursSpecification` (12:00-14:30 / 18:00-21:30 du 2026-11-01 au 2027-04-30, 12:00-14:30 / 18:00-22:00 du 2027-05-01 au 2027-10-31), conformes à `donnees.json` |
| F2-2 polices | corrigé | `grep fonts.googleapis\|fonts.gstatic` sur `dist/brasserie-du-quai/legacy` : 0 fichier ; `preload` de `young-serif.*.woff2` ; 3 woff2 en 200 ; mesure : 0 requête hors 127.0.0.1 sur galerie, accueil, carte ; `document.fonts` : Young Serif et Instrument Sans `loaded` |
| F2-3 phrase répétée | partiel | pied de page = adresse, bloc Venir sans la phrase (confirmé, 0 occurrence sur réservation, galerie, carte, écailler, chèque-cadeau, 404). Mais l'accueil garde « pont du Luxembourg » dans le hero (lead), le h2 `Au pied du pont du Luxembourg` ET le paragraphe qui suit (« C’est au pied du pont du Luxembourg, sur les berges de la Meuse, … ») : 3 fois en texte visible, 5 dans le HTML (+ `meta description`, `og:description`), pas « 4 » comme annoncé dans REVISION-1 |

## Findings

### F2 (mineur)
- **F2-1 · Hero plus haut que l'écran de 33 px sur tout le bureau.** Preuve : mesure `.hero` top 105 px, hauteur 1 008 px à 1920×1080 (fin à 1 113), 828 px à 1440×900 (fin à 933), 731 px à 1280×720 (fin à 836) ; sloplint `src --url … --genre atmospheric` : `FAIL 44d` à 1920 (« hero ends at 1113px »), `REFLEX 44c` à 1440 (« ends at 933px »). Cause : `src/styles/page.css:101` `min-block-size: calc(100dvh - var(--nav-h))` avec `--nav-h` = 72 px alors que barre d'adresse + en-tête font 105 px. Correction : régler `--nav-h` sur la hauteur réelle (105 px bureau) ou mesurer en JS/`calc` des deux barres ; vérifier que les deux boutons restent dans le premier écran.
- **F2-2 · JSON-LD : horaires déclarés pour les 7 jours.** Preuve : les 4 `OpeningHoursSpecification` n'ont pas de `dayOfWeek` (`src/layouts/Base.astro:27-35`) ; en schema.org, cela veut dire « ouvert tous les jours ». Or `donnees.json` : mardi, mercredi « inconnu », dimanche « inconnu », fermeture hebdomadaire à confirmer (et la page affiche elle-même « Jour de fermeture : à confirmer par la maison »). Le balisage affirme donc ce que le site refuse d'affirmer. Les dates `validFrom`/`validThrough` sont figées au build (fin 2027-10-31). Correction : ne publier les `openingHoursSpecification` qu'avec les jours confirmés ; d'ici là les retirer du JSON-LD (ou ne garder que les plages dans `description`) et le consigner dans `RAPPORT.md`.
- **F2-3 · Phrase encore répétée à l'accueil.** Preuve ci-dessus (3 occurrences visibles). Correction : réécrire l'ouverture du paragraphe sous le h2 (`src/pages/index.astro`, bloc `lieu__texte`), par exemple « La Brasserie s’est posée sur les berges de la Meuse. De grandes baies vitrées… », et corriger le décompte dans `REVISION-1.md`.
- **F2-4 · Sloplint : FAIL 48 sur `.hero__photo::after`.** Preuve : `src/styles/page.css:104`, deux `oklch(12% 0.008 60 / …)` littéraux hors jetons (FAIL 48 ×2, déjà relevés par REVISION-1 comme « antérieurs » et laissés). Correction : un jeton `--color-scrim` (ou `color-mix` sur `--color-paper`) dans le bloc de jetons, utilisé dans le dégradé.

### F3 (finition)
- **F3-1 · Apostrophes droites restantes (non traitées, REVISION-1 ne traitait pas les F3).** Preuve : texte de `/la-carte/` et `/lecailler/` : 3 occurrences chacune (« d'ici et d'ailleurs », « maître d'hôtel », « L'assiette … »). Correction : `’` dans `src/data/carte.json`, regex `\p{L}` avec drapeau `u`, recompte sur `dist/`.
- **F3-2 · Format des heures** : « Midi 12:00 à 14:30 » toujours en notation informatique (`index.html`, `reservation/`). Correction : « Midi, de 12 h 00 à 14 h 30 » avec espaces insécables.
- **F3-3 · `og:image` en webp** (`…07-salle-baies-vitrees-1140.webp`) : fournir un jpg 1200×630.
- **F3-4 · Titre de l'accueil trop long** : `<title>` de 71 caractères (audit WARN, limite 70). Correction : raccourcir d'un mot.
- **F3-5 · Lien téléphone de /reservation/ à 104×22 px en mobile** (`shoot` : 1 cible trop petite). Lien en ligne dans une phrase : exempté par WCAG 2.5.8 ; ne pas ajouter de `padding-block` (leçon : il gonfle l'interligne). Aucune correction demandée.

## Faux positifs écartés (pour mémoire)
- Axe sur la « 404 » de QA-revue2 (`document-title`, `html-has-lang`) : c'est le repli de `serve.mjs` ; `dist/.../404.html` a `lang="fr"`, `<title>Page introuvable · La Brasserie du Quai</title>`, un h1, noindex, mention et `kyw-signature` (grep).
- Axe « contraste à vérifier » (12 sur l'accueil) : contrôle calculé sur le texte de 4 pages (accueil, réservation 390, carte, écailler), 0 texte sous 4,5:1 (3:1 pour les grands) ; le texte du hero posé sur la photo est lisible sur `home/d-01-hero.png` et `m-01-hero.png` mais non mesuré.
- `skipLinkFirst: false` du shoot : faux négatif connu (voir REVUE-1).
- 3 survols « sans changement » (logo, lien de la page courante, adresse) : acceptables.
- WARN audit « pas de sitemap » : `dist/` contient `sitemap-index.xml` ; « pas de robots.txt » sans objet pour une maquette `noindex`.

## Limites de cette passe
- Captures : celles de l'agent « captures » (`QA-revue2.md`, build 17:27, planches 17:33, postérieures à `dist/`). Le shoot de revue ne couvre pas la galerie, la carte, l'écailler ni le chèque-cadeau : leurs mesures viennent de mes scripts (LCP, CLS, débordement, polices, requêtes) et de grep sur `dist/`.
- Serveur : port 4503 déjà tenu par un processus préexistant (PID 27527, non lancé par moi, non arrêté) ; je n'ai pas lancé de serveur.
- Modules Zenchef et Brydge non chargés (à la demande) : FAIL 26a possible non revérifié.
- Fonds : texte sur photo non mesuré en contraste.

## Ce qui est bien (à ne pas casser)
1. Les polices auto-hébergées : 0 requête tierce, `preload` du titre, rendu identique ; ne pas revenir à Google Fonts.
2. La galerie : photo LCP en `eager` + `fetchpriority="high"`, `sizes` ajustés, 22 autres en `lazy`, CLS 0.
3. Le pied de page à deux colonnes (adresse, courriel, Itinéraire) et la sobriété du contenu : placeholders marqués, aucune donnée inventée.
