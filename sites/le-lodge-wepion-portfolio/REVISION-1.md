# Révision 1 · Le Lodge Wépion · portfolio

| id | décision | changement | preuve |
|---|---|---|---|
| F1-1 | corrige | `base.css` : décalage 6 % du slogan limité à min-width 1100 px | `Range.right` ≤ fenêtre à 320, 390, 768, 820, 1024, 1060, 1100, 1440 (1024 : 984) ; pas de débordement (scrollWidth = largeur) |
| F2-1 | corrige | `site.ts` : citation intégrale du dossier | grep « retournerais » dans dist : 1 |
| F2-2 | corrige | `site.ts` : 3 titres de presse complets, identiques à `donnees.json` | lecture du fichier |
| F2-3 | corrige | « à confirmer » remplacé par « non communiqué » ou retiré (site.ts, Marquee, tearoom, terrasse, carte, index) ; ligne privatisation + numéro supprimée | grep « à confirmer » dans dist : 0 fichier |
| F2-4 | corrige | ligne fermeture retirée du hero (reste « Accueil au … ») ; pied : plus de « fermé » | « Fermé » sur l'accueil : 7 → 4 (bandeau défilant ×2 dont une copie masquée, bandeau jaune, bloc lieux) |
| F2-5 | corrige | `reservation.astro` : formulaire et script supprimés, boutons « Réserver sur Barestho » + téléphone | grep `data-reservation` dist : 0 |
| F2-6 | corrige | (a) slogan `#a8321f` sous 480 px ; (b) 4 eyebrows retirés de l'accueil ; (c) source des avis dite une fois sous les cartes | build ; axe non relancé (hors périmètre ciblé), contraste #a8321f sur #efe8da calculé ≈ 5,6:1 |

Hypothèses : « Fermé » du bandeau défilant conservé (état, pas phrase répétée). F3 non traités (hors liste).
