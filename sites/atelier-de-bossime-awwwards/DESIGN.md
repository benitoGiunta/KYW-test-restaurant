# L'Atelier de Bossimé : variante awwwards (DESIGN.md)

Agent « variante-awwwards », 31/10/2026. Entrée : `data/restaurants/atelier-de-bossime/` (dossier.md,
donnees.json, 25 photos et un logo). Sortie : ce paquet, puis `dist/atelier-de-bossime/awwwards/`.

## Brief (phase 0)

- **Sujet** : L'Atelier de Bossimé, ferme gastronomique de Ludovic Vanackere, rue Bossimé 2B à Loyers (Namur).
  Ouvert en 2011 (selon le site du client) par le chef à 20 ans, dans un coin de la ferme familiale ; salle
  dans un ancien fenil rénové en matériaux durables, cuisine ouverte, baies vitrées sur les jardins ; potager
  bio d'environ 45 variétés ; étoile verte du Guide MICHELIN. Devise : « Remettre la ferme au milieu du village ».
- **Public** : habitués namurois du lunch (lundi à vendredi), tables du soir et occasions (couples, familles),
  gastronomes de Bruxelles, Liège et Charleroi (30 à 40 minutes de route), groupes et entreprises (60 assis).
- **Métier du site** : faire réserver (lien externe Zenchef du client, téléphone, e-mail), faire comprendre la
  carte (des menus comptés en « Moments », pas de plats nommés : un livret est remis à table), dire où c'est.
- **Ressources** : 25 photos de qualité (plats vus de haut, salle en briques, fenil, équipe en tabliers
  « Bossimé », façade de nuit, ferme) ; un logo de 270 px (sérif aubergine, trois accents corail sur le e).
- **Langue** : français, vouvoiement. **Contraintes** : site statique, pas de backend, `base`
  `/atelier-de-bossime/awwwards/`, `noindex`, pied de page KYW.

### Faits manquants et hypothèses (reprises dans `src/data/site.ts` et RAPPORT.md)

1. Les trois piliers du logo : le site du client dit seulement « trois accents, un par pilier de la
   durabilité ». La lecture « la terre, les gens, la maison » (environnement, social, économie de la ferme)
   est notre interprétation : `piliersPlaceholder: true`, dite comme une lecture (« nous les lisons ainsi »).
2. Aucun plat nommé (livret à table) : la carte montre les formules et leurs prix réels ; les photos d'assiettes
   sont légendées par ce qu'elles montrent, comme « assiettes passées », jamais comme la carte du moment.
3. Heures de fermeture : seul Michelin les donne (16 h et 23 h 30). Le site affiche « dès 12 h » et « dès 19 h »
   comme le client ; le JSON-LD reprend les heures Michelin.
4. E-mail info@bossime.be : vient de `data/restaurants.json`, non vu sur le site du client (à confirmer).
5. Le portrait n° 18 n'est identifié qu'« à confirmer » : aucune photo n'est légendée « Ludovic Vanackere ».
6. Chiffres contradictoires (40 ou 70 producteurs ; 2010 ou 2011) : on ne cite pas le nombre de producteurs ;
   on garde 2011 (site du client). Gault&Millau sans année (2017 ou 2018 à confirmer).
7. La soirée NeZ ZeN du 22/10/2026 est passée à la date de la maquette : non affichée.

Aucune décision ne justifiait de question au superviseur : une seule lecture plausible (ferme gastronomique
qui veut faire réserver).

## Concept (phase 1)

Trois concepts, trois territoires.

| | A. Les trois accents (nom, identité) | B. Les Moments (système formel) | C. Le potager en rangs (matière du métier) |
|---|---|---|---|
| Idée | Le é de Bossimé porte trois accents, un par pilier ; le site s'écrit avec ces trois traits | Le site se compte comme la carte : en Moments, de 3 à 7 | Chaque page est une planche de potager : sections en rangs semés, la carte en planches |
| Règle de mise en page | trois lignes obliques fortes ; tout ce qui entre suit l'angle de l'accent | une page = un menu ; un compteur de Moments en coin | rangs horizontaux réguliers, étiquettes de semis |
| Verbe | se posent d'un trait, en biais | se servent l'un après l'autre | poussent du bas |
| Voix typo | grotesque massive en bas de casse, comme un mot écrit ; texte sobre | chiffres tabulaires géants | étiquettes manuscrites |
| Palette | aubergine et corail du logo, grès des assiettes | ardoise | terre, vert de fane |
| Signature | les trois accents du grand é s'allument un à un, chapitre par chapitre (narration collante, motion.md « Pinned chapters » en hero sticky de patterns.md § 2) | un sélecteur 3/4/5/7 qui redresse la page | les rangs se sèment au défilement |
| Capture | le mot « bossimé » géant, trois traits corail au-dessus du e | « Moment 3 sur 5 » en grand | une planche de légumes étiquetés |
| Ancre | le logo réel (trois accents sur le e, un par pilier de la durabilité) | les menus réels « 3, 4, 5, 7 Moments » | le potager d'environ 45 variétés (mais la liste des variétés est inconnue) |
| Test de l'échange | ne tient pour aucun autre restaurant (le é à trois accents est à eux) | tient pour tout restaurant à menus | tient pour toute ferme-table |
| O / F / Fe / P | 4 / 5 / 4 / 1 | 3 / 4 / 4 / 3 | 3 / 3 / 3 / 4 |

