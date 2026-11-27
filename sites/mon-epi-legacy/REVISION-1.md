# Révision 1 · mon-epi legacy (ciblée F0 à F2)

| id | décision | changé (fichier) | vérification |
|---|---|---|---|
| F0 | aucun | - | - |
| F1-1 label-content-name-mismatch | corrigé | `Header.astro` : `aria-label` supprimé (texte visible suffit) | axe 0 sur 5 pages x 1440/390 |
| F1-2 favicon 404 | corrigé | `public/favicon.svg`, `<link rel="icon">` dans `Base.astro` | 0 erreur console, 5 pages x 2 largeurs |
| F2-1 contentinfo dupliqué | corrigé | `Footer.astro` : `<footer class="letter">` en `<section aria-labelledby>` | axe 0, un seul `<footer>` par page |
| F2-2 CLS mobile 0,112 | corrigé | `Base.astro` : `display=optional` ; repli `@font-face` ajusté dans `tokens.css` | CLS accueil 390 px, CPU x4 : 0 (avant 0,115) ; polices chargées au premier affichage |
| F2-3 JSON-LD / og | corrigé | `Base.astro` : JSON-LD `Bakery` (adresse, tél., vendredi 09:00-18:00 seul), `og:type` | grep : 1 `ld+json` par page |
| F2-4 photos molles | corrigé | variantes 1280 px de 03 et 20, `photos.json`, `Photo.astro` srcset généralisé | fichiers présents au dist |
| F2-5 titre pied | corrigé | `Footer.astro` : « Venir à Loyers. » | grep : 0 ancien titre |

Hors périmètre : F3-4 (frise 1980) corrigé au passage ; F3-1/2/3/5 non traités (`image-redundant-alt` reste, 23 nœuds galerie).
Hypothèse : `display=optional` peut afficher le repli au tout premier chargement à froid ; compromis assumé pour CLS = 0.
Rebuild OK (6 pages) via `scripts/q.sh revision-build pnpm build:site`. Serveur de mesure arrêté.
