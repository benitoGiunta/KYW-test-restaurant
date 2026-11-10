# Revue awwwards · Le Félicien · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une brasserie « pour tous » racontée par une règle graduée de 0 à 40 € : un curseur de budget (vrai `input range`) dit combien de lignes de la carte tiennent dans la somme choisie, et chaque rubrique porte sa propre règle avec un point par plat.

Scores /10 :
- Design 8 : papier verdâtre, vert du logo, jaune de mètre pliant, titres Big Shoulders géants, aucun arrondi ; cohérent sur les 5 pages (planches `felaw-r1-pl-*`). Retire un point pour les accents coupés des titres.
- Usabilité 8 : curseur utilisable au clavier (Tab atteint l'input, 3 x flèche gauche : 25 → 22 € et phrase recalculée, `aria-valuetext` « 22 euros »), menu mobile `<dialog>` qui s'ouvre et se ferme à Échap, lien d'évitement en premier arrêt, cibles >= 24 px (0 petite cible), `scrollWidth` = largeur sur 5 pages x 1440/390.
- Créativité 8 : la règle est à la fois signature, navigation (graduations de la carte), état d'ouverture (calculé à l'heure de Bruxelles) et page 404 (« Hors échelle »). Pas d'AI slop repéré : pas de trois cartes égales, pas de dégradé, pas d'eyebrow systématique.
- Contenu 7 : 68 plats sur 68 conformes à `donnees.json` (noms, prix, détails ; script, 0 écart réel), adresse, téléphone, e-mails, horaires, URL de réservation et de réseaux conformes. Deux phrases de la page réservation inventent une procédure (F2) et une majuscule parasite dans la phrase du curseur.
- Technique 8 : build OK (QA), 0 erreur console, 0 requête en échec, axe complet 0 violation sur 5 pages x 2 largeurs (le « 404 sans titre ni lang » du QA est la réponse brute de serve.mjs : `/404.html` a `<title>`, `lang="fr"`, h1), LCP mobile 1,2 s, CLS 0, 293 Ko pour la page la plus lourde, JSON-LD `Restaurant` avec adresse et 4 plages d'horaires, OG, favicon, polices préchargées.

Contrôles PUBLIABLE : mention « Maquette KYW, certaines données sont illustratives » 5/5 ; `.kyw-footer__logo` x 1 par page ; `noindex, nofollow` 5/5 (conforme au prompt § 3.3) ; 0 lien mort (5 liens internes 200, 7 ancres de la carte présentes, Tablebooker 200) ; 0 fait faux. Le verdict reste A_CORRIGER à cause de F1 et des inventions F2.

## Findings

### F1 majeur
- **F1-1 · Accents des capitales coupés dans 8 titres h2** (`src/styles/engine.css:68`, masque SplitText en `overflow: clip`, `line-height` 0,90 à 0,95). Preuves : `felaw-r1-pl-acc.png` (zoom x2 après 6 s) : « TROIS REPÈRES » n'a qu'un trait au lieu du grave, « QUAND ET OÙ » idem, « ENTRÉES » (carte, 390 px) lit « ENTREES » ; mesure par script : masque `clip` + lh/fs 0,90 à 0,95 sur « Trois repères » (histoire), « Quand et où » (réservation), « Entrées » et « Suppléments » (carte), « À chacun son budget », « Les grands classiques, sans détour. » et « Au premier étage, la table s'allonge. » (accueil), à 1440 et 390 px. Contenu mal orthographié à l'œil (« REPERES », « OU », « ENTREES ») : c'est une faute visible sur 4 pages. Correction : donner de la place au-dessus dans le masque (`.split-line { padding-top: 0.2em; margin-top: -0.2em }` en plus du bas) ou `overflow: visible` une fois le reveal terminé ; revérifier à 1440 et 390 px chaque h2 listé et le h2 `titre-xl` de la carte.

