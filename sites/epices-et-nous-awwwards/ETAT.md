# ETAT : Épices & Nous, variante awwwards (construction-2 terminée)

## Fait
- Phase 1 : brief, concepts, Concept Card, système, contenu, 5 pages statiques, head, favicon, OG (voir DESIGN.md 1 à 18).
- Phase 2 (DESIGN.md 19 à 47) :
  - Signature `src/motion/signature.ts` : le nom arrive en deux moitiés depuis la cuisine et la salle, le & s'allume au contact (intro) ; le passe s'ouvre au défilement (scrub en `x`) ; le & du pied s'allume en scrub ; compteur du 52 € (`[data-compte]`, accueil et carte).
  - Pilote `src/motion/passe.ts` : variable `cote` (pointeur, -1 à +1) vers la rotation des & `[data-passe]` et `--cote` sur `<html>` (la moitié opposée du nom s'estompe) ; repos : pastille safran `[data-pastille]` qui descend l'axe (hero et pied), & qui oscille.
  - Transition : rideau à deux battants qui se rejoignent sur l'axe avec un & safran (`setup.ts`, `Base.astro` `#curtain`).
  - Menu mobile `src/motion/menu.ts` + `Header.astro` (sous 760 px la nav en ligne est remplacée par « Menu »).
  - Reveals déclaratifs sur toutes les pages (titres `data-split="lines"`, figures `clip`, lignes de carte `up`, intros des en-têtes).
  - Interactions `site.css` § Phase 2 : CTA aplat qui passe, filet nav et marque, soulignement qui s'épaissit, ligne de carte qui glisse vers le passe ; tout sous `(hover: hover)` + `:focus-visible` + `:active` ; lien du pied KYW souligné au survol.
  - Build OK (`scripts/q.sh build pnpm build:site sites/epices-et-nous-awwwards`), `dist/epices-et-nous/awwwards/` à jour.
- Mesures locales : 0 erreur console ; `scrollWidth` = fenêtre sur 5 pages à 1440 et 390 ; menu (aria-expanded, focus piégé, Échap, retour du focus) ; réduit : 0 texte caché, pages immobiles ; repos 0,183 % de pixels en 1,5 s.

## Reste (phase 3)
- Shoot complet par l'agent captures, puis lecture de `report.json` : points 35, 36, 39, 41, 45 de DESIGN.md (noHoverChange, idleMotion/idleAt, reduced, contraste AA du `.cta` sur nappe : texte blanc sur `#8a4a0b`).
- Vérifier `settledMs` non null (le & oscille et la pastille coule en continu ; diff mesurée 0,18 %, sous le seuil de 1 %).
- Le hero desktop laisse un grand vide brun sous les CTA à 1440×900 (seul l'axe le traverse) : à juger sur captures, resserrer `.poster` `padding-bottom` si le jury le note.
- RAPPORT.md, `pnpm index`, commit final avec `[publier]` seulement si l'orchestrateur le demande.

## Décisions
- Loader non, GL non, pas de suiveur de curseur (curseur natif).
- Pas d'aperçu de plat au curseur sur la carte : aucune photo n'est rattachée à un plat précis par `photos/index.json` (nommer un plat sur une photo serait une invention) ; la ligne de carte glisse vers le passe à la place.
- L'immobilité de repos de la phase 1 est levée : l'objet de repos (pastille qui passe, & qui penche) est le concept lui-même.
- Le compteur affiche 0 tant que le bloc n'est pas entré dans l'écran (élément aria-hidden) ; en mouvement réduit il reste à 52.

## Pièges
- Pendant cette phase, l'orchestrateur a fait un `git pull --rebase` (commit « Sauvegarde l'avancement ») : les fichiers non suivis ont disparu quelques secondes de l'arbre. Une édition faite à ce moment-là est perdue sans erreur : relire `wc -l` des fichiers touchés après un tel commit.
- Le & animé (intro `scale`, pilote `rotation`) : propriétés GSAP distinctes, ne jamais lui donner de `transform` CSS ; le scrub du nom passe par `x` (pixels) pour ne pas écraser le `xPercent` de l'intro.
