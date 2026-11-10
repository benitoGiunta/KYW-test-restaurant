# Révision 1 · Pépite awwwards

| id | décision | changement (fichier) | preuve |
|---|---|---|---|
| F1-1 | corrigé | `site.css` : `object-position` par vignette (service 50% 88%, dessert 50% 100%) ; alt « Une personne tient… » (`photos.ts`) ; `sujet` du client non modifié (hors site) | capture `.strip` 1440 : visage + bouteille, assiette visible, plus de bande blanche |
| F1-2 | corrigé | `reservation.astro` : « appelez » seul, bouton « Nous écrire », titre « Réserver, ou nous joindre », méta sans « e-mail » ; `carte.astro` : « un tableau » ; `site.ts` : passé composé, méta sans « soirées » au présent ; `index.astro` : titre « À la bougie, en 2022 », méta au passé | grep dist : 0 occurrence de « écrivez », « réécrit », « accueille aussi », « Parfois » |
| F2-1 | corrigé | `index.astro` : h1 avec `sr-only` + spans `aria-hidden` ; `reveal.ts` : `aria:'none'` pour les spans | axe serious : 0 sur l'accueil 1440 et 390 |
| F2-2 | corrigé | `ul.strip` : `tabindex="0"` + `aria-label` (sans `role="region"` : provoquait `listitem`) | axe 0 |
| F2-3 | corrigé | section « Venir chez Pépite » retirée de l'accueil ; pied : horaires boutique + cave ; bloc horaires/adresse retiré de Réserver (le pied les porte) | grep « Venir chez » = 0 ; axe 0 |
| F2-4 | corrigé | `site.css` : `page-tete` padding bas réduit, menu remonté | capture carte 1440 : « Menu 5 services » visible dans le premier écran |
| F2-5 | corrigé | padding des sections filon/paire réduit | non capturé (mesure visuelle non refaite) |
| F2-6 | corrigé en partie | bouton « Réserver sur le site de Pépite » passé en bouton plein ; cible reste l'accueil du client (outil Tablebooker à confirmer, hypothèse conservée) | build |
| F2-7 | corrigé | `data-split="lines"` remplacé par `data-reveal="up"` (accueil, histoire) | citation sur 1 ligne de rect (getClientRects = 1) |
| F3-4 | corrigé | alt bouteilles neutre | grep |
| F3-7 | corrigé | `data-reveal` retiré du chapeau carte et réservation | build |
| F3-1 | déjà conforme (U+00A0 présent) | - | - |
| F3-2, 3, 5, 6 | non traités (F3 hors périmètre) | - | - |

Vérifications : build OK, scrollWidth = fenêtre sur 4 pages à 1440 et 390, axe serious/critical 0 sur 4 pages x 2 largeurs. Serveur arrêté (kill).
