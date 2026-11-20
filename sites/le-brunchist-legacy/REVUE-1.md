# Revue legacy · Le Brunchist · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : un menu de café-brunch en papier crème et bleu outremer, titres en gothique, une page unique qui mène à l'appel téléphonique, avec le registre des jours d'ouverture comme point fort.

Scores /10
- Design 7 : hero 1440 net (titre en 4 lignes, photo carrée, deux boutons) et bande bleue des horaires qui rompt la page (d-01-hero, d-06-scroll) ; le gothique donne un caractère mais évoque plus la brasserie ou le journal que le brunch décontracté.
- Usabilité 8 : appel et itinéraire au premier plan, ligne « Aujourd'hui » juste (vendredi 20/11), menu mobile `<dialog>` OK (focus sur « Carte » à l'ouverture, retour sur « Menu » avec Échap, fermeture au clic sur un lien), onglets de la carte au clavier (flèches, Début/Fin), premier Tab = « Aller au contenu ».
- Créativité 6 : une seule idée (le registre du jour), le reste est un gabarit propre (split hero, tableau, bande) ; pas de reveal, thème « still » voulu.
- Contenu 6 : faits conformes à donnees.json, incertitudes signalées sur la page, mais une formule invente un classement des plats et un nom complet de particulier est publié.
- Technique 8 : 0 erreur console, 0 requête en échec, pas de débordement (390, 768, 1440), LCP mobile 1,6 s sous CPU x4 + 4G (2 passes), CLS 0,0017, 0 contraste faible mesuré (canvas, tous les nœuds texte, 3 largeurs), photos webp de 123 à 227 Ko, `lang="fr"`, un seul h1.

Build : OK (QA-revue1 : 0 FAIL, 8 WARN). noindex, mention « Maquette KYW, certaines données sont illustratives » et logo KYW (un seul) présents sur l'accueil et sur `404.html`. 0 lien mort (accueil, 404.html, 3 photos, sitemap : 200 ; liens externes et `tel:` conformes à donnees.json).

## Findings

### F1 majeur
- **F1-1 · T-invente · `src/components/Carte.astro:9`** : « Les plats que les convives citent le plus » affirme un classement de fréquence que le dossier ne donne pas (dossier.md § Offre : plats « cités » par des sources tierces, sans fréquence). Preuve : texte du dist, section La carte. Correction : « Plats cités par des sources tierces, au salé, au sucré et au verre. » (ou retirer « au verre »).

