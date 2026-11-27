# Révision 1 · ne5t portfolio
Corrigés : F1-1, F2-1, F2-2, F2-3, F2-4, F2-5. Non traités (F3, hors périmètre F0-F2).
- F1-1 : `.header__nom` en sr-only à 390 px (au lieu de display:none). axe link-name : 0 (1440 et 390, 4 pages).
- F2-1 : bande galerie `tabindex=0 role=region aria-label`. scrollable-region-focusable : 0.
- F2-2 : chiffre filigrane rendu par `::before{content:attr(data-v)}` (hors contraste). color-contrast : 0.
- F2-3 : pied du site en `<div class="footer">`, un seul `<footer>` (kyw-footer). landmark-no-duplicate-contentinfo : 0.
- F2-4 : photos de /histoire/ déplacées sous le texte, légendes neutres « Le service » / « La cave ».
- F2-5 : qualificatifs de presse retirés (noms + lien conservés).
Vérification : axe-core sur accueil, privatisation, histoire, menu à 1440 et 390 (pas de QA complète). Reste signalé hors revue : règle best-practice `region` (7 nœuds par page, probablement kyw-footer/hors landmark), non vérifiée avant.
Rebuild : q.sh pnpm build:site OK. Serveur temporaire arrêté.
