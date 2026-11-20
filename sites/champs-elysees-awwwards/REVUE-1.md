# Revue awwwards · Champs Élysées · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (avant DESIGN.md) : une journée de brasserie de 11 h à 22 h où une horloge fixe et des sections datées « 11 h, on ouvre » à « 21 h, la maison » font passer le fond du crème au vert nuit ; sobre, lisible, ancré dans la façade et la carte réelles.

Base de la revue : `QA-revue1.md` est absent (aucun fichier, `.shots/` du constructeur sans summary). J'ai donc utilisé les captures du constructeur (accueil 21:21, postérieures à `src/`) et refait mes propres mesures sur le `dist/` de 21:24 : 5 pages × 1440 et 390 px (axe-core complet, console, requêtes, débordement, balises, JSON-LD, liens, alt), planches pleine page, contraste par nœud (canvas 1x1), tailles de police, recouvrement de l'horloge, menu mobile, reduced-motion, 94 plats de la carte confrontés à `donnees.json`. Serveur propre sur le port 4963, arrêté. Non refait : LCP/CLS (reprise des chiffres du RAPPORT : LCP mobile 1,0 à 1,6 s, CLS 0), non recontestés.

Scores /10 (auto-notation du relecteur, pas un jury indépendant)
- Design 7,5 : palette vert forêt, crème et orange tenue sur 5 pages, titres Boska énormes, façade en héros ; mais mur de photos répétitif et pied « La maison ne ferme pas » identique partout.
- Usabilité 6,5 : menu mobile OK (aria-expanded, Esc referme, focus rendu au bouton), liens tous valides ; mais l'horloge masque l'index de la carte et le texte des CTA pleins est à 3,3:1.
- Créativité 7 : l'horloge qui suit le jour est une vraie idée de marque, mais elle disparaît sous 760 px et l'effet reste discret (fond qui change, aucune scène).
- Contenu 8 : 94 plats, 0 écart de nom ou de prix ; faits (1984, Sportman, Saint-Camille, 120 couverts, équipe de 9, 50/65 €) conformes ; 0 tiret cadratin, 0 filler ; une promesse « sans pause » non prouvée (F2-1).
- Technique 7 : 0 erreur console, 0 requête en échec, 0 débordement, JSON-LD complet (horaires, adresse, menu), mais 3 familles de violations axe sérieuses.

## Findings (par gravité)

**F1-1 · Contraste des boutons pleins sur fond clair : 3,3:1.** `src/styles/site.css:63` (`.btn--plein`) : texte `#12302a` sur `#d9481c`, 14 px gras (« Appeler le 081 23 14 26 » en en-tête sur toutes les pages, « Réserver une table » en héros, accueil, 1440 et 390). Mesure : 3,30 (script canvas) ; axe le laisse en « à vérifier » (27 à 31 nœuds incomplets par page), donc invisible au QA. Correction : sur fond clair, assombrir l'accent (≥ 4,5:1 avec le texte choisi) ou reprendre l'orange clair déjà utilisé sur les sections sombres, ou passer le libellé à ≥ 18,7 px gras.

