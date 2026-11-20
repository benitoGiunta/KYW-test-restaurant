# Révision portfolio · Don Dino · passe 1 (ciblée F0/F1/F2)

Hypothèse : F0 = aucun ; F3 hors périmètre. Build : `pnpm build:site` OK (6 pages).

| id | décision | changé (fichier) | preuve |
|---|---|---|---|
| F1-1 titre faux | corrige | `src/layouts/Base.astro` : « Brasserie-pizzeria à Naninne » | `<title>` de `dist/don-dino/portfolio/index.html` = « Don Dino \| Brasserie-pizzeria à Naninne (Namur) » |
| F1-2 marquee | corrige | `src/components/Marquee.astro` : « Midi et soir, 7 jours sur 7 » (7 jours ouverts, dérivé des horaires), libellé sans JS « Ouvert 7 jours sur 7 » | grep dans `dist/.../terrasse/index.html` : 1 occurrence |
| F2-1 coquilles | corrige | `src/data/carte.json` : Végétarienne, gorgonzola, espace après 4 virgules ; « carbonnara » conservé (consigne du dossier) | grep dist carte et accueil : 0 ancienne forme |
| F2-2 contraste `.lead` | corrige | `src/styles/base.css` : `.section--corail .lead { color: #120e0c }` | axe color-contrast à 390 px, accueil et terrasse : 0 violation. Le 4,36 : 1 du pied de page 404 n'est pas reproduit (non traité) |
| F2-3 perf mobile | corrige en partie | `src/pages/index.astro` : `fetchpriority="high"` sur l'image eager ; `src/engine/loader.ts` : MIN 1,1 à 0,6 s, MAX 2,6 à 2,0 s, sortie 1,35 à 0,75 s | mesure 4x CPU + 4G lente : is-loaded 5493 à 5266 ms, LCP 2832 à 2892 ms (inchangé). Cause : DCL à 3,5 s (JS d'accueil reçu à 3,2 s), pas le loader ; non réglable sans alléger le JS de l'accueil |
| F2-4 couverture QA | refuse | sans objet pour le site | note sur le QA, pas de défaut du site |

Publiable : oui (F1 levés, reste F2-3 mobile throttlé et F3).
