**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full : contenu et routes restent, système et composition changent.
- **Before** · `.hallmark/before.txt`, `before.json` (15 liens, 0 champ).
- **Keeps** · routes `/`, `/la-carte/`, `/suggestions-de-la-semaine/`, `/contact/`, réservation Tablebooker, vert de marque, texte de réouverture (reformulé), carte complète, horaires de cuisine.
- **Files** · `src/styles/{tokens,base,page}.css`, `src/data/{site.ts,carte.json}`, `src/layouts/Base.astro`, `src/components/{Nav,Footer,Fig}.astro`, `src/pages/*`.
- **Shape** · Letter (lettre de la maison) + Index (la carte), tirage c61636 : Conversational FAQ refusé car le site n'a pas de questions ; genre editorial.
- **Theme** · Solstice, dealt 1/3 (seed `restaurant-namur-classic-brasserie-d971·2ced0d12·2026-11-10·r0`) : papier crème, encre brune, Yeseva One, filets or. Écartés : Squeeze (tuiles arrondies et fruits, plutôt marché) ; Ink (catalogue froid, aucune chaleur de brasserie). Accent : le vermillon est remplacé par le vert du client (#2d5735, `oklch(41% 0.075 152)`).
- **Chrome** · nav : masthead (logo large au centre, deux liens à gauche, un lien et « Réserver une table » à droite) · pied : statement « Une brasserie pour tous. » (mot de la maison, PDF de la carte), adresse, téléphone, liens, crédits, puis KywFooter.
- **Hero** · Ledge (tirage) : photo de l'assiette en champ plein, titre « La grande tradition de la brasserie. » à la base sur voile brun, réserver + voir la carte.
- **Signature** · l'assiette sous le titre ; la bande « Entrée et plat, 25 € » au milieu de l'accueil.
- **Sections** · Hero (Ledge) · Split (lettre + illustration de carte) · Rows (six classiques et prix) · Band ink (statement du midi) · Split mirroré (événements, well) · Band paper (horaires Schedule + salle + réserver) · Footer.
- **Material** · réel : texte du client, carte (68 lignes), prix, horaires, équipe citée par le site et L'Avenir · images : 1 photo client (2020), 1 illustration, 1 photo libre Unsplash légendée · absent : avis, note Google, couverts, photos de salle et d'équipe.
- **Comp** · c1 (image-led) choisi ; voir `comp.md`.
- **Sweep** · phase 3.

## Approche

Macrostructure **Letter** pour l'accueil (le texte de réouverture est une lettre de la maison) et **Index** pour la carte ; empreinte `Heading serif display|Body prose étroite|Divider filets|Button pastille + lien|Image une photo par section|Reveal aucun (phase 2 : un)`. Posture calme, aucune chorégraphie de scroll. Dérogations : carrousel de deux logos supprimé (18), 5 paragraphes réduits à une lettre (58), vh en dvh (6a), réservation = lien Tablebooker (pas de faux envoi). Test miroir : un voisin n'aurait pas la combinaison Ledge photo + masthead logo + statement vert ; décision changée : accent vert de marque au lieu du vermillon.

## Thème

Solstice, tokens lus dans `src/styles/tokens.css` : papier `oklch(94% 0.03 80)`, encre `oklch(27% 0.05 50)`, accent vert, or `oklch(74% 0.14 75)` pour les filets seulement, police d'affichage Yeseva One, texte Archivo, petits textes Archivo Narrow 600.

## Composants

- **Carte** : Rows (nom en 1re colonne, prix à droite, description en dessous), une section par groupe, liste de sauts en tête ; Switcher et filtres : phase 2. Jamais de tuiles ni de carte dans carte.
- **Horaires** : Schedule en tableau (`th scope`), jour courant par fond `paper-3` posé par script, dits une fois sur l'accueil (le pied les omet) ; fermeture sans objet (7 j/7).
- **Pied** : statement + colonnes adresse, téléphone, liens ; crédits en `data-credits`.
- **Photo** : `<figure data-slot data-alt>`, `width`/`height`, hero `fetchpriority="high"`, autres `lazy`, légende = un fait (illustration, photo libre).
- Nav, boutons animés, reveal : phase 2.
