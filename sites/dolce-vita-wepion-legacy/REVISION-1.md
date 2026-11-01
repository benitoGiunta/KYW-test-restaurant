# Révision 1 · legacy · La Dolce Vita (Wépion)
Révision ciblée (F1, F2) ; F3 non traités (hors consigne). Aucun F0 dans la revue. Build final via `scripts/q.sh` : OK.

| id | décision | changé (fichier) | preuve |
|---|---|---|---|
| F1-1 JSON-LD | corrigé | `src/layouts/Base.astro` : `Restaurant` (name, PostalAddress, téléphone, e-mail, `openingHoursSpecification` générée depuis `HORAIRES`, sameAs Facebook/Instagram ; ni geo ni aggregateRating) ; prop `ld={false}` sur `404.astro` | `grep -c ld+json dist/` = 1 sur index, carte, infos, la-dolce-vita, 0 sur 404 ; JSON parsé : 10 plages (mardi absent, mer. et sam. soir seul) |
| F2-1 OG + favicon | corrigé | `Base.astro` : og:type/title/description/url/image(+taille)/locale/site_name, twitter:card ; image = `01-facade-soir-poster.webp` (URL absolue) ; `public/favicon.png` (logo crème sur fond `#1c1a15`) | `grep og:title` = 1 sur les 5 pages ; og:image absolu vérifié dans `dist/` |
| F2-2 filler | corrigé | `index.astro` (cartes Pizze, Secondi, bloc « Les mains font le menu »), `la-dolce-vita.astro` (h1, chapeau, texte d'Armando), `site.ts` (tagline Antipasti) : formule « pâte travaillée… savoir-faire » gardée une seule fois (/la-dolce-vita/), reste remplacé par du concret du dossier (Margherita 12 €, Cappello di Toto 19,90 € croûte ricotta/jambon, tagliata, gambas et trois sauces, pâtes al dente) | grep `dist/` : « passion », « tiennent parole », « en partageant » : 0 ; « savoir-faire » 1 ; « rencontre la chaleur » 1 (accueil seulement) |
| F2-3 zones vides | corrigé | `page.css` (fin) : colonne titre de `.table` sticky (desktop), `padding-bottom` réduits sur `.table`, `.avis`, `.quand`, `.phead--compteur`, `.emporter` à la suite | mesure 1440 : écart avis→emporter 288 → 104 px, infos quand→emporter 288 → 104 px, compteur→quand 240 → 80 px ; colonne titre `sticky` |
| F2-4 hero mobile | corrigé | `page.css` : `object-position: 60% 40%` à ≤ 40rem (enseigne + parasol visibles), carte du hero plus compacte | capture 390×844 : enseigne « Restaurant 081 85 54 20 » et terrasse visibles ; plaque à 494 px (334 px de haut) ; scrollWidth = 390 |

Sloplint (accueil, `--url`) : 0 FAIL, 4 WARN, 2 WAIVED (59 déjà waivé), 2 NOTE. Serveur arrêté.

Hypothèse : domaine OG = `https://kyw-test-restaurant.vercel.app` (valeur `site` d'Astro). Non traité : F3-1 à F3-5 (finition), 4 WARN sloplint préexistants (49 sur `.btn`).
Publiable : oui, sous réserve de la revue 2 (carte du hero mobile jugée sur une seule capture).
