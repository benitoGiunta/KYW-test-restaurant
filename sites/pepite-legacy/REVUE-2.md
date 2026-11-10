# Revue legacy · Pépite, cave à manger · passe 2
Verdict : PUBLIABLE (0 F0, 0 F1, 2 F2, 5 F3)

Lecture en une ligne de l'idée du site (sans avoir relu DESIGN.md) : une page unique sombre (brun café, saumon, Young Serif) qui ouvre sur la photo des bouteilles puis enchaîne menu de la semaine en rangées, bandeau vins avec photo de couvert, portrait de la cave, presse et horaires ; sobre, cohérent, toujours très typographique.

Base : dist (13:30) postérieur à `src/` et `public/` (`find -newer` vide) et à REVISION-1 (13:28) ; QA-revue2 et captures `.shots-pepite-legacy-revue2/home/` (13:33) postérieures au dist : réutilisées. Serveur propre sur le port 4751 (PID 4560, arrêté par `kill`). Script maison unique (axe-core de node_modules, console, requêtes, débordement, cibles, balises) sur accueil et `404.html` réelle à 1440, 768 et 390 px, géométrie des blocs à 1440, 1920, 1024 et 390 px, reduced-motion, CLS/LCP sous CPU x4 + 4G lente en 2 passes, 16 Tab.

Scores /10 :
- Design 7 : hiérarchie nette, bandeau vins rééquilibré (`d-03-scroll`), mais le portrait garde ~320 px de vide sous son texte (`d-04-scroll`).
- Usabilité 8 : CTA Réserver en nav, hero et horaires, 16 Tab sans focus invisible (outline 2 px), `tel:+32476620182`, cibles >= 24 px (0 trop petite), menu mobile OK.
- Créativité 6 : les étiquettes du hero portent le site ; le reste reste des rangées et bandeaux standards.
- Contenu 8 : 0 fait faux, 0 invention : horaires conformes à dossier.md l.44-46, citations Le Vif / So Soir reprises du site d'origine (`site-actuel/page.html` l.444, 484).
- Technique 9 : build OK, 0 erreur console, 0 requête en échec, 0 débordement (scrollWidth = fenêtre à 390/768/1440), CLS 0,0009, LCP mobile throttlé 952 puis 728 ms, reduced-motion : 0 texte à opacité 0, 404.html réelle 0 violation axe.

## Vérification des corrections de REVISION-1
| id | annoncé | constat | état |
|---|---|---|---|
| F1-1 | phrase horaires réécrite, phrase inventée supprimée | `dist` : « La boutique ouvre dès 16 h (dès 10 h 30 le samedi), la cave à manger dès 19 h. », 0 « À toute heure » ; conforme au dossier (l.44-46) ; capture `m-05-scroll` | vérifié |
| F1-2 | intitulé « Les sélections de Pépite » + liste reliée au bouton | h3 présent (14 px, 600, couleur muted, `d-03-scroll`), `ul aria-labelledby`, bouton « Commander en ligne » juste dessous ; trois libellés non cassés à 1440/1024/390 (`scrollWidth <= clientWidth`) | vérifié (intitulé discret : F3-5) |
| F2-1 | `tel:+32476620182` | grep dist : seul `tel:+32476620182` | vérifié |
| F2-2 | « Catherine Mathieu, fondatrice » ; « Photographies : site d'origine » | texte du dist conforme, `photos/index.json` source = site d'origine ; note de travail disparue | vérifié |
| F2-3 | h2 « À partager en ce moment », « Voir le menu » | dist conforme, 0 « cette semaine » ; `Menu du jeudi 12 au samedi 14 novembre` conservé (donnees.json) | vérifié |
| F2-4 | corrigé en partie : photo couvert au bandeau vins, lieu aligné en haut | vins 843 px (était 927), lieu 946 px (était 1113) ; alt = `sujet` de photos/index.json ; vide sous le portrait réduit seulement | partiel, voir F2-2 |

