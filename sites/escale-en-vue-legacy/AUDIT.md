# Audit Hallmark · Escale en Vue ! · 2026-11-20

Source : https://www.escale-en-vue.be (WordPress + Divi, one-page, mention « Site en cours de construction »), sauvegarde dans `.hallmark/site-actuel/page.html`, captures `data/restaurants/escale-en-vue/site-actuel/`. Rendu sloplint `--before` : 229 FAIL, 86 REFLEX, 21 WARN (`.hallmark/before.txt`), dont 168 FAIL 48 et 75 REFLEX 24b issus du CSS Divi/WordPress, 31 FAIL 7a (#fff/#000 purs), 17 FAIL 10a. CSS externe partiellement absent (WARN « fallback »), tells lus sur les captures.

Genre inféré : editorial côté Hallmark (playful retenu par le thème dealt), job : book (réserver, par téléphone seulement).

## Lecture en quatre lignes
- Pour quoi : venir en terrasse du jeudi soir au dimanche, action unique : appeler le 0493 46 79 71 (aucun outil de réservation).
- Ce qui reste : le nom, la baseline, les horaires 2026 (affiche), la vue sur la vallée, la bière locale et les trappistes, l'alternative végé, l'adresse de Dave, Facebook et Instagram.
- Ce qui se lit généré : thème Divi par défaut (gate 48, 7a), héro à photo verte sous un voile gris avec titre serif capitales centré, horaires en image JPG (illisible, non indexable), flux Facebook de cinq posts en bas de page, carte Google embarquée.
- Ce qui est cassé : navigation « Accueil, Accueil, Sample Page » ; horaires en image ; pas de carte ; bandeau « en construction » ; pas de logo dans l'en-tête ; pas de bouton de réservation.

## Structure d'origine
Une page : bandeau bleu (téléphone, e-mail, réseaux), héro, bandeau saison (« 19 juin au 6 septembre », « jeudi soir au dimanche après-midi »), texte de présentation, affiche d'horaires + photo, carte Google + carrousel de photos, adresse et contact, cinq posts Facebook. Animations : carrousel automatique. Mobile 375 : mise en colonne Divi correcte, texte petit. Copie : française, familière (« imparfaite », « Et une vue ! »).

## Findings par tier
- Floor : 48 (couleurs en dur, masse), 10a (animations de propriétés de mise en page), 2a (dégradés violet-bleu dans `:root` WordPress), 7a (noir et blanc purs).
- Reflex : 24b (espacements hors échelle), 7b.
- Finish : 41, 58 (texte dense sous le héro), 10b.
- Jugées (§ 5) : 63 et 54 (étiquettes en capitales « SITE EN COURS DE CONSTRUCTION », « TABLES EN EXTÉRIEUR UNIQUEMENT »), 8 (gabarit héro, texte, carte), 83 (photos clients de qualité inégale, une possiblement générée), 69 (horaires dits trois fois), 85 (flux social en pied).

## Axes d'amélioration
Par coût croissant : horaires en texte (faible) ; un seul bouton de réservation par téléphone (faible) ; titre de héro lisible et photo du lieu (moyen) ; système typographique et couleur de marque (moyen) ; carte et prix, histoire, avis, équipe (hors de portée, données absentes du dossier). Seul full règle : la composition d'ensemble et la couleur.
