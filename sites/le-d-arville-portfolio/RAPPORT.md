# RAPPORT — Le D'Arville, portfolio (phase 3, QA)

## Résultat QA
- Build : `pnpm build:site` OK, 8 pages, `dist/le-d-arville/portfolio/` (aucun fichier source modifié en phase 3, donc pas de rebuild nécessaire).
- Accueil et carte (planches de l'agent captures) : 0 erreur console, 0 requête en échec, 0 violation axe, CLS 0, aucun débordement, 0 texte caché, FPS mobile 60, focus clavier visible.
- Audit : 0 FAIL, 5 WARN.
  - 3 phrases répétées (horaires affichés à deux endroits, accueil et réservation) : voulu, retenu.
  - robots/sitemap : faux positif. `robots.txt` (Disallow, noindex) et `sitemap-index.xml` existent sous `dist/le-d-arville/portfolio/` ; l'audit les cherche à la racine du domaine.
- 404 : la violation de contraste (1 serious) venait de la page 404 générique du serveur de capture (URL inexistante), pas du site. Vérifié sur `portfolio/404.html` réel (capture ciblée, `.shots-le-d-arville-portfolio-qa/404/`) : 0 erreur, 0 requête en échec, 0 violation axe. noindex, mention « Maquette KYW… » et un seul `kyw-signature` présents.
- Contrôles de phase 2 conservés (clics réels de l'en-tête, mobile, reduced motion).

## Placeholders
- Heures d'ouverture (12:00-14:30, 19:00-21:30) : jours du site officiel, heures illustratives.
- Texte des onglets Séminaires et Traiteur : illustratif.
- Nom « Chambre rouge ».
- Tout le reste (e-mail, téléphone, adresse, prix, carte) provient du site officiel.

## Points ouverts
- Photos 2018 HDR, pas d'avis cités, pas de logo vectoriel.
- Pas de pastille d'ouverture calculée (heures illustratives).
- Planches `planche.py` : `--colonnes`/`--largeur` lus comme des fichiers (3 lignes « ignoré »), sans effet sur le résultat.
- `gabarits/UTILISATION.md` (`| velours | le-d-arville |`) : à reporter par l'orchestrateur ; `pnpm index` et commit `[publier]` laissés à l'orchestrateur. Ne pas ajouter `dist/le-d-arville/awwwards/`.

## Leçons structurelles
- La sonde 404 de `shoot.mjs` photographie la 404 du serveur, pas `404.html` du site : capturer `…/404.html` directement (proposé dans `data/usage/test-1/lecons-proposees/le-d-arville.md`).
