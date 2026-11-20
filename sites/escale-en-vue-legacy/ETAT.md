# ETAT · escale-en-vue-legacy · fin de la phase 3 (construction-3, QA)

Phase 3 faite : QA lue, 2 corrections (séparateur « à » des horaires, survol non chromatique), build et index passés, RAPPORT.md écrit, DESIGN.md 72 cases. Reste : revue finish par sous-agent frais (non disponible), jury facultatif. Serveur de contrôle (port 4617) arrêté.

## Phase 2 (conservée)

## Fait (phase 1 conservée, voir DESIGN.md)
- Nav : menu Popover sous 60 rem (bouton 44 px, icône ouvrir/fermer, Escape, clic extérieur, fermeture au clic sur un lien, focus rendu), « Réserver » toujours visible dans la pilule (compacte sous 40 rem, aucun débordement de 320 à 1280), lien de section actif (`aria-current`), liens en `base + #ancre` (valides depuis la 404).
- Boutons : huit états (repos, hover sous `(hover: hover)`, focus-visible, active 1 px, disabled en 3 canaux ; chargement et erreur sans objet), 45 à 48 px, aucun replié à 320 (fiche de la carte réduite à 24 px de padding sous 40 rem).
- Motion : Squeeze = état seulement. Aucun reveal, aucune boucle (écart voulu avec « un reveal par page » : le thème dit « No reveal »). Reduced motion : règle globale + menu.
- Signature : jour courant (anneau pêche + pastille « Aujourd’hui »), seulement du 19 juin au 6 septembre 2026, fuseau Europe/Brussels ; hors saison rien (vérifié avec une horloge simulée : vendredi en saison = tuile Vendredi, 20/11/2026 = aucune).
- Logo du client placé dans le pied en masque `currentColor`.
- Mobile : safe-area (gutter, `top` de la nav), `scroll-padding-top: 7rem`, `scroll-behavior: smooth` sous `no-preference`, liens tactiles 44 px, `accent-color`.
- Sans script : tout visible, le menu s'ouvre (Popover natif). 404 : mêmes nav, mention, KywFooter (grep OK).
- sloplint `--render --stage hero` : 0 FAIL, 0 WARN, 1 NOTE 58 (99 mots sur l'écran de la carte à 1440). Build `pnpm build:site` OK. Contraste calculé : muted sur paper-2 4,86:1, accent-ink sur accent 8,0:1, focus sur papier 5,8:1.
- DESIGN.md : points 2, 6, 7, 9, 17, 19 à 24, 29, 30, 48, 49, 56, 58, 63, 72 cochés avec preuves. comp.md : reproduction répondue.

## Reste (phase 3 et agent captures)
- Captures complètes 1920/1280/390/320, axe, LCP, clavier (agent « captures »), puis jury des gates § 5, RAPPORT.md, `.hallmark/preflight.json`, waiver 59 à confirmer.
- Hero review : faite en `self` (pas de sous-agent dans cette session) ; à refaire par un sous-agent frais si la phase 3 en dispose.
- À regarder en capture : le bandeau KYW du pied sur 375 (mention + signature) ; la tuile du jour courant ne se voit pas hors saison (voulu).

## Pièges
- Le serveur de dev (port 4331) est arrêté (PID 10309 tué). `.hallmark/shots/evl-p2-*.png` sont mes prises de contrôle, non commitées.
- Pas de formulaire, de switcher, de vidéo ni de tooltip : points sans objet cochés avec la raison.
- Leçon proposée (mode figé) : `data/usage/test-1/lecons-proposees/escale-en-vue.md`.
