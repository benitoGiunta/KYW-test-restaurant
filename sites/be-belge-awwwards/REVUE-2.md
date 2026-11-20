# Revue awwwards · Be Belge… et d’ailleurs · passe 2
Verdict : PUBLIABLE
Lecture en une ligne de l’idée du site (sans relire DESIGN.md) : une affiche typographique dont le nom se termine par trois points rouges, repris comme signature (titres, menu, transition, 404), avec des paires « d’ici / d’ailleurs » tirées de la carte, sur beige et prune.

Périmètre : `QA-revue2.md` annoncé mais absent (et `.shots/` datent de 18 h : build initial) ; je n’ai donc rien réutilisé. `dist/be-belge/awwwards/` (21:22:20) est postérieur à `REVISION-1.md` (21:22:07) et à tout `src/` (`find -newer` vide). Serveur propre sur le port 4871 (PID noté, arrêté par `kill`). Scripts maison (axe-core complet de node_modules, console, requêtes, débordement, cibles, balises, texte extrait, contraste canvas nœud par nœud, CLS/LCP sous CPU x4 + 4G lente, reduced-motion, Tab, menu mobile) sur 5 pages (accueil, carte, histoire, reservation, `404.html` réel) à 1440 et 390 px, 25 liens internes testés. Captures de fenêtre après défilement lu en planches (`scratchpad/br2/pl_<page>_desk.png` et `_mob.png`, 10 planches, toutes ouvertes) plus `p10.png` (photo recadrée).

## Scores /10
- Design 7,5 : signature des trois points tenue sur les 5 pages et en mobile (`pl_accueil_mob`, `pl_404_desk`), palette prune/rouge/beige sobre ; grands vides desktop restants (`pl_histoire_desk` cadres 2 et 4, `pl_accueil_desk` cadre 3) et pied de page en 12 px.
- Usabilité 8,5 : CTA « Réserver » et téléphone dès le hero, menu mobile ouvert au tap avec tous les liens visibles, lien d’évitement en premier Tab, focus visible (outline) sur 6 Tab par page, 0 débordement (scrollWidth = fenêtre sur 10 cas), 0 cible < 24 px.
- Créativité 7 : l’idée « … et d’ailleurs » est bien exploitée sur l’accueil (paires, bande de photos) ; pages intérieures plus classiques.
- Contenu 8 : faits conformes à `donnees.json` (horaires, 57 € / 72 €, vins 28 € / 35 €, privatisation 15–34 / 20–40, plats, Zenchef, Facebook, `info@`), langage de coulisses retiré, dates de menu gardées une seule fois (`/carte/`), rien d’inventé.
- Technique 8,5 : build OK, 0 erreur console, 0 requête en échec, 0 violation axe sur 10 cas, CLS 0 partout, LCP mobile 980 à 1464 ms (CPU x4 + 4G), JSON-LD `Restaurant` avec adresse et 7 plages d’horaires conformes, reduced-motion sans texte < 0,5 d’opacité.

## Vérification des corrections annoncées (REVISION-1)
- F1-1 : confirmé. axe complet : 0 violation sur 5 pages x 2 largeurs ; `p.statement__texte` sans `aria-label`, 0 `[data-split][aria-label]` (bloc SplitText `aria: 'none'` effectif).
- F2-1 : en partie. U+00A0 présents (accueil 6, carte 6, histoire 5, réservation 3, 404 2 avant `! ? : ;`), guillemets « » corrects (0 écart). Deux restes, voir R2-1 et R2-2. L’affirmation « plus d’espace ASCII avant `! ? : ;` » est donc inexacte sur la 404 et sur la phrase d’accueil.
- F2-2 : confirmé. 0 occurrence de « ne sont pas communiqués », « relevé sur », « à reconfirmer », « nous ne » dans les 5 pages ; période = « Menu du chef proposé du 13 août au 6 septembre 2026. » (`pl_carte_desk` cadre 4).
- F2-3 : confirmé. « 13 août » présent une seule fois (carte), 0 sur accueil, histoire, réservation, 404 ; méta sans dates.
- F2-4 : confirmé sur les formulations visées (0 « carte du jour », « allergie », « régime », « par téléphone »). Reste mineur : R2-3.
- F2-5 : confirmé. Accueil : Kriek Boon et liégeoise/cassis « d’ici », risotto/chorizo « d’ailleurs » (`pl_accueil_desk` cadre 3) ; plus de petits pois, oignons ni abricot classés.
- F2-6 : confirmé. 0 `id` avec espace, tous les `aria-labelledby` résolus, 0 `aria-valid-attr-value`.
- F2-7 : en partie, comme annoncé. Bande blanche retirée (`p10.png`, 1640 x 2560, plus de montant blanc) ; la photo reste penchée (perspective de la prise de vue) et l’enseigne est coupée à droite du cadre : R2-4.

