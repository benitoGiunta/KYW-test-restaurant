# ETAT — gabarit guinguette

- [x] Scaffold depuis _socle, package.json renommé, pnpm install
- [x] DESIGN.md
- [x] polices (Zodiak, Satoshi)
- [x] tokens.css, base.css
- [x] composants (Objet, Header, Footer, Loader, Marquee, Ornements), Base.astro
- [x] site.ts enrichi (un drapeau par donnée ; date relative neutralisée ; avis d'exemple sans nom ni source ; e-mail inconnu non affiché ; constantes `menuUnique` ; exemple terrasse dans site.ts)
- [x] pages : index, carte, histoire, reservation, terrasse, emporter, 404
- [x] motion/setup.ts
- [x] shoot des 7 pages (`.shots-guinguette/<page>/`, planches `planche-<page>.png`, y compris 404) : 0 erreur, 0 FAIL, 0 débordement
- [x] audit (`.shots-guinguette/audit-guinguette.txt`, 0 FAIL, 15 WARN expliqués dans RAPPORT.md)
- [x] corrections (h2 sr-only Carte/À emporter, gouttière mobile grille-photos) + contrôle mini-script 1440/390 : 0 erreur console, scrollWidth = viewport, 0 élément caché après défilement
- [x] README.md hérité du socle retiré
- [x] apercu.png, FICHE.md, RAPPORT.md (QA + leçons), agents/lecons.md
- [x] rebuild final `node scripts/build-site.mjs gabarits/guinguette` (12:3x, 7 pages)
- [ ] revue `jury` + corrections : agent distinct (non fait ici)
- Aucun serveur laissé actif (PID 2827, 5243, 5535, 5829 tués).
