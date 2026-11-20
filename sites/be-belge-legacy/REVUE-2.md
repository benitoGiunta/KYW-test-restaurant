# Revue legacy · Be Belge… et d’ailleurs · passe 2
Verdict : PUBLIABLE
Lecture en une ligne de l’idée du site : un site éditorial sobre, fond crème, serif et pastille violette, qui montre la maison (façade éclairée dans le jardin, salle de pierre) et pose le Menu du Chef (57 € / 72 €), les horaires et le téléphone ; aucune photo de plat, identité prudente mais cohérente.

Méthode : dist (21:24) postérieur à `src/` et à `public/` (`find -newer` vide), QA-revue2 (21:30) postérieur au dist : build et captures réutilisés. Les 3 planches du QA lues (accueil, menu, « 404 »). La « 404 » du QA est la réponse brute de serve.mjs (leçon commune) : le vrai `404.html` est mesuré à part. Serveur propre sur le port 4588 (PID 15510), arrêté. Mesures maison (`scripts/q.sh`, journaux `.logs/relecteur-br2-*.log`) : axe-core complet, console, requêtes, débordement, repères, cibles, 7 pages (dont `404.html`) x 1440 et 390 px ; extraction du texte servi des 7 pages ; JSON-LD parsé ; liens internes testés ; capture du héros à 1440 (`.shots-be-belge-legacy-revue2/mesure/hero-1440.png`). Non relancés : sloplint (REVISION-1 renvoie au journal), les F3 de la passe 1 (hors périmètre de la révision).

Scores /10 :
- Design 7 : le héros bureau montre maintenant la façade éclairée (bandeau 1312x396, `object-position: 50% 22%`, hero-1440) ; palette crème et violet tenue, mais peu de signature.
- Usabilité 8 : « Réserver » toujours visible, téléphone cliquable, menu Popover ; 0 cible < 24 px sauf un lien en ligne de la page réservation (F3-7).
- Créativité 5 : inchangé, sections en colonnes sans idée forte, photos en vignettes ; propre mais générique.
- Contenu 9 : 0 fait faux, 0 invention ; horaires du JSON-LD identiques à `donnees.json` (mer 12-13:30 ; jeu, ven 12-13:30 et 19-20:30 ; sam 19-20:30 ; dim 12-13:30), menu daté « Dernier menu publié » partout, 1 espace simple résiduel avant « ; ».
- Technique 9 : 0 erreur console, 0 requête en échec, 0 lien mort (6 liens internes distincts, tous en 200 ; og:image 200 `image/webp`), 0 débordement, 0 violation axe sur 14 cas, 1 seul repère contentinfo par page.

## Vérification des corrections annoncées (REVISION-1)
| id | verdict | preuve |
|---|---|---|
| F1-1 JSON-LD + og:image | VALIDÉ | 1 bloc `ld+json` sur chacune des 7 pages (404 incluse), JSON valide : `Restaurant`, nom, tél. +32 81 47 00 95, adresse Avenue de Marlagne 203 / 5000 / Namur (Wépion), geo 50.4517812 / 4.8421921, `servesCuisine`, 7 créneaux conformes aux horaires du dossier ; `og:image` absolue avec préfixe `/be-belge/legacy/`, fichier servi en 200 ; `twitter:card` présent. |
| F2-1 ponctuation | VALIDÉ sauf 1 reste (F3-8) | regex `␠[!?:;]` sur le texte servi des 7 pages : 0 occurrence, sauf « 72 € ; vins en option » sur /carte/ (voir F3-8). « Une question ? », « Vins en accord : », « À table ? », « Photographies : » sont en U+00A0. |
| F2-2 menu périmé | VALIDÉ | « Dernier menu publié, proposé du 13 août au 6 septembre 2026 » : 2 occurrences sur l’accueil, 3 sur /menu/, « dernier menu publié, proposé du… » sur /carte/ ; 0 « pour ce soir », « Envie de venir ? » présent sur /carte/. |
| F2-3 contentinfo double | VALIDÉ | `footer,[role=contentinfo]` = 1 sur 7 pages x 2 largeurs ; axe `landmark-no-duplicate-contentinfo` absent ; 1 `.kyw-footer__logo` et la mention KYW sur chaque page. |
| F2-4 cibles < 24 px | VALIDÉ sauf 1 lien en ligne | 0 lien ou bouton < 24 px sur 6 pages x 2 largeurs ; reste « L’ouvrir dans un nouvel onglet » 188x18 sur /reservation/ à 1440 px (F3-7). |
| F2-5 héros bureau | VALIDÉ | hero-1440.png : façade éclairée et terrasse visibles, plus de bande de pelouse ; mobile non régressé (m-01-hero du QA). |

