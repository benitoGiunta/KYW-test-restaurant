# CORRECTION-1 — les-potes-au-feu / portfolio (15/11/2026)

| id | catégorie | décision | changement (fichier) | preuve |
|---|---|---|---|---|
| brouillon : « Attribution des plats aux chefs : illustrative », tags D/F, « D : Damien, F : François », légende du stage | brouillon | corrigé (élément retiré) | `index.astro` (tag, note, légende), `carte.astro` + `site.ts` (`legendePlat` sans chef, `voix` retirés) | scan : 0 |
| brouillon : « Plats fétiches (attribution illustrative) », « Les plats de X, attribution illustrative » | brouillon | corrigé (retiré, attribution inventée) | `les-deux-chefs.astro`, `site.ts` (`platsFetiches*`) | scan : 0 |
| brouillon : « Lunch du vendredi, exemple », plats du midi « du moment (illustratif) » (entrées, plats, dessert) | brouillon | corrigé (plats inventés retirés, remplacés par l'intro vraie de la formule et « entrée-plat ou plat-dessert, 40 € » du dossier) | `site.ts` (`carte` midi, `menuDuJour`), `carte.astro` | scan : 0 |
| brouillon : « Salle et bar / Salle (rôle illustratif) », « Personne sur la photo : à confirmer » | brouillon | corrigé (rôles non sourcés remplacés par « Équipe », photo non sûre retirée) | `site.ts` (membres), `histoire.astro` | scan : 0 |
| brouillon : « Google, relevé Rankeat du 22/08/2025, à confirmer » (accueil, histoire) | brouillon | corrigé (valeur sourcée gardée, étiquette retirée) | `site.ts`, `index.astro`, `histoire.astro` | scan : 0 |
| portfolio-01 | fonctionnel / mineur | impossible | 404 de marque à la racine de `dist/` ou règle Vercel : hors du paquet du site | — |
| portfolio-02 | disposition / mineur | corrigé | `histoire.astro` : galerie à nombre pair, colonnes finissant à la même hauteur (non vérifié par capture) | build OK |
| portfolio-03 | langue / mineur | corrigé | `site.ts` (`nbsp` convertit ' en ’ sur tout le contenu), apostrophes des textes de `404`, `histoire`, `carte`, `index` | grep `dist/` : 0 apostrophe droite dans le texte visible |

Build : `node scripts/build-site.mjs sites/les-potes-au-feu-portfolio` OK. Scan final `les-potes-au-feu/portfolio` : 0 libellé.
