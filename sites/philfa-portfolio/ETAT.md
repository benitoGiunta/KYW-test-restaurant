# ETAT, philfa-portfolio (phase 2 sur 3, construction-2)

## Fait en phase 2
- Signature « La table » : 2 rangées de 6 tirages (y 1-3 % et 61-64 %) qui libèrent le titre ; objets déplacés dans la bande centrale ; bug du gabarit corrigé (`.table .table__rail` en desktop et mobile : section 1185 px au lieu de 1552). Badge « attrapez-moi » qui s'efface au premier geste, bouton « Ranger la table » (rebond décalé, remet tirages et objets en place, `Draggable.update`). Drag souris, flèches (Maj = 48 px) et rangement testés sans erreur console.
- Hero : citron déplacé (il chevauchait « Voir la carte »).
- États : `:active` des boutons, survol des lignes de carte (pastille paille) et des formules, champs `:hover` et `:user-invalid`, message `role="status"` après envoi du formulaire (Barestho s'ouvre), date minimale calculée côté client (aucune date en dur).
- Mobile : pastilles de prix longues passent à la ligne dans la pastille (plus de rognage à 320-390) ; nav du bas tient sans défilement (320, 360, 390 : « Terrasse » seul, ` et salle` masqué sous 768 px) ; bouton « Ranger » masqué (rail en mobile).
- Reduced motion : `motion` absent, 0 animation, 0 texte caché, tirages en grille droite, objets saisissables au clavier.
- Clic réel des 4 liens d'en-tête en 1440 : OK (elementFromPoint = `<a>`, URL change) ; bas de page 1440 : bande KYW, mention « Maquette KYW, certaines données sont illustratives » et logo visibles.
- Build OK (`scripts/q.sh philfa-build node scripts/build-site.mjs sites/philfa-portfolio`), 0 erreur console.

## Reste (phase 3 et captures)
- Shoot/audit complets par l'agent captures ; contraste (rose `#a23c5d` sur crème, texte crème sur olive) à lire dans QA.
- RAPPORT.md à écrire en phase 3 ; `gabarits/UTILISATION.md` (protégé) : guinguette : philfa, à faire par la session mère ; `pnpm index` non lancé (mère).
- Hero sans photo (poster d'objets) : conservé, la photo de salle suit immédiatement dans « La maison » ; à juger sur capture desktop.
- Facade 400 px (tirage petit mais acceptable).

## Pièges
- `documentElement.scrollWidth` > largeur sur carte/histoire/terrasse en mobile (394/404 à 390) sans défilement réel (`scrollX` reste 0, body `overflow-x: clip`) ; artefact de mesure, ne pas le corriger sans preuve de défilement.
- Leçon proposée dans `data/usage/test-2/lecons-proposees/philfa.md` (mode figé, agents/ non modifié).

## Hypothèses
- Texte du bouton « Ranger la table » et du message de formulaire : copy d'interface, sans fait inventé.
