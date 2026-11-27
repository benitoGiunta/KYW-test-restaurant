# Révision 1 · ne5t-awwwards (revue REVUE-1, passe 1)
Périmètre : F1 et F2 de la revue (F0 : aucun). F3 non traités (hors consigne). Rebuild OK via `scripts/q.sh revision-build pnpm build:site`.

| id | décision | changement | preuve |
|---|---|---|---|
| F1-1 | corrige | `src/pages/reservation.astro` : description sans « ou par courriel » | grep du `<meta name="description">` dans `dist/` : « par téléphone au 081 58 88 88. » |
| F1-2 | corrige | `src/styles/site.css` : `.papier .btn--plein` fond #7a4a12, texte nappe (+ hover/focus) ; 5,73:1 calculé | couleurs calculées sur `/carte/` : rgb(122,74,18) / rgb(233,225,208) ; axe : 0 violation, plus de bouton plein sur nappe à 3,25:1 |
| F2-1 | corrige | `src/components/Footer.astro` : `<footer>` du site devenu `<section aria-label>`, `KywFooter` sorti de la section (un seul `<footer>`, `kyw-signature` intact) | 1 `<footer>` par page ; axe 4 pages x 1440/390 : 0 violation (landmarks et `region` inclus) |
| F2-2 | corrige | `src/pages/carte.astro` : la première image n'a plus `data-reveal="clip"` (l'animation retardait le LCP) ; elle reste eager/high | LCP /carte/ mobile CPU x4 + 4G : 1144 et 1188 ms (avant 2676-2680) ; accueil 1168-1192 ms |
| F2-3 | corrige | `src/data/site.ts` : « Christine et Pierre Brahy » (nom de famille déduit retiré) | grep `Gersdorff et Pierre` : 0 dans `dist/` |
| F2-4 | corrige | `src/data/site.ts` : « Fermé le lundi et le mardi (à confirmer). » (la formule de remplissage disparaît ; l'incertitude devient visible) | grep `Sept jours` : 0 dans `dist/` |
| F2-5 | corrige | `src/styles/site.css` : bloc `@media (min-width: 901px) and (max-height: 960px)` : titre borné à 21vh, texte sur 5 colonnes, image 44vh, boutons côte à côte | hero mesuré : 639 px pour 720, 679/768, 767/900 ; boutons à y=520, 543, 579 (dans la fenêtre) |

Décisions de design : aucune. Direction artistique inchangée ; sur fenêtre basse le hero est plus compact.
Hypothèses : « Christine et Pierre Brahy » conserve le marquage `placeholder` ; le pavé « Christine » seul aurait aussi convenu.
Non vérifié : F3 (inchangés) ; pas de QA complète (consigne). Serveur de mesure arrêté.
