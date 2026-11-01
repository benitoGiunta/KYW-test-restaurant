Phase 3 sur 3 de la variante legacy (construction-3) : sweep sloplint, gates jugées, finish review, corrections, log, checklist, RAPPORT.md. À lire après commun.md.

# Phase 3 : sweep, finish review, log, rapport

Lis `$OUT/ETAT.md` puis `$OUT/QA-build.md` (captures déjà faites ; pas de capture complète en plus). Lire : `gates.md` § 5 (F1 à F26, clauses jugées) et § 6, `redesign.md` § After, `layout.md` § 8 (un écran à la fois à 1440x900, puis le squint), SKILL.md § 6 Log et § 7.4. Serveur de dev : `cd $ROOT && KYW_BASE=/$SLUG/legacy/ pnpm exec astro dev --root sites/$SLUG-legacy --port 4321` en arrière-plan, PID noté, `kill <PID>` en fin.

## 1. Sweep

```bash
cd $OUT && ENV /home/user/KYW-test-restaurant/scripts/q.sh sloplint node $SKILL/scripts/sloplint.mjs src --genre <genre> --render --kept \
  --url http://localhost:4321/$SLUG/legacy/ [--url http://localhost:4321/$SLUG/legacy/carte/ …une par route]
```

- `--kept` compare à `.hallmark/before.json`, lu depuis le cwd (même dossier que `--before`, sinon `FAIL kept : no before record here`) : liens, champs, handlers, hooks, scripts, sélecteurs, titres, figures (garde `href`, `name`, `id`). Disparu : restaurer ou consigner `/* Hallmark · dropped <item> · <raison ≥ 12 car.> */`. `.hallmark/compare.html` va au rapport.
- Corrige chaque `FAIL` ; chaque `REFLEX` corrigé ou levé (`waive` par clause, `47b` pas `47`, raison propre à la page ≥ 24 car.) ; chaque Finish `answered` ; chaque `WARN` confirmé ou `dismissed`. Trois waivers du même type sur trois sites = house style dans DESIGN.md.
- **Gates jugées** depuis `.hallmark/shots/` : 6b, 8 et 32 (lis `$LOG` du plus récent au plus ancien : empreinte différente des trois derniers sur plus de trois axes sur six), 9, 11, 16, 23, 29, 38iii, 44 (trois largeurs, une question chacune), 46b, 47c, 54, 58, 62, 63, 65, 66, 67, 68, 69, 70, 77-79, 80-82, 83, 84, 85. Gate 19 : les tells français (« exceptionnel », « unique », « incontournable », « savoureux », « Découvrir », « Cliquez ici ») échappent au script : juge chaque titre (craft.md § 6, swap test).
- Budget : une inspection, un lot de corrections, une confirmation au plus.

## 2. Finish review (sous-agent frais, `run_in_background: false`)

Consigne unique : « Lis `$SKILL/references/review-finish.md` et suis-le », avec : `.hallmark/shots/` (folds 1280, 1440, 1920 ; full 1440 et 375), `.hallmark/before/` (il répond aussi « what did the old page do better? »), les `.astro` et `page.css`, la ligne thème du stamp, `themes/<slug>.md` et son `.jpg`, les findings de la hero review et leur règlement, `gates.md` § 4. Agis sur le premier mot (`recapture`, `rebuild`, `fix`, `ship`), un lot, recapture, score chaque finding ; stamp : `finish-review: subagent · n findings · n resolved m unresolved · gap: <plus grand écart stamp/page>`.

## 3. Contrôles projet, log, matériel

- `cd $ROOT && scripts/q.sh build pnpm build:site sites/$SLUG-legacy` (copie le logo KYW, refuse sans noindex ou `kyw-footer` dans `index.html` seulement : `grep -L` les autres routes de `dist/$SLUG/legacy/`), puis `pnpm index`. Thème sombre : contraste du logo KYW, puits `--color-paper-2` si besoin.
- Facultatif : `jury` sur `dist/` servi (`node $ROOT/.claude/skills/jury/scripts/serve.mjs dist --port 4400`), estimation.
- Log (`redesign.md` § After 4) ; la sortie nomme les champs manquants mais écrit quand même : complète.
```bash
node $SKILL/scripts/theme.mjs log --log $LOG --entry '{"mode":"redesign","depth":"full","scope":"site","project":"<slug>-legacy","date":"<AAAA-MM-JJ>","prompt":"<prompt anglais du deal>","shape":"<forme> (kept)","theme":"<slug>","dealt":"n/3","axes":"…","hero":"…","nav":"…","footer":"…","imagery":"…","photos":["<id lib>"],"entry":"…","fingerprint":"Heading|Body|Divider|Button|Image|Reveal","sections":["Hero","…","Footer"],"signature":"…","waived":["8"],"draw":"<seed>"}'
```
- Demande de matériel (SKILL.md § 7.4) : chaque slot, taille, contenu attendu, et LA photo qui améliorerait le plus la page.
- Picks : remplis la ligne Sweep.

## 4. Checklist (ajoute à DESIGN.md les points restants, preuve chacun ; vérifie que les 72 y sont)

