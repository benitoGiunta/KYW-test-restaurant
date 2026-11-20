# Étape 1 — Ajouter un restaurant

Un restaurant n'existe pour les agents que s'il a une entrée dans `data/restaurants.json`. La recherche client
(première étape du développement) part de cette entrée.

## Choisir le restaurant

- Restaurants déjà vérifiés et non produits : entrées `"selection": "reserve"` de `data/restaurants.json`, puis les
  candidats actifs de `data/candidats.json` et `data/selection/lot*-resultat.json`.
- Critères : activité vérifiée (preuve récente), site actuel existant (la variante legacy s'en inspire), commune de Namur.

## Entrée à écrire

Ajouter (ou modifier, pour une réserve) un objet dans le tableau `data/restaurants.json` :

```json
{
  "rang": 21,
  "slug": "nom-court",
  "nom": "Nom affiché",
  "nom_enseigne_source": "Nom tel que sur la source",
  "numero_bce": "0123456789",
  "denomination_bce": "DENOMINATION",
  "site_actuel": "https://…",
  "adresse": "Rue …, 5000 Namur",
  "commune": "Namur",
  "telephone": "+3281…",
  "email": null,
  "type_cuisine": "…",
  "reseaux": null,
  "qualite_site_actuel": 3,
  "note_site": "observations sur le site actuel",
  "statut_activite": "actif",
  "preuve": "source et date qui prouvent l'activité",
  "selection": "test",
  "campagne": "test-1"
}
```

- `slug` : minuscules, chiffres et tirets ; il nomme `sites/<slug>-<variante>/`, `data/restaurants/<slug>/` et l'URL.
- `rang` : numéro suivant le plus grand existant (sert à l'ordre d'affichage et au suivi).
- `selection` : `test` pour la phase de test des agents (les entrées `reserve` ne sont ni produites ni affichées).
- `campagne` : valeur de `<campagne>` (`parametres.md`), pour regrouper les mesures.
- Un champ inconnu reste `null` : la recherche client le complétera si elle trouve une source.

## Valider

```bash
python3 -c "import json;json.load(open('data/restaurants.json'));print('ok')"
```

Commit « Ajoute <nom> à la campagne <campagne> », push sur la branche de travail.