**Choix : A.** Seul concept qui ne peut pas déménager (portabilité 1), et il porte le discours réel du client
(durabilité, étoile verte) dans un objet graphique qu'il possède déjà. **Volé à B** pour la carte : les Moments
se comptent en accents (un menu 5 Moments s'écrit avec cinq traits). Aucun des trois ne reprend les exemples de
concepts.md (pas de braise qui refroidit, pas de pavage, pas de mise en place, pas de cadre, pas de solde, pas
de phrase unique). Le concept survit hors du hero : en-tête (les accents marquent la lecture de la page),
carte (Moments en traits), réservation (trois façons de réserver, trois accents), histoire (trois chapitres),
404 (le mot a perdu ses accents, tombés au pied de la page), pied de page (le mot entier, accents posés).

### Concept Card

```
Idée :         Bossimé s'écrit avec trois accents, un par pilier ; le site entier s'écrit avec ces trois traits.
Métaphore :    l'écriture : un accent se pose d'un trait et change la façon dont un mot se prononce.
Signature :    « Trois accents » : le grand é reste à l'écran pendant trois chapitres (la terre, les gens,
               la maison) et chaque chapitre pose son accent, d'un trait corail (hero sticky de
               patterns.md § 2 + chapitres de motion.md « Pinned chapters », piloté par src/motion/accents.ts).
Émotion :      calme et précis : un mot écrit à la main d'un geste sûr, une ferme qui sait ce qu'elle fait.
Verbe :        « se posent d'un trait, en biais » : tout entre selon l'angle de l'accent (62°) et s'arrête net.
Capture :      le mot « bossimé » en bas de casse géante, trois traits corail au-dessus du e, l'assiette verte à côté.
Ancre :        le logo réel du client : trois accents sur le E, un par pilier de la durabilité.
Théâtre :      loader : non (restaurant, le premier frame est le mot lui-même, peint dès le premier rendu).
               GL : non (les photos du client suffisent ; un shader n'ajouterait rien au geste d'écrire).
```

## Système d'art direction (phase 2)

### Palette (5 rôles, sources réelles)

| Rôle | Hex | Source | Contraste |
|---|---|---|---|
| `ground` grès | `#E3E5DE` | l'émail gris vert des assiettes de grès (photos 08, 20) | fond |
| `ink` aubergine | `#2A1622` | le mot du logo, assombri | 13,4:1 sur grès |
| `muted` lie | `#5C4A55` | aubergine délavée | 6,4:1 sur grès |
| `line` | `rgb(42 22 34 / 0.16)` | trait d'encre léger | traits seulement |
| `accent` corail | `#D2441C` | les trois accents du logo, assombris pour tenir 3:1 | 3,6:1 sur grès, 3,7:1 sur aubergine : traits et anneau de focus, jamais du texte courant |
| `curtain` | `#2A1622` | l'aubergine pleine | rideau et sections de nuit (texte grès 13,4:1, texte doux `#D9CFD3` 11,2:1) |

**Défaut n° 1 (crème + sérif contrasté + terracotta)** : écarté. Le fond est un gris vert froid (grès), pas une
crème ; aucune sérif ; le corail n'est pas une couleur d'ambiance mais l'encre des seuls accents, prise au logo.
Pas d'acide sur noir, pas de dégradé, pas de verre, pas d'eyebrow en capitales espacées au-dessus des titres,
pas de 01/02/03 décoratifs (les chiffres des chapitres sont des années ou des comptes réels).

### Typographie

- **Display** : Cabinet Grotesk 800 (Fontshare `cabinet-grotesk`), en bas de casse : le mot « bossimé »
  s'écrit comme on l'écrit à la main, sans majuscule de logo. Interlettrage : `-0.055em` en méga, `-0.035em` en
  xl, `-0.02em` en l. Interligne 0,86 à 1. Cabinet Grotesk 500 pour les sous-titres.
- **Texte et UI** : General Sans 400 / 500 (Fontshare `general-sans`), 17 px, interligne 1,55, mesure 62ch.
  UI à 13 / 14 px en 500, chiffres tabulaires pour prix et heures.
- 4 fichiers woff2 auto-hébergés (`font.mjs`), 2 préchargés (Cabinet 800 et General 400). U+202F absent des
  deux familles : espaces insécables U+00A0 seulement.
- Échelle (tokens.css) : `--t-mega` clamp(5rem, 0.6rem + 22vw, 21rem) ; `--t-xl` clamp(2.6rem, 1.3rem + 5.6vw,
  6.5rem) ; `--t-l` clamp(1.7rem, 1.2rem + 2.1vw, 3.1rem) ; `--t-m` ; `--t-body` ; `--t-s` 0,875 rem ; `--t-xs` 0,8125 rem.

### Grille et rythme

- 12 colonnes desktop, 6 au téléphone, gouttière fluide. Trois lignes fortes : colonne 1 (titres, mot géant),
  colonne 5 (textes courants), colonne 9 (prix, horaires, actions). Tout texte courant commence sur l'une des trois.
- Humeurs d'espacement : `--serre` (8u), `--normal` (14u), `--aere` (24u), plein écran (hero, chapitres).
- **Forme** : angles vifs partout (`--radius: 0`) ; seuls les traits d'accent ont des bouts arrondis.

### Langage de mouvement

- Easing de l'engine : `ease.out` (révélations), `ease.inOut` (rideau), `ease.soft` (hovers). Durées du tableau
  Timing : hover 0,3 à 0,45 s, lignes 1,1 s avec 0,07 s de décalage, images 1,3 s, rideau 0,8 / 0,9 s.
- **Traduction du verbe** : les photos se révèlent par un `clip-path` dont le bord est oblique à l'angle de
  l'accent (`data-biais`, src/motion/biais.ts) ; les accents se tracent par `stroke-dashoffset` ; le rideau de
  page est une grande bande aubergine inclinée qui passe en biais, avec trois traits corail qui s'y posent.

### Rôles de hover (trois traitements)

1. **CTA** (« Réserver », « Appeler », « Écrire ») : un aplat aubergine incliné entre en biais depuis la gauche
   et couvre le bouton ; le texte passe en grès. Touch : `:active`. Mouvement réduit : aplat immédiat.
2. **Navigation et liens de rubrique** : un petit accent corail se trace au-dessus du mot (comme sur le é) ;
   la page courante garde son accent.
3. **Lignes de carte et images** : les traits de Moments se redressent et la photo d'aperçu suit le pointeur
   (desktop) ; vignettes en ligne au toucher. Liens dans le texte : soulignés au repos, le trait s'épaissit.
   Liens utilitaires (réseaux, légal) : couleur et soulignement.

### État de repos

Les accents bougent : chaque trait oscille de 1 à 2 degrés autour de son pied, comme une pousse au vent
(les trois traits du logo ressemblent à trois pousses), et le pointeur donne la direction du vent (±4°). Un
`setProperty("--vent")` par frame sur les seuls groupes d'accents visibles, depuis le ticker GSAP (src/motion/accents.ts), à zéro en
mouvement réduit, coupé quand l'onglet est caché (le ticker GSAP s'arrête).

