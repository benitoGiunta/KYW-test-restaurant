# ETAT · Don Dino legacy · phase 2 (construction-2) terminée

## Fait (phase 1)
Audit, deal Squeeze, comps, DESIGN.md, contenu (115 plats), 6 routes + 404, photos WebP, KywFooter, noindex.

## Fait (phase 2)
- Nav : bord à bord ; sous 60rem « Réserver » + bouton « Menu » (Popover natif, aria-expanded par script, fonctionne sans script) ; 76 px au bureau, 66 au téléphone (`--nav-h`, sticky et scroll-padding alignés) ; skip link ; à 320 px le mot « Menu » est masqué visuellement.
- Boutons et pastilles : états repos, hover (sous `hover: hover`), focus-visible, active, disabled, busy, aria-current ; une seule recette de primaire (sur /reservations/ le primaire est la demande en ligne d'origine ; nav et envoi du formulaire en contour).
- Formulaire /reservations/ : `novalidate`, validation blur puis input, aides 1lh, `aria-invalid`, select 1 à 12 personnes, message « Rien n’a été envoyé… », ring de champ en encre de carte, jamais d'envoi.
- Interactions : six pizzas du hero liées à la ligne de la carte (`:target` cerné) ; rubrique en cours sur /carte/ (rangée défilante au téléphone) ; jour courant dans les horaires.
- Finitions : safe-area dans `.container`, liens 44 px sous `pointer: coarse`, hover de scale sur les photos retiré, descriptions de carte normalisées (« , » suivi d'une espace).
- Aucun reveal (thème Squeeze : état seulement), documenté dans DESIGN.md.
- Contrôles : sloplint hero rendu 0 FAIL 4 NOTE ; aucun débordement horizontal à 1440, 1100, 961, 960, 768, 375, 320 sur 6 routes ; build OK (6 pages + 404), KywFooter, noindex, mention sur chaque page ; test JS coupé.
- Hero review : auto-notation `self` (pas d'outil Agent), voir DESIGN.md § Phase 2.

## Reste (phase 3)
- Shoot complet par l'agent « captures » (1440, 375, reduced motion) ; sloplint sans `--stage hero` ; contraste du texte `--color-muted` sur `--color-paper-2` à mesurer ; tuile « Sur place » à équilibrer à 1440 (non vérifiée) ; RAPPORT.md ; DESIGN.md § Sweep ; `pnpm index` déjà relancé.
- Le mobile du `:target` d'une pizza (carte, 375) non revérifié visuellement (desktop OK).

## Décisions et pièges
- Pas de push (commit local seulement) ; pas de publication.
- NOTE 58 de sloplint (h1 « 29 mots » = commentaire JSX Hallmark dans le h1, paragraphes de 13-14 mots sur /carte/ et /groupes/) : faux positif du commentaire ; paragraphes à raccourcir en phase 3 si souhaité.
- Date : le champ `type="date"` s'affiche selon la langue du navigateur (mm/dd/yyyy en headless).
- Le jour courant utilise l'heure de Bruxelles ; le fuseau du serveur de captures peut changer le jour surligné.

# Phase 3 (QA) terminée
- sloplint rendu 0 FAIL, 0 REFLEX ouvert (8 waivers en tête de page.css) ; corrections : focus du lien d'évitement, contraste de la note du formulaire, téléphone à 320 px, débordement /carte/ à 375, en-têtes de page.
- Build et `pnpm index` passés ; RAPPORT.md écrit.
- Reste : finish review par sous-agent, entrée de log Hallmark (`$LOG`) et cases DESIGN.md de la checklist de phase 3 non faites ; WARN kept sur les pages d'origine non rendues.
