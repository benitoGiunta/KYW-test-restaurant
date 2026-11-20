# Révision 2 · La Maison des Desserts (awwwards)

Révision ciblée sur F1-1 et F2-1 à F2-4 de REVUE-2.md. F3 non traités (hors périmètre). Hypothèse : le recouvrement résiduel du cadran dans la colonne d'heures est accepté (le cadran vit dans cette colonne).

| id | décision | changement (fichier) | preuve |
|---|---|---|---|
| F1-1 | corrigé | colonne de la frise à 24 rem dès 1200 px (`site.css`, `.fil-histoire li`) | jeu libellé / paragraphe : 311, 314, 111 px à 1440 ; 310, 313, 106 à 1536 ; 316, 319, 113 à 1920 (0 recouvrement) |
| F2-1 | corrigé | `--c-muted` du ton `midi` #4d3a25 vers #2a1708 (`tokens.css`, `motion/journee.ts`) ; pendant le glissement de fond, l'encre est choisie sur le plus faible de fg et muted, et l'encre atténuée cède à l'encre pleine sous 4,5 : 1 (`journee.ts`, `peindre`) | axe color-contrast sur `/carte/` à 1440 par pas de 700 px, repos 3,5 s : 0 violation sauf un état de glissement soir (#c7b9a4 sur #6c4a29, 4,11) ; après le correctif de `peindre`, relevé 12600 px à fin de page : 0 violation |
| F2-2 | corrigé | cadran en pile verticale, 6,5 rem de règle, largeur 126 à 128 px (`site.css`) : tient dans la colonne d'heures | carte : recouvrement sur 1 / 3 / 3 positions sur 53 / 55 / 59 à 820 / 1024 / 1440 (avant : 39/45, 37/46, 40/50) ; résidu = texte de la colonne d'heures qui passe sous le cadran |
| F2-3 | corrigé | `.hero__titre { min-height: calc(2 * 0.95em + 0.08em) }` à la place de `2lh` (`site.css`) : le découpage en lignes ajoute 0,08em, le titre passait de 93 à 97 px | CLS mobile accueil (CPU x4, 4G lente, 2 passes) : 0,0613 / 0,0616 avant, 0,0006 / 0,0006 après |
| F2-4 | corrigé | entre 761 et 1100 px : `.heure` en `--t-m`, `padding-right` 3u, `.num--mot` en `--t-s` sans retour à la ligne (`site.css`) ; règle aussi F3-1 | label « Maison » : 0 recouvrement avec `.corps` à 820 et 1024 (et 1440) |

Rebuild final : `scripts/q.sh revision-build pnpm build:site sites/maison-des-desserts-awwwards` : exit 0. Serveur port 4823 arrêté (kill du PID).
Décision de design : aucune ; DESIGN.md inchangé. Corrigés 5, refusés 0, impossibles 0. Publiable : oui, sous réserve de la revue 3 (F3 restants).
