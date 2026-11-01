# Revue portfolio · Chez Guillaume · passe 2
Verdict : PUBLIABLE
Lecture en une ligne de l'idée du site : un cahier-collage de flyers de comedy club (aplats rouge rideau, bleu, jaune, étiquettes à cadre noir, grand Caslon, Space Mono) dont la case du logo change selon la section ; inchangée depuis la passe 1.

Scores /10
- Design 8 : hero et agenda lisibles, jours en grand posés sur un fond uni (`rg2-home-agenda-1440.png`, `-390.png`), plus de trait qui barre « MER / SAM ».
- Usabilité 8 : 7 pages et 35 références locales en 200 (curl), 0 débordement (scrollWidth = 1440 et 390 sur 7 pages), FAQ désormais répondue.
- Créativité 8 : case de logo vivante, vague, post-it ; l'italique n'est plus une formule (3 titres seulement, `grep '<em>' src/pages`).
- Contenu 8 : 0 fait faux, 0 invention (FAQ, agenda, brunch recoupés avec `donnees.json` et `dossier.md`, voir plus bas) ; plus de cartes identiques répétées.
- Technique 8 : build OK (7 pages, `dist/` sans écart git), 0 erreur console, 0 requête 4xx, CLS 0,0001, LCP mobile 1,04 à 1,07 s, 350 Ko transférés ; axe complet sans violation serious ou critical.

Périmètre et méthode : `QA-revue2.md` n'existe pas et `.shots-chez-guillaume-portfolio-revue2/summary.json` ne contient que des `shootFailed` (navigateur fermé pendant le shoot de l'agent captures) : aucune planche exploitable, donc contrôles ciblés maison sur `dist/` servi sur le port 4721 (PID 11318, arrêté) : axe-core complet sur 7 pages × 1440 et 390 après défilement lent, contraste calculé nœud par nœud (0 écart), console et réponses 4xx, planches PIL des zones modifiées (agenda accueil et page, histoire, FAQ, 1440 et 390), mesure du loader en deux passes en série (CPU ×4, 4G lente), reduced motion, liens, `noindex` et mention.

## Vérification des corrections annoncées dans REVISION-1.md
| id | résultat | preuve |
|---|---|---|
| F1-1 `aria-prohibited-attr` | confirmé corrigé | axe complet : 0 `aria-prohibited-attr` sur 7 pages × 2 largeurs |
| F1-2 nom accessible du logo | confirmé corrigé | 0 `label-content-name-mismatch`, 0 `link-name` ; `Chez Guillaume, accueil` en `sr-only` (1 occurrence par page) |
| F2-1 trou « photo à venir » | confirmé corrigé | `rg2-hist-1440.png` : deux fiches de même hauteur, `grep -ri 'photo à venir' dist/` → 0 ; voir F3-7 |
| F2-2 italique en formule | confirmé corrigé | 3 `<em>` de titre restants (accueil, histoire, privatisation) ; `rg2-pl-d2.png` : « La maison », « Dans la presse » en romain |
| F2-3 cartes Mer à Sam | confirmé corrigé | une entrée « Repas-spectacle MER / SAM » avec 4 pastilles de jour, `rg2-home-agenda-1440.png`, `-390.png` ; lignes accueil et agenda toutes différentes |
| F2-4 loader mobile | confirmé en partie | loader lui-même de 2,3 s (plafond de 2,6 s respecté) ; `is-loaded` à 4,84 s et 4,80 s sous CPU ×4 + 4G lente (DCL 2,5 s : bundle JS). Chiffres de REVISION-1 reproduits à ± 0,15 s ; voir F3-8 |
| F2-5 FAQ « sans manger » | confirmé corrigé | réponse lue sur `rg2-faq-390.png` et dans `site.ts:209` ; chaque affirmation recoupée : repas obligatoire mer-sam (`donnees.json:191`), lundi 12 € (`:178-179`), ticket dimanche 20 € avec ou sans buffet (`dossier.md:46`) |
| F2-6 lignes sur les jours | confirmé corrigé | `rg2-home-agenda-1440.png` : DIM, LUN, MER/SAM sans trait au travers ; idem 390 px |
| Hors revue : brunch « Réservation par e-mail ou téléphone » | confirmé | `rg2-home-agenda-1440.png` ; `donnees.json:21` |

## Findings

### F0 (bloquant) : aucun
### F1 (majeur) : aucun
### F2 (mineur) : aucun

### F3 (finition)
- **F3-1 (reste de la passe 1) · deux `contentinfo`** : axe `landmark-no-duplicate-contentinfo` (moderate) sur 7 pages × 2 largeurs ; `src/components/Footer.astro:8` (`<footer class="footer">`) et `packages/kyw-footer`. Remplacer le `<footer>` du site par `<section aria-label="Coordonnées" class="footer">` ; ne pas toucher au paquet.
- **F3-2 à F3-6 (restes de la passe 1, non traités par choix)** : horaires en 7 lignes dans chaque pied de page avec formats mêlés « 18:00 à 00:00 » / « 18h30 » (visible sur `rg2-faq-390.png`) ; phrase de méta-commentaire `src/pages/index.astro:151` (« Titres d'articles parus… ») et titre L'Avenir tronqué ; survol sans autre signal que la couleur ; texte collé au filet du brunch ; « Trois occasions » `src/pages/privatisation.astro:43` pour quatre choix.
- **F3-7 (nouveau) · fiche « Guillaume Wattecamps, alias GuiHome, Fondateur, humoriste » illustrée par une salle vide** (`photos/salle-rideaux`, `src/data/site.ts`, `rg2-pl-m.png` 4e vue, `rg2-hist-1440.png`). Aucune personne n'est montrée à tort, mais le lecteur cherche le visage. Correction : choisir `scene-micro` (humoriste sur scène, sans le nommer) ou passer la légende sur le lieu (« La salle ») et laisser le nom dans le texte.
- **F3-8 (reste de F2-4) · délai avant contenu interactif sur mobile lent** : `is-loaded` à 4,8 s sous CPU ×4 + 4G lente, dont 2,5 s avant le début du loader (JS, 350 Ko transférés). Hors seuil pour une connexion normale ; piste : découper ou différer SplitText.

## Vérifié sans écart
- Faits : adresse, téléphone, e-mail, horaires, prix et textes modifiés conformes à `donnees.json` et `dossier.md` ; 0 `placeholder` visible.
- Obligations : `noindex, nofollow` (conforme au prompt), mention « Maquette KYW, certaines données sont illustratives », un seul logo `kyw-signature`, un seul h1, JSON-LD `Restaurant` avec `openingHoursSpecification`, sur les 7 pages.
- Reduced motion : seuls restent à opacité 0 le loader (non affiché) et son compteur `sr-only`, sur accueil, agenda, histoire ; 0 texte de contenu caché.
- Capture « Dans la presse » en mobile : le cadre vide vu 1 s après défilement est un reveal en cours (opacité 1 à 3 s, `rg2-presse-390.png`), pas un défaut.

## Ce qui est bien (à ne pas casser)
1. Hero accueil et pile mobile : lisibles en une seconde.
2. Case de logo qui suit la section (Table, Scène, Brunch, Namur).
3. Agenda réel de la semaine (pastilles de jour, brunch par e-mail ou téléphone, ticket du dimanche) sans artiste ni métrique inventés.
