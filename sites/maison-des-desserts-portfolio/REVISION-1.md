# Révision 1 · La Maison des Desserts · portfolio

Revue traitée : `REVUE-1.md` (A_CORRIGER). Pas de F0 ; F1 : R-01 ; F2 : R-02, R-03, R-04. Les F3 (R-05 à R-10) ne sont pas traités (révision ciblée). Build : `pnpm build:site` OK, 6 pages. Résultat : 4 corrigés, 0 refusé, 0 impossible. Site publiable.

| id | décision | changement (fichier) | preuve |
|---|---|---|---|
| R-01 (F1) | corrige | `src/styles/base.css` : sous 48 rem, `.lignes li` en `flex-wrap`, libellé à 100 %, valeur sous le libellé ; `anywhere` remplacé par `break-word` | Largeur du libellé « Commandes de Noël » : 306 px à 390 (50 px avant), 276 px à 360 ; `scrollWidth` 390 et 360 ; capture `/fetes/` à 390 : libellés et dates entiers |
| R-02 (F2) | corrige | `src/data/site.ts` (`exceptionsFetes`, tiré de `fetes.jours`), `src/motion/setup.ts` (`etatOuvertureTexte` accepte des exceptions datées), `data-exceptions` dans `Footer.astro`, `contact.astro`, `index.astro` | Horloge simulée : 25/12 11 h « Fermé, ouvre demain à 8h » ; 20/12 10 h « Ouvert jusqu’à 17h » ; 31/12 17 h 30 « Fermé, ouvre samedi à 8h » ; 01/01 « Fermé, ouvre demain à 8h » ; 23/12 10 h « jusqu’à 18h » ; 26/12 17 h 59 ouvert, 18 h fermé (inchangés) |
| R-03 (F2) | corrige | `src/engine/reveal.ts` : `aria: 'none'` sur SplitText (plus d'`aria-label` sur les `span`) ; `src/components/Logo.astro` : `aria-label` remplacé par un `span.sr-only` « La Maison des Desserts, accueil » | axe (`aria-prohibited-attr`, `label-content-name-mismatch`) : 0 violation sur accueil, histoire, fêtes, contact, carte, à 1440 et 390 px (404 sans logo, non rejouée) |
| R-04 (F2) | corrige | `src/data/site.ts` : sticker « Depuis 1946 » retiré, baseline « Chocolaterie née en 1946, pâtisserie et salon de thé au cœur de Namur » ; `src/pages/index.astro` : étiquette de la bulle « Repère à confirmer · 1946 » et post-it « Date à confirmer » dans le bloc manifeste | build OK ; `grep` sur `dist/` : plus de « depuis 1946 » en sticker ni en baseline |

Hypothèses : (1) les jours de fêtes ouverts sans horaire connu (21, 27, 28/12 ; le 20/12 hors lundi-dimanche n'a que la fermeture à 17 h) : le 21, 27 et 28 affichent « Ouvert aujourd’hui (jour de fêtes) » sans heure, pour ne pas inventer d'horaires ; le 20/12 suppose une ouverture à 8 h. (2) Les F3 restent ouverts, notamment R-05 (apostrophes droites, formats d'heures), R-07 (11 px), R-08 (sommaire de carte), R-09 (og.jpg), R-10 (fichiers parasites FICHE.md).
Hors périmètre : la phrase du manifeste « depuis 1946 » reste, avec le post-it « Date à confirmer » à côté. DESIGN.md inchangé.
