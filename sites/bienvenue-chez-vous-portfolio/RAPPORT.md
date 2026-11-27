# RAPPORT QA — bienvenue-chez-vous · portfolio (construction-3)

QA-build.md absent (l'agent captures n'a pas tourné) : audit + crawl shoot (accueil, menu, 404) lancés ici ; planches bureau et mobile lues.

## Résultats
- audit.mjs : 6 pages, 0 FAIL, 5 WARN (phrases d'horaires répétées, volontaire ; « no robots.txt / sitemap » = sonde, les deux fichiers existent dans dist).
- shoot : 0 erreur console, 0 requête en échec, 0 violation axe sur accueil, menu, 404. 404 conforme (mention Maquette, pied KYW). Menu mobile OK.
- Corrigé : bande « À emporter » de l'accueil, texte sur photo peu lisible (le voile `::before` passait sous les photos, z-index -1). Voile remonté (z-index 0, 0,55 / 0,9). Vérifié par capture ciblée 1440 : titre, onglets et texte lisibles.
- Mineur, non corrigé : « Grignotages » du menu affiche un point à la place du numéro (entrée sans numéro, voulu).

## Placeholders / à confirmer
- Téléphone (+32 477 29 96 83) et horaires : tirés des guides (Gault&Millau, Restaurant Guru), mention « à confirmer ».
- E-mail : non affiché. Box Bienvenue 109 € « à confirmer ». Mercredis à prix réduit : sans tarif. Tarifs G&M (103 / 113 €) divergents, site actuel retenu.
- Pas de GPS (itinéraire OSM par adresse), pas de portrait du chef (façade).
- Données illustratives : mention « Maquette KYW » présente sur toutes les pages.
- `gabarits/UTILISATION.md` à compléter (« velours | bienvenue-chez-vous ») par la session mère (interdit ici).
