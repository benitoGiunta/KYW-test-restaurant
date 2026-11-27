# ETAT · oh-la-vache · legacy · phase 1 (construction-1)

## Fait
- Audit (AUDIT.md, `.hallmark/before.txt`), deal/draw/scaffold/stamp (Atelier, draw 79bce8), comp c1 retenue (comp.md), DESIGN.md (Picks, approche, thème, composants).
- Contenu : `src/data/site.ts` + `carte.json` (226 lignes de carte, 5 groupes plus menus), 13 photos WebP dans `public/photos/`.
- Pages : `/` (hero Poster, horaires et adresse, présentation et terrasse, carte à onglets, salle en bande, photos accrochées, réservation) et 404, KywFooter sur les deux, noindex, mention maquette.
- Build OK (`dist/oh-la-vache/legacy/`), sloplint src : 0 FAIL réel (FAIL 34 faux positif, base.css porte `overflow-x: clip`).

## Reste (phases 2 et 3)
- Aucune vérification en navigateur de la page rendue (seules les comps ont été vues) : 375, 1280, 1920, débordements, hauteurs de bande.
- Phase 2 : nav mobile (liens masqués sous 60 rem), jour courant des horaires, un reveal, états des contrôles, trois questions de reproduction, sloplint --render et --kept.
- Phase 3 : Sweep, revues, DESIGN.md case 5, RAPPORT.md, fingerprint de l'entrée `.hallmark/log.json`.

## Décisions et hypothèses
- Shape Photographic et hero Poster au lieu de Bento Grid et Index (draw), justifiés dans DESIGN.md.
- Une seule route gardée (one-page) ; #event supprimé (vide), noté `dropped`.
- Horaires : lundi à jeudi 11:00 à 22:30, vendredi à dimanche 11:00 à 23:45 (donnees.json) ; vendredi et mardi à confirmer. Aucun slot `.fill`, aucun placeholder fictif.
- mailto de la société (`sprl-lacroix@hotmail.com`) gardé pour le câblage, à confirmer ; lien Facebook corrigé vers `restoohlavache`.
- Polices Sentient (Fontshare) et Hanken Grotesk (Google) par `<link>` : non vérifiées en rendu (repli serif en comp). Sans clé d'images, aucune photo générée, uniquement celles du client (qualité smartphone 2020).
- Lectures de référence Hallmark réduites par sobriété (SKILL.md, redesign.md, thème Atelier, macrostructure 08 lus ; layout, anatomy, craft, imagery, gates § 1-4, patterns survolés par leurs règles du Floor seulement).
- Avis, histoire, équipe, presse : absents des données, non inventés.
