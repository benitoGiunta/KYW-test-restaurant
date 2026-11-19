# ETAT : yayami-portfolio (phase 1 sur 3, construction-1)

## Fait
- Gabarit nocturne copié et adapté (choix argumenté dans DESIGN.md) ; `site.ts` + `carte.json` + `photos.json` depuis
  `data/restaurants/yayami/` (47 plats, 9 menus et box, prix en virgule, « pièces », « bœuf »).
- Pages : `/`, `/carte/`, `/boissons/`, `/maison/`, `/livraison/`, `/commander/`, `404`. Mise en page statique du gabarit,
  en-tête (logo), boutons de coin (Appeler, Commander), pied de page (KywFooter, noindex, mention maquette).
- Palette passée de l'ambre au rouge enseigne (tokens, halo `lampe.ts`), favicon, OG, 15 photos WebP.
- Build OK : `scripts/q.sh build-yayami pnpm build:site sites/yayami-portfolio` (7 pages, dist/yayami/portfolio/ 2,3 Mo).
  Contrôles grep : aucun tiret cadratin, aucun reste du gabarit, noindex présent.

## Reste (phases 2 et 3)
- QA navigateur : shoot 1440 et 390, clics réels sur l'en-tête, bas de page, débordements, contraste du rouge sur noir,
  nav à 5 liens entre 960 et 1200 px, logo de l'en-tête sur mobile.
- Animations : vérifier volets, tubes, halo, scène collante `/maison/` (4 phrases) avec ce contenu ; `/maison/` utilise
  la scène sur une page courte (cf. leçon collage : ScrollTrigger).
- Mosaïque : 12 photos de 1080 à 1800 px, contrôler le recadrage `--s` (colonnes étroites) ; `pnpm index` et commit à faire
  après la QA. `[publier]` seulement au commit final.
- Option : photos libres de salle ou façade (placeholder) si la revue juge le site trop « sans lieu ».

## Décisions et hypothèses
- Nocturne retenu malgré son usage par pepite : seul gabarit sombre libre ; `gabarits/UTILISATION.md` NON mis à jour
  (gabarits/ interdit à cet agent) : ajouter la ligne `nocturne | pepite, yayami`.
- Pas de réservation de table (site client : commande en ligne seulement) : boutons « Commander » vers yayami.be/shop/.
- Sources tierces évoquant une formule à volonté en salle : non reprise (non confirmée).
- Bière et ramune décrites par « Bière japonaise » / « Limonade japonaise » (déduction des marques, pas de description client).
- Zone de livraison : sept codes postaux listés, formulée « autour de Namur » ; le code 5100 n'est pas nommé (Jambes non prouvé).
- Aucune dépendance ajoutée ; `valeurs`, `histoire`, `equipe`, `avis` retirés du modèle.

## Pièges
- Le gabarit se contente de `reseaux[0]` pour le coin gauche : remplacé par « Appeler » (pas de réseau connu).
- Ne pas remettre `tabular-nums` sur les prix à virgule (retiré de `.index__prix`, `.ckt__prix`).
