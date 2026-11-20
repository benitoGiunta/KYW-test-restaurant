# Revue legacy · Don Dino · passe 2
Verdict : PUBLIABLE
Lecture en une ligne de l'idée du site (inchangée depuis la passe 1, vérifiée sur `home-1440.png` et `groupes-*.png`) : une carte de brasserie-pizzeria lisible avant tout, sur fond vert profond, avec six pizzas et leurs prix dès l'accueil et une pastille orange « Réserver » toujours à portée.

Méthode : pas de `REVISION-1.md` ni de `QA-revue2.md` (l'agent captures n'a rien déposé) ; les corrections annoncées sont donc celles du commit `9a92d83` (« Corriger F1 et F2 de la revue 1 »), relues dans son diff de `src/`. `dist/don-dino/legacy/` (17:05) est postérieur à tout `src/` et à `public/` (`find -newer` vide), identique au commit (`git status` propre sur `dist/`) : réutilisé sans reconstruire. Un script maison (axe-core complet de `node_modules`, console, requêtes, débordement, balises, 7 pages dont la vraie `404.html` × 1440 / 390 / 320 px = 21 cas), une mesure de cible et une planche de 5 captures (`groupes-1440`, `groupes-390`, `m-groupes-occ-390`, `m-groupes-occ-320`, `home-1440`, toutes ouvertes). Serveur propre sur le port 4763 (PID 11579), arrêté par `kill`.

Scores /10
- Design 6 : inchangé, cohérent et lisible mais monochrome vert, pages internes en listes (voir F3-5) ; au mobile les quatre occasions de /groupes/ forment une pile de 4 grandes tuiles d'environ 137 px de haut (`m-groupes-occ-390.png`).
- Usabilité 8 : F1-1 levé, tuiles lisibles à 390 et 320 px, réservation et téléphone toujours visibles ; reste une cible de 22 px au bureau (F3-1).
- Créativité 5 : l'idée « la carte est le hero » tient ; rien n'a bougé sur les pages internes.
- Contenu 8 : faits et 115 plats conformes à la passe 1 (aucun texte de carte touché) ; filler de /groupes/ et « ambiance italienne » toujours présents (F3-3, F3-4).
- Technique 9 : 21 cas sur 21 sans erreur console, sans requête en échec, sans débordement, 1 h1, `lang="fr"`, noindex, mention KYW et un seul logo `.kyw-footer__logo` partout ; axe : 0 violation (tous impacts) et 0 « à vérifier » ; Open Graph complet et JSON-LD sur les 7 pages.

## Vérification des corrections annoncées
- **F1-1 · tuiles « occasions » de /groupes/ : corrigé.** Le style en ligne est remplacé par `.facts--4` (page.css) ; mesures : 4 colonnes de 304 px à 1440, 1 colonne de 358 px à 390 et de 288 px à 320, aucun mot coupé (`m-groupes-occ-390.png`, `m-groupes-occ-320.png`). Réserve de finition : la pile de quatre tuiles de 137 px de haut occupe un écran et demi au mobile, deux colonnes en 390 px conviendraient mieux (F3-8).
- **F2-1 · double `contentinfo` : corrigé.** Le pied du site est maintenant `<section class="foot" aria-label="Coordonnées et liens du restaurant">` et `<kyw-footer>` est le seul `<footer>`, enfant direct du `body` (mesure : `kyw-footer<BODY`, 1 seul `footer` par page) ; axe complet à 0 violation sur les 7 pages à 3 largeurs, `landmark-contentinfo-is-top-level` et `landmark-no-duplicate-contentinfo` n'apparaissent plus.
- **F2-2 · Open Graph : corrigé.** Sur les 7 pages : `og:type`, `og:locale`, `og:site_name`, `og:title`, `og:description`, `og:url`, `og:image` (+ largeur et hauteur) et `twitter:card=summary_large_image`. `og-salle-1200x630.jpg` existe dans `dist/…/photos/` à 1200 × 630 (PIL), l'URL absolue `https://kyw-test-restaurant.vercel.app/don-dino/legacy/photos/og-salle-1200x630.jpg` est identique sur les 7 pages et le domaine est celui d'`astro.config.mjs`. Je n'ai pas ouvert la miniature (la photo vient de `public/photos`, même source que la salle de la carte).

## Findings restants (aucun F0, F1 ni F2)

### F3 finition (non annoncés comme corrigés : encore présents)
- **F3-1 · Cible de 22 px** : « Voir la carte complète » mesure 167 × 22 au bureau (`index.astro:39`, `.index__more a`), 44 px en tactile. Correction : `min-block-size: 24px` sur `.link` hors `pointer: coarse`. Même cas : « Visiter le restaurant en ligne » (218 × 22) sur /a-propos/ au bureau.
- **F3-2 · Note de chantier visible** sur /a-propos/ : « Titres et dates des articles à compléter. » (`a-propos/index.astro:28`, `data-placeholder`). Correction : texte neutre ou masquer.
- **F3-3 · Filler sur /groupes/** (`groupes/index.astro:12` et `:20`) : « Un lieu unique et privatisable… », « dans un cadre convivial et privatisé ». Correction : s'appuyer sur un fait du dossier.
- **F3-4 · « ambiance italienne »** (`a-propos/index.astro:18`) absent du dossier (« décontracté, streetwear, idéal pour les familles »).
- **F3-5 · Composition des pages internes** : tuiles égales sur /groupes/ et vides verticaux (`groupes-1440.png`, grand vide sous « Pour quelles occasions » et autour de « Une table chez Don Dino »), 3 cartes égales sur /contact/.
- **F3-6 · Doublon de libellé** sur /reservations/ : bouton « Devis… » (`reservations/index.astro:18`) et titre du formulaire « Devis et réservation » (`:22`) ; même libellé sur le bouton de /groupes/ (`:21`).
- **F3-7 · Google Fonts** (`Base.astro:37-39`, ~286 Ko) : auto-héberger en WOFF2 avec `preload`.
- **F3-8 · (nouveau) Pile de tuiles « occasions » au mobile** : 4 tuiles de 137 px en 1 colonne (`m-groupes-occ-390.png`). Correction : `repeat(2, minmax(0, 1fr))` entre 20 et 40 rem, hauteur réduite.

## Ce qui est bien (à ne pas casser)
1. La fiche « Les pizzas de la carte » du hero : six pizzas, prix réels du dossier, accroche du site actuel (`home-1440.png`).
2. /carte/ : 115 plats en 12 rubriques, aucun écart avec `donnees.json` (texte non modifié depuis la passe 1).
3. Un seul `contentinfo` (pied KYW) avec mention « Maquette KYW, certaines données sont illustratives », noindex partout, formulaire honnête qui n'envoie rien.

Non revérifié en passe 2 : liens internes et externes (aucun lien modifié par le commit ; 0 lien mort constaté en passe 1, 0 réponse ≥ 400 pendant les 21 chargements), LCP/CLS (aucun changement de rendu au-dessus de la ligne de flottaison, seules des balises `meta` et un pied de page ont changé).