## Findings
**F3-8 · Un espace simple reste avant « ; » sur /carte/** (F3). Preuve : dist `carte/index.html`, « 72 € ; vins en option » : entre « € » et « ; » c’est U+0020 alors que `carte.astro:12` contient U+00A0 avant `;` après `join(', ')` (le texte du prix est assemblé par `.map(...).join(', ')`, puis un espace simple est rendu : vérifier le gabarit ou une normalisation à la compilation). Sur mobile le « ; » peut se retrouver seul en début de ligne. Correction : mettre `&nbsp;` dans le gabarit ou une chaîne ` ;`, puis contrôler le dist.

**F3-7 · Lien en ligne de 18 px de haut sur /reservation/** (F3). Preuve : « L’ouvrir dans un nouvel onglet » 188x18 à 1440 px (0 à 390). Lien dans une phrase donc exempté par WCAG 2.5.8 ; si on veut l’harmoniser avec le reste, `.muted a { display: inline-block; min-block-size: 24px }`.

**F3-9 · Phrase répétée à l’identique** (F3). Preuve : « Dernier menu publié, proposé du 13 août au 6 septembre 2026 » trois fois sur /menu/ (audit.mjs : « sentence repeated »). Garder la mention sous le titre et l’ôter de la zone prix et de la ligne de légende.

**F3 de la passe 1 non traités, non re-vérifiés (hors périmètre)** : eyebrows « Réservation », « Photos », « Erreur 404 » (F3-1) ; favicon bleu au lieu du violet (F3-2, REVISION/ETAT annoncent un favicon corrigé, non contrôlé) ; polices Fontshare et Google Fonts distantes sans préchargement (F3-3) ; trous de composition banquets, photos, réservation (F3-4) ; widget Zenchef indisponible dans le bac à sable, lien de repli présent (F3-5) ; `noHoverChange` du QA : 2 éléments sur l’accueil, 5 sur /menu/, 2 sur 404, toujours non identifiés (F3-6).

Faux positifs à ne pas corriger : axe `incomplete color-contrast` (6 nœuds accueil, 2 réservation, `frame-tested` de l’iframe Zenchef) : 0 nœud à vérifier restant après 3,5 s de repos sur l’accueil (le reveal avait fini) ; `skipLinkFirst: false` du QA ; « 404 » de la planche = réponse brute de serve.mjs ; WARN « no canonical » du QA (variante noindex).

## Ce qui est bien
1. Faits et SEO exacts : prix, horaires, adresse, téléphone, Facebook, Zenchef du dossier, JSON-LD complet sur les 7 pages, og:image valide.
2. Technique propre : 0 console, 0 requête en échec, 0 lien mort, 0 violation axe, 0 débordement à 1440 et 390 px, un seul repère contentinfo, mention KYW et logo uniques, `noindex`, `lang="fr"`, un h1 par page.
3. Héros bureau et mobile : façade éclairée lisible dans le bandeau, menu Popover fonctionnel, formulaire honnête (« Rien n’a été envoyé… »), jour courant des horaires mis en évidence.
