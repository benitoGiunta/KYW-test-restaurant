# PhilFa, variante awwwards : « Phil | Fa »

## Brief
- **Sujet** : PhilFa (Brasserie PhilFa), brasserie de centre-ville, rue de Marchovelette 21/23, 5000 Namur. Ouverte en 2013, rénovée et repensée en 2020. Patrons : Philippe Legrand et Fabian Rammeloo. 55 places en salle, 20 en terrasse. Mardi à samedi, 12 h à 14 h 30 et 18 h 15 à 21 h.
- **Publics** : midi (actifs du centre, menu du moment), soir (tables à deux, carte, gibier), touristes (réserver, venir), habitués (la carte, le bar).
- **Métier** : réserver (tel + Barestho), venir (adresse, horaires), lire la carte.
- **Ressources** : 11 photos de salle, bar, terrasse (aucune photo de plat), logo vert olive. Carte réelle (24 plats), menu du moment à double choix (PDF du site, date inconnue).
- **Contraintes** : statique, `base` `/philfa/awwwards/`, noindex, pied KYW, pas de backend.
- **Hypothèses** : « Phil » et « Fa » lus comme les deux patrons (lecture de la maquette, jamais affirmée comme fait dans le texte) ; menu du moment = celui du site actuel (date inconnue, dit sur la page) ; pas de note ni d'avis ; pas d'e-mail (inconnu).

## Trois concepts
| # | Territoire | Idée | Orig. | Adéq. | Faisab. | Portab. (bas = mieux) |
|---|---|---|---|---|---|---|
| 1 | Lieu et culture (le nom, la rue) | **Phil | Fa** : le nom est coupé en deux couleurs comme le logo, la page se lit en deux moitiés qui se rejoignent sur une couture | 5 | 5 | 5 | 1 |
| 2 | Matière du métier (la salle) | **Velours** : palette de la salle (rose, moutarde, rouille), les pages comme banquettes | 3 | 4 | 5 | 3 |
| 3 | Rythme horaire (service) | **Midi, soir** : la page change de lumière entre les deux services | 3 | 3 | 4 | 3 |

Test de l'échange : #2 et #3 tiennent avec un autre restaurant à salle colorée ou à deux services. #1 non : il repose sur le nom PhilFa (deux syllabes, deux couleurs au logo), les deux patrons, les deux numéros de la façade (21/23) et le menu du moment à **double choix** à chaque étape.
**Choix : #1.** Écartés : #2 ne fournit que la couleur rose (rideau de transition) ; #3 ne fournit que la division midi/soir des horaires.

