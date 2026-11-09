# Revue awwwards · La Ferme Blanche d'Asie · passe 2
Verdict : PUBLIABLE
Lecture en une ligne de l'idée du site : le plateau tournant de la table ronde comme motif unique (sceau, couronne de texte, anneaux de compteurs, transition en disque rouge, 404 « Plateau vide ») sur brun, or et crème, pour dire « on pose les plats au centre, chacun se sert » (inchangée depuis la passe 1, non cassée par la révision).

Scores /10 (preuves)
- Design 8 : `home/planche.png` et `r2-trio.png` (390 px) : hero tenu, en-tête mobile complété par le nom, aucune régression visuelle.
- Usabilité 8 : axe complet 0 violation sur 5 pages x 1440, 390 et 360 px (15 cas) ; en-tête mobile lisible ; 12 arrêts clavier, 0 focus invisible (QA).
- Créativité 8 : un seul motif décliné, pas de trois cartes égales ni de dégradé violet.
- Contenu 8 : 0 écart de prix sur 55 plats, 9 noms corrigés (fautes du client) sans toucher aux numéros ; réservation sans procédure inventée.
- Technique 8,5 : build OK (5 pages), 0 erreur console, 0 requête en échec, CLS 0, LCP mobile 1,0 à 1,1 s (QA), 0 débordement réel.

Méthode : lecture de `QA-revue2.md` (build du 23:31, captures du 23:34, postérieurs aux sources du 23:30), planche accueil ; script maison (axe-core de node_modules complet, console, requêtes, débordement, h1, noindex, mention, logo, mailto, JSON-LD) sur accueil, carte, a-propos, reservation, `404.html` à 1440, 390 et 360 px ; extraction du texte de `/reservation/` ; confrontation des 55 plats à `donnees.json` par script (0 écart de prix, 9 noms modifiés listés) ; capture 390 px de l'en-tête. Serveur local port 4763, PID noté, arrêté.

## Vérification des corrections annoncées (REVISION-1.md)
| id | annoncé | constaté |
|---|---|---|
| F1-1 | plus de mailto ni « e-mail » sur la réservation | OK : `mailto` = 1 par page, dans le pied (`pied`), 0 « e-mail » dans le texte ; surtitre « Par téléphone ou sur place » ; la phrase sur l'acompte pour les salles est dans le site actuel (`site-actuel/page.html:163`) |
| F1-2 | nom d'en-tête accessible | OK : `aria-label="La Ferme Blanche d’Asie, accueil"` ; nom visible à 390 px (137 px de large, `r2-trio.png`) ; masqué visuellement à 360 px mais nommé ; axe `link-name` 0 sur 15 cas |
| F2-1 | scrollers focalisables | OK : `.mur` `tabindex=0 role=group aria-label` ; `.plateaux` `tabindex=0` avec `aria-label` (sans `role`, voir F3-4) ; axe 0 sur l'accueil à 390 et 360 px |
| F2-2 | compteurs | OK : « 55 plats et un menu découverte », tuiles 4 + 20 + 31 + 1 = 56 = 55 plats + menu |
| F2-3 | « cinq salles » | OK : « Plusieurs salles, une seule table. » |
| F2-4 | fautes de la carte | OK : n° 2, 17, 39, 40, 41, 50, 107, 112, 113 corrigés, plus de virgule finale ni de « nid d » ; 0 écart de prix ; numérotation inchangée |
| F3-3 | photo réservation 1600 | non revérifié en détail (finition) |

F0 : aucun. F1 : aucun. F2 : aucun. Critères PUBLIABLE : build OK, 0 erreur console, 0 lien mort (liens internes 200 au crawl QA, `/reservation/` incluse), 0 fait faux, 0 invention non marquée, 0 débordement réel, 0 violation axe, mention, un seul logo `.kyw-footer__logo` et `noindex, nofollow` sur les 5 pages.

## Findings restants (F3 finitions, non bloquants)
- **F3-1 · Horaires répétés sur la réservation** : section « Horaires » (`reservation.astro:18`) puis bloc du pied de page, visibles l'un sous l'autre à 390 px (`r2-trio.png`) ; idem accueil (bande du hero, `index.astro:34`, puis pied). Garder un seul bloc par page. Le WARN d'audit « phrase répétée » en est la trace.
- **F3-2 · Surtitre au-dessus de chaque titre de page** (non traité, signalé en passe 1) : à réduire à l'accueil.
- **F3-3 · En-tête à 360 px sans nom visible** (masqué visuellement sous 24 rem ; accessible). Réduire encore la taille ou raccourcir le libellé si la place le permet.
- **F3-4 · `.plateaux` sans `role`** (`index.astro:52`) : `aria-label` sur une `<ul>` focalisable ; ajouter `role="group"` comme sur `.mur`, sinon l'étiquette peut être ignorée. Axe ne le signale pas.
- **F3-5 · Cohérence mineure** : « thai » (n° 36, « Bœuf sauté basilic thai et ail ») et « thaï » (n° 40) ; « Terrasse et jardin aux beaux jours » (`reservation`) : « aux beaux jours » n'est pas dans le dossier, écrire « Terrasse et jardin ». RAPPORT.md ne note pas la correction éditoriale de la carte promise par REVISION-1 (ajouter une ligne).

Faux positifs écartés : « 404 sans h1/title/lang » et « pas de robots.txt » (404 brute de `serve.mjs` ; noindex voulu, prompt § 3.3) ; 3 nœuds SVG de la couronne du hero dépassent de 8 à 12 px la fenêtre, coupés par `overflow-x: clip` : effet voulu du motif, aucun défilement horizontal (`scrollWidth` = fenêtre à 1440 et 390 px).

## Ce qui est bien (à ne pas casser)
1. Le motif du plateau tournant, décliné avec retenue (couronne de texte coupée par le bord, anneaux, disque rouge de transition).
2. Un texte qui parle de CE restaurant (plateau tournant, commande à la tablette, salle V.I.P.) et une carte exacte aux prix du client.
3. Performances et accessibilité propres : LCP mobile ~1,1 s, CLS 0, axe à 0 sur trois largeurs.
