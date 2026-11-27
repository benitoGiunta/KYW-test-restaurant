# Revue portfolio · La Bergerie de Lives · passe 2

Verdict : A_CORRIGER (0 F0, 0 F1, 4 F2, 4 F3)

Lecture en une ligne de l'idée du site : une maison d'hôtes et un domaine de mariage vert sapin, hero photo plein écran, filet rose et monogramme BL qui se remplit au scroll, grands chiffres rose poudré en filigrane (idée inchangée depuis la passe 1).

Scores /10
- Design 7 : cohérence sapin et rose, hero d'accueil fort ; pages Chambres, Séminaires et Contact gardent un hero texte seul avec demi-écran vide à droite à 1440 px (`brv2-P1440a`, `brv2-P1440b`), mais la page Chambres montre maintenant la chambre en grand.
- Usabilité 8 : 0 lien mort (8 internes, tel, mailto, 2 presse), bande de galerie atteignable au clavier (`tabindex=0 role=region aria-label="Galerie du mariage"`), curseur « Voir » retiré, 0 cible < 24 px.
- Créativité 6 : signature discrète, motif eyebrow + titre + chiffre fantôme encore sur presque chaque section.
- Contenu 7 : plus aucune attribution inventée ni note de recherche visible ; restent une inférence non marquée (séminaires), des répétitions sur Chambres et la typographie française non traitée.
- Technique 8 : 0 erreur console, 0 requête en échec, 0 débordement, axe complet à 2 positions de défilement = 0 violation sur 7 pages x 1440 et 390, CLS 0 ; LCP mobile de Chambres à 3,0 s.

Preuves : `scripts/q.sh brv2-mesure` (journal `.logs/brv2-mesure.log` : axe-core de node_modules, console, requêtes, débordement, balises, 7 pages dont `404.html` x 1440/390), `brv2-cible` (LCP/CLS CDP CPU x4 + 4G lente en 2 passes, reduced-motion, liens), extraction de texte du `dist/` confrontée à `donnees.json`, `dossier.md` et `site-actuel/`, planches `brv2-P1440a/b.png`, `brv2-P390.png` (scratchpad) et planche d'accueil du QA. `dist/` (08:38) postérieur à tout `src/` (`find -newer` vide), captures du QA postérieures au dist : réutilisées. Le QA ne couvre que 3 pages et sa « 404 » est la réponse brute de serve.mjs ; ses WARN robots/sitemap sont faux (présents dans `dist/`).

## Vérification des corrections annoncées par REVISION-1

