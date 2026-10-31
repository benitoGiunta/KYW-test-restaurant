# Révision 1 · Les Potes au Feu · variante awwwards

Revue traitée : `REVUE-1.md` (verdict BLOQUANT, site sans aucune page). Le réviseur a écrit les cinq pages sur le
système déjà présent (tokens, CSS, moteur, module pilote), sans changer de concept ni de direction artistique, puis a
reconstitué `DESIGN.md` et `RAPPORT.md` (absents) à partir du code. Vérité des faits : `donnees.json`.

Bilan : 19 findings · 17 corrigés · 2 refusés · 0 impossible.

| Finding | Décision | Ce qui a été changé (fichier) | Preuve de vérification |
|---|---|---|---|
| F0-1 Aucune page, build en échec | corrige | `src/pages/index.astro`, `carte.astro`, `histoire.astro`, `reservation.astro`, `404.astro` (consomment `site`, `services`, `formules`, `histoire`, `equipe`, `faits`) ; `src/lib/photos.ts` (photos + alts), `src/lib/horaires.ts` ; `DESIGN.md` et `RAPPORT.md` reconstitués | `node scripts/build-site.mjs` : « 5 page(s) built », `✓ … → dist/les-potes-au-feu/awwwards/` ; shoot.mjs sur les 5 pages : 0 erreur console, 0 requête en échec, 0 débordement (1440 et 390) ; audit.mjs : 0 FAIL |
| F0-2 Liens internes morts | corrige | routes `/carte/`, `/histoire/`, `/reservation/` créées (Header et Footer inchangés) | `curl -w '%{http_code}'` sous `/les-potes-au-feu/awwwards/` : accueil, carte/, histoire/, reservation/ = 200 ; route inconnue = 404 (page dessinée servie) |
| F1-1 Réservation sans page | corrige | `reservation.astro` : Zenchef + téléphone en tête, horaires (liste dérivée de `site.horaires`), adresse + lien OpenStreetMap, absence d'e-mail dite, bon cadeau, privatisation du samedi ; aucun formulaire | captures `p2-reservation/d-01-hero`, `m-01-hero`, `m-02-scroll` regardées ; liens Zenchef et `tel:` présents dans le HTML |
| F1-2 og.png et apple-touch-icon absents | corrige | `public/og.jpg` (1200 × 630, photo réelle 23 salle-banquette, 99 Ko ; JPEG plutôt que PNG pour le poids), `Base.astro` image par défaut `/og.jpg` ; `public/apple-touch-icon.png` (180 × 180, rendu du favicon) | `curl` og.jpg et apple-touch-icon.png = 200 ; `og:image` absolu dans le HTML |
| F1-3 Rôle de Sara et Jordan inventé | corrige | `site.ts` `equipe` : rôle « épaule les chefs » (citation du client), `placeholder: false` ; alts des photos où Sara est « à confirmer » neutralisés (« une membre de l'équipe ») | capture `p2-histoire/m-03`, liste « La bande » : aucun rôle inventé |
| F1-4 Légendes d'assiettes (services 1 et 4) | corrige | légende rendue en `<p class="petit">` dans le texte du chapitre (`index.astro`), visible avec et sans mouvement | captures `accueil/m-02-scroll` (« Assiette non photographiée… ») et `p2-accueil/m-03-scroll` (« Sur la photo : la rosace de pommes… ») ; `reduced.hiddenText = 0` |
| F2-1 « Boeuf » sans ligature | corrige | `site.ts` : « Bœuf confit » (titre du service 3 et ligne du menu) ; clés et chemins de photos (`boeuf`) intacts | glyphe U+0153 présent dans `bricolage-200_800-normal.woff2` (vérifié par fontkitten) ; rendu dans les captures de la carte |
| F2-2 « dès 9 € » au bar | corrige | `site.ts` : bloc « Au bar » sans prix de bloc, `prixNote` « trois exemples, prix à confirmer » ; chaque prix porte la pastille « à confirmer » (`.illu`) | capture `carte/m-05-scroll` : trois pastilles visibles |
| F2-3 Formule midi 52 € présentée comme confirmée | corrige | `site.ts` : bloc « 40 ou 52 € » + pastille « 52 € à confirmer », ligne 52 € `aConfirmer` ; fait « 67 € » de l'accueil avec pastille ; en-tête de `site.ts` corrigé | captures `carte/m-04-scroll`, `accueil/m-04-scroll` |
| F2-4 « 2020 » présenté comme ouverture | corrige | `site.ts` `faits[3]` : « Les clés de l'avenue de la Plante, début 2020, au bord de la Meuse. » | capture `accueil/m-04-scroll` |
| F2-5 Lien YouTube d'une vidéo | corrige | `site.ts` `reseaux` : libellé « Vidéo YouTube » | pied de page de toutes les captures |
| F2-6 `noindex, nofollow` au lieu de `noindex` | refuse | aucun | Le prompt de production `agents/variante-awwwards.md` § 3.3 exige `noindex, nofollow` sur toutes les pages ; le garde-fou de `build-site.mjs` (`content="noindex`) et la règle de CLAUDE.md (noindex) sont satisfaits ; 31 des 32 pages du dépôt portent déjà `noindex, nofollow` |
| F2-7 Mention maquette à vérifier au rendu | corrige | bandeau KYW laissé clair (surcharge sombre de `site.css` retirée : les parties sombres du logo disparaissaient sur le noir) | script Playwright : mention « Maquette KYW, certaines données sont illustratives » présente dans `innerText` des 5 pages, 1440 et 390, avec et sans mouvement ; bandeau visible dans les captures de fin de page |
| F2-8 Samedi sans « fermé » | corrige | `Footer.astro` : horaires dérivés de `site.horaires` (« fermé, privatisation possible ») | captures de pied de page |
| F3-1 Horaires dupliqués à la main | corrige | `src/lib/horaires.ts` (`journee()`), utilisé par `Footer.astro` et `reservation.astro` ; le JSON-LD lit déjà `site.horaires` | HTML du pied de page = 7 jours issus des données |
| F3-2 Espaces ordinaires autour de « h » | corrige | `heure()` et `journee()` posent U+00A0 autour de « h » et de « à » | U+00A0 présent dans les deux polices ; aucune césure observée dans les captures 390 |
| F3-3 Crédits en minuscule | corrige | `site.ts` `credits.photos` : « Photos : Les Potes au Feu » | colophon des captures |
| F3-4 `<link rel="sitemap">` inutile | refuse | aucun | Le prompt de production § 3.3 demande explicitement un « lien sitemap » dans le `<head>` ; inoffensif |

## Défauts trouvés et corrigés pendant la vérification (hors revue)

| Défaut | Correction (fichier) | Preuve |
|---|---|---|
| `padding: X 0` sur des éléments `.wrap` (`service__tete`, `service__fin`, `resa__bloc`, `salle__legende`) annulait le gutter : titres à `left: -3 px` en 1440, collés au bord en 390 | `padding-block` (`site.css`) | mesure Playwright des `.display` : `left` 29 px (1440) et 15 px (390) |
| Hero de l'accueil : texte placé sous l'assiette (deux rangées), h1 sous la ligne de flottaison en 1440 × 900 | même rangée, assiette en colonnes 9 à 12, `margin-top: 0` sur la ligne meta (`site.css`) | mesure à 1440 × 900, 1280 × 720, 1024 × 768, 1920 × 1080 : h1, CTA et assiette dans la fenêtre ; capture regardée |
| Contraste sur la scène du service (axe serious, 8 nœuds : 4,47:1 et 3,25:1) | `--c-oak` `#a27a44` → `#ac844d`, texte secondaire `#2a2117` (`tokens.css`, `site.css`) | shoot `p2-accueil` : 0 violation axe |
| Liens isolés à 17 px de haut (pied de page, citation, carte, réservation) | `min-height: 1.5rem` (`site.css`) | shoot `p2-*` : `smallTargets` vide |
| Assiette du hero masquée par opacité pendant l'intro (LCP retardé) | transform seul (`motion/setup.ts`) | LCP desktop 0,2 s ; mobile throttlé 1,27 s |
| Aperçu au curseur vide (vignette `display: none` + lazy, `currentSrc` vide) | URL 440 px calculée au build par `getImage()` dans `data-preview` (`carte.astro`) | capture `carte/d-02-scroll` : assiette du bœuf sous le curseur |
| Légende « Service n sur 4 » en avance d'un service | `progress * n - 0,5` (`motion/service.ts`) | script : chapitre i centré → « Service i sur 4 / titre i » pour les 4 services, en 1440 et 390 |
| CLS mobile 0,07 (réservation, h1 qui passe de 2 à 1 ligne au chargement de la police) et 0,056 (404, contenu centré) | `<br />` dans le h1 de la réservation ; `.vide { align-content: start }` en mobile | CLS mesuré : 0,004 et 0,015 |
| Mur de photos mobile : demi-colonne vide à côté de chaque photo paire | photos paires pleine ligne à 72 %, calées à droite (`site.css`) | capture `p2-histoire/m-03-scroll` : photo paire à 72 %, calée à droite |

## Mesures finales (shoot.mjs, série, serveur `.qa-root` port 4473)

| Page | LCP desktop | LCP mobile throttlé | CLS mobile | axe | clavier | survols | reduced `hiddenText` |
|---|---|---|---|---|---|---|---|
| Accueil | 0,20 s | 1,27 s | 0,005 | 0 | OK | 0 sans effet | 0 |
| Carte | 0,20 s | 1,38 s | 0,024 | 0 | OK | 0 sans effet | 0 |
| Histoire | 0,14 s | 1,22 s | 0,003 | 0 | OK | 0 sans effet | 0 |
| Réservation | 0,25 s | 2,15 s | 0,004 | 0 | OK | 0 sans effet | 0 |
| 404 | 0,30 s | 1,13 s | 0,015 (mesure après correction) | 0 | OK | 0 sans effet | 0 |

audit.mjs : 0 FAIL, 5 WARN (horaires identiques du mercredi et du vendredi comptés comme phrase répétée ; sitemap
cherché à la racine de l'origine, normal sous `base`, lecons.md). `idleMotion` vrai sur l'accueil et la carte ; pages
histoire et réservation calmes, décision écrite dans `DESIGN.md`. Captures : `.shots-rv-lpaf/` (non commité).

## Reste pour la relecture (passe 2)

Critique aveugle de la skill jury non disponible dans une session d'agent : aucune note de jury n'est donnée ici.
Le site est jugé publiable sur les preuves ci-dessus ; la relecture doit noter Design, Créativité et Contenu sur rendu.
