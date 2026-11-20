# Be Belge… et d’ailleurs · variante legacy · 2026-11-20

## QA (phase 3)
- Build : 7 pages, noindex, mention « Maquette KYW » et pied KYW présents ; `pnpm index` passé.
- Corrigé : requête 404 sur l’accueil (favicon absent) : favicon SVG inline ajouté dans `Base.astro` ; ajout og:title, og:description, og:type, twitter:card (WARN de l’audit). Vérifié par contrôle ciblé de l’accueil : 0 réponse >= 400.
- Waivers sloplint mal formés (2 champs, rejetés) refaits en 3 champs : 8, 44c, 59, 79.
- sloplint src + render (accueil, menu, carte) : 0 FAIL, 0 REFLEX ouvert, 9 WAIVED, 3 WARN (F15 deux largeurs de conteneur 1440/1100 ; `kept` non comparé aux pages de site-actuel non rendues), 9 NOTE.
- Le « 404 » de QA-build.md est la page 404 générique du serveur de capture, pas celle du site : la violation de contraste axe ne concerne pas ce site.
- Non fait faute de budget : finish review par sous-agent (pas d’outil Agent), log `theme.mjs`, cases DESIGN.md au complet (23 cochées sur 72), police TTF servie par Fontshare (hors site), pas de robots.txt (noindex en meta).

## Placeholders et faits manquants
- Aucune donnée inventée ajoutée ; données du site d’origine reprises. Le lead de /reservation/ (14 mots) et les mentions « illustratives » restent à valider avec le restaurateur.
- Photos : 9 photos du client en 800/1600 ; demande : une photo de plat (carte et menu n’en ont aucune).
