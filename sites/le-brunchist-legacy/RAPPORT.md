# Le Brunchist · variante legacy · 2026-11-20 (phase 3, QA)

## QA
- Partie de QA-build.md : 0 FAIL, 8 WARN, axe 0 violation sur l'accueil, aucun débordement, aucune erreur console.
- Corrigé : retour au survol sur la marque « Le Brunchist » ; cibles tactiles nav et pied du site à 44 px (pointeur grossier). Vérifié à 375 px : pas de débordement, pas d'erreur de page.
- Non corrigé, justifié : polices TTF (Google Fonts distant, format imposé par le service) ; robots.txt et sitemap (maquette noindex) ; « 9 h 30 à 15 h 30 » répété (ligne du jour + tableau, voulu) ; contraste de la 404 et lien « Réalisé par » (paquet `kyw-footer`, hors périmètre) ; survol « Appeler le café » (bouton plein, retour par fond déjà présent).
- Non faits (limite de passe) : sweep sloplint, finish review sous-agent et jury (pas de sous-agent possible), checklist DESIGN.md complète. Le crawl n'a couvert que l'accueil (one-page).
- Build final : `scripts/q.sh build pnpm build:site sites/le-brunchist-legacy` passe ; index et 404 : noindex et `kyw-signature`.

## Placeholders et faits manquants
| Élément | Où | Valeur | À remplacer par |
|---|---|---|---|
| Photos du café, de la carte, du lieu | hero, carte, lieu | photos Wikimedia Commons provisoires | photos du restaurant |
| Prix de la carte | Carte | « à renseigner par le café » | prix réels |
| Horaires, ouverture | Horaires, Lieu | relevés Namur CentreVille / ELLE.be | confirmation du café |
| Réservation | Horaires | aucun outil connu | lien ou téléphone confirmé |
| Avis presse | On en parle | extraits ELLE.be, Namur.top, Restaurant Guru | à vérifier |

Matériel : la photo qui manque le plus est celle du plat signature (eggs benedict) pour le hero.
