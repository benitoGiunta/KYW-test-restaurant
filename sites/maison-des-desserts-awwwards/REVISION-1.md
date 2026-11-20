# REVISION-1 (révision ciblée, passe 1)

| Finding | Décision | Changement (fichier) | Vérification |
|---|---|---|---|
| F1-1 | corrigé | `histoire.astro` : étiquette « Aujourd’hui » remplacée par « Maison » | mesure Range vs `.corps`, 6 largeurs : 0 recouvrement (5 px à 820 px dans la mesure finale, sous la colonne, non lisible comme chevauchement de texte : à revoir en revue) |
| F1-2 | corrigé | `histoire.astro` : « Elle est signée Henry de Hucorne. » (mention du logo retirée) | grep dist : « E. de Hucorne » absent |
| F2-1 | corrigé | `site.css` : `.cadran { display: none }` sous 760 px | `display` = none à 390 px sur 4 pages |
| F2-2 | corrigé | `tokens.css` : `--c-muted` du ton `gouter` #3b2412 → #2a1708 | contraste calculé 5,88 : 1 sur #c98a45 (axe non relancé) |
| F2-3 | corrigé | U+00A0 dans « 8 h 30 », « 17 h » etc. (pages, `site.ts`, `carte.ts`) ; `nowrap` sur heures et sommaire ; libellés sans chiffre (`num--mot`) en `--t-m` ; regex `heureNum` de `carte.astro` adaptée aux U+00A0 | 390 à 1920 px : 0 heure coupée, 0 recouvrement du corps ; débordement de la boîte `.heure` seul à 820/1024 px (sans toucher le texte voisin) ; cadran lit toujours 11 h 39 sur la carte |
| F2-4 | corrigé (partiel, non résolu) | `site.css` : `.hero__titre { min-height: 2lh }` | CLS mobile bridé 0,0613 et 0,0616 : inchangé, cause non trouvée |
| F2-5 | corrigé | `reservation.astro` : h1 « Commander et venir. », lede « Téléphone, e-mail, boutique en ligne, adresse et horaires. » | grep dist |
| F2-6 | corrigé | `site.ts` : « Les 20 et 31 décembre, la maison ferme à 17 h. » | grep dist |
| F2-7 | corrigé | `index.astro` : titre « Chocolat, rouge, doré : la vitrine d’entremets. », « les signe d’une étiquette » retiré | grep |

Rebuild via `scripts/q.sh` : exit 0. Hypothèse : « Aujourd’hui » reste dans la frise de `site.ts` (autre élément, non signalé). Reste : F2-4 (CLS), axe à relancer en revue.
