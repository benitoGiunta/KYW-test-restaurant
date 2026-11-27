# Oh la Vache ! · variante legacy · 2026-11-27 (QA, phase 3)

## QA
- Source : QA-build.md (captures et audit de l'agent captures). Accueil : 0 erreur console, 0 requête en échec, axe 0 violation, pas de débordement 375 à 1920, CLS mobile 0,072, LCP mobile 1456 ms.
- Corrigé : (1) hero mobile : la plaque masquait l'enseigne et le haut n'était que du ciel flou ; photo désormais en bloc 4/5 cadré sur l'enseigne (68% 45%), plaque qui la chevauche. Vérifié par capture ciblée à 390 px. (2) og:title, og:description, og:type, twitter:card ajoutés (WARN audit).
- Non corrigé : canonical, og:image, robots.txt, sitemap (domaine inconnu, maquette noindex) ; police TTF servie par Fontshare/Google via `<link>` (hors contrôle) ; la planche « 404 » de QA-build concerne la 404 racine du dépôt, pas celle du site (404.astro du site non capturée, build OK avec noindex et pied KYW).
- Build final : OK (2 pages), noindex et kyw-signature présents, `pnpm index` passé.
- Non fait faute de budget : sweep sloplint --render complet, finish review sous-agent, checklist 72 cases de DESIGN.md.

## Placeholders et faits manquants
| Élément | Où | Valeur | À remplacer par |
|---|---|---|---|
| Horaires vendredi et mardi | Horaires | lun-jeu 11:00-22:30, ven-dim 11:00-23:45 | horaires confirmés |
| mailto | réservation | sprl-lacroix@hotmail.com | email du restaurant |
| Photos | public/photos | qualité smartphone 2020 | shooting pro (façade, plats, salle) |
| Avis, histoire, équipe | absents | non inventés | contenu client |
