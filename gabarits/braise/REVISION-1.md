# Révision 1 · gabarit braise (Les Potes au Feu)

Revue traitée : `REVUE-1.md`. Vérité : `data/restaurants/les-potes-au-feu/donnees.json` et `dossier.md`.
Captures après correction : `.shots-braise-rev/<page>/` (planches `pl-*.png`), shoots en série, serveur port 4424.

| Finding | Décision | Changement (fichier) | Preuve |
|---|---|---|---|
| F1-1 descriptions de plats inventées | corrige | `src/data/site.ts` : descriptions vides (non rendues) pour mises en bouche, légumes, soufflé, mignardise, rosace ; boeuf = « Cromesquis de pommes de terre » (donnees.json) ; Saint-Jacques gardée (« snackées, mousseline, tuile noire » : photo citée au dossier) ; fromage réécrit d'après la carte (+7 / +15 €) ; détails des couches de la scène cuisson neutralisés et intro « Étapes et températures illustratives ». `pages/carte.astro` : pastille visible « exemple illustratif » sur chaque plat `placeholder: true` (avant : texte `sr-only`) ; `index.astro`, `carte.astro` : description rendue seulement si présente | `pl-carte.png` d-03/d-04/m-03 : pastilles visibles sur midi, chocolat, mignardise et café, boissons ; `pl-acc-d.png` d-02/d-03 : couches sans « douze heures » |
| F1-2 manifeste / « bord de la Meuse » | corrige en partie, refuse en partie | « légumes cultivés à côté » → « légumes cultivés localement » (Michelin, dossier l. 146). Refusé : « cuisine ouverte sur la salle » figure au dossier (l. 96, ambiance) et « bord de Meuse » aussi (l. 128, carte Michelin) | `grep` dossier.md l. 96, 128, 146 |
| F1-3 LCP / loader | corrige | Accroche `.hero__lead` (6 pages + `.lead` de la 404) sans `data-reveal`/`data-intro` ; `engine/loader.ts` : plancher 0,7 s, plafond 1,6 s, progression en temps réel (`1 - exp(-dt·14)`, indépendante des FPS) ; mobile : pas de compteur (loader masqué en CSS, attente des polices 0,3 s max) ; `motion/setup.ts` : sortie 0,4 + 0,6 s (0,45 s mobile) | Avant : LCP 3,8-4,8 s desktop, 6,5-9,0 s mobile. Après (1re passe) : LCP desktop 364 / 272 / 224 ms (accueil, carte, résa), mobile 1564 / 1260 / 1260 ms ; loader desktop 2,07-2,27 s (< 2,6 s). Loader mobile encore 3,8-5,4 s en 1re passe (JS tardif sous réseau bridé) → loader mobile supprimé, voir accueil2 |
| F1-4 contrastes axe | corrige | `motion/braise.ts` : accent par température (#EE7A45 → #F0875A → #FFC6A6 côté brun, #5E230A → #7A300F → #8F3A14 côté ivoire), muted ajusté, nouvelle variable `--c-on-accent` pour le texte des boutons remplis ; contraste ≥ 4,5:1 vérifié par script sur tout degré hors bascule 125-115 °C ; `styles/base.css` `.btn--solid` et `.btn:hover` | axe : 0 violation accueil, carte, réservation (avant : serious sur histoire et réservation) ; histoire et privatisation : voir mesures finales |
| F1-5 thermomètre sur le texte et les CTA | corrige | `styles/tokens.css` `--lane` (2,25 rem ≥ 768 px), `.wrap` réserve la voie ; `.thermo` devient une colonne étroite dans la voie gauche (réglette, valeur 1 rem, chapitre vertical), s'efface au pied KYW (`is-out`) ; mobile : thermomètre masqué, valeur dans la barre basse (`components/Barre.astro`) | `pl-acc-d.png` d-01 à d-06, `pl-carte.png` d-01/d-03/d-04 : thermomètre dans la marge, aucun chevauchement ; `pl-acc-m.png`, `pl-resa.png` : rien sur le CTA ni « Jeudi » |
| F1-6 aplat orange sur François (mobile) | corrige | `.duo` : fond brun au lieu de braise, bichromie par filtre sépia statique (plus de `multiply`) ; portraits de l'accueil en `loading="eager" fetchpriority="low"` ; plus de marge négative vers « Leur histoire » en mobile | `pl-acc-d.png` d-04 (Damien en sépia) ; `pl-acc-m.png` m-04 : plus d'aplat orange, plus de chevauchement du lien (image encore en cours de chargement sous réseau bridé dans cette passe, d'où le passage en eager) |
| F2-1 reduced-motion hiddenText | corrige | Cause : libellés des repères du thermomètre à `opacity: 0`. Libellés désormais dépliés par `clip-path` au survol/focus, lien = cible de 24 px visible | `reduced.hiddenText` 0 sur accueil, carte, réservation (avant 4 / 3 / 2) ; `r-02-mid` carte : Boissons lisibles |
| F2-2 hovers en couleur seule | corrige | `.btn:hover` translateY(-2px) + encre `--c-on-accent` ; `.link--arrow` flèche qui glisse ; liste cuisson translateX ; filtres de carte : fond au survol | `hover.noHoverChange` = [] sur accueil, carte, réservation ; `h-03-hover` |
| F2-3 répétitions | corrige | Réservation : `footerCompact` (pas d'horaires dans le pied) et e-mail retiré ; privatisation : formule renommée « Le samedi, en privé » ; colophon sans la mention « Maquette KYW » (gardée une fois dans `KywFooter`) ; note de la carte sans la mention | `pl-acc-d.png` d-07 : une seule mention ; `grep -c "Maquette KYW" dist/.../index.html` = 1 |
| F2-4 e-mail inventé affiché | corrige | e-mail retiré du pied, de la réservation et du bouton de privatisation (remplacé par « Appeler les chefs ») ; la valeur reste en `placeholder: true` dans `site.ts` | `grep bonjour@ dist/gabarits/braise` : 0 occurrence |
| F2-5 meta | corrige | « La carte de… », « L'histoire de… », title histoire « Histoire de Damien et François » ; description privatisation sans les 28 couverts fictifs ; réservation sans « par e-mail » | HTML buildé |
| F2-6 photos de l'équipe, heros sans image | corrige en partie | Sara : plus de photo de cocktail (initiales comme Jordan, aucune photo d'elle au dossier). Refusé : heros sans image sur réservation/privatisation (DESIGN : pages claires « feu éteint ») | `site.ts` |
| F2-7 mobile : nav 2 lignes, barre doublon, cible 22 px | corrige | Marque 1,1 rem nowrap, liens nowrap ; barre visible seulement après 60 % du hero ; `.kyw-footer__link` min-height 24 px | `pl-acc-m.png` m-01 : nav sur une ligne, pas de barre sur le hero |
| F2-8 « 19 h » / « 19:00 » | corrige | `heure()` dans `site.ts` : « 19 h à 21 h » partout | `pl-resa.png`, d-07 |
| F2-9 idleMotion priva | refuse | Privatisation = 20 °C, feu éteint (DESIGN.md) : halo et grain à 0 par concept | DESIGN.md |
| F3-1 skipLinkFirst | refuse | Faux négatif connu (lecons.md) | |
| F3-2 date mm/dd/yyyy | impossible | Format imposé par la locale du navigateur de test | |
| F3-3 audit non lancé | non traité | Budget ; WARN robots/sitemap attendus sous `base` | |
| FPS | corrige (allégé) | Driver : couleurs sur `<html>` réécrites seulement si Δt ≥ 0,5 °C ; halo (respiration, pointeur) écrit sur `#halo` seulement ; nœuds du thermomètre en cache ; marquee inscrit dans l'unique ticker du driver ; halo sans `mix-blend-mode`, grain ramené à `inset: 0` ; aucun filtre CSS animé | 1re passe (avant allègement du halo) : desktop 20-25, mobile 15-26 FPS (avant : 19-24 / 16-29) ; GPU logiciel, plancher de la machine |

## Mesures finales (build 2, shoots en série, port 4424)

| Page | LCP desktop / mobile | loaderMs desktop / mobile | FPS desktop / mobile | axe | reduced hiddenText | hovers sans effet |
|---|---|---|---|---|---|---|
| accueil (build final, `accueil2`) | 572 / 1416 ms | 2550 / 5450 | 29 / 14 | 0 | 0 | 0 |
| carte | 272 / 1260 ms | 2078 / 4926 | 22 / 16 | 0 | 0 | 0 |
| réservation | 224 / 1260 ms | 2084 / 3767 | 25 / 26 | 0 | 0 | 0 |
| histoire | 352 / 1424 ms | 2248 / 4479 | 19 / 23 | 0 | 0 | 1 (marque de l'en-tête, lien utilitaire) |
| privatisation | 164 / 1256 ms | 1992 / 3883 | 21 / 46 | 0 | 0 | 0 |

- LCP sous 2,5 s partout (avant 3,8-9,0 s). Loader desktop 2,0-2,55 s (< 2,6 s).
- `loaderMs` mobile reste 3,8-5,5 s : en mobile le loader est masqué en CSS (aucun rideau à l'écran) ; la mesure
  correspond au moment où le JS (62 Ko gzip, réseau et CPU bridés) pose `is-loaded`. Le contenu (accroche LCP) est
  peint à 1,3-1,4 s. Reste ouvert : le titre `data-split` reste caché jusqu'au boot JS en mobile.
- FPS : GPU logiciel du conteneur ; desktop accueil 20 → 29 après allègement, mobile accueil 14-16 (scène cuisson +
  parallaxes). À re-mesurer sur un vrai appareil avant de conclure.
- `apercu.png` régénéré depuis le build final.
