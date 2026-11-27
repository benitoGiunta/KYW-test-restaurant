# Revue awwwards · Novobel · passe 2
Verdict : A_CORRIGER

Lecture en une ligne de l'idée du site (sans avoir relu DESIGN.md) : une entreprise de rénovation namuroise vue comme un plan coté (mètre ruban, lignes de cote, gros chiffres des projets, titres condensés anthracite et jaune chantier, rideau « coffrage », 404 « Hors plan. »), signature intacte sur 5 pages et sur mobile.

Scores /10 :
- Design 8 : système unique, bande « La qualité avant tout. » désormais lisible (`plein-avec.png`), paire de photos alignée ; les trois lignes de services identiques (« Un des quatre services de Novobel. ») font vide.
- Usabilité 8 : CTA téléphone au premier écran, menu mobile `aria-expanded="true"` avec 4 liens + téléphone, 0 cible < 24 px, 0 débordement à 1440, 1024 et 390 px ; mais la page d'accueil déborde à 320 px (F2-1).
- Créativité 8 : concept « cote » décliné partout, aucun motif générique (pas de dégradé violet, glassmorphism, trois cartes égales).
- Contenu 7 : faits exacts, promesses de méthode de la passe 1 retirées ; restent quelques formules d'engagement et un texte provisoire répété trois fois (F2-2, F2-3).
- Technique 9 : 0 erreur console, 0 requête en échec, 0 lien interne mort (liens `href`/`src` confrontés aux fichiers de `dist/`), axe complet 0 violation sur 5 pages × 4 largeurs (1440, 1024, 390, 320), un seul `<footer>`, LCP mobile 1128 ms (accueil) et 1988 ms (projets) d'après QA-revue2, CLS ≤ 0,003.

Mode opératoire : `dist/` (10:11) postérieur à `src/` (aucun fichier plus récent) et captures de QA-revue2 (10:17) postérieures au `dist/` : réutilisées, planche accueil lue. Serveur propre (port 4871, PID tué). Scripts maison : axe-core complet (`node_modules/axe-core`) après défilement par 300 px, 5 pages × 4 largeurs, console, requêtes, débordement, cibles, h1, lang, noindex, mention, logo, `<footer>` ; script ciblé (bande plein, en-tête, paire, légendes, 404, formulaire, reduced-motion, menu mobile) ; extraction du texte du `dist/` confrontée à `dossier.md` ; liens internes testés sur fichiers.

## Vérification des corrections annoncées par REVISION-1
| id | verdict | preuve |
|---|---|---|
| F1-1 `aria-prohibited-attr` | confirmé | `reveal.ts:28` `aria: matches('h1…h6') ? 'auto' : 'none'` ; axe : 0 violation sur 20 cas |
| F1-2 inventions de méthode | confirmé en grande partie | plus de « un seul interlocuteur », « coup de masse », « cadrer », procédure de contact, liste de conseils ; il reste F2-2 et F2-3 |
| F2-1 double contentinfo | confirmé | 1 `<footer>` par page, `landmark-no-duplicate-contentinfo` et `region` absents (axe complet) |
| F2-2 contraste bande plein | confirmé | PIL sur le fond sans texte (zone 450×80) : contraste du texte rgb(228,226,220) de 4,6 (pire pixel) à 4,9 (95e centile), médiane 5,6 ; seuil 4,5 atteint de justesse |
| F2-3 contact contradictoire | confirmé | chapo « Téléphone ou e-mail : choisissez… », formulaire mailto avec sa note, `enctype=text/plain` conservé |
| F2-4 taxonomie | confirmé | accueil « Quatre services », projets « Quatre savoir-faire », plus de « Cinq lots » ni de « 5 » en dur |
| F3-1 légendes | confirmé | 4 `figure` sur /projets/, 4 « Image d'illustration » |
| F3-2 paire orpheline | confirmé | `.paire__a` et `.paire__b` ont x = 736, right = 1407 à 1440 px |
| F3-3 en-tête translucide | confirmé | fond calculé rgb(228,226,220) opaque |
| F3-4 404 | confirmé | `rev2/_404_html-1440.png` : CTA environ 48 px sous le paragraphe |
| Régression « Quatre services » à 390 | confirmé à 390, **non à 320** | voir F2-1 |

