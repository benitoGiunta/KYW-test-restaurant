# Le Lodge Wépion · variante legacy · 20/11/2026

Passe construction-3 (QA). Les phases 1 et 2 sont décrites dans DESIGN.md, AUDIT.md, comp.md et ETAT.md.

## 1. QA navigateur (build servi, captures ciblées desktop 1440 et mobile 375)
| Contrôle | Résultat |
|---|---|
| Build `scripts/q.sh build pnpm build:site` | OK, 3 pages (index, cookies, 404) |
| Pied KYW (`kyw-signature`), noindex, mention maquette | présents sur les 3 routes |
| Tirets cadratins ou demi-cadratins | 0 sur les 3 routes |
| Débordement horizontal | 0 à 1440 et à 375 (scrollWidth = clientWidth) |
| Éléments `data-reveal` restés cachés après défilement | 0 |
| Erreurs JS, réponses HTTP >= 400, requêtes en échec | 0 |
| h1 | 1 |
| Cibles cliquables < 24 px de haut | 0 |
| Images « cassées » | faux positif : 9 images `loading="lazy"` hors écran n'ont pas encore de `naturalWidth` ; les fichiers existent dans `dist/` et s'affichent en capture pleine page |
| Hero 375 (titre sur 3 lignes dans la plaque) | correct, rien ne déborde |
| Rail de galerie (375 et 1440) | correct, la dernière vignette dépasse volontairement pour signaler le défilement |
| Tableau d'adresses et formulaire de réservation | pas de formulaire (lien Barestho et `tel:` d'origine) |

Aucun défaut cassé trouvé : aucune correction de code nécessaire dans cette passe, donc pas de nouvelle capture de vérification.
Non mesuré : `report.json` du `shoot.mjs` (la capture complète de l'agent « captures » se bloque après les captures clavier, comme en passe build ; mon `shoot.mjs --hovers 0` n'a pas écrit de rapport non plus), axe, CLS et LCP. À refaire par une session avec plus de temps ; menu popover non testé sur Safari iOS.

## 2. Observations (non bloquantes)
- Bande vide d'environ 120 px entre le chapeau « Une terrasse sur la Meuse » et « Ce qui vient d'ici » à 1440 (et à 375) : sous le seuil de 160 px, laissée.
- JSON-LD absent : volontaire, maquette en noindex.

## 3. Placeholders et faits manquants
| Élément | Où | Valeur | À remplacer par |
|---|---|---|---|
| Horaires d'Erpent | bloc « À Erpent » (`.fill`) | « horaires à confirmer » | horaires réels du Wine & More |
| Date de réouverture de Wépion | bloc « À Wépion » (`.fill`) | « envisagée fin 2026, voire début 2027 » + « date à confirmer » | date confirmée par le restaurant |
Deux slots `.fill` au plus par page, respecté. Aucune donnée fictive hors ces deux slots ; pas d'avis repris.

## 4. Demande de matériel
Photo qui améliorerait le plus la page : une vue de jour de la terrasse de Wépion en service (le hero actuel est la façade de nuit). Aussi : façade de Wine & More à Erpent.

## 5. Leçon structurelle
Un contrôle « image cassée » par `naturalWidth` sur des images `loading="lazy"` donne des faux positifs si la page n'est pas défilée jusqu'à elles : forcer `loading=eager` ou lire le statut HTTP des fichiers (voir data/usage/test-1/lecons-proposees/le-lodge-wepion.md).
