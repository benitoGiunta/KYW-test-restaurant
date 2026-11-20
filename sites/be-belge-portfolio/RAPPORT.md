# RAPPORT : be-belge / portfolio (phase 3, QA)

## QA
- Planche accueil (QA-build) relue : OK. Pages /carte/, /menu/, /maison/, /privatisation/, /reservation/ en 390 (captures ciblées) : 0 erreur console, scrollWidth 390, rendu correct.
- Corrigé : titre de l'accueil raccourci (73 caractères vers 49), meta description 173 vers 147 caractères, phrase de réservation « Appelez le restaurant pendant les heures de service » retirée (procédure non prouvée par le dossier).
- Non corrigé (faux positifs documentés) : 404 de l'audit = 404 brute de serve.mjs ; lien d'évitement ; WARN robots/sitemap sous base ; phrases d'horaires répétées (pied et section, volontaire).
- Contrastes « needs review » de l'accueil (texte ocre sur aubergine) : non mesurés par axe en détail, à surveiller.
- Build final : `pnpm build:site sites/be-belge-portfolio` exit 0, 7 pages.

## Placeholders / hypothèses
- Lien Zenchef déduit du rid 382492 (à vérifier).
- Baseline rédigée d'après le nom et les listings (à confirmer) ; carte « été 2026 » à titre d'exemple ; plats sans prix = null.
- Code mort : style `.form` inutilisé.
- Non faits : `pnpm index`, publication (session mère).
