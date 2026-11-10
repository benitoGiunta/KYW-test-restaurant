# ETAT : huile-sur-le-feu-portfolio (phase 2 sur 3 terminée)

## Fait (phase 1)
- Gabarit « Marée » adapté : données, tokens, loader « huile versée », 16 photos WebP, favicon/OG, 7 pages, KywFooter seul `contentinfo`, noindex, mention Maquette KYW. DESIGN.md (matrice, décisions). `gabarits/UTILISATION.md` à jour.

## Fait (phase 2)
- Bug corrigé : nom du hero rogné à droite (desktop 1482 px pour 1440, mobile 487 px pour 390) : `.nom { grid-template-columns: minmax(0, 1fr) }`. Mesuré : nom = 1440 / 1280 / 390 px de large aux trois viewports, aucun débordement.
- Signature « la flamme sur l'huile » : lueur du flambage qui vacille (`.hero__feu`, CSS) + filet de flamme sur la crête de la houle des heros (`path[data-houle-ligne]`, `houleLigne()` dans `motion/houle.ts`, même ticker que la houle). Accueil : lueur + filet ; huiles et boutique : filet.
- Lisibilité de l'en-tête : voile ivoire (accueil) et bordeaux (thème sombre : huiles) en `.hero__media::before`.
- Interactions : gouttes d'huile teintées sur les listes de huiles (accueil, /huiles/), survol souris seulement ; ancrage inchangé pour les autres (magnétique, curseur « Voir », houle réactive au scroll héritées).
- États : formulaire /reservation/ (`:user-invalid` flamme, message `role="status"` à l'envoi). Pied de page : colonne « Le site » (carte, huiles, boutique, maison) car l'en-tête mobile masque huiles et boutique.
- Mobile : débordement 12 px à 320 px sur /reservation/ corrigé (`.deux` en une colonne, `.btn--large` qui revient à la ligne). Contrôle 320 et 390 sur 7 pages : scrollWidth = largeur.
- Reduced motion : lueur figée, survols sans mouvement, aucun élément à opacité 0 (voir « Contrôles »).
- Build passe (`scripts/q.sh hsfp2-build pnpm build:site …`), 0 erreur console sur 7 pages en 1440, 0 en 390.

## Reste (phase 3 : captures puis finitions)
- Lire QA-<étape>.md de l'agent captures ; audit axe (contraste du filet de flamme décoratif non concerné ; nav ivoire sur fond jaune de /huiles/ à surveiller).
- RAPPORT.md (placeholders, audit, leçons), `pnpm index`, commit des chemins du site et de `dist/huile-sur-le-feu/`, push.
- Photos 12 (plat sauce orange), 06, 07 et logo-negatif.svg toujours non utilisés.
- Non vérifié visuellement : survol des gouttes en capture, `.media--vide`, galerie à 4 images sur /histoire/ (vue : OK à 1440).
- Mini-script de clics réels sur l'en-tête : voir ligne « Contrôles » ci-dessous.

## Contrôles
- Clics réels (souris) sur chaque lien d'en-tête, 1440, 3 pages (/, /huiles/, /reservation/) : 18 clics, 0 échec ; elementFromPoint = <a> partout.
- Bas de page 1440 (fenêtre) : bande du site, mention « Maquette KYW, certaines données sont illustratives » et logo KYW visibles ; un seul <footer>.
- Reduced motion (3 pages) : 0 élément masqué, loader masqué, lueur sans animation, scrollWidth 1440.
- Boutique : voile dégradé bordeaux ajouté sur la photo (citation mono illisible sur les boîtes claires), citation lisible desktop et mobile.

## Pièges
- Un script de clics réels sur toutes les pages dépasse 2 min : tâche de fond, pas de rebuild pendant son exécution.
- Hypothèse : teintes des gouttes (`tonHuile`) décoratives et non datées, pas des données du restaurant.
- Fichiers non commités d'autres agents dans le dépôt (`pnpm-lock.yaml`, `sites/huile-sur-le-feu-legacy/`) : ne pas les ajouter.
