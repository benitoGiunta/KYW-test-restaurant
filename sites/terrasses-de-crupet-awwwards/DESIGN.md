# DESIGN.md : Les Terrasses de Crupet, variante awwwards

## Brief

- **Sujet** : Les Terrasses de Crupet, brasserie conviviale et familiale, Rue Basse 13, 5330 Crupet (Assesse). Cuisine de brasserie (carbonnade, vol-au-vent de Mamy, plats à partager, carte enfants), cocktails, bières belges, une cinquantaine de vins, cafés Delahaut. Ouvert 7 jours sur 7, 12 h à 14 h et 18 h à 22 h.
- **Publics** : le midi (déjeuner de village, actifs), le soir (couples, amis), familles avec enfants (carte dédiée), touristes de passage, habitués. Métier : réserver, venir, lire la carte.
- **Ressources** : 22 photos du client (façade, terrasse, salle aux miroirs ronds, bar carrelé de vert, plats, cocktails, chalet d'hiver), médaillon T cuivré (300 px, non utilisé tel quel : repris en favicon et marque dessinés), carte complète avec prix (`donnees.json`).
- **Contraintes** : statique, `base` `/terrasses-de-crupet/awwwards/`, pas de backend (réservation = lien Zenchef du client, `tel:`, `mailto:`).
- **Hypothèses** : adresse réelle = Crupet (le siège BCE de `restaurants.json` est écarté, dossier.md) ; histoire, équipe, chef, année, GPS, parking, avis, presse inconnus : rien d'inventé, aucun `placeholder`, les sections correspondantes n'existent pas (page « Le lieu » au lieu d'une histoire). Photo « burger » et « plats » : alt neutres.

## Trois concepts

| | A. Les miroirs ronds | B. Deux services | C. La table de famille |
|---|---|---|---|
| Territoire | lieu et matière (carrelage vert, cuivre, miroirs) | temps (rythme horaire midi/soir) | culture (plats de Mamy, carte enfants) |
| Phrase | Le site est le mur de la salle : tout ce qui compte s'y montre dans un rond. | La page passe du midi au soir comme le service. | Une table qui s'agrandit à chaque famille. |
| Règle de mise en page | images = cercles, un seul rayon | fond qui bascule jour/nuit | colonnes qui s'ajoutent |
| Verbe | ouvrir | basculer | rassembler |
| Ancre réelle | trois miroirs ronds sur mur vert (photos 06, 11), médaillon T | horaires 12-14 / 18-22 | « vol-au-vent de Mamy », carte enfants |
| Originalité / adéquation / faisabilité / portabilité (bas = mieux) | 4 / 5 / 5 / 1 | 3 / 4 / 4 / 3 | 3 / 4 / 3 / 3 |

Test de l'échange : A ne tient avec aucun autre restaurant (les miroirs et le carrelage sont ceux de ce lieu) ; B et C tiennent avec n'importe quelle brasserie. **Choix : A.** B fournit un détail (bloc « Deux services » de l'accueil), C la voix de la 404 (« Cette table n'existe pas »).

## Concept Card

- **Idée** : le site est le mur aux trois miroirs ronds de la salle ; chaque image, bouton, repère est un rond.
- **Métaphore** : le miroir rond qui s'ouvre sur ce qui se passe derrière (la terrasse, la salle, le bar, l'assiette).
- **Signature (et recette)** : l'hublot, image ronde qui s'ouvre au défilement (`data-reveal="scale"` de motion.md, ouverture d'iris par clip-path circulaire en phase 2) ; au repos, un léger souffle de l'iris sur le grand rond du hero.
- **Émotion (3 premières secondes)** : entrer dans une salle verte et chaude, un grand miroir rond qui montre la salle, nom en grand, deux actions : Réserver, Appeler.
- **Verbe** : ouvrir (iris des hublots, remplissage cuivre des boutons, soulignement qui s'ouvre dans la nav).
- **Capture** : le hero, grand hublot cuivré à droite du nom, sur nuit verte.
- **Ancre** : les trois miroirs ronds de la salle, murs de carrelage vert, fauteuils orange (photos du client).
- **Théâtre** : loader non (brasserie de village, le contenu doit apparaître tout de suite, LCP en texte) ; GL non (les photos du client sont la matière, un shader n'ajoute rien au concept).

## Système

- **Palette** (rôles `ground`, `ink`, `muted`, `line`, `accent`, `curtain`) : ground `#0F2A28` (carrelage vert du bar assombri), ink `#F1E7D6` (pierre des murs), muted `#A9BBB0`, line `rgb(241 231 214 / .2)`, accent `#E0904F` (cuivre des fauteuils et du médaillon), curtain `#0A1B2B` (bleu nuit des soirs, aussi pied de page). Variante `stone` pour la carte : ground `#E9DFCD`, ink `#11302D`, accent `#9C4D17`. Références : photos 10 et 11 du client (carrelage, fauteuils), logo cuivré, palette du site actuel (vert profond, bleu nuit, orange cuivré). Contrastes mesurés à la main AA : texte sur ground > 10, muted > 7, accent > 6.
- **Défauts évités** : pas de crème + terracotta (nuit verte, crème seulement en variante carte avec vert encre et cuivre foncé, justifiée par la lecture longue), pas d'acide sur noir, pas de dégradé, pas d'eyebrow systématique, pas de 01/02/03.
- **Typo** : Young Serif 400 (display, chaleur de brasserie, empattement doux), DM Sans 400/600 (corps et UI), 3 fichiers woff2 via `font.mjs`, 2 préchargés. Échelle `--t-mega` 54 à 160 px, `--t-xl`, `--t-l`, `--t-m`, `--t-body` 16 à 18 px, UI 12 à 14 px. Display : interlettrage -0,035 em (mega), -0,03 (xl), -0,02 (l), interligne 0,88 à 1,02, `text-wrap: balance`. Prix `tabular-nums`, insécables « 24 € », « 12 h », « » et apostrophes typographiques.
- **Grille** : 12 colonnes (4 au téléphone), gutter fluide, lignes fortes : colonne 8 (hublot du hero, horaires) et colonne 6 (listes). Trois humeurs d'espacement (hero serré, sections 3,5 à 8 rem, listes 1 rem). Une règle de rayon : `--radius: 50%` (hublots), pilule pour les boutons.
- **Mouvement (à réaliser en phase 2)** : easing `ease.out` de l'engine pour les ouvertures, durées 0,5 à 0,9 s ; hover CTA = remplissage cuivre qui monte, nav = soulignement qui s'ouvre, hublot/plat = léger zoom de l'image dans le rond ; liens texte soulignés au repos. Repos : le grand hublot du hero respire (échelle 1 à 1,02, 8 s), arrêté hors écran et en mouvement réduit.
- **Plan de composition** (famille de section une fois par page) :
  - Accueil : poster (nom + hublot) / mur de trois hublots décalés (filmstrip sur mobile, scroll-snap) / données (deux services, tableau horaire) / index (extrait de carte) / paire asymétrique (menus de fêtes) / pied final.
  - Carte : poster + index latéral collant (barre horizontale collante au téléphone) + listes par catégorie avec hublot de tête.
  - Le lieu : statement / quatre paires asymétriques alternées / données (venir).
  - Réservation : poster + actions / trois colonnes de données / liste « à savoir ».
  - 404 : grand rond « 404 » et retour.
  - Mobile 390 : titres re-réglés (min 54 px), hublot du hero décalé sous le texte, mur en strip `overflow-x`, en-tête réduit à « Réserver » + bouton « Menu » (phase 2 : menu plein écran bleu nuit qui s'ouvre en rond depuis le bouton).
- **Test de généricité** : « un modèle atterrirait-il ici ? » Oui pour : hero texte + image (changé : image ronde cuivrée, pas de plein cadre), trois cartes égales (changé : décalage vertical 0, 6 rem, 3 rem, tailles de texte différentes, strip mobile), liste de plats (changée : noms en display, prix en colonne tabulaire).

## Sur-utilisation de la skill

1. [x] Trois concepts de trois territoires (lieu, temps, culture), notés, ancre, test de l'échange : tableau ci-dessus.
2. [x] Aucun exemple travaillé de concepts.md (ni braise, ni pavage, ni gril, ni cadre, ni solde, ni phrase unique) : concepts A, B, C ci-dessus.
3. [x] Concept Card au format exact, verbe « ouvrir » compris.
4. [x] Concept au pied (`Base.astro:` bandeau `site-footer`, ronds de l'en-tête), à la carte (`pages/carte/index.astro` hublot de tête par catégorie), à la réservation (hublot, boutons ronds), à la 404 (`pages/404.astro` grand rond).
5. [x] Moment signature : hublot qui s'ouvre (recette `data-reveal="scale"`), posé dans le HTML (`pages/index.astro` hero et mur), animation réelle en phase 2.
6. [x] Palette de 6 rôles dans `src/styles/tokens.css`, références du lieu nommées ci-dessus.
7. [x] Défauts à éviter : voir Système (aucun, crème en variante justifiée).
8. [x] Test de généricité noté.
9. [ ] Détails 7 vers 8 : sélection accent (`base.css` `::selection`) fait ; focus dans l'accent (`engine.css:33`) fait ; favicon d'identité (`public/favicon.svg`, T cuivré dans un rond) fait ; 404 dans le concept fait ; pied composé fait ; **OG composée : reste** (`public/og.png` est un recadrage de photo, à composer en phase 3 avec `og.mjs`).
10. [x] Polices : 3 fichiers dans `public/fonts/`, 2 préchargés (`Base.astro`), `@font-face` dans `tokens.css` avec chemin `/terrasses-de-crupet/awwwards/fonts/`.
11. [x] Échelle fluide unique `--t-*` (`tokens.css`), sauts mega 160 px / body 18 px.
12. [x] Display réglé : interlettrage par taille, interligne 0,88 à 1,02, balance (`base.css` `.display--*`).
13. [x] Corps 16 à 18 px, interligne 1,55, mesure `62ch`, UI 12 à 14 px majuscules espacées.
14. [x] Typographie française : insécables dans `site.ts` (`euro()`, horaires), « » et apostrophes dans les pages.
15. [~] Grille 12 colonnes et lignes fortes faits (`base.css` `.grid`) ; cadre quatre coins non utilisé : l'équivalent est le rond unique (écrit dans Système).
16. [x] Une famille de section au plus une fois par page (plan de composition).
17. [x] Hero en 3 s : nom, cuisine, Réserver et Appeler dans la première fenêtre (mesure : h1 top 141, CTA top 707 à 1440×900, 659 à 1280×720, 567 à 1024×768, 373 à 390×844, journal `.logs/tdc-mesure2.log`).
18. [x] Mobile 390 recomposé : hublot décalé sous le texte, mur en strip scroll-snap, type re-réglé, mesures sans débordement (`ovx` 0 sur 4 pages × 4 tailles, mouvement réduit).

### Phase 2 : mouvement (construction-2)

Décisions : le pilote est l'**ouverture** (0 à 1) de chaque miroir ; l'aperçu au curseur des plats de la carte (patron index) n'est **pas** fait : trop peu de plats ont une photo, le rond de tête de catégorie porte déjà l'image ; aucun `data-cursor` (aucun hublot n'est cliquable, un libellé de curseur mentirait) ; aucun `data-magnetic`. Repos : l'éclat de la lampe tourne sur le verre du grand miroir (14 °/s, arc de 40 °, anneau de 1 rem), petit à dessein pour que `settledMs` reste non nul (moins de 1 % de pixels en 1,2 s) tout en dépassant le seuil `idleMotion` (0,05 %).

19. [x] Menu mobile accessible : `Base.astro` (`.menu-btn` `aria-expanded`/`aria-controls="menu"`, `#menu` plein écran), `src/motion/menu.ts` (focus sur le premier lien, Tab piégé, Échap ferme, focus rendu au bouton, fermeture au clic d'un lien et au passage > 720 px). Preuve : `.logs/tdc-p2-test.log` (« m open exp=true focus=Accueil », « m trap focus=true », « m esc exp=false focusBtn=true »).
20. [x] Engine verbatim (`src/engine/*` inchangés en phase 2), adaptateur `astro.ts`, `transition:persist` sur `#curtain` et `#cursor` (`Base.astro`), pas de `#gl` (sans GL), `transition:animate="none"` sur `<html>`.
21. [x] Une horloge : grep `addEventListener('scroll'|requestAnimationFrame` hors `src/engine/` = 0 ; idle, reflets, éclat sur `gsap.ticker` (`idle.ts`, `miroirs.ts`).
22. [x] Code de page dans `onPage()` avec nettoyage (`miroirs.ts` : ticker retiré, IO déconnectés ; `menu.ts` : keydown et matchMedia retirés, `startScroll`).
23. [x] Aucune CSS `transform` sur élément GSAP : `img` des hublots (x, y, scale par GSAP), `.eclat` (rotation GSAP), `.menu__list a` (yPercent), `.curtain__panel` (clip-path, `--trou`) n'ont aucun `transform` CSS ; les transforms CSS restants sont sur `::before`/`::after` et `#cursor span`.
24. [x] Module pilote `src/motion/miroirs.ts` : ouverture par défilement (scrub) ou intro, reflet contre le pointeur (`idle.x/y`, IO des miroirs visibles), `startIdle()` (`idle.ts`) appelé depuis `startConcept()`, lui-même appelé une fois dans `setup.ts`.
25. [x] Loader : aucun (décision Concept Card), pas de `#loader` ni de `role="status"`.
26. [x] Transition du concept (`src/motion/passage.ts`) : un rond bleu nuit s'ouvre au point du clic (0,8 s, `ease.inOut`), puis un trou rond s'ouvre au centre sur la nouvelle page (`--trou`, 0,8 s). Capture `tdc-p2-d-trans.png` (scratchpad) à 450 ms.
27. [x] Intro `data-intro` : h1 `data-split="lines" data-intro` sur les 5 pages ; hero et 404 : iris `data-iris="intro"` (34 % → 72 %, 1,5 s, ajouté à `intro` à 0,15 s). Premier frame : hublot déjà entrouvert (CSS `.motion [data-iris="intro"]`), titre en lignes.
28. [x] Épinglages : aucun pin ; scrubs `start: 'top 95%'`, `end: 'top 45%'`, `invalidateOnRefresh: true`.
29. [x] Repli statique dessiné : sans `.motion`, hublots ouverts (aucun clip), `.eclat` masqué, transitions en fondu de l'engine ; `.logs/tdc-p2-test.log` « r … hidden/clipped=0 » sur 5 pages.
30. [x] Copies décoratives : seulement `.eclat` et la marque T du menu, `aria-hidden="true"` ; aucun titre dupliqué.
31. [x] Une famille d'easing : `ease.out` (iris intro, liens du menu), `ease.inOut` (transition, menu), `none` sur les scrubs ; CSS en `cubic-bezier(0.16, 1, 0.3, 1)` (expo.out) et `(0.33, 1, 0.68, 1)` (power3.out) ; stagger du menu 60 ms.
32. [x] Trois traitements, verbe ouvrir : (1) remplissage cuivre qui monte (CTA, `.menu-btn`, médaillon T de la marque) ; (2) soulignement qui s'ouvre (nav, index de la carte) ; (3) liens texte dont le trait s'écarte et s'épaissit (`a.text`, pied).
33. [x] Hovers sous `@media (hover: hover)`, même état sur `:focus-visible` (`base.css`, `carte/index.astro`), `:active` (`.btn` `scale: .96`, liens opacité) ; à vérifier par `report.json` en phase 3.
34. [x] Liens texte soulignés au repos : `a.text` et liens du pied (`text-decoration: underline`, couleur cuivre).
37. [x] Curseur natif jamais masqué ; aucun contenu ne dépend du survol ; aucune copy « survolez ».
38. [x] Pas de blur, pas de `box-shadow` au scroll, aucun `will-change`.
39. [~] Réduit : pas de Lenis (`lenis=false`), pas de GL, pas de scrub (pilote non démarré), pas de loader ; `report.json` en phase 3.
40. [x] GL : sans objet, décision écrite (Concept Card) ; lignes `// GL` absentes de l'engine.
44. [~] Skip link premier, anneau de focus cuivre (`engine.css`) ; à prouver par `report.json`.
47. [x] Cibles : « Réserver » d'en-tête 44 px, « Menu » 46 px, CTA 48 px (`.logs/tdc-p2-test.log` « m header »).
9 (suite). [x] Favicon PNG 32 px et `apple-touch-icon` 180 px générés depuis `favicon.svg` (`public/`, liens dans `Base.astro`).
