# RAPPORT, philfa-portfolio (phase 3, QA)

## Résultat
- Build final OK (`scripts/q.sh philfa-build node scripts/build-site.mjs sites/philfa-portfolio`), 6 pages, 404.html présent.
- Captures (agent captures) : 0 erreur console, 0 requête en échec, 0 violation axe sur accueil et carte, aucun débordement horizontal, CLS <= 0,019, FPS 58-60, focus visible partout.
- Audit : 0 FAIL, 14 WARN (voir ci-dessous).

## Corrigé
- Meta description de l'accueil : 180 à 156 caractères (cible 50-160), « menu du moment » retiré (vérifié dans `dist/`).

## Vérifié par capture ciblée (aucun défaut)
- Bas de page 1440 et 390 : bande KYW, mention « Maquette KYW, certaines données sont illustratives », logo visibles ; horaires et liens lisibles.
- `/404.html` réel en 1440 : h1, titre « Page introuvable | PhilFa », boutons de retour, pied de page.

## Non corrigé (justifié)
- 404 « brute » du crawl (serve.mjs) : contraste `.kyw-footer__note` 4,36:1 = composant protégé `packages/kyw-footer`, et page non représentative (leçon commune).
- WARN phrases répétées (« Horaires du jour… », « 12:00 à 14:30, 18:15 à 21:00 ») : horaires affichés dans le bandeau, la carte et le pied, répétition voulue.
- WARN `robots.txt` / sitemap : faux positif sous `base` ; noindex voulu (prompt § 3.3).
- LCP mobile accueil 3984 ms (img, 4G lente x4 CPU) : non retouché faute de preuve en série ; à mesurer par la revue.
- `scrollWidth` > largeur en mobile sur carte/histoire/terrasse : artefact (`scrollX` = 0, `overflow-x: clip`).

## Placeholders
- 3 cartes « Exemple d'avis » (avis non vérifiés, marqués « exemple »).
- Menu du moment 35 / 41 € et prix : issus du dossier ; mentions « illustratif » là où non prouvé.
- Aucune photo de plat ni d'équipe (hero = poster d'objets illustrés).
- Avis Gault&Millau : paraphrase, non verbatim.

## Points ouverts
- `gabarits/UTILISATION.md` (guinguette : philfa) et `pnpm index` : session mère.
- Façade 400 px (tirage petit).

## Leçons structurelles
- Voir `data/usage/test-2/lecons-proposees/philfa.md`.
