# QA build : le-felicien / awwwards

Passe : build · rôle : captures · serveur local `dist/` sur 127.0.0.1:4502 (arrêté après la passe).
Build : `scripts/build-site.mjs sites/le-felicien-awwwards` : exit 0, 5 pages construites, sitemap créé.

Note : le crawl a trouvé 4 pages (`/`, `/carte/`, `/reservation/`, 404). La passe de captures a produit 3 dossiers (home, le-felicien-item, 404). `/reservation/` n'a pas de dossier de captures.

## Pages

| Page | URL | Dossier de captures | Planche |
|---|---|---|---|
| home | http://127.0.0.1:4502/le-felicien/awwwards/ | `/home/user/KYW-test-restaurant/.shots-le-felicien-awwwards-build/home/` | `/home/user/KYW-test-restaurant/.shots-le-felicien-awwwards-build/home/planche.png` |
| le-felicien-item (carte) | http://127.0.0.1:4502/le-felicien/awwwards/carte/ | `/home/user/KYW-test-restaurant/.shots-le-felicien-awwwards-build/le-felicien-item/` | `/home/user/KYW-test-restaurant/.shots-le-felicien-awwwards-build/le-felicien-item/planche.png` |
| 404 | http://127.0.0.1:4502/__shoot-missing-page-1794270188067 | `/home/user/KYW-test-restaurant/.shots-le-felicien-awwwards-build/404/` | `/home/user/KYW-test-restaurant/.shots-le-felicien-awwwards-build/404/planche.png` |

## Chiffres (report.json)

| Mesure | home | carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 (8 contraste à vérifier) | 0 (11 contraste à vérifier) | 2 graves : `document-title`, `html-has-lang` |
| LCP desktop (ms) | 100 | 104 | 40 |
| LCP mobile (ms, throttlé) | 1180 | 1160 | 228 |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments débordants (offenders) | 0 | 0 | 0 |
| Cibles tactiles trop petites | 0 | 0 | non mesuré (absent) |
| Texte caché (reduced) | 0 | 0 | 0 |
| Éléments GL cachés | 0 | 0 | 0 |
| Titre de page | « Le Félicien \| Brasserie à Suarlée, Namur » | « La carte d’automne \| Le Félicien » | vide |
| H1 | LE FÉLICIEN | LA CARTE | aucun |
| FPS défilement desktop / mobile | 60 / 60 (pire trame 17 / 33 ms) | 60 / 60 (pire trame 17 / 17 ms) | 60 / 61 |
| Cibles de survol | 7 (1 sans changement) | 7 (1 sans changement, 2 couleur seule) | 0 |
| Clavier : focus invisible | 1 (`input` « INPUT ») | 1 (`input` « INPUT ») | 0 |
| Clavier : piège de focus | non | non | non (focus sorti de la page) |
| Lien d'évitement en premier | non | non | non |

Remarques du rapport : FPS desktop mesuré en headless sur GPU logiciel, à traiter comme un plancher. Mobile en ralentissement CPU x4 et 4G lente.

404 : aucun lien de navigation cliquable (`--nav` : aucun lien trouvé).

## Audit (audit.mjs)

Résultat : **0 FAIL, 11 WARN**.

WARN :
- `/le-felicien/awwwards/` : 4 phrases répétées 2 fois (horaires : « Lundi au jeudi et dimanche 12 h à 14 h 18 h à 21 h30 », « Vendredi et samedi 12 h à 14 h 18 h à 22 h », « Veille de jour férié : le soir jusqu’à 22 h. », « Pendant les ventes Rops : petite restauration de 14 h à 18 h. »)
- `/le-felicien/awwwards/reservation/` : les mêmes 4 phrases répétées 2 fois
- site : 404 sans `<h1>`
- site : pas de `robots.txt`
- site : pas de `sitemap`

Le total de 11 WARN regroupe 8 répétitions (4 par page) et 3 avertissements au niveau du site.
Le sitemap est généré dans `sites/le-felicien-awwwards/dist` (sitemap-index.xml), mais l'audit signale « no sitemap » sur l'URL servie.
