# Revue legacy · Le Lodge Wépion · passe 2
Verdict : PUBLIABLE
Lecture en une ligne de l'idée du site (sans avoir relu DESIGN.md) : une one-page papier crème et brun, hero « façade de nuit » avec une plaque qui annonce à la fois la brasserie et l'accueil provisoire à Erpent, deux encarts « ouvert à Erpent / fermé à Wépion », la carte complète en onglets, un tea-room sur bande sombre ; honnête sur la fermeture après l'incendie.

Conditions : `dist/` (02:47) postérieur à `src/` (02:37), QA-revue2 (02:55) postérieur au `dist/` : captures et `report.json` réutilisés. Mesures refaites par 4 scripts maison sur mon propre serveur (port 4937, PID 10436, arrêté par `kill`) : axe-core de node_modules (3 pages x 1440/390/320), console et réponses HTTP, débordement par éléments et par `Range` (3 pages x 6 largeurs : 1440, 1024, 768, 390, 360, 320, après défilement), cibles, JSON-LD/OG/icône/noindex/mention/logo, menu au clavier, onglets, mots longs de la carte, espaces avant « : », sections et pied. Non testé : Safari iOS (popover), hover (planches du QA non rouvertes une à une), 4G réelle ; LCP/CLS repris du `report.json` du QA (accueil mobile : LCP 896 ms, CLS 0,094 mesuré par shoot, voir F3-1).

Scores /10
- Design 7 : hiérarchie nette, plaque à filet d'or sur façade de nuit, grille de carte soignée (`planche-desktop` : hero, « Où nous trouver », carte) ; la façade est maintenant visible à 390 px (photo 108-401 px, plaque dès 361 px).
- Usabilité 8 : 0 débordement à 6 largeurs sur 3 pages, menu mobile qui garde le focus (voir F1-… vérifiés), onglets sur une ligne à 390/360/320, réservation en un clic partout, aucune barre fixe sur cookies et 404.
- Créativité 5 : propre et cohérent mais attendu (crème, brun, serif, plaque sur photo) ; un seul vrai geste, l'adresse provisoire dans la plaque ; pas de moment mémorable.
- Contenu 8 : faits conformes au dossier, plus aucune invention repérée (« reconstruction », « vallée mosane » et « ici » disparus), 88 lignes de carte inchangées depuis la passe 1 (aucun fichier de `src/data` modifié).
- Technique 8 : build OK, 0 erreur console et 0 réponse HTTP en échec (3 pages x 6 largeurs), 0 violation axe sur les 3 pages (1440, 390, 320), un `<footer>` par page, JSON-LD `Restaurant` + OG + favicon présents.

## Vérification des corrections annoncées (REVISION-1.md)
| id | verdict | preuve |
|---|---|---|
| F1-1 favicon | CONFIRMÉ | `link[rel=icon]` sur 3 pages ; 0 erreur console et 0 réponse >= 400 à 1440, 1024, 768, 390, 360, 320 |
| F1-2 JSON-LD, OG | CONFIRMÉ | 1 `ld+json` par page ; `Restaurant` : nom, adresse Chaussée de Dinant 931 5100 Wépion, +3281400891, url Barestho, sameAs Facebook et Instagram, pas d'`openingHours` ; `og:image/type/url/title/description/locale` présents, `og.jpg` servi (200) |
| F2-1 inventions | CONFIRMÉ | `reconstruction`, `vallée`, « ici » absents du texte ; description = « en attendant la réouverture » ; titre « Produits cités sur la carte » et 6 lignes (Poteaupré, porc Ardenne, truite d'Annevoie, canard de la Sauvenière, fraises de Wépion, Mil'pat) : produits tous présents dans le dossier ou la carte, prix repris de la carte |
| F2-2 hero mobile | CONFIRMÉ | `lodge-r2-m-hero.png` : façade éclairée visible au-dessus de la plaque ; image 108-401 px, plaque 361-734 px ; vérifié aussi sur la planche du QA (`m-01-hero.png`) |
| F2-3 focus du menu | CONFIRMÉ | menu ouvert, 10 Tab : Fermer, Carte, Tea-room, Réserver, Contact, Réserver une table, puis sortie vers le navigateur (`body`), retour à Fermer ; aucun élément hors menu ; Échap rend le focus à « Menu » ; 0 `inert` restant |
| F2-4 landmarks | CONFIRMÉ | axe : 0 violation sur les 3 pages à 1440, 390 et 320 (plus de `landmark-no-duplicate-contentinfo`, plus de `region`) ; 1 `footer` par page |
| F2-5 onglets | CONFIRMÉ | « Entrées / Les plats / Desserts / Boissons » au même `top` à 390, 360, 320 px (2107, 2227, 2372) ; scrollWidth = fenêtre ; aucun mot de carte coupé (« Accompagnements » : mot de 189 px dans une boîte de 288 px à 320) |
| F3-1 « tea-room » | CONFIRMÉ | `nowrap`, le titre passe sur 3 lignes sans coupure au trait d'union (planche desktop et mobile) |
| F3-2 espaces avant « : » | CONFIRMÉ pour le site (non annoncé par la révision, mais corrigé) | 2 occurrences U+00A0 avant « : » (lead tea-room, « Photographies ») ; seul reste « Comme une César : », copie du client |
| F3-3 | CONFIRMÉ | h2 « Où nous trouver » ; graphie « Tea-room » partout (nav et titre) |
| F3-4 pied 390 px | CONFIRMÉ (corrigé en passant) | `.pied__cols` et `.pied__fin` de 16 à 374 px, les quatre colonnes de 16 à 374 px |
| F3-5 barre fixe | CONFIRMÉ | `[data-collant]` absent sur cookies et 404 ; `display: flex` seulement sur l'accueil sous 60rem |
| F3-6 vides entre sections | NON TRAITÉ (annoncé comme tel) | hauteur de respiration entre deux sections ~288 à 300 px à 1440 (pad-bot 130-144 + pad-top 158) ; voir F3-2 ci-dessous |

