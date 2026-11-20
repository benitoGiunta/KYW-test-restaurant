# ETAT · Épices & Nous · variante legacy · construction-3 (phase 3 sur 3, QA terminée)

## Phase 3
- Corrigé : contraste note du pied de page (404), h3 en h2 (actualites), twitter:card. Build OK. RAPPORT.md écrit.
- Non fait (mode test) : sweep sloplint complet, finish review, entrée `.hallmark/log.json`, checklist 72 cases complète. Pas de commit `[publier]`.


## Fait (phase 2)
- Hero review `self` : fix, 1 finding résolu (photo de table bleutée, réchauffée par `sepia(0.22) saturate(0.9)`). Bug trouvé : le rebord (`.hero__wrap`) était caché derrière la photo (z-index du slot), corrigé (`z-index: var(--z-raised)`) ; rebord sans `100vw` (`--marge`, aligné sur le conteneur).
- sloplint `--render --stage hero` : 0 FAIL, 0 REFLEX, 1 WARN (mesure 30ch de l'énoncé d'une phrase, voulu). Corrections : contraste du texte sourdine sur la barre (`--color-bark-muted` 87 %), scrim en token, overflow-x clip aussi dans `Base.astro`, `tabular-nums` du prix, libellé « Réserver en ligne », waiver 7a retiré (non waivable, sans objet).
- Comp : trois questions de reproduction écrites dans `comp.md` (reproduced, 1280x800).
- Nav : forme `edge-aligned bar, sticky, menu popover` ; cibles 48 px au bureau ; menu popover testé à 375 (ouverture, `aria-expanded`, fermeture au clic).
- Mesures : aucun débordement horizontal à 320/375/768/1024 sur les 6 pages ; CTA du hero visible ; reduced motion et sans script : reveals visibles, animations coupées ; focus visible 2 px.
- Reveal unique, entrée du hero, filet orange du prix, jour courant dans les horaires (déjà posés avant, vérifiés).
- Build OK (`pnpm build:site`), 7 pages avec noindex, KywFooter et mention.
- DESIGN.md : Composants complétés, points de checklist ajoutés. Leçon proposée : `data/usage/test-1/lecons-proposees/epices-et-nous.md`.

## Reste (phase 3 et captures)
- Agent « captures » : shoot complet, QA par planche-contact.
- Sweep sloplint complet (hors hero), RAPPORT.md, `pnpm index`, entrée de `.hallmark/log.json` pour epices-et-nous (non vérifiée en phase 2), commit final `[publier]` seulement si le restaurant est terminé.
- Liens `kyw-footer__link` de 24 px (paquet, non modifiable) : signaler.
- Polices Sentient et Hanken Grotesk par lien externe : repli Georgia hors ligne.

## Pièges
- Aucun formulaire : la réservation est le module Wix externe (lien conservé), pas de faux envoi.
- sloplint ne rend pas l'index Astro sur disque : utiliser `--url` sur le serveur de dev (base `/epices-et-nous/legacy/`).

## Révision 1 (20/11/2026)
F1-1 et F2-1 à F2-5 traités, voir REVISION-1.md. Reste : F3, vérification visuelle des recadrages.
