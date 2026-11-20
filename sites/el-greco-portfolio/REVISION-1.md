# Révision 1 · El Greco portfolio (F1, F2 ; F3 non traités, hors périmètre)

| id | décision | changement (fichier) | preuve |
|---|---|---|---|
| F1-1 débordement /carte/ mobile | corrigé par précaution | `base.css` : `html { overflow-x: clip }` | Non reproduit sur le build courant : `scrollWidth === innerWidth` à 390, 360, 320 sur les 4 pages, et après navigation par clic accueil vers carte |
| F2-1 title/OG « Bistronomie » | corrigé | `Base.astro` | title et og:title : « El Greco \| Restaurant grec à Bouge (Namur) » ; 0 « Bistronomie » dans dist |
| F2-2 dock 320 px | corrigé | `base.css` : sous 22,5 rem, padding et corps réduits | capture 320 : 4 liens entiers, bord droit 270 sur 320 |
| F2-3 ouvert/fermé | corrigé | `motion/setup.ts` : `Intl.DateTimeFormat`, fuseau Europe/Brussels | navigateur en UTC, vendredi 23:24 à Bruxelles : « Fermé aujourd'hui, prochain service samedi à 12:00 » |
| F2-4 promesse de réponse | corrigé | `reservation.astro` : « Appelez-nous au …, ou écrivez-nous. » | grep |
| F2-5 texte dupliqué | corrigé | `index.astro` : 1 paragraphe + lien ; /histoire/ garde le texte complet | build |
| F2-6 horaires redondants | corrigé | `Footer.astro` : ligne compacte « jeudi à dimanche » | capture 320 du pied de page |
| F2-7 « Kalí órexi ! » rogné | corrigé | `base.css` : `.footer__finale` hauteur 0,7 em vers 0,9 em | capture 320 : mot et accent lisibles |

Décisions : tableau d'horaires conservé sur accueil et réservation ; bandeau conservé. DESIGN.md inchangé.
