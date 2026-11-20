# Révision 1 · Wok de Jin · portfolio
Hypothèses : F0 vide ; F3 non traités (hors liste) sauf F3-5 (lien Itinéraire) fait au passage ; build final via q.sh exit 0, 7 pages.

| id | décision | changé | preuve |
|---|---|---|---|
| F1-1 | corrige | `index.astro` : bouton `btn btn--lin` | contraste mesuré 10,99:1 (1440 px) |
| F1-2 | corrige | `reservation.astro` : bouton « Vérifier ma demande », chapeau « demande non transmise », validation mardi fermé et heures de service, message « Rien n'a été envoyé » + lien et téléphone, plus d'ouverture d'onglet | Playwright : mardi => fermé ; 03:00 => hors service ; mercredi 19:00 => « Rien n'a été envoyé » |
| F2-1 | corrige | `setup.ts` : « service jusqu'à », heure de Bruxelles via Intl | horloge simulée : lun 13:30 « Ouvert, service jusqu'à 14:00 » ; mar 13:00 « prochain service mercredi à 12:00 » |
| F2-2 | corrige | `emporter.astro`, `site.ts` : téléphone, plus de « Commander/commande/consultable », lien « Site du restaurant » | scan page : 0 occurrence ; grep dist 0 |
| F2-3 | corrige (a, b, c) | `Footer.astro` footer -> section aria-label ; `Marquee.astro` role=region | 1 seul `<footer>` sur l'accueil ; axe non relancé (hors périmètre ciblé) |
| F2-4 | corrige en partie | 10 italiques retirés (table et réveillon gardés), 3 eyebrows retirés ; cartes « Pour tous » inchangées | grep `<em>` des h2 |
| F2-5 | corrige en partie | photo de sashimi dans le héros (`.hero__photo`), lanterne x 6 -> 1 % | photo à y=742 (début visible à 1440x900), pas de débordement (scrollWidth 1440) ; mobile non capturé |
| F3-5 | corrige | Itinéraire -> lien Google Maps du dossier | grep |

Comptes : corrigés 7 (dont 2 partiels), refusés 0, impossibles 0. Publiable : oui.
