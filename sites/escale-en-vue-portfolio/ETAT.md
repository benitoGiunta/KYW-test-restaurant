# ETAT — escale-en-vue · portfolio · construction phase 1/3

## Fait
- Gabarit guinguette copié, contenu remplacé (`src/data/site.ts`), 6 pages : accueil, carte, histoire (La maison), terrasse, reservation, 404.
- Photos : 8 WebP (plein cadre + carrés `s/`), logo, OG, favicon. DESIGN.md écrit. Build OK (`scripts/q.sh … build-site.mjs`), dist/escale-en-vue/portfolio/.
- Contrôles par grep : aucune trace du contenu de la référence, pas de tiret cadratin, noindex et mention Maquette présents, pas de `photos/s/s`, tous les WebP référencés existent.

## Reste (phases 2 et 3)
- Aucune QA navigateur faite : shoot, audit, clic des liens d'en-tête en 1440, bas de page (leçon « fixed + footer »), mobile 320/360/390.
- Motion : réglages non vérifiés (8 tirages au lieu de 12 : scène 100svh, recouvrements éventuels, objets de la table déplacés) ; objet transat à juger visuellement.
- `.carte-avis` : carte de note (`carte-avis__note`) à juger ; `.valeurs` ajouté en fin de base.css.
- Tester le marquee (mode saison terminée) et le loader (parasol).
- OG sans texte ; maison faible-res (13) et photos 08, 09, 11 non utilisées (q ≤ 2, 09 possiblement générée).

## Décisions et hypothèses
- Adresse affichée « Dave (Namur) », 5100 ; e-mail `info@escale-en-vue.be` (site actuel) et non olivier@… ; GPS = centre de la carte du site (à confirmer).
- Samedi 11:30 à 21:30 sans coupure. Saison 2026 présentée comme terminée (20/11/2026) ; pas de date 2027 inventée.
- Plats du plat du jour (parmigiana, tagliatelles, poulet) = posts Facebook 2026, sans prix ; carte d'exemple marquée `*` / `placeholder: true` (12 plats fictifs).
- Placeholders : carte d'exemple (tous les plats et prix), parking gratuit (« à confirmer »), géolocalisation. Notes tierces : relevé non vérifié, source affichée.
- `gabarits/` non touché : `gabarits/UTILISATION.md` doit recevoir « guinguette | escale-en-vue » (à faire par l'orchestrateur). `pnpm-lock.yaml` modifié par `pnpm install` (nouveau paquet du workspace), non commité ici.
