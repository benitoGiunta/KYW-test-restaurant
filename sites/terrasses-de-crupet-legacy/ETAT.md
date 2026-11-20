# ETAT · terrasses-de-crupet · variante legacy · phase 2 (construction-2)

## Fait (phase 1 conservée, voir DESIGN.md)
- Nav : menu Popover sous 70rem (bouton « Menu », fermeture au clic d'ancre, `aria-expanded`), nav courante par `aria-current` (IntersectionObserver), CTA nav en contour cuivre (un seul primaire rempli : le héros), ancres préfixées par la base, cible 44 px, nom seul à 375 (logo masqué sous 30rem, bouton « Menu » icône seule sous 23rem).
- Switcher : onglet choisi en bordure cuivre sur fond sourd (plus de remplissage), hover, `:active`, focus ; flèches plus Début/Fin ; panneaux `tabindex="0"`.
- Motion : Spore = état seulement, donc aucun reveal ni boucle ; transitions d'état de 120 à 220 ms ; reduced-motion global ; tout visible sans script (testé : 6 panneaux).
- Héros : `svh` sans plafond (plus de bande à 1920x1080), voile latéral pour la lisibilité du titre. hero-review self : fix, 2 resolved sur 3.
- Pied : e-mail en une ligne (49b), colonnes en deux sous 70rem ; cibles tactiles `pointer: coarse` ; focus du panneau.
- Mesures Playwright (dev) : aucun défilement horizontal de 1440 à 320, aucune cible de nav sous 44 px à 375, bouton du héros au-dessus du pli à 375x740 et 320x740, aucune erreur de page.
- Build OK : `dist/terrasses-de-crupet/legacy/` (index et 404 : noindex, kyw-signature, mention KYW, 5 ancres préfixées). sloplint hero --render : 0 FAIL (Base.astro porte maintenant `overflow-x: clip` html et body), 3 NOTE 58 (titre 9 mots, accroche 17 mots : contenu fixé).

## Reste (phase 3)
- Captures complètes et QA (agent « captures »), vérifier visuellement le menu ouvert à 375 et le défilement des ancres.
- Sweep, RAPPORT.md, entrée de `.hallmark/log.json` (nav `slab`), `preflight.json`, `pnpm index`.
- REFLEX 59 (écart de 60 px entre deux sections) toujours non localisé ; WARN F15 (gaps de colonnes) ; F4 revu (onglets plus remplis).
- Photos 675 x 1200 en grand format (bande, chalet) peuvent paraître molles.

## Décisions et pièges
- Aucun reveal : choix du thème (Spore § Motion), waive 22 documenté. Menu à 70rem et non 60rem : mesuré (à 1024 le bouton Réserver était écrasé).
- Pas de formulaire : la réservation est le lien Zenchef (rid 367820), conservé.
- Grille de nav en colonnes explicites (mark 1, liens 3, CTA 4) : sans elles, le CTA tombe dans la colonne 1fr quand le burger est masqué.
- Le script de nav attend DOMContentLoaded (il est placé avant `<main>`).
- Pas de commit `[publier]` (phase de test). Aucun sous-agent de revue disponible : hero review en auto-notation.
