# Revue awwwards · Makimono · passe 2
Verdict : A_CORRIGER (0 F0, 0 F1, 2 F2, 4 F3)
Lecture en une ligne de l'idée du site (sans relire DESIGN.md) : un rouleau de sushi qui se déroule : MAKIMONO en lettres noires géantes sur crème, bandes vert nori, vraies photos de plats, barres haute et basse en cylindre (inchangé depuis la passe 1).

Scores /10
- Design 8 : hero et alternance crème / nori intacts (`rel-home-1440-hero.png`) ; baseline et boutons du hero toujours très petits (F3-5 non traité).
- Usabilité 7 : Contact sans débordement à 320, 360, 390, 768 et 1440 (`rel-resa-390-full.png`, scrollWidth = clientWidth) ; la carte déborde encore de 11 px à 320 px.
- Créativité 8 : identité inchangée, rien cassé par la révision.
- Contenu 8 : 0 « Réserver » dans dist, phrase des allergies retirée ; un formulaire garde un libellé de demande de table (F2-3).
- Technique 7 : 0 erreur console, 0 requête en échec, 0 violation axe serious/critical sur 25 cas ; `landmark-no-duplicate-contentinfo` (moderate) sur 25 cas sur 25 ; og.png 388 Ko.

## Méthode et limites
- Captures de `QA-revue2.md` (11:45:55) postérieures au dist (11:45:41), lui-même postérieur à `src/` (dernier fichier 11:42:52) : réutilisées. La « 404 » axe (document-title, html-has-lang) est la réponse brute de serve.mjs : faux positif connu ; `404.html` réelle mesurée (h1, title, lang OK). WARN sitemap/robots de l'audit : faux positifs connus (sitemap-index.xml présent).
- Mesures faites par moi sur `dist/` : serveur port 4871 (PID 23568, tué), 1 script maison (axe-core de node_modules, console, requêtes, débordement, cibles < 24 px, balises ; 5 pages x 1440, 768, 390, 360, 320, après défilement à la molette) + 1 script ciblé carte (éléments hors fenêtre, hors conteneurs à défilement) + captures Contact 390 et 1440. LCP, CLS et fps de QA-revue2 repris tels quels (1,55 s mobile, CLS 0,003, 60 fps).

## Vérification des corrections annoncées dans REVISION-1.md
| id | annoncé | constaté |
|---|---|---|
| F1-1 débordement Réserver | corrigé | CONFIRMÉ : scrollWidth 1440, 768, 390, 360, 320 = largeur de fenêtre sur Contact ; bouton « Écrire un e-mail » entier. L'annonce « accueil à 320 OK » est vraie aussi ; la carte, non mentionnée, déborde à 320 (F2-1). |
| F2-1 procédure déduite | corrigé | PARTIEL : `grep Réserver` dans dist : 0 ; h1 « Contact », title « Nous joindre et venir », nav « Contact ». Mais le formulaire garde « Date, heure et nombre de personnes » (`reservation.astro:26`) : voir F2-2. |
| F2-2 généralisation des allergies | corrigé | CONFIRMÉ : « se signalent au chef » : 0 dans dist. |
| F3-1 capitalize du pied | corrigé | CONFIRMÉ : « lundi au samedi » et « dimanche, le soir » (accueil et Contact), `site.css:146` ne concerne plus que `.horaires`. |
| F3-3 JPEG orphelins | corrigé | CONFIRMÉ : 0 JPEG dans `dist/_astro` (que des webp) ; og.png non recompressé, hors liste : 387 733 octets. |
| F3-4 « Ce qu'on promet » | corrigé | CONFIRMÉ : « Ce que la carte indique » (1 occurrence, a-propos). |
| F3-2, F3-5, F3-6 | non traités | CONFIRMÉ non traités (axe moderate toujours là ; baseline hero toujours en 11 px). |

## Findings (par gravité)

### F2 (mineur)
- **F2-1 · La carte déborde à 320 px.** `document.scrollWidth` = 331 pour 320 (`/carte/@320`) ; fautif : `h2.titre-l` « Accompagnements » (right = 331, largeur 315 pour 320 de fenêtre, marges comprises) ; 360, 390, 768 et 1440 OK. Le rail de rubriques (`ul` en `overflow-x: auto`) dépasse la fenêtre par construction : voulu, pas un défaut. Correction : `overflow-wrap: anywhere` ou `hyphens: auto` sur `.titre-l` (ou `font-size: clamp()` plus bas sous 22 rem) ; mesurer `scrollWidth` de `/carte/` à 320. La révision annonçait « mesures 320/360/390 OK » sans avoir mesuré la carte.
- **F2-2 · Libellé de demande de table dans le formulaire.** `reservation.astro:26` : « Date, heure et nombre de personnes » ; `donnees.json` → `reservation` = `{"outil": null, "url": null}` et le dossier note « pas de réservation de table ». Le reste de la page a été corrigé mais le formulaire garde la procédure déduite. Correction : « Votre message » (un seul champ) ou « Votre question » ; « Un mot pour le chef (allergies, régime) » peut rester car la Creative Box est « imaginée par le chef » (dossier l. 56), à défaut « Un mot pour la cuisine ».

### F3 (finition)
- **F3-1 · axe `landmark-no-duplicate-contentinfo` (moderate)** sur 25 cas sur 25 : `footer.pied` (`Footer.astro:15`) + `kyw-footer`. Passer `.pied` en `div` fait apparaître `region` : tester les deux.
- **F3-2 · og.png 388 Ko** (`dist/.../og.png`), à recompresser sous 300 Ko.
- **F3-3 · Hero 1440 px** : baseline en 11 px capitales (« CREATIVE URAMAKI MADE WITH LOVE ») et boutons de 11 px sous un titre de 200 px, bloc texte flottant bas dans un grand vide (`rel-home-1440-hero.png`). Monter la baseline à 14 px.
- **F3-4 · Cible de 20 px** : « Ouvrir le plan (OpenStreetMap) » 245 x 20 à 1440 et 231 x 19 à 768 (Contact, `min-height: 1.5rem`).

## Vérifié sans écart (nouveau passage)
0 erreur console et 0 requête en échec sur 25 cas ; 5 pages : un h1, `lang="fr"`, `noindex, nofollow`, mention « Maquette KYW, certaines données sont illustratives. » et logo KYW (1 par page) présents ; 0 violation serious/critical ; Contact : tél., e-mail, horaires, plan et liens de commande cohérents avec `donnees.json` ; title et description de Contact cohérents avec le contenu ; LCP mobile 1,55 s, CLS 0,003 (QA-revue2).

## Ce qui est bien (à ne pas casser)
1. La chasse typographique MAKIMONO et le système cylindre/nori : identité propre à ce restaurant.
2. Honnêteté du contenu : aucune histoire, avis ou chiffre inventé, formulaire qui dit qu'il ouvre la messagerie, photos légendées d'après `sujet`.
3. Contact après correction : bouton « Écrire un e-mail » lisible, pied d'horaires propre, aucun débordement de 320 à 1440 px.