## Concept Card
- **Idée** : deux noms, une table. Chaque page se lit en deux moitiés, Phil (olive) et Fa (moutarde), qui se rejoignent sur une couture centrale.
- **Métaphore** : la couture entre deux étoffes, la porte 21 et la porte 23 d'une même façade, le double choix du menu du moment.
- **Signature (et recette)** : la couture. Au hero, « Phil » et « Fa » se rejoignent sur la ligne de couture ; en phase 2, la couture s'ouvre à l'arrivée (clip-path des deux moitiés, motion.md « clip reveal ») et, dans le menu du moment, choisir un plat éclaire sa moitié et éteint l'autre.
- **Émotion (3 premières secondes)** : une brasserie qui a un parti pris, chaleureuse et nette : deux aplats francs, un nom en deux poids.
- **Verbe** : accorder (deux moitiés qui se rejoignent, un choix qui s'accorde).
- **Capture** : le hero deux moitiés, ou le menu du moment à double choix.
- **Ancre** : le nom PhilFa (logo en deux couleurs), les deux patrons, la façade 21/23, le menu du moment à double choix qui change toutes les 6 semaines.
- **Théâtre** : loader non (le hero est lui-même l'entrée, la page doit servir un client qui cherche une table) ; GL non (aucune matière à déformer, les aplats et la couture suffisent).

## Système
- **Palette** (sources : logo, photos 01 à 06) : `ground` #23261a olive-noir (mur de la salle, plaque du logo assombrie) ; `ink` #efe6d0 crème de « Phil » ; `muted` #b9b296 ; `line` #4a4e33 ; `accent` / moitié Fa #e3a928 moutarde du velours et de « Fa » (texte #1d2014 dessus, 8,6:1) ; `curtain` #b0627a rose des banquettes ; papier #efe6d0 + texte #23261a + rouille #964622 de la plaque métal. Moutarde sur olive : références réelles (logo PhilFa, chaises en velours), pas l'acide sur noir.
- **Typo** : Archivo variable (axes graisse et largeur 62 à 125 %) pour tout le display et l'UI : « Phil » en 300, « Fa » en 900, même hauteur de capitale (le contraste de graisse est le contraste des deux moitiés) ; Newsreader pour le corps (brasserie, lisible, chaleur). 2 fichiers, 2 préchargés. Échelle fluide `--t-mega` à `--t-xs` (tokens.css) ; display interlettrage -0,035 à -0,05 em, interligne 0,82 à 0,98 ; corps 17 à 20 px, interligne 1,55 ; UI 13 px capitales ; prix `tabular-nums`, « 35 € » insécable ; vraies apostrophes et guillemets.
- **Grille** : 12 colonnes (6 au téléphone), deux lignes fortes : la couture centrale (50 %) et le bord gauche du gutter ; humeurs d'espacement `serre`, `normal`, `aere`, `entracte`. Règle de forme : angles vifs, aucun rayon.
- **Mouvement (planifié, phase 2)** : easing `ease.inOut` pour la couture, `ease.out` pour les entrées. Hover : CTA = couture crème/moutarde qui glisse (CSS déjà posé) ; nav = filet qui se ferme depuis les deux bords vers le centre (posé) ; plats/photos = la moitié choisie s'éclaire, l'autre s'éteint ; liens de texte = soulignés au repos, épaisseur au survol. Transition de page : deux volets roses qui se rejoignent puis s'ouvrent (setup.ts, posée). **Repos** : la couture respire (décalage de ±6 px de la frontière des deux moitiés, 12 s, sur l'horloge GSAP, coupée sous reduced motion) : phase 2.
- **Plan de composition** : Accueil = poster deux moitiés (hero) / média plein cadre / statement papier + données / menu du moment en paires (le double choix) / mur de photos décalées / paire asymétrique (le bar) / liste index (aperçu carte) / pied. Carte = titre / menu du moment / sommaire collant + liste index par rubrique / média. Histoire = titre / deux patrons en moitiés / récit + frise / équipe / logo. Réservation = titre / deux actions en moitiés / trois colonnes pratiques. 404 = deux portes 21 et 23.
- **Mobile 390** : hero garde les deux moitiés côte à côte (couture visible), menu du moment empilé (choix A olive sur choix B moutarde), sommaire de la carte en strip `overflow-x` + `scroll-snap`, mur recomposé en 6 colonnes.
- **Test de généricité** : « un modèle générique atterrirait-il ici ? » Oui sur : hero centré (corrigé : le nom est coupé sur la couture, deux poids), carte en simple liste (corrigé : le menu du moment, seule vraie formule, est un diptyque, la liste index ne sert que les rubriques). Pied : composition de la couture, pas un bloc de liens.

## Sur-utilisation de la skill (phase 1)
1. [x] Trois concepts, trois territoires, notés, ancre, test de l'échange : tableau ci-dessus.
2. [x] Aucun exemple travaillé de concepts.md (ni braise, ni pavage, ni solde, ni cadre).
3. [x] Concept Card au format exact, verbe « accorder » ci-dessus.
4. [x] Concept jusqu'au pied (`Footer.astro` : couture finale), à la carte (`Menu.astro` réutilisé dans `carte.astro`), à la réservation (`reservation.astro` : `.actions` en deux moitiés), à la 404 (`404.astro` : portes 21 et 23).
5. [x] Moment signature : la couture (`.hero` dans site.css, recette clip-path phase 2).
6. [x] Palette 4 à 6 rôles, références réelles : § Palette, `tokens.css:8-27`.
7. [x] Aucun des 8 défauts : pas de crème+serif contrasté+terracotta (olive/moutarde, sans-serif large), pas d'acide sur noir (moutarde de velours sur olive), pas de dégradé violet ni de verre, pas d'eyebrow sur chaque titre, pas de 01/02/03, pas d'Inter, Fraunces, Instrument Serif ni Playfair.
8. [x] Test de généricité : § Système.
9. [~] Détails 7 vers 8 : sélection `::selection` (engine.css:30 + inversion par ton), focus dans l'accent (engine.css:33), favicon de l'identité (`public/favicon.svg` : deux moitiés P|F), OG composée (`public/og.png` : deux moitiés, adresse), pied en composition finale, 404 dans le concept : posés ; OG et favicon à raffiner en phase 3 (police système dans l'OG).
10. [x] Polices : `public/fonts/` (2 fichiers), préchargés dans `Base.astro:62-63`, url() à `/philfa/awwwards/fonts/`.
11. [x] Échelle fluide unique, grands sauts : `tokens.css` `--t-mega` 19 rem max à `--t-xs` 0,81 rem.
12. [x] Display réglé : `.display` (site.css:8-13) interlettrage par taille, interligne, `text-wrap: balance`.
13. [x] Corps 17 à 20 px, UI 13 px en AA (muted 8,2:1 sur ground, 6,3:1 sur papier).
14. [x] Typographie française : insécables dans `eur()` et les prix, apostrophes courbes, aucune demi-cadratin.
15. [x] Grille 12 colonnes, couture centrale à 50 %, lignes `border-top` fortes ; cadre quatre coins : non retenu (la couture centrale tient ce rôle).
16. [x] Une famille de section au plus une fois par page (poster, média, statement, paires, mur, paire asymétrique, index).
17. [x] Hero en 3 s : nom, « Brasserie du centre de Namur », Réserver, menu du moment à 35 € (capture 1440 et 390 lues).
18. [x] Mobile 390 recomposé : § Mobile ; mesures Playwright : aucun débordement horizontal à 1440, 1280, 1024 et 390, h1 et CTA dans le cadre, 0 requête échouée.

## Mouvement réalisé (phase 2)
- **Pilote** `src/motion/couture.ts` : une variable, la couture. `--couture-x` (±12 px, tiré par le pointeur au bureau, par la vitesse de défilement au toucher) et `--point` (le fil qui court, 26 px/s, sans point mort) écrits sur `<html>` par `gsap.ticker`, en pause quand aucune `.cousu` n'est à l'écran. Portée par : hero (fond et mots suivent la couture), pied (`.pied__mot`), chaque étape du double choix, les deux patrons (histoire), les deux actions (réservation), les portes 21 et 23 (404).
- **Signature** : à l'arrivée, les deux moitiés viennent des bords (papier au centre) et s'accordent sur la couture (`--ouvre`, 1,1 s, `expo.inOut`), le fil se coud de haut en bas (`--fil`), puis « Phil » et « Fa » glissent vers la couture ; textes du hero en `data-reveal` à 0,8 et 0,88 s. Au double choix, choisir un plat (bouton `aria-pressed`) l'éclaire et éteint l'autre moitié (#171a10, texte #b9b296, 8:1), étiquette « Choisi ».
- **Repos** : le fil de couture court en continu sur la couture visible (écoulement constant, pas de sinus). Mouvement réduit : rien ne bouge.
- **Menu du téléphone** `src/motion/volet.ts` : « Menu » (`aria-expanded`), volet plein écran en deux moitiés (Phil arrive du haut, Fa du bas), focus piégé, Échap, retour du focus, Appeler en 44 px.
- **Hovers** (3 traitements) : CTA = couture crème/moutarde qui glisse ; nav = filet qui se ferme des deux bords ; liens de liste (index, sommaire, choix) = décalage vers la couture + accent ; liens texte soulignés au repos, plus épais et moutarde au survol. Tout sous `(hover: hover)`, même état en `:focus-visible`, `:active` en `translate`.
- **Hypothèse** : pas de curseur suiveur (natif seul), pas de loader, pas de GL (décision phase 1 maintenue).

## Sur-utilisation de la skill (phase 2)
19. [x] Menu mobile accessible : `volet.ts:20,38` (`aria-expanded`), `:44` Échap, `:45-50` focus piégé, `:40` retour du focus ; Playwright 390 : ouvert, focus sur « Fermer », 8 Tab restent dedans, Échap ferme et rend le focus au bouton.
20. [x] Engine verbatim (`src/engine/*`), adaptateur `astro.ts`, `transition:persist` sur `#curtain` (`Base.astro:72`), `transition:animate="none"` (`Base.astro:35`) ; `#gl` et `#cursor` sans objet (ni GL ni suiveur).
21. [x] Une horloge : `couture.ts:23` `gsap.ticker.add` ; grep `addEventListener('scroll'|requestAnimationFrame` hors engine : 0.
22. [x] Code de page dans `onPage()` avec nettoyage : `couture.ts:37-69`, `volet.ts:7-62`.
23. [x] Aucune CSS `transform` sur un élément GSAP : mots du hero en `translate` (propriété individuelle) + transform GSAP ; `.cta:active` passé en `translate` ; transforms CSS restants sur pseudo-éléments (`.nl::before`) et `.etape__nom` (non animés par GSAP).
24. [x] Pilote avec `startIdle` et pointeur : `couture.ts:15-31`.
25. [x] Loader décidé : aucun (Concept Card, « Théâtre »), aucun `role="status"`.
26. [x] Transition du concept : deux volets roses qui se rejoignent puis s'écartent, 0,6 s + 0,75 s (`setup.ts`) ; navigation accueil vers carte mesurée, rideau masqué à l'arrivée.
27. [x] Intro : `couture.ts:50-57` dans la timeline `intro` ; état de départ posé en CSS sous `html.motion` (`site.css:274`) pour éviter le saut ; titres des pages intérieures en `data-split="chars" data-intro`.
28. [x] Épinglages : aucun (sommaire de la carte en `sticky` CSS).
29. [x] Repli statique dessiné : sans `.motion`, `--ouvre` et `--fil` valent 1 (`@property`, `site.css:265`), couture et fil immobiles, tout le contenu visible (Playwright réduit : `hiddenInView` 0 sur 5 pages, aucune différence de pixels en 1,5 s).
30. [x] Copies décoratives : `.pied__mot` `aria-hidden`, numéros 21 et 23 `aria-hidden` ; aucun titre dupliqué.
31. [x] Une famille d'easing (`expo` de l'engine, `cubic-bezier(0.65, 0, 0.35, 1)` en CSS), durées 0,4 à 1,3 s, stagger 50 ms.
32. [x] Trois traitements, dans le verbe « accorder » : § ci-dessus.
33. [x] Hover sous `(hover: hover)` + `:focus-visible` (`site.css:23-60`, `:291-301`), états visibles en réduit (seules les transitions sont coupées par l'engine).
34. [x] Liens texte soulignés au repos (`.lien`, `site.css:23`).
35. [ ] Champs `hover.*` de `report.json` : phase 3.
36. [~] Repos : diff de pixels non nulle en 1,5 s à 1440 et 390 (Playwright, hero) ; `idleAt` à confirmer au shoot.
37. [x] Curseur natif seul ; le double choix marche au clic et au toucher, aucune copy « survolez ».
38. [x] Ni blur animé ni `box-shadow` au scroll ; `will-change` non utilisé.
39. [x] Réduit : pas de Lenis (engine), pas de GL, pas de scrub (seul `data-parallax` de la bande, coupé par l'engine), pas de loader.
40. [x] GL sans objet, décision écrite (Concept Card) ; lignes `// GL` absentes de l'engine.
41. [x] Sans objet (pas de GL).
44. [~] Skip link en premier (`Base.astro`), focus `:focus-visible` dans l'accent (`engine.css:33`), choix en anneau `currentColor` ; à confirmer au shoot.
45. [~] Contraste : choix éteint 8:1, textes des moitiés inchangés ; texte crème des choix Fa corrigé (le bouton héritait de la couleur de la section) ; à confirmer au shoot.
46. [x] Texte réel partout, rien dans un canvas.
47. [x] « Réserver » 44 px au téléphone (`site.css:330+`), « Appeler » 44 px dans le volet et 48 px sur la réservation.
