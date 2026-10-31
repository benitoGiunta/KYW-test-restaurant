# Révision 1 · gabarit forno · Les Potes au Feu

Revue traitée : `REVUE-1.md` (A_CORRIGER). Build `node scripts/build-site.mjs gabarits/forno` OK. Vérifications :
mini-script Playwright (scratchpad, `launch()` de browser.mjs, `page.clock` + `Europe/Brussels`, JS coupé) puis
`shoot.mjs` sur les 6 pages touchées (`.shots-forno-rev/<page>`, serveur port 4432), lues en planche.

| Finding | Décision | Ce qui a été changé (fichier) | Preuve de vérification |
| --- | --- | --- | --- |
| F1-1 bandeau sous l'en-tête | corrige | `base.css` : `.bandeau { margin-top: var(--hdr) }`, `.bandeau + .page-hero` sans double réserve ; en-tête mobile ramené à 92 px (= `--hdr` 5,75 rem) ; `role="note"` sur le bandeau | Playwright : bandeau top 72 (1440) / 92 (390) = bas de l'en-tête, sans JS aussi ; captures `top-*` et `.shots-forno-rev/pates`, `a-emporter` |
| F1-2 accents des capitales | corrige | Cause : pas la police (Big Shoulders 800 a É È Ê À Â Ç Œ, vérifié avec fontkitten) mais le masque SplitText `.split-line-mask` (`overflow: clip`) avec line-height 0,85. `base.css` : `:is(h1,h2,h3,.display) .split-line { padding-top: .18em; margin-top: -.18em }` + `.page-hero .eyebrow + h1` écarté du surtitre | Captures du h1 : « FOUR ÉTEINT » (1440 et 390), « PÂTES FRAÎCHES », « LES FOURNÉES » lisibles ; accent qui touchait « CATALOGUE » corrigé par la marge |
| F1-3 libellé du compte en mobile | corrige | `base.css` : en ≤ 767 px le libellé reste affiché (0,625 rem au-dessus des chiffres), compte en rangée 1 à droite de la marque ; `setup.ts` inchangé pour les libellés | `page.clock` mer. 12:30 à 390 : « C'EST OUVERT / jusqu'à 14:00 » ; mer. 10:00 : « PROCHAIN SERVICE / 01h 59min 55s » |
| F2-1 « HEURES » orphelin | corrige | `base.css` : `.compte.is-ouvert .compte__nums small { display: none }` | mer. 12:30 à 1440 : « C'EST OUVERT jusqu'à 14:00 », plus d'unité |
| F2-2 accord lecteur d'écran | corrige | `setup.ts` : unités accordées, parties nulles omises | « dans 1 heure 59 minutes » (mer. 10:00), « dans 2 jours 3 heures 59 minutes » (sam. 15:00) |
| F2-3 zéros sans JS | corrige | `Header.astro` : `.compte__nums` porte `hidden`, libellé initial « Réserver une table » ; `setup.ts` retire `hidden` au premier calcul ; `base.css` `.compte__nums[hidden]` | JS coupé : `display: none`, texte « RÉSERVER UNE TABLE » |
| F2-4 compteur 08 et suppléments numérotés | corrige | `site.ts` : `services: 4`, `horsService` (mises en bouche, mignardise, 2 suppléments), `horsFormule` (bon cadeau), `numerosServices()`, `compteCategorie()` ; `index.astro`, `carte.astro` | Menu « 04 », disques 01 à 04 seulement, fiches hors service sans disque ; « Les formules 03 » |
| F2-5 « d'après le dossier » | corrige | `a-emporter.astro` : « Pour toute question, appelez le restaurant : » (plus de « uniquement ») ; même jargon trouvé sur l'accueil (avis d'exemple « aucun avis client trouvé dans le dossier ») → « texte illustratif » (`site.ts`) | `grep dossier dist/gabarits/forno` : 0 |
| F2-6 disques à initiale | corrige | `Fiche.astro` : pas de vignette sans photo ni numéro (`.fiche--nue`) ; `carte.astro` ne passe plus d'initiale | carte : Options et Boissons sans disque |
| F2-7 « Réserver » coupé en mobile | corrige | `Header.astro` : « Pâtes » + `.nav__suite` « fraîches » masquée en ≤ 767 px ; `base.css` : gap 0,8 rem, compte remonté en rangée 1 | nav `scrollWidth` 358 = `clientWidth` 358 à 390 px ; en-tête 92 px au lieu de 122 |
| F2-8 formulaire qui jette la saisie | corrige | `reservation.astro` : la validation affiche un récapitulatif (`role="status"`, focus) avec « Confirmer sur Zenchef », « Appeler », « Modifier » qui rend le formulaire rempli. Zenchef ne reçoit pas les champs (pas de paramètres publics de préremplissage) : dit en toutes lettres | Playwright : « Marie Dupont, 3 couverts, le jeudi 12 novembre à 19:30. », « Modifier » rend le nom saisi ; FICHE mise à jour |
| F2-9 « détourés » | corrige | `pates.astro` : « Douze produits, par catégorie… » | grep dist |
| F2-10 double drapeau | corrige | `site.ts` : étiquettes `exemple` retirées (le bandeau et « illustratif » suffisent) | pates : un seul drapeau par fiche |
| F3-1 fuseau, fériés | corrige (doc) | `FICHE.md` (Limites) | — |
| F3-2 menu 67 € répété | corrige | `site.ts` : description courte, renvoie au détail affiché au-dessus | carte |
| F3-3 points médians collés | corrige | `a-emporter.astro` : ligne construite en une chaîne | « Soir · lun., mar., … · 19:00 à 21:00 » |
| F3-4 même photo de salle en pied de page | refuse | Le pied de page en couches (nom + photo qui glisse) est la signature commune des pages (DESIGN.md, « Ce qui est bien » n° 2 de la revue) ; F3 | — |
| F3-5 avis et e-mail d'exemple | refuse | Conformes à la règle (drapeau visible), à retirer à l'adaptation, rien à changer dans le gabarit | — |
| F3-6 WARN audit | refuse | WARN attendus (horaires répétés, 404 sous `base`) | — |

Bilan : 16 corrigés, 3 refusés (F3), 0 impossible. F2-8 corrigé côté saisie ; la transmission des champs à Zenchef
reste hors de portée d'un site statique.
