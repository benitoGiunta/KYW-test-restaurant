# Carré d'herbes · variante legacy · 20/11/2026

## 1. Approche conservée vs site d'origine
| Élément | Origine | Legacy |
|---|---|---|
| Type | site vitrine 9 pages (Wépion) | même plan, 9 pages, mêmes contenus |
| Hero | photo plein cadre, titre « Cuisine sincère et raffinée » | idem (assiette en tuile dentelle), un primaire rempli |
| Nav | barre de liens | barre en bord, menu popover sous 67,5 rem |
| Menus | onglets Lunch / 3 / 4 / 5 assiettes | onglets conservés, lignes avec prix |
| Animations | aucune notable | ouverture CSS + un reveal, mouvement réduit respecté |
Dérogation : gate 8 (séquence du client conservée), notée dans `page.css`.

## 2. Axes (AUDIT.md)
Traités : boutons à huit états, nav mobile, formulaire validé, contraste, cibles tactiles (téléphone du bandeau passé à 44 px), anneau de focus du lien d'évitement (1,37:1 -> --color-focus). Non traités : lien du pied KYW 24 px et contraste de sa note (#6b787d, 4,36:1) : paquet partagé `kyw-footer`, non modifiable.

## 3. Résultat sloplint
- Before 804 FAIL / 216 REFLEX ; After : 1 FAIL (34, faux positif : `overflow-x: clip` est dans `base.css`, mesuré sans débordement), REFLEX 77 waived (en-tête de page), 2 WARN `kept` (pages du site actuel non rendues : actualites, bon-cadeau, contact, fetes2026… hors des 4 URLs passées).
- Render : 20 captures `.hallmark/shots` (1280, 1440, 1920, 375). Build : 9 pages, noindex et kyw-footer présents partout.

## 4. Reviews
Hero : auto-revue `self` (pas d'outil Agent). Finish review par sous-agent non faite (idem) : à faire par une session avec Agent. Lu sur planches : en-tête de page sur deux colonnes, 404 OK.
Ce que l'ancien site faisait mieux : rien de relevé.

## 5. Placeholders et faits manquants
| Élément | Où | Valeur | À remplacer par |
|---|---|---|---|
| GPS / carte | contact, JSON-LD | absent (non inventé) | coordonnées réelles |
| og.jpg | meta | non produit | visuel 1200x630 |
| Formulaire | /reservations/ | n'envoie rien (message explicite) | endpoint ou téléphone |
| Données | pied | « Maquette KYW, certaines données sont illustratives » | confirmation client |

## 6. Demande de matériel
Photo qui manque le plus : la salle et la terrasse en lumière de service (les 13 photos sont des assiettes et extérieurs). Slots : hero 1920x1080, 4:3 pour Le restaurant, 1200x630 pour og.

## 7. Leçons
Le `grid` d'en-tête de page doit être neutralisé pour `.stack` (404) ; skip link : anneau `--color-focus`, pas l'or. Une ligne proposée dans `data/usage/test-2/lecons-proposees/`.
