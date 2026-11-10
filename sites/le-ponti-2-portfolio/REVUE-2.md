# Revue portfolio · Le Ponti 2 · passe 2
Verdict : A_CORRIGER (0 F0, 0 F1, 1 F2, 4 F3)

Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une trattoria « de table dressée » (lin, bordeaux, canard), où les photos sont des tirages à attraper et poser, avec des objets au trait (parasol, pizza, verre) et un bandeau d'état ouvert/fermé en heure de Namur.

Scores /10 :
- Design 8 : les 8 tirages ne se répètent plus côte à côte (planche home 1440, rangées « Pizza roquette / L'enseigne / Pâtes à la tomate / Escalope gratinée » puis « À table / La façade / Pain et vin / L'escalope ») ; reste un mot final coupé et une carte orpheline.
- Usabilité 8 : 6 pages en 200, 0 débordement de page (scrollWidth = fenêtre, 6 pages x 390 et 1440), nav du bas complète à 390/360/320 ; mais prix en pastille qui dépassent de leur cadre à 390 px.
- Créativité 7 : tirage à attraper et bandeau d'état restent propres à ce restaurant ; les eyebrows ont disparu (0 sur 5 pages, 1 sur la 404).
- Contenu 8 : plus de phrase inventée ni de doublon accueil / « La maison » ; 0 fait faux repéré sur les textes revus (grep + lecture des captures).
- Technique 8 : 0 erreur console, 0 requête en échec, 0 violation axe critique ou sérieuse, LCP mobile throttlé 1 924 puis 1 992 ms (CLS 0,006).

Méthode et fraîcheur : dist (05:31) postérieur à `src/` (`find -newer` vide), captures du QA-revue2 (05:38) postérieures au dist, réutilisées. Mesures propres : serveur sur le port 4744 (PID noté, arrêté par `kill`), script maison via `scripts/q.sh` (axe-core de node_modules à 2 positions de défilement, console, requêtes, débordement, balises, 6 pages dont `404.html` réel x 1440 et 390), script ciblé (nav à 390/360/320, LCP/CLS CDP x2, nœud axe `region`), script prix, captures pleine page 1440 et 390 de l'accueil, « La maison » et « Terrasse » relues par planches. Faux positifs du QA à ne pas corriger : 404 « sans h1/title/lang » (la vraie `404.html` a lang fr, title, 1 h1), « pas de robots.txt ni sitemap » (présents), skip link non premier arrêt.

## Vérification des corrections de REVISION-1.md
| id | verdict | preuve |
|---|---|---|
| F1-1 LCP | confirmé | élément `photos/pates-800.webp`, 1 924 et 1 992 ms (avant 3 624), CLS 0,006 |
| F2-1 contentinfo | confirmé, avec effet de bord (voir F3-A) | 1 `<footer>` par page, `landmark-no-duplicate-contentinfo` disparu |
| F2-2 horaire d'arrivée | confirmé | 0 « arrivée jusqu » dans `dist/_astro` |
| F2-3 terrasse | confirmé | 0 « la carte est la même » ; 2 tirages légendés « (photo de la façade) » (terrasse, d-… planche terrasse) |
| F2-4 nav mobile | confirmé | nav `scrollWidth` = `clientWidth` = 287 à 390, 360 et 320 ; « Contact » à 335/320/300 px pour un bord à 341/326/306 |
| F2-5 méta-texte et doublon | confirmé | 0 « Son site le résume » ; « La maison » = desserts, cocktails, horaires (nouveau) |
| F2-6 tirages | confirmé | 8 tirages, recadrages distincts, plus de `pizza-comptoir`, `pizza-fond`, `facade-bas`, `escalope-salades` ; hypothèse du réviseur (pas de 16 %) validée à l'œil |
| F2-7 eyebrows | confirmé | 0 `class="meta` hors 404 ; « Erreur 404 » conservé |
| F3-1 apostrophes | partiel | 0 droite dans le texte sauf `carte/` : « Dans l'assiette » (`pages/carte.astro:64`) |
| F3-3 « généreux » | confirmé | chapeau « Simple et familial » |
| F3-4 alt | confirmé | « Assiette de pâtes à la sauce tomate », plus de « Au passe » ni « Une fournée » |
| F3-6 region | confirmé pour `.marquee` (`role="region"`) |
Non traités par choix de la révision, constatés encore présents : F3-2 (mot final coupé), zone vide « À ne pas manquer », og.jpg.

## Findings

### F2 (mineur)
- **F2-A · Prix qui dépassent de leur pastille sous 29 rem.** Preuve : script, `.plat__prix` sur `/carte/` : à 390 px « 21,50 € » et « 18,50 € » ont `scrollWidth` 57 pour `clientWidth` 43 à 52 ; à 320 px aussi « 20,50 € » et « 12 € par personne » ; capture mobile (planche carte) : le « € » sort du cadre à droite. Cause : `styles/base.css:155` `max-width: 42%` sur une pastille dont le texte est insécable. Correction : `max-width: none` (ou `min-width: max-content`) pour les prix courts, garder le plafond seulement pour « 12 € par personne ».

### F3 (finition)
- **F3-A · `region` (moderate) sur `.wrap.footer__cols`** sur 6 pages x 2 largeurs : conséquence de F2-1 (le `<div class="footer">` n'est plus un repère). Correction : `<section aria-label="Coordonnées">` ou `role="region"` avec libellé (pas `contentinfo`).
- **F3-B · « Buon appetito ! » toujours coupé** (F3-2 non traité) : lecture « Buon appetit » à 1440, « Buon a » à 390 (captures home et « La maison »). `.footer__finale { height: 0.52em; overflow: clip }` (`base.css:248`) ; décoratif, mais réduire la taille pour que le mot tienne.
- **F3-C · « À ne pas manquer » : quatrième carte seule à gauche** (Spritz Ponti), deux tiers vides à droite à 1440 (capture home 1440, y ≈ 5300). Correction : la placer au centre ou passer à 2 + 2.
- **F3-D · Apostrophe droite** `pages/carte.astro:64` « l'assiette » -> U+2019 ; og.jpg (recadrage de pizza sans nom ni logo) inchangé.

## Ce qui est bien (à ne pas casser)
1. La carte : 99 lignes exactes, prix et libellés sans écart avec donnees.json (non modifiés depuis la passe 1) ; le bandeau d'état en heure de Namur.
2. Les 8 tirages et leurs légendes honnêtes (« photo de la façade ») ; la palette lin/bordeaux/canard sans eyebrow.
3. Les chiffres : 0 erreur console, 0 requête en échec, LCP mobile ~2 s, 0 débordement, `noindex, nofollow`, mention « Maquette KYW, certaines données sont illustratives » et un seul logo KYW sur les 6 pages.
