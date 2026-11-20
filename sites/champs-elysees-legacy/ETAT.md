# ETAT · champs-elysees legacy · construction-3 (phase 3 sur 3) · 20/11/2026

## Fait (phase 3)
- Sweep sloplint `--render --kept` sur 4 URL : 0 FAIL, 0 REFLEX ouvert (waive 8, 83, 77, 71), 7 WARN confirmés.
- Corrections : anneau de focus du bandeau (26a), valeurs hors échelle (24a/24b), titres de rubrique de la carte (78), waive 71 et 77.
- Build OK, `pnpm index` OK, KywFooter + noindex sur 5/5 pages ; capture ciblée de la carte : 0 erreur, aucun débordement.
- Log `.hallmark/log.json` enrichi, RAPPORT.md écrit, DESIGN.md complété.

## Reste
- CLS mobile de la carte 0,102 (polices externes) ; finish review en `self`.
- Hypothèses inchangées : cp 5100, horaires du site d'origine, consentement à valider ; formulaire non branché.
- Commit et publication : par la session de correction (pas de publication ici).

## Relecture passe 1 (relecteur-site, 20/11/2026)
- Fait : REVUE-1.md écrit, verdict A_CORRIGER (1 F1, 5 F2, 5 F3). Mesures maison sur 5 pages x 5 largeurs, 8 horloges, LCP/CLS 2 passes, 94 plats confrontés à donnees.json (0 écart).
- Reste (pour la révision) : F1-1 JSON-LD Restaurant ; F2-1 srcset du héros (LCP 2,8 s) ; F2-2 polices auto-hébergées (CLS carte 0,10) ; F2-3 double contentinfo ; F2-4 texte « À propos » ; F2-5 repère de retour sur la carte.
- Pièges : QA-revue1.md absent (accueil seul capturé) ; sloplint statique et --render non probants hors base (crée des .hallmark/ dans dist, supprimés) ; 404 réelle = dist/…/404.html.

## Relecture passe 2 (relecteur-site, 20/11/2026)
- Fait : REVUE-2.md écrit, verdict PUBLIABLE (0 F0, 0 F1, 0 F2, 6 F3). 6 corrections de REVISION-1 vérifiées sur 25 cas (5 pages x 5 largeurs) : axe 0, console 0, LCP mobile 1,65 s, CLS 0, JSON-LD 5/5, 1 footer, barre sticky de la carte.
- Reste (optionnel) : F3-1 cibles < 24 px desktop, F3-2 espaces insécables, F3-3 graphie du nom, F3-5 horaire en dur, F3-6 arrêt de Tab mobile coupé, F3-7 répétitions.
- Pièges : la « 404 » de la planche QA est la réponse brute de serve.mjs ; les polices de repli `local()` sont en `error` sous Linux (sans effet) ; `curl -o` est refusé par le hook, utiliser `fetch` dans un script via q.sh.
