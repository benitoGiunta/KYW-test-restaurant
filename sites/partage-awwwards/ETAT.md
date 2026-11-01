# ETAT : partage-awwwards, phase 3 sur 3 (QA) terminée (01/11/2026)

## Fait en phase 3
- `QA-build.md` absent : shoots ciblés par page (`.shots/accueil`, `carte`, `histoire`, `reservation`, `404`, `carte-v2`), audit 0 FAIL, 1 WARN justifié (sitemap sous la base).
- Corrigé et vérifié : contraste axe du mot géant du pied et de la 404 (`::before { content: attr(data-mot) }`), prix du lunch rogné à 1440 (taille bornée par la bande), survol des liens `.lien` (trait ocre dessiné) et du téléphone du pied.
- Mesures : LCP mobile 1,1 à 1,2 s partout, CLS ≤ 0,036, FPS 59 à 60, 0 erreur, 0 débordement, mouvement réduit propre.
- `RAPPORT.md` écrit (mesures, corrections, placeholders, points non résolus), leçon ajoutée à `agents/lecons.md`.
- Build final passé, `pnpm index`, `dist/partage/awwwards/` commité.

## Reste
1. Critique jury indépendant (aucun score émis) : revue suivante, `/jury` sur la racine de QA.
2. Cases de DESIGN.md § Sur-utilisation non cochées (4, 9, 12 à 63) : preuves dans `.shots/` et RAPPORT.md.
3. `idleMotion` false sur histoire, réservation, 404 (décision à confirmer).

## Pièges
- `skipLinkFirst` faux négatif de `shoot.mjs` (libellé français) : le lien d'évitement est bien le premier arrêt.
- Racines de QA `.qa-root` et `.qa-root2` non commitées (gitignore `.qa-root/` ne couvre pas `.qa-root2/` : ne pas l'ajouter).
