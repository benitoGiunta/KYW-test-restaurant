# REVISION-1 — carre-d-herbes · awwwards (révision ciblée, F1 et F2)

Revue traitée : REVUE-1.md (F0 : 0, F1 : 2, F2 : 5). F3 non traités (hors périmètre). Rebuild final fait via scripts/q.sh.

| Point | Correction | Vérification |
|---|---|---|
| F1-1 404 titre tronqué | `.e404__titre` : `min(var(--t-mega), 15.5cqi)` ; colonne en `container-type: inline-size` | Range par ligne : texte finit à 1085 / 1221 / 1303 / 1544 px, boîte à 1250 / 1407 / 1502 / 1760 (1280, 1440, 1536, 1920) : tient partout |
| F1-2 « Quand » rogné | `.prat__grid > .titre` : `clamp(2.5rem, 4.8vw, var(--t-xl))` | Texte 259 px dans 319 px à 1440 ; capture : « Quand » entier |
| F2-1 CLS carte mobile 0,055 | Cause mesurée : le h1 change de nombre de lignes à l'échange de police (décalage 0,045 sur `idx--grand` et le chapeau). `font-display: optional` sur Archivo et Newsreader (déjà préchargées) | CPU x4 + 4G, 2 passes : carte 0,0098 (avant 0,0545), accueil 0,003 |
| F2-2 hero « s » dans le disque | `.hero__nom` : `calc(var(--t-mega) * .9)` | Fin du mot / début du disque : 705/759 (1280), 782/854 (1440), 828/910 (1536), 984/1117 (1920) |
| F2-3 en-tête superposé | classe `top--fond` (fond 95 % + flou 10 px) dès `scrollY > 8`, script inline dans `Header.astro` | Classe `top top--fond` constatée après défilement (Histoire mobile) ; capture bureau : barre pleine |
| F2-4 note Gault&Millau | Ligne supprimée (`site.ts` `histoire.presse` et `<p>` de histoire.astro) | Aucune occurrence dans `dist` |
| F2-5 typographie | U+2019 entre lettres, U+00A0 avant « : ? ! » et entre nombre et « h » / « € » dans pages, pied de page et `site.ts` | Texte visible des 5 pages du `dist` : 0 apostrophe droite, 0 espace sécable avant ponctuation haute ou unité |

Hypothèses : `font-display: optional` signifie qu'en toute première visite très lente la police de secours reste jusqu'au rechargement ; acceptable pour un site préchargé. Le rendu de « d’herbes » du hero est réduit de 10 % (plus petit au bureau, inchangé en mobile en proportion).
Non refait : QA complète, captures planches, publication.