### F2 mineur
- **F2-1 · Procédure inventée : réservation par e-mail** (`src/pages/reservation.astro:5` meta description « par e-mail », `:9` « le téléphone ou l'e-mail », bouton « Écrire à info@lefelicien.be »). Le dossier ne donne que Tablebooker et le téléphone ; l'adresse `info@` est une adresse de contact, pas un canal de réservation établi. Correction : « la réservation en ligne ou le téléphone » ; garder l'e-mail dans le bloc Contact.
- **F2-2 · Procédure inventée : stationnement** (`reservation.astro:42` « Pour le stationnement et l'accès, renseignez-vous auprès de la maison au 081… »). Le dossier dit « Parking et transports : inconnu » ; la leçon commune classe ce type de phrase (« par téléphone », « sur demande ») en invention. Correction : supprimer la phrase.
- **F2-3 · Majuscule parasite dans la phrase du curseur** (`src/data/site.ts:88`). À 40 € (valeur par défaut de la carte) : « Avec 40 €, Toute la carte, 68 lignes, est à votre portée. » (capture `felaw-r1-pl-dcarte.png`, `felaw-r1-pl-mcarte.png`). Correction : « toute la carte, 68 lignes, est… ».
- **F2-4 · Collision d'accent sur la 404 au bureau** (h1 « Hors échelle. », `line-height: 0.86`) : l'aigu du « É » de la 2e ligne mord le pied du « H » de « HORS » (`felaw-r1-pl-acc.png`, dernier bloc ; `felaw-r1-pl-d404html.png`). Correction : `line-height` de ce h1 à 0,95 ou interligne supplémentaire entre les deux lignes sur la 404.

### F3 finition
- **F3-1 · Mobile 390 px, règle du hero** : l'étiquette de lecture (« 12 € ») du trait mobile est en partie cachée derrière les épingles des repères 10/18/25 € (`felaw-r1-pl-mhome.png`, 1re colonne, sous la photo : seul un petit bloc noir dépasse au-dessus de « 18 € »). Décaler la lecture au-dessus ou sous les épingles à cette largeur.
- **F3-2 · Typographie des montants et des heures** : « 3,2 € », « 3,5 € », « 6,5 € » (client, mais s'écrit « 3,20 € ») et « 21 h30 » (préférer « 21 h 30 » avec espace insécable) sur toutes les pages (`site.ts` `horaires`, `eur()`).
- **F3-3 · Sitemap sans robots** : `sitemap-index.xml` et `sitemap-0.xml` publient les 5 pages alors que toutes sont en `noindex` ; sans conséquence tant que la maquette reste noindex, mais incohérent (retirer l'intégration sitemap de `astro.config.mjs` pour cette variante). `robots.txt` absent : les WARN d'audit sur ce point sont des faux positifs connus.
- **F3-4 · Survol par la couleur seule** sur 2 cibles de la carte (« 081 39 53 23 », « Réserver une table » : QA) ; ajouter un soulignement ou un décalage.
- **Non vérifié** : glisser au doigt du curseur sur un vrai téléphone (le `input range` natif et le Tab/flèches fonctionnent) ; contraste des CTA jaunes et du menu classé « bgGradient » par axe (non mesurable), mais les jetons documentent 7,3:1 (encre sur jaune) et 6,1:1 (texte atténué).

## Ce qui est bien (à ne pas casser à la révision)
1. La règle graduée comme système : curseur de budget réel (clavier, `aria-valuetext`, phrase calculée depuis les 68 lignes), règle par rubrique, 404 « Hors échelle », menu mobile avec la règle ; pas de loader ni de GL inutiles, LCP mobile 1,2 s.
2. Honnêteté du contenu : une seule photo de 2020 légendée « d'archive, illustrative », illustration de couverture présentée comme illustration, aucun avis ni chiffre inventé, carte intégralement fidèle, état d'ouverture exact aux 5 instants testés (dimanche 14 h 30 : « ouvre à 18 h » ; vendredi 21 h 45 : « jusqu'à 22 h » ; samedi 22 h 30 : « demain dès 12 h »).
3. Robustesse technique : `prefers-reduced-motion` (0 bloc caché), focus visible 2 px sur tous les arrêts, un seul `h1`, `lang="fr"`, une seule balise `footer` (pas de doublon `contentinfo`), JSON-LD complet.