## Findings (aucun F0, F1 ni F2)

### F3 (finition)
- **R2-1 · 404 : espace ASCII avant « : ».** `src/pages/404.astro:9` « La phrase reste en suspens : reprenons-la » (octets `s u s p e n s 0x20 :`, vérifié dans `dist/be-belge/awwwards/404.html`). Correction : U+00A0 avant « : ».
- **R2-2 · SplitText remplace l’U+00A0 par une espace ordinaire.** Source : « coule pas ! » (octets 302 240 dans `index.html`), mais le DOM après split donne « coule pas ! » (codes 32, 33 mesurés à 1440 et 390 px) : « ! » peut passer seul à la ligne si la largeur change. Sans effet visible aux deux largeurs testées (`pl_accueil_desk` cadre 2, `pl_accueil_mob` cadre 2). Correction : relier « pas » et « ! » dans un `<span style="white-space:nowrap">` ou un wrapper `.nb` hors split.
- **R2-3 · « Réservation en ligne ou téléphone. »** (chapo de `/reservation/`, `pl_reservation_desk` cadre 1). Le dossier donne Zenchef et un numéro (ligne 50) sans dire que l’on réserve par téléphone ; formulation tolérable car le bouton « Appeler le 081 47 00 95 » est affiché, mais un « Joignable au 081 47 00 95 » serait strictement exact.
- **R2-4 · Photo « profondeur » (page Le nid).** Perspective penchée et enseigne coupée en mobile (`pl_histoire_mob` cadre 1) ; remplacer par la photo 03 ou 04 si l’on veut une page irréprochable.
- **R2-5 · Pied de page à 12 px** (`.kyw-footer__note`, mesuré 12 px) et grands vides desktop sur `/histoire/` et `/accueil` : non traités, déjà notés en passe 1 (F3-1, F3-3), non bloquants. `robots.txt` absent : sans effet sur un site `noindex`.

## Critères PUBLIABLE
Build OK ; 0 erreur console ; 0 lien mort (25 liens internes testés, 0 lien hors `base`) ; 0 fait faux ; 0 invention ; 0 débordement ; 0 violation axe ; mention « Maquette KYW, certaines données sont illustratives » + un seul logo KYW + `noindex, nofollow` sur les 5 pages (conforme au prompt, `commun.md`) ; `lang="fr"`, un `h1` par page, titres et descriptions uniques ; 0 tiret cadratin. L’axe « incomplete » contraste (fond en dégradé, 4 à 9 nœuds) est levé par mesure canvas nœud par nœud : 0 texte sous le seuil.

## Ce qui est bien (à ne pas casser)
1. La signature « Be Belge ··· et d’ailleurs » : poster typographique à points rouges repris dans titres, menu, transition et 404.
2. Données exactes et sobres (prix, horaires, JSON-LD, privatisation) sans avis, chef ni métrique inventés ; dates de menu une seule fois.
3. Technique propre : 0 erreur console, CLS 0, LCP mobile ≤ 1,5 s sous CPU x4 + 4G, menu mobile et focus nets, reduced-motion sans texte caché.
