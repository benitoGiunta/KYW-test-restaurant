# Révision 1 · Le 54 legacy (F2 seulement)
| id | décision | changement | preuve |
|---|---|---|---|
| F2-1 | corrigé | titres, descriptions et OG : « de Le 54 », « chez Le 54 » (7 pages, `src/pages/*.astro`) | grep `du Le 54\|au Le 54` dans `dist/` : 0 |
| F2-2 | corrigé | `Nav.astro` aria-label « Le 54 Dave, accueil » + espace entre les spans ; `Footer.astro` : `<footer>` devenu `<section aria-label>` | mesure : 1 seul `<footer>` par page |
| F2-3 | corrigé | `contact.astro` : phrase `.form__lim` avant les champs | présente dans le HTML |
| F2-4 | corrigé | `page.css` : `.foot a, .link, .contact a` en inline-block, padding-block 0.2rem | 0 lien/bouton < 24 px à 390 et 360 (home, carte, contact), scrollWidth = largeur |
| F2-5 | corrigé | `page.css` : `object-position: 70% 60% !important` sous 40rem | capture ciblée 390 : tables et verres visibles |
| F2-6 | corrigé | `site.ts` légendes neutres (« Une assiette de la maison », « Un plat de la maison »), aria-label du bandeau accueil | grep |
| F2-7 | corrigé | `Base.astro` JSON-LD : `openingHoursSpecification` (jeu, ven, dim midi ; jeu à dim soir ; sans lundi) et `priceRange` | présent dans le JSON-LD |
F3 : twitter:card ajouté (Base.astro). Non traités : polices externes, BCE, robots.txt (F3).
sloplint src : 0 FAIL, 0 REFLEX, 0 WARN. Build : 7 pages OK. Serveur arrêté. Hypothèse : lundi exclu du JSON-LD.
