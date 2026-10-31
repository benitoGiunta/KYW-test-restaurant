# Révision portfolio · Les Potes au Feu · passe 1

Agent reviseur-site, 31/10/2026. Revue traitée : `REVUE-1.md` (verdict BLOQUANT, 2 F0, 2 F1, 11 F2, 10 F3).
Vérité des faits : `data/restaurants/les-potes-au-feu/dossier.md` et `photos/index.json`.

Build : `node scripts/build-site.mjs sites/les-potes-au-feu-portfolio` → 6 pages, OK (dernier build 31/10 14:14).
Vérification : serveur `serve.mjs dist --port 4461` arrêté par son script ou par son PID. Mini-scripts Playwright
(`launch()` de browser.mjs) dans le scratchpad, préfixe `rv-pf-` : clics souris réels dans l'en-tête des 6 pages, captures
de bas de page en 1440, bascule de la carte par pas de 90 px à la molette, captures fenêtre de chaque section touchée
(1440 et 390), survol des lignes du stage, focus clavier dans l'en-tête, `scrollWidth`, console. Puis `audit.mjs` et `curl`.

## Décisions

| Finding | Décision | Ce qui a été changé (fichier) | Preuve de vérification |
| --- | --- | --- | --- |
| F0-01 pied de page KYW invisible en bureau | corrige | `src/styles/base.css` : `.footer, .kyw-footer { position: relative; z-index: var(--z-content) }` au-dessus de `#fond` | `rv-pf-shots/d-bas-*.png` (6 pages, 1440) : colonnes d'adresse, bande « Les Potes au Feu, Namur », « Maquette KYW, certaines données sont illustratives. Réalisé par » et le logo KYW sont visibles |
| F0-02 nav d'en-tête inerte à la souris | corrige | `src/components/Header.astro` : l'écho porte de vrais `<a>` (`tabindex="-1"`, dans un conteneur `aria-hidden`, plus d'`inert`) ; `base.css` : écho en ink sans le `background-clip: text` (qui cassait aussi le survol) ; au focus clavier en bureau, l'en-tête passe sur papier et la face n'est plus coupée | 30 clics `page.mouse.click` à scrollY 0 (6 pages × 5 liens) : `elementFromPoint` donne `echo:` pour la moitié moutarde et `face:` pour la moitié verte, et tous naviguent. Les seuls « NO NAVIGATION » sont les clics sur le lien de la page courante (même URL). Sur réservation, tout est en `face:` car l'en-tête est sur papier. Focus clavier : `:has()` actif, clip `none`, texte `rgb(17,19,17)` sur `rgb(247,245,238)`, écho en `tabIndex -1` |
| F1-01 citation MICHELIN modifiée | corrige | `src/data/site.ts` `presse[0].texte` : citation exacte du dossier, avec les noms (« Un duo d'amis, Damien Gorjanec et François Schepens, revisite… au rendez-vous. ») | `rv-pf-shots/d-hist-presse.png` |
| F1-02 « Le premier service, à deux » | corrige | `site.ts`, parcours de François, 2020 : « Le restaurant ouvre, la cuisine se fait à quatre mains. » | grep dans dist : 0 occurrence de « premier service » |
| F2-01 texte papier sur moutarde (carte) | corrige | `carte.astro` : sections soir et midi en `.dip--plein` ; `base.css` : en bureau, elles portent leur propre couleur (vert, moutarde) et l'espace entre elles passe de 2 × 16u à 2 × 10u | `rv-pf-shots/carte-bascule-00…03.png` : la fin du menu du soir reste en papier sur vert, le midi en ink sur moutarde, la limite des couleurs suit le bord des sections |
| F2-02 liste de l'accueil mêlant le menu réel et des plats hors menu | corrige | `site.ts` `carteQuatreMains` : les 6 lignes du menu réel (tartare, rosace et fromage retirés). `index.astro` : numéros = services 01 à 04, mises en bouche et mignardise marquées « · », titre « Le menu du soir, 4 services, 67 € », fromage en note (+7 € / +15 €) | `rv-pf-shots/d-stage.png`, `m-idx-carte.png` |
| F2-03 ordre inventé dans les frises | corrige | `site.ts` : une étape « Parcours » par chef (« Belgique et Shanghai », « États-Unis et Montréal ») ; plus de « Ensuite / Puis / Ailleurs » | `rv-pf-shots/d-idx-parcours.png` |
| F2-04 photos mal cadrées ou sans rapport | corrige | portrait de profil : `object-position: 6% 50%` (le sujet occupe le quart gauche de la source). `reservation.astro` : bar en 3:2 au lieu de 4:5. Stage : `photoDuPlat` dans `site.ts`, légende « Service 2, le plat » ou « …, photo prise en cuisine, pas le plat » ; mignardise illustrée par les chefs au passe (photo de cuisine) au lieu d'une sauce versée à table | `d-idx-parcours.png` (profil lisible), `d-resa-demande.png`, légendes relevées au survol des 6 lignes |
| F2-05 loader trop long | corrige | `src/engine/loader.ts` : plancher 1,1 → 0,6 s, plafond 1,8 → 0,9 s (mobile 0,3 / 0,6) ; `src/motion/setup.ts` : sortie × 0,6 en bureau, × 0,45 en mobile. Une seule fois par session (déjà en place) | `is-loaded` atteint en 2 030 à 2 164 ms après le début de la navigation, chargement compris (6 pages, 1440, en série) ; la revue mesurait 3 136 à 3 262 ms de loader |
| F2-06 `<figure tabindex="0">` | corrige | `histoire.astro` : `tabindex` retiré | `figure[tabindex]` = 0 sur histoire |
| F2-07 formulaire qui jette la saisie | corrige | `reservation.astro` : formulaire et script retirés ; à la place « Avant de venir » (menus, régimes, paiement, faits du dossier) et un bouton Zenchef | `d-resa-demande.png`, `m-resa-demande.png` |
| F2-08 répétitions | corrige | frise détaillée sur histoire seulement (accueil : lieux seuls) ; textes de frise courts qui ne recopient plus les paragraphes ; bios des chefs sans la phrase « sert lui-même… » ; phrase du concept une seule fois par page | `audit.mjs` : il reste « 2019 Avenue de la Plante » (ligne commune aux deux frises, voulue), les horaires (pied de page) et l'adresse et la privatisation de réservation répétées dans le pied de page ; plus aucune répétition de paragraphe |
| F2-09 citations du site prêtées aux chefs | corrige | `site.ts` : `citation` retirée des chefs, nouveau `concept` ; blockquotes retirées des colonnes (carte, les deux chefs) ; une seule citation dans « Ensemble » (section commune), signée « Le concept, sur le site du restaurant » | `d-chefs-ensemble.png` |
| F2-10 identité de Sara | corrige | `site.ts` `photoAConfirmer: true` ; `histoire.astro` affiche « Personne sur la photo : à confirmer » | `d-hist-equipe.png` |
| F2-11 « La carte complète se découvre à table » | corrige | phrase retirée de l'intro Boissons (`site.ts`) | `d-carte-commun.png` |
| F3-01 espaces insécables | corrige | `site.ts` : `nbsp()` appliqué à toutes les chaînes du contenu (avant `: ; ? ! »`, après `«`) ; `&nbsp;` dans les gabarits de pages | captures : « Et un mot d'ordre : le plaisir. » sans coupure ; 9 U+00A0 dans le texte de l'accueil |
| F3-02 boeuf / oeuf | corrige | `site.ts` : « Bœuf », « bœuf », « Œuf » dans les textes ; les chemins `plat-boeuf-confit.webp` sont intacts | build OK, image du stage chargée (`d-stage.png`) |
| F3-03 « le site de Les Potes au Feu » | corrige | `404.astro` : « sur le site des Potes au Feu » | build |
| F3-04 mention dupliquée | corrige | `Footer.astro` : la bande ne dit plus que « Les Potes au Feu, Namur » ; la mention reste dans KywFooter | une seule « Maquette KYW » par page (relevé en `innerText`), `d-bas-*.png` |
| F3-05 vides | corrige (en partie) | carte : espace soir → midi réduit (10u + 10u) ; les vides de colonne de l'accueil viennent du scroll différencié (`data-decale`) et de l'escalier décrits dans DESIGN.md, laissés en l'état | `carte-bascule-*.png` |
| F3-06 photos répétées | corrige (en partie) | `histoire.astro` : la photo du hero (`salle-banquette`) est retirée de la galerie des coulisses. Les portraits des chefs restent dans l'équipe : ce sont les deux seuls portraits prouvés | `d-hist-coulisses.png` |
| F3-07 « Depuis 2020 » | refuse | Fait fondé sur la BCE (société du 14/01/2020) et le récit (« trois mois plus tard ») ; la revue elle-même le juge acceptable | aucun changement |
| F3-08 `sameAs` vers une vidéo | corrige | `site.ts` : `Reseau.profil` ; `Base.astro` : `sameAs` = profils seulement (Facebook) ; dans le pied de page, le lien s'appelle « Vidéo YouTube » | JSON-LD lu : `["https://www.facebook.com/lespotesaufeu.bistronomie/"]` |
| F3-09 `aria-labelledby` du hero | corrige | `NomCoupe.astro` accepte `id` ; `index.astro` : `aria-labelledby="accueil-h1"` sur le `<h1>` | relevé : `H1:Les Potes au Feu` |
| F3-10 performance | corrige (en partie) | `les-deux-chefs.astro` : le portrait de François (LCP mobile) n'a plus de `data-reveal` ni de `data-intro` et se peint au premier rendu | non re-mesuré en mobile throttlé (pas de shoot.mjs complet). Les 25 ips du défilement de l'accueil et les 1,06 Mo d'images d'histoire ne sont pas traités |

Résumé : 24 corrigés (dont 3 en partie), 1 refusé, 0 impossible.

## Contrôles globaux après révision

- 0 erreur console sur les 6 pages (1440) ; `scrollWidth` = 1440 et 390 sur les 5 pages de contenu et la 404.
- `audit.mjs` : 0 FAIL, 12 WARN (répétitions décrites ci-dessus ; robots, sitemap et h1 de la 404 cherchés à la racine
  de l'origine, normal sous `base`).
- `curl` : les 6 pages en 200, Zenchef `results?rid=379477` en 200, fiche MICHELIN en 202 (protection anti-robot, déjà notée).
- `noindex` et `kyw-footer` contrôlés par `build-site.mjs` (build OK).
- shoot.mjs complet non relancé (≈ 25 min pour 6 pages) : les vérifications sont faites par mini-scripts ciblés sur chaque
  finding, et les captures ont été regardées.

## Hors revue, à signaler

- Le gabarit d'origine `gabarits/quatre-mains` a les deux mêmes défauts F0 (écho `inert` dans `Header.astro`, footer
  statique sous `#fond` dans `base.css`). Ce site est corrigé, pas le gabarit : à reporter avant toute autre utilisation
  de Quatre mains.

## Site publiable ?

Oui pour la variante portfolio : les deux F0 et les deux F1 sont corrigés et vérifiés à la souris et à l'œil. Il reste
le LCP mobile de les-deux-chefs à re-mesurer en throttlé au prochain shoot complet.