## Findings

### F0 / F1
Aucun. Build OK (QA-revue2 : exit 0, 5 pages). 0 fait faux : adresse, téléphone (+32 488 46 64 13 = +32 488 466 413), e-mail, Facebook, `novobel.com/jobs`, 4 projets (4, 14, 6, 4 = 28 appartements), 6 offres conformes à `dossier.md`. Aucune donnée inventée de chiffre, avis, horaire, ancienneté (le « 25 ans » contesté du dossier n'est pas repris).

### F2 (mineurs)
- **F2-1 · Accueil : débordement à 320 px** (`src/pages/index.astro:39`, `.cote__val { white-space: nowrap }` `site.css:16`). Le libellé « Quatre projets, vingt-huit appartements » (right = 367) et « Construction et rénovation, Namur » (327) dépassent ; en contexte mobile, la page s'élargit à 367 px (`innerWidth` 367, `visualViewport` 320, `scrollWidth` 367 ; le même script en contexte non mobile ne le voit pas). Absent à 390, 1024 et 1440. La révision avait corrigé le même défaut à 390 en raccourcissant un libellé, sans balayer 320. Correction : autoriser le retour à la ligne de `.cote__val` sous 26 rem (`white-space: normal`) ou raccourcir (« Quatre projets, 28 appartements »), puis `scrollWidth` à 320 sur les 5 pages.
- **F2-2 · Formules d'engagement qui restent** : `a-propos.astro:45` « Des outils, des mains, des délais tenus. » (« délais tenus » est l'engagement que REVUE-1 demandait de retirer, « outils » et « mains » ne sont pas dans le dossier) ; `a-propos.astro:10` h1 « Rénover, c'est d'abord s'engager » (formule générique, non issue du dossier). Correction : reprendre les valeurs du dossier sans promesse (« Une approche familiale. La proximité avec le client. ») ou marquer ces lignes illustratives.
- **F2-3 · Texte provisoire répété 3 fois à l'écran** : `site.ts:32-34`, « Un des quatre services de Novobel. » sous Gros œuvre, Finitions, Installations techniques (`d-02`, `m-02`) ; la première ligne a un vrai texte (« De l'étude à la remise des clés »), les trois autres ressemblent à un site inachevé. Correction : retirer la ligne descriptive des trois services (le nom suffit, comme sur /projets/) ou la remplacer par la formulation du dossier.

### F3 (finitions)
- **F3-1 · Espace simple avant « : » et « ; »** (a-propos : « clés : », « simple : » ; contact : « e-mail : », « messagerie ; » ; accueil et projets : « mots : », « Citadelle : » ; pied de page « Photos : », « Polices : » sur les 5 pages), alors que les guillemets des données portent des U+00A0 : le deux-points peut passer seul en début de ligne à 390 px. Correction : U+00A0 avant « : » et « ; » dans les `.astro` et le pied (Python).
- **F3-2 · Contraste de la note de bande juste au seuil** (4,6 à 4,9:1 sur l'échantillon PIL) : légère marge si la photo change ; un voile `rgba(0,0,0,.2)` sous le texte la sécuriserait.
- **F3-3 · Formulaire mailto en `text/plain`** : le corps reçu sera de la forme `Projet=…` / `Nom=…` (non testé dans un client de messagerie) ; accepté tant que la note sous le bouton reste.

## Ce qui est bien (à ne pas casser)
1. Concept « cote » intact après révision : mètre ruban, chiffres 4/14/6/4, 404 « Hors plan. », rideau de transition, avec le CTA téléphone dans le premier écran.
2. Honnêteté du texte : images étiquetées « Image d'illustration » (accueil, projets, a-propos, contact), formulaire qui annonce qu'il n'envoie rien, aucun chiffre, avis ni horaire inventé.
3. Technique propre : 0 violation axe à 4 largeurs, un seul `contentinfo`, `prefers-reduced-motion` respecté (0 texte caché, 0 débordement à 390), mention KYW + logo unique + `noindex, nofollow` + `lang="fr"` + un `h1` + title uniques + JSON-LD `HomeAndConstructionBusiness` sur les pages.
