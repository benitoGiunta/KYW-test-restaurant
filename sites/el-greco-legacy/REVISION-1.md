# REVISION-1 — el-greco legacy (réponse à REVUE-1.md)

F0 : aucun.

## Corrigé
- **F1-1 nom illisible** : `Nav.astro` affiche « El Greco » en texte (Bodoni, 1,25 rem) à côté du trait de pinceau ; sous 40 rem le trait est masqué (il chevauchait « Menu » à 390 px), sous 24 rem le texte passe en visually-hidden (`aria-label` conservé). Capture 390 et 1440 relues : nom lisible, aucun chevauchement.
- **F1-2 SEO** : `Base.astro` ajoute `canonical`, `og:type/site_name/locale/title/description/url`, favicon SVG en data URI (plus de 404 `/favicon.ico` côté balise) ; JSON-LD `Restaurant` sur l'accueil (adresse, `telephone`, `geo`, horaires jeudi 18-22, vendredi et samedi 12-15 + 18-22, dimanche 18-23 ; lundi à mercredi non inventés). `noindex` conservé. Pas d'image OG (aucune photo propre).
- **F2-1** : `.pied` devient `<section aria-label="Coordonnées">` ; 1 seul `<footer>` (KYW) sur les 6 pages.
- **F2-2** : `.lieu a, .contact a, address a, .note a` en `inline-block` avec `padding-block: .15rem` ; 0 lien isolé sous 24 px sur les 6 pages à 360, 390 et 1440.
- **F2-3** : mention des photos réservée à l'accueil et à Notre histoire (prop `photos`), reformulée « photographies de stock (Pexels), pas le restaurant ».

## Vérifications (script maison, build final via scripts/q.sh)
- 6 pages × 3 largeurs : `scrollWidth` = fenêtre (0 débordement), 0 réponse 4xx/5xx.
- grep `dist/` : canonical, og:title, icon, noindex présents sur 6 pages ; JSON-LD sur l'accueil seulement ; mention photos sur 2 pages.
- Non refait (hors liste) : axe complet, sloplint, audit.

Hypothèses : favicon en lettre « G » (bleu de la marque), URL canonique sur le domaine de déploiement du dépôt.
