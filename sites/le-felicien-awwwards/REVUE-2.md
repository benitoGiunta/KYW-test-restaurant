# Revue awwwards · Le Félicien · passe 2
Verdict : PUBLIABLE
Lecture en une ligne de l'idée du site (sans relire DESIGN.md) : une brasserie « pour tous » racontée par une règle graduée de 0 à 40 € (curseur de budget réel, règle par rubrique, 404 « Hors échelle »), inchangée depuis la passe 1.

Base de la passe : dist (01:06) postérieur à `src/` (dernière modification 01:02) et à REVISION-1 ; captures de l'agent captures (`QA-revue2.md`, 01:08) postérieures au dist, donc réutilisées. Serveur propre sur le port 4811 (PID 18112, arrêté).

Scores /10 :
- Design 8,5 : les titres à accents sont désormais complets partout (planches `felaw-r2-pl-d.png` et `felaw-r2-pl-m.png`) ; la cohérence papier, vert et jaune est intacte.
- Usabilité 8 : QA-revue2 donne 0 petite cible, 12 arrêts de tabulation avec « Aller au contenu » en premier, aucun focus bloqué ; `scrollWidth` égal à la largeur sur 5 pages x 1440/390 (mesure maison).
- Créativité 8 : la signature (la règle) est conservée ; la correction de la 404 n'a pas altéré la composition.
- Contenu 8,5 : les deux procédures inventées ont disparu, la phrase du curseur est correcte, la carte à 68 lignes avait 0 écart en passe 1 et `site.ts` ne change que la casse ; les prix des suggestions (25 € et 18 €), les menus à 27 € et le lundi « cuisine du marché » sont dans `donnees.json` (l. 547 à 560).
- Technique 8,5 : build OK, axe complet 0 violation sur 5 pages x 2 largeurs (10 cas, axe-core de node_modules), 0 erreur console, 0 requête en échec, LCP mobile 1,2 s et CLS 0 (QA), page la plus lourde 293 Ko.

## Vérification des corrections annoncées (REVISION-1)
| id | résultat | preuve |
|---|---|---|
| F1-1 accents coupés | CONFIRMÉ | `.split-line` : `padding-top` 0,2 em (13,3 px à 1440, 6,7 à 390 sur les h2 à 0,95 ; 25,2 et 9,6 px sur ceux à 0,90) ; capture d'élément x2 après défilement de tous les h2 à accent : « ENTRÉES », « SUPPLÉMENTS », « TROIS REPÈRES », « À CHACUN SON BUDGET », « QUAND ET OÙ », « AU PREMIER ÉTAGE… », « RÉSERVER », « LE FÉLICIEN » (clip de page x2) complets à 1440 et 390 px |
| F2-1 réservation par e-mail | CONFIRMÉ | meta description « en ligne ou par téléphone », chapeau « la réservation en ligne ou le téléphone », plus de bouton « Écrire à info@ » ; grep de `dist/` : 0 « par e-mail » ; « Écrire à l'équipe événements » (`evenement@`, donné par le dossier) reste, c'est légitime |
| F2-2 stationnement | CONFIRMÉ | grep de `dist/` : 0 « stationnement », 0 « parking » |
| F2-3 majuscule | CONFIRMÉ | grep : 0 « Toute la carte » ; « toute la carte » dans `index.html`, `carte/index.html` et dans le script de la carte |
| F2-4 collision 404 | CONFIRMÉ | `line-height` calculé 1,08 sur le h1 de `404.html` ; `felaw-r2-pl-d.png` (1er bloc) et `felaw-r2-pl-m.png` : l'aigu de « ÉCHELLE » ne touche plus « HORS » à 1440 ni à 390 |

## Findings (aucun F0, F1 ni F2)

### F3 finition (hérités de la passe 1, non traités par consigne, aucun ne bloque)
- **F3-1 · Mobile 390 px, étiquette de lecture du hero** partiellement cachée par les épingles 10/18/25 € : non revérifié en passe 2 (hors périmètre ciblé), à regarder si le temps le permet.
- **F3-2 · Typographie des horaires et des montants** : « 21 h30 » encore présent sur toutes les pages (texte extrait de `404.html` et `reservation/`), « 3,2 € » dans la description de la carte (client : « 3,2 € »). Préférer « 21 h 30 » avec espace insécable.
- **F3-3 · Sitemap** : `sitemap-index.xml` et `sitemap-0.xml` toujours publiés alors que les 5 pages sont en `noindex, nofollow` (conforme au prompt § 3.3) ; retirer l'intégration sitemap de `astro.config.mjs` pour cohérence.
- **F3-4 · Survol par la couleur seule** sur « 081 39 53 23 » et « Réserver une table » dans la carte : non revérifié.
- **Non vérifié** : glisser au doigt du curseur sur un vrai téléphone ; contraste des CTA jaunes (jetons documentés 7,3:1 et 6,1:1).

## Contrôles PUBLIABLE
Build OK (QA) · 0 erreur console · 0 lien mort (5 pages en 200, Tablebooker `reservations.lefelicien.be` en 200, ancres de la carte présentes en passe 1) · 0 fait faux (téléphone, e-mails, adresse, horaires, outil de réservation, liens Facebook et Instagram conformes à `donnees.json`) · 0 invention non marquée · 0 débordement (10 cas) · 0 violation axe · mention « Maquette KYW, certaines données sont illustratives » 5/5 · `.kyw-footer__logo` x 1 et une seule balise `footer` par page · `noindex, nofollow` 5/5 · `lang="fr"`, un seul h1, title et description uniques par page.

## Ce qui est bien (à ne pas casser)
1. La règle graduée comme système unique (curseur, règles de rubrique, état d'ouverture, 404) avec des titres maintenant sans coupe.
2. Honnêteté du contenu : plus aucune procédure supposée (réservation, stationnement), photo d'archive et illustration annoncées comme telles.
3. Robustesse : 0 violation axe, reduced-motion sans bloc caché, LCP mobile 1,2 s, page la plus lourde 293 Ko.
