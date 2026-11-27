# Comp avant build · Bienvenue chez vous (legacy)

Clé TOGETHER_API_KEY absente : deux comps HTML du premier écran, sans image générée.
- `.hallmark/comps/c1.html` : photo du dessert smiley plein cadre, plaque papier en bas à gauche (head, une phrase, actions).
- `.hallmark/comps/c2.html` : même photo, plaque centrée sur le visage du dessert.
- Axe varié : symétrie (c2) contre asymétrie à gauche (c1).
- **Choix : c1.** Le smiley est le centre de la photo : la plaque centrée le recouvre (c2) ; basse et à gauche, elle laisse le visage lire et reprend la place du bandeau d'origine. Capture (c2 seule conservée, `screen-home-desktop.png` écrasée par la seconde exécution) : la décision vient de la composition, pas de la lecture des deux PNG.

## Inventaire des médiums
| Région | Médium | Source |
| --- | --- | --- |
| Hero | raster | `photos/18-dessert-smiley-fraise.jpg` (client) |
| Bande Saint-Jacques, crustacé, bouchées, façade | raster | photos client |
| Plaque, formules, horaires, citations | code | texte client |
| Photo de la boutique | neither | aucune photo : slot nommé, à fournir |
