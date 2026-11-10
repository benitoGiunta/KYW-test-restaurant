# QA revue 2 — le-54 / awwwards (captures)

Build : `node scripts/build-site.mjs sites/le-54-awwwards` : exit 0, 5 pages, `dist/le-54/awwwards/`.
Serveur : `serve.mjs dist --port 4502`, arrêté après la passe.

## Statut de la passe

- **Captures incomplètes.** Seule la page d'accueil (`home`) est complète (40 fichiers, `report.json` présent).
  La page `le-54-item` (carte) a été interrompue à 5 fichiers, sans `report.json`. Les pages suivantes n'ont pas été capturées.
  Le shoot a été stoppé à la main (lenteur : environ 10 min par page, 2 pages en 20 min).
- **Planche** : `python3 scripts/planche.py` faite pour `home` uniquement.
- **Audit** : résultat contradictoire, voir plus bas.

## Pages

| Page | Dossier de captures | Planche | État |
|---|---|---|---|
| Accueil `/le-54/awwwards/` | `/home/user/KYW-test-restaurant/.shots-le-54-awwwards-revue2/home/` | `/home/user/KYW-test-restaurant/.shots-le-54-awwwards-revue2/home/planche.png` | complète |
| Carte `/le-54/awwwards/carte/` | `/home/user/KYW-test-restaurant/.shots-le-54-awwwards-revue2/le-54-item/` | aucune | incomplète (5 fichiers, pas de report) |

## Chiffres (accueil, `report.json`)

- Erreurs console : 0. Requêtes en échec : 0.
- Axe : 0 violation, 0 sérieuse, 9 « contrastNeedsReview ».
- Desktop : LCP 96 ms (`h1#h1.display`), CLS 0, chargement 199 ms, hauteur 6220 px, débordement horizontal non, éléments hors cadre 0, cibles tactiles petites 0, FPS de défilement 60 (logiciel, plancher seulement).
- Mobile (ralenti, 4x CPU) : LCP 992 ms, CLS 0, chargement 2180 ms, hauteur 5841 px, débordement horizontal non, cibles petites 0, FPS 60.
- Clavier : arrêts de tabulation présents dans l'ordre (lien d'évitement, marque, navigation, boutons de réservation, etc.).
- Mouvement réduit : 0 texte caché, `moving: false`.
- Survol : cibles testées (`h-01`, `h-02`…), réaction « pixels » sur le bouton de réservation.
- Notes du rapport : `settledMs` desktop 2428, mobile 4218.

## Audit (`audit.mjs`)

- Le journal `/home/user/KYW-test-restaurant/.logs/le-54-awwwards-revue2-audit.log` contient deux exécutions successives.
- Exécution 1, serveur actif, 4 pages explorées : **0 FAIL, 4 WARN**. WARN relevés : phrase répétée 2 fois sur `/le-54/awwwards/histoire/` ; page 404 sans `<h1>` ; pas de `robots.txt` ; pas de `sitemap`. Heaviest page `/le-54/awwwards/` ~548 KB.
- Exécution 2 (lancée par la commande de capture chaînée, après l'arrêt du serveur) : **2 FAIL, 0 WARN** (`HTTP fetch failed for an internal link` ; `start page ... did not load as HTML`). Ce résultat est invalide : le serveur était arrêté. Le journal a été écrasé par cette seconde exécution.
- Conclusion factuelle : le résultat valide est 0 FAIL / 4 WARN ; à relancer pour confirmer, serveur actif.

## Anomalies

- Deux processus `audit.mjs` et `shoot.mjs` ont écrit dans le même journal ; le journal `le-54-awwwards-revue2-audit.log` n'est pas fiable en l'état.
- Le shoot `le-54-awwwards-revue2-shoot.log` ne contient que les deux lignes « shooting » : pas de fin normale.