## Findings (aucun F0, F1 ni F2)

### F3 finitions (aucune ne bloque la publication)
- **F3-1 · CLS mobile de l'accueil 0,094** (`report.json` du QA : 0,094 mobile, 0,021 bureau ; la passe 1 mesurait 0,026). Le seuil de la maison est 0,05. Source probable : swap de police du titre ou photo du hero avec le bandeau 4/3 ajouté à la passe de révision. Correction : réserver la hauteur (`aspect-ratio` déjà posé sur le bandeau ? sinon l'ajouter) et préciser `font-display: optional` ou un `size-adjust` sur Yeseva One. Non bloquant (aucun saut visible sur les captures `m-01-hero` successives), à retester si le site est retouché.
- **F3-2 · Respiration entre sections** (F3-6 de la passe 1, non traité) : ~290 px de vide entre le dernier contenu d'une section et le premier de la suivante à 1440 px (`lodge-r2-d-1.png`). Réduire `--section-gap` de ~20 % ou remplir. Pur choix de rythme.
- **F3-3 · Métadonnées** : pas de `twitter:card`, pas de `canonical` (noindex voulu, donc sans effet), description de `/cookies/` de 32 caractères (cible 50 à 160), audit WARN « polices TTF/OTF » à vérifier côté paquet. À ignorer pour une maquette noindex.
- **F3-4 · Horaires « Avant l'incendie : tous les jours, 11 h 30 à 22 h 30 »** : le dossier signale une contradiction (Trouve Ton Resto : 12 h-15 h et 18 h-21 h 30) « à confirmer ». Le texte reprend l'horaire du site officiel avec l'étiquette « avant l'incendie », ce qui est conforme ; ajouter « horaire du site, à confirmer » éviterait de l'affirmer.
- **F3-5 · 404 brute du serveur** (`serve.mjs`, `zz-inconnu/`) : violation `color-contrast` (4,36 pour 4,5) sur `.kyw-footer__note` ; c'est la page générique du paquet KYW, pas celle du site (`404.html` : 0 violation, title « Page introuvable | Le Lodge Wépion », h1, `lang="fr"`). Faux positif du QA (leçon commune) ; à signaler au paquet `kyw-footer` seulement.

## Vérifications sans écart
- Faits : adresses Wépion et Erpent, depuis le 15/09/2026, six jours sur sept, téléphones (0496 92 55 13, 081 40 08 91), e-mail, Barestho, Facebook, Instagram, itinéraire Maps (50.4234855, 4.8742231), incendie du 21 mai 2026, réouverture « fin 2026, voire début 2027 » + « date à confirmer », horaires d'Erpent « à confirmer » : conformes à `dossier.md` et `donnees.json`. « Carte de saison », « une table = une addition », tea-room l'après-midi, réservation Barestho ou téléphone : tous dans le dossier.
- Liens : ancres internes #main #lieu #carte #tea-room #reserver #contact #menu existent ; `cookies/` et `404.html` servis ; liens externes = URL du dossier. 0 tiret cadratin ; 0 guillemet « sans U+00A0 ; 1 h1 par page ; `lang="fr"` ; `noindex` sur 3 pages ; mention « Maquette KYW, certaines données sont illustratives » et 1 logo `kyw-signature` par page.
- Alt : 9 images de la page, alt descriptifs et cohérents avec la passe 1 (photo « enseigne Beau Rivage » non utilisée).
- Slop : pas d'eyebrow systématique, pas de dégradé violet, pas de trois cartes égales, un seul reveal ; seule la plaque papier sur photo est un schéma attendu.

## Ce qui est bien (à ne pas casser)
1. Le traitement honnête de la fermeture : deux encarts « Erpent ouvert / Wépion fermé », marqueurs « à confirmer », pas de faux horaires.
2. La carte : onglets accessibles sur une ligne à 320 px, 88 lignes fidèles, aucun mot coupé.
3. Robustesse : 0 débordement à 6 largeurs, menu mobile qui garde le focus, 0 violation axe, JSON-LD sans horaires inventés.
