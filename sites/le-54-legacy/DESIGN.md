**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full · 6 routes (/, /a-propos/, /lacarte/, /reservations/, /galerie/, /contact/) + 404
- **Before** · Floor 4 familles (26a, 34, 40, 58), Reflex 28, 21 FAIL au total (`AUDIT.md`) ; la barre latérale blanche, la salle en noir et blanc et le menu court restent
- **Keeps** · toutes les routes et leurs destinations, les liens `tel:`, `mailto:`, Facebook, Instagram, la carte (lien OpenStreetMap sur les coordonnées du dossier), les quatre champs du formulaire de contact (`nom`, `email`, `telephone`, `message`), la copie du client (hors gates 19, 54, 58, 63, 69), la pastille Gault&Millau en texte, les couleurs du logo
- **Files** · create : tout `sites/le-54-legacy/` · edit : aucun autre site ni `gabarits/` · delete : none
- **Shape** · Photographic (08, gardée) ; le draw `ca0a04` proposait Bento Grid : refusé, la matière est une photographie de salle et un menu court
- **Theme** · Atelier, dealt 1/3, seed `restaurant-namur-gastronomic-fine-7e6f·dc32d3f7·2026-11-10·r0`. Écartés : Spore (sombre, pas de place pour la plaque claire sur des photographies déjà noires) ; Vellum (blackletter, trop historique pour un restaurant de village). L'accent slate d'Atelier (`oklch(41% 0.075 248)`) coïncide avec le bleu du logo mesuré dans `photos/16-logo.png` (`rgb(48 80 112)` environ) : pas de `--brand`
- **Chrome** · nav : barre haute collante (nom, quatre liens, Réserver) ; la barre latérale de 300 px est abandonnée (draw : « banner over a retracting bar », refusé, la retraction demande du JS) · footer : mast (Le 54 en grand, quatre colonnes), puis KywFooter
- **Hero** · Poster (gardé ; le draw proposait Index) : la salle en noir et blanc plein cadre, une plaque de papier au pied à gauche avec le titre, une phrase et deux actions
- **Signature** · la salle en noir et blanc plein cadre avec la plaque de papier posée à son pied
- **Sections** · Hero (Poster) · Statement (une phrase du chef, un chapeau en lettrine) · Rows (le menu du moment) · Showcase (tartare, sans titre) · Schedule en bande (horaires et adresse) · Counter (réservation) · Footer (mast)
- **Material** · real : toute la copie du site, les prix 48 € et 65 €, les suppléments, les téléphones, l'e-mail, les coordonnées · pictures : 14 photographies du client · absent : avis Google, citations, nombre d'abonnés, baseline
- **Comp** · 2 built, no key · c1 chosen (`comp.md`)
- **Sweep** · phase 3

## Approche

Macrostructure d'origine : Photographic (08), empreinte `Heading|Body|Divider|Button|Image|Reveal` = `Small|Short|Image edge|Typographic link|Full-bleed|None`. Le site d'origine est une série de pages courtes sous un slider de photographies de salle plein écran. Posture : Poster, calme, un seul pattern de scroll au plus (aucun en phase 1 ; la phase 2 n'en ajoute qu'un).

Dérogations : slider automatique remplacé par une photographie fixe (gate 18) ; `vh` remplacé par `dvh` dans le hero (6a) ; formulaire sans envoi réel : `data-endpoint=""` et un message d'état « Maquette » (70) ; barre latérale remplacée par une barre haute (le menu mobile est un `popover` natif, sans script) ; séquence « hero, texte, menu, horaires » gardée avec composition neuve (`waive 8`). Photographie sous le hero : un showcase sur cinq sections.

Test miroir : un voisin avec « restaurant gastronomique, Namur, photographies de salle » obtiendrait Spore et un hero Index ; ici Atelier, un hero Poster, et une plaque de papier au pied de l'image sombre. Décision changée pour passer le test : le thème clair (Atelier) sur des photographies sombres plutôt que le thème sombre dealé.

## Tokens (depuis `src/styles/tokens.css`)

Papier calcaire `--color-paper oklch(94.5% 0.010 76)`, bandes `--color-paper-2` ; encre `oklch(19% 0.024 52)` ; accent slate `oklch(41% 0.075 248)` (le bleu du logo), jamais plus de 4 % d'un écran (soulignements, lettrine, focus). Sentient 300 pour les titres, Sentient 400 pour les noms de plats et les jours, Hanken Grotesk 400 pour le texte. Rayon : 0 pour les cartes, 3 px pour les boutons ; filets de 1 px, une règle d'encre de 1 px en tête des listes et du tableau. L'or du logo n'est pas un jeton (Atelier refuse un accent chaud) : il reste dans le logo, dans `public/logo.png`.

## Composants

- **Nav** : une ligne de 72 px, nom en Sentient 400 et « Dave » en petit, quatre liens, un bouton Réserver ; page courante soulignée en slate ; sous 52 rem, bouton Menu et `popover`. Réservation dans la nav et le hero (anatomy.md § book).
- **Hero** : Poster, `min-height: max(34rem, calc(100dvh - 72px))`, la photographie en `[data-slot]`, une plaque `--color-card` à 34 rem au pied.
- **Carte** : Rows, nom du plat en Sentient 400 sur les colonnes 1 à 6, ligne sur 7 à 12, supplément à droite en `tabular-nums` ; pas de Switcher midi/soir (la carte du client n'a qu'un menu du moment) ; filets, ni bordure ni ombre ; nom et prix lisibles à 375 px (les colonnes s'empilent sous 40 rem).
- **Horaires** : Schedule en `<table>` (jour, midi, soir), jour fermé en `--color-muted` jamais barré, jour courant marqué par un fond `--color-card` posé par un script de six lignes (`aria-current="date"`), dernières commandes sous le tableau, dits sur l'accueil et sur /reservations seulement.
- **Réservation** : comptoir, deux numéros `tel:` en boutons de 56 px et un lien vers le formulaire de /contact.
- **Pied** : mast (nom en 11 rem au plus), adresse, contact, ouverture résumée, réseaux, `data-credits`, jamais « Tous droits réservés » ni newsletter ; KywFooter dernier élément de chaque page.
- **Photo** : `<figure data-slot data-alt>` avec `width`, `height`, `srcset` 800 et 1600 px (WebP, `sharp`), `alt` du champ `sujet`, étiquette murale en petit sous l'image.

## Sur-utilisation

- [x] 1. Hallmark `SKILL.md`, `redesign.md` et `layout.md` § 5 à 7 lus · preuve : cette session, `AUDIT.md`, `comp.md`
- [x] 2. sloplint `--before` sur les cinq pages d'origine · preuve : `.hallmark/before.txt` (21 FAIL, 28 REFLEX)
- [x] 3. deal, draw, scaffold, stamp · preuve : `.hallmark/log.json` partagé, `src/styles/page.css:1`
- [x] 4. comp avant build, deux comps · preuve : `.hallmark/comps/c1.png`, `c2.png`, `comp.md`
- [x] 5. sloplint statique sur `src` : 0 FAIL, 0 REFLEX · preuve : `.logs/sloplint.log` (le tier de rendu est de la phase 3)
- [ ] 6. mouvement, QA navigateur, sloplint `--render` : phases 2 et 3
