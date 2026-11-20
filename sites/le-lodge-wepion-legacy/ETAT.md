# ETAT · Le Lodge Wépion · variante legacy · construction-1 (20/11/2026)

## Fait
- Audit (`AUDIT.md`, `.hallmark/before.*`), approche conservée, deal Solstice 1/3, draw 14de70, scaffold, stamp, comps c1 et c2 (`comp.md`), `DESIGN.md` (Picks, approche, thème, composants).
- Contenu : `src/data/site.ts` et `carte.json` (88 lignes réelles de `donnees.json`, aucune invention ; produits locaux tirés de la carte).
- Pages : `/` (hero Poster, lieux, carte en Switcher, terrasse, produits locaux, galerie en rail, tea-room, réservation, pied), `/cookies/`, `404`. Nav, barre collante de réservation, pied en colonnes d'index, KywFooter et noindex vérifiés sur les 3 pages.
- Build : `scripts/q.sh build pnpm build:site sites/le-lodge-wepion-legacy` passe, `dist/le-lodge-wepion/legacy/` généré.
- Sloplint (copie aplatie, rendu) : 0 FAIL propre au site. Restent des items du paquet pied (76 `kyw-signature-720.webp` introuvable dans la copie aplatie, 72, 59) et un NOTE 58 (carte).

## Reste (phases 2 et 3)
- Motion, états des 8 contrôles, `:active`/`:disabled`, reveal unique ; QA navigateur 1440/375, focus clavier, tab de la carte au clavier, cible 44 px des liens ; `pnpm index` et publication (aucun `[publier]` dans les commits de phase 1).
- Vérifier le hero à 1920 (FAIL 44d corrigé par `min-height` 100dvh moins 130 px, non remesuré), le rail de galerie à 375, les écrans de la carte (Switcher) au téléphone.
- JSON-LD absent ; `RAPPORT.md` et sweep de la phase 3 ; checklist DESIGN.md points 7 et 8.
- Comps : les deux captures ont le même nom (c2 a écrasé c1), à relancer avec `--out` distincts si une revue le demande.

## Décisions et hypothèses
- Restaurant fermé (incendie du 21/05/2026) : bandeau et plaque du hero disent Erpent, Wine & More ; aucun horaire inventé (slot `.fill` pour Erpent et pour la date de réouverture, 2 par page au plus).
- Wépion avant l'incendie : 11 h 30 à 22 h 30 (site du client ; Trouve Ton Resto contredit, à confirmer).
- One-page gardée comme l'original ; la carte, qui était un diaporama Google Slides, devient une section en texte.
- Accent déplacé de la vermillon Solstice (teinte 24) à la teinte 16 pour lever le REFLEX 65 (le waive était rejeté).
- Photo 11 (enseigne Beau Rivage) écartée ; aucun avis ni note repris ; `/cookies/` : texte provisoire marqué `.fill`.
- Références Hallmark lues de façon ciblée (SKILL.md, redesign.md, macrostructure 08, thème Solstice, layout § 6, patterns Switcher et fill) ; gates.md, craft.md, imagery.md, responsive non relus en entier faute de budget de réponses : à reprendre en phase 2.
