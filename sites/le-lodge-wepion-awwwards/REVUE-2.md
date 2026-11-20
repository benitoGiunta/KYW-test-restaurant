# Revue awwwards · Le Lodge Wépion · passe 2
Verdict : PUBLIABLE
Lecture en une ligne de l'idée du site : « deux rives, une table » : un restaurant fermé par un incendie, replié à Erpent, dont une onde dorée sépare la berge de Wépion et le relais, avec la carte de saison d'avant l'incendie conservée en entier.

Scores /10
- Design 8 : inchangé, encre, crème verte et or, Gambetta en grand corps, onde dorée récurrente (`home/planche.png`, `d-01-hero`, `m-01-hero`).
- Usabilité 8,5 : `.mur` atteignable au clavier (focus() actif, `:focus-visible` vrai, contour solide 2 px), chapeaux mobiles à 350 px sur 390, 0 violation axe sur 10 cas ; restent des cibles de 23 px (F3-1).
- Créativité 8 : idée et signature intactes (onde, passage au défilement, rideau).
- Contenu 8 : les deux erreurs F1 sont corrigées, plus de procédure inventée ni de langage de production ; restent des nuances de formulation (F3-3).
- Technique 8,5 : 0 erreur console, 0 requête en échec, LCP mobile ralenti (CPU x4 + 4G, 2 passes) 1292 et 1308 ms, CLS 0,0053, 0 débordement, reduced-motion sans texte caché, 5 liens internes en 200.

Méthode : QA-revue2.md (captures postérieures à `src/` et à `dist/` : 02:55 contre 02:46 et 02:48) et ses planches lues (accueil, carte). Texte extrait du `dist/` (5 pages) puis script maison unique (serveur propre port 4791, PID 9174, arrêté) : axe-core complet de `node_modules`, contraste canvas 1x1 nœud par nœud, débordement, cibles, focus de `.mur`, 5 pages x 1440 et 390 px ; second script : liens, JSON-LD, couleur de la note du pied, reduced-motion, LCP/CLS CDP. Non refait : build (QA : exit 0, `dist/` cohérent avec `src/`).

## Vérification des corrections annoncées dans REVISION-1

| id | annoncé | constat |
|---|---|---|
| F1-1 | « L'Italien, tartare de bœuf », 24 € | CONFIRMÉ. `index.html` : « L’Italien, tartare de bœuf », 24 €, garnitures identiques à `donnees.json` (Parmesan, tartufata, sésame, pepperoni, huile au pesto). L'entrée à 16 € reste sur la carte, à son nom. |
| F1-2 | « envisagé » | CONFIRMÉ. `envisagée` : 0 sur les 5 pages ; « Retour envisagé fin 2026, voire début 2027, sans date confirmée » (pied, accueil) et « Le retour à Wépion est envisagé » (accueil, histoire) accordés. |
| F2-1 | `.mur` focusable | CONFIRMÉ. `carte.astro:39` `tabindex="0"` ; à 390 px `.mur` est défilant, reçoit le focus, outline 2 px visible ; axe : 0 `scrollable-region-focusable`. |
| F2-2 | procédure retirée | CONFIRMÉ. « La carte du relais d’Erpent n’est pas connue : celle-ci est la carte de saison d’avant l’incendie. » ; `demandez-la` : 0. |
| F2-3 | chapeau pleine largeur mobile | CONFIRMÉ. `.entete p` mesuré à 350 px sur 390 (carte, histoire, réservation) ; 576 px à 1440 (inchangé) ; `m-01-hero` de la carte lisible sur toute la largeur. |
| F2-4 | décompte et date de collecte retirés | CONFIRMÉ. `Quatre-vingt` et `diaporama` : 0 ; texte : « Carte de saison relevée sur le site du Lodge avant l’incendie » et « relevée sur lodgewepion.be avant l’incendie ». |
| F2-5 | « déjà fait » | CONFIRMÉ. Note du pied `rgb(85,100,106)` (#55646a) sur `rgb(243,242,239)` (≈ 5,5:1) ; axe : 0 violation sur la 404 (la violation `color-contrast` du QA-revue2 n'apparaît plus ; son rapport vient d'une capture à contraste « serious » classée avant le passage axe complet, non reproduite en deux passes de script). |

Aucune régression : mention « Maquette KYW, certaines données sont illustratives », `kyw-footer__logo` = 1 et `noindex` présents sur les 5 pages ; 1 seul `h1` et `lang="fr"` partout ; 0 tiret cadratin ; tutoiement : 0 ; URL de réservation (Barestho), Facebook, Instagram, e-mail et téléphone conformes à `donnees.json`.

## Findings

### F0, F1, F2
Aucun.

### F3 (finition, non traités par la révision, qui ne les annonçait pas)
- **F3-1 · cibles < 24 px (restent).** Bureau : « Ouvrir le plan » 519 x 23 (accueil). Mobile : « Ouvrir le plan » 350 x 23 et 98 x 23, « Voir toute la carte » 131 x 23, « Crêpes et gaufres » 130 x 23, « Réserver en ligne » 127 x 23, `0496 92 55 13` 119 x 23, `le.lodge@hotmail.com` 161 x 23, liens de la 404 (58 à 64 x 23). Correction : `min-height: 24px` (idéalement 44) sur `.lien`, `.lien-util` et les liens du pied.
- **F3-2 · « Wine & More » sans espace insécable** (0 occurrence de U+00A0 dans « Wine & More » sur les 5 pages) : coupé sur 3 lignes dans les chapeaux mobiles. Correction : U+00A0 dans `relais.lieu`.
- **F3-3 · formulations.** « Il reçoit depuis 2008 » au présent alors que le lieu est fermé (`histoire`, accueil) : « Il a reçu depuis 2008 ». « Un incendie parti des cuisines a ravagé la salle » : « la salle » n'est pas prouvée, L'Avenir dit « le restaurant » (« ravage le restaurant » est déjà la formule de la chronologie). Rétractation de la passe 1 : « Juin 2026 » pour le service à l'Aquaplane est fondé (article DH du 10/06 : reprise « dès ce samedi », soit le 13/06) ; pas de correction.
- **F3-4 · JSON-LD** : `acceptsReservations: true` et téléphone de Wépion au nom du lieu fermé (description mentionnant le relais et la fermeture : amélioré) ; toujours sans `openingHours`, cohérent avec l'absence d'horaires.
- **F3-5 · croquettes de crevettes grises** : « une pièce » à 15 € à l'accueil, la carte donne aussi « 2 pièces 24 € ». Écrire « une pièce, deux à 24 € » ou retirer la mention.
- **F3-6 · eyebrows** encore présents au-dessus des titres d'histoire et de réservation (répètent le titre).
- **F3-7 · accueil mobile, section de la phrase « Les photos de ce site datent d'avant l'incendie… »** : corps très grand, un mot ou deux par ligne sur ~15 lignes (`m-02-scroll`), long à parcourir ; réduire le corps sous 40 rem.

## Ce qui est bien (à ne pas casser)
1. Honnêteté sur la fermeture : adresse provisoire, aucun horaire inventé pour Erpent, sources d'incertitude affichées, aucune note ni récompense.
2. Idée unique tenue partout (onde, rives, rideau) avec des perfs solides : LCP mobile ralenti 1,3 s, CLS 0,005, poids max ~513 Ko.
3. Carte complète et exacte (88/88 plats), désormais sans recomposition à l'accueil.
