# Revue portfolio · Le D'Arville · passe 1
Verdict : A_CORRIGER (0 F0, 3 F1, 8 F2, 4 F3)

Lecture en une ligne de l'idée du site (avant DESIGN.md) : une maison de campagne gastronomique en vert sapin et cuivre, où un « rideau » (loader, transitions, panneaux de chapitre) se lève sur de grands chiffres qui comptent (2 menus, 73 €, 200 m, 20 ans) et sur des photos de la ferme, de la carte et de la villa Barabas.

Scores /10
- Design 7 : palette sapin/cuivre cohérente, grands chiffres et rideau tenus de la home aux sous-pages (planche home, `d-02` à `d-07`) ; vide marqué sur histoire et réservation (blocs sombres à moitié vides, captures 1440), pas de signature qui s'écarte.
- Usabilité 7 : 8 pages, 0 débordement de page (scrollWidth = fenêtre à 1440 et 390), menu mobile et CTA « Réserver » présents, 26 arrêts clavier distincts sur 40 Tab ; la bande de galerie mobile n'est pas atteignable au clavier, le CTA Barabas renvoie au mauvais endroit.
- Créativité 7 : le rideau et le compteur de chiffres sont une vraie idée de marque ; les eyebrows et les chiffres décoratifs reviennent à chaque page (slop léger).
- Contenu 6 : faits exacts (adresse, téléphone, e-mail, 73/90/28 €, 55 plats et menus, Barabas, congés 2027 confrontés à donnees.json, 0 écart de prix) mais trois fuites de langage de dossier ou de procédures non prouvées, et des heures fictives dans le JSON-LD.
- Technique 8 : build OK (8 pages), 0 erreur console, 0 requête en échec, CLS 0, LCP mobile 1380 ms (QA), 0 violation axe critique ; loader 3,1 s et deux images lourdes.

Méthode : lecture de QA-revue1.md et des planches (home, menu, 404) ; texte extrait du `dist/` et confronté à `donnees.json` et `dossier.md` ; script maison axe-core (3 positions de défilement) sur 8 pages x 1440 et 390 px, console, requêtes, débordement, cibles < 24 px, balises ; script ciblé (contraste du compteur, galerie, loader en 2 passes, reduced-motion, 40 Tab). Serveur propre sur le port 4781, PID 29864 arrêté. Le build n'a pas été relancé : dist du 04:17 postérieur à src, QA de 04:26 postérieur au dist.
Points du QA écartés : « pas de robots.txt/sitemap » est faux (présents dans `dist/`), la « 404 » de la planche est la réponse brute de serve.mjs (violation color-contrast absente de `/404.html`, 0 violation hors pied dupliqué).

## Findings

### F1 majeur
- **F1-1 · T-invente · heures fictives publiées en données structurées.** `src/layouts/Base.astro:57` génère `openingHoursSpecification` (jeudi 19:00-21:30, vendredi/samedi 12:00-14:30 et 19:00-21:30, dimanche 12:00-14:30) sur chaque page depuis `site.horaires`, alors que le dossier dit « heures inconnues » et que le site les marque « heures illustratives » à l'écran seulement (`heuresPlaceholder: true`, `data/site.ts:78-81`). Preuve : `grep ld+json dist/.../index.html`. Correction : ne pas émettre `opens`/`closes` quand `heuresIllustratives()` est vrai (garder `dayOfWeek` seul n'étant pas valide : omettre le bloc) ou le laisser vide jusqu'à confirmation.
- **F1-2 · T-faux · langage de dossier visible par le client.** `src/pages/histoire.astro:23` : « Estelle en est la co-propriétaire, son nom de famille n'est pas connu du dossier. » ; `src/pages/menu.astro` (note de fin de carte) : « Les prix des desserts ne sont pas publiés par la maison. » ; `carte.astro` : « Le site de la maison annonce aussi un menu « Bon Plan »… ne sont pas publiés ». Preuve : texte extrait, lignes 290, 178, 241. Correction : réécrire pour le visiteur (« Estelle, co-propriétaire. » ; « Prix des desserts : nous demander. » ou masquer) et marquer « illustratif » ce qui reste inconnu.
- **F1-3 · T-invente · procédures non prouvées et non marquées.** Chèque cadeau : « Montants et retrait à demander à la maison » (home, evenements, carte) alors que le dossier ne donne que « chèque cadeau : oui » ; Bon Plan : « à demander au restaurant » ; traiteur : « précise la formule et les dates de commande sur demande » (marqué « texte illustratif » seulement sur evenements, pas sur la home ligne 71). Aussi « Le déjeuner ou le dîner se prend au D'Arville » (illustratif sur evenements, non marqué sur la home l. 70). Correction : retirer « retrait » et « à demander », ou marquer chaque occurrence « illustratif » ; mention uniforme sur home et sous-pages.

