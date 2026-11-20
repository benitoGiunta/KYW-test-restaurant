# ETAT : Café Fleuri awwwards, après la phase 1 (construction-1)

## Fait
- Concept « Le trop-plein » (trois concepts notés), DESIGN.md complet (Brief, Concept Card, système, checklist 1 à 18).
- Scaffold : engine copié de chez-guillaume-awwwards (identique à engine.md, sans GL), tokens, polices Gambarino + Switzer, Base.astro (head complet, JSON-LD, noindex), Header, Footer (« 38 » + KywFooter), rideau de transition (`motion/setup.ts`).
- Pages : /, /carte/, /histoire/, /reservation/, 404. Contenu dans `src/data/site.ts`. Favicon, OG (public/og.png).
- Build OK (`scripts/q.sh awwwards-build pnpm build:site sites/cafe-fleuri-awwwards`), dist/cafe-fleuri/awwwards/ écrit. Mesures hero à 4 viewports : CTA au-dessus de la flottaison, pas de débordement horizontal, aucun `.display` collé au bord.
- Hovers CSS : CTA, nav, lignes d'index, liens texte.

## Reste (phases 2 et 3)
- Phase 2 : signature « débordement » (mots qui franchissent la rue en spring), marquee de mots au repos, dérive des assiettes, `data-reveal`/`data-split`, hover pointeur sur l'index, menu éventuel.
- Phase 3 : QA navigateur (shoot, audit, axe, clavier, reduced motion), points 42 à 63 de la checklist, jury (self), `pnpm index`, commit final.
- Hero à 1440x900 : la section dépasse 900 px (plaques sous la flottaison), voulu ; à juger en capture.
- Pas de `sitemap`/robots vérifiés ; alt/aria à relire ; contraste du texte `.note` sur fond salle à mesurer par axe.

## Décisions et pièges
- Aucune photo : pas de GL ni de loader, théâtre minimal.
- `.sec::before` dessine la rue par section (fond plein oblige) ; `--rue` 66,667 % (82 % < 760 px).
- Mixte : dégradé dur 50/50 clipé au texte, `justify-self: start` pour que la coupure tombe au milieu du mot.
- Serveur de test : port 4417 (PID dans .logs/awwwards-serve.pid, à tuer avec kill).
