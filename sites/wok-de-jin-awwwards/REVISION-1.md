# REVISION-1 — wok-de-jin awwwards

| id | décision | changement (fichier) | preuve |
|---|---|---|---|
| F2-1 | corrigé | `src/components/Header.astro:34` : `Appeler le&nbsp;<span class="nw">` | grep dist : espace insécable avant le numéro (nœud flex plus écrasé) |
| F2-2 | corrigé (libellé) | `src/data/site.ts:41` `t1.contexte` vidé ; `index.astro` « Midi » ; `Semaine.astro`, `carte.astro`, `reservation.astro` n'ajoutent la virgule que si le contexte existe | grep dist : 0 « Midi, en semaine » ; la note « confirmez-le à la réservation » est conservée |

Hypothèse : le tarif midi n'est plus qualifié « en semaine » ; la grille jour/tarif (hypothèse 1 de site.ts) reste signalée par sa note. Question client non levée, à confirmer avant publication.
F3 non traités (hors périmètre). Build : `scripts/q.sh revision-build pnpm build:site` OK. Pas de serveur lancé.
