# REVISION-1 · brasserie-edgard awwwards (20/11/2026)
Revue traitée : REVUE-1.md (F0 aucun, F1-1, F2-1 à F2-7). F3 non traités, sauf F3-3.

| Point | Résultat | Preuve |
|---|---|---|
| F1-1 aria-label sur `p.pied__mot` | corrigé : `aria: 'none'` dans `SplitText.create` (`src/engine/reveal.ts`) | 0 `aria-label="Dix heures` dans dist ; axe wcag2a/aa : 0 violation sur 5 pages, 1440 et 390 |
| F2-1 voix de l'agence | corrigé : phrase « non transmises » supprimée ; « le chef Titi » sans renvoi à la carte (`src/data/site.ts`) | relu |
| F2-2 « bâtiment bas », chaises/banquettes | corrigé : phrase proposée par la revue ; « banquettes » partout | grep |
| F2-3 pléonasme | corrigé : « Jusqu'à 16 / Convives. Table de groupe à partir de 11 personnes, trois formules de 34,00 € à 49,00 € » | build |
| F2-4 heures répétées | corrigé : « 7 j / 7 » remplacé par « + 0,60 € » (supplément d'emballage à emporter, fait du dossier) | build |
| F2-5 onglets tronqués | corrigé : fondu de bord à droite (mobile) + marge de fin ; pas de suivi d'onglet actif existant, donc pas de scrollIntoView | capture 390 px de /carte/ : « Le coin du » estompé |
| F2-6 404 | contraste : non reproduit (axe 0 violation après 3,5 s, le 4,36:1 mesuré était le pied KYW en cours de révélation) ; cibles CTA 47 px ; le skip link existe déjà (Base.astro:72, `skipLinkFirst` faux positif connu) | axe + hauteurs |
| F2-7 en-tête translucide | corrigé : fond `var(--c-bg)` opaque | capture 390 px |
| F3-3 libellé | corrigé : « leurs prix relevés le 20 novembre » | build |

Débordement : `scrollWidth` = largeur sur les 5 pages à 1440 et 390. Rebuild final OK via `scripts/q.sh`.
Hypothèse : l'e-mail et les autres contenus de la revue sont inchangés ; les ajouts « + 0,60 € » viennent de dossier.md (« Emporter : supplément emballage 0,60 € »).
Non traités : F3-1, F3-2, F3-4, F3-5.
