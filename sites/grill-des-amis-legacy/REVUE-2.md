# Revue legacy · Le Grill des amiS · passe 2
Verdict : PUBLIABLE
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une affiche de steakhouse sombre (photo plein cadre du grill à la pince, capitales condensées fines, bouton rouge, carte en lignes tarifées), fidèle au site Wix d'origine ; inchangée depuis la passe 1.

Scores /10 :
- Design 7,5 : les en-têtes intérieurs sont maintenant des paires texte + photo 3/2 alignées sur la grille (planche `rev2gda-planche-inner.png`, viandes et contact), l'accueil ne creuse plus après « pièces entières » (`rev2gda-home-btn.png`) ; reste le même vocabulaire sobre, sans mouvement.
- Usabilité 8 : 16 Tab accueil et carte avec contour >= 2 px, lien d'évitement en premier, menu popover mobile ouvert puis fermé à Échap, bouton « Le spécial viandes » 159 x 48 px, 0 cible trop petite.
- Créativité 6 : une seule idée (photo + capitales), trois photos égales sur l'accueil, aucune animation hors hero ; non traité et non demandé en révision ciblée.
- Contenu 7,5 : les trois jours fermés sont désormais marqués « Fermé (à confirmer) » sur accueil, contact et réserver (3 occurrences chacune, mesure) ; répétitions et devise tronquée subsistent (F3).
- Technique 9 : 0 erreur console, 0 requête en échec, 0 requête externe, 0 violation axe (8 pages x 1440 et 390, axe-core complet), 0 débordement, 0 lien mort, CLS 0 et LCP 1,0 à 1,8 s sous CPU x4 + 4G lente.

Méthode et limites : `dist/` (02:43) postérieur à tout `src/` et `public/` (aucun fichier plus récent) : build non relancé, `QA-revue2.md` (captures 02:52) réutilisé. Serveur propre sur le port 4741 (celui du QA, 4503, appartient à un autre processus), arrêté en fin de tâche. Script maison sur 8 pages x 2 largeurs (axe-core de node_modules, console, requêtes, balises, débordement, liens internes testés par requête, images cassées), puis script ciblé (CLS/LCP CDP deux passes sur 4 pages x 2 largeurs, boîtes des photos, accueil, Tab, menu). Non relancés : sloplint (révision sans changement de genre), hover par rôle (variante « still »), build.

## Vérification des corrections annoncées dans REVISION-1.md
| id | annoncé | résultat de la vérification |
|---|---|---|
| R1-01 | « Fermé (à confirmer) », RAPPORT corrigé | CONFIRMÉ : 3 lignes sur accueil, contact et réserver ; `RAPPORT.md` l.33 écrit « déduit (le site d'origine ne donne que les quatre jours ouverts) » ; JSON-LD ne liste que les 4 jours ouverts ; pied : « Lundi, jeudi, vendredi et samedi » |
| R1-02 | polices auto-hébergées, CLS 0 | CONFIRMÉ : accueil 0 / 0 à 1440 et 390 (deux passes), carte 0, viandes 0, contact 0 ; 0 requête externe ; polices servies depuis `/grill-des-amis/legacy/fonts/` (4 woff2, 14 à 20 Ko) ; poids calculés utilisés (Sofia 200 et 400, Barlow 400) tous présents |
| R1-03 | un seul `footer` | CONFIRMÉ : 1 `footer` par page sur 16 mesures, axe 0 violation (plus de `landmark-no-duplicate-contentinfo`) |
| R1-04 | photo d'en-tête 3/2 | CONFIRMÉ : 832 x 555 px à 1440 (x = 544, marge droite 64 px) sur viandes, à propos, réserver, contact, traiteur et carte ; 358 x 269 px à 390, sans débordement ; la photo à logo incrusté (contact) reste, voir R1-08 |
| R1-05 | lien devenu bouton, écart réduit | CONFIRMÉ : `a.btn` 159 x 48 px, 120 px jusqu'à la fin de section (≈ 240 avant), capture `rev2gda-home-btn.png` |

Aucune régression constatée : titres, descriptions et OG uniques, `lang="fr"`, un `h1`, `noindex` 16/16, mention KYW 16/16, favicon, JSON-LD, 404 conçue (`404.html`), menu mobile et ordre de tabulation inchangés.

## Findings

### F0, F1, F2 : aucun.

### F3 (finition, non traités par la révision ciblée, à garder en dette)
- **R1-06 · répétitions** (inchangé) : horaires écrits sur 3 pages + pied ; « Pour le plaisir de nos amis. Elise et Gaëtan » sur les 8 pages, 404 comprise (`Footer.astro:11-12`) ; phrase « le temps affine la texture » sur accueil et viandes. Correction : enlever la signature de la 404.
- **R1-07 · devise tronquée** (inchangé) : le dossier donne « pour le plaisir de nos clients, nos amis ».
- **R1-08 · logos incrustés** (inchangé) : photo d'armoires de maturation sur l'accueil (cadre « CM » visible en bas à droite de la vignette, `rev2gda-home-btn.png`) ; cocktails en visuel de la page contact, hors sujet.
- **R1-09 · carte** : intertitres redondants « Les entrées » et « À partager (entrées) » toujours dans `dist/carte/index.html`.
- **R1-10 · alt et légende** du hero : alt non vide conservé.
- **R1-11 · graphie** : « Le Grill des amis se déplace chez vous » (`traiteur/`) au lieu de « amiS » ; « passion » 4 occurrences sur `a-propos/`.
- **R1-12 · RAPPORT** : § 5 aligné sur l'absence d'avis (corrigé en passant par la révision).
- **R2-01 · préchargement inutile** : `Base.astro:27,44` précharge `barlow-300.woff2` (20 Ko), aucun texte n'utilise Barlow 300 (poids calculés : Barlow 400 seulement). Retirer de `fontFiles`.

## Ce qui est bien (à ne pas casser)
1. Polices auto-hébergées avec préchargement : CLS à 0 partout, LCP mobile de 1,0 s (accueil) à 1,8 s (viandes) sous throttling.
2. Les trois jours fermés explicitement « à confirmer », JSON-LD limité aux jours ouverts : honnête vis-à-vis du dossier.
3. En-têtes intérieurs en 3/2 alignés sur la grille, carte et hero de l'accueil intacts, pied KYW unique avec mention sur les 8 pages.
