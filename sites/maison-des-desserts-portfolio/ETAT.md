# ETAT phase 2/3 (construction-2) : portfolio, La Maison des Desserts

## Fait en phase 2 (motion, signature, états, mobile)
- Signature « se colle » : logo-étiquette dont la 4e case prend le nom de la section (corrigé pour les pages dédiées : `page-hero` actif de `top bottom` à `bottom 15%`, `data-activite` ajouté sur histoire et contact) ; photos d'activité posées de travers puis collées (rotation et échelle liées au défilement, ombre portée, `cadresColles()` dans `src/motion/setup.ts`) ; menu mobile dont les liens se collent un à un (CSS).
- État d'ouverture calculé (Europe/Brussels, 7 jours, `etatOuvertureTexte`) : pastille `.statut` dans le hero, le hero de contact et le pied. Testé par `page.clock` : mardi 10h, 7h, 18h30, samedi 18h, dimanche, lundi. Vide et masquée sans JS.
- Carte : sommaire collant de 13 pastilles (`[data-sommaire]`), rubrique visible en `aria-current`, clic décalé de l'en-tête (Lenis), focus sur la cible ; 13 ids de rubrique (`rubrique-N`, ids d'activité conservés).
- Corrections : bouton MENU visible au bureau ; viewport mobile élargi à 481 px par un prix long nowrap (`prix--long`) ; `data-reveal` retiré des blocs contenant liens ou boutons (infos, cartouche des fêtes, avis) ; pied du site en `<section aria-label>` (plus de second `<footer>`) et horaires du pied remplacés par la pastille (plus de doublon avec l'accueil) ; contraste du `.muted` sur cacao ; « Commander » masqué de la barre sous 48rem (hero et menu le portent) pour laisser la place à la case de section ; case de section masquée sous 24rem.
- Reduced motion : classe `motion` absente, 0 élément caché, loader absent, aucune photo inclinée ; la pastille d'ouverture reste (pas d'animation, le pouls est coupé par la règle globale).
- Mesures (script scratchpad `mdd-p2-mesure.mjs`) : `scrollWidth` 320/360/390/1440 sur 5 pages, clics réels d'en-tête 1440, `data-reveal` avec lien, console.

## Reste (phase 3 et agent captures)
- Shoot/audit complets (non faits ici) ; vérifier `skipLinkFirst` (faux positif), axe sur `.sommaire` (zone défilante : liens focalisables), pastille `.statut` en pied.
- Photo chocolat unique (illustrative) ; page Histoire garde le post-it « À confirmer » (dates 1946/1987/1993 incohérentes dans le dossier) : à neutraliser ou reformuler en phase 3 si jugé note de chantier.
- Ligne `collage | maison-des-desserts` toujours à ajouter dans gabarits/UTILISATION.md (gabarits/ protégé).
- RAPPORT.md, REVUE-1.md, REVISION-1.md hérités du gabarit : à réécrire ou retirer.

## Pièges
- Rebuild pendant qu'un script tourne = `dist/` vidé sous le serveur. Serveur de test : port 4472, PID dans le scratchpad `mdd-p2-serve.pid` (à tuer par `kill <PID>`).
- La mesure complète (5 pages x 4 largeurs, loader 5,5 s) dépasse 120 s : lancer en fond.
- Hypothèses : pas de réservation de table, CTA = boutique en ligne ; horaires 8h-18h du mardi au samedi (dossier) ; aucune donnée ajoutée.
