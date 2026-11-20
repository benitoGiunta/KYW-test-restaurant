# RAPPORT : El Greco, variante awwwards (phase 1)

## Données réelles utilisées
Nom, adresse (rue de Sardanson 22, 5004 Bouge), téléphone 081 20 07 47, e-mail contact@elgrecorestaurant.com, carte complète (12 rubriques, prix de donnees.json), horaires jeudi à dimanche (Trouve Ton Resto, à confirmer), réseaux, « Depuis 1986 » (site actuel), Tripadvisor 4,0 pour 121 avis, budget moyen ~30 € (ancien), paiements (Trouve Ton Resto).

## Données douteuses (non corrigées)
- Horaires : site actuel « 18:00-23:00 » sans jours ; Trouve Ton Resto (jeudi à dimanche) marqué « à confirmer ». Lundi à mercredi : inconnus, affichés « À confirmer par téléphone ».
- « Depuis 1986 » : annoncé par le site, non recoupé ; un avis Tripadvisor évoque un changement de propriétaire (non repris).
- Page contact du site actuel comme cible de réservation : non vérifiée.
- Budget ~30 € : source ancienne.
- Description du tzatziki (« yaourt grec, concombre frais, ail et aneth ») : issue de la carte du site actuel (donnees.json).

## Éléments fictifs ou illustratifs
- Aucun plat, prénom, avis, distinction ni équipe inventés ; aucune section équipe.
- Photos : trois photos de stock Pexels de Grèce, `placeholder: true` dans `site.ts` (`photosInfo`), légendées « pas le restaurant » ; crédits au pied (Cécile Hournau, Marios Potsis, Pixabay, déduits des URL sources).
- Texte du nom (peintre Domínikos Theotokópoulos, né en Crète) : fait d'histoire de l'art, présenté comme emprunt de ce site, sans prétendre que le restaurant en vient.
- Terrasse : citée par un avis, affichée « à confirmer par téléphone ».

## Reste pour les phases 2 et 3
Animations (allongement, rideau, idle du hero, hovers JS), QA navigateur, OG à recomposer, contrastes mesurés, audit axe, Lighthouse.
