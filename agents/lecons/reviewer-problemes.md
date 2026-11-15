# Leçons : reviewer-problemes

- `shoot.mjs --crawl --nav` sur un site de 6 pages dépasse 10 min et ne couvre que l'accueil, un doublon de la réservation et la 404 (les pages internes ne sont pas suivies). Lancer plutôt `shoot.mjs <url-page> --out <dossier>/p-<page>` par page, en parallèle (5 en même temps, `timeout 100`) : les captures desktop sortent, le mobile peut manquer pour les pages lourdes.
- Ne pas attendre avec `sleep` : une commande de plus de 120 s part en arrière-plan ; lire les dossiers produits plutôt que la sortie.
# Leçons reviewer-problemes
Nouvelle leçon : une ligne datée à la fin de ce fichier.
- 2026-11-15 partage portfolio (passe 1) : `shoot.mjs --crawl` ne couvre que 3 pages ; un script maison (launch() de browser.mjs, 1440 et 390 px, défilement par 0,9 écran, innerText, console, 4xx) sur les 7 pages en une commande, puis planches PIL maison (`planche.py` lit mal ses options) : 25 réponses suffisent. Lire `donnees.json` par grep ciblé (le hook refuse le `cat` de 981 lignes).
- 2026-11-15 reviewer-problemes partage legacy (passe 1) : `shoot.mjs --crawl` n'a pris que l'accueil et une page ; un script maison (launch, défilement par 300 px, débordement, erreurs, texte) sur les 5 pages x 2 largeurs + clic sur chaque onglet de la carte (contenu des onglets absent du texte de l'accueil) a suffi ; un rm sur une commande contenant un heredoc peut être refusé : écrire les scripts avec Write.
- Test de lien d'ancre : partir d'une page neuve à scrollY 0 ; après un défilement préalable, les ancres fonctionnent et le bug disparaît.
- 2026-11-15 vérificateur-token : les mesures review-detail ne séparent pas le coût des images ni des captures shoot.mjs (tout passe par Bash/Read) → enregistrer les jetons d'image par outil dans usage-detail.py avant d'estimer ; sans cela, hypothèse de 1 600 jetons par image.
