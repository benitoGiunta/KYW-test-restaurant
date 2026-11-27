# Revue portfolio · NE5T Intuition · passe 2
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site : une table gastronomique d'hôtel-spa en bleu nuit et ambre, avec le menu du mois, trois formules en chiffres géants et un filet de lecture sous l'en-tête (inchangée depuis la passe 1).

Scores /10 :
- Design 8 : composition inchangée et tenue ; /histoire/ est plus propre avec les photos sous les textes (`.shots/ne5t-rev2/histoire-1440.png`).
- Usabilité 8 : lien-logo nommé à 390 px, bande de galerie atteignable au clavier ; 0 débordement sur 8 pages x 2 largeurs.
- Créativité 7 : gabarit Velours toujours reconnaissable (eyebrow sur chaque titre, chiffre géant par page), sans changement.
- Contenu 8 : faits inchangés, prénoms désormais sans photo identifiante, presse sans qualificatif inventé.
- Technique 8 : build OK, 0 erreur console, 0 requête en échec, 0 lien interne mort (170 vérifiés sur dist), seule violation axe : `region` moderate (voir F2-1).

## Conditions de la revue
- `QA-revue2.md` INCOMPLET (capture bloquée après l'accueil, pas de report.json, pas d'audit) : non exploitable pour les mesures. `dist/` (08:45) postérieur à `src/` (08:41), donc réutilisé sans rebuild.
- Mesures par script maison (scratchpad) sur le dist servi en local : 8 pages (dont `404.html`) x 1440 et 390 px, axe-core de `node_modules` à 2 positions de défilement après 3 s de repos, console, requêtes, débordement, balises ; captures dans `.shots/ne5t-rev2/`. Serveur arrêté par `kill` (PID 902).

## Vérification des corrections annoncées (REVISION-1)
- F1-1 lien-logo : CONFIRMÉ. `.header__nom` en sr-only (1x1 px, texte présent) ; axe `link-name` : 0 sur 8 pages à 390 et 1440.
- F2-1 bande de galerie : CONFIRMÉ. `tabindex="0" role="region" aria-label="Galerie de la maison"` en place ; `scrollable-region-focusable` : 0.
- F2-2 chiffre fantôme : CONFIRMÉ. `<span data-v="45">` + `::before` ; `color-contrast` : 0 ; le chiffre reste visible (`privatisation-1440.png`).
- F2-3 doubles `<footer>` : CONFIRMÉ pour la règle visée (1 seul `<footer>` par page, `landmark-no-duplicate-contentinfo` : 0), mais a fait apparaître F2-1 ci-dessous.
- F2-4 prénoms sur photos : CONFIRMÉ. Photos sous les textes, légendes « Le service » / « La cave » ; les deux visuels se chargent et se révèlent (390 px, reduced-motion compris). Le grand blanc vu sur une capture pleine page est un artefact de reveal, non reproduit au défilement réel.
- F2-5 presse : CONFIRMÉ. Accueil : « DH, L'Avenir, La Meuse, RTL, 7Dimanche » sans qualificatif, noms conformes au dossier (KMO, Déco, Namur Congress non repris : omission acceptable).
- F3 : non traités, comme annoncé.

## Findings

### F2 (mineur)
- **F2-1 · Régression : axe `region` (moderate, best-practice) sur 7 nœuds, 8 pages sur 8, 1440 et 390** (`.footer__nom` et le reste du pied du site). Cause : le pied du site, passé de `<footer>` à `<div class="footer">` (src/components/Footer.astro), est désormais hors de tout landmark. REVISION-1 le signale « non vérifié avant » : il n'existait pas avant F2-3. Correction : `<section class="footer" aria-label="Coordonnées et services">` (ou `<div role="region" aria-label=…>`), sans `<footer>` ; revérifier `region` et `landmark-no-duplicate-contentinfo` à 0.

### F3 (finitions, repris de la passe 1, toujours ouverts, mesurés sur dist)
- **F3-1 · Typographie** : 0 espace insécable avant « € » (carte 11, accueil 8, sejour 9, menu 6 espaces ordinaires) ; 16 « : » sans insécable ; apostrophes mélangées (histoire 7 droites / 0 courbe, accueil 4 droites / 3 courbes ; `L&#39;Avenir` dans la presse). Correction : U+00A0 avant « € », « : », « ; » ; apostrophes U+2019 partout.
- **F3-2** à **F3-6** (répétition « sélection de vins à table », ligne du jeudi, procédure de privatisation déduite, dessert aux fraises et chambre en double, colonne Services du pied à 1440 qui passe sur 2-3 lignes : visible sur `histoire-1440.png`) : non vérifiés un par un, non traités par la révision 1.
- **F3-8 · Slop** : sur 390 px le « 6 » fantôme passe derrière l'eyebrow de /histoire/ (`histoire-390.png`) ; eyebrow sur chaque titre inchangé.

## Vérifié sans écart
- 8 pages : `lang="fr"`, 1 seul h1, title uniques, `noindex`, mention « Maquette KYW, certaines données sont illustratives », un `<footer class="kyw-footer">` avec un logo KYW ; 0 nœud à opacité < 0,1 hors reveal.
- 0 erreur console, 0 requête en échec ou 4xx/5xx, 0 débordement horizontal ; aucun lien `/…` sans préfixe `/ne5t/portfolio/` ; aucune photo > 300 Ko.
- Pas de tiret cadratin, vouvoiement conservé.

## Ce qui est bien (à ne pas casser)
1. Les trois formules en chiffres dorés sur /carte/ et la composition mobile pensée de chaque page.
2. La palette bleu nuit et ambre et la façade de nuit en hero.
3. L'honnêteté des données (badges « à confirmer » / « texte illustratif »), maintenue par les corrections de presse et de légendes.

Non mesurés cette passe (QA captures incomplète) : LCP/CLS (passe 1 : 1,3 s / 0,000, src inchangé depuis hors correctifs CSS mineurs), `shoot.mjs` clavier et hover.
