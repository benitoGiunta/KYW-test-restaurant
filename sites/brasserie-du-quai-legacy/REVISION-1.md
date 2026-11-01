# Révision 1 · La Brasserie du Quai · legacy

Révision ciblée (sobriete.md § 4) : F1 et F2 de `REVUE-1.md` (aucun F0). Les F3 ne sont pas traités dans cette passe.

| Finding | Décision | Changement (fichier) | Preuve de vérification |
|---|---|---|---|
| F1-1 LCP mobile galerie 4 128 ms | corrigé | `src/pages/galerie.astro` : première photo `priorite` (→ `loading="eager"`, `fetchpriority="high"`, `decoding="sync"` via `Photo.astro`) ; `sizes` des photos « larges » corrigé (`66vw` en grand écran : elles couvrent 2 colonnes sur 3) et `320px` sur mobile pour la première (640 w au DPR 2) | Mini-script Playwright 390×844 DPR 2, CPU ×4, 4G lente (150 ms, 1,6 Mbit/s), deux passes : LCP 1 192 ms et 1 204 ms, élément `07-salle-baies-vitrees-640.webp` ; `dist/…/galerie/index.html` : 1 `eager` + `fetchpriority="high"`, 22 `lazy` ; capture `.shots-brasserie-du-quai-legacy-rev/m-galerie-haut.png` |
| F2-1 JSON-LD sans horaires | corrigé | `src/layouts/Base.astro` : 4 `OpeningHoursSpecification` (midi et soir × 2 saisons) tirés de `saisons` (`site.ts`), `validFrom`/`validThrough` calculés au build (saison en cours puis suivante : 2026-11-01→2027-04-30, 2027-05-01→2027-10-31), sans `dayOfWeek` (jours de fermeture inconnus, rien d'inventé) | JSON-LD de `dist/…/index.html` parsé : 4 entrées, 12:00-14:30 / 18:00-21:30 puis 12:00-14:30 / 18:00-22:00 |
| F2-2 Polices Google distantes | corrigé | woff2 latin téléchargés de Google Fonts dans `src/assets/fonts/` (75 Ko au total), importés en `?url` dans `Base.astro`, `@font-face` inline `font-display: swap`, `<link rel="preload">` de Young Serif ; liens et `preconnect` Google retirés ; `DESIGN.md` mis à jour | `grep -r fonts.googleapis\|fonts.gstatic dist/brasserie-du-quai/legacy` : 0 fichier ; mesure galerie : 0 requête tierce, Young Serif et Instrument Sans `loaded` ; 1440 : `document.fonts.check('16px "Young Serif"')` = true |
| F2-3 Phrase répétée 4 fois | corrigé | `src/components/Footer.astro` : la phrase statement devient l'adresse (2 lignes, sans lien), lien « Itinéraire » ajouté sous le courriel, colonnes passées de 3 à 2 (`page.css`) ; `src/pages/index.astro` : phrase « Au bord de la Meuse, au pied du pont du Luxembourg. » du bloc Venir supprimée (le h2 y dit déjà l'adresse) | Texte visible de l'accueil : « pont du Luxembourg » reste dans le hero et le h2 seulement (les 2 autres occurrences sont `meta description` et `og:description`, 4 au total dans le HTML) ; 0 sur galerie et réservation ; captures `m-pied.png`, `d-pied.png` |

## Contrôles
- Build : `node scripts/build-site.mjs sites/brasserie-du-quai-legacy` via `scripts/q.sh`, 7 pages, « Complete ».
- Sloplint (src + `--url`, serveur `serve.mjs --port 4783`) sur accueil, galerie, réservation : la REFLEX 49b introduite par une première version (adresse du pied en lien qui passait sur 2 lignes à 320 px) a été levée en retirant le lien de la phrase. FAIL restants, hors liste de la revue et antérieurs à la révision : FAIL 48 (oklch littéral sur `.hero__photo::after`, déjà présent en statique avant les changements) et FAIL 44d accueil à 1920 (hero 1 113 px pour 1 080, hero non touché ici). REFLEX 44c/59/77/79/83 : jugements de mise en page, non retenus par la revue.

## Hypothèses
- Fichiers de police placés dans `src/assets/fonts/` (et non `public/fonts/` comme suggéré) : Vite les hache et préfixe la `base` (`/brasserie-du-quai/legacy/_astro/…`), ce qui évite tout chemin cassé.
- `sizes="… 320px"` sur mobile pour la seule photo LCP : léger sous-échantillonnage accepté (640 w pour ~358 px CSS au DPR 2) pour suivre la demande de la revue.
- Sous-ensemble latin seul : couvre œ, €, ’ et les accents français.
