# ETAT, epices-et-nous-portfolio (construction-3 / QA faite)

## Fait (phase 1)
- Gabarit Velours adapté : jetons brun café / orange épice, 19 photos WebP, `site.ts` depuis le dossier, pages accueil, menu, carte, maison, histoire, réservation, 404, DESIGN.md (matrice, décisions, adéquation ~75 %).

## Fait (phase 2, cette passe)
- Motion (`src/motion/setup.ts`) : commentaires corrigés (rideau brun café, orange épice) ; `heroDerive` (photo qui se pose 1,08 vers 1 dans l'intro, dérive de 8 % au scrub, desktop seulement) ; `signature` (`--progres` écrit sur `.header` seul) ; onglets : Home/End, bouton « Mettre en pause » (`data-onglets-pause`, prime sur survol/focus/défilement, masqué sans JS et en reduced motion).
- Signature (`base.css`, bloc final) : anneau du monogramme (conic-gradient + mask) et filet de 2 px sous l'en-tête qui se remplissent avec la lecture de la page. Sans JS ou reduced motion : anneau plein, filet absent.
- États : survol des lignes de carte (filet et prix orange), numéros du menu, flèche du lien « Découvrir », bande des guides ; menu mobile qui se déplie (animation) ; panneau d'onglet qui entre ; tous coupés en reduced motion.
- Corrections : voile des onglets (z-index photos -2, voile latéral 90deg + vertical, texte lisible sur les verres clairs) ; chiffres monumentaux et prix plafonnés sous 768 px (plus de débordement à 320, 360, 390 : `scrollWidth` = fenêtre sur les 7 pages) ; `data-reveal` retiré des blocs contenant lien ou bouton (guides, pied de carte, aside du menu, infos de réservation) ; « Lundi et dimanche » (plus de capitales parasites) ; clôture : « Depuis » avant « 1999 » ; `.galerie__bande` avec `scroll-padding-inline`.
- Nettoyage : 34 fichiers non référencés (photos Les Potes au Feu, logos) supprimés de `public/photos/` (19 restent), `dist/` reconstruit.
- Contrôles faits (Playwright, 1440 et 320/360/390, serveur 4472 arrêté) : 0 erreur console ; 24 clics réels d'en-tête OK (élément sous le point = `<a>`) ; bas de page 1440 : mention « Maquette KYW » et logo KYW visibles ; reduced motion : classe `motion` absente, 0 bloc caché, 0 rideau, hero sans transform ; menu mobile ouvert, onglets mobile, carte mobile vus en planche-contact (`.shots/epn2/`).
- Build : `scripts/q.sh epn-build node scripts/build-site.mjs sites/epices-et-nous-portfolio` vert (7 pages, 404 présente, noindex et mention KYW présents).

## Reste (phase 3 et agent captures)
- Shoot complet et audit (axe, LCP, clavier) non faits : agent « captures ». À surveiller : contraste de `.petite-cap` et du bouton « Mettre en pause » (orange clair sur brun, ~7:1 attendu), LCP de la photo de hero (transform d'intro posé en JS, la photo reste peinte), tab « LA TERRASSE » qui passe à la ligne à 390.
- `pnpm index` et commit `[publier]` en fin de restaurant (non fait ici). `gabarits/UTILISATION.md` à compléter : `velours | epices-et-nous` (gabarits/ protégé).
- Défaut gabarit à reporter dans `gabarits/velours/` (protégé) : z-index des photos d'onglets (-1 égal au voile), `capitalize` sur `.horaires dt`, chiffres 4 caractères sans plafond mobile, `data-reveal` sur blocs à liens.

## Pièges et décisions
- Hypothèses de la phase 1 inchangées (citation G&M sans date, Michelin sans année, 1999 = ouverture, menu 52 € sans créneau, boissons « à demander au restaurant »).
- Les 3 premiers chiffres du chapitre (`left` 7 px à 390) gardent le `margin-left: -0.06em` d'alignement optique du gabarit.
- Un test de clic juste après `page.goto` échoue tant que `#loader` n'est pas `hidden` (1,5 s) : attendre.

## Phase 3 (QA)
- QA lue (QA-build.md, planches accueil et 404), 404 réelle vérifiée (0 violation axe, 0 erreur) ; aucune correction requise ; build final vert ; RAPPORT.md écrit. Serveur 4533 arrêté.
- Reste : report défauts dans gabarits/velours (protégé), UTILISATION.md, `pnpm index`, commit `[publier]`.

## Relecture passe 2 (relecteur-site, 20/11)
- Fait : REVUE-2.md écrit, verdict PUBLIABLE (8 corrections de REVISION-1 vérifiées, 0 F0/F1/F2, 6 F3 résiduels). Serveur 4617 arrêté.
- Reste : F3 (format « 19 h 00 », eyebrows, « Accueil familial », chiffre filigrane à 390) si on veut polir ; `pnpm index` et commit `[publier]` en fin de restaurant.
- Pièges : QA-revue2.md absent (shoot « browser closed »), dist réutilisé sans rebuild.
