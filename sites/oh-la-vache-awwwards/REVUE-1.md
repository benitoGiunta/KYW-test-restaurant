# Revue awwwards · Oh la Vache ! · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une journée en quatre « heures » (11 h, 19 h, 21 h, 23 h 45) qui organise la carte et l'accueil, avec un grand titre noir sur crème, des photos découpées en polygones et un compte à rebours « minuit moins le quart ».

Hypothèses : captures de `.shots-oh-la-vache-awwwards-revue1/` (10:00 à 10:12) postérieures au `dist/` (10:03) et à `src/` : réutilisées. Histoire, réservation et 404.html réelle n'étaient pas couvertes : mesurées ici (`.shots-oh-la-vache-awwwards-revue1/rev1/`, journaux `.logs/relecteur-olv-mesure.log` et `relecteur-olv-cible.log`).

## Scores /10
- Design 7 : hero desktop net (`home/d-01-hero.png`), typographie forte, rythme crème/noir ; mais en-tête transparent qui entre en collision avec le contenu sur mobile (`home/m-02`, `rev1/reservation-390-40.png`) et page « La maison » pauvre.
- Usabilité 6 : appel et réservation clairs, menu mobile correct (dialog, focus rendu à « Menu » après Échap), mais texte illisible sous l'en-tête à 390 px et puces d'heures de la carte collées.
- Créativité 7 : concept des heures et transition en rideau (`d-90-transition-*`), bien tenu ; les horloges de l'en-tête (11:00, 13:00, 19:00, 22:30) sont décoratives et ambiguës.
- Contenu 6 : carte exacte (226 plats, 0 écart de nom, prix et description contre donnees.json) ; mais le concept « minuit moins le quart » contredit les horaires lundi à jeudi, et le vendredi non confirmé est affiché comme sûr dans le pied de page de toutes les pages.
- Technique 7 : build OK, 0 erreur console, 0 requête échouée, 0 débordement (scrollWidth = fenêtre, 5 pages x 390/1440), 0 lien mort (19 liens internes), CLS 0, LCP mobile 1,2 s, reduced-motion sans texte à opacité 0, JSON-LD Restaurant avec adresse et horaires ; mais axe `color-contrast` serious et poids d'images.

## Findings
**F1-1 · En-tête mobile transparent : le contenu passe sous le logo et les boutons** · `src/styles/site.css:34` (`.tete` fixe, `mix-blend-mode: difference`, pas de fond). Preuve : `rev1/reservation-390-40.png` (« Horaires du site du restaurant… » traverse « Oh la Vache ! / Appeler / Menu »), `home/m-02-scroll.png` (« Midi sur la terrasse » sous le logo), `home/m-03-scroll.png` (« Le soir La salle sous tente » sous l'en-tête), `rev1/histoire-390-40.png` (logo illisible sur la photo). Mesure : texte du `main` sous l'en-tête à 390 px aux défilements 2700 et 4050 (carte). Correction : fond opaque ou voile (crème/noir selon la section) pour `.tete` sous 48 rem, ou `padding-top` des blocs et suppression du blend sur mobile.

**F1-2 · Fait non confirmé affiché comme sûr : « jusqu'à 23 h 45 du vendredi au dimanche »** · pied de page de toutes les pages (`src/data/site.ts`, `reservation` ci-dessous) et JSON-LD (vendredi 23:45). Le dossier dit « vendredi inclus ou non : à confirmer » (Rankeat : vendredi et samedi jusqu'à minuit). Seule la page Réservation le signale (`rev1/reservation-1440-40.png`). Correction : « jusqu'à 23 h 45 le week-end (selon le site du restaurant) » dans le pied de page et le tableau d'horaires, vendredi marqué « à confirmer ».

**F2-1 · Axe `color-contrast` serious sur toutes les pages** : `.tete__nom`, `.tete__horloge`, `.nl` (5 nœuds à 1440 px) ; `.tete__nom` et `button[aria-controls=menu]` (2 nœuds à 390 px) ; `log relecteur-olv-mesure.log` lignes 3 à 50. Axe calcule du blanc sur #f7f6f2 (1,08) à cause du blend : faux positif sur fond uni, mais le contraste réel sur photo est insuffisant (voir F1-1) et la violation reste dans tout audit. Correction : couleur explicite (pas de blend) pilotée par la section sous l'en-tête.

