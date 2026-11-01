# Révision 1 · La Dolce Vita (Wépion) · portfolio

Périmètre : F2 de REVUE-1.md seulement (0 F0, 0 F1). F3 non traités. Rebuild final via `scripts/q.sh` : exit 0, 7 pages. Pas de QA complète.

| id | décision | changement (fichier) | preuve |
|---|---|---|---|
| F2-1 | corrige | `.fiche__tag` en `inline-block; white-space: nowrap; overflow-wrap: normal` (`src/styles/base.css`) | Playwright à 390 et 320 px : 10 étiquettes, 0 sur plusieurs lignes, 0 dépassement ni débordement horizontal (le libellé réel est « Végétarien ») |
| F2-2 | corrige | Cartes à initiale géante et « Photo à fournir » remplacées par une liste de texte nom / rôle, sans flèches (`index.astro`, `histoire.astro`, classes `.equipe*` ajoutées à `base.css`) | grep `dist/` : 0 « Photo à fournir », 0 `gens__initiale` ; capture 390 px de l'histoire ; nom aligné sur le titre (16 px à 390, 33 px à 1440), pas de débordement |
| F2-3 | corrige | Disques numérotés retirés de la page pizze (`pizze.astro`) ; compteurs `cat__num` décoratifs supprimés (accueil x2, histoire, à emporter, suppléments) ; conservés ceux qui comptent des plats (carte, pizze) | grep `dist/` : plus de `fiche__vig--disque` ; `cat__num` absent de histoire, accueil, à emporter |
| F2-4 | corrige | Phrase creuse retirée ; intro = « À emporter : livraison gratuite dès 2 plats, de 18 h à 22 h. » (`a-emporter.astro`, `site.ts`) | grep `dist/` : 0 « voyagent », phrase présente ; rien ajouté sur la procédure de commande |
| F2-5 | corrige en partie | `MAX` du loader 2,6 s à 2,2 s ; sous 768 px (loader masqué par CSS) le moteur n'attend plus que polices et images critiques, plafond 1,2 s, au lieu du plancher décoratif de 1,1 s (`src/engine/loader.ts`) | Mobile ralenti (CPU x4, 4G lente), 2 passes : `is-loaded` à 2 828 et 2 840 ms, soit DCL + ~50 ms. Le temps est pris avant le moteur : script du moteur (155 Ko) reçu à ~2,4 s, en concurrence avec polices et photo du hero. Gain mobile non démontré (la mesure d’origine était 3 006 ms, passe unique) ; bureau 2 506 / 2 502 ms, sous 2,6 s. Réduire davantage demande de peser le script du moteur, hors périmètre F2 |
| F2-6 | corrige | Photo du pied : salle au mur olive remplacée par la burrata (`Footer.astro`, `burrata-960.webp` généré depuis le JPG source en 960 px, 72 Ko, déclarée dans `site.ts`) | capture réservation 390 px : pied avec burrata sous la photo de salle ; plus aucune page ne répète la salle dans le pied |

DESIGN.md : inchangé (concept, palette et motion intacts).

Hypothèses : une photo de plat convient à un pied de page ambiant ; le texte de l'intro à emporter double les deux lignes de conditions, conformément à la correction demandée par la revue.