Floor : 1. Couleurs et polices via tokens `:root` (48) · preuve `grep -c "#[0-9a-f]\{3,6\}\|rgb(" page.css` hors tokens = 0. 3. Pas d'italique dans un titre romain (38i). 4. `overflow-x: clip` html et body, jamais `hidden` ni `100vw` (34). 5. `minmax(0, 1fr)`, display `overflow-wrap`/`min-width: 0` (50). 8. Rien d'inventé (46a). 9. Aucun eyebrow ni capitales trackées : labels, tags, nav en police de corps, casse de phrase (54, 67). 10. Pas de « A · B · C », de flèche collée, de point de statut (63). 11. Pas de dégradé violet-bleu, carte dans carte, emoji-icône, faux navigateur (2a, 4, 30a, 47a). 12. Titre, phrase, action du hero à 1280x800 (44b). 13. ~80 mots par écran ; hero = titre, phrase, actions (58). 14. Conteneur plafonné `--container` 1440 / `--gutter` 64 (44d). 15. Stamp, critique, waivers en tête de CSS (20). 16. `sloplint --render` : 0 FAIL, 0 REFLEX ouvert, pas de « render tier not run ». 18. Pas de `#000`/`#fff` hors tokens, neutres teintés (7a, 22). 25. Contraste 4,5:1 corps, 3:1 grands textes/icônes/rings/bords, `--color-accent-ink`, pas de gris sur couleur (40, 41). 26. Aucune image cassée, crédits, pas de stock payant, pas de texte sous un autre (76, 73). 27. Aucun bouton ni lien de nav qui replie (49a). 28. Liste 19 (seamless, tells français ci-dessus, « En savoir plus » en seconde action), aucun tiret cadratin ni « Tous droits réservés ».
Reflex : 31. Display du thème, pas Inter/Roboto/Open Sans/Poppins/Lato/system (1). 32. Prose 45 à 75ch (25), ≤ 3 familles (37), ≤ 3 graisses (F19). 33. Pas de carte-tell (3). 34. Hero : ≤ 2 éléments centrés, une rupture, posture stampée (6b, 44a, 44c). 35. Ni gabarit IA ni forme des 3 derniers logs (8, 32). 36. Coutures variées (9), écarts ≥ 120px variés (59). 37. `--space-*`, ≤ 3 nudges (24a, 24b). 38. Accent < ~5 % en restrained (23). 39. Pas de glow/orbe derrière texte (29), pas de crème + serif + terracotta non assumé (65). 40. Pas de mot accentué en titre sauf signature (38iii). 41. Pas de mono costume (64), texte ≥ 12px, interligne ≥ 1,3 (75). 42. Titres ≥ 40px à 1440, pas de section mince, pas de bande morte > 160px (78, 77, 79). 43. Têtes et boîtes aérées (71, 72). 44. Pas d'illustration, d'image vide, de compteur, de mur > tiers (80-83). 45. Pas de faux produit (84). 46. Clôture = horaires, adresse, réservation (85). 47. Chrome nommé (42). 50. Une bibliothèque d'icônes, `currentColor`, pas de pastille (30b, F5). 51. Pas de texte de décoration (66). 52. Un fait dit une fois (69), ≤ 5 slots vides, jamais 4 en ligne (68). 53. ≤ 1 frame d'appareil, pas de matériau d'imitation (47b, 47c). 54. Pas de gradient text, pas de swatch Tailwind (2b, 74).
Finish : 55. Guillemets, ellipse, `balance`/`pretty` (F1-F3, F26). 57. Tabulaires prix et horaires (F6). 59. Pas d'avatar factice ni Lottie (F9, F10). 60. Surligneur, soulignement ≤ 2px (F11), `align-items: center` (F12). 61. Outlier à un rôle (F13), aide `1lh` (F14). 62. Invariants de page (F15). 64. Pas de sliver, slot ≥ 40px, `hallmarkSlots` (F17, F18). 65. Pas d'orphelin (F20), de niveau sauté (F21), justifié avec `hyphens: auto` (F22). 66. `lang`, `<title>`, description (F23), pas de filet sous ombre (F24). 67. Rien de caché à 375 (F25).
Craft : 68. Type (2 familles + outlier, tracking −0,02 à −0,04em, interligne 1,0 à 1,15, corps 16px à 1,5-1,65, `swap`, `font-synthesis: none`). 69. OKLCH, quatre couches, posture (craft.md § 2). 70. Un axe primaire, ≤ 1 ombre, huit niveaux z, radius concentriques ; texture seulement nommée, ≤ 0,08. 71. Imagery : client d'abord, hero LCP `fetchpriority`, traitement du thème, scrim 35 à 65 %, légendes = faits ; pas de `filter: invert`.

## 5. RAPPORT.md (`$OUT/RAPPORT.md`, `# <Nom> · variante legacy · <date>`)

1. **Approche conservée vs site d'origine** : tableau Type, Hero, Nav, Carte, Animations… (origine | legacy), dérogations avec gate. 2. **Axes traités** depuis AUDIT.md (axe → fait · preuve), non traités. 3. **Résultat sloplint** : Before, After (Floor 0 FAIL, Reflex waived et clauses, Finish answered, WARN dismissed), Kept (sortie `kept:`), Dropped, Reworded, Render (captures), Compare, Build. 4. **Reviews** (lignes du stamp, ce que l'ancien site faisait mieux, jury facultatif). 5. **Placeholders et faits manquants** (tableau élément, où, valeur, à remplacer par ; slots `.fill` ; avis repris à vérifier). 6. **Demande de matériel**. 7. **Leçons structurelles** (aussi dans agents/lecons/construction.md).

## 6. Avant de rendre la main

sloplint propre (0 FAIL, 0 REFLEX, render tourné), reviews au stamp, DESIGN.md complet (72 cases), `$LOG` enrichi, build et `pnpm index` passés, commit. Réponse en dix lignes au plus : approche, thème, sloplint avant/après, reviews, placeholders, photo qui manque le plus.
