# ETAT novobel legacy · phase 3 (QA) terminée : voir RAPPORT.md. Build final OK, sloplint 0 FAIL/0 REFLEX, axe 0 violation. Reste : rien de bloquant (placeholders au RAPPORT).

# (historique) phase 2

## Fait (phase 2)
- Nav : `<nav popover>` sous 60rem (bouton Menu/Fermer, Échap et clic sur lien ferment, ouverture 220 ms ease-out, fermeture 140 ms ease-in), « Devis gratuit » en ghost (un seul primaire rempli par écran), lien courant souligné.
- Formulaire de devis `DevisForm.astro` sur /, /services, /projects : validation au blur puis à l'input, aide `min-height: 1lh`, `data-endpoint=""`, message « Rien n’a été envoyé… ». Mailto et tel gardés en liens secondaires.
- Motion (calme) : un reveal `[data-reveal]` visible sans script, filet encre des h2 qui se trace (signature), carte du hero qui se pose ; reduced-motion et print couverts.
- États : boutons (hover, active, focus, disabled), champs (hover, focus inset, invalid, disabled), index projets (hover sur le conteneur). Cibles 44 à 48 px, `svh`, `accent-color`.
- Mesuré (Playwright, 375 et 1280) : 0 débordement sur 5 pages, 0 erreur console, 14 reveals tous révélés au scroll, formulaire OK, menu popover OK.
- sloplint src + hero : 0 FAIL ; reste WARN 49 (faux positif, `white-space: nowrap` dans page.css non suivi par le lint), NOTEs 58 sur les chapeaux des pages internes.
- Hero review : auto-notation `self` (pas d'outil Agent), verdict ship : carte lisible, photo dominante, un primaire. Comp : stamp corrigé en `comp: not built · c1 decided`.
- Build OK, dist/novobel/legacy/ à jour, noindex et pied KYW sur 6 pages.

## Reste (phase 3)
- Captures complètes (agent captures), contraste du mast, audit, RAPPORT.md, Sweep, entrée de journal Hallmark finale.
- Lissage éventuel : chapeau de /services (23 mots) et titre h1 (10 mots) ; le panneau mobile recouvre la carte hero (voulu).

## Décisions et hypothèses
- Formulaire ajouté car l'original avait deux formulaires Wix (devis) ; champs choisis par moi, aucun envoi.
- « Devis gratuit sous 24 h » conservé de la phase 1 (à confirmer avec le client).
- Hypothèses de phase 1 inchangées (25 ans omis, photos de stock, slots .fill).
- Leçon proposée : data/usage/test-3/lecons-proposees/novobel.md.