**F1-2 · L'horloge fixe recouvre l'index de la carte.** `site.css:185` (`.carte__rail`, sticky, colonnes 1 à 3) et `site.css:257` (`#horloge`, fixed en bas à gauche) : à 1440×900, après 150 à 450 px de défilement, le cadran passe sur « Trappistes », « Cocktails et spritz », « Softs et boissons chaudes » (preuve : `rev1-carte-vp.png`, texte coupé par le cadran ; mesure de recouvrement aux positions 0 et 450). `pointer-events: none` évite le blocage au clic mais le texte est illisible. Correction : masquer `#horloge` sur `/carte/` (ou le décaler hors des 3 colonnes de l'index).

**F1-3 · axe `aria-prohibited-attr` (serious) sur 4 pages sur 5, à 1440 et 390.** Cibles : `.foot__big` (`src/components/Pied.astro:10`, `<p data-split="lines">`) sur accueil, carte, 404, histoire ; `.statement[data-split="lines"]` (`histoire.astro:53`, 2 nœuds) en plus. SplitText pose `aria-label` sur un `<p>` : option `aria` de SplitText à neutraliser ou rôle valide. Le QA du constructeur annonçait « axe 0 » : il ne le voit pas (leçon déjà connue).

**F1-4 · axe `scrollable-region-focusable` (serious) à 390 px sur accueil et histoire.** `.strip` (`index.astro:108`, `histoire.astro:69`) devient un défilement horizontal sans accès clavier. Correction : `tabindex="0"` + `role="region"` + `aria-label`, ou empiler les photos sous 600 px.

**F2-1 · Promesse « sans pause » non établie par le dossier.** Titres « Pas de pause entre midi et soir. » (accueil), « La maison ne ferme pas entre midi et soir. » (pied de toutes les pages, y compris 404), « 15 h, toujours ouvert », et la 404 « la salle reste ouverte jusqu'à 22 h ». Le dossier ne donne que des plages 11-22 h / 11-16 h (site client) et Rankeat diverge (10 h-23 h 30, à confirmer) ; l'absence de coupure entre services n'est écrite nulle part. Le concept entier repose dessus. Correction : formuler avec la plage seule (« De 11 h à 22 h, la salle reste ouverte ») ou marquer l'hypothèse « illustratif » dans le texte de page.

**F2-2 · Signature perdue sur mobile.** `site.css:265` : `#horloge { display: none }` sous 760 px. Sur 390 px il reste l'étiquette horaire (« 11 h, on ouvre ») et le trait orange, mais ni cadran ni changement lisible de l'heure : composition propre mais la marque du site n'y est plus. Correction : cadran réduit (2,5 rem) en bas à droite ou barre d'heure fixe.

**F2-3 · Échelle horaire du graphique des heures, mobile : « 20 » et « 22 » se chevauchent** (« 8 11 14 17 20 22 » rendu « 17 2022 », capture `m-02-scroll.png`, planche `rev1-home-m.png`). Correction : retirer une graduation ou réduire à 8, 14, 22 sous 480 px.

**F3-1 · Légende « Portraits d'après La DH, 4 août 2024. »** (`histoire.astro:36`) alors qu'aucun portrait n'est montré ; écrire « Texte d'après La DH, 4 août 2024 ».

**F3-2 · Répétitions.** Pied « La maison ne ferme pas entre midi et soir » identique sur les 5 pages (la 404 comprise) ; page réservation : « plus de dix personnes » dit deux fois (carte téléphone et bloc « Groupes »).

**F3-3 · Étiquette « Novembre » en dur** (`reservation.astro`, section fêtes patronales) : date figée, à remplacer par « Fêtes patronales » (leçon : aucune date en dur).

**F3-4 · Code postal 5100** (adresse, JSON-LD) contre 5000 sur le site client : hypothèse du RAPPORT, toujours à confirmer par le client ; pas de marque « à confirmer » visible.

Vérifiés sans écart : 0 erreur console, 0 requête en échec, `scrollWidth` = fenêtre sur 10 cas (les éléments à 528 px à 390 sont dans `.strip`, clippé), tous les liens internes présents dans `dist/` (le « mort » `../carte/` de `/reservation/` est relatif et valide), h1 unique, `lang="fr"`, `noindex, nofollow` (conforme au prompt), mention « Maquette KYW… » et un seul `.kyw-footer__logo` sur 5 pages, titles et descriptions uniques, OG image 1200×630, canonical, favicon, robots.txt et sitemap présents, `404.html` conçue, reduced-motion : 0 texte sous 0,5 d'opacité, aucune police < 12 px, menu mobile fonctionnel, alt descriptifs et cohérents avec `sujet` des photos (Chimay, façade, spritz). 94 lignes de carte : 7 « écarts » du script = prix multiples (1 pc/2 pcs, 25/33/50 cl) correctement affichés.

## Ce qui est bien (à ne pas casser à la révision)
1. La carte : 94 lignes exactes, index latéral, prix à tirets alignés, photos intercalées avec alt justes, rubrique Fêtes patronales reprise telle que dans le dossier.
2. Le héros et la page histoire : façade réelle, texte factuel sourcé (La DH), citation de Teresa intacte, chiffres 1984 / 120 / 9 sans invention.
3. Hygiène technique : 0 erreur, 0 débordement, JSON-LD Restaurant complet avec horaires, menu mobile accessible, 404 sur le ton de la marque (« Ici, ce n'est pas le 149. »).

Ressources de la revue : captures et planches dans le scratchpad (`rev1-*.png`), scripts `rev1-mesure.mjs`, `rev1-cible.mjs`.
