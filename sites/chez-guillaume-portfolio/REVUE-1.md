# Revue portfolio · Chez Guillaume · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (avant DESIGN.md) : un cahier-collage de flyers de comedy club (aplats rouge rideau, vert, jaune, bleu, étiquettes à cadre noir, grand Caslon, Space Mono), dont la case du logo change selon la section (Table, Scène, Brunch, Namur).

Scores /10
- Design 8 : identité forte et propre au lieu, hero photo + étiquettes lisibles (`home/d-01-hero.png`) ; moins un trait de « cahier » qui barre les jours (F2-6).
- Usabilité 7 : navigation claire, menu mobile fonctionnel (6 liens de 354 × 88-90 px, clic vers /histoire/ OK), 0 débordement, 0 cible < 24 px ; loader encore long sur mobile (F2-4).
- Créativité 8 : case de logo vivante, vague, tasse, post-it, 404 « Décollé » (capture ciblée `rg1-d-404.png`) ; le procédé « un mot en italique dans chaque titre » devient une formule (F2-2).
- Contenu 7 : 0 fait faux, 0 invention (voir ci-dessous) ; mais cartes Mer à Sam identiques répétées et une FAQ à côté de la plaque (F2-3, F2-5).
- Technique 7 : build OK, 0 erreur console, 0 requête en échec, CLS 0, LCP mobile 1,05 s ; mais violations axe « serious » sur 6 pages sur 7 (F1-1, F1-2) que le QA n'a vues que sur la carte.

Périmètre et méthode : `QA-revue1.md` + planches (home, carte, 404 brute) ; le QA n'a capturé que 3 pages sur 7. Complété par des contrôles ciblés sur `dist/` servi sur le port 4611 (PID 1202, arrêté) : texte extrait des 7 pages comparé à `donnees.json`/`dossier.md`, méta/JSON-LD/alt, 61 références locales et externes (curl : 0 non-200 en local), axe sur les 7 pages × 2 largeurs (1440, 390), contraste calculé nœud par nœud (0 écart sous AA sur 6 pages, après défilement), menu mobile, 404.html réelle, histoire. L'écart « color-contrast » vu sur « On va voir qui ? » n'existe qu'en plein reveal et disparaît après défilement : pas un finding.

## Findings

### F0 (bloquant)
Aucun. Build OK (7 pages), 0 fait faux, 0 invention non marquée, 0 lien mort.

### F1 (majeur)
- **F1-1 · aria-label interdit posé par le split de texte (axe `aria-prohibited-attr`, serious).** Preuve : axe 1440 et 390 sur home (6 nœuds : `p.manifeste__phrase`, `span.etiquette[data-split]`…), carte (1), histoire (3, `span[aria-label="La maison"]`), privatisation (1), réservation (1) ; agenda et 404 : 0. Le QA indiquait « 0 violation » sur home. Cause : `SplitText.create(el, …)` dans `src/engine/reveal.ts:24` ajoute `aria-label` sur des `p`/`span` sans rôle. Correction : passer `aria: 'none'` à `SplitText.create` (le texte reste lisible tel quel), puis relancer axe sur les 6 pages.
- **F1-2 · Nom accessible du logo différent du texte visible (axe `label-content-name-mismatch`, serious).** Preuve : carte, agenda, privatisation (1440 et 390) ; texte visible « Chez Guillaume Scène/Table » (case de section) contre `aria-label="Chez Guillaume, accueil"` (`src/components/Logo.astro:10`). Le QA ne l'avait vu que sur la carte. Correction : supprimer l'`aria-label` (le texte visible suffit, ajouter `<span class="visually-hidden">, accueil</span>` après le texte si besoin), ou faire commencer le label par le texte visible complet.

### F2 (mineur)
- **F2-1 · Trou « PHOTO À VENIR » sur Histoire.** Preuve : `rg1-d-histoire-equipe.png` (bloc jaune d'environ 850 px de haut avec un sticker, à côté de la photo de cuisine) ; `src/pages/histoire.astro:40`. Honnête (pas d'invention), mais c'est un trou de composition visible. Correction : remplacer par une photo existante non nominative (`salle-rideaux` ou `scene-micro`, alt neutre) ou réduire la colonne à la hauteur du texte.
- **F2-2 · Formule « un mot en italique dans chaque titre » + sur-titres.** Preuve : « Le repas, avant *le rire* », « On va *voir qui ?* », « Le lieu est à *vous* », « La presse en *parle* », « Pour *venir* », « Les menus du *mois* », « Brunch et *formules* », « Un humoriste, une *table* », « Sur le *mur* », « Prendre sa *place* » ; petits sur-titres (« Manifeste », « La programmation », « Trois menus, renouvelés chaque mois »…). Correction : garder l'italique sur 2 ou 3 titres clés, laisser les autres en romain ; supprimer les sur-titres qui répètent le titre.
- **F2-3 · Quatre cartes Mer/Jeu/Ven/Sam au texte identique, sur l'accueil et l'agenda.** Preuve : texte extrait (même phrase 8 fois, WARN `audit.mjs` « sentence repeated ») ; `home/d-03-scroll.png`, `m-03-scroll.png`. Correction : une seule carte « Du mercredi au samedi » portant quatre pastilles de jour sur l'accueil ; garder le détail par jour uniquement sur l'agenda, avec des lignes réellement différentes (ou les fusionner en une).
- **F2-4 · Loader trop long sur mobile.** Preuve : `report.json` home, `loaderMs` 4767 ms mobile (4× CPU, 4G lente) et 2444 ms bureau, contre un plafond de 2,6 s (`src/engine/loader.ts:14-15`, MIN 1,1 s, MAX 2,6 s, plus sortie de 1,35 s). Mesure unique, à confirmer en deux passes. Correction : MAX à 1,8 s et sortie à 0,9 s, puis mesurer deux fois en série.
- **F2-5 · FAQ « Peut-on venir sans manger ? » sans réponse.** Preuve : `src/data/site.ts:210` répond par deux tarifs sans dire oui ou non, alors que le repas est obligatoire du mercredi au samedi. Correction (faits du dossier seulement) : « Pas du mercredi au samedi : le repas est obligatoire. Le lundi, croque-monsieur et boisson à 12 € ; le dimanche, le ticket spectacle à 20 € se prend avec ou sans buffet. »
- **F2-6 · Les lignes de cahier barrent les jours en grand.** Preuve : `home/d-03-scroll.png` (« MER », « JEU »), `d-04-scroll.png` (« SAM »), `m-03-scroll.png` (« VEN » traversé de deux traits comme un texte barré) ; `src/styles/base.css:140` (`repeating-linear-gradient` sur `.agenda`). Correction : poser un fond uni (`--c-bg` de la scène) derrière le libellé du jour, ou masquer les lignes sous la colonne du jour.

