# ETAT, Le Grill des amiS, portfolio (construction, phase 2 sur 3 terminée)

## Fait (phase 1)
- Gabarit Braise adapté, contenu complet de `src/data/site.ts`, 6 pages, photos WebP, OG, favicon (détails dans DESIGN.md).

## Fait (phase 2)
- Signature « cuisson » : assiette de fond refaite (puits uni crème, bord d'origine conservé, plus de tache grise ni de manche de couteau) ; légende vivante dans la scène (« 420 °C L'entrecôte ») pilotée par le scrub ; vapeur au-dessus de l'entrecôte (3 volutes, boucle en pause hors écran, apparaît avec la couche pièce).
- Hero : 22 étincelles (9 au tactile) qui montent, en pause hors du hero, absentes en reduced motion.
- Pastille ouvert/fermé : heure de Bruxelles par `Intl`, créneaux stricts (plus de marge -30/+90 min), « prochain service demain/jeudi dès 12 h » (testé par `page.clock` à 5 instants).
- Marquee d'avis : clonage jusqu'à couvrir une fenêtre par moitié (plus de trou à droite).
- Carte : filtre avec animation d'apparition, région `aria-live` (« 35 plats affichés dans 5 catégories »), `#feu` lu et écrit dans l'URL ; phrase inventée « change avec les arrivages et les suggestions de la semaine » retirée.
- Réservation : validation maison (`novalidate`), `aria-invalid`, message d'état, focus sur le premier champ en erreur, date minimale = aujourd'hui (Bruxelles), bouton désactivé 2,5 s après envoi.
- Mobile : stage de cuisson recomposé (scène 58 vw plafonnée à 32 svh, liste entière visible à 390×844, note masquée), filtres de la carte défilables. `scrollWidth` contrôlé à 320, 360, 390, 1440 sur les 5 pages : aucun débordement, aucune erreur console.
- Reduced motion : classe `motion` absente, 4 couches visibles, 4 étapes allumées, étincelles et vapeur masquées, aucune erreur.
- Clic réel sur chaque lien d'en-tête (1440, 5 pages) : OK ; les 4 « KO » sont les liens vers la page courante (URL inchangée, attendu). Bas de page : bandeau KYW et mention « Maquette KYW… » visibles.
- Build : `pnpm build:site sites/grill-des-amis-portfolio` passe (6 pages, `dist/grill-des-amis/portfolio/` régénéré). Serveur de test arrêté.

## Reste (phase 3)
- Shoot complet et audit par l'agent « captures » (aucun shoot complet fait ici), sloplint si disponible, contraste du texte à 110-150 °C sur la page carte, rythme des `temps` de la carte (10 catégories).
- Vérifier les alt des photos 04, 11, 12, 15 et le recadrage du hero en mobile ; voir si les étincelles sont assez visibles sur la photo du hero (taille 2 à 5,5 px).
- Page « viandes » dédiée non créée (maturation traitée dans « La maison »).
- RAPPORT.md (placeholders, audit, leçons), `pnpm index`, commit de `dist/index.html`.

## Pièges
- `data-temp` est réservé aux sections (températures du driver) : pour une donnée d'étape, utiliser `data-deg`.
- Le piège « lien vers la page courante = URL inchangée » fausse un test de clic sur l'en-tête.
- La scène de cuisson reste faite de photos détourées (couteau et casserole débordent l'assiette) : limite de qualité connue.