### F2 mineur
- **F2-1 · axe `scrollable-region-focusable` (serious), 390 px, accueil.** `.galerie__bande` (scrollWidth 1445 pour 390, `tabindex` absent). Un utilisateur clavier ne peut pas la faire défiler. Correction : `tabindex="0"`, `role="region"` et `aria-label="Galerie"`.
- **F2-2 · loader trop long.** `is-loaded` à 3104 et 3113 ms (deux passes, bureau) ; le prompt de production exige moins de 2,6 s. Reduced-motion : 450 ms, contenu visible (0 texte caché sur 43). Correction : raccourcir le compteur de 029 à 100 à ~1,6 s.
- **F2-3 · contraste du filigrane « 200 ».** `span[data-compteur="200"]` sur `/barabas/` : 1,26 : 1 (#364538 sur #1b3730), 1440 et 390 px, mesuré au repos après 3,5 s ; axe serious. Correction : `aria-hidden` ne suffit pas, passer le chiffre en `role="presentation"` + `color` opaque cuivre ou retirer le doublon (le « 200 » est déjà dans le titre).
- **F2-4 · CTA trompeur.** `/barabas/` : « Contacter la maison » mène à `/reservation/` (réservation du restaurant) ; aucun contact de Barabas n'est donné hors Facebook. Correction : pointer vers la fiche Facebook Barabas ou renommer « Réserver au restaurant ».
- **F2-5 · poids d'images.** `photos/hero-1800.webp` 509 Ko (LCP), `portrait-domaine.webp` 324 Ko (> 300 Ko). Correction : recompresser (q 70) ou servir 1200 px sur mobile via `srcset`.
- **F2-6 · date relative en dur.** « Le D'Arville a 20 ans » (home l. 77, histoire l. 295, `data/site.ts:151,173`) vient d'une affiche de février 2025 : le chiffre vieillit. Correction : « fêté ses 20 ans en 2025 » ou retirer le chiffre du compteur.
- **F2-7 · phrase inventée d'ambiance.** `data/site.ts:153` : « on y regarde passer la lumière sur la brique » ; rien dans le dossier. Même registre pour « aux portes de Namur ». Correction : s'en tenir à « terrasse, jardin et point d'eau ».
- **F2-8 · photo qui ne dit pas ce qu'on lit.** `traiteur-bois.webp` (deux mises en bouche sur planche) illustre « Traiteur de fêtes » sur home et evenements ; rien ne prouve que ce soit du traiteur. Correction : photo de salle ou légende neutre.

### F3 finition
- **F3-1** Deux `<footer>` (pied du site + `kyw-footer`) : `landmark-no-duplicate-contentinfo` moderate sur 8 pages x 2 largeurs. Le pied KYW est imposé par CLAUDE.md : passer le pied du site en `<div role="presentation">` ou `<section aria-label>`.
- **F3-2** URL et libellés inversés : `/menu/` s'intitule « La carte » et `/carte/` « Les menus » ; le `<title>` de `/carte/` est « Les menus ». Renommer les dossiers (`carte` pour la carte, `menus`) pour le SEO et les partages.
- **F3-3** Gros chiffres décoratifs sans sens : « 2 » sur `/menu/` et « 5 » sur `/histoire/` (eyebrow + chiffre sur chaque page = motif répétitif). Garder les chiffres qui portent une donnée (73 €, 200 m).
- **F3-4** Les horaires reviennent trois fois sur la home (section, pied, audit WARN « phrase répétée 2x ») ; Gault&Millau 15/20 affiché sans la réserve du dossier (16/20 chez Trouve Ton Resto « à confirmer »), et « Delta d'Or 2015 » absent (bien, à confirmer).

## Ce qui est bien (à ne pas casser)
1. Carte exacte et complète : 5 entrées à 30 €, 5 plats, fromages, 4 desserts sans prix annoncé, menus 73/90/28 € identiques à `donnees.json`, accords 40/50 €.
2. Honnêteté des données : « heures illustratives » à l'écran, avis Google et Instagram absents, aucun avis inventé, alts tirés du champ `sujet` de `photos/index.json`.
3. Socle propre : `lang="fr"`, un h1 par page, `noindex, nofollow`, mention KYW et un seul logo, 0 console, 0 lien interne mort (tous les `href` vérifiés sur les 8 pages), 404 designée à part.
