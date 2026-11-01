# Chez Guillaume · variante legacy · 2026-11-01

## 1. Approche conservée vs site d'origine

| | Origine (WordPress + Elementor) | Legacy |
|---|---|---|
| Type | multi-pages (accueil, restaurant, agenda, privatisation, bon cadeau, FAQ) | mêmes 6 routes + 404, routes gardées |
| Hero | sans photo, 820 px de vide | Stage : titre, phrase, deux actions, photo de scène déchirée, billet des trois prochains spectacles |
| Nav | menu Elementor | pilule flottante, Popover natif sous 75 rem, « Réserver » vers la billetterie |
| Carte | onglets Menu du soir et brunch | onglets `role=tablist`, deux panneaux empilés sans JS |
| Animations | Swiper, Lottie, OGL | un reveal (opacité + 24 px, une fois), billet posé au chargement ; rien en reduced motion |

Dérogation : gate 8 levée (ordre d'origine gardé, composition nouvelle). Gates 23 et 29 sans objet (aucun formulaire).

## 2. Axes traités (AUDIT.md)
Hero vide (79), 49 % de photos sous le hero (83), calendrier de 8 colonnes illisible à 375 px (F25), meta description vide (F23), script en erreur : tous traités, preuves dans DESIGN.md. Non traité : Lottie et illustrations au trait d'origine, remplacés par photographies du client.

## 3. Résultat sloplint
- Before : 45 FAIL, 18 REFLEX. After (6 URL, `--render`) : **0 FAIL, 0 REFLEX ouvert**, 7 WARN, 4 NOTE.
- Premier passage de phase 3 : 2 FAIL (24a, mes `padding-block: 12px`) et 13 REFLEX (44c et 79 sur les pages intérieures, 78 titres de 25 px, 77 deux bandes étroites, 59, 71). Corrigés : `--space-sm`, titres de mois et de FAQ en `--text-section`, `.page-hero` sans marge basse, `.band` en deux colonnes, `.faq` avec marge haute. Waivers : 44c (pages intérieures, listes utilitaires), 59 (écart mesuré jusqu'aux bords déchirés, jetons à 120 px ou plus), 8.
- Floor 58 (NOTE) : non levable, noté en commentaire ; 101 à 140 mots sur le premier écran de l'accueil, billet déclaré comme signature.
- WARN 23 (bande rouge, un seul champ d'accent déclaré), F7 (pilules : contrôles et billet), 77 (pages intérieures de 4 sections : listes) : confirmés, non corrigés.
- Kept : `kept: nothing recorded` (l'outil ne compare rien ici) ; câblage vérifié à la main : `tel:`, `mailto:`, billetterie `https://chezguillaume.be/events/`, routes. Dropped : nav « Spectacles » et « Programme », fusionnés dans « Réserver » (commentaire dans `page.css`). Reworded : phrase du hero scindée.
- Build : `scripts/q.sh build` passe, 7 pages, pied KYW, noindex et mention sur chaque route (grep).

## 4. Reviews
Hero review `ship` et finish review en auto-notation (`self`) : pas d'outil Agent en session d'agent. Ce que l'ancien site faisait mieux : ses illustrations au trait (identité plus humoristique) et la fiche de chaque événement sur place ; ici chaque date renvoie à la billetterie. Jury non lancé.

## 5. Corrections de la QA (captures de l'agent captures)
- axe `label-content-name-mismatch` (accueil 6 nœuds, agenda 4) : `aria-label` du bouton « Menu » supprimé ; liens de dates et « Complet » : nom accessible commence par le texte visible.
- Cibles tactiles mobile : logo (24 px de haut), « Voir sur la carte », « Toutes les dates sur la billetterie » portés à 44 px ou 12 px de marge. Mesuré à 390 : 0 cible sous 24 px, aucun débordement.
- Faux positifs confirmés, non corrigés : `keyboard.stuck` sur l'agenda (70 tabulations parcourent 34 liens différents puis bouclent), `skipLinkFirst false` (le lien « Aller au contenu » est le premier arrêt), 404 sans `title` ni `lang` (le `404.html` les porte), WARN sitemap. `reduced.hiddenText 2` : la barre de billetterie masquée (`visibility`) tant que le premier bloc est à l'écran, voulu.
- Captures ciblées après correction : accueil mobile (en-tête), bande de privatisation 1440 et 390 (chevauchement trouvé sur ma première version de la bande, corrigé), agenda 1440.

## 6. Placeholders et faits manquants
Aucun `data-placeholder` ni slot `.fill` : tout vient du site d'origine (agenda relevé le 1er novembre 2026, menus d'octobre, horaires de la FAQ). Crédit photo « Photographies : Chez Guillaume. » dans le pied. Aucun avis repris. À vérifier : agenda et menus datent du relevé, la billetterie fait foi.

## 7. Demande de matériel
Photo qui manque le plus : « La salle » en pleine largeur (source 1000 px étirée à 1440, flou possible) : une prise de 2400 px de large, salle vue depuis le fond, lumières allumées. Aussi : portraits de spectacle en 1600 x 1000 pour l'agenda, plat signature en 1000 x 1250.

## 8. Leçons
Voir `agents/lecons/construction.md` : sloplint refuse `--genre restaurant` (playful) ; waiver à trois champs ; gate 58 non levable ; un `grid-row` posé sur desktop doit être remis à `auto` sous le point de rupture.
