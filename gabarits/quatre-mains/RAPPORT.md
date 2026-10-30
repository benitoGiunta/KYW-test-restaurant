# Rapport gabarit « Quatre mains »

**Concept en une ligne** : la page est un diptyque vert / moutarde dont la frontière, pilotée par chapitre, donne la
parole à l'un ou l'autre chef et ne disparaît que là où ils cuisinent ensemble (sections sur papier) ; le nom du
restaurant est coupé net par cette frontière.

## Scores du critique

Non évalués dans cet agent (règle « pas de critique dans cet agent ») : la skill `jury` et la revue sont à faire par
l'agent Sonnet distinct, puis les corrections par l'agent Opus.

## QA mécanique (shoot.mjs + audit.mjs, production build, port 4402)

- Deux passes `shoot.mjs` (home + carte, puis home, les-deux-chefs, histoire, reservation, 404 un par un) et une
  troisième sur histoire après corrections : 0 erreur console, 0 lien cassé, 0 débordement, reduced motion sans
  texte caché ni mouvement, focus visible partout, axe 0 violation sérieuse (après corrections), CLS 0.
- LCP mobile bridé : accueil 1,2 s, histoire 1,1 s, 404 1,1 s ; carte / chefs / réservation 6 à 8 s sur la première
  passe (texte révélé après le loader, en 4G lente à 4x CPU) ; les paragraphes des heros ne sont plus révélés par JS
  depuis, à remesurer par l'agent de revue.
- `audit.mjs` : 0 FAIL, 11 WARN (horaires répétés dans le pied de page et les sections, robots/sitemap cherchés à la
  racine de l'origine, 404 de l'origine sans h1 : normaux sous `base`).
- Idle : la frontière respire (`idleMotion: true` sur 4 pages sur 5 ; la page chefs a été mesurée false une fois).
- Points ouverts pour la revue : l'en-tête fixe sans fond passe sur le contenu en cours de défilement (choix du
  diptyque : il est coupé par la frontière) ; les portraits du hero sont des photos en cuisine, pas des plein-pied
  détourés ; la citation MICHELIN et les horaires apparaissent deux fois sur l'accueil.

## Placeholders (toutes marquées `placeholder: true` dans `src/data/site.ts`, affichées « illustratif »)

- Les rôles « le soir, le salé » / « le midi, le sucré » et les tags D / F des plats : mise en scène du diptyque.
- Les étapes 2012, 2014, 2016, 2017 des parcours (seules 2019 et 2020 sont sûres) ; les deux citations des chefs.
- L'e-mail, les boissons, les plats des formules du midi, le lunch du jour, l'accord mets et vins.
- Les deux avis Google (l'avis MICHELIN 2026 est réel), Sara et Jordan dans l'équipe.
- Le tartare et la rosace de pommes dans la liste à stage (plats vus en photo, hors menu actuel).

## Ce qui manque

- Portraits plein pied détourés (le cahier les demandait) : les photos client sont des portraits en cuisine, cadrés
  4:5 ; la colonne verte les passe en monochrome (luminosity) pour les fondre dans l'aplat.
- Pas de WebGL, pas d'app : formulaire de démonstration qui renvoie vers Zenchef.
- Le LCP des pages intérieures sur mobile bridé reste tenu par le loader (plancher du moteur, voir Leçons).

## Leçons structurelles (à reporter dans `agents/lecons.md`)

- `data-split="words"` sur une citation entre guillemets « » colle les mots entre eux (SplitText sans espace
  préservé dans un `<p>` à `text-indent` négatif) → utiliser `lines` pour les citations, ou ne pas mettre de
  `text-indent` sur un élément splitté.
- axe signale un texte décoratif clipé (copie `aria-hidden` d'un nom coupé par `clip-path`) comme un défaut de
  contraste → dessiner la copie en `color: transparent` + `background-clip: text` : le vrai texte garde sa couleur,
  l'écho n'a plus de couleur de premier plan à mesurer.
- `.shots/` est partagé entre les agents du tour (un `report.json` d'un autre gabarit y traînait) → passer `--out
  .shots/<id>-<page>` à `shoot.mjs` et capturer les pages intérieures une par une (`--crawl` les confond sous `base`).
- Un shoot complet (`--crawl --nav`) dépasse les 5 min d'une commande au premier plan → le lancer en arrière-plan et
  écrire pendant ce temps (FICHE, RAPPORT).