### F2 mineur
- **F2-1 · JSON-LD sans horaires · `src/layouts/Base.astro:36`** : le `CafeOrCoffeeShop` a adresse et téléphone mais ni `openingHoursSpecification` ni `image` (prompt § C : JSON-LD avec adresse et horaires). Preuve : extrait du `<script type="application/ld+json">` du dist. Correction : ajouter les 5 jours mercredi à dimanche 09:30-15:30 (déjà dans `horaires` de `site.ts`) et `image`.
- **F2-2 · Deux `contentinfo` · `src/components/Pied.astro:5`** : `<footer class="mast">` + `<footer>` de `kyw-footer` : axe `landmark-no-duplicate-contentinfo` (moderate) à 1440, 768 et 390 px (script maison, axe-core complet ; absent du QA). Correction : passer le pied du site en `<div class="mast">` (ou `<section aria-label>`) sans toucher au paquet `kyw-footer`.
- **F2-3 · Avis : particulier nommé en entier · `src/data/site.ts` (`avis`)** : « Wendy Sajid-Witte » (nom complet d'un client) publié à côté d'un extrait tronqué « Very cozy, good fresh foods […] ». Les deux extraits sont en anglais, sans mention. Correction : prénom seul ou initiale (« Wendy S. »), et « (en anglais) » ou traduction entre crochets ; donnees.json garde `extraits_avis: []` : le marquer illustratif sur la page.

### F3 finition
- **F3-1 · Horaires affirmés sans réserve hors de la section Horaires** : hero (`Hero.astro:9`), pied (`Pied.astro:19`), meta description et titre disent « du mercredi au dimanche, 9 h 30 à 15 h 30 » alors que le dossier relève des contradictions (week-end seul 9:00-15:00 ; mercredi 10:00). Seule la note de la bande bleue dit « à confirmer ». Correction : ajouter « (à confirmer) » au pied, au moins.
- **F3-2 · Ponctuation autour de `.fill` · `Horaires.astro:17`, `Carte.astro:36`, `src/styles/page.css:42`** : « Réservation : » laisse le « : » seul en début de ligne à 1440 (d-06-scroll) et le padding inline du `.fill` ouvre un blanc avant le point final (« à confirmer avec le café . »). Correction : espace insécable avant « : », `padding-inline` retiré du côté droit ou point placé dans le span.
- **F3-3 · Photo de la carte hors carte** : le croissant aux amandes (légende « Photo provisoire d'un croissant aux amandes ») n'est pas un plat listé. Honnête (légendé provisoire) mais à remplacer par une photo d'eggs benedict ou de granola (RAPPORT.md le dit déjà).
- **F3-4 · Cibles de nav à 21 px de haut sur bureau** (« Carte » 40x21, « Le lieu » 46x21, « Horaires » 61x21 ; QA) : conformes à WCAG 2.5.8 par l'exception d'espacement (entre 40 et 56 px), 44 px en pointeur grossier ; simple finition.
- **F3-5 · Rythme** : sloplint REFLEX 59 (écart minimal entre sections 60 px, entre la bande bleue et le pied) alors que les autres sont à 240-300 px. Les 8 FAIL de sloplint sont tous dans `.kyw-footer` ou l'absence du tampon sur ma copie aplatie (faux positif de l'aplatissement).

### Faux positifs écartés (QA)
- 404 « serious » `color-contrast` du QA : réponse brute de `serve.mjs` ; le vrai `404.html` (title, h1 « Cette page n'existe pas », noindex, pied KYW) a 0 violation axe à 1440 et 390 px.
- `skipLinkFirst: false` : `keyboard.stops[0]` = « Aller au contenu ».
- « Pas de sitemap » : `sitemap-index.xml` et `sitemap-0.xml` existent (200) ; pas de robots.txt (maquette noindex, voulu).
- « 9 h 30 à 15 h 30 » répété 5 fois : ligne du jour + tableau, voulu.
- Polices TTF : Google Fonts distant, sans effet mesuré (LCP 1,6 s).
- Cibles tactiles QA mobile : 44 px mesurés, 0 petite cible hors inline.

## Ce qui est bien (à ne pas casser)
1. Honnêteté du contenu : carte légendée « Compositions illustratives », prix « à renseigner par le café », photos provisoires créditées (auteur, licence), pas de réservation en ligne inventée, fondateurs « selon ELLE.be, à confirmer ».
2. La signature « registre du jour » (ligne « Aujourd'hui » calculée, bande bleue pleine largeur) et la hiérarchie du hero à 1440 ; mobile pensé (CTA pleins, photo après le texte, menu dialog).
3. Robustesse : aucun débordement, aucun défaut console, focus visible partout, onglets accessibles au clavier, 404 dessinée (« La table que vous cherchez est ailleurs. »).

## Hypothèses et limites
- Captures complètes lues via QA-revue1 (planche home, d-01/02/04/06/07) ; mesures ajoutées par scripts maison (serveur 127.0.0.1:4781, PID 14395, arrêté). Pas de DESIGN.md lu avant avis. Sloplint exécuté sur copie aplatie dans le scratchpad (tampon CSS absent de la copie).
- Photos du dossier : aucune ; vérification des alt contre le contenu des images faite sur d-01, d-02 et la planche (matcha, croissant, fauteuil : conformes).