| id | verdict | preuve |
|---|---|---|
| F1-1 | confirmé | `/le-domaine/` : « Leur idée tient en peu de mots : vous recevoir chez eux » (site actuel : « nous vous recevons chez nous »), plus de « loger ou louer » |
| F1-2 | confirmé | plus de « table ouverte » ; la DH et L'Avenir cités par leur titre seulement, « l'ancien restaurant du lieu » conforme à la DH 2013 du dossier |
| F1-3 | confirmé | h1 = « Chambres d'hôtes », « Votre mariage », « Le domaine » (nom accessible = textContent), filigrane « 3 » retiré de Chambres ; « 3 » de l'accueil = piscine, sauna, jacuzzi (prouvé) |
| F1-4 | confirmé | filigrane 2017 retiré de `/le-domaine/`, axe 0 violation 1440 et 390 |
| F1-5 | confirmé | `.galerie__bande` : tabindex 0, role region, label ; axe 0 violation à 390 |
| F2-1 | confirmé | grep texte : plus de « non publié », « annuaire », « 150/250 » ; « Tarifs et disponibilités sur demande » + badge « information à compléter » ; capacité « à préciser avec la maison » + « à confirmer » ; colonne horaires retirée du pied |
| F2-2 | partiel | « cadre d'exception » retiré, chapô et paragraphe de Chambres distincts ; mais voir F2-4 ci-dessous (petit déjeuner et piscine encore répétés) |
| F2-3 | confirmé | plus de photo de véranda sous « petit déjeuner » (bloc supprimé) |
| F2-4 | confirmé | `capitalize` retiré : « Piscine extérieure chauffée », « Sauna et jacuzzi », « La Citadelle de Namur » |
| F2-5 | partiel | activités et accueil nettoyés (« caves à vin », « plus belle citadelle d'Europe, selon le site de la maison ») ; reste l'inférence séminaires (F2-3 ci-dessous) |
| F2-6 | confirmé | un seul `contentinfo` par page, axe sans `landmark-no-duplicate-contentinfo` ni `region` sur 14 cas |
| F2-7 | confirmé | `data-cursor="Voir"` absent du dist |
| Bonus F3 | confirmé | « nœud », « vœux » ; 404 « Page introuvable » ; méta Le domaine ; alt tonnelle (« Tonnelle d'automne » non vérifié, non bloquant) |
| F2-8 | reporté, non corrigé | voir F2-2 ci-dessous |

Aucune régression : mention « Maquette KYW, certaines données sont illustratives. », logo KYW (1) et `noindex, nofollow` sur 7 pages sur 7, `lang="fr"`, un seul h1, JSON-LD présent, 0 contenu masqué en reduced-motion.

## Findings

### F0 / F1
Aucun.

### F2 (mineurs)

- **F2-1 · Performance · `/chambres/` LCP mobile 3,0 s** (3028 et 2972 ms en deux passes CDP CPU x4 + 4G lente, `brv2-cible`, QA : 3036 ms ; seuil 2,5 s). Le LCP est une image `loading="lazy"` du haut de page (`chambre.webp` 64 Ko ou `piscine.webp` 81 Ko, `chambres.astro`) ; l'accueil est à 1,37 s. Correction : `loading="eager"` + `fetchpriority="high"` sur la première photo visible, ou hero de page avec image préchargée.
- **F2-2 · Pages intérieures pauvres (F2-8 de la passe 1, reporté).** Chambres, Séminaires et Contact : hero texte seul avec demi-écran vide à droite à 1440 px (`brv2-P1440a` vignettes 1 et 5, `brv2-P1440b` vignette 1) ; la page Chambres n'a toujours qu'une photo de chambre. Correction : `chambre.webp` en grand à droite du hero Chambres, `veranda-salon` sur Séminaires, une photo du domaine sur Contact.
- **F2-3 · Inférence non marquée · `site.ts` séminaires.** « Plusieurs salles, dont une véranda vitrée sur le jardin » (chapô et liste) et « Piscine, sauna et jacuzzi pour la pause » : le site actuel dit « différentes salles et formules » sans nommer la véranda ni lier la piscine aux séminaires (ETAT.md l'admet « à confirmer », rien ne le dit à l'écran). Correction : « Plusieurs salles et plusieurs formules selon vos besoins » ou badge « illustratif » sur la véranda ; retirer la ligne piscine ou la marquer.
- **F2-4 · Répétitions sur Chambres.** Petit déjeuner bio dit trois fois (chapô du hero, paragraphe « Les chambres », « Services inclus » ; plus l'accueil), piscine/sauna/jacuzzi trois fois (bloc « Piscine, sauna et jacuzzi », « Services inclus » x2 lignes) et journée piscine répétée dans le bloc tarifs. Correction : garder le bloc services seul et un paragraphe « Les chambres » qui dit autre chose (wifi, cuisine partagée), ou retirer la ligne.

### F3 (finitions)

- **F3-1 · Typographie française non traitée.** 0 espace insécable sur 7 pages ; 2 à 4 espaces ordinaires avant « : » et « ? » par page (`spB` : 2 accueil, 2 chambres, 2 mariage, 4 le-domaine ; ex. « Journée piscine : 20 € »). Correction : U+00A0 par Python sur `site.ts` et les `.astro`.
- **F3-2 · Détails de données.** « Musée Trema » (le site actuel écrit « Tréma », `site.ts:141`) ; « Lisa et Christophe » (titre de L'Avenir, conforme au dossier) coexiste avec « Lisa et Martin » du site actuel sans mention : ETAT.md disait ne pas afficher les prénoms. Correction : « Tréma » ; garder le titre tel quel et noter la divergence dans le rapport.
- **F3-3 · Mobile, « Services inclus » à 390 px.** La liste de définitions donne ~⅓ de largeur à la valeur (« Un petit déjeuner varié et bio, servi en… » sur 4 lignes, `brv2-P390`). Correction : empiler terme et valeur sous 480 px.
- **F3-4 · Poids et slop résiduel.** 9 photos > 380 Ko (`ceremonie-assemblee` 557 Ko, `ceremonie-jardin` 510 Ko, `facade` 453 Ko), accueil ~2,2 Mo ; eyebrow + chiffre fantôme sur presque chaque section (1, 3, 20, 30, 2017).

## Ce qui est bien (à ne pas casser)

1. Hero d'accueil (façade, titre Boska en capitales, bouton rose), filet rose et monogramme BL ; bascule mobile pensée (menu + « Nous écrire » toujours visibles).
2. Rigueur des faits : adresse, téléphone, e-mail, 20 €, 30 min, 2017, avril à octobre, wifi, petit déjeuner bio conformes au dossier ; aucune note d'audit, aucun avis, tarif ou horaire inventé ; manques marqués « information à compléter » / « à confirmer ».
3. Technique propre : 0 violation axe, 0 débordement de page, CLS 0, reduced-motion lisible, un seul `contentinfo`, 404 « Page introuvable » designée avec lang, title et h1.
