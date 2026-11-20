# Audit Hallmark · Café Fleuri · 2026-11-20

**Source** : https://www.cafefleuri.be, bloqué (403 Cloudflare, une tentative `capture-site.mjs`, une `curl`). Aucun HTML, CSS ni photo récupérés ; `site-actuel/` ne contient que la page de blocage. Recherche web : site signalé expiré. Genre inféré : playful (café-brunch, limonades, ton léger).

**Lecture en quatre lignes** : (1) pour manger un brunch à Namur, action unique : appeler (ni réservation en ligne ni outil connus) ; (2) ce qui reste : nom, adresse, trois brunchs, mardi étudiants, plats gravlax ; (3) généré, par gate : sans objet, rien à juger ; (4) cassé : tout le site d'origine est inaccessible.

**Structure d'origine** : inconnue (pages, nav, hero, animations, mobile 375, copie). Hypothèse retenue : site vitrine court de café (accueil, carte, infos pratiques). Les routes de la variante (accueil, carte, venir) sont donc inventées, sans route d'origine à garder ni à supprimer.

**Findings par tier** : non applicable, sloplint `--before` impossible faute de HTML. Aucune dérogation « wiring conservé » : pas de lien externe d'origine.

**Axes d'amélioration** : coût faible, remplacer les photos à fournir et confirmer horaires, prix, téléphone ; seul le client règle le statut réel (fermeture probable, local repris par Bistro Camélia, dossier.md).