### Plan de composition

Accueil :
```
[hero : poster + paire]      bossimé (méga, col 1-12, accents corail sur le e)
                             phrase 18 mots (col 1-5) | assiette verte (col 7-12) | Réserver / La carte
[statement]                  « Remettre la ferme au milieu du village. » t-xl col 1-10, texte col 5-9
[narration collante]         grand é sticky (col 1-5) | trois chapitres photo + texte (col 7-12)
[données réelles]            2011 / 20 ans / 8 tables / 45 variétés / 60 places, chiffres géants tabulaires
[mur]                        six assiettes de tailles différentes, cellules vides voulues, légendes
[média pleine largeur]       façade de nuit, horaires courts et Réserver
[pied de page final]         bossimé géant, adresse, horaires, actions, colophon, puis bandeau KYW
```
Carte : hero statement (« La carte se lit en Moments ») + liste index (lunch, menus, boissons) avec traits
de Moments, aperçu au curseur et vignettes en ligne au toucher ; encadré pratique (allergies, carte blanche).
Histoire : hero paire asymétrique (cuisine ouverte) + trois chapitres en paires décalées + statement + équipe.
Réservation : poster « Trois façons de réserver » + trois colonnes (en ligne, téléphone, e-mail) + horaires
en liste + accès et groupes en données.
404 : poster « bossime » sans accent, les trois accents tombés au pied, chemin de retour.

### Mobile 390 px

Le mot géant passe à 26vw et tient sur une ligne ; la photo du hero passe sous les actions ; le grand é des
chapitres devient une bande collante en haut de section (accents de 64 px) au-dessus des chapitres en colonne ;
la liste de carte montre ses vignettes en ligne ; menu plein écran par bouton « Menu ».

### Test de généricité

« Un modèle générique, avec ce brief, atterrirait-il ici ? » Ce qui l'était et a changé :
- Fond crème + sérif + accent brique (piège du restaurant de ferme) → grès gris vert, grotesque massive, corail
  du logo réservé aux accents.
- Hero photo plein écran avec titre centré → le mot est l'image, la photo est une moitié.
- Trois cartes de valeurs (« circuit court, bio, zéro déchet ») → un seul é dont les accents portent ces trois
  piliers, en narration collante.
- Fondu montant sur chaque section → révélation oblique propre au verbe, réservée aux photos.
- Carte en colonnes de plats inventés → formules réelles, comptées en accents ; aucun plat inventé.

## Sur-utilisation de la skill

(Cochée en fin de phase 4, voir plus bas.)
