# Révision 1 · Le Royal portfolio (ciblée : F0, F1, F2 ; vérification par grep sur `dist/`, pas de capture)

| id | décision | changement (fichier) | preuve |
|---|---|---|---|
| F1-1 | corrige | badge non posé si le nom contient déjà le mot (`src/components/Lignes.astro`) | 0 « maison … maison » sur accueil et /carte/ ; 1 badge restant (« végé ») |
| F2-1 | corrige | lien « La maison → » (`src/pages/index.astro`) | « Toute l'histoire » absent de dist |
| F2-2 | corrige | histoire[1] réécrite (« Façade en brique, terrasse sous parasols noirs… »), chapeau /terrasse/ différent, accès : « Au numéro 13 de la Place du Théâtre », phrase d'horaires/ouverture 11h-23h seulement sur l'accueil (`site.ts`, `terrasse.astro`, `reservation.astro`) | « déjeuner d'affaires » 1 occurrence (accueil) ; « fait face au » 0 |
| F2-3 | corrige | libellé = nom du jour sans « Aujourd'hui, » (`src/motion/setup.ts`) | grep « Aujourd'hui, » 0 dans dist (script du moteur inclus) |
| F2-4 | corrige | /histoire/ étoffée : photo terrasse, ardoise moules jumbo (mardi/jeudi, conditions à confirmer), lien terrasse ; faits du dossier seulement (`histoire.astro`) | build 7 pages OK |

Bonus F3 : F3-1 horaires « 12h00 à 14h30 » (accueil, /reservation/) ; F3-3 méta description accueil 159 caractères.
Hypothèses : le contenu de /histoire/ reste mince par nature (aucune histoire dans le dossier) ; pas de fusion avec /terrasse/. Non traités : F3-2, F3-4 à F3-12.
Bilan : 5 corrigés, 0 refusé, 0 impossible. Pas de capture visuelle faite (grep seulement) : la revue suivante doit vérifier /histoire/ en image.
