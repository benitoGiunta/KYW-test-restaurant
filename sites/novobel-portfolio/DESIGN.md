# DESIGN : Novobel, variante portfolio (gabarit Ardoise détourné)

## Constat préalable
Novobel n'est pas un restaurant : c'est une SRL de construction et de rénovation à Namur (BCE 0726559494, `data/restaurants/novobel/dossier.md`). Décision (hypothèse, sans question) : produire un site d'entreprise de rénovation plutôt que d'inventer une activité de restauration. Aucun contenu restaurant (carte, horaires, réservation, avis) n'est fabriqué.

## Choix du gabarit (matrice sur 5)
| Gabarit | Positionnement | Ambiance / palette | Contenu dispo | Structure (listes, projets) | Signature utile | Total /25 |
| --- | --- | --- | --- | --- | --- | --- |
| ardoise | 3 (liste de lignes = projets) | 5 (anthracite + jaune = identité actuelle de Novobel) | 4 | 4 (4 projets, 6 offres, 4 étapes) | 3 | 19 |
| comptoir | 2 | 3 (blanc, silence) | 3 | 2 | 2 | 12 |
| cahier | 3 (plans, annotations) | 3 | 2 | 3 | 2 | 13 |
| braise / nocturne / velours | 1 | 2 | 2 | 2 | 1 | 8 |
Retenu : **ardoise**. Palette identique à l'existant (gris anthracite, jaune acide), mise en page en lignes tabulaires adaptée à une liste de projets et d'offres, peu de photos exigées (le dossier n'a que des photos de stock). Gabarit déjà utilisé trois fois (le-royal, partage, le-felicien) mais aucun gabarit libre ne colle autant au secteur ; `gabarits/UTILISATION.md` non modifié (consigne : ne pas toucher à `gabarits/`), à mettre à jour par la session mère.

## Concept
Le site est un **tableau de chantier** : le nom en deux lignes géantes (Novo / bel), des lignes à filets (projets, offres), quatre étapes numérotées de la conception à la livraison (reprend « Livraison, délais respectés » du site actuel), des sections claires pour la maison. Craie jaune pour l'accent. Typo : Cabinet Grotesk 800 (titres capitales), Schibsted Grotesk (texte).

## Sections
- Conservées : hero nom en deux lignes ; lignes à filets (devenues Projets et Offres) ; sections claires (devenues La maison) ; barre basse fixe ; aperçu flottant au survol d'un projet ; pied KYW.
- Retirées : barre d'état calculée (aucune horaire connue), suggestion du jour, onglets midi/soir, carte, formules, bon cadeau, salle, réservation Zenchef, avis.
- Ajoutées : statistiques calculées (projets, logements = 4+14+6+4 = 28, étapes), liste des étapes (`.etape`), bandes photo pleine largeur (`.bande`), carrière, formulaire de devis de démonstration (ouvre la messagerie), repères d'entreprise (BCE).
- Composants créés : `Img.astro` (srcset limité aux variantes générées), `Projets.astro`. Styles : `src/styles/site.css`.

## Pages
Accueil, Services, Projets, La maison, Carrière, Devis gratuit (contact), 404. Le blog « Articles » du site actuel est sans contenu au dossier : non repris.

## Données et placeholders (`src/data/site.ts`)
Réels (dossier) : nom, adresse, téléphone, e-mail info@novobel.com, 4 projets, 6 offres, 4 étapes de service, valeurs, devis gratuit sous 24 h, administrateurs (BCE). Non prouvés : photos (stock probable ou rendus, toutes marquées « image illustrative », jamais attribuées à un projet), horaires (absents, mention « à communiquer »), équipe (texte d'attente), nombre d'années d'activité (« 25 ans » contredit la BCE de 2019 : non affiché), avis (aucun).

## Art direction
Accent `#e9d064` conservé (proche du jaune du site actuel), fond `#2a2e2d`. Favicon : N jaune sur anthracite. OG : photo de mansarde recadrée 1200×630. Photos WebP 800 et 1600 px (`sharp`), hero texte seul (LCP texte).

## Adéquation estimée : 70 %
1. Palette et ton alignés sur l'identité existante ; 2. contenu intégralement tiré du dossier, sans invention ; 3. structure lignes/étapes adaptée à des projets et des offres.
Limites : photos de stock, pas de vraies photos de chantiers de Novobel, pas de logo vectoriel intégré, pas d'horaires ni d'équipe, détournement d'un gabarit pensé pour la restauration (motion de `setup.ts` conservé tel quel, non testé dans cette phase).
