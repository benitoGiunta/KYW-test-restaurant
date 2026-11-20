# Revue portfolio · Épices & Nous · passe 2
Verdict : PUBLIABLE
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : un restaurant de couple en brun café et orange épice, où de grands chiffres filigranés (52, 2, 1999) et des photos de plats rythment le menu et la maison, avec un anneau de lecture sur le monogramme.
Scores /10
- Design 7 : palette brun/orange tenue, hero sombre lisible, chiffres monumentaux maîtrisés (planches 1440 et 390 des pages carte, histoire, maison, 404) ; eyebrow encore au-dessus de presque chaque titre.
- Usabilité 8 : galerie de nouveau navigable à 1024-1180 (défilement, première vignette à 32-36 px), cibles d'onglets de 44 px à toutes largeurs, CTA Réserver partout.
- Créativité 7 : signature (anneau et filet de lecture) et onglets d'espaces ; reste dans le gabarit Velours.
- Contenu 8 : titre d'accueil corrigé, plus de procédure ni de « bistronomie » inventées ; reste « Accueil familial » (F3).
- Technique 8 : 0 erreur console, 0 requête en échec, 0 débordement (scrollWidth = fenêtre, 7 pages x 1440/1024/390), 0 violation axe sur 21 chargements (1 anomalie non reproduite, voir F3-6).

Méthode et limites : QA-revue2.md absent (shoot « browser closed », summary.json en shootFailed) ; dist (04:29) postérieur à REVISION-1 (04:25) et à src, réutilisé sans rebuild ; planches d'accueil de `.shots-…-revue2/home` (04:32) relues. Mesures par 4 scripts maison (axe-core, console, requêtes, `Range` contre fenêtre, h1, méta, mention, logo, contentinfo ; galerie à 9 largeurs de 320 à 1920 ; liens ; captures 1440 et 390 de carte, histoire, maison, 404). LCP et CLS non remesurés (QA-build : LCP mobile 1320 ms, CLS 0).

## Vérification des corrections de REVISION-1 (8 annoncées)
- F1-1 OK : `<title>` et `og:title` de dist/index.html = « Épices & Nous | Restaurant à Erpent (Namur), menu 3 services à 52 € » ; 0 occurrence de « Bistronomie ».
- F1-2 OK : bande de la galerie à 320 / 390 / 768 / 1024 / 1100 / 1180 : `overflow-x: auto`, première vignette à 16-36 px, `scrollWidth` bande > `clientWidth`, page sans débordement ; centrage dès 1280 (première 24, dernière 1256) ; 1440 et 1920 propres.
- F2-1 OK : `tabindex=0`, `role=region`, `aria-label` sur `.galerie__bande` (index.astro:96) ; axe 390 : 0 `scrollable-region-focusable`.
- F2-2 OK : un seul contentinfo par page (mesure `footer, [role=contentinfo]` = 1 sur 7 pages x 3 largeurs) ; 0 `landmark-no-duplicate-contentinfo`, 0 `region` (hors anomalie F3-6).
- F2-3 OK : carte.astro:55 « La carte des boissons n'est pas reprise sur cette maquette. »
- F2-4 OK : texte de La terrasse « La photo montre la façade du restaurant » (site.ts:194) ; la terrasse elle-même est dans le dossier (« dès que la météo le permet »).
- F2-5 OK : 404.html h1 = « PAGE INTROUVABLE », phrase « La salle, elle, vous attend toujours Chaussée de Marche, à Erpent » (planche 404).
- F2-6 OK : chiffres filigranes rendus par `::before { content: attr(data-valeur) }` (base.css:28 et 295), `sr-only` dans le h1 ; 0 `color-contrast` à 1440 et 390 sur carte et histoire.
Aucune régression : 7 pages en 200, 0 lien hors base, 0 lien interne mort, `lang=fr`, 1 h1, JSON-LD, og:image, `noindex, nofollow` (conforme § 3.3), mention « Maquette KYW, certaines données sont illustratives » et 1 logo KYW par page ; 0 U+00A0 et 0 tiret cadratin dans le dist.

## Findings
### F0 / F1 / F2 : aucun
### F3 finitions (non traités par la révision, hors consigne)
- F3-1 · Horaires toujours « 19:00 à 20:30 » et « 12:00 à 13:45 » (accueil, pied, réservation, 404, planches) ; attendu « 19 h 00 à 20 h 30 ». Le soir précède encore le midi.
- F3-2 · Eyebrows au-dessus de presque chaque titre (« Euros », « Deux espaces et une terrasse », « Carte de saison, prix en euros », « Denis et Sophie Delvigne », « Erreur 404 », adresse du hero) : motif d'AI slop, à réduire à trois.
- F3-3 · carte.astro:30 « à partir de, jusqu'à 25,50 € » bancal : « de 20,50 à 25,50 € ».
- F3-4 · site.ts:218 « Accueil familial » contre « accueil convivial » de donnees.json (valeurs) ; maison.astro:32 « passez par le site du restaurant ou appelez-nous » : préférer « réservez en ligne ou par téléphone ».
- F3-5 · À 390 px le chiffre filigrane (1999, 2, 52) passe derrière l'eyebrow et le h1 et son haut est rogné par l'en-tête (planche 390 : « NOTRE HISTOIRE », « LA MAISON ») : décoratif, lisibilité du titre intacte, mais à décaler sous 768 px.
- F3-6 · Une charge de histoire/ à 1024 px a donné 1 `color-contrast` (serious) et 2 contentinfo ; non reproduite sur 10 rechargements (1024, 1100, 1280, 768) : probablement un état transitoire du routeur de pages ; à surveiller, ne bloque pas.

## Ce qui est bien
1. Données de carte et de menu fidèles, aucune invention, titre d'accueil désormais exact.
2. Galerie corrigée sans casser le centrage large ; 0 débordement de 320 à 1920.
3. Chiffres décoratifs accessibles : lisibles par lecteur d'écran (sr-only), invisibles à axe, 404 claire et vouvoyée.
