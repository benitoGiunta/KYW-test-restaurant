# Revue portfolio · Le 54 · passe 2
Verdict : PUBLIABLE
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une table gastronomique en bleu nuit et or, qui s'ouvre comme un rideau sur une salle noir et blanc, avec un filet doré qui se tend au défilement et le menu raconté en grands chiffres.

Méthode : `dist/le-54/portfolio/index.html` (04:15) est postérieur à tout fichier de `src/` et `public/` (`find -newer` vide) et QA-revue2.md (04:24) est postérieur au dist : captures du QA réutilisées. Mesures personnelles (port propre 4763, PID arrêté par `kill`) : axe-core de node_modules à 2 positions de défilement, console, requêtes, débordement, cibles < 24 px, balises, 7 pages x 1440/768/390/360 px (`.logs/r54p2-mesure.log`) ; script ciblé de textes (horaires, citation, h1, JSON-LD) ; planche mobile + capture /menu/ 1440 ; 134 liens internes confrontés aux fichiers de dist (0 mort).

Scores /10 :
- Design 7 : palette et hiérarchie tenues, mobile pensé (hero plein écran, bouton plein, `LE 54` en Boska) ; les pages intérieures restent « hero + liste » avec 100 à 150 px de vide sous l'intro (F3-6 non traité).
- Usabilité 8 : 0 erreur console, 0 requête en échec, 0 cible < 24 px, un seul `h1` par page, Tab visible, 2 numéros `tel:` + formulaire ; nom du lien-logo désormais lu (« LE 54 » en visually-hidden sous 768 px).
- Créativité 6 : rideau, filet qui se tend, « 54 » rempli ; chiffres géants moins forcés (le 4 de /menu/ n'est plus dans le `h1`).
- Contenu 7 : horaires désormais prudents (lundi « à confirmer », pas de « Monday » dans le JSON-LD), citation en ellipse, descriptions corrigées ; encore des répétitions et 3 photos réutilisées.
- Technique 8 : build OK (QA exit 0), 7 pages, scrollWidth = fenêtre à 1440, 768, 390 et 360 px, axe 0 violation hors reveals, un seul `<footer>`, LCP mobile 1,2 à 1,4 s et CLS 0 (QA).

## Vérification des corrections annoncées (REVISION-1.md)
| id | annoncé | constaté |
|---|---|---|
| F1-1 | nom du lien-logo visually-hidden | axe `link-name` : 0 sur 7 pages x 390/360 px ; capture mobile : cercle « 54 » seul à l'écran, nom lu ; OK |
| F1-2 | lundi « à confirmer », JSON-LD sans lundi | home : « Lundi / à confirmer » sous les horaires, « Mardi et mercredi / fermé » ; JSON-LD : jeudi, vendredi, samedi, dimanche seulement, 0 « Monday » ; /reservation/ : 2 mentions « Lundi » ; OK |
| F2-1 | « du Le 54 » | grep dist `du Le 54|au Le 54` : 0 ; descriptions « de la maison Le 54 », « chez Le 54 » ; OK |
| F2-2 | un seul contentinfo | `footer` = 1 par page, `landmark-no-duplicate-contentinfo` : 0 ; mention + 1 logo + noindex présents sur 7 pages x 4 largeurs ; OK |
| F2-3 | chiffre hors du h1 | h1 : « Le menu », « La maison », « Formules », « Réserver » ; chapitre lu « 3 ou 4 services » ; OK |
| F2-5 | citation avec ellipse | home : « …pas une seule fois nous avons été déçu… » (source : « déçu,... ») ; OK |
| F2-4, F2-6 | refusés | confirmés non traités (voir F2-1 et F2-2 ci-dessous) |
| F3-1, F3-2 | heures « 18 h 30 à 21 h », PMR | 0 occurrence `hh:mm` visible hors JSON-LD ; `<dt>Accès PMR</dt>` dans /salle/ ; OK |

## Findings (triés par gravité)
Totaux : F0 0 · F1 0 · F2 2 · F3 4.

### F2 (mineurs, non bloquants, repris du refus de la révision)
- **F2-1 Répétitions (ex F2-4)** : QA audit : 3 WARN de phrases répétées (home : horaires du soir et du midi dits dans la clôture puis dans le pied ; /reservation/ : « 12 h à 14 h, 18 h 30 à 21 h » 3 fois). Les horaires du pied de page sont admis ; la clôture de la home peut renvoyer au pied. Correction : une seule occurrence hors pied de page.
- **F2-2 Photos réutilisées (ex F2-6)** : `geste-dressage` 3 fois sur /histoire/, 2 fois sur la home, 1 sur /salle/ ; `salle-nb` et `hero-salle` 2 fois chacune sur la home. `plat-*` jamais hors /menu/. Correction : remplacer 2 des 3 occurrences sur /histoire/ par d'autres photos de `photos/index.json`.

### F3 (finitions)
- F3-1 Les plages horaires elles-mêmes (12 h à 14 h, 18 h 30 à 21 h ; source Trouve Ton Resto « à confirmer » dans `donnees.json`) ne portent pas la marque dans le pied et la clôture de la home ; seul le lundi la porte (la page /reservation/ la porte).
- F3-2 /menu/ : le repère de chaque ligne est un point médian « · » décoratif (`menu__numero`, `aria-hidden`), perçu comme une tache isolée devant les plats ; le retirer ou le remplacer par un filet.
- F3-3 /menu/ : photos tartare, velouté et dessert (alt corrects) sans légende ni lien avec les plats listés (veau, wagyu, cochon de lait) ; ajouter « illustration ».
- F3-4 404 : h1 « Rideau » peu explicite (le `<title>` dit « Page introuvable ») ; /menu/ et /carte/ : 100 à 150 px de vide sous l'intro.

### Faux positifs à ne pas corriger
- axe `color-contrast` serious (4 noeuds `.formule__prix`, `h2`, `.petite-cap` de /carte/) : mesuré pendant le reveal (opacité en cours, 1,5 à 2,4 : 1) ; après 2,5 s de repos à 4 positions de défilement, 0 violation à 1440 et 390 px.
- `RF geste-dressage.webp` à 390 et 360 px sur /histoire/ : requête annulée par le défilement rapide de mon script ; sans défilement, aucun échec.
- « Débordement desktop `img` » du QA et `IMG` hors fenêtre à 768 et moins sur la home : galerie à défilement horizontal voulue (`scrollWidth` = fenêtre). `audit.mjs` « 404 sans h1 », « pas de robots.txt / sitemap » : faux (présents dans dist).

## Critères de PUBLIABLE
Build OK ; 0 erreur console ; 0 lien mort (134 liens internes) ; 0 fait faux ; 0 invention non marquée ; 0 débordement ; 0 violation axe critique ou sérieuse en état posé ; mention « Maquette KYW, certaines données sont illustratives », 1 logo KYW (`.kyw-footer__logo`) et `noindex, nofollow` sur les 7 pages.

## Ce qui est bien (à ne pas casser)
1. Le lundi traité honnêtement (« à confirmer ») et le JSON-LD aligné sur les jours sûrs.
2. L'accueil mobile : hero plein écran, bouton « Réserver une table » pleine largeur, pied de page lisible avec bandeau KYW clair.
3. La page /carte/ : grands prix (48, 65, 30 €), « À CONFIRMER » visible sur le 4 services (62 € G&M), un seul `h1` clair par page.
