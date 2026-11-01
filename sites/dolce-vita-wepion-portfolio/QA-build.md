# QA build : dolce-vita-wepion-portfolio

Passe : build · Rôle : captures · Serveur : `dist/` servi sur `http://127.0.0.1:4501/dolce-vita-wepion/portfolio/` (arrêté ensuite)

Build : `scripts/build-site.mjs` exit 0, 7 pages construites, sortie `dist/dolce-vita-wepion/portfolio/`.

Captures : `.shots-dolce-vita-wepion-portfolio-build/` (résumé : `summary.json`). Journaux : `.logs/dolce-vita-wepion-portfolio-build-*.log`.

## Pages

| Page | Dossier de captures | Planche | URL testée |
|---|---|---|---|
| Accueil | `.shots-dolce-vita-wepion-portfolio-build/home/` | `.shots-dolce-vita-wepion-portfolio-build/home/planche.png` | `/dolce-vita-wepion/portfolio/` |
| La carte | `.shots-dolce-vita-wepion-portfolio-build/dolce-vita-wepion-item/` | `.shots-dolce-vita-wepion-portfolio-build/dolce-vita-wepion-item/planche.png` | `/dolce-vita-wepion/portfolio/carte/` |
| 404 (page absente) | `.shots-dolce-vita-wepion-portfolio-build/404/` | `.shots-dolce-vita-wepion-portfolio-build/404/planche.png` | `/__shoot-missing-page-*` |

## Chiffres par page

Source : `report.json` de chaque dossier (champs `errors`, `failed`, `a11y`, `desktop`, `mobile`, `keyboard`, `hover`, `reduced`).

| Mesure | Accueil | La carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Axe, violations serious | 0 | 0 | 2 (`document-title`, `html-has-lang`) |
| CLS desktop / mobile | 0.001 / 0.001 | 0.001 / 0.001 | 0 / 0 |
| LCP desktop (élément) | 176 ms (img) | 184 ms (p.lead) | 40 ms (pre) |
| LCP mobile throttlé (élément) | 1332 ms (img) | 1024 ms (p.lead) | 244 ms (pre) |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Cibles tactiles petites | 0 | 0 | 0 |
| Texte caché (réduction de mouvement) | 0 | 0 | 0 |
| Focus clavier invisible / sans focus visible | 0 / 0 | 0 / 0 | aucun arrêt réel (focus sorti de la page) |
| Lien d'évitement en premier | non | non | non |
| Survol sans changement | 0 | 1 (« La carte ») | n/a |
| Survol couleur seule | 1 (« Toutes les pizze ») | 1 (« Réserver une table ») | n/a |
| Mouvement au repos | oui (à 35 %) | non | n/a |
| FPS défilement desktop / mobile | 59 / 60 | 58 / 60 | 58 / 60 |
| Titre de page | « La Dolce Vita | Restaurant italien et pizzeria à Wépion (Namur) » | « La carte | La Dolce Vita » | vide |
| `<h1>` | « LA DOLCE VITA » | « À TABLE » | aucun |

## Audit (`audit.mjs`)

Résultat : **0 FAIL, 9 WARN**. 6 pages explorées.

WARN :
- 6 WARN « sentence repeated » : la phrase « 12:00 à 14:00, 18:00 à 22:00 » est répétée (4 fois sur accueil, carte, pizze, histoire, à emporter ; 8 fois sur réservation).
- « 404 page has no `<h1>` ».
- « no robots.txt ».
- « no sitemap » (le build a pourtant produit un `sitemap-index.xml` dans `sites/dolce-vita-wepion-portfolio/dist`, à vérifier avec le chemin servi).

Poids : page la plus lourde `/dolce-vita-wepion/portfolio/`, ~1586 KB ; 1464 KB d'images, 49 KB de polices, 61 JS (gz), 7 CSS (gz), 6 HTML.

## Notes

- Les dossiers de captures et les planches n'ont pas été relus visuellement (consigne : pas d'analyse de design).
- Aucun fichier source modifié, aucun commit.