## Findings
### F2 mineurs
- **F2-1 · `src/components/Pied.astro:4` · landmark dupliqué** : axe complet (non vu par le QA, qui ne le signale pas) donne `landmark-no-duplicate-contentinfo` (moderate) sur l'accueil à 1440, 768 et 390 px : `<footer class="pied">` et `<footer class="kyw-footer">` sont deux `contentinfo` de premier niveau. Preuve : script de mesure, `axe: ["landmark-no-duplicate-contentinfo(moderate,1)"]` aux 3 largeurs ; la 404 réelle a 0 violation. Correction : passer `.pied` en `<div class="pied">` (ou `<section aria-label="Coordonnées">`), sans toucher au paquet `kyw-footer`. Le `<footer>` de la citation (`Lieu.astro:15`) n'est pas concerné (dans un blockquote).
- **F2-2 · `page.css:114-118` (`.lieu__grid`, `.lieu__txt`) · vide résiduel** : à 1440 px la photo du portrait fait 658 px, le texte 334 px (`lieuTxt` 334 contre `lieuPhoto` 658) : ~320 px vides sous « Pépite a ouvert en 2017… » (`d-04-scroll`), même mesure à 1920 (347 / 658). REVISION-1 l'annonce comme réduit, pas supprimé. Correction : `align-items: center` sur `.lieu__grid` au-dessus de 60 rem, ou limiter `.lieu__photo img` à `aspect-ratio: 4 / 5` (hauteur ~520 px).

### F3 finition
- **F3-1** : jour courant décalé de 16 px (« Fermé » à x=912 contre 896, `d-06-scroll`) ; `.hor[aria-current="date"]` ajoute `padding-inline` (`page.css:138`). Non traité (hors liste).
- **F3-2** : Jeudi et Vendredi répètent les mêmes lignes (WARN audit « phrase répétée 2 fois ») ; regrouper en « Jeudi et vendredi ». Non traité.
- **F3-3 · `Presse.astro`** : « Le Vif » et la date se touchent à l'oeil (`d-05`) ; « Pépite, le vin en partage. » est un titre d'article (donnees.json l.167) présenté comme extrait. Non traité.
- **F3-4** : quatre polices en TTF/OTF (244 Ko, WARN audit) ; convertir en WOFF2. Non traité.
- **F3-5** : l'intitulé « Les sélections de Pépite » est petit et peu contrasté en regard des trois noms en 2 rem (`d-03-scroll`) ; la photo `couvert` (source 1024 px, qualité 4/5 au fichier index) paraît molle à l'écran. Acceptable en ambiance, à surveiller si la photo est remplacée.

## Faux positifs ignorés
- QA-revue2 : « 404 sans `<title>` ni `lang` » = réponse brute de `serve.mjs` ; `404.html` réelle : `lang="fr"`, title « Page introuvable, Pépite cave à manger », un h1, noindex, axe 0.
- QA-revue2 : « pas de sitemap » faux (`sitemap-index.xml` et `sitemap-0.xml` dans dist) ; pas de `robots.txt` (inoffensif, `noindex` sur chaque page).
- Contraste « à vérifier » axe (43, fond de grain) : sans violation. Liens externes (Tablebooker, Google Forms, Facebook, Instagram, Maps) non testés (pas de réseau).

## Critères de publication
Build OK, 0 erreur console, 0 lien mort interne (ancres présentes, `base` correct), 0 fait faux, 0 invention, 0 débordement, 0 violation axe critique ou serious, mention « Maquette KYW, certaines données sont illustratives » + 1 logo `kyw-footer__logo` + `noindex` sur `/` et `404.html`, JSON-LD présent.

## Ce qui est bien (à ne pas casser)
1. Le hero sur les bouteilles, une seule action principale, plein écran à 1440 et 390 px.
2. Le menu en rangées avec « 58 € » en grand, et les horaires avec « Aujourd'hui » calculé (mardi, exact au 10/11/2026).
3. Le bandeau vins à 8/4 colonnes avec la photo de couvert : fini le vide à droite ; accessibilité clavier et mobile intacte.
