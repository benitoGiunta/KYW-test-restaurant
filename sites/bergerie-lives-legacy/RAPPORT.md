# La Bergerie de Lives · variante legacy · 2026-11-27 (QA, phase 3)

Périmètre de cette passe : QA à partir de `QA-build.md` (captures de l'agent « captures »), corrections, rebuild. Le sweep sloplint complet, la finish review, le log Hallmark partagé et la checklist 72 cases n'ont pas été refaits ici (phase de test, consigne QA seule) : à faire si la variante doit être livrée.

## QA : constats et corrections

| Constat (QA-build) | Action | Vérification |
|---|---|---|
| Accueil : 404 console desktop (pas de favicon) | favicon SVG en data URI dans `Base.astro` | 0 erreur console/réseau, accueil et 404 à 375 px |
| Titre accueil 74 caractères | raccourci : « La Bergerie de Lives · Maison d’hôtes et mariages près de Namur » | lu dans `dist` |
| og:image et twitter:card absents | ajoutés (façade du domaine, `summary_large_image`) | grep dans `dist` |
| Cibles tactiles petites (lien nom du masthead 225x20) | `.masthead__name` en inline-flex, min-height 44 px | mesure 375 px : aucune cible < 24 px sur accueil et 404 |
| 404 : axe color-contrast du pied KYW (#6b787d sur #fbfaf8) | non reproductible dans le code : le pied KYW fixe #55646a sur #F3F2EF (conforme) ; probablement capture pendant une transition. Pied KYW non modifié (règle) | non revérifié par axe |
| Réservations sans capture | non capturée (hors cible du shoot) ; audit 0 FAIL, débordement OK en phase 2 | à capturer si besoin |
| Audit : polices .ttf/.otf, robots.txt, sitemap | non traités (polices Google Fonts, maquette noindex) | WARN restants |

Build : exit 0, 4 pages, `noindex` et `kyw-footer` présents sur les 4 pages.

## Placeholders et faits manquants

| Élément | Où | Valeur | À remplacer par |
|---|---|---|---|
| Slot `.fill` horaires d'accueil | une par page (cf. ETAT phase 2) | à renseigner | horaires réels de réception |
| Formulaire Réservations | `/reservations/` | non relié, message « Rien n’a été envoyé » | service de réservation réel |
| Favicon | `Base.astro` | lettre B provisoire | logo du domaine |

## Leçons structurelles
Voir `data/usage/test-3/lecons-proposees/bergerie-lives.md`.
