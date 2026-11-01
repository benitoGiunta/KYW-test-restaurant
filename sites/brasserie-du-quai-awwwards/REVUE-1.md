# Revue awwwards · La Brasserie du Quai · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : le titre géant en capitales condensées pose sur une ligne d'eau en laiton ; sous la ligne, la page devient la Meuse de nuit (ardoise sombre) avec un reflet inversé des lettres, et la pierre pâle alterne avec l'eau d'une section à l'autre.

Hypothèses de passe : `QA-revue1.md` et les planches annoncées n'existaient pas dans le dossier ; j'ai lu `.shots/` (accueil, carte), `audit.txt`, les `report.json` (jq ciblé), fait planches à partir des PNG existants et deux captures ciblées (histoire, réservation, hors du dépôt) plus deux mini-scripts (tailles de police, menu mobile). Build non relancé (dist déjà présent, pages servies en 200). Lecture de DESIGN.md non nécessaire.

## Scores /10
- Design 8 : identité tenue (ligne d'eau + reflet, Big Shoulders sur Schibsted, pierre/ardoise/laiton), mobile pensé (hero image au-dessus du titre, `m-01-hero`), vrais contrastes (tokens mesurés : 5,6 à 14,7 sauf laiton clair 2,85 réservé aux grands traits).
- Usabilité 8 : téléphone et « Réserver » dans l'en-tête de chaque page, page Réserver claire (appel, en ligne, mail), menu mobile ouvre, ferme (Échap) et navigue (test script), focus visible (`k-02-focus`).
- Créativité 7 : la signature de la ligne d'eau est cohérente d'un hero à l'autre, mais la plupart des sections intérieures sont des listes classiques ; peu de moment fort après le hero.
- Contenu 7 : copie spécifique au lieu (pont du Luxembourg, graisse de bœuf, Gillardeaux), prix tous conformes à `donnees.json` ; points faibles : un rôle inventé, deux photos hors sujet, « à confirmer » doublé.
- Technique 9 : 0 erreur console, 0 requête en échec, axe 0 violation (4 pages), LCP desktop 128 à 160 ms, mobile 1,0 à 1,3 s (4x CPU, 4G lente), CLS 0, scroll 59 à 60 fps, 0 débordement, page d'accueil 758 Ko (images 581 Ko), reduced-motion sans texte caché.

## Findings
**F1-01 · T-invente · rôle de Pierre-Alexandre** — `src/data/site.ts:73` (rendu : histoire, « Pierre-Alexandre / En salle, avec son équipe. »). `donnees.json` dit seulement « met en avant son équipe sur le site » ; « en salle » n'est ni dans le dossier ni marqué `placeholder`. Preuve : `hist-d` capture d-03 et `donnees.json > equipe[0].role`. Correction : retirer le rôle (« Pierre-Alexandre, avec son équipe. » ou « Pierre-Alexandre, propriétaire cité par la presse » seulement si confirmé) ou le marquer comme exemple avec la pastille `.exemple` déjà utilisée ailleurs.

**F2-01 · Texte doublé « à confirmer à confirmer »** — `src/pages/reservation.astro:31` ajoute `<span class="exemple">à confirmer</span>` derrière `fermeture.texte` (`src/data/site.ts:42`) qui se termine déjà par « à confirmer ». Preuve : texte rendu de /reservation/ et capture `reservation d-04-scroll` (phrase puis pastille « à confirmer »). Correction : texte « Jours de fermeture hebdomadaire » + pastille seule, ou texte actuel sans pastille.

**F2-02 · Photos sans rapport avec le plat nommé** — `src/data/site.ts:67` et `:70` : le vol-au-vent « Royal » (truffe, ris de veau) porte la photo `volaille` (volaille et croquettes, `photos.ts:49`), et le Plateau du Quai à 165 € porte la photo de six huîtres seules (`01-huitres`). Preuve : `home d-05-scroll` (vignettes à droite des lignes). Correction : retirer `photo` sur ces deux lignes (la liste tient sans, quatre lignes sur six n'en ont pas) ou prendre une photo qui montre le plat.

**F2-03 · Alt et photo du hero de la page Le quai** — `src/lib/photos.ts:45` : alt « au crépuscule, parasols verts sur la berge » alors que la photo montre un immeuble blanc, de l'herbe et un ciel gris sous voile sombre (`hist-d d-01-hero`, `resa-m m-01-hero`). Le dossier précise « aucune photo de façade de jour ». Image la plus faible du site, placée en premier écran. Correction : alt exact (« Vue de la berge de la Meuse devant la brasserie, ciel couvert ») et, de préférence, remplacer le hero par `05-terrasse-meuse` ou `10-salle-panorama`, qui portent mieux l'idée du lieu.

**F2-04 · Zones de clic sous 24 px** — mesure `smallTargets`, desktop et mobile, sur les 4 pages : « Toute la carte » 108x21, « Ouvrir le plan » 106x21, téléphone 99x21, e-mail 197x21, Instagram 79x21, Facebook 78x21, « Sélection du Guide Michelin » 257x16. Correction : `min-height: 24px` (idéalement 44 px sur mobile) avec `padding-block` sur les liens du pied de page, de `.pratique` et de l'accueil ; pour la ligne Michelin, un bloc de lien sur sa propre ligne.

**F2-05 · JSON-LD affirme des jours d'ouverture non confirmés** — `openingHoursSpecification` : lundi, jeudi, vendredi, samedi, 12:00 à 14:30 et 18:00 à 21:30 (horaires d'hiver seulement), alors que `donnees.json` marque ces jours « à confirmer » et le reste « inconnu ». `servesCuisine` ajoute « Cuisine belge », absente du dossier. Correction : retirer `openingHoursSpecification` tant que les jours ne sont pas confirmés, ou le limiter à ce que le site affiche, et retirer « Cuisine belge ».

**F3-01 · Desserts d'exemple** — carte, section « Desserts » : Dame blanche, Crème brûlée, Café gourmand, `placeholder: true`, pastille « exemple » et « à confirmer » par ligne. Conforme à la règle (marqué), mais trois lignes sans prix font brouillon au milieu d'une carte réelle. Correction : une seule ligne « Desserts : à confirmer avec le restaurant » ou section masquée.

**F3-02 · Même photo trois fois** — `24-chef-ecailler` sert à l'accueil (banc d'écailler) et à la carte (plateaux, `carte-d d-06-scroll`) ; elle montre des cuisiniers au travail, pas des plateaux. Correction : une autre photo sur la carte (ex. `14-table-dressee` ou `22-ceviche`).

