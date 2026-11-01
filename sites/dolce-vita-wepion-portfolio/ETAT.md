# ETAT : dolce-vita-wepion-portfolio (phase 1 sur 3)

## Fait
- Gabarit forno copié, adapté : palette, contenu (`src/data/site.ts` + `src/data/carte.json` tiré de donnees.json), 7 pages (accueil, carte, pizze, histoire, à emporter, réservation, 404), photos WebP dans `public/photos/`, favicon, OG.
- Build OK : `scripts/q.sh dvw-build node scripts/build-site.mjs sites/dolce-vita-wepion-portfolio` -> `dist/dolce-vita-wepion/portfolio/` (7 pages).
- DESIGN.md (matrice, décisions). `gabarits/UTILISATION.md` mis à jour.

## Reste (phases 2 et 3)
- QA navigateur : shoot, audit, mesures de débordement (1440/1280/1024/390), clics réels sur l'en-tête, bas de page avec KYW footer.
- Contrôle visuel de la levée (pizza), du mur « La maison », du carrousel « Les gens » (2 cartes sans photo : fond vert + « Photo à fournir »).
- Vérifier le compte à rebours (`page.clock.install`, Europe/Brussels) : mardi fermé, mercredi midi et samedi midi fermés.
- Éventuel usage du logo crème (qualité 3, à vérifier), sloplint, RAPPORT.md, `pnpm index`, commit de `dist/`.
- Commentaires d'en-tête de `base.css` et `setup.ts` mentionnent encore « Forno, brun » (sans effet).

## Décisions et hypothèses
- Forno choisi (25/30). Les autres FICHE ne sont pas toutes relues.
- Vert forêt à la place du brun : les noms de jetons (`--four`, `--tomate`) sont conservés (contrat du moteur).
- Photos : vignettes rondes seulement pour Antipasto Dolce Vita (planche), Margherita, Moelleux (sujet de photo concordant) ; escalope, burrata et pâtes aux palourdes non rattachées à un plat de la carte (le nom de fichier ne vaut pas légende). Photos 09, 10, 11 importées mais non affichées à ce stade.
- Avis : 3 extraits Google réels du site client, auteurs en initiale comme affichés. Aucune note ni nombre d'avis publiés.
- Pas de GPS : plan par recherche d'adresse OpenStreetMap, pas de `geo` en JSON-LD. E-mail réel du dossier.
- Fermeture exceptionnelle du 26 au 29 octobre non reprise (date passée, aucune date en dur).
- Description « Crème brûlée : Meilleures qu'en vacances » et « Le plaisir d'abord » (nuggets) repris tels que dans la carte du client. Descriptions parasites (« À table », « Les pizzas ») neutralisées.
- Aucune donnée `placeholder: true` : tout est sourcé. Manques assumés : portraits, GPS, abonnés, presse.

## Pièges
- `gabarits/` non touché. Défaut gabarit connu à reporter : le gabarit suppose un nom en deux lignes (ici « La Dolce » / « Vita », le titre de la levée est « Vita »).
