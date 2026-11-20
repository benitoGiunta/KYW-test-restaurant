# Revue legacy · Le Brunchist · passe 2
Verdict : PUBLIABLE
Lecture en une ligne de l'idée du site (sans avoir relu DESIGN.md) : un menu de café-brunch en papier crème et bleu outremer, titres gothiques, page unique qui mène à l'appel, avec la ligne « Aujourd'hui » du registre des horaires comme signature.

Scores /10
- Design 7 : inchangé depuis la passe 1 (hero 1440 net, bande bleue des horaires, pied propre) ; planches `.shots/rl2/p1440-*.png`, `p390.png`.
- Usabilité 8 : premier Tab « Aller au contenu », focus 2 px visible sur 6 arrêts, menu `<dialog>` (focus « Carte » à l'ouverture, Échap ferme et rend le focus à « Menu »), flèches des onglets de la carte OK.
- Créativité 6 : inchangée (une idée, thème « still » voulu).
- Contenu 7 : F1-1, F2-3 et F3-1 corrigés, faits conformes à donnees.json et au dossier, incertitudes marquées sur la page.
- Technique 9 : axe 0 violation (home + 404.html, 320/390/768/1024/1440), 0 console, 0 requête en échec, 0 débordement (`scrollWidth` = `clientWidth` aux 5 largeurs), LCP mobile 1,46 s et 1,61 s (CPU x4, 4G lente), CLS 0,0018.

Build : non relancé (dist du 20/11 01:30 postérieur à tout `src/` ; build annoncé OK par REVISION-1 et commit 1871a7e). QA-revue2.md n'existait pas (aucune capture après révision) : mesures et captures faites par 3 scripts maison (`.shots/rl2/`). noindex, mention « Maquette KYW, certaines données sont illustratives » et logo KYW (un seul, chargé, 110x22) présents sur l'accueil et sur `404.html`. 0 lien mort (accueil, 404.html, sitemap-index, sitemap-0, 3 photos, logo : 200).

## Vérification des corrections annoncées par REVISION-1
| id | résultat | preuve |
|---|---|---|
| F1-1 | confirmé | dist : 0 « citent le plus », « Plats cités par des sources tierces, au salé, au sucré et au verre. » visible sous « La carte » (1440 et 390) |
| F2-1 | confirmé | JSON-LD du dist : `image` (matcha-latte.webp) et 5 `OpeningHoursSpecification` mercredi à dimanche 09:30-15:30 conformes à donnees.json ; JSON valide ; OG `image` présent |
| F2-2 | confirmé | 1 seul `<footer>` (`kyw-footer`), le pied du site est `<section aria-label>` ; axe complet : 0 violation (donc `landmark-no-duplicate-contentinfo` disparu) à 5 largeurs sur 2 pages |
| F2-3 | confirmé | « Wendy S. » (0 « Sajid »), chaque avis porte « avis Google relevé sur Restaurant Guru, en anglais, illustratif » ; citations identiques au dossier (« Best egg topped Avocado toast ever. », « Very cozy, good fresh foods […] ») |
| F3-1 | confirmé | pied : « Du mercredi au dimanche, 9 h 30 à 15 h 30 (à confirmer) » |
| F3-2 | confirmé en partie | `Réservation&nbsp;:` présent (le « : » ne s'isole plus) et point final dans le `.fill` ; reste un blanc de `padding-inline` de part et d'autre du soulignement pointillé (voir F3-6) |
| F3-3, F3-4, F3-5 | non traités, annoncés comme tels | voir F3 ci-dessous |

Aucune régression vue : typographie (U+00A0 dans les « », 0 tiret cadratin), images toutes chargées (1600 px de source, alt décrivant la photo), tab/onglets/menu fonctionnels, 1 seul h1, `lang="fr"`.

## Findings (0 F0, 0 F1, 0 F2, 5 F3)

### F3 finition (non bloquants)
- **F3-3 · Photo de la carte hors carte** (inchangé) : croissant aux amandes, légendé « Photo provisoire d'un croissant aux amandes », alors qu'aucun plat listé n'est un croissant. Remplacer par une photo d'eggs benedict ou de granola quand elle existe.
- **F3-4 · Cibles de nav à 21 px de haut sur bureau** (inchangé, conforme WCAG 2.5.8 par espacement ; 44 px en pointeur grossier). Mon script n'a trouvé aucune cible < 24 px hors liens en ligne.
- **F3-5 · Rythme** (inchangé) : sloplint `--url --genre editorial --render` : 0 FAIL, 0 WARN, 1 REFLEX 59 (écart de 60 px entre la bande bleue et le pied, autres écarts 237 à 306 px). Je n'ai pas trouvé de dérogation écrite dans DESIGN.md (grep « waiv », « 59 »), contrairement à REVISION-1 qui parle de « WAIVED » (rendu de sa copie aplatie) : à prendre comme choix assumé, pas comme défaut.
- **F3-6 · `.fill` : blanc de chaque côté du soulignement** · `src/styles/page.css:42` (`padding-inline: var(--space-2xs)`) : « Réservation :  à confirmer avec le café.  » et « Prix :  à renseigner par le café.  » montrent un vide avant et après le texte pointillé (1440 et 390, `p1440-1.png`, `p390.png`). Correction : `padding-inline: 0`, ou `padding-inline-end: 0` et espace avant seul.
- **F3-7 · « Pressé sur place »** (Carte, ligne Jus frais) : le dossier dit « jus frais pressés » sans lieu de pressage. Couvert par « Compositions illustratives » ; si l'on veut zéro détail non sourcé : « Jus pressés ».

## Ce qui est bien (à ne pas casser)
1. Honnêteté du contenu : « Compositions illustratives », prix à renseigner, avis datés et sourcés « illustratif », photos provisoires créditées (auteur, licence), fondateurs « selon ELLE.be, à confirmer ».
2. Signature « registre du jour » (ligne « Aujourd'hui » juste : vendredi 20/11) dans la bande bleue pleine largeur, lisible à 390 comme à 1440.
3. Robustesse : 0 axe, 0 console, 0 débordement de 320 à 1440, LCP < 1,7 s sous throttling, menu dialog et onglets au clavier, 404 dessinée.

## Hypothèses et limites
- Contenu de `DESIGN.md` non relu (avis formé sur captures et mesures). Serveur local 127.0.0.1:4617 (PID noté dans le scratchpad `rl2-serve.pid`), arrêté par `kill`.
- Les 4 « débordements » de ma mesure par `Range` à 320 à 1024 sont le texte `.visually-hidden` « (s'ouvre dans un nouvel onglet) » (1 px, clip) : faux positifs.
- Captures pleine page : les images `loading="lazy"` y apparaissent vides ; sur capture défilée à la molette (`bas-1440.png`, `bas-390.png`) toutes sont chargées et le logo KYW s'affiche.
