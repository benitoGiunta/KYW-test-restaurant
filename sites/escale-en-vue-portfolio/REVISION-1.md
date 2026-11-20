# Révision 1 · Escale en Vue ! (portfolio)

Périmètre : F0 (aucun), F1, F2 ; F3 non traités (hors consigne). Build `pnpm build:site` OK.

| id | décision | changé (fichier) | preuve |
|---|---|---|---|
| F1-1 | corrige | `site.ts` : `notes` vidé ; `index.astro` : cartes de note remplacées par les 4 thèmes sans chiffre (« On y parle de … »), phrase « non vérifiées » retirée ; `base.css` : `.carte-avis__theme` | grep dist : plus de « 93 avis », « 4,9/5 » ; capture 390 px de #avis |
| F1-2 | corrige | `site.ts` : `ouverture` = « Habituellement ouvert… » ; `index.astro` hero : « Saison 2026 terminée (du 19 juin au 6 septembre). Habituellement ouvert… » ; CTA « Réserver une table » → « Contacter la maison » (hero, carte, pied), « Réserver » → « Contact » (en-tête), « Nous contacter » (manifeste) ; `Marquee.astro` : sans JS « Saison terminée » | grep dist : texte hero et marquee ; plus de « Réserver une table » |
| F2-1 | corrige | `Header.astro` : « Réserver » retiré de la nav (doublon du bouton) ; `base.css` : padding et corps réduits sous 360 px | navSW = navCW à 320 (271) et 390 (323), scrollWidth = largeur |
| F2-2 | corrige | phrases de suivi supprimées dans `index.astro`, `carte.astro` (+ meta description), `histoire.astro`, `terrasse.astro` ; `site.ts` : « la liste exacte… », « , à confirmer » | grep dist « à confirmer / nous les ajouterons » : 0 |
| F2-3 | corrige | `site.ts` : « au menu en 2026 » | source |
| F2-4 | corrige | `tokens.css` : `--c-corail-ink` #c9432d → #b83a26 | axe color-contrast : 0 violation à 320 et 390 |
| F2-5 | corrige | `Marquee.astro` en `<aside aria-label>` ; `Footer.astro` groupe en `<section aria-label>` (2 nœuds de la revue) | axe region : 0 violation (accueil 320/390, carte 390) |

Hypothèse : le lien « Contact » mène à la page `/reservation/` (inchangée, titre « Réserver » conservé : le plat du jour se réserve par téléphone). `DESIGN.md` inchangé en direction ; le token corail-ink est plus foncé.
Corrigés 7 · refusés 0 · impossibles 0. Publiable : oui.