### F3 (finition)
- **F3-1 · Deux `contentinfo`** (axe `landmark-no-duplicate-contentinfo`, moderate, 7 pages) : `src/components/Footer.astro:8` et `packages/kyw-footer/KywFooter.astro:12`. Ne pas toucher au paquet ; remplacer le `<footer class="footer">` du site par `<section aria-label="Coordonnées" class="footer">`.
- **F3-2 · Horaires répétés** : 7 lignes dans le pied de page de chaque page, plus « Pour venir » et la réservation (audit : 11 WARN « phrase répétée »). Format mêlé « 18:00 à 00:00 » et « 18h30 ». Correction : résumé de deux lignes dans le pied de page, « 18h à minuit », « 10h à 18h ».
- **F3-3 · Phrase de méta-commentaire visible** : « Titres d'articles parus à l'ouverture et huit mois plus tard. Les liens sont sur la page Histoire. » (`src/pages/index.astro:152`). Le titre de L'Avenir est cité tronqué (« Le rire au menu et le succès en dessert », l'original continue « huit mois après l'ouverture… ») : ajouter « … » ou citer en entier.
- **F3-4 · Survol sans autre signal que la couleur** : `button "Menu"`, liens du logo et « Accueil » (`h-02`, `h-05`, `h-06` de l'accueil ; 6 cibles sur la carte). Ajouter un soulignement ou un décalage au survol.
- **F3-5 · Texte collé au filet** : « De 11h30 à 14h. 15 € pour les moins de 12 ans. » touche le premier trait de la liste du brunch (`home/d-05-scroll.png`). Ajouter 8 à 12 px de marge basse.
- **F3-6 · « Trois occasions »** (`privatisation.astro:43`) alors que le formulaire en propose quatre (stand-up privé en plus) : « Les occasions » suffit.

## Vérifié sans écart
- **Faits** : nom, adresse (Rue Lelièvre 4, 5000 Namur), téléphone +32 81 26 25 65, e-mail, horaires, 6 menus et prix (29/39, 39/49, 29/39 €), brunch 35 € / 15 € moins de 12 ans, ticket dimanche 20 €, lundi 12 €, plats d'octobre, brunch par mail ou téléphone, presse (3 titres, dates), liens Facebook, Instagram, presse, bon cadeau : tous conformes à `donnees.json`. Tamara Truyts est citée « à l'ouverture » (hedge correct), jamais associée à la photo.
- **Obligations** : `noindex, nofollow` (conforme au prompt, pas un écart), mention « Maquette KYW, certaines données sont illustratives » et un seul `kyw-signature` sur les 7 pages ; `lang="fr"`, un seul h1, title et description uniques, OG, canonical, JSON-LD `Restaurant` avec adresse et horaires ; 404.html réelle OK (titre, h1, lang, trois liens de sortie). Les alt correspondent au champ `sujet` de `photos/index.json`.
- Faux positifs du QA, non retenus : « 404 sans h1 / sans title / sans lang » (réponse brute de `serve.mjs`), `skipLinkFirst: false`, WARN robots.txt et sitemap.

## Ce qui est bien (à ne pas casser à la révision)
1. Le hero accueil (grande photo de scène, deux cases « Chez / Guillaume », bandeau « restaurant & comedy club », deux CTA) : lisible en 1 seconde, composition reprise en pile sur mobile (`m-01-hero.png`).
2. La case du logo qui suit la section (Table / Scène / Brunch / Namur) : signature cohérente sur bureau et mobile, aussi sur les pages d'activité.
3. Honnêteté des données : aucune métrique, avis ni citation inventés ; la page Réservation distingue clairement billetterie (soir) et e-mail/téléphone (brunch), et le formulaire de privatisation ouvre un vrai `mailto:`.
