# Révision 1 · Partage · awwwards (01/11/2026)

Révision ciblée (règle de sobriété n° 4) : F1 et F2 de `REVUE-1.md` (aucun F0). Les F3 ne sont pas traités : ils restent pour la revue suivante.
Build : `scripts/q.sh revision-build node scripts/build-site.mjs sites/partage-awwwards` passe (5 pages). Vérification par grep dans `dist/partage/awwwards/`, mesure Playwright (`launch()` de `.claude/skills/jury/scripts/browser.mjs`, serveur `serve.mjs dist --port 4617`, arrêté par `kill <PID>`) et captures ciblées dans `.shots-partage-awwwards-rev/` (`planche.png`).

| Finding | Décision | Ce qui a été changé (fichier) | Preuve de vérification |
|---|---|---|---|
| F1-1 téléphone illisible (Réserver) | corrige | `src/styles/site.css` `.resa__tel` : police de texte (`--f-body`, General Sans 600), `letter-spacing: 0.02em`, `white-space: nowrap`, taille `clamp(1.05rem, 0.85rem + 0.4vw, 1.3rem)` ; cible 44 px conservée | Mesure : « 081 81 00 98 » sur 1 ligne à 1280 (105 px dans 203), 1440 (109 dans 229) et 390 px (94 px), aucun débordement de la colonne chêne ; captures `reservation-d-1440.png`, `reservation-m-390.png` : espaces lisibles |
| F2-1 horaires présentés comme certains | corrige | `src/components/Footer.astro` : « Fermé le dimanche et le lundi. Heures à confirmer par téléphone. » dans le bloc Service (toutes les pages). Les jours de l'accueil (lunch mercredi à samedi, fermé dimanche et lundi) sont officiels (`donnees.json`, note des horaires) : non modifiés | `grep -c "Heures à confirmer"` = 1 sur les 5 pages de `dist/` |
| F2-2 affirmations hors dossier (carte) | corrige | `src/pages/carte.astro` : « Carte du 28 septembre 2026. » et « Menu du {date}. » (propositions retirées) | `grep "change avec les saisons\|change chaque semaine"` dans `dist/` : 0 fichier |
| F2-3 titre de presse reconstitué | corrige | `src/data/site.ts` : Le Vif Weekend, titre « Le resto de la semaine : Partage à Namur » (titre du dossier), date « Date non relevée » (l'ancienne étiquette doublait le titre) | `grep "sharing food"` dans `dist/` : 0 ; titre présent dans `histoire/index.html` |
| F2-4 cibles tactiles de 23 px | corrige | `src/styles/site.css` : sous 700 px, `.lien` reçoit `padding-block: 0.75rem calc(0.75rem + 0.18em)` et le trait est remonté de 0.75rem (`background-position`) : il reste collé au texte. Padding plutôt qu'un `::after` élargi pour que la boîte mesurée par `shoot.mjs` (`getBoundingClientRect`) soit aussi conforme | Mesure à 390 px : « Lire la carte et les prix » 156×47, « Ouvrir le plan » 94×47, `elementFromPoint` à ±21 px du centre touche le lien ; captures `accueil-lien-m-390.png`, `pied-m-390.png` : trait sous le texte, inchangé |

Hypothèses : (1) la variante n'exige pas de marquer visiblement chaque heure ; une mention dans le bloc Service suffit. (2) Les F3 (bœuf, titre La Libre, pastilles, priceRange) sont laissés à la revue suivante.
`DESIGN.md` non modifié : la police d'affichage reste réservée aux titres. La règle « numéros en police de texte » est déjà dans `agents/lecons.md` (relecteur, passe 1).
Bilan : 5 corrigés, 0 refusé, 0 impossible. Site publiable.
