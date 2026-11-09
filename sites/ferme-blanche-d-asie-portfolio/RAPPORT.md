# RAPPORT : ferme-blanche-d-asie · portfolio (phase 3, QA, 09/11/2026)

## Résultat QA
- Build : OK, 6 pages. Console 0 erreur, 0 requête en échec, 0 violation axe sur accueil et carte, CLS 0, pas de débordement, 0 cible tactile trop petite, clavier sans blocage, audit FAIL 0.
- Corrigé : 29 photos du gabarit non référencées retirées de `public/photos/` (`git rm`), 18 restent, dist en contient 18.
- Vérifié par capture ciblée : galerie « En images » en 390 px (images chargées, ratio correct ; les bandes vues sur la planche étaient des révélations en cours).
- Faux positifs (leçons communes) : 404 sans lang/title (réponse brute de serve.mjs ; `404.html` porte lang="fr", titre, noindex, mention KYW, un seul kyw-signature), WARN sitemap/robots/404 sans h1, lien d'évitement, phrases répétées (horaires, légitimes).
- Contraste « à vérifier » axe (156 accueil, 229 carte) : éléments incomplets (fond photo/voile, numéro fantôme en pseudo-élément), non confirmés comme échecs.
- LCP mobile carte 2236 ms (4G lente, CPU 4x), accueil 1192 ms ; page la plus lourde 1998 Ko (images).

## Placeholders / données à confirmer
- Aucune donnée inventée. Notes Resto.be 9,1/10 (201 avis) affichées « à confirmer » sur /maison/. Plan SVG « illustratif ». Réservation par téléphone, formulaire de démonstration (mailto). Rouleau sans photo de plat (aucune au dossier). Desserts de Noël à compléter.

## Points ouverts
- Photos 11 et 12 (1916/1919 px) non réduites à 1800 px. Survol : 1 cible sur 7 sans réaction visible. Audit de contraste manuel du rouleau non fait.

## Leçons structurelles
- Les planches du pipeline captures montrent les blocs `data-reveal` à mi-révélation sur mobile : vérifier par capture ciblée après défilement avant de conclure à un défaut.
