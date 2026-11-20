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
