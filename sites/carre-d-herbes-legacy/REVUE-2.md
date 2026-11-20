# Revue legacy · Carré d'herbes · passe 2
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : brochure sobre de restaurant de bord de Meuse, fond crème, titres serif brun, un seul bouton rouge, grande photo d'assiette en hero, menus à onglets et fêtes 2026 détaillés.

Méthode et réserves : `QA-revue2.md` est INCOMPLET (shoot en échec, 1 page sur 9, aucun report.json) ; je ne m'en sers que pour le build (OK) et l'audit (0 FAIL). dist (16:54:36) est postérieur à tout `src/` (aucun fichier source plus récent). Mesures refaites par script maison (serveur 4431, PID 31530 arrêté) : 9 pages x 5 largeurs (320, 390, 768, 1024, 1440), défilement à la molette, console, requêtes, débordement (Range par nœud texte + scrollWidth/clientWidth), cibles < 24 px, plages horaires sur plusieurs lignes, axe-core (wcag2a/aa, 2.1, best-practice), balises ; liens internes par lecture de `dist/` (267 testés) ; planches `.shots/cdh-r2/pl-a.png`, `pl-b.png`, `h-320.png` (lues). CLS/LCP mobile throttlé (CPU x4, 3G rapide) : CLS 0,001, LCP 1,6 s ; reduced-motion : 0 texte à opacité 0, premier Tab = « Aller au contenu ». Journaux : `.logs/cdh-r2-*.log`.

## Vérification des corrections de REVISION-1 (6 annoncées)
| id | résultat | preuve |
|---|---|---|
| F1-1 prix coupé /fetes-2026/ | CONFIRMÉ | `pl-a.png` f-d et f-m : « 22 € en entrée / 32 € en plat » sur deux lignes, entier ; 0 texte hors fenêtre et 0 rognage sur fetes-2026 à 5 largeurs |
| F1-2 « mercredi au dimanche » | CONFIRMÉ | aide de date « Le restaurant ouvre du jeudi au dimanche. Format : jj/mm/aaaa. » (`#date-h` mesuré, `r-d.png`) ; le « mercredi » restant concerne le téléphone (dès 10 h), conforme au dossier |
| F2-1 erreur console | CONFIRMÉ | 0 erreur console, 0 requête en échec sur 45 contextes ; `favicon.svg` + `<link rel="icon">` présents |
| F2-2 horaires coupés | CONFIRMÉ | 0 `<time>` sur plusieurs lignes à 320/390/768/1024/1440 (9 pages) |
| F2-3 SEO | CONFIRMÉ | `og.jpg` 1200x630 (165 Ko), og:image, twitter:card, 1 JSON-LD Restaurant ; adresse, téléphone, jeudi à samedi 12-16 h et 19 h-23 h 59, dimanche 12-16 h identiques à `donnees.json`, pas de geo |
| F2-4 cible tactile téléphone | CONFIRMÉ | 0 cible < 24 px (liens hors texte courant, boutons, champs) sur 9 pages x 5 largeurs |

Non traités annoncés : F3-1, F3-2, F3-3 (hors liste, toujours présents).

## Scores /10
- Design 7 : hiérarchie et palette tenues, photos fortes (`pl-b.png` h-m) ; hero mobile qui s'arrête avant le bas de l'écran (F3-3).
- Usabilité 6 : onglets, formulaire et téléphone cliquable corrects ; à 320 px le bouton « Menu » est hors de l'écran (F2-1).
- Créativité 5 : fidèle à l'original, signature limitée au hero ; acceptable pour une variante legacy.
- Contenu 8 : faits conformes (aucun écart contre `donnees.json`), vouvoiement, aucune invention nouvelle ; reliquats de filler (F3-2).
- Technique 8 : build OK, 0 erreur console, 0 requête en échec, 0 débordement horizontal de page, axe WCAG 0 violation, LCP 1,6 s, CLS 0,001.

## Findings (triés par gravité)
F2-1 · F2 · à 320 px le bouton « Menu » du bandeau sort de la fenêtre (« Menu » R 343 pour 320 px) sur les 9 pages ; il est rogné sans défilement possible, donc la navigation principale est inaccessible à cette largeur (preuve `h-320.png`, mesure Range sur 9 pages ; 390 px et plus : OK). Fichier : styles de l'en-tête (`.nav`, boutons « Réserver » et « Menu », `page.css`/`base.css`). Correction : sous 360 px réduire le padding horizontal et la taille des deux boutons ou masquer « Réserver » (le bouton rouge du hero reste), pour que « Menu » tienne dans 320 px.
F3-a · F3 · axe best-practice `landmark-no-duplicate-contentinfo` (moderate) sur les 9 pages x 5 largeurs : deux `<footer>` de premier niveau (`footer.colophon` du site et `footer.kyw-footer` du paquet). Correction : transformer `.colophon` en `<div>` ou `<section aria-label="Coordonnées">` (ne pas toucher au paquet `kyw-footer`). Hors critère « axe critique ».
F3-b · F3 · `404.html` porte un canonical vers `/carre-d-herbes/legacy/404/` qui n'existe pas (seul lien « cassé » parmi 267 liens internes testés). Correction : pas de canonical sur la 404 (`noindex` déjà présent).
F3-c · F3 · polices servies depuis Google Fonts (`Base.astro:42-44`, Yeseva One, Archivo, Archivo Narrow) : dépendance externe et feuille bloquante ; auto-héberger en woff2 si la politique du dépôt l'exige (l'audit signale aussi des ttf/otf à convertir).
F3-1 · F3 · (reporté de la passe 1, non traité) « À la carte ou sous forme de menus » sur /le-restaurant/ contredit le dossier (menus uniquement).
F3-2 · F3 · (reporté, non traité) filler « chef passionné et déterminé », « vue magnifique en toute saison ».
F3-3 · F3 · (reporté, non traité) bande de hero mobile qui s'arrête avant le bas de l'écran (`h-m.png`, ~100 px vides sous « Voir les menus »).
Note : en capture le champ date affiche « mm/dd/yyyy » (locale du Chromium headless) sous une aide « Format : jj/mm/aaaa » ; sans effet sur un navigateur en français. L'aide est écrite par script (vide sans JavaScript) : acceptable.

Comptes : F0 0, F1 0, F2 1, F3 6 (dont 3 reportés).
Critères PUBLIABLE : build OK, 0 console, 0 lien mort réel (le canonical de la 404 mis à part), 0 fait faux, 0 invention, 0 débordement de page, 0 axe critique, mention + logo + noindex présents sur 9 pages ; seul F2-1 (texte hors fenêtre à 320 px) empêche le verdict PUBLIABLE.

## Ce qui est bien (à ne pas casser)
1. Hero photo plein cadre, titre « Cuisine sincère et raffinée », un seul bouton rouge rempli, lisible de 320 à 1440 px.
2. Fêtes 2026 et menus : prix, plats et accords traçables au dossier, prix du ris de veau désormais lisible sur deux lignes.
3. Accessibilité et performance : skip link premier au clavier, un h1 par page, 0 violation axe WCAG, reduced-motion sans contenu caché, LCP 1,6 s, CLS 0,001.
