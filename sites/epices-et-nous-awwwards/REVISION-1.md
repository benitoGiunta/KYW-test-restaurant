# Révision 1 · Épices & Nous (awwwards)
Périmètre : F1 et F2 de REVUE-1.md (F0 : aucun). Build `pnpm build:site` OK ; mesures Playwright ciblées à 1440, 390, 360 px sur serveur local (PID noté, arrêté).

| id | décision | changement | preuve |
|---|---|---|---|
| F1-1 | corrige | `site.css` : `.cadre picture {display:block;width:100%;height:100%}`, `.cadre img {display:block}`, `object-position` 50% 60% sur `.cadre--haut` | figure = img : 566x708 (1440), 326x408 (390), 296x370 (360), au lieu de 566x377 dans 566x708 |
| F1-2 | corrige | `site.css` : `.nappe .cta--contour {color: var(--c-nappe-fg); border-color: …}` | couleur rgb(31,22,19) sur rgb(217,213,204), ~11:1 |
| F2-1 | corrige | `index.astro` : `tabindex="0" role="region" aria-label` sur `.espaces__bande` | attributs lus à 390 et 360 (axe non relancé) |
| F2-2 | corrige | carte, réservation, histoire : phrases de métatexte retirées ; lien « Réserver en ligne » conservé | texte des 3 pages sans « site actuel / site du restaurant / à confirmer » |
| F2-3 | corrige | réservation : « Par téléphone ou en ligne » (sans préférence) ; carte : « Cuisine de saison… selon le marché » ; `site.ts` « selon le marché » | idem grep |
| F2-4 | corrige | `site.css` sous 760 px : `.voix {margin-top: 3u}` | non mesuré en capture (hypothèse : marge visible, `lbl` mesure null car le libellé suit un bloc non frère) |
| F2-5 | corrige | `.poster__nom` mobile : `clamp(3.6rem, 17vw, 5.5rem)`, une colonne (Épices / & / Nous) | nom 350 px de large à 390, 320 à 360, scrollWidth = fenêtre |
| F2-6 | corrige | `em` retirés sauf signature (accueil) et pied | dist/index.html : 2 `<em>` |
| F2-7 | corrige | hero : photo de la verrière sous le bloc d'actions (`.poster__photo`, 16/5 desktop, 3/2 mobile) | haut de la photo à 642 px à 1440x900, visible dans le premier écran |

Hors liste, traité au passage : F3-2 (« selon la saison » ajouté à la signature). F3-1, F3-3, F3-4 non traités.
Hypothèses : photo de hero choisie dans les 23 photos du client (verriere) ; aucune décision de DESIGN.md changée sauf l'ajout d'une photo au hero.
Verdict estimé : publiable après revue 2.
