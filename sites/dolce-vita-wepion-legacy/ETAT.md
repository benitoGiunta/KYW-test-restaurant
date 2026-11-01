# ETAT · dolce-vita-wepion · legacy · fin de la phase 3 (construction-3)

## Fait
- QA : nom accessible du logo de nav corrigé (0 violation axe sur 5 routes), Instagram du pied en nowrap, waivers 59 et 77 consignés.
- sloplint --render --kept : 0 FAIL, 0 REFLEX, 8 WAIVED. Log `.hallmark/log.json` à jour. DESIGN.md (ligne Sweep), RAPPORT.md écrits.
- Build passe, noindex + pied KYW + mention sur les 5 routes. `pnpm index` lancé. Serveurs arrêtés.

## Reste
- Rien de bloquant. Voir RAPPORT.md § 5 et 6 (placeholders, matériel).

## Pièges
- `@import` de `page.css` en tête : tout ajout va après.
- Faux positifs : 404 brute de serve.mjs, `skipLinkFirst`, WARN 49 sur `.btn`.