**F3-03 · Vide de ~300 px** entre la photo des huîtres et « Les classiques de la maison » (`home d-04-scroll`, 1440 px) ; la ligne « Les plateaux, de 45 à 195 € » flotte seule à droite. Correction : réduire l'espacement de la section ou y accrocher le lien `carte#plateaux`.

**F3-04 · Répétition** — page Le quai : le titre « Une brasserie au sens propre » est repris mot pour mot au début du paragraphe suivant. Correction : commencer le paragraphe à « une carte large ».

**F3-05 · Hiérarchie des prix** — prix et « 6 pièces / 12 pièces » à 13 px à côté de noms à 40 px (`home d-03/d-05`) ; lisible mais le prix est le second texte que cherche un client. Correction : passer les prix à `--t-s` (14 px) en graisse 600.

**F3-06 · Avertissements d'audit examinés, sans suite** — « sentence repeated 2x : Midi : 12 h à 14 h 30 » (réservation) : les deux saisons ont les mêmes horaires de midi, répétition légitime. « no sitemap » : `sitemap-index.xml` existe et la page est en noindex, sans enjeu.

Vérifications sans écart : adresse (9 rue du Quai, 5000 Namur), téléphone (081 65 70 03, `tel:+3281657003`), e-mail, horaires saisonniers, BCE, prix des huîtres et plateaux, Michelin 2026 (sourcé), liens Instagram, Facebook, Zenchef/site actuel (`https://www.brasserieduquai.be/reservation/`), Google Maps (coordonnées du dossier) ; 4 pages + 404 en 200 ; `lang="fr"`, un seul `h1` par page, `noindex, nofollow` sur 5 pages sur 5, mention « Maquette KYW, certaines données sont illustratives » et signature KYW (une seule) en pied de page, canonical, OG (1200x630), favicon, 404 designée (« À l'eau »), JSON-LD `Restaurant` avec adresse. Ni slop (pas de trois cartes égales, pas de dégradé violet, pas de verre dépoli), ni scroll-jacking, pas de loader.

## Ce qui est bien (à ne pas casser à la révision)
1. La ligne d'eau en laiton avec reflet inversé du titre : identité reprise sur toutes les pages, y compris le mobile et la 404 ; contenu entièrement visible en reduced-motion.
2. Page Réserver : numéro en très grand, deux actions nettes (« Appeler la brasserie », « Réserver en ligne »), horaires saisonniers lisibles, « à confirmer » assumé plutôt que des jours inventés.
3. Carte complète et exacte (52 lignes, prix du JSON), ancres fonctionnelles, performances excellentes (LCP mobile 1,1 s, CLS 0).

Décompte : F0 0 · F1 1 · F2 5 · F3 6.
