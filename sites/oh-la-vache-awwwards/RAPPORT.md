# Oh la Vache ! : variante awwwards
**Concept** : le cadran, une journée de 11 h à 23 h 45 qui avance au scroll. **Stack** : Astro 5 + GSAP + Lenis (sans OGL : pas de WebGL, concept typographique). Base `/oh-la-vache/awwwards/`.
**Lancer** : `scripts/q.sh build pnpm build:site sites/oh-la-vache-awwwards` puis `node .claude/skills/awwwards/scripts/serve.mjs sites/oh-la-vache-awwwards/.qa-root --port 4400`.
## Scores du critique jury
Non réalisés : pas d'outil Agent en session, phase de test sans critique indépendant. Aucun score donné (self-score non produit).
## Mesures (captures de l'agent captures, accueil ; vérification ciblée après corrections)
LCP mobile 1184 ms, CLS 0, pas de loader, settledMs 2551, FPS 60/60, overflow non, console 0, requêtes en échec 0, noHoverChange vide, audit : 0 FAIL, 1 WARN (sitemap, faux positif sous base). Après corrections : axe sérieux sur la galerie corrigé, cibles trop petites vides.
## Corrigé
- Meta descriptions de l'accueil et de la carte ramenées sous 160 caractères.
- Galerie horizontale focusable (tabindex, role group, aria-label) : `scrollable-region-focusable`.
- Liens « Ouvrir le plan » : hauteur minimale 24 px.
## Points non résolus
- [a11y] axe `color-contrast` 1,08:1 sur `.tete__nom`, `.tete__horloge`, `.nl` : faux positif, l'en-tête est en `mix-blend-mode: difference` (texte rendu sombre sur fond clair, lisible sur les captures). Reste à relire à l'œil sur photo claire.
- [a11y] 404, `.kyw-footer__note` 4,36:1 : composant du paquet `kyw-footer`, non modifié.
- [jury] pas de critique indépendant : à lancer.
## Placeholders et hypothèses (à remplacer par le client)
Données douteuses inchangées : adresse (58/581), vendredi, mardi. Réservation par téléphone uniquement. Photos du restaurant.
## Décisions de théâtre
Pas de loader ni de GL (repos : tache qui tourne). Accessoire à retirer non traité faute de passe jury.
## Leçons structurelles
Aucune.