**F2-2 · Concept « minuit moins le quart » démenti par les horaires** : titre du pied (« Minuit moins le quart, la table est encore là. »), `carte.astro:8` (« Quatre heures dans la journée, de 11 h à minuit moins le quart ») et section « 23 h 45 Le dernier verre ; or lundi à jeudi la fermeture est à 22 h 30 (`reservation`). Correction : « le week-end » dans la phrase d'intro de la carte et dans la ligne d'horaires du pied, ou « 22 h 30, minuit moins le quart le week-end ».

**F2-3 · Puces d'heures de la carte collées sur mobile** : « 11 hPour commencer », « 19 hAu grill », « 21 hVachement bon ! », « 23 h 45Le dernier verre » (`oh-la-vache-item/m-01-hero.png`, texte extrait du dist). Correction : espace ou `gap` entre l'heure et le libellé.

**F2-4 · Identifiant dupliqué sur la carte** : `r-onze-15-116` x2 (`carte.astro:23`, id construit sur longueur et charCode du titre) → axe `duplicate-id-aria` et `landmark-unique` (moderate). Correction : id basé sur l'index de la rubrique.

**F2-5 · Poids des images** : `06-dessert-fondant` 474 Ko, `15-entrecote-frites` 472 Ko, `04-terrasse-canapes` 352 Ko (webp de `dist/…/_astro/`) ; accueil ~1111 Ko d'images. Seuil de revue 300 Ko. Correction : qualité 70 à 75 et largeur maximale 1600 px.

**F2-6 · Page « La maison » mince et vide** : trois paragraphes courts, un vide d'environ 150 px sous le h1 (`rev1/histoire-1440-0.png`), lien « Le site actuel du restaurant » sans contexte (pointe vers ohlavache-erpent.be). Le texte d'histoire est absent (inconnu au dossier, bien marqué « Illustratif »), mais la page peut s'appuyer sur plus de matière du dossier (spécialités, treize gin'to, menu 3 services). Correction : étoffer par les faits du dossier, renommer le lien (« Voir le site actuel »).

**F3-1 · Horloges décoratives ambiguës** : `11:00 / 13:00 / 19:00 / 22:30` à côté de « Accueil / La carte / La maison / Réserver » (`rev1/menu-390.png`) et pastille d'en-tête qui passe de 11:00 à 16:00 au défilement (`rev1/histoire-1440-40.png`) : se lisent comme des horaires. Correction : retirer ou légender.

**F3-2 · Libellés d'heures de la carte** : « 19 h Au grill », « 21 h Vachement bon ! » suggèrent des heures de service, alors que `site.ts` les dit éditoriales. Ajouter « repères, pas des horaires de service » ou retirer les heures sur la carte.

**F3-3 · Détails de texte** : « Photos : Oh la Vache !. » (point après le point d'exclamation, pied de page) ; « appelez, on vous répond » (réservation, procédure non prouvée) ; « Chaussée de Marche 581, à Erpent, sur la route de Marche » (redondant).

**Vérifié, sans défaut** : faits (nom, adresse 581, téléphone 0494 29 44 72, Facebook/Instagram, 13 gin'to, 88 €, 43,50 €, 58 €, 45 €/pers.), mention KYW + logo + noindex sur 5 pages, `lang="fr"`, un h1 par page, title/description uniques, favicon, OG, alt des photos conformes aux `sujet`, 404 designée avec h1 et lien d'accueil, pas de formulaire factice, pas d'avis ni de récompense inventés, pas d'AI slop manifeste (pas d'eyebrow systématique, pas de trois cartes égales).

## Ce qui est bien (ne pas casser)
1. Hero desktop : titre géant, image découpée, appel direct (`home/d-01-hero.png`).
2. Carte fidèle et lisible, 226 plats classés par heures, prix et descriptions exacts.
3. Honnêteté des données : « Illustratif », « à confirmer », pas d'avis inventés ; menu mobile en dialog correct.
