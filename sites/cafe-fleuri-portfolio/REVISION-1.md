# Révision 1 · Café Fleuri · portfolio (révision ciblée F1 et F2)

| id | décision | changement (fichier) | preuve |
|---|---|---|---|
| F1-1 LCP mobile | corrigé | astre du hero sans `data-reveal`/`data-intro` (visible dès le premier rendu) (`index.astro`) ; `terrasse.webp` réencodée 1000 px, saturation 0,85, 142 à 56 Ko (`public/photos`, `site.ts`) | CDP CPU x4 + 4G lente, 2 passes : accueil 1328 et 1344 ms (avant 5320) ; histoire 1800 et 1812 ms (avant 3448) ; capture 1440 px OK |
| F1-2 horaires brunch | corrigé | `horairesBar` 10:30 à 14:30 (`site.ts`) | grep dist : 09:00 à 14:30 = 0, 10:30 à 14:30 présent |
| F1-3 statut | corrigé partiellement (arbitrage orchestrateur) | note dans `RAPPORT.md` ; le site garde le ton actuel, tout est déjà « à confirmer/illustratif » ; téléphone et horaires marqués à confirmer | décision à prendre : afficher « statut à confirmer » si `restaurants.json` reste « actif » |
| F2-1 prix mixte | corrigé | prix retiré de « Brunch mixte » ; 21,95 € seulement dans « Les formules » ; libellé unique « Prix relevé dans un guide ancien, à confirmer » (`site.ts`) | build OK |
| F2-2 source/plateau | corrigé | « Plats cités par un annuaire en ligne » ; plateau retiré du déjeuner (reste dans la liste annuaire, noté apéritif du soir) ; pancakes retirés du goûter, remplacés par pain perdu | grep « presse locale » = 0 |
| F2-3 emporter | corrigé | lignes « à emporter » et accroche de fermeture remplacées par terrasse et mardi étudiants (dossier) ; accroche 16h = frise, horaire à confirmer | grep « à emporter » = 0 |
| F2-4 procédure | corrigé | « Aucun outil de réservation en ligne n’est connu. Téléphone, à confirmer : » ; bouton accueil « Horaires et contact » | grep « Réserver » = 0 |
| F2-5 téléphone | corrigé | note avec badge « à confirmer » sous le bouton (`reservation.astro`) | build OK |
| F2-6 légendes | corrigé | brunch : « Quelques images libres » ; déjeuner accueil = photo comptoir ; alt terrasse corrigé ; aria-label médaillons | build OK |
| F2-7 axe aria-prohibited-attr | corrigé | SplitText `aria: 'none'` hors titres (`engine/reveal.ts`) ; horloge `<div role="group">` | `p[aria-label]` = 0 sur accueil après hydratation |
| F2-8 `--:--` | corrigé | valeur initiale 09:00 (`index.astro`) | grep dist `--:--` = 0 |

Refusés : 0. Impossibles : 0. Non traités (F3, hors périmètre) : F3-1, F3-3 à F3-8 sauf « sur place » (F3-5), « Oeufs » (F3-2) et la meta 404 non touchée.
Hypothèse : « Œufs Benedict » corrigé au passage. Publiable : oui, sous réserve de l'arbitrage F1-3. Pas de changement de DESIGN.md.
