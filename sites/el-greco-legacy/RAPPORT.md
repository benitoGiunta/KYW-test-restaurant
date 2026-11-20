# RAPPORT · El Greco · variante legacy · phase 3 (QA)

## QA
- Build : `pnpm build:site sites/el-greco-legacy` passe (6 pages). `noindex`, `kyw-signature` et la mention « Maquette KYW » présents sur les 6 HTML de `dist/el-greco/legacy/`.
- Planche d'accueil (desktop et 375) relue : pas de casse visible, pas de débordement (scrollWidth 375 déjà mesuré).
- Axe : 0 violation sur l'accueil et `our-menu`. La seule violation du QA (contraste du pied de page, 4,36:1) vient de la **404 générique du dépôt** servie par le serveur de test (`__shoot-missing-page`), pas de la 404 du site. Vérifié : `/el-greco/legacy/404.html` rendu correctement (capture ciblée), aucune réponse HTTP >= 400 sur l'accueil ni sur la 404 du site. L'erreur console « 404 » de l'accueil n'est pas reproduite (probablement une requête du harnais, non reportée).
- Audit : 0 FAIL, 90 WARN, essentiellement polices ttf (Google Fonts servies hors proxy), pas de robots.txt (voulu : noindex par page).
- Aucune correction de code nécessaire dans cette passe.

## Non fait (budget, mode test)
- Sweep sloplint `--kept`, gates jugées, finish review par sous-agent, log theme.mjs : non relancés dans cette passe QA.

## Placeholders et données à confirmer
- Formulaire de réservation sur `/contact/` : ajout, ne poste nulle part (`data-endpoint=""`), à confirmer avec le client.
- Avis Trustindex reproduits mot pour mot, à vérifier.
- Horaires lundi à mercredi « À confirmer ».
- Phrase « servis avec frites… » à vérifier.
- Photo d'ambiance (stock Pexels, Grèce) : à remplacer par une photo du restaurant (slot hero/histoire, ~1600x1000).
