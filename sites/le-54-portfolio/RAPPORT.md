# RAPPORT — le-54 / portfolio (phase 3, QA)
Gabarit : Velours. Build vert (`pnpm build:site sites/le-54-portfolio`, 7 pages, `dist/le-54/portfolio/`).

## QA
- Planche accueil (agent captures) relue : hero, chapitres, signature, onglets, galerie, clôture, pied de page OK ; menu mobile, 0 erreur console, 0 requête en échec, CLS 0.
- Corrigé : axe `label-content-name-mismatch` (lien `.header__brand` : `aria-label` retiré, le texte visible « Le 54 » donne le nom). Vérifié : l'attribut n'existe plus sur les 6 pages.
- Débordement X desktop signalé sur l'accueil (`img`) : non reproduit, scrollWidth = clientWidth sur 6 pages en 1440 et 1920 (photos de chapitre clippées, faux positif connu).
- Revu en mobile 390 (carte, salle, réservation, histoire) : pas de débordement, textes lisibles, pied de page avec mention KYW et logo. Le lien « Aller au contenu » vu sur les captures pleine page est un artefact (fixed + fullPage), caché par translateY hors focus.
- Faux positifs non corrigés : 404 sans h1/title/lang (réponse brute de serve.mjs), WARN robots/sitemap sous base, phrases d'horaires répétées (volontaire, accueil et réservation).
- Axe `contrastNeedsReview` (18 accueil) : à revoir manuellement, non bloquant.

## Placeholders
Aucun `placeholder: true`. Éléments marqués « à confirmer » (`.illu`) : horaires, lundi, menus 2 et 4 services (30/65 €), couverts (34), infos pratiques.

## Points ouverts
- `gabarits/UTILISATION.md` : ajouter `velours | le-54` (non touché, consigne).
- Rotation des onglets non mesurée en détail.

## Leçons structurelles
- `aria-label` sur un lien dont le texte visible est différent déclenche `label-content-name-mismatch` : laisser le contenu visible nommer le lien.
