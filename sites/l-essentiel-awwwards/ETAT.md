# ETAT : l-essentiel-awwwards, construction-2 (phase 2)

## Fait (phase 1)
- Scaffold, contenu, pages (accueil, carte, histoire, réservation, 404), favicon, og.png, mesures hero.

## Fait (phase 2)
- `src/motion/retrait.ts` (pilote) : signature épinglée « le retrait » (mots biffés un à un au scrub, « Il reste » en dernier), repos `startIdle` (mots retirés qui s'écoulent sous les CTA du hero), transition « trait d'or + noir qui se retire », intro photo du hero, dérive des pleins cadres.
- `src/motion/volet.ts` + Header : menu plein écran sous 48 rem (`<dialog>`, focus piégé, Échap, retour du focus, Lenis arrêté).
- `src/motion/statut.ts` : statut du jour (Europe/Brussels, `fermeturesPlages` ajoutées dans site.ts).
- Reveals déclaratifs (marges, titres de section, photos, diptyque, menus, chapeaux, mot du pied).
- Hovers : utilitaires avec décalage du soulignement, pied KYW souligné au survol.
- Correctif a11y : `aria-label` sur `<p>` de la phrase du retrait remplacé par un `sr-only`.
- Correctif : `.hero__texte` en `minmax(0, 1fr)` (la bande `max-content` élargissait la colonne : 1668 px).
- Vérifié (Playwright, serveur local) : 0 erreur console ni requête échouée, `scrollWidth` = fenêtre à 320/360/390 sur les 5 pages, signature progresse (0 → 1 par mot, « Il reste » à 1), navigation accueil ↔ carte avec rideau masqué après, réduit sans texte caché.
- Build OK (`scripts/q.sh build pnpm build:site sites/l-essentiel-awwwards`).

## Reste (phase 3)
- Shoot complet (agent captures), `idleMotion`, `reduced.*`, `hover.*`, axe, LCP.
- Tester `texteStatut` à plusieurs instants (`page.clock.install` + `timezoneId: 'Europe/Brussels'`) : mercredi 13 h, samedi 22 h, mardi, 25 décembre 2026, 19 décembre 2027.
- Hero mobile : « Réserver » de l'en-tête + CTA du hero se doublent (en-tête sticky, pas barre fixe : gardé, à juger).
- Toujours en suspens depuis la phase 1 : RAPPORT.md, sloplint, OG revue, « XVIIe » en exposant, vides entre sections, `dist/` + `pnpm index` à commiter après QA.

## Décisions
- Pas de loader, pas de GL, pas de curseur suiveur (concept typographique, sobriété écrite dans DESIGN.md).
- Concept, placeholders et données : voir phase 1 (inchangé).
