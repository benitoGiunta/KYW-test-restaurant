# Révision 1 · Le Ponti 2 · portfolio

Décisions : 8 corrigés (F1-1, F2-1 à F2-7), 0 refusé, 0 impossible. F3 traités au passage : F3-1, F3-3, F3-4 (alt pâtes), F3-6 (role region). Non traités : F3-2, F3-5, og.jpg.

| id | décision | changement (fichier) | preuve |
|---|---|---|---|
| F1-1 | corrige | `public/photos/pates-800.webp` (66 Ko), `srcset`/`sizes`, `fetchpriority="high"` (`pages/index.astro`, `histoire.astro`) | LCP mobile throttlé (CPU x4, 4G lente) 2 048 puis 2 052 ms, élément `pates-800.webp` (avant 3 624 ms) |
| F2-1 | corrige | `components/Footer.astro` : `<footer class="footer">` devenu `<div>` | 1 `footer`/contentinfo sur les 5 pages mesurées (accueil, carte, histoire, terrasse, réservation) |
| F2-2 | corrige | `motion/setup.ts` : « Ouvert jusqu’à HH:MM » | grep `arrivée jusqu` : 0 dans `dist/_astro/*.js` |
| F2-3 | corrige | `pages/terrasse.astro` : phrase « carte même » retirée, 2 tirages de façade légendés « (photo de la façade) » | grep « la carte est la même » : 0 |
| F2-4 | corrige | `styles/base.css` : sous 26 rem, nav plus compacte | à 390, 360, 320 px : scrollWidth = clientWidth (287), « Contact » dans le cadre, page sans débordement |
| F2-5 | corrige | `data/site.ts` : phrase « Son site le résume… » supprimée ; `histoire.astro` n'affiche que les paragraphes 3 et 4 (nouveau) | grep : 0 ; plus de doublon avec l'accueil |
| F2-6 | corrige | `data/site.ts` : 12 tirages → 8 (retirés `pizza-comptoir`, `pizza-fond`, `escalope-salades`, `facade-bas`), positions redistribuées 4 + 4 ; galeries de `histoire` et `terrasse` adaptées | build OK ; non revérifié visuellement (hypothèse : tirages 16 % de large, pas de 22 %) |
| F2-7 | corrige | eyebrows retirés (accueil x4, réservation, étiquettes des cartes) ; « À ne pas manquer » devient le titre visible ; seul « Erreur 404 » reste | 0 `class="meta` hors 404 |
