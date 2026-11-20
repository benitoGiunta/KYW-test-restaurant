# RAPPORT champs-elysees-portfolio (QA, phase 3), 20/11/2026

## Résultat
- Build final OK (`pnpm build:site`, 6 pages) ; dist dans `dist/champs-elysees/portfolio/`.
- Shoot et audit (agent captures, `QA-build.md`) : console 0 erreur, requêtes en échec 0, axe sérieux 0 sur accueil et carte, aucun débordement horizontal, CLS <= 0,01, LCP desktop <= 100 ms, mobile 2488 ms (accueil, image), clavier sans piège ni focus invisible, mouvement réduit sans texte masqué. Audit : 0 FAIL, 7 WARN (phrase des horaires répétée 2x sur 5 pages : bloc d'en-tête/pied attendu ; robots.txt et sitemap : faux positifs sous base, cf. leçons communes).

## Corrigé en QA
1. Mobile, carte et extrait de carte : les lignes à prix long (« 3 pcs 15,00 · 6 pcs 19,00 · 9 pcs 25,00 ») écrasaient le nom du plat à une lettre par ligne. `.plat` passe en `flex-wrap`, `.plat__nom` en `flex: 1 1 9rem`, `.plat__prix` en `flex: 0 1 auto`. Vérifié par capture ciblée 390 px de `#menu` et de `/carte/` : noms lisibles, prix sous le nom, scrollWidth = 390.
2. Mobile, bandeau « Produits frais, tradition et nouveauté » : le parapluie décoratif recouvrait le titre. Objets du manifeste masqués sous 60rem (`.manifeste .obj { display: none }`). Vérifié par capture ciblée : titre intact.

## Non corrigé, justifié
- 404 : axe color-contrast (#6b787d sur #fbfaf8) et cible « la page d'accueil » 128x20 : c'est la réponse brute de `serve.mjs`, pas la page `404.html` du site (leçon commune).
- 24 et 16 « contrast à vérifier » axe (accueil, carte) : textes sur dégradés/photos ; contrastes de la palette calculés en phase 2 (encre sur orange 6,9:1, etc.), pas de texte courant orange sur paille.
- Bas de page : le grand « À table ! » est volontairement rogné par le pied KYW (gabarit).

## Placeholders
Aucun `placeholder: true` : tout contenu est prouvé par `data/restaurants/champs-elysees/` ou retiré. Hypothèses : code postal 5100 Jambes ; Instagram et note Google non affichés ; nombre de places de terrasse non communiqué ; mot de passe wifi du PDF non repris ; carte millésimée PDF 2024 signalée sur /carte/.

## Points ouverts
- Pages histoire, terrasse, réservation non capturées par shoot (seulement dans l'audit) ; contrôlées en phase 2 (1440 et 390).
- `gabarits/UTILISATION.md` : ajouter `guinguette | champs-elysees` (session mère, gabarits/ interdit ici).

## Leçons structurelles
- Gabarit Guinguette : `.plat` en flex sans wrap écrase le nom quand le prix est une liste de tailles ; corriger dans le gabarit (voir lecons-proposees).
