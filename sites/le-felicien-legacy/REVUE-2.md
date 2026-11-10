# Revue legacy · Le Félicien · passe 2
Verdict : PUBLIABLE
Lecture en une ligne de l'idée du site (inchangée depuis la passe 1) : une brasserie de quartier présentée comme une carte imprimée sobre (serif d'affiche, papier crème, bandes brun et vert, tableaux de prix) qui met les classiques, le menu du midi et les horaires avant tout le reste.

Périmètre : `dist/` du 10/11 01:06 postérieur à `src/` (01:04) et à REVISION-1 ; QA-revue2 (captures 01:12) lue et réutilisée pour accueil, carte et 404 brute. Mesures propres sur port 4793 (arrêté, `kill 18077`) : 5 pages (accueil, carte, contact, suggestions, `404.html`) x 5 largeurs (1440, 1024, 768, 390, 360), axe-core complet de `node_modules`, console, requêtes, débordement, premier Tab, noindex, mention, logo, h1, `lang`, largeurs de `.well` et `.sched` ; pixels du héros sans texte à 5 largeurs ; LCP/CLS mobile CPU x4 + 4G (2 passes) ; reduced-motion. Captures : `.shots-le-felicien-legacy-rel2/` (`contact-1440.png`, `contact-390.png`, `hero-*.png`, `carte-390-dernier-onglet.png`, `planche-rel2.png`).

Scores /10
- Design 7,5 : la page Contact est maintenant composée (horaires en tableau de 864 px, encadré « Premier étage » en colonnes 8-13, `contact-1440.png`), le héros est lisible sur toute la largeur ; reste très sage (3 photos de substitution ou anciennes).
- Usabilité 8 : premier Tab = « Aller au contenu » sur les 5 pages x 5 largeurs, réservation visible partout, onglets de la carte fonctionnels (clic sur le dernier onglet, flèche droite).
- Créativité 6,5 : parti pris cohérent de carte imprimée, inchangé ; aucune photo réelle de salle ou de plat récent (limite des sources, déclarée).
- Contenu 8,5 : 68 plats et prix confrontés en passe 1 (0 écart), texte du lundi aligné sur le dossier, aucune invention ajoutée par la révision ; mention et logo présents.
- Technique 9 : 0 erreur console, 0 requête en échec, 0 débordement, 0 violation axe (toutes sévérités) sur 25 cas, LCP mobile 0,92 et 0,98 s, CLS 0,042.

## Vérification des corrections annoncées (REVISION-1)
| id | verdict | preuve |
|---|---|---|
| F1-1 | confirmé | `.well` Contact = 528 px (1440), 355 (1024), 720 (768), 358 (390), 328 (360) ; `contact-1440.png` : encadré à droite, texte contenu, `contact-390.png` : pleine largeur |
| F1-2 | confirmé | `.sched` = 864 / 587 / 720 / 358 / 328 px ; la ligne « Mardi · aujourd'hui » tient sur une ligne, surlignage pleine largeur, filets présents (`contact-390.png`) |
| F1-3 | confirmé | premier Tab de `/la-carte/` = « Aller au contenu » à 5 largeurs ; onglets toujours opérationnels (clic dernier onglet « Bar » entièrement visible, flèche droite passe à « Plats ») |
| F2-1 | confirmé, mesuré | pixels sans texte sous le `h1` : contraste minimum 5,8 : 1 à 1440 et 1280 (p95 7,7), 6,1 à 1024, 5,2 à 768 et 390 ; le sous-titre ≥ 7,0 : 1 (avant : minimum 2,2 : 1) |
| F2-2 | confirmé | `footer` = 1 par page (seul `kyw-footer`), `landmark-no-duplicate-contentinfo` absent sur 25 cas, pas de violation `region` |
| F2-3 | confirmé | dist : « Pas de suggestions ce jour-là : le chef cuisine selon le marché, décidé le jour même. » ; plus de procédure ni de « spontanée » |
| F2-4 | confirmé | axe : 0 violation sur `/la-carte/` à 5 largeurs |
| F3-1 | confirmé | le numéro de la page Contact est dans `span.nw` (`white-space: nowrap`), 1 seule boîte de ligne à 360 px, `contact-390.png` : « au 081 39 53 23. » d'un bloc |

## Findings
### F0 / F1 / F2
Aucun. Build OK (dist), 0 fait faux, 0 invention non marquée, 0 lien mort (5 pages en 200, 0 requête en échec), 0 débordement, 0 violation axe, mention + 1 logo KYW + `noindex` sur 5 pages sur 5, un seul `h1`, `lang="fr"`.

### F3 (finitions, non bloquantes)
- **F3-2** (reporté de la passe 1, non traité) : « 10 € (2 pièces) / 16 € » dans `carte.json` sans insécable avant « € » (0 `&nbsp;€` dans `la-carte/index.html`) ; à 390 px le « € » peut se détacher du chiffre.
- **F3-3** (reporté, non traité) : onglets de la carte à 390 px coupés à gauche (« ambins ») sans dégradé de bord ; le défilement fonctionne.
- **F3-4** (reporté) : « 7 jours sur 7 » reste en 2 occurrences sur l'accueil (lead du héros et `h2`) ; le `<title>` ne le répète plus.
- **F3-5** : lien « Carte en PDF » en `http://` (URL du client), à signaler au client.
- **F3-7** (nouveau, mineur) : avec une ancre dans l'URL (`/la-carte/#plats`), le premier Tab part du panneau ciblé et atteint le pied de page (« Avenue d'Ecolys ») : comportement natif du navigateur sur un fragment, pas une régression ; sans ancre, le défaut est corrigé. Facultatif : placer `tabindex="-1"` sur le panneau ciblé.
- **F3-8** (nouveau) : CLS mobile 0,042 sous CPU x4 (seuil 0,05) : marge faible, due au bloc `.hero__in` déjà noté en passe 1.
- **F3-9** : « le chef cuisine selon le marché » (suggestions) : le dossier dit « cuisine du marché » sans attribuer au chef ; formulation acceptable, à neutraliser si le client conteste.
- Les contrastes « à vérifier » d'axe (4 à 5 nœuds sur accueil, carte à 390) sont le héros sur photo, mesuré ci-dessus (≥ 5,2 : 1), et le menu desktop en `display: contents` (faux positif connu).

## Ce qui est bien (à ne pas casser)
1. Page Contact : tableau d'horaires et encadré « Premier étage » désormais lisibles à toutes les largeurs, sans débordement de page.
2. Honnêteté du matériel : photo de salle légendée comme illustration à remplacer, crédits et mention « Maquette KYW, certaines données sont illustratives » en pied de chaque page, logo KYW unique.
3. Technique propre : 0 console, 0 axe, LCP mobile ≈ 0,95 s, reduced-motion sans texte caché (0 `data-reveal` sous 0,99 d'opacité), menu et onglets accessibles au clavier.
