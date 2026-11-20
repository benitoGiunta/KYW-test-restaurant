# RAPPORT QA : le-brunchist portfolio (construction-3, phase 3/3)

QA-build.md de l'agent captures était absent : audit et contrôles ciblés refaits par la présente passe (page par page, sans shoot complet).

## Résultats (build `bru3-build` OK, 6 pages, serveur 4431 arrêté)
- audit.mjs (accueil + crawl, 5 pages) : 0 FAIL, 10 WARN (phrases répétées « prix illustratif » = lignes de carte, sitemap/robots sous base = faux positifs connus). Poids accueil ~573 Ko (images 387).
- Contrôle navigateur 390 et 1440 sur 6 pages (accueil, carte, brunch, histoire, reservation, 404) : scrollWidth = fenêtre, 0 image cassée, 0 alt manquant, 0 erreur console, 0 requête en échec ou 4xx, h1 unique, lang fr, noindex, mention « Maquette KYW… », pied KYW présent, 0 tiret cadratin, 0 lien vide, 0 cible < 24 px.
- Clics réels de l'en-tête 1440 : 5 liens sur 5, elementFromPoint = bon `<a>`, URL change (le premier essai à 5/11 comptait le logo et les liens de la frise, faux négatif de sélecteur).
- Captures ciblées : hero 1440 et 390, carte 1440 (milieu de page, contenus révélés), réservation 390, bas de page 1440 et 390 (pied KYW visible, bas 843,5 px pour une fenêtre de 844 en fin de défilement).
- Correction nécessaire : aucune (rien de cassé constaté).

## Placeholders
- Photos : 9 photos libres Unsplash (`placeholder: true`, crédit en colophon), à remplacer par celles de la maison.
- Prix de la carte : tous « prix illustratif » ; plats issus de la presse/avis, carte complète non communiquée.
- Réservation : « à confirmer par téléphone » (sources contradictoires).
- Fondateurs « selon ELLE.be (à confirmer) » ; avis Google cités avec source Restaurant Guru.
- Pas de logo ni palette client ; horaires contradictoires selon les sources (9h30-15h30, mercredi-dimanche retenu).

## Points ouverts
- gabarits/UTILISATION.md (journee : le-brunchist) à mettre à jour par l'orchestrateur.
- Pas de test tactile réel sur médaillons et bande terrasse.
- Aucun `[publier]` posé.

## Leçons structurelles
- Voir data/usage/test-1/lecons-proposees/le-brunchist.md.
