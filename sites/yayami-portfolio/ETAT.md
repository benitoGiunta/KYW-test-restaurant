# ETAT : yayami-portfolio (phase 2 sur 3, construction-2)

## Fait (phases 1 et 2)
- Phase 1 : gabarit Nocturne adapté (DESIGN.md), 6 pages + 404, données du dossier, palette rouge enseigne, 15 photos WebP.
- Phase 2 (motion, signature, interactions, états, mobile, finitions) :
  - Signature « enseigne » (`enseigne()` dans `src/motion/setup.ts`, `--neon` sur `.hero__titre`) : le titre du hero s'allume en
    crépitant (paliers) après l'ouverture des volets, puis un bref crépitement toutes les 8 à 13 s ; halo rouge par `drop-shadow`.
    Reduced motion : titre allumé et fixe (aucun appel). Mobile : même allumage, plus court.
  - `/carte/` : puces de catégories collées en haut (`.saut`, `carteSaut()`), scrollspy (`aria-current="true"`), rangée qui
    défile pour garder la puce active visible, ancres via Lenis (clic réel testé : section à 56 px du haut).
  - Horaires : ligne du jour marquée (pastille rouge, `aria-current="date"`, heure de Bruxelles) ; format « 12h à 14h, 18h à 22h ».
  - États : survol des lignes de carte (fond rouge léger, nom rouge), `:active` des boutons, pastille « ouvert » qui respire
    (`braise`), `color-scheme: dark`, focus visibles conservés.
  - Mobile : « Commander » en tube débordait à 320 px (359 px) : `min(var(--t-xl), 8.2vw)` sous 420 px ; plus de débordement
    (6 pages à 320, 390, 1440 normal et reduced motion : `scrollWidth` = fenêtre, 0 erreur console).
  - Contrôles faits : statut aux heures (mer 12h30 ouvert, 15h fermé, 19h ouvert, 22h30 demain midi), clics réels sur les
    5 liens d'en-tête de 6 pages en 1440 (aucun échec), en-tête sur une ligne de 768 à 1201 px, bas de page 1440 (mention maquette,
    bandeau KYW visibles, coins retirés). Build OK (`scripts/q.sh yayami-build pnpm build:site sites/yayami-portfolio`).

## Reste (phase 3)
- Shoot complet par l'agent « captures » : lire `QA-<étape>.md`, vérifier la scène collante `/maison/` (page courte), la mosaïque
  (recadrage `--s`), contraste du rouge #ff4438 sur noir, nav 5 liens.
- `pnpm index`, commit final avec `[publier]` seulement quand le restaurant est terminé (phase 3 ou lot).
- Option : photos libres de salle ou façade (placeholder) si la revue juge le site « sans lieu ».
- Mettre à jour `gabarits/UTILISATION.md` (interdit à cet agent) : ligne `nocturne | pepite, yayami`.

## Décisions et hypothèses
- Pas de réservation de table : boutons « Commander » vers yayami.be/shop/. Formule à volonté citée par des tiers : non reprise.
- Bière et ramune décrites par « Bière japonaise » / « Limonade japonaise » (déduction des marques).
- Zone de livraison : sept codes postaux, « autour de Namur » ; 5100 non nommé.
- Aucune dépendance ajoutée ; aucune donnée inventée ; le crépitement de l'enseigne est purement décoratif (pas de texte).

## Pièges
- Le gabarit se contente de `reseaux[0]` pour le coin gauche : remplacé par « Appeler ».
- Ne pas remettre `tabular-nums` sur les prix à virgule.
- Les horaires apparaissent deux fois par page (section et pied de page) : `aujourdhui()` marque les deux.
- Halo et tubes en contour : desktop avec pointeur fin seulement ; mobile et reduced motion = tubes pleins.
