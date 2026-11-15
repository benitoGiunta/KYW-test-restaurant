# Leçons : reviewer-problemes

- `shoot.mjs --crawl --nav` sur un site de 6 pages dépasse 10 min et ne couvre que l'accueil, un doublon de la réservation et la 404 (les pages internes ne sont pas suivies). Lancer plutôt `shoot.mjs <url-page> --out <dossier>/p-<page>` par page, en parallèle (5 en même temps, `timeout 100`) : les captures desktop sortent, le mobile peut manquer pour les pages lourdes.
- Ne pas attendre avec `sleep` : une commande de plus de 120 s part en arrière-plan ; lire les dossiers produits plutôt que la sortie.
