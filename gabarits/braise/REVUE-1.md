# Revue gabarit · braise (Les Potes au Feu) · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : un thermomètre de cuisson (900 °C à 20 °C) accompagne le défilement d'une soirée, du passe à la table, en bruns brûlés et orange braise, avec des photos de cuisine très chaudes.
Méthode : auto-score avec quality-bar.md (pas de jury). Captures `.shots-braise-revue/<page>/` (planches `pl-*.png`), build refait OK (6 pages), 37 liens internes tous en 200, JS 62 Ko gzip, aucun fichier > 300 Ko, 0 erreur console ni requête en échec sur les 5 pages lues en image. La 404 a été jugée par son HTML et son statut HTTP (404 correct, h1, noindex, mention) : sa capture n'a pas été lue (budget d'étapes).

Scores /10 (pondéré 0,4 D + 0,3 U + 0,2 C + 0,1 Co = 6,4)
- Design 7 : système typographique net (Melodrama fine + Literata), palette brûlée cohérente, pied de page géant `d-07`, mais le thermomètre fixe chevauche le contenu (`d-01`, `d-03`, `d-06`, `m-01`) et Réservation et Privatisation sont creuses (moitié d'écran vide, `m-01` priva).
- Usabilité 5 : LCP desktop 3,8 à 4,8 s, mobile bridé 6,5 à 9,0 s, loader mobile 5,9 à 8,2 s (seuil 2,6 s), FPS 16 à 24 ; barre fixe « Réserver / Appeler » mobile qui double les CTA ; axe serious sur 2 pages.
- Créativité 7 : le thermomètre 900 vers 20 °C et les couches de l'assiette sont propres au sujet et tenus sur toutes les pages ; l'interaction de scroll reste classique.
- Contenu 6 : histoire et faits exacts, mais descriptions de plats inventées non marquées, deux avis fictifs (marqués), répétitions de blocs.
- Technique : Sémantique/SEO 8 (1 h1, title et description uniques, JSON-LD Restaurant avec adresse, horaires, geo, vraie 404) ; Animations 7 (CTA principal en mouvement, mais 5 cibles primaires en couleur seule) ; Accessibilité 5 (axe serious contraste histoire et réservation, `hiddenText` 4 accueil, 3 carte en reduced-motion) ; WPO 4 (LCP et loader hors seuil) ; Responsive 7 (0 débordement, nav et logo sur 2 lignes à 390 px, cible « Réalisé par » 22 px) ; Markup/Meta 8 (OG, favicon, canonical, noindex).

## Points signalés par le constructeur
- LCP / loader : confirmé, non corrigé. `desktop.vitals.lcpMs` 4776 (accueil), 4408 (carte), 4424 (resa), 3784 (priva) ; mobile 8980, 8272, 6456, 6680 ; élément LCP = `p.hero__lead` (le texte attend la fin du loader, `loaderMs` 3,3 à 3,9 s desktop, 5,9 à 8,2 s mobile). Mesures en série.
- FPS : `scrollFps` 19-24 desktop (GPU logiciel, plancher), 16-29 mobile bridé : sous 30 partout, pire sur l'accueil (16 mobile).
- Contrastes « corrigés » : non confirmés sur ce build. axe remonte `#e8632c` sur `#40241a` à 4,2:1 (`.chapeau` de /histoire/, 2 nœuds) et `#a3431a` sur `#e6d5bf` à 4,33:1 (`.chapeau` de /reservation/, 3 nœuds). Accueil, carte, priva : 0 violation.

## Findings (triés par gravité)
### F0 (bloquant)
Aucun (build OK, 0 erreur console, 0 lien mort, noindex + mention + logo KYW sur les 6 pages).

### F1 (majeurs)
- F1-1 T-invente : descriptions de plats absentes de `donnees.json` (descriptions vides) et marquées `placeholder: false`. `src/data/site.ts:86-91, 112-117` : « Trois bouchées pour ouvrir la soirée », « Saint-Jacques snackées, mousseline et tuile noire » (aussi dans l'alt de photo), « La pièce confite, purée de carotte, chou et jus corsé », « Servi dès la sortie du four », « Pommes du verger voisin, caramel », « Trois fromages, pain au levain », « les légumes des producteurs du coin ». Visibles sur accueil et carte. Correction : `placeholder: true` avec la pastille « exemple illustratif » déjà utilisée pour le midi, ou suppression.
- F1-2 T-invente : `manifeste.avant` « Des légumes cultivés à côté, une cuisine ouverte sur la salle » (le dossier dit « légumes cultivés localement », rien sur une cuisine ouverte ; reprise en priva) ; « au bord de la Meuse » (baseline, phrase de Damien) absent du dossier. Reformuler avec les mots du dossier ou marquer.
- F1-3 WPO : LCP mobile 6,5 à 9,0 s, loader mobile 5,9 à 8,2 s (seuils 2,5 s / 2,6 s) ; `p.hero__lead` n'apparaît qu'après le loader. Correction : sortie du loader ≤ 1,5 s, h1 et lead visibles sans attendre l'animation, loader sauté en navigation interne et sur mobile.
- F1-4 Accessibilité : 2 violations axe serious de contraste encore présentes (voir plus haut). Correction : `.chapeau` plus clair sur fond sombre (≥ #f0875a sur #40241a), plus foncé sur `#e6d5bf` (≤ #8f3a14).
- F1-5 Design / usabilité : le thermomètre fixe (« 900 °C CUISSON », bas gauche) se superpose au texte : accueil `d-01` (« finit à table. »), `d-03` (titre « quatre services »), `d-06` (« Venir, réserver, offrir »), carte `d-03` (« Desserts et fromages ») et `d-04` (« Cocktail de la maison »), mobile `m-01` accueil et carte (sur le CTA « Réserver une table » et sur « Le soir, menu dégustation »), `m-06` sur « Jeudi ». Correction : gouttière gauche réservée ou fond/blend, masqué sous 600 px.
- F1-6 Mobile accueil `m-04` : aplat orange plein (≈ 490 × 650 px) sur la photo de François, qui touche le lien « Leur histoire » ; rideau de révélation resté fermé ou photo manquante, à vérifier. Preuve : `.shots-braise-revue/accueil/m-04-scroll.png`.

### F2 (mineurs)
- F2-1 Reduced-motion : `reduced.hiddenText` 4 (accueil), 3 (carte), 2 (histoire), 0 attendu ; `carte/r-02-mid.png` : rangées « Boissons » presque illisibles.
- F2-2 Hover : primaires en couleur seule : accueil `h-02` (couches), `h-03` « Suivre la soirée », `h-04` « Toute la carte » ; carte `h-01` « Tout », `h-03` « Privatiser le samedi ». Donner un mouvement ou un remplissage comme le CTA principal.
- F2-3 Répétitions : horaires, adresse, e-mail et téléphone deux fois sur /reservation/ (bloc de page puis pied de page) ; priva répète « Le samedi, la salle est à vous » (chapeau puis première formule) ; mention « Maquette KYW… » deux fois dans le pied.
- F2-4 E-mail `bonjour@lespotesaufeu.be` (`placeholder: true`, `site.ts:64`) affiché et en `mailto:` (« Écrire aux chefs », pied) sans marqueur visible. Ajouter la pastille ou retirer le mailto.
- F2-5 Meta : « La carte des Les Potes au Feu » et « L'histoire des Les Potes au Feu » (descriptions de /carte/ et /histoire/) ; title de /histoire/ « Les potes » peu informatif.
- F2-6 Photos : Sara illustrée par un cocktail flou (`bar-cocktails.webp`), Jordan par un aplat sombre avec « J » (`histoire/m-04`, `m-05`) ; une seule photo (placeholder) en priva ; heros resa et priva sans image.
- F2-7 Mobile : logo et liens « La carte », « Les potes » sur deux lignes (`m-01`) ; barre fixe « Réserver / Appeler » qui double le CTA du hero ; cible « Réalisé par » 181 × 22 px (< 24).
- F2-8 Heures : « 19 h » dans le hero, « 19:00 à 21:00 » ailleurs ; unifier en « 19 h à 21 h ».
- F2-9 `idleMotion` false sur /privatisation/ alors que le concept est le feu.

### F3 (finitions)
- F3-1 `skipLinkFirst: false` : faux négatif connu (« Aller au contenu » est le premier arrêt).
- F3-2 Champ date affiché `mm/dd/yyyy` (locale du navigateur de test) sur /reservation/.
- F3-3 `audit.mjs` non lancé (budget) ; WARN robots.txt/sitemap sous `base` attendus.

## Ce qui est bien (à ne pas casser)
1. Le fil thermique 900 à 20 °C et ses chapitres (cuisson, dressage, table, nuit) : une idée unique, tenue sur les 6 pages, avec la 404 « le feu est éteint ici ».
2. Faits clients exacts (adresse, téléphone, horaires, 67 € / 52 € / 40 €, Zenchef, avis Michelin, histoire) et trous affichés « illustratifs » (midi, avis, couverts, chef à domicile).
3. Technique propre : 1 h1 par page, JSON-LD Restaurant complet, OG, canonical, noindex, 0 débordement, CLS 0,001, 62 Ko de JS, polices préchargées, alt descriptifs.
