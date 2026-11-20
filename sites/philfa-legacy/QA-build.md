# QA build — philfa / legacy (passe build, phase test)

Build : `dist/philfa/legacy/` (scripts/build-site.mjs, exit 0). Serveur local 127.0.0.1:4503, arrêté après les captures.

## Captures et planches

Pages capturées par shoot.mjs (--crawl --nav) : 2 (accueil, 404). L'option --nav n'a trouvé aucun lien cliquable.

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/philfa/legacy/` | `/home/user/KYW-test-restaurant/.shots-philfa-legacy-build/home/` (36 fichiers, rapport `report.json`) | `/home/user/KYW-test-restaurant/.shots-philfa-legacy-build/home/planche.png` (1920 x 4224, 14 images) |
| 404 `__shoot-missing-page` | `/home/user/KYW-test-restaurant/.shots-philfa-legacy-build/404/` (29 fichiers, `report.json`) | `/home/user/KYW-test-restaurant/.shots-philfa-legacy-build/404/planche.png` (1920 x 5280, 19 images) |

Note : planche.py affiche « ignoré 4 » et « ignoré 480 » : les valeurs des options --colonnes et --largeur sont aussi lues comme fichiers. Les options sont bien appliquées (4 colonnes de 480 px, soit 1920 px de large).

Résumé : `/home/user/KYW-test-restaurant/.shots-philfa-legacy-build/summary.json`

## Chiffres (report.json)

| Mesure | Accueil | 404 |
|---|---|---|
| Erreurs console | 1 (« Failed to load resource: 404 », desktop) | 0 |
| Requêtes en échec | 0 | 0 |
| Violations axe | 0 (serious 0) | 1 serious : color-contrast, 2 nœuds (`.kyw-footer__note` et un `span`, #6b787d sur #fbfaf8, 4,36:1, seuil 4,5:1) |
| LCP desktop | 416 ms (élément img) | 44 ms (élément p) |
| LCP mobile | 1664 ms (élément img) | 212 ms (élément p) |
| CLS desktop / mobile | 0,002 / 0,001 | 0 / 0 |
| Débordement horizontal (desktop / mobile) | non / non | non / non |
| Cibles tactiles < 24 px (desktop) | 8 : téléphone 89x22, « Menu du moment en PDF » 159x19, « À offrir en ligne » 109x22, téléphone 102x22, « Réserver en ligne » 127x22, Facebook 71x22, Instagram 74x22, philfa.be 64x22 | 1 : « la page d'accueil » 128x20 |
| Cibles tactiles < 24 px (mobile) | 0 | 1 : « la page d'accueil » 128x20 |
| Éléments fautifs (offenders) desktop / mobile | 0 / 0 | 0 / 0 |
| FPS scroll desktop / mobile | 60 / 61 (pire trame 17 ms) | 60 / 61 (pire trame 17 ms) |
| Chargement desktop / mobile | 706 ms / 1643 ms | 14 ms / 398 ms |
| Texte masqué en mouvement réduit | 0 ; mouvement : non | 0 ; mouvement : non |
| Clavier : premier lien « Aller au contenu » | non (le premier arrêt est « Aller au contenu », mais skipLinkFirst = false) | non |
| Clavier : focus visible / invisible / bloqué | 0 / 0 / non | 0 / 0 / non (le focus quitte la page après « Réalisé par ») |
| Survol : cibles testées / sans réaction / sans changement | 7 / 2 / 3 | 2 / 2 / 2 |

Clavier, accueil : 12 arrêts (dont « Aller au contenu », téléphone, PhilFa, Carte, La salle, La maison, Infos, Réserver, Réserver une table, Voir la carte, téléphone, Voir sur le plan).

## Audit SEO et métadonnées (audit.mjs)

Résultat : 0 FAIL, 11 WARN.

WARN :
1. Accueil : og:image absent.
2. Accueil : twitter:card absent.
3. Accueil : pas de lien favicon.
4. Accueil : phrase répétée 5 fois « 12:00 à 14:30 18:15 à 21:00 ».
5. Site : pas de robots.txt.
6. Site : pas de sitemap.
7-10. Accueil : 4 fichiers de police au format ttf (xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk79FO_F.ttf, xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk7PFO_F.ttf, xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk4aE-_F.ttf, 6xKhdSpbNNCT-vWI.ttf).
11. Accueil : polices 376 Ko (moins de graisses, police variable, sous-ensemble à envisager).

Poids de la page d'accueil : ~1008 Ko (HTML 6, JS 1 gz, CSS 4 gz, polices 376, images 621).

## Remarques de méthode

- Les FPS desktop sont mesurés en headless sur GPU logiciel : plancher, non mesure matérielle.
- Mobile : ralentissement CPU x4 et 4G lente.
