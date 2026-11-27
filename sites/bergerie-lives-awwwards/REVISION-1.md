# Révision 1 · bergerie-lives awwwards (27/11/2026)

| id | décision | changé (fichier) | preuve |
|---|---|---|---|
| F1-1 aria-prohibited-attr | corrige | `src/engine/reveal.ts` : `aria: 'none'` dans `SplitText.create` | axe runtime (aria-prohibited-attr) : 0 violation sur 5 pages x 1440 et 390 |
| F2-1 contentinfo en double | corrige | `src/components/Footer.astro` : `<footer>` du site en `<section aria-label="Contact et adresse">` | axe landmark-no-duplicate-contentinfo : 0 ; 1 seul `<footer>` par page dans dist |
| F2-2 insécables | corrige | `histoire`, `reservation`, `404`, `le-domaine`, `index`, `Footer`, `site.ts` : U+00A0 avant `:` `;` et dans « 20 € » | dist : 0 espace ordinaire avant `:;?!»` hors balisage ; 5 à 7 U+00A0 par page |
| F2-3 détails non prouvés | corrige | `site.ts`, `index`, `reservation` : « laissé son nom », « au bord de la Meuse », « une demi-heure pour parcourir… », « quelques minutes de », « respirer entre deux séances », « Hébergement sur place », « nuit sur place » retirés ; « près de », « environ 30 minutes » | grep dist : 0 occurrence de « quelques minutes » et « laissé son nom » |
| F2-4 répétitions | corrige en partie | accueil : bloc « Sur place » réduit à une phrase + renvoi vers Le domaine ; le-domaine : liste Chambres réduite à wifi et cuisine (piscine, petit déjeuner restent dans « Pour tous les hôtes ») ; reservation : paragraphe « Journée piscine » retiré (20 € reste sur le-domaine) | grep dist. Refusé : « Le domaine se ferme derrière vous. » reste en signature de pied sur chaque page (DESIGN.md, choix de concept) |
| F2-5 poids | corrige en partie | JPEG sources purgés de `dist/_astro` (23, post-build) ; 7 webp > 300 Ko recompressés (q55) | dist 15 Mo ; il reste 5 webp entre 340 et 430 Ko (photos plein cadre 1800 px) |

Non traités (F3, hors périmètre) : en-tête 390 px, srcset 960w de reservation, doublon `17-chambre-boisee`, liens presse, bouton réservation, LCP accueil.
Vérifié : build OK (5 pages), 0 erreur de page, scrollWidth = clientWidth à 1440 et 390 sur les 5 pages. Pas de capture visuelle du bloc « Sur place » de l'accueil (changement de balisage simple, à regarder à la revue suivante).
Piège : la purge des JPEG et la recompression sont une étape post-build manuelle (script non versionné) ; tout rebuild les remet.
