# Revue portfolio · Carré d'herbes · passe 2
Verdict : A_CORRIGER (F0 : 0, F1 : 0, F2 : 2, F3 : 5). Aucun bloquant ; les deux F2 sont des finitions de cohérence éditoriale.

Lecture en une ligne de l'idée du site : une maison de bord de Meuse en menu de salle sombre, vert forêt et cuivre, cadre cuivre « carré » tracé sur la photo d'accueil et gros prix en filigrane (inchangé depuis la passe 1).

Méthode : build déjà fait et dist à jour par rapport aux sources (dist 16:57, aucune source plus récente) ; serveur propre sur le port 4577 (PID 4054, arrêté) ; mesures Playwright propres sur 6 pages x 1440 et 390 px (`.shots-cdh-rev2/`, journal `.logs/cdh-rev2-mesure.log`) + planches QA-revue2 (accueil, /menu/). Les captures QA-revue2 ne couvrent ni /carte/, /histoire/, /fetes/ ni /reservation/ : je les ai re-photographiées (`pl-d.png`, `pl-m.png`).

Scores /10
- Design 7 : palette et hiérarchie des prix inchangées et tenues ; /fetes/ et /reservation/ s'ouvrent maintenant sans eyebrow (`pl-d.png`), mais /carte/, /histoire/, /menu/ gardent eyebrow + chiffre + chapô.
- Usabilité 8 : 0 débordement, 0 erreur console, 0 requête en échec, 0 lien interne en erreur (6 testés, hors liens de navigation Astro), loader à 2,0 s.
- Créativité 6 : signature du cadre cuivre intacte, pages intérieures toujours de même gabarit.
- Contenu 8 : faits inchangés et conformes (passe 1) ; noms de pages renommés mais pas partout (F2-A) ; F3 de formats non traités.
- Technique 8 : 0 violation axe (wcag2a/aa/21aa/22aa) sur 12 combinaisons page x largeur, CLS 0, LCP mobile accueil 1388 ms, /menu/ 2384 ms (limite, inchangé).

## Vérification des corrections annoncées (REVISION-1.md)
| id | annoncé | constat | résultat |
|---|---|---|---|
| F1-1 loader | `is-loaded` ~2,05 s | mesuré 1992 à 2045 ms à 1440 px et 2001 à 2036 ms à 390 px (6 pages, sans bridage CPU) ; seuil 2,2 s respecté. Non vérifié en CPU x4 + 4G : gain mobile réel à ne pas affirmer | CONFIRMÉ (desktop), mobile non démontré |
| F2-1 axe contraste | 0 violation | `violations` vide sur 6 pages x 2 largeurs ; le chiffre est un `::before` via `data-chiffre` (`<p class="chiffre" data-chiffre="28">`, plus de nœud texte). 3 à 51 `incomplete` color-contrast sur fonds photo/dégradés, non tranchés par axe (identique à la passe 1) | CONFIRMÉ |
| F2-2 nom du h1 | noms propres | noms accessibles mesurés (hors `aria-hidden`) : « Carré d'herbes », « Les prix », « La maison », « Les plats », « Les fêtes », « Réserver » ; 1 seul h1 par page. Les `sr-only` restants (h2 de l'accueil « 4 menus », « 38 euros », « 28 ares de parc ») lisent correctement | CONFIRMÉ |
| F2-3 redondance / noms | « Formules » devient « Les prix », « Les menus » devient « Les plats », « 0 Formules dans dist/index.html » | nav, h1 et `<title>` conformes sur /carte/ (« Les prix ») et /menu/ (« Les plats »). Mais l'accueil contient encore « Lire les menus » et « Les quatre formules » (le grep annoncé était sensible à la casse), `/menu/` a toujours « Les menus de Carré d'herbes à Wépion » en meta description, `/carte/` « Les formules de Carré d'herbes » (voir F2-A). Phrase des deux hôtes dédoublée : non revérifiée mot à mot | PARTIEL |
| F2-4 gabarit uniforme | eyebrow retiré sur /reservation/ et /fetes/ | confirmé : plus de `petite-cap` dans leur hero (`pl-d.png`). Il reste sur /carte/ (« Quatre menus, une cuisine »), /histoire/ (« Le chef, la salle, le parc »), /menu/ (« Lunch, 3, 4 ou 5 assiettes ») ; photo plein cadre sur /histoire/ non faite (refus annoncé) | PARTIEL, conforme à l'annonce |

