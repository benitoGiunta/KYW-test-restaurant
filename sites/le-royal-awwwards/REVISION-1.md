# Révision 1 · le-royal awwwards (révision ciblée F0 à F2)

| id | décision | changement (fichier) | preuve |
|---|---|---|---|
| F0 | sans objet | aucun finding | build exit 0 |
| F1-1 | corrigé | `src/engine/reveal.ts` : `aria: 'none'` dans `SplitText.create` | axe complet (sans runOnly) sur accueil, carte, a-propos, reservation à 1440 et 390 : 0 violation |
| F2-1 | corrigé | `a-propos.astro` : phrase d'aveu supprimée ; `reservation.astro` : phrase 11 h à 23 h supprimée | grep `dist/` : aucune occurrence |
| F2-2 | corrigé | `index.astro` : « un verre, un repas » ; « la terrasse et la brasserie » | grep `dist/` |
| F2-3 | corrigé | `a-propos.astro` : carte TripAdvisor retirée, note Google seule (hypothèse : rattachement TripAdvisor non prouvé) ; `site.ts` conserve la donnée | grep `dist/` : 0 « TripAdvisor » |
| F2-4 | corrigé | `components/Footer.astro` : `<footer class="pied">` devient `<section class="pied" aria-label="Contact et horaires">` ; composant KYW intact | 1 seul `<footer>` par page ; axe : plus de landmark-no-duplicate-contentinfo |
| F2-5 | vérifié, sans changement | photo héros déjà `fetchpriority="high"`, `loading="eager"`, `srcset` 480/800/960 w avec `sizes` 100vw en mobile (480 w servie à 390 px) | lecture de `dist/index.html` ; pas de mesure CPU x4 (non refaite) |
| F2-6 | corrigé | `reservation.astro` : 7 lignes remplacées par « Tous les jours · 12 h à 14 h 30 et 18 h à 22 h » | build |
| F2-7 | refusé | `idleMotion` false assumé, la revue le note « pour mémoire » | ETAT.md |

Non traité (F3, hors périmètre) : « 0 » de Melodrama, saturation façade, CTA « Voir toute la carte ».
