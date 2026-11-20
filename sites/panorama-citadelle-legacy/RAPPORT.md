# Le Panorama, Citadelle de Namur · variante legacy · 2026-11-20 (QA phase 3, test)

## QA (sur la base de QA-build.md, captures de l'agent captures)
Corrigé et vérifié par capture ciblée de l'accueil (axe : 0 violation, console : 0 erreur) :
- label-content-name-mismatch sur `.brand` : `aria-label` retiré (le nom accessible = texte visible).
- color-contrast `.sched .today` (4,27:1) : couleur passée à `--color-ink`.
- Erreur console 404 (favicon) : favicon SVG en data-URI ajouté.
- Audit WARN : `twitter:card` ajouté.
Non corrigé, justifié :
- Contraste 404 (`.kyw-footer__note`, 4,36:1) : composant `packages/kyw-footer`, hors périmètre ; la 404 capturée est la réponse brute du serveur.
- Cibles < 24 px : liens en ligne (e-mails, téléphone, « Le Panorama »), exception WCAG 2.2 des liens en ligne.
- Polices .ttf (WARN) : fournies par le pied de page KYW ; Google Fonts pour le site. Sitemap/robots : faux positifs connus sous `base`.
- « 8 h 00 à 23 h 00 » répété 7x : horaires affichés par ligne, voulu (tableau).
Build final : 5 pages, noindex et pied KYW présents sur toutes, `pnpm index` fait.
Non fait (budget test, pas d'outil Agent) : sweep sloplint complet, finish review, entrée de journal `.hallmark/log.json`, checklist 72 cases.

## Placeholders
- Horaires « à confirmer ».
- Comp HTML non construite (waived budget).
- Photos 18/19 (chef, cuisinier) non utilisées ; photo manquante la plus utile : la salle vue depuis la terrasse au coucher du soleil.
- Données illustratives signalées par la mention « Maquette KYW ».
