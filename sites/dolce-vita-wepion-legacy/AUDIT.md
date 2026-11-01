# Audit Hallmark · La Dolce Vita (Wépion) · 2026-11-01

Source : captures et HTML sauvegardés de dolcevitawepion.be (accueil, /carte/, /la-dolce-vita/, /infos/), `data/restaurants/dolce-vita-wepion/site-actuel/`. CSS externe absent (Tailwind compilé non sauvegardé) : tells lus sur le HTML et les captures. Genre inféré : atmospheric (soir, lampes, vin, pierre et bois), thème Spore.

## Lecture en quatre lignes
1. Pour : réserver une table par téléphone (seule voie), voir la carte. Action unique : appeler le 081 85 54 20.
2. Reste : la façade du soir, la salle olive et bois, le ton « maison familiale », la carte complète avec prix, la terracotta du bouton.
3. Se lit généré : `em` italique dans h1/h2 (38i), `transition-all` (10a), glass `backdrop-blur` sur l'en-tête (29), étiquettes en capitales espacées (67), ombres en littéraux rgba (48), titre h1 de 8 mots (58).
4. Cassé : vidéo `autoplay` sans `muted` (28a), pas de `overflow-x: clip` (34), pas de repli reduced motion (27), deux liens « Voir toute la carte » consécutifs, bandeau cookies par-dessus le hero.

## Structure d'origine
Pages : accueil, /carte/, /la-dolce-vita/, /infos/ (+ mentions, confidentialité, cookies, /admin/ non reproduites). Nav : La carte, Le restaurant, Infos, Réserver. Hero : vidéo plein écran (poster = façade du soir), titre serif avec italique. Sections : L'art de vivre, La table (5 catégories), Le geste, ardoise, avis, infos, à emporter. Animations : WebGL (ogl), reveals. Images : 14 photos du client. Mobile 375 : colonne unique, bandeau cookies. Copie : française, chaleureuse, soignée.

## Findings par tier (before.txt : 48 FAIL, 3 REFLEX, 20 WARN)
- Floor : 10a, 27, 28a, 34, 38i, 48, 67.
- Reflex : 26b (pas de :disabled, hors formulaire).
- Finish : F1 apostrophes droites (x17), 49 libellés longs, 58 h1 et paragraphe trop longs.
- Jugées (§ 5) : 8 gabarit hero/sections/CTA (waive), 29 glass, 63 séparateurs « · » dans les méta, 54 étiquettes, 69 horaires répétés (accueil, infos, pied), 77 à 79 trop de mots par écran.

## Axes d'amélioration
Peu coûteux : overflow, reduced motion, apostrophes, liens doublons. Moyen : étiquettes sans capitales, horaires dits une fois. Seul le full règle : système (thème, type), compositions, pied et chrome.
