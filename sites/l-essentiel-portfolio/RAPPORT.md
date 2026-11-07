# RAPPORT QA : L'Essentiel, portfolio (gabarit comptoir)

## Résultat
- Build : `scripts/build-site.mjs` passe (7 pages, dist 2,2 Mo). Audit de la passe build : 0 FAIL, 10 WARN.
- home et menu : 0 erreur console, 0 requête en échec, axe 0 violation, CLS 0, pas de débordement, 60 fps.
- carte, maison, chambres, reservation (non couvertes par l'agent captures) : capture ciblée 1440 et 390, haut et bas de page :
  0 erreur console, 0 image cassée, scrollWidth = largeur de fenêtre, bande KYW, mention « Maquette KYW » et logo visibles.

## Corrections de cette passe
- `/reservation/` : meta description de 189 caractères ramenée à 148 (vérifiée dans le HTML construit).

## WARN non corrigés (justifiés)
- « 12 h à 14 h, 19 h à 21 h 30 » répété 4 à 8 fois : horaires affichés par ligne de service et par pied de page, donnée réelle.
- 404 : axe `document-title` et `html-has-lang` et « pas de h1 » viennent de la réponse brute de serve.mjs ; `404.html` construit porte lang="fr", title « Page introuvable | L'Essentiel » et un h1 (leçon commune).
- robots.txt et sitemap : présents dans le build du site (`robots.txt`, `sitemap-index.xml`) ; WARN de l'audit sous `base` (faux positif connu). noindex, nofollow voulu (prompt § 3.3).
- `colorOnly` au survol (liens téléphone, Michelin, bouton médaillon) : soulignement laiton présent au repos, jugé acceptable.
- Contraste « à vérifier » (15 sur home) : laiton `#9a7a35` limité aux filets et focus, texte en noir.

## Placeholders
- Dressage : composants hors « Mignon de biche » (Pomme Dauphine, Croquette, Sauce poivrade, Jeune pousse), `placeholder: true`, marqués « illustratif ».
- Chambres : photos non attribuées à une chambre (alt neutre) ; tarifs repris du site actuel, à confirmer.
- Réservation : formulaire de démonstration sans envoi (ouvre le calendrier du restaurant).
- Chef non nommé, avis retirés, bon cadeau retiré (aucune preuve dans le dossier).
- Note Google « plus de 1 000 avis » (1 039 ou 1 052 selon la source).

## Points ouverts
- Pas de capture de la scène épinglée mobile en 667 de haut.
- Façade en hero mobile : l'enseigne est rognée par le recadrage 4:5 (lisible, acceptable).

## Leçons structurelles
- Aucune nouvelle ; le faux positif 404 est déjà dans `agents/lecons/commun.md`.
