# RAPPORT QA : yayami / portfolio (phase 3)

## Résultat
- Build final OK (`scripts/q.sh yayami-qa-build pnpm build:site sites/yayami-portfolio`), 7 pages.
- QA-build.md (shoot home, carte, 404 ; audit 6 pages) : 0 erreur console, 0 requête en échec, 0 FAIL audit, 0 violation axe sur home et carte.

## Corrigé
- Mobile (390 px) : le lien « Commander » de l'en-tête dépassait la fenêtre (bord droit 408 px, tronqué dans la rangée défilante). Il est masqué sous 520 px ; la barre basse « Commander » reste. Vérifié par mesure et capture ciblée de l'accueil : `scrollWidth` 390, bords des liens 71, 148, 233, 311.

## Non corrigé, faux positifs ou sans objet
- Axe 404 `color-contrast` (#6b787d sur #fbfaf8) : mesure prise pendant le fondu d'entrée ; couleurs stabilisées `.kyw-footer__note` = #55646a (conforme), 404.html vérifiée directement.
- Cible tactile 404 (« la page d'accueil », 20 px) et « hover sans changement » : 404 brute de `serve.mjs`, pas la page du site.
- WARN audit : phrase d'horaires répétée (section et pied de page, voulu), pas de robots.txt ni sitemap (variante noindex).
- `skipLinkFirst: false` : faux positif connu.

## Placeholders
Aucun `placeholder: true` : e-mail, avis, réservation, équipe absents (non affichés). Hypothèses dans ETAT.md. Boissons « Bière japonaise » et « Limonade japonaise » déduites des marques.

## Points ouverts
- Pages boissons, maison, livraison, commander non capturées par le shoot (audit seulement).
- `gabarits/UTILISATION.md` : ligne `nocturne | pepite, yayami` à ajouter (hors périmètre).
- Commit final avec `[publier]` à la charge de l'orchestration.