## Findings
**F2-A · Nommage incohérent après le renommage.** Le menu dit « Les plats » / « Les prix », l'accueil renvoie vers « Lire les menus » (bouton, `dist/.../index.html`) et « Les quatre formules » (bouton mobile `m-03-scroll.png`), les meta descriptions de /menu/ et /carte/ disent encore « Les menus » et « Les formules ». Un visiteur clique « Lire les menus » et arrive sur « Les plats ». Correction : harmoniser (« Voir les plats », « Voir les prix ») et réécrire les deux meta descriptions avec les mots de la nav ; revérifier avec `grep -i`.

**F2-B · Gabarit toujours répété sur trois pages.** /carte/, /histoire/, /menu/ : eyebrow (petites capitales) + h1 en capitales + gros chiffre filigrane + chapô (`pl-d.png`, colonnes 1 à 3). À 390 px le chiffre filigrane (38, 28, 4) est rogné par l'en-tête et passe derrière l'eyebrow et le titre (`pl-m.png`) : décoratif et peu contrasté, mais sale. Correction : retirer l'eyebrow là où il redit la page (« Quatre menus, une cuisine » sur /carte/) et décaler le chiffre sous l'en-tête en mobile ou le masquer sous 480 px.

**F3-1 · Apostrophes mélangées** (non traité) : `’` sur 3 pages, `'` ailleurs (« Carré d'herbes »). Uniformiser en ’.

**F3-2 · Formats d'heure mélangés** (non traité) : « 12:00 à 16:00, 19:00 à minuit » (7 pages) contre « à partir de 10h », « 13h15 », « 20h15 » (/reservation/, /menu/). Choisir « 12 h à 16 h ».

**F3-3 · Poids d'image** (non traité) : `photos/` contient un fichier de 400 224 octets (> 300 Ko, `chap-parc-1080.webp`) ; accueil toujours ~1537 Ko (audit QA-revue2).

**F3-4 · Date en dur** : « Fêtes 2026 » dans la navigation, le `<title>` de /fetes/ et le h1 ; à retirer après le 31/12 (déjà connu).

**F3-5 · Phrases répétées** (WARN audit, inchangé) : horaires répétés 2 à 3 fois sur l'accueil et /reservation/ ; acceptable (pied de page et section), à garder en connaissance de cause.

## Contrôles repassés
- Build : OK (7 pages, QA-revue2). Faits : non modifiés depuis la passe 1 (diff limité à des libellés) ; 0 tiret cadratin dans `dist/`.
- Mention « Maquette KYW, certaines données sont illustratives. » : 1 par page sur 6 pages contrôlées ; `kyw-footer__logo` : 1 par page ; `noindex` : présent ; JSON-LD : 1 par page ; `robots.txt` et `sitemap` présents dans `dist/carre-d-herbes/portfolio/` (les WARN « pas de robots.txt » de QA-revue2 sont le faux positif connu, la racine de `dist/` n'est pas le site).
- QA-revue2, page 404 : 1 violation axe color-contrast (2 nœuds) et 1 cible < 24 px sur la 404 brute de test (URL inexistante servie par le serveur de test, pas la page `404.html` du site) : la 404 réelle avait 0 violation en passe 1 ; non retestée en passe 2.
- Reduced motion : 0 texte caché (QA-revue2). Clavier : 0 focus invisible, 0 piège.

## Ce qui est bien (à ne pas casser)
1. Loader ramené à 2,0 s sans toucher au tracé du cadre cuivre ni au hero.
2. Chiffre filigrane en `::before` : 0 violation axe et noms de h1 propres ; ne pas remettre de texte dans le DOM.
3. /fetes/ et /reservation/ plus sobres sans eyebrow, avec les boutons d'appel et de contact bien visibles (`pl-d.png`).
