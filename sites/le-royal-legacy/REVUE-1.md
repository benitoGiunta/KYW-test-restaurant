# Revue legacy · Le Royal Namur · passe 1
Verdict : A_CORRIGER (0 F0, 1 F1, 3 F2, 4 F3)

Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une page unique sobre, brun foncé et crème, qui pose la façade de la brasserie en demi-écran et met la carte complète (62 lignes, prix en chiffres gras) et les moules jumbo avant le menu des fêtes patronales et les horaires.

Méthode : captures et audit de l'agent captures (`QA-revue1.md`, `.shots-le-royal-legacy-revue1/home/`), planche desktop et mobile lue, texte extrait du `dist/` et confronté à `donnees.json`, `dossier.md` et `site-actuel/carte.txt`. Mesures ciblées en plus (serveur port 4521, PID 824, arrêté) : CLS mobile sous CPU x4 + 4G lente (2 passes), tailles des images, alt, cibles, débordement, console, vraie `/404.html`. Pas de shoot complet relancé.

## Scores /10
- Design 7 : hiérarchie nette et lisible (titres Yeseva, prix en chiffres lining, rubriques à filets), bande brune des fêtes qui rythme la page ; mais la façade du héros est molle (voir F2-1).
- Usabilité 8 : nav à une ligne avec « Réserver » toujours visible, menu téléphone en dialog fonctionnel, 0 débordement (scrollWidth 390 = 390), 0 cible < 24 px, 12 arrêts clavier sans piège, focus visible.
- Créativité 5 : propre mais prudent ; aucune idée visuelle au-delà du héros 50/50 et de la couronne ; la carte est très longue sans respiration (page ~7 écrans d'une même texture).
- Contenu 8 : 62 plats sur 62 conformes à `donnees.json` (script de comparaison, 0 écart), aucune invention non marquée (ardoise à 20 € signalée « à confirmer », photos légendées d'après `photos/index.json`) ; reste de la répétition de coordonnées (F3).
- Technique 7 : build OK, 0 erreur console, 0 requête en échec, axe 0 violation sur la page, JSON-LD Restaurant avec adresse et horaires ; CLS mobile 0,128 et polices TTF sans préchargement.

## Findings

### F1 majeur
- **F1-1 · CLS mobile 0,128 (seuil 0,05, « à améliorer » dès 0,1).** Preuve : QA `report.json` mobile 0,128 ; reproduit à l'identique sur 2 passes sous CPU x4 + 4G lente (`PerformanceObserver layout-shift`, t ≈ 1,55 s) : `DIV.slot` de la façade 467 → 407 px, `SECTION.propos` 760 → 700 puis hauteur du bloc texte 84 → 144 px, lien « Appeler » 359 → 295 px. C'est le changement de police (repli système → Yeseva/Archivo) qui reflue le titre du héros et le texte « À propos » ; sur machine rapide (390 px sans throttle) CLS = 0. Correction : précharger les deux woff2 utilisés au-dessus de la ligne de flottaison (`<link rel="preload" as="font" type="font/woff2" crossorigin>`), ajuster les métriques du repli (`size-adjust`, `ascent-override` sur une `@font-face` de repli) et réserver la hauteur du héros mobile (`min-height`) pour que la façade ne glisse pas.

### F2 mineur
- **F2-1 · Façade du héros agrandie et molle.** Preuve : `d-01-hero.png` (halo bleu circulaire en coin, textures empâtées) ; `facade-1200.webp` fait 806 x 602 px de fichier et s'affiche en 806 x 828 px sur 1440 px (cadre `object-fit: cover`, étirement x1,38 en hauteur ; x2 de densité sur écran Retina) ; la source `08-facade.png` ne fait que 1200 x 896 px. Le fichier nommé « 1200 » ne mesure pas 1200 px de large. Correction : ne pas dépasser le x1 utile (cadre moins haut, ou héros 40/60 avec image 4:3 sans recadrage vertical), régénérer les variantes depuis la source à leur largeur nominale, vérifier l'absence de rééchantillonnage ; au besoin un léger voile ou un grain pour masquer le halo, jamais un filtre qui trahit la photo.
- **F2-2 · Polices lourdes, TTF embarqués, aucun préchargement.** Preuve : audit WARN 4-8 (4 fichiers TTF/OTF, fonts 376 Ko sur 1061 Ko) ; `grep preload` du `dist/index.html` vide. Correction : woff2 sous-ensemblés latin, 2 graisses utiles par famille, préchargement des deux de l'écran d'ouverture (cause directe de F1-1).
- **F2-3 · Images : plusieurs variantes de 239 et 350 Ko.** Preuve : `dist/le-royal/legacy/photos/terrasse-960.webp` 239 Ko (servie à 390 px alors que `terrasse-640` fait 119 Ko), `terrasse-1200.webp` 350 Ko (> 300 Ko). Correction : qualité 70-75 sur les `terrasse-*`, et `srcset` mobile vers 640 plutôt que 960 (la photo s'affiche à 358 px de large au téléphone, 389 px natifs déjà livrés, inutile en 960).

### F3 finition
- **F3-1 · Coordonnées répétées trois fois.** Preuve : `d-07-scroll.png` : la section « Une table au Royal » (adresse, téléphone, e-mail) est reprise juste en dessous dans le bloc « Rendez-vous Place du Théâtre. » (adresse, 081 22 01 33, e-mail, réseaux), et le téléphone est déjà dans le héros. Correction : garder dans le bloc de clôture uniquement ce qu'il apporte (réseaux, phrase), ou supprimer l'un des deux jeux de coordonnées.
- **F3-2 · Apostrophes droites dans les noms de plats.** Preuve : « miel d'acacia », « Pays d'Oc », « l'italienne » (`donnees.json` copié tel quel) contre apostrophes courbes ailleurs sur la page. Correction : normaliser en `’` au rendu de la carte (champ `nom` et `titre`).
- **F3-3 · Horaires : divergence connue du dossier non visible.** Preuve : le dossier note « ouvert de 11 h à 23 h » (carte PDF) contre cuisine 12 h-14 h 30 et 18 h-22 h (site client) ; la page n'affiche que ces derniers (cohérents avec `donnees.json`, donc pas de T-faux) et le JSON-LD aussi. Correction facultative : faire figurer « à confirmer » dans le texte comme pour l'ardoise, ou laisser tel quel et le signaler au client ; même remarque pour le n° 13 (une source donne 2), déjà en ETAT.md.
- **F3-4 · Page 404 : pas de défaut, mais la capture « 404 » de la planche est la réponse brute du serveur (« Not Found »).** Preuve : `404/planche.png` blanche ; la vraie `/404.html` mesurée est correcte (200, `title` « Page introuvable, Le Royal Namur », `lang="fr"`, 1 h1, noindex, navigation et appel). À ne pas corriger : faux positif connu (`agents/lecons/commun.md`). Seul reste à noter : le bandeau KYW et la mention y sont bien présents.

## Vérifications sans écart (ne pas rouvrir)
- Faits : nom, adresse (Place du Théâtre 13, 5000 Namur), téléphone, e-mail, Zenchef (rid 383850), Facebook, Instagram, horaires, menu des fêtes (50 / 65 €, entrées, plats, desserts), 62 plats et prix : tous conformes aux données ; aucune note ni avis inventé, aucun chiffre de réputation affiché.
- Mention « Maquette KYW, certaines données sont illustratives » + un seul logo `kyw-footer__logo` + `<meta name="robots" content="noindex">` sur `/` et `/404` ; `lang="fr"`, un seul h1, ordre des titres h1 > h2 > h3 > h4 cohérent ; tous les liens internes `#…` ont leur cible ; 0 tiret cadratin ; vouvoiement.
- Reduced motion : 0 texte masqué ; après défilement 0 `[data-reveal]` sous opacité 0,9.
- Anti-slop : pas d'eyebrow, pas de trois cartes égales, pas de dégradé violet, pas de glassmorphism ; palette brun/crème/ambre liée à l'enseigne du client (façade en brique), pas la crème-terracotta générique.

## Ce qui est bien (à ne pas casser à la révision)
1. La carte en rubriques à filets et prix en chiffres gras alignés à droite, avec les descriptions secondaires en petit : lisible à 1440 et à 390 px, onglets « À manger / À boire » utilisables sans script.
2. La bande brune du menu des fêtes (deux prix en grand, trois colonnes) : seul vrai contraste de la page, bien équilibré (`d-06-scroll.png`).
3. La nav collante à une ligne avec « Réserver » toujours visible et le menu dialog sur téléphone ; héros 50/50 avec titre, baseline, double appel (réserver / appeler) dès le premier écran.
