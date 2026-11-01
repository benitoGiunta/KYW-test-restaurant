# Revue awwwards · La Dolce Vita (Wépion) · passe 2
Verdict : PUBLIABLE
Lecture en une ligne de l'idée du site : une pizzeria de Wépion écrite comme une enseigne au néon rose sur fond vert forêt, où chaque titre de page s'allume en tube (« la dolce vita », « la carta », « pronto ? ») et où la 404 annonce « Un tube a grillé ».

Preuves : `QA-revue2.md` absent et `summary.json` de l'agent captures en `shootFailed` (« browser has been closed », 0 capture de carte ni de 404). Mesures par script maison sur `dist/` (build du 21:39:55, postérieur au dernier `src/` du 21:38:42), serveur port 4731 (PID noté, arrêté) : 5 pages à 1440 px, 5 à 390 px, 2 à 360 px, défilement par pas, axe-core complet (violations + incomplete), contraste nœud par nœud (canvas 1x1, opacité cumulée), erreurs console et requêtes, débordement, cibles < 24 px, reduced-motion sur 4 pages, menu mobile, Tab, curl. Planches `pl-m.png` et `pl-d.png` (scratchpad, `aw2r2-shots/`).

Scores /10 :
- Design 8 : identité inchangée et tenue (`cta-390.png`, `tete-reservation-390.png`, `404-390-00.png`) ; la carte desktop reste longue et répétitive (déjà notée en passe 1).
- Usabilité 8 (+1) : bouton « Réserver au 081 85 54 20 » visible au premier écran à 360, 390 et 412 px (top 314, 318 et 323 px, hauteur 48 px) ; les deux bandes défilantes reçoivent le focus clavier (Tab n° 7 sur l'accueil, n° 4 sur l'histoire) avec contour rose de 2 px.
- Créativité 8 : néon qui s'écrit, devise, 404 ; inchangé.
- Contenu 8 (+1) : « TVA » absent (grep : 0), « prix en euros » en place ; plus de « 2 » vide, remplacé par « 18 h à 22 h · À emporter : livraison gratuite dès deux plats » (dossier l. 21 et 51) ; « Réserver une table » dans le pied ; « sont maison » dans l'histoire ; le chapeau « Les suggestions changent au fil du marché » est étayé par `dossier.md` l. 47.
- Technique 8 : 0 erreur console, 0 requête en échec, `scrollWidth = clientWidth` sur 12 cas, 0 cible < 24 px, 0 texte sous contraste (canvas, 12 cas), reduced-motion : 0 texte sous opacité 0,5 sur 4 pages, 1 h1 par page, JSON-LD présent sur 5 pages, noindex, mention KYW sur 5 pages, `lang="fr"`, liens et ressources en 200 (5 pages, og.png, favicon).

## Vérification de REVISION-1 (correction par correction)
| id | annoncé | constat passe 2 |
|---|---|---|
| F1-1 | `aria: 'none'` SplitText | confirmé : axe, 0 violation `aria-prohibited-attr` sur les 5 pages à 1440, 390 et 360 px ; `.devise__it` sans `aria-label`, texte lisible « Se è dolce, la vita è più bella » |
| F1-2 | régions défilantes focusables | confirmé : 0 `scrollable-region-focusable` à 390 px ; `ul.table__mur` (role list, aria-label) et `.salle__bande` (role region, aria-label) atteintes au clavier, outline visible (`focus-*.png`) |
| F2-1 | TVA | confirmé (grep 0) |
| F2-2 | statistique | confirmé (texte lu dans le HTML et la capture `accueil-1440-02.png`) |
| F2-3 | bouton mobile | confirmé (360, 390, 412 px) |
| F2-4 | espace titre/étiquette | confirmé : `row-gap` 20 px, tube 165-234 puis étiquette 254-276 à 390 px (carte et histoire : étiquette 195-217, même écart de 20 px) ; `tete-reservation-390.png` propre |
| F2-5 | refusé | accepté (redondance voulue, étiquette discrète) |
| F3-1, F3-4 | corrigés | confirmés ; le champ date est déjà sous `lang="fr"` (hérité, FORM/INPUT lang=fr) |
Aucune régression : menu mobile s'ouvre (`:popover-open`) et se ferme à Échap, 404 intacte.

## Findings restants
F0 : aucun. F1 : aucun. F2 : aucun.

F3-2 · `landmark-no-duplicate-contentinfo` (moderate) sur les 5 pages (`.pied` + `.kyw-footer`), seule violation axe restante, 0 serious ou critical. Cause : paquet `packages/kyw-footer`, hors périmètre du site ; à signaler au paquet, ne bloque pas la publication.

F3-3 · 1 à 6 « color-contrast » en `incomplete` d'axe selon la page (lettres de néon et « più bella » en fondu) ; mesure maison : 0 nœud sous seuil une fois le reveal terminé. Décoratif, non corrigé.

F3-5 · pas de `robots.txt` ni de sitemap sous la base : faux positif connu.

## Ce qui est bien (à ne pas casser)
1. Le néon comme écriture des titres et la 404 « Un tube a grillé » avec trois sorties (`404-390-00.png`).
2. Le premier écran mobile porte désormais l'action de réservation par téléphone, cohérente avec un restaurant qui ne réserve que par téléphone.
3. Fidélité du contenu au dossier : faits, prix, horaires, deux numéros ; rien d'inventé après correction.
