# Revue portfolio · Escale en Vue ! · passe 3
Verdict : PUBLIABLE
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une guinguette de papier découpé (objets au trait, tirages posés sur une table verte, aplats corail et paille) dont le bandeau dit franchement que la saison 2026 est terminée.

Méthode : `src/` et `dist/` datent tous deux de 02:58 ; les captures de QA-revue3 (02:52) précèdent la révision 2, je ne les ai donc pas réutilisées pour juger les corrections (seuls chiffres et planches utilisés : audit sans FAIL, 6 pages, 0 erreur console). Build relancé (exit 0, 6 pages, dist de 03:00). 3 scripts maison sur mon port 4937 (PID 10081, arrêté) : 6 pages x 320/390/1024/1440 (console, requêtes en échec, `scrollWidth`, axe-core complet, h1, `lang`, noindex, mention KYW, titres), CLS/LCP avec sources (4 largeurs x 2 passes, mobile CPU x4 + 4G lente), captures de fenêtre (avis 320/390/1024/1440, hero 320/1024/1440, planche `r3-planche-desktop.png` dans `.shots-escale-en-vue-portfolio-revue3/`) ; extraction du texte du `dist` confrontée à `donnees.json` et `dossier.md` ; liens internes testés par `curl`.

Scores /10
- Design 8 : signature intacte (hero à objets au trait, table verte), parasol de l'accueil désormais lisible en mobile (`r3-avis-320.png`, `r3-avis-390.png`).
- Usabilité 8 : nav 4 liens sans débordement, CTA « Contacter la maison » cohérent avec la saison, page « Nous contacter » titrée comme son lien d'entrée.
- Créativité 8 : objets, loader, bandeau d'état calculé ; rien de cassé par la révision.
- Contenu 8 : faits identiques au dossier (adresse, téléphone, e-mail, horaires, saison, Facebook, Instagram), plus de note de suivi ni de « Parking gratuit », redite de l'accueil réduite.
- Technique 9 : 0 erreur console, 0 requête en échec, 0 débordement et 0 violation axe sur 24 cas, CLS 0,003 à 0,004 (desktop) et 0,002 (mobile), LCP mobile 1,15 s.

## Vérification des corrections de REVISION-2

| id | verdict | preuve |
|---|---|---|
| F1-1 contraste « On y parle de » | confirmé | `.carte-avis__theme` rgb(31,26,23) sur paille rgb(241,207,107) aux 4 largeurs (≈ 11,4:1), 4 nœuds ; axe : 0 violation `color-contrast` sur 24 cas (accueil 320, 390, 1024, 1440 compris). |
| F2-1 parasol sur le titre | confirmé | sous 600 px : opacité 0,25, `z-index` 0, remonté au-dessus du titre ; `r3-avis-320.png` et `r3-avis-390.png` : titre net, le manche du parasol frôle le « F » à 320 px sans le traverser ; 1024 et 1440 : parasol à gauche du titre, sans recouvrement. |
| F2-2 Parking gratuit | confirmé | grep `parking` insensible à la casse dans tout `dist/` (HTML, JS, JSON-LD) : 0. |
| F2-3 contact titré « Réserver » | confirmé | `<title>` « Nous contacter », `h1` « Nous contacter », 0 occurrence de « Réserver » dans la page ; phrase « Pendant la saison, le plat du jour maison se commande à l'avance, à partir du vendredi soir » : conforme au dossier (ligne 16). |
| F2-4 « prochaine ouverture à confirmer » | confirmé | grep `prochaine ouverture` et `à confirmer` dans tout `dist/` : 0 ; bandeau rendu : « Saison 2026 du 19 juin au 6 septembre, terminée : rendez-vous à la prochaine saison » (HTML serveur, identique après JS). |
| F2-5 redite accueil | confirmé | « paysans-artisans » : 1 sur l'accueil (2 sur `histoire`), bloc corail ramené à « Et au jardin, les tomates et les aubergines de la parmigana de fin d'été ». |
| F2-6 CLS desktop | confirmé | CLS 1024 : 0,0042 (2 passes), 1440 : 0,0030 / 0,0030, source unique `#text` ; mobile 0,0021 à 320 et 390. |

## Findings

Bilan : F0 0 · F1 0 · F2 0 · F3 4. Build OK, 0 erreur console, 0 lien mort (liens internes en 200), 0 fait faux, 0 invention non marquée, 0 débordement, 0 violation axe, mention « Maquette KYW » + un seul logo KYW (`kyw-signature` x1) + `noindex, nofollow` + `lang="fr"` + un seul h1 sur les 6 pages.

### F3 finitions (non traités, non bloquants)
- **F3-1 · 7 apostrophes droites restantes** dans le texte visible (« Ce qu'on pose sur la table », « Une planchette pour l'apéro », « le temps d'une saison », 3 sur la 404) contre des apostrophes typographiques ailleurs. Correction : remplacer par ’ dans `index.astro`, `carte.astro`, `terrasse.astro`, `404.astro`.
- **F3-2 · 24 espaces ordinaires avant « ! »** (7 accueil, 4 carte, 5 histoire, 4 terrasse, 4 contact, 4 404), 0 espace insécable : le point d'exclamation peut passer seul à la ligne (« Escale en Vue ! »). Correction : U+00A0 avant « ! ».
- **F3-3 · `photos/mur-pierre.webp` 492 Ko** (seule image au-dessus de 300 Ko). Correction : ré-encoder à ≤ 200 Ko.
- **F3-4 · Itinéraire sur des coordonnées « à confirmer »** (`src/data/site.ts:46`, lien OpenStreetMap sur accueil et contact, JSON-LD `geo`) : centre de la carte du site actuel, pas l'adresse. Correction : lien OpenStreetMap par adresse (`?query=`) ou coordonnées vérifiées. Bonus : `histoire` répète « paysans-artisans » et « artisans locaux » deux fois.

### Faux positifs écartés
- QA-revue3 : axe 404 `.kyw-footer__note` 4,36:1 et « 404 sans h1 » : réponse brute de `serve.mjs` ; `404.html` réelle : 0 violation, 1 h1. « Phrase répétée 2x » : copie `aria-hidden` du bandeau. « Pas de robots.txt/sitemap » : présents dans `dist/escale-en-vue/portfolio/`. Contraste « à vérifier » : texte défilant du bandeau. Cible tactile de la 404 « la page d'accueil » : lien inline.
- `skipLinkFirst: false` : le premier arrêt est « Aller au contenu ». `noindex, nofollow` : conforme au prompt de la variante portfolio.

## Ce qui est bien (à ne pas casser)
1. La table de la terrasse et les objets au trait du hero : identité de guinguette conservée de 320 à 1440 px.
2. Honnêteté du contenu : saison terminée dite au premier écran et dans le bandeau, aucun prix ni note inventés, horaires et adresse identiques au dossier.
3. Technique : CLS quasi nul, LCP mobile 1,15 s, 0 débordement, JSON-LD présent, 404 designée, nav mobile qui tient.
