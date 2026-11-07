# L’Essentiel · variante legacy · 2026-11-07

## QA (phase 3)
`QA-build.md` (agent « captures ») était absent : sweep sloplint `--render` relancé sur les 6 routes (serveur de dev), captures ciblées (contact, recrutement, accueil à 1024, carte à 320).

| Avant | Correction | Après |
|---|---|---|
| FAIL 49a nav « Le restaurant », « Les chambres », « Carte et menus » à 2-3 lignes à 1024 | `white-space: nowrap` sur les liens, écarts réduits et sous-titre de marque masqué sous 75rem | corrigé (capture 1024 : une ligne) |
| FAIL 49a onglets « La carte » / « Les menus » à 2 lignes à 320 | `nowrap` sur `.seg button` | corrigé |
| FAIL 44d et REFLEX 44c : contact et réservation (hero = page entière avec formulaire) | titre séparé du formulaire en deux sections (`pagehead` puis `sec--tight`), rythme recalé (gap 120 à 160 px) | corrigé ; 44c « hero court » levé par waiver en tête de `page.css` |
| REFLEX 44c visuel à 144 px du texte (chambres) | colonnes texte 1-6, photo 8-12 (`split--chambres`) | corrigé |
| REFLEX 72 bouton Postuler/Écrire à 6 px du bord (recrutement) | cellule en flex centrée, bouton en `--text-md` | corrigé |
| REFLEX 78 titre « Horaires » (contact) | classe `h-section` au niveau `--text-section` | corrigé |

Résultat final : sloplint `--render` 0 FAIL, 0 REFLEX, 5 waived, 3 WARN (77 « 4 sections » sur contact, réservation, recrutement : pages courtes par nature, WARN dismissed). Pas de débordement horizontal (scrollWidth = largeur à 1440, 1024, 320 sur les pages testées). Build passe ; noindex, mention KYW et `kyw-signature` présents sur les 7 pages de `dist/l-essentiel/legacy/` ; `pnpm index` passé.

## Placeholders et faits manquants
| Élément | Où | Valeur | À remplacer par |
|---|---|---|---|
| Formulaires réservation et contact | `reservation`, `contact` | `data-endpoint=""`, rien n’est envoyé (message affiché) | endpoint réel ou widget Zenchef |
| Éléments `placeholder: true` | `src/data/site.ts` | illustratifs, signalés | faits confirmés par le restaurant |
| Avis, notes, abonnés | aucun | non repris | à fournir si souhaité |
| Fermetures annuelles 2027 | pied de page | du dossier, à confirmer | calendrier à jour |

## Non vérifié
Contraste exact de `--color-error` sur papier-2 (annoncé ≥ 4,5:1, non mesuré) ; revue finish (sous-agent) non faite (pas d’outil Agent) ; gates jugées 6b, 9, 11, etc. non rejouées ; jury non lancé.

## Demande de matériel
Photo manquante la plus utile : la salle vide à la lumière du jour, en 1920 px, pour le hero (les sources actuelles sont réduites).

## Leçons
Voir `agents/lecons/construction.md` (2026-11-07).
