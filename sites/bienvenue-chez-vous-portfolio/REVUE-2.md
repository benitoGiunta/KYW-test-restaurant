# Revue portfolio · Bienvenue chez vous · passe 2
Verdict : PUBLIABLE
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : table de chef-patron sombre et feutrée (bordeaux, rouge d'enseigne), repas raconté en « escales », grands chiffres en serif (4, 69, 1) et photos de plats ; signature = sourire en arc rouge sous le nom, écho du dessert-smiley.

Méthode : `QA-revue2.md` incomplet (3 pages en `shootFailed`, aucun `report.json`) : non utilisé pour les chiffres. Fraîcheur : dist (08:40) postérieur à REVISION-1 (08:38), aucun fichier de `src/` ni `public/` plus récent. Mesures refaites sur mon port 4872 (serveur arrêté par `kill`) : 7 pages (dont `404.html` réelle) x 1440 et 390 px, défilement par 300 px + 2,2 s de repos, axe-core complet, console, requêtes, débordement, balises ; puis script ciblé (galerie, Tab, LCP/CLS sous CPU x4 + 4G en 2 passes, reduced-motion, JSON-LD) ; planches des captures `.shots-bienvenue-chez-vous-portfolio-revue2/p2/` lues (12 pages sur 2 planches).

## Vérification des corrections de REVISION-1
| id | résultat | preuve |
|---|---|---|
| F1-1 chèque cadeau | CORRIGÉ | `/carte/` : « Chèques cadeaux proposés par le restaurant (modalités à confirmer). » ; plus de « par téléphone » ni de montants ; `/emporter/` factuel (dossier : « chèque cadeau » en titre de menu) |
| F2-1 procédure de réservation | CORRIGÉ | « Le restaurant reçoit sur réservation, par téléphone ; il n'y a pas de module en ligne. » ; « heures de service » : 0 occurrence ; conforme à dossier.md:30 (« essentiellement par téléphone ; pas d'outil en ligne ») |
| F2-2 double contentinfo | CORRIGÉ | `<section class="footer" aria-label="Coordonnées et horaires">` + un seul `<footer class="kyw-footer">` ; axe : 0 violation sur 14 cas (7 pages x 2 largeurs), `landmark-no-duplicate-contentinfo` et `region` absents (axe ciblé 390) |
| F2-3 bande galerie | CORRIGÉ | `.galerie__bande` : `tabindex=0`, `role=region`, `aria-label="Galerie de plats"` (scrollWidth 1445 > 390), arrêt clavier présent à 2 px d'outline ; `scrollable-region-focusable` : 0 |
| F2-4 répétitions | CORRIGÉ | « pas dévoilé » : 5 -> 2 occurrences (citation de l'accueil, qui est textuelle dans donnees.json:33, et histoire) ; phrase retirée de l'accueil et du menu ; chapitre 2 de l'accueil retitré « hors accords » ; titre « le repas en quatre escales, midi et soir » n'apparaît plus qu'une fois |
| F2-5 horaires à confirmer | CORRIGÉ | pied de toutes les pages (home, carte, 404 vérifiés) : « Services (horaires à confirmer) » ; JSON-LD inchangé (10 plages), hypothèse annoncée |

Aucune régression : 0 erreur console, 0 requête en échec, 0 débordement de page (sw = fenêtre aux deux largeurs ; les « bad » mesurés sont le hero en parallaxe et les vignettes de la bande défilante, attendus), 1 h1 par page, `lang="fr"`, noindex + mention « Maquette KYW » + 1 logo KYW sur 14 cas sur 14, 0 cible < 24 px, focus 2 px sur 14 Tab, LCP mobile 1,33 s / 1,35 s (2 passes), CLS 0, reduced-motion : 0 texte à opacité < 0,3, JSON-LD Restaurant avec adresse et 10 plages horaires. Liens : aucun lien ni fichier modifié par la révision (liens internes validés en passe 1).

## Scores /10
- Design 7 : cohérence bordeaux/rouge et hero fort (planches home 1440/390), pages intérieures encore dépouillées, gabarit Velours reconnaissable.
- Usabilité 8 : appel direct en CTA, menu burger, cibles >= 24 px, focus visible, bande galerie désormais atteignable au clavier.
- Créativité 6 : sourire en arc et escales numérotées propres au restaurant ; le reste vient du gabarit.
- Contenu 8 : plus aucune invention de procédure, « à confirmer » partout où le dossier doute, répétitions réduites.
- Technique 9 : axe 0 violation, LCP 1,3 s sous CPU x4, CLS 0, 0 erreur.

## Findings (0 F0, 0 F1, 0 F2 ; 6 F3 de finition, non bloquants)
- **F3-1 · Apostrophes droites** : 22 occurrences dans le texte visible (`n'est`, `l'année`, `n'y a pas`, 404 : « n'existe ») ; remplacer par U+2019 (déjà signalé en passe 1, non traité).
- **F3-2 · 404 « Rideau »** (`src/pages/404.astro:7`) : titre issu du gabarit, sans lien avec le restaurant ; proposer « Table introuvable ».
- **F3-3 · Eyebrows** sur presque chaque titre (« Le repas, 69 € », « Quatre voyages, une cuisine », « Erreur 404 »…) : en retirer la moitié.
- **F3-4 · Accueil : bloc adresse + horaires + téléphone redit dans le pied** juste en dessous (audit : phrases répétées 2 fois) ; le bloc du corps de page n'a pas lui-même « à confirmer » (le pied, visible dans la foulée, l'a). Supprimer les horaires du bloc ou y ajouter la mention.
- **F3-5 · Photos de `/menu/`** (foie gras à la truffe, absent du relevé d'octobre affiché à côté) : légende « photo d'illustration » ou remplacer par la photo des Saint-Jacques ; `og.jpg` sans nom du restaurant.
- **F3-6 · axe « à vérifier » `label-content-name-mismatch`** à 390 px sur `a.header__brand` (`aria-label="B Bienvenue chez vous, accueil"`, virgule) : retirer la virgule ou aligner le nom accessible sur le texte visible.

## Ce qui est bien (à ne pas casser)
1. Le sourire en arc rouge et le hero photo du dessert-smiley : identité immédiate, plein en reduced-motion.
2. Honnêteté du contenu : « à confirmer » sur tarif des mercredis, Box 109 €, chèques cadeaux, horaires (pied) ; citation exacte ; aucun e-mail ni avis inventé.
3. Technique propre : pied KYW (logo unique, un seul contentinfo), noindex, LCP 1,3 s, CLS 0, axe à 0.
