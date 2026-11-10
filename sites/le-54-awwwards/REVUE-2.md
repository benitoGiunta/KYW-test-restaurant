# Revue awwwards · Le 54 · passe 2
Verdict : A_CORRIGER (0 F0, 0 F1, 2 F2, 2 F3)

Lecture en une ligne de l'idée du site : une salle de nuit dont le plan de 34 places, dressé à l'ouverture, sert de signature, de registre dans le pied de page et de champ « couverts » ; sobre, serif de grande taille, accent bleu émail.

Scores /10
- Design 8 : le mur de photos tient enfin (images qui couvrent leur cadre à 1440, 768, 390 px) ; une légende illisible sur la photo de salle à 390 px (F2-1) retient la note.
- Usabilité 8 : menu mobile `<dialog>` ouvert, `aria-expanded="true"`, 5 liens (dont `tel:`), Échap ferme et rend le focus au bouton « Menu » ; 0 cible < 24 px sur 5 pages x 3 largeurs.
- Créativité 8 : plan unique réutilisé à bon escient, transition bleue entre pages (`d-90-transition-*`), sans GL.
- Contenu 8 : textes de la passe 1 neutralisés, « trente-quatre » une fois par page ; reste un alt non prouvé (F2-2).
- Technique 9 : build OK, 0 erreur console, 0 requête en échec, 0 violation axe, 0 débordement, LCP desktop 96 ms, mobile 992 ms, CLS 0 (QA-revue2.md, accueil).

Preuves de cette passe : `dist` (04:15) postérieur à `src` (`find -newer` vide) et captures de QA-revue2 (04:19) postérieures au `dist`, donc réutilisées. Script maison (axe-core de node_modules, console, requêtes, débordement, balises, cibles, cadres du mur) : accueil, carte, histoire, réservation, 404.html à 1440 et 390 px, accueil et carte à 768 px, défilement complet ; serveur 4781 arrêté par `kill`. Le résultat d'`audit.mjs` du QA est invalide (serveur arrêté, journal écrasé) : non utilisé, remplacé par le script maison.

## Vérification des corrections de REVISION-1.md

| id | annoncé | verdict | preuve |
|---|---|---|---|
| F1-1 mur de photos | corrigé | **confirmé** | chaque `img` couvre son `figure` : accueil 1440 [437x729 → 454x758], [554x369 → 576x384], [319x319 → 332x332], [437x291 → 454x303], [437x327 → 454x340] ; 768 et 390 idem (358x448 → 372x465, 358x239 → 372x248…) ; 0 cadre non couvert sur 5 figures x 3 largeurs x 2 pages ; `scrollWidth` = fenêtre ; planche `home/planche.png` (d-05, m-04) : plus de blocs ardoise |
| F2-1 « le soir » | corrigé | **confirmé** | texte rendu : « La salle, tables dressées. » ; seule occurrence de « le soir » : « 20 h le soir » (dernières commandes, donnée du site client) |
| F2-2 texte inventé | corrigé | **confirmé** | 0 « Le geste avant », 0 « reste petite » dans `dist` ; histoire : « En cuisine. » et « La carte suit les saisons et se renouvelle souvent. » (dossier : carte « renouvelée au fil des saisons ») |
| F2-3 créneaux | corrigé | **confirmé** | pied (4 pages + 404) : « Midi, 12 h à 14 h / Soir, 18 h 30 à 21 h / Fermé le mardi et le mercredi, et le samedi midi / Créneaux à confirmer » ; réservation : « Créneaux à confirmer » ; lundi « Midi et soir (à confirmer) » ; dernières commandes 13 h / 20 h conformes à `donnees.json` |
| F2-4 alts | corrigé | **partiel** | bols : « purée et copeaux » conforme ; tartare sans caviar conforme ; mais l'alt du velouté (`photos.ts:31`) affirme « morceau de homard » alors que le `sujet` dit « homard à confirmer » (F2-2 ci-dessous) |
| F3-1 typeCuisine | corrigé | **confirmé** | `servesCuisine` = « Cuisine de saison et de marché » |
| F3-2 « trente-quatre » | partiel | **confirmé, acceptable** | 1 occurrence en toutes lettres par page (accueil, histoire, réservation, 404) et 0 sur la carte ; chapeau de réservation en `.nw`, 2 lignes à 1440 px sans coupure « trente- / quatre » |
| F3-3 contraste | non traité | **non résolu, devient F2-1** | pixels échantillonnés, voir ci-dessous |

Mentions de pied de page et noindex (5 pages x 2 largeurs) : `robots noindex, nofollow` (conforme au prompt § 3.3), « Maquette KYW, certaines données sont illustratives » présente, 1 seul logo KYW, 1 `h1`, 1 `main`, 1 `footer`, `lang="fr"`, 1 JSON-LD, titres et descriptions uniques. Liens externes : Facebook, Instagram et page de contact conformes à `donnees.json` ; aucun tiret cadratin ni apostrophe droite dans le texte rendu ; pas de tutoiement ; reduced-motion : 0 texte à opacité < 0,9 sur accueil, carte, histoire, réservation.

## Findings

### F2 (mineur)
- **F2-1 · Légende illisible sur la photo de salle à 390 px** (`src/styles/site.css:98`, `.salle figcaption`). Texte `rgb(236, 233, 226)` 13 px avec seule `text-shadow: 0 1px 8px #000`. Mesure : capture d'élément avec et sans le texte (`visibility: hidden`) à 390 px ; les 46 premiers px sur 152 de la légende (« La sal ») sont posés sur la nappe blanche (luminance de fond jusqu'à 0,69, contraste 1,2:1 au pire, 1,8:1 au 90e centile). À 1440 px le fond est noir (17:1). Axe ne le voit pas (« contrastNeedsReview »). Correction attendue : sur la photo mobile, soit décaler la légende sous l'image (fond de page, comme `.paire__media figcaption`), soit déplacer `object-position` pour sortir la nappe de la zone, soit poser un voile sombre local (`linear-gradient(to top, #000a, transparent)`) derrière la légende ; remesurer à 390 et 360 px.
- **F2-2 · Alt avec un ingrédient non établi** (`src/lib/photos.ts:31`) : « morceau de homard » ; le `sujet` de `photos/index.json` est « Velouté mousseux, pièce rouge (homard à confirmer), herbes ». Écrire « Velouté mousseux et pièce rouge dans une assiette creuse blanche. ».

### F3 (finition)
- **F3-1** `photos.ts:32` : « dans un bol brun » n'est pas dans le `sujet` (« Dessert glacé aux amandes effilées ») ; écrire « Dessert glacé aux amandes effilées. ».
- **F3-2** Non vérifié en situation : menu mobile sur vrai téléphone (clip-path du `<dialog>`, déjà noté dans ETAT.md) ; ouverture et fermeture validées en émulation seulement.

## Ce qui est bien (à ne pas casser)
1. Le mur de photos corrigé : `.mur picture { display: block; width: 100%; height: 100% }` fait tenir les cadres sur toutes les largeurs, `scale: 1.04` sans bord vide.
2. Le plan de 34 places cohérent partout (dressage, pied, champ « couverts ») et honnête sur ce qu'il ne prouve pas (« Plan illustratif », créneaux « à confirmer »).
3. Hygiène technique intacte après révision : 0 erreur, 0 axe, 0 débordement, menu mobile accessible, reduced-motion complet.
