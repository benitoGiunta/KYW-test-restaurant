# Révision 1 · Tariki legacy (F2 seulement, F3 non traités)

| id | décision | changé (fichier) | preuve |
|---|---|---|---|
| F2-1 favicon | corrige | `public/favicon.png` (64 px, tiré du logo), `<link rel="icon">` avec `base` dans `layouts/Base.astro` | Playwright 1440 et 390 px : 0 erreur console ; `favicon.png` 200 ; lien icon présent |
| F2-2 méta inventée | corrige | `pages/index.astro` : description (donc og:description) « grillades au charbon et mezzés à partager, cuisine levantine au feu de bois, à Namur » | mesure de `meta[name=description]` ; grep `dist/` « seul fourneau » : 0 |
| F2-3 réservation | corrige | `components/Horaires.astro` (mailto préparé, `data-slots`, bouton « Préparer ma demande », note honnête), `layouts/Base.astro` (validation heure par créneaux du jour ; sans endpoint, ouverture de `mailto:info@…` pré-rempli) | lundi 23:50 et lundi 12:00 : `aria-invalid`, message « ouvert 18:00 à 21:00 » ; samedi 12:30 : accepté, message de messagerie ; aucun faux « envoyé » |
| F2-4 hiérarchie | corrige | `components/Carte.astro` : sur la page carte rubriques en `h2` et plats en `h3` (accueil inchangé : h3/h4) ; `styles/page.css` (`.rub` max-width et interligne, `h3.row__nom` comme h4) | Playwright : h1, h2, h3 sur `/la-carte/` |

Hors périmètre (F3, non traités) : cibles basses, og:image 1200x630, voile du hero, resserrage de la grille de carte, prix du soir. Le F3-2 (remplissage « Réservez dès maintenant », « cuite au feu de bois ») a été corrigé au passage : grep `dist/` 0 occurrence.
Contrôles : build `pnpm build:site` via q.sh OK ; sloplint (genre atmospheric, URL) 0 FAIL, 0 WARN. Pas de capture complète ni d'audit axe relancé (hors périmètre).
Hypothèse : créneaux du formulaire = plages d'ouverture affichées (bornes incluses). DESIGN.md inchangé.
