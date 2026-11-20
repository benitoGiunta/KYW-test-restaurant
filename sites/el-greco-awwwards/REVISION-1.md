# REVISION-1 (el-greco, awwwards)

| id | décision | changement | preuve |
|---|---|---|---|
| F1-1 | corrigé | `reservation.astro` : phrase « Pour réserver, appelez le 081 20 07 47 », bouton e-mail « Réservation » supprimé, e-mail gardé en « Contact », lien « Page contact du restaurant (à confirmer) » | grep dist : plus d'objet « Réservation » hors menu |
| F1-2 | corrigé | `index.astro` : `tabindex="0"` sur `.cremes__piste` (aria-label déjà présent) | axe 390 px : 0 violation ; 1440 px : 0 |
| F2-1 | corrigé | `histoire.astro` : aveu de recherche et commentaire de designer supprimés, appel neutre | grep dist : « ne rien inventer » absent |
| F2-2 | corrigé | biographie du peintre retirée ; le nom n'est plus lié au peintre (meta description ajustée) | grep dist : « Crète » absent |
| F2-3 | corrigé | `site.css` : `.sec` padding plafonné à 7 rem | padding mesuré 112 px à 390 et 1440 px |
| F2-4 | refusé | images déjà légendées « pas le restaurant » ; aucune photo client disponible ; « photos à fournir » noté dans RAPPORT.md | |
| F2-5 | corrigé | `.creme` : `justify-content: flex-start`, gap 0,75 rem (hauteurs échelonnées gardées) | écart nom/description mesuré 12 px sur les 3 cartes, 390 et 1440 px |

Pas de capture visuelle ciblée (mesures seulement). F3 non traités.
