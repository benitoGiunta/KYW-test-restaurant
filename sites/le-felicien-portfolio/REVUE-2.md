# Revue portfolio · Le Félicien · passe 2
Verdict : PUBLIABLE

Lecture en une ligne de l'idée du site (sans relire DESIGN.md) : une brasserie « à l'ardoise », fond vert sombre, noms et prix à la craie, onglets carte / midi / bar, suggestion du jour, barre fixe Réserver / Appeler / Événements ; inchangée depuis la passe 1.

Scores /10 :
- Design 7 : planches desktop et mobile (`rev2-fel-planche-d.png`, `-m.png`) inchangées dans leur composition ; la carte mobile sans vignettes reste nette et alignée ; la moitié droite du hero desktop reste vide.
- Usabilité 7 : Tab, 11 premiers arrêts sur l'accueil, tous en `outline: solid 2px`, « Aller au contenu » en premier ; onglets fonctionnels (3 onglets, 1 panneau visible après clic).
- Créativité 7 : écriture à la craie et suggestion du jour conservées ; l'aperçu photo au survol est désormais inactif (voir F1-1), ce qui retire un effet signature.
- Contenu 8 : « par téléphone » et « Appeler le … » retirés des pages de réservation et de la meta ; vignettes de plats retirées ; répétitions accueil / histoire supprimées ; reste de mineurs.
- Technique 9 : 7 pages x 1440 et 390 px, axe-core complet : 0 violation (region, aria-prohibited-attr, heading-order levés) ; 0 erreur console, 0 requête en échec, 0 débordement, `noindex, nofollow`, mention, 1 logo `kyw-footer`, 1 h1, `lang=fr`, OG et JSON-LD sur 7 pages sur 7 ; 0 nœud à opacité 0 en reduced-motion.

Preuves : `dist/le-felicien/portfolio/` (00:57) postérieur à tout `src/` (aucun fichier source plus récent) et à REVISION-1 (00:53). `QA-revue2.md` est absent : aucune planche de l'agent captures n'existait ; captures et mesures refaites ici (script maison `rev2-fel-main.mjs` : launch, axe-core de `node_modules`, console, requêtes, débordement, balises, 14 cas ; `rev2-fel-cap.mjs` : survol, onglets, Tab, reduced-motion ; 6 captures fenêtre). Serveur propre sur le port 4752, arrêté.

## Vérification des corrections annoncées (REVISION-1.md)
| id | verdict | preuve |
|---|---|---|
| F1-1 | confirmé par le code, non testable en situation | `setup.ts:209` et `:211` : `overwrite: 'auto'` ; bundle `Base.astro_astro_type_script_index_0_lang.p28wd5zI.js` : 3 `overwrite:"auto"`, les 4 autres `overwrite:!1`. `data-preview` : 0 sur les 7 pages, donc `apercu()` sort dès `!lignes.length` ; survol d'une ligne d'accueil : boîte `visibility: hidden`, opacité 0, aucune erreur. Si des photos de plats prouvées reviennent, refaire le test de position (`getBoundingClientRect` après `mouse.move`). |
| F2-1 | confirmé | 0 `data-preview`, 0 `tabindex` sur `.ligne__in`, aucune vignette en 390 px (`m-carte`), photo des pâtes conservée sur la page salle. |
| F2-2 | confirmé | « par téléphone » : 0 occurrence sur 7 pages ; « Appeler » : 0 dans les pages (reste le libellé de la barre fixe) ; meta réservation : « en ligne via Tablebooker. Contact : 081 39 53 23. » ; bouton « Contact : 081 39 53 23 » (`d-reservation`). |
| F2-3 | confirmé, 2 reliquats en F3 | accueil / histoire : accroche et paragraphes « Lancé fin 2019 » / « rouverte le 22 janvier » ne sont plus recopiés (1 occurrence sur chaque page : renvoi sur l'accueil, récit sur `histoire/`) ; « 27 € » : 1 écriture « 27 € » sur `formules/` plus les pastilles « dès 27 € » ; « semaine du … novembre » : 0. |
| F2-4 | confirmé | axe : 0 violation sur 14 cas (dont `region`, `aria-prohibited-attr`, `heading-order`). |

## Findings (aucun F0, F1 ni F2)

### F3 finition
- **F3-1** (reliquat passe 1) Doublon « maison » : « Boulets à la liégeoise maison » et « Vol-au-vent maison » portent aussi le badge MAISON (`d-carte`, `m-carte`).
- **F3-2** (reliquat) Bambins « Midi et soir » (`site.ts:289`, plage non donnée par `donnees.json`) et « avec frites ou pâtes » ; `histoire/` « À eux deux, plus de trente années d'expérience » (`site.ts:295`, le dossier cite « plus de trente années d'expérience (site) » sans dire qu'elle vaut pour le duo) ; « La carte reste celle des grands classiques » (`site.ts:296`). Reformuler au plus près du dossier.
- **F3-3** (reliquat) Accueil, accès : « Stationnement et transports en commun : informations à venir (non communiquées par la maison). » (`site.ts:87`, marqué `placeholder`) : formulation interne visible du public.
- **F3-5** (reliquat) Horaires « 12h00 » (bandeau, réservation) contre « 12:00 à 14:00 » (tableaux, 7 occurrences) ; apostrophes droites (« L'Avenir », « d'Ecolys »).
- **F3-6** (reliquat) Formulaire de réservation en GET vers `reservations.lefelicien.be` avec nom et message en paramètres d'URL ; le texte « formulaire de démonstration sans envoi » est honnête ; un simple lien serait plus sûr.
- **F3-7** (reliquat) Page salle : six photos libres sans rapport avec le lieu, créditées et marquées « illustration ».
- **F3-8** (nouveau, dû à la révision) Formules : le bloc « Banquets et réceptions » a pour description « Pour dîners, banquets et réceptions. », qui répète son titre ; l'accueil recopie encore « Entrée et plat 25 €, plat seul 18 € » et la description des bambins de `formules/` (audit : mêmes lignes sur deux pages). Une phrase de renvoi suffit.
- **F3-9** (nouveau) La boîte d'aperçu `[data-apercu]` (`<img>` sans `src`) reste dans le DOM de l'accueil et de la carte, inerte : à retirer tant qu'aucune photo n'est prouvée (le code `apercu()` peut rester).

### Faux positifs écartés
- Éléments « hors fenêtre » du script de débordement : `.etat__piste` (défilement du bandeau, clippé) et la boîte d'aperçu (hors écran) ; `scrollWidth` = largeur de fenêtre sur 14 cas.
- `imgsKO=1` sur accueil et carte : l'`<img>` d'aperçu sans `src` (F3-9), aucune requête en échec.
- 404 : `404.html` mesurée directement (`title`, `lang=fr`, 1 h1, noindex, 0 violation axe).

## Ce qui est bien (à ne pas casser)
1. Carte : 68 lignes, 0 écart de prix ou de nom (passe 1), toujours rendue sans vignette parasite, formats de prix intacts ; JSON-LD et horaires justes.
2. Accessibilité : 0 violation axe sur 7 pages x 2 largeurs, h1 / h2 / h3 en ordre, focus visible, reduced-motion sans contenu masqué.
3. Honnêteté : « suggestion illustrative », photos libres créditées, mention « Maquette KYW… », un seul logo, 0 lien interne mort (7 liens testés, 200), liens externes aux vraies URL du dossier (Tablebooker, Facebook, Instagram, L'Avenir).
