# ETAT · tariki-legacy · phase 1 sur 3 (construction-1), 2026-11-19

## Fait
- Audit (`AUDIT.md`, `.hallmark/before.txt`), deal (Darkroom 1/3), draw d3deb4 (hero Counter au lieu d'Index), scaffold, stamp, comps c1/c2 (`comp.md`, c1 retenu), `DESIGN.md` (Picks, Approche, Tokens, Composants, Sur-utilisation 1 à 6), entrée dans `.hallmark/log.json`.
- Contenu : `src/data/site.ts` (données réelles uniquement, rien de fictif ; carte du soir = version de `/la-carte`).
- Pages statiques : `/` (hero Counter, carte Switcher midi/soir, route en 4 étapes, récit + photo, salle pleine largeur, nouveau chapitre, horaires + réservation, pied lettre), `/la-carte/` (carte complète, allergènes), `404`.
- Build : `pnpm build:site sites/tariki-legacy` OK, `dist/tariki/legacy/` (index, la-carte, 404) ; pied KYW, noindex et mention présents sur les 3 pages ; sloplint statique `src` : 0 FAIL, 1 REFLEX (26b, `:disabled`).

## Reste (phases 2 et 3)
- Phase 2 : menu mobile (la nav masque les 3 liens sous 60 rem, seul « Réserver » reste), huit états des contrôles dont `:disabled`, formulaire (endpoint vide : message honnête, validation, états), barre de réservation collante (draw), UN reveal, hero review en auto-notation, reproduction du comp (trois questions), choix du panneau par défaut selon l'heure.
- Phase 3 : sloplint `--render` sur `/`, `/la-carte/`, 404 ; `--kept` (liens `la-carte`, `#reservation`, `mailto:`, Instagram, `tel:`) ; contraste, fold 1280x800, mobile 375 (débordement x, cibles 44 px) ; RAPPORT.md ; `pnpm index`.
- Aucune capture en navigateur du site lui-même n'a été faite (consigne de phase). Le hero (h1 `max-width: 15ch`, plaque 340 px) n'est mesuré qu'en comp.

## Décisions et hypothèses
- Thème Darkroom, ambre remplacé par l'ocre du logo (212 168 100). Le logo (texte noir, PNG transparent) est posé sur une plaque crème `--color-cream`, comme sur le site d'origine ; la nav utilise un nom en texte plus « طريقي » (Amiri, rôle outlier).
- Photos du client : braises en couleur (hero, seule couleur), feu de camp et arcades en noir et blanc (règle du thème). Arcades et feu marqués `data-placeholder="true"` (visuels d'ambiance, arcades probablement générées, ce n'est pas la salle) ; aucune photo de plat, de salle ou d'équipe n'existe.
- Prix du soir : version de `/la-carte` (kefta 19, magret 32, maquereau 26) ; la version d'accueil du client est plus chère et propose « Le début du voyage » à 18 € par personne (non repris) : à confirmer avec le client.
- Allergènes : phrase reformulée à partir de l'affiche (fruits à coque, lait, sésame ; signaler toute allergie), à vérifier.
- Adresse : rue de l'Ouvrage 2 (site du client), jamais rue du Pont 15 (= Bayti).
- Supprimé (`dropped`, listé dans le stamp) : `/cart-page`, `/blank`, `/blank-1` (modèles vides), lien wix.com, « © 2035 by mysite ».
- Formulaire de réservation : markup statique avec `data-endpoint=""` et une note visible (pas de système de réservation relié) ; l'ancien module Wix n'est pas reproductible.
- Textes à vérifier : « Une carte courte, cuite au feu de bois » et « Une carte volontairement courte, du midi au soir » (reformulations du dossier, pas de citation du site).
- Les modifications de `dist/tariki/portfolio/` vues par `git status` ne sont pas de moi.
