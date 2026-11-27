# Révision 2 · Novobel portfolio (revue REVUE-2, passe 2)

| id | décision | changement | preuve |
|---|---|---|---|
| F0 | aucun | n/a | build OK |
| F1-1 | impossible (décision humaine, session mère) | rien ; ne pas publier tant que non tranché | n/a |
| N-1 | corrige | `base.css` : `.nav__long` masqué par la technique visually-hidden (plus `display:none`) sous 768 px ; le court reste visible | axe 390 px (maison, accueil) : 0 violation, plus de `link-name` |
| N-2 | corrige | `base.css` : sous 400 px et sous 340 px, marque, gaps et corps de la nav réduits | scrollWidth = largeur à 320, 360, 375, 390 px ; dernier lien à 313/344/359/374 px |
| N-3 | corrige | `Footer.astro` : bloc coordonnées en `<section aria-label="Coordonnées">` | axe : 0 violation `region` (390 px maison/accueil, 1440 px services) |
| N-4 | corrige | `site.ts` `introMaison` (six corps de métier, 4 projets, 28 logements au total = 4+14+6+4) ; `maison.astro` l'utilise à la place de `introduction[0]` | grep dist : « Vous avez besoin » 0 sur maison, 1 sur accueil |
| F3 | non traités (hors liste F0-F2) | | |

Hypothèse : 28 logements = somme des 4 projets du fichier de contenu. DESIGN.md inchangé. Serveur arrêté (port 4893 ; 4871 était occupé par un autre agent).
