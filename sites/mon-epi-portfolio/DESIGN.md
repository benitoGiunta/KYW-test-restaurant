# DESIGN, Monepi (mon-epi), variante portfolio

Gabarit retenu : **cahier** (« Cahier du fournil »). Boulangerie artisanale, pas un restaurant : le dossier le signale, la refonte est une vitrine de boulangerie.

## Choix du gabarit

Matrice sur 5 des 15 gabarits lus (FICHE.md) ; les autres écartés sur le seul positionnement (gastronomique, asiatique, bar, scène, brasserie).

| Gabarit | Positionnement | Ambiance | Contenu dispo | Type de carte | Réservation | Signature | Total /30 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| cahier | 4 (boulangeries citées) | 4 (kraft, papier) | 4 (carte longue, composition par ligne) | 5 (sommaire à annotations) | 3 (téléphone) | 4 (écriture tracée) | **24** |
| forno | 3 (four) | 4 | 3 | 2 (pizzas) | 2 | 4 | 18, déjà utilisé (dolce-vita-wepion) |
| verger | 3 | 3 | 3 | 3 | 2 | 2 | 16, déjà utilisé |
| quatre-mains | 2 (duo requis) | 3 | 2 | 3 | 2 | 2 | 14 |
| comptoir | 2 | 2 | 3 | 2 | 2 | 3 | 14 |

Décision : cahier. Non utilisé jusqu'ici (`gabarits/UTILISATION.md`, protégé : à mettre à jour par la session mère). La carte réelle (29 lignes, composition de chacune) alimente le sommaire à annotations en marge, le mur de timbres porte les quatre farines moulues sur place et les deux moulins cités, la photo du four et les mains au travail donnent la matière des polaroids.

## Sections

- Conservées : couverture (étiquette, polaroid), bande signature tracée, sommaire, mur de six timbres, carte postale, fiche de l'équipe, avis en marge, pratique, dos du cahier.
- Retirées : menu du jour par midi, formules (aucune donnée), formulaire de réservation (pas de backend, pas de table), équipe de quatre.
- Transformées : « menu du jour » devient « Au fournil » (trois faits : farine, levain, four ; tampon = prochaine ouverture confirmée, le vendredi) ; « producteurs » devient « farines » ; « commander » (traiteur) devient « points de vente » (quatre adresses citées par le client) ; « réserver » devient « commander » par téléphone.
- Pages : `/`, `/pains/`, `/farines/`, `/boulanger/`, `/commander/`, `/points-de-vente/`, 404.

## Art direction

- Palette : papier, quadrillage, kraft du gabarit ; l'encre « bille » bleue devient un **vert épi** (#35502f, 8:1 sur le papier) ; rouge braise gardé pour les tampons ; marqueur jaune blé.
- Typo du gabarit conservée (Bespoke Slab, Sometype Mono, Caveat pour l'information seulement).
- Photos : 24 clichés du client convertis en WebP (≤ 1800 px), tous en 3:2 ; timbres carrés recadrés par `object-fit`. Favicon : épi dessiné ; OG : photo du four en chauffe.
- Composant modifié : `Plan` (rue Es Fays, schématique), `MenuDuJour` (faits, ouverture confirmée), `Sommaire` inchangé (annotation = composition). `carte.json` tiré de donnees.json par script.
- Copy : français, vouvoiement évité (liste factuelle), aucun tiret cadratin.

## Adéquation estimée : 78 %

1. Le sommaire annoté colle à une carte de 29 lignes dont chaque composition est publiée.
2. Le registre papier et artisanat convient au pain au levain et au four à bois.
3. La signature (écriture tracée) sert des faits vrais (farine, levain, four).

Limites : horaires inconnus hors vendredi, pas de portrait du boulanger, photos toutes en paysage 3:2, pas de photo de l'extérieur ni de la boutique, taux d'extraction et date du four à confirmer.
