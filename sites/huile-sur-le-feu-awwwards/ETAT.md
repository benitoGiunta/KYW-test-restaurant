# ETAT : huile-sur-le-feu, variante awwwards, phases 1 et 2 (construction-1, construction-2)

## Fait
- DESIGN.md : brief, trois concepts notés (A le filet, B la presse, C le lustre), Concept Card (concept A « à chaque plat son huile », verbe « verser »), palette, typo, grille, plan de composition, checklist 1 à 18.
- Scaffold Astro (engine copié de sanga, tokens, engine.css, site.css), polices Bodoni Moda et Hanken Grotesk dans `public/fonts/`, favicon SVG, favicon-32, apple-touch.
- Contenu : `src/data/site.ts` (coordonnées, horaires, huiles, menus, histoire), `src/data/carte.ts` généré depuis donnees.json (aucun placeholder, aucun plat inventé).
- Pages : `/`, `/carte/`, `/histoire/`, `/reservation/`, 404 ; mise en page statique complète, mobile 390 recomposé.
- Build `pnpm build:site` OK, `dist/huile-sur-le-feu/awwwards/` écrit (5 pages).
- Mesures hero (h1, média, CTA) à 1440, 1280, 1024, 390 : pas de débordement, CTA visible sans défiler.

## Fait en phase 2
- Pilote `src/motion/filet.ts` : filet fixe dans la marge, s'allonge avec la lecture, goutte au bout ; `--c-huile` sur `<html>` suit l'huile du `[data-huile]` qui croise 55 % de l'écran (16 lignes sur la carte, 6 sur l'accueil), plat en vue `.is-versee`, nom de l'huile écrit au bout du filet (bureau). Au pied, le filet s'efface et la goutte tombe au-dessus de « À table. ». 404 : `data-filet-etat="vide"`, pas de goutte.
- Repos `src/motion/idle.ts` : goutte qui gonfle 6 s, lâche une perle, penche vers le pointeur ; zéro en réduit.
- Rideau versé (huile puis bordeaux), menu plein écran sous 820 px (`motion/menu.ts`), reveals (`data-split` sur h1 et h2, `data-reveal="clip"` sur les photos), survols en trois traitements, `::selection` or, `€` des grands prix en Hanken (`montant()` + `.eu`).
- Build OK. Vérif Playwright ciblée (port 4463) : 0 erreur console ou requête, menu OK (aria-expanded, focus, piège, Échap), réduit sans `.motion` ni Lenis et 0 élément masqué, 404 en état vide, pas de débordement à 390.

## Reste (phase 3)
- QA complète (captures, `report.json` : idleMotion, hover, reduced, keyboard, LCP), points 35, 36, 39, 44, 45 de DESIGN.md.
- OG composée (`public/og.png` provisoire : `og.mjs`), apple-touch à reprendre, RAPPORT.md, `pnpm index`, commit de dist.
- Contrastes des `<em>` en `--c-accent-texte` pour `ail` et `truffe` (non utilisés sur papier).
- À regarder à l'œil : le filet sur la section papier (or sur crème, discret), la couleur entre deux plats revient à l'or (pas d'huile = huile de Toscane par défaut).

## Décisions et hypothèses
- Pas de loader, pas de GL (justifié dans DESIGN.md). Pas de menu burger : nav en deuxième ligne sur téléphone.
- 2005 formulé « selon le site » (Yelp 2002, Kompass 2007). Portrait 05 non utilisé. Aucun avis ni note. Parking, terrasse, privatisation absents.
- Formulaire de réservation : `action="mailto:info@lhuilesurlefeu.be"`, bouton « Ouvrir mon e-mail ».
- Alt d'après `sujet` de photos/index.json ; photos d'aspect lisse (génération possible non confirmée).
- Phase 2 : pas de suiveur de curseur ; Appeler de l'en-tête masqué sous 440 px (présent dans le hero et le menu).
