# ETAT — Li Micougni, portfolio (phase 2 sur 3 terminée)

## Fait (phase 1)
- Gabarit guinguette adapté, données, photos, pages (accueil, carte, la maison, terrasse, réservation, 404), jetons orange du logo. Voir DESIGN.md.

## Fait (phase 2)
- Signature « flamme du grill » : la flamme (objet du hero, desktop) vacille en continu (CSS `vacille`, `.flamme__coeur` / `.flamme__corps`), s'emballe au survol et au drag, crache 7 étincelles à l'appui (souris, Entrée, Espace) ; masqué en mobile et en reduced motion.
- « Braise » (mot géant) : en plus du flou, `--chaud` 0 → 1 au scrub (canard → orange du logo, halo orange) ; fixe à 1 en reduced motion.
- Table : bouton « Remettre la table » (desktop) qui ramène tirages et objets à leur place (`back.out`, ordre aléatoire), libellé « Table remise » 1,8 s ; instantané en reduced motion.
- Marquee d'état : heure et jour lus par `Intl.DateTimeFormat` Europe/Brussels (plus `new Date().getDay()` du visiteur) ; testé par `page.clock` (mardi 12 h fermé « ouverture à 17:00 », mardi 18 h ouvert jusqu'à 22:00, lundi fermé, mardi 23 h 30 prochain service mercredi 12:00).
- Formulaire de réservation : états `:user-invalid` / `:user-valid`, ligne `role="status"` (« Merci de compléter… », « Votre messagerie s'ouvre… »), validation par `checkValidity` avant ouverture du mailto.
- `data-reveal` retiré des blocs avec lien ou bouton (formulaire, `hcarte`, `maison__texte`) : le formulaire restait `visibility: hidden` tant qu'on n'avait pas défilé (Playwright : « element is not visible »).
- Mobile : débordement corrigé (`.grille-photos` : tirages inclinés, boîte tournée + 14 px, viewport mobile élargi à 404 ; `padding-inline: 1.25rem` + `overflow-x: clip`). Contrôle `innerWidth` en émulation mobile à 320, 360, 390 sur les 6 pages : égal à la largeur.
- Reduced motion (desktop et mobile) : 6 objets visibles, 12 tirages visibles, 4 cartes visibles, mot net, aucune erreur ; rail mobile affiché.
- Clics réels de l'en-tête à 1440 et 1280 : 4 liens sur 5 changent d'URL, le 5e est « Accueil » depuis l'accueil (même URL, normal) ; `elementFromPoint` renvoie toujours un `<a>`. Hero à 1280×720 : boutons à 702 px (< 720). Bas de page en fenêtre : mention « Maquette KYW, certaines données sont illustratives » et pied KYW visibles. Aucune erreur console ni exception.
- Build OK (`pnpm build:site sites/li-micougni-portfolio`), `dist/li-micougni/portfolio/` régénéré.

## Reste (phase 3 et captures)
- Shoot complet + audit (agent « captures ») : ne pas le refaire ici. Axe, contraste du texte « Braise » (décoratif, aria-hidden), LCP.
- `pnpm index` et commit de `dist/index.html` à la publication (non fait).
- Vérifier à l'œil le bouton « Remettre la table » en bas de la scène (non capturé : sous la ligne de flottaison à 1440×900).
- `gabarits/UTILISATION.md` non mis à jour (gabarits/ protégé) : à ajouter « guinguette : li-micougni ».
- Gabarit guinguette (protégé), défauts à reporter : `data-reveal` sur un bloc à bouton/formulaire, `.grille-photos` mobile sans marge pour les tirages inclinés, marquee d'état en heure locale du visiteur.

## Pièges
- Mesurer le débordement mobile par `innerWidth` en `isMobile: true` (le `scrollWidth` et `getBoundingClientRect` n'accusent pas toujours) ; la bissection se fait par une feuille `<style>` injectée via `page.route` avant chargement (redimensionner la fenêtre remet le viewport à 390 et masque le défaut).
- Serveur de contrôle : port 4417, arrêté (PID noté dans le scratchpad `portfolio2-serve.pid`).
