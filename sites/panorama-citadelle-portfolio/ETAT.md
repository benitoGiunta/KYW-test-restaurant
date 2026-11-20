# ETAT, panorama-citadelle · portfolio · construction passe 2 sur 3 (motion, signature, états, mobile)

## Fait (phase 2)
- Signature du hero « astre » (≥ 1200 px) : disque photo (vue sur la Meuse, 960 px), orbite en pointillé, 6 crans aux heures des moments, soleil qui se pose à l'heure réelle (tween `--angle`/`--zoom` dans la timeline d'intro, 2,4 s), halo qui respire, photo qui suit la souris (±10 px, zoom de base 1,1). Reduced motion : tout posé, halo coupé. Masqué sous 1200 px (l'accroche le recouvrirait). Code : `astre()` dans `src/motion/journee.ts`, bloc `.astre` en fin de `base.css`, markup dans `index.astro` (aria-hidden, décoratif).
- Accent vert des tabourets (`--vert #1f6b4a`) : anneau de focus (`--focus` : vert, encre sur corail, ivoire sur nuit et pied), sélection de texte, états valide du formulaire. Le soleil reste l'accent des boutons.
- Débordement mobile corrigé : scrollWidth 400 → 390 sur carte, petit-déjeuner, histoire, réservation (`.section, .moment { overflow-x: clip }`).
- Tartes flambées de l'accueil : préfixe « Tarte flambée » retiré de l'affichage (chapeau « Au four à bois : Flammeküeche »), colonne nom `minmax(7rem, 9rem)` : plus de nom sur 3 lignes.
- Formulaire réservation : états focus (anneau), invalide (rouge), valide (vert), date minimale = aujourd'hui, message `role="status"` après envoi, bouton désactivé 4 s.
- Vérifié : build OK (`scripts/q.sh`), accueil 1440 (hero, 6 moments) et 390 (6 moments), pages intérieures en 390 (scrollWidth), console sans erreur.

## Reste (phase 3 et captures)
- Lire `QA-<étape>.md` de l'agent captures ; sloplint ; RAPPORT.md ; contrôle du contraste du texte sur le disque (décoratif).
- Favicon/logo : aucun logo client, favicon du gabarit conservé. Retirer la mention « brunch » du commentaire de `journee.ts` si elle subsiste (grep).
- Badge « ouvert » présent deux fois en 1440 (en-tête + hero) : comportement du gabarit, à arbitrer.
- Clic réel de l'en-tête et capture du bas de page : script lancé en fin de phase (résultat dans la réponse finale).
- `pnpm index`, commit final, publication par la session de correction.

## Pièges
- scrollWidth ≠ éléments qui dépassent : `innerWidth` suit la page élargie ; seuil `right > 391`.
- `isTouch` du moteur est une fonction (`isTouch()`).
- Placeholders inchangés : 2 lignes « dernier verre » (marquées exemple).

## Phase 3 (QA), faite
- Pied KYW rendu visible (z-index, couleurs) ; frise masquée devant le pied nuit. Détails et points ouverts : RAPPORT.md. Build final OK. Reste : publication par la session de correction.
