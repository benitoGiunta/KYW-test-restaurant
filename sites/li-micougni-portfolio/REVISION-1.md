# Révision 1 · Li Micougni · portfolio
Traitement ciblé des 5 F2 de REVUE-1.md (aucun F0/F1). F3 non traités. Build final : `scripts/q.sh revision-build pnpm build:site sites/li-micougni-portfolio` OK (6 pages).

| id | décision | changé (fichier) | preuve |
|---|---|---|---|
| F2-1 | corrige | `src/pages/index.astro` : ligne d'adresse sans le nom ; tirage « Le grill, dans la cour » (photo `grill-charbon`, alt = `sujet`) sous les boutons. `src/styles/base.css` : `.hero__photo` + resserrement du padding du hero en desktop | `dist` : `hero__adresse">Rue des Brasseurs 110, 5000 Namur`. Mesure 1440x900 : boutons à 675 px, photo de 699 à 930 px (200 px visibles) ; 390x844 : photo de 541 à 772 px, entièrement dans l'écran ; capture lue |
| F2-2 | corrige (partiel) | `src/engine/loader.ts` MIN 1,1 → 0,7 s, MAX 2,6 → 1,0 s ; `src/motion/setup.ts` sortie 0,65 → 0,5 s (plafond total ~1,5 s) | Mobile bridé (CPU x4, 4G lente), 2 passes : `is-loaded` 5053 / 5027 ms contre 5755 avant ; DCL 3474 / 3447 ms, JS le plus lent à 3236 ms. Le loader pèse donc ~1,6 s après DCL ; le reste est réseau + exécution JS, non traité ici |
| F2-3 | corrige | `src/components/Marquee.astro` : « Réservation : +32 470 59 75 96 » (`site.telephone`) | `grep "par e-mail" dist/.../index.html` = 0 ; texte du bandeau lu sur capture 1440 |
| F2-4 | corrige | `index.astro` : 4 eyebrows `.meta` retirés (La maison, Le menu, quatre cartes, Horaires) et étiquettes des 4 cartes « Braise » retirées ; `reservation.astro` : eyebrow retiré ; `histoire.astro` : section « Ce qui fait la maison » supprimée (4 cartes qui répétaient le chapeau, l'histoire et l'accueil) | `grep -c 'class="meta"'` = 0 sur index et histoire ; `carte-avis__etiq` = 0 |
| F2-5 | corrige | `Footer.astro` : `<footer>` → `<section aria-label="Coordonnées">` ; `Marquee.astro` : `<div>` → `<aside aria-label="Informations pratiques">` | axe-core (toutes règles) sur l'accueil à 1440 et 390 px : 0 violation (moderate incluses) ; 1 seul `<footer>` (celui du paquet KYW) ; scrollWidth = innerWidth aux deux largeurs |

Hypothèses : photo de hero = grill (sujet du dossier, qualité 5) pour ne pas doubler la salle déjà montrée juste dessous ; sections supprimées plutôt que réécrites, aucun contenu nouveau inventé. DESIGN.md inchangé (concept, palette, motion conservés).
Hors périmètre : F3-1 à F3-6.
