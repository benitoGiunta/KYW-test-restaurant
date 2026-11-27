# Revue awwwards · La Bergerie de Lives · passe 2

Verdict : A_CORRIGER (0 F0, 0 F1, 3 F2, 3 F3 : aucun blocage de publication)

Lecture en une ligne de l'idée du site (sans avoir relu DESIGN.md) : un domaine de pierre « clos » (fond vert forêt, sable et or, cadres d'angle dorés, battants au hero), maison d'hôtes et domaine de mariage qui « se ferme derrière vous », sans carte ni horaires inventés.

## Périmètre et sources de preuve
- Cible : le `dist/` **commité** (HEAD 0fa1fc33, 08:54), extrait par `git archive` dans le scratchpad et servi sur le port 4791 (PID 11320, arrêté par `kill`). Raison : le `dist/bergerie-lives/awwwards/` du dossier de travail a été reconstruit à 08:55:55 (après le commit, probablement par l'agent captures), il est sale (`git status` : 7 webp modifiés), contient de nouveau les 23 JPEG sources et pèse 24 Mo au lieu de 15. `QA-revue2.md` a donc mesuré ce dist non purgé (poids 1864 Ko, LCP mobile accueil 2408 ms) : ses chiffres de poids et de LCP ne valent pas pour le dist commité. Ses 0 erreur console et son axe à 0 sur accueil et le-domaine restent cohérents avec mes mesures.
- Mesures maison (`scripts/q.sh`) : 5 pages (accueil, le-domaine, histoire, reservation, `404.html` réelle) x 1440 et 390 px : axe-core complet de `node_modules` après défilement par 300 px et 2,5 s de repos, console, requêtes, débordement, cibles < 24 px, opacité des textes, landmarks, balises ; extraction du texte du dist ; 100 liens et srcset confrontés aux fichiers (0 mort) ; captures ciblées (planches `p1440.png`, `p390.png` dans le scratchpad) ; perf CDP CPU x4 + 4G lente en deux passes ; reduced-motion à 390.
- Je n'ai pas relancé de build (il écraserait le dist partagé) ; build OK déjà constaté par la révision et la QA.

## Vérification des corrections annoncées (REVISION-1)
| id | annoncé | constat | statut |
|---|---|---|---|
| F1-1 aria-prohibited-attr | corrigé | axe complet : 0 violation sur 5 pages x 2 largeurs ; plus aucun `p/div/span[aria-label]` sans rôle | confirmé |
| F2-1 contentinfo en double | corrigé | 1 seul `<footer>` par page (pied KYW), `ci=1` partout, `landmark-no-duplicate-contentinfo` absent | confirmé |
| F2-2 insécables | corrigé (« 0 espace ordinaire ») | 5 à 7 U+00A0 par page, accueil, le-domaine, reservation, 404 à 0 écart ; **histoire : 2 espaces ordinaires restent** (« La DH, 19 avril 2013 : La Bergerie… », « L'Avenir, 14 juin 2017 : Lisa et… ») | partiel, voir F2-1 ci-dessous |
| F2-3 détails non prouvés | corrigé | 0 occurrence de « laissé son nom », « quelques minutes », « demi-heure », « respirer », « Hébergement sur place », « nuit sur place » ; « près de », « environ 30 minutes » ; « Lives-sur-Meuse » vient de l'adresse du dossier ; « caves à vin, brocantes, loisirs » viennent de `site-actuel/infos.json` | confirmé |
| F2-4 répétitions | corrigé en partie | accueil : bloc « Sur place » réduit à une phrase + renvoi (lisible, capture `home-sur-place-1440/390`) ; reservation : paragraphe piscine retiré. **le-domaine : le contenu est encore dit deux fois** (voir F2-2) | partiel |
| F2-5 poids | corrigé en partie | dist commité 15 Mo, 0 JPEG ; 5 webp restent entre 340 et 430 Ko (`01-facade`, `07-ceremonie`, `09-sortie`, `10-jardin-bancs`, `15-bassin` x2) ; recompression q55 sans artefact visible à 100 % (`webp100.png`) ; **mais le dossier de travail est de nouveau non purgé** | partiel, voir F2-3 |

Faits clients re-vérifiés contre `donnees.json` et `dossier.md` : nom, adresse, tél. 0493 86 10 29, e-mail, 20 € la journée piscine sur réservation, piscine chauffée d'avril à octobre, visite de 30 min, presse DH 2013 et L'Avenir 2017 : 0 faux, 0 invention, aucun chiffre, avis ou horaire ajouté.

## Scores /10
- Design 7,5 : tenue sur 5 pages, bloc « Sur place » de l'accueil désormais sobre (une phrase sur sable, plongeuse pleine largeur dessous) ; pages histoire et reservation toujours peu fournies (`hist-presse`, `resa-avant`).
- Usabilité 7 : 0 cible < 24 px, focus et menu inchangés, appel et visite à portée ; bouton de réservation toujours vers `bergerielives.be/reservations` (F3-5 d'origine).
- Créativité 7 : concept du Clos inchangé et intact (battants, cadres d'angle, 404 de la barrière).
- Contenu 7,5 : détails non prouvés retirés, répétitions réduites ; reste la redite de le-domaine et la ponctuation de la presse.
- Technique 8 : 0 erreur console, 0 requête en échec, 0 débordement (sw = cw), axe 0 violation sur 10 cas, reduced-motion sans texte caché, LCP mobile 1228/1288 ms (accueil) et 1472/1476 ms (le-domaine), CLS 0,014 et 0,005 (CPU x4 + 4G, deux passes).

## Findings (nouveaux ou restants)

### F2 (mineur)
- **F2-1 · 2 espaces ordinaires avant « : » sur la page histoire** (HTML brut, regex `[^\s >] [:;?!»]`) : `src/pages/histoire.astro:20`, `<strong>{p.media}</strong>, {p.date} : {p.titre}`. La révision annonçait 0. Correction : U+00A0 avant `:` dans ce gabarit (`{p.date}&nbsp;: {p.titre}`).
- **F2-2 · le-domaine répète encore ses équipements** (texte extrait du dist, `dom-chambres-1440` et `dom-hotes-1440`) : sous « Chambres », le paragraphe cite piscine, sauna, jacuzzi et petit déjeuner, la liste cite wifi et cuisine partagée ; la section « Pour tous les hôtes » plus bas redonne piscine, jacuzzi et sauna, petit déjeuner bio, cuisine partagée et wifi (5 lignes sur 5 déjà dites). « Pour tous les hôtes » apparaît aussi deux fois (surtitre et valeur de « Jacuzzi et sauna extérieurs »). Correction : retirer la liste wifi / cuisine de la section Chambres (ou le paragraphe d'équipements) et remplacer la valeur « Pour tous les hôtes » du jacuzzi par une donnée du dossier (« Extérieurs » ou rien).
- **F2-3 · Régression de poids dans le dossier de travail** : `dist/bergerie-lives/awwwards/` du dossier de travail (24 Mo, 23 JPEG, webp non recompressés) diffère du commit ; la purge est une étape manuelle non versionnée (REVISION-1, « Piège »). Un `git add dist/` ou un `pnpm index` suivi d'un commit large republierait ce poids (stockage Vercel). Correction : versionner l'étape de purge et de recompression dans le script de build, ou restaurer le dossier de travail (`git checkout -- dist/bergerie-lives/awwwards`) avant tout commit ; recompresser en plus les 5 webp > 300 Ko restants.

### F3 (finition, non traités par la révision, inchangés)
- **F3-1** en-tête mobile 390 px sur deux lignes (« La Bergerie de / Lives »).
- **F3-2** reservation : `02-cour-domaine` 489 px de large pour 671 px affichés à 1440 (cran 960w absent).
- **F3-3** le-domaine : `17-chambre-boisee` encore affichée deux fois (cadre agrandi puis petit cadre, mêmes alt), `dom-chambres-1440/390`.
- **F3-4** histoire : La DH et L'Avenir cités sans lien vers les articles (URL dans `donnees.json`).
- **F3-5** « Réserver une chambre (site officiel) » vers une page décrite comme vide (non testable ici, pas de réseau).
- **F3-6** « contraste à vérifier » d'axe non tranché sur les libellés dorés minuscules : après défilement et repos, axe complet ne remonte plus aucune violation (0 sur 10 cas) ; point clos sauf mesure pixel.

### Faux positifs écartés
- « 404 » du QA (réponse brute de `serve.mjs`, 1 serious) : la vraie `404.html` a 0 violation, lang fr, h1, noindex, mention.
- WARN sitemap / robots d'`audit.mjs` : sitemaps présents dans le dist.
- Chevauchement accueil 390 px entre « Sortie de cérémonie » et « fleurs de table » (265 x 24 px) : collage voulu.
- `noindex, nofollow` : conforme au prompt de production (§ 3.3).

## Ce qui est bien (à ne pas casser)
1. Le concept « Clos » tenu jusqu'à la 404, aucun mouvement ni contenu perdu par la révision ; reduced-motion sans texte caché.
2. Accessibilité propre : axe à 0 sur 10 cas, un seul pied `contentinfo`, `h1` unique, `lang="fr"`, `aria: 'none'` de SplitText sans effet de bord sur la lecture.
3. Honnêteté des données et perf : rien d'inventé, bloc « Sur place » allégé sans perte, LCP mobile ~1,2 à 1,5 s, CLS < 0,02, 100 liens et srcset sans mort.
