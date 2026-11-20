# ETAT : be-belge / awwwards / construction-1 (phase 1 sur 3)

## Fait
- Concept « les trois points », DESIGN.md (brief, 3 concepts notés, Concept Card, système, checklist 1 à 18).
- Scaffold Astro, engine (copié de l'engine.md via un site frère, sans GL), tokens, polices (Bricolage, Figtree), `site.ts`, 5 pages (accueil, carte, histoire, réservation, 404), Header, Footer, `og.png`, `favicon.svg`, JSON-LD Restaurant avec horaires.
- `pnpm build:site sites/be-belge-awwwards` passe ; mesure du hero à 1440x900, 1280x720, 1024x768, 390x844 : pas de débordement, CTA dans la première hauteur, `.display` à gauche ≥ 16 px.

## Reste (phases 2 et 3)
- Phase 2 : moteur « trois points » (`src/motion/`, pilote unique + idle), reveals `data-split` / `data-reveal` (aucun posé en phase 1), transitions de page (rideau), hovers, aperçu des plats à la carte, `setupMotion` est un stub.
- QA navigateur (captures 4 formats, axe, clavier, reduced motion), RAPPORT.md, checklist 19 à 63, contrôle du texte du hero à 1024.
- Vérifier visuellement les pages (aucune capture lue en phase 1).

## Décisions et hypothèses
- Pas de loader ni de GL (justifié dans DESIGN.md).
- Prix de plats absents (donnees.json : null) ; seuls menus 57 / 72 €, vins 28 / 35 €, suppléments +7 € et +4 € affichés. Menu daté du 13/08 au 06/09/2026 : affiché avec « à reconfirmer ».
- Aucune donnée fictive ni `placeholder` : chef, équipe, histoire, avis, boissons, parking non affichés. Section « d'ici / d'ailleurs » = lecture éditoriale de descriptions réelles.
- Logos du client non repris (fond transparent, clairs).
- Réservation : lien Zenchef du site client (`bebelgeetdailleurs.be/reservation/`), `tel:`, `mailto:`, formulaire mailto.
- Piège : `font.mjs google` refuse `100..900` pour Figtree (plage 300..900) ; utiliser `400..600`.
