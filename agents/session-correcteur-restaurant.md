# Message initial d'une session « correcteur » pour un restaurant

(Créer la session avec `model: claude-haiku-5-5` : l'orchestration est mécanique, recommandation du rapport de coût du reviewer.
Les 3 agents de correction tournent sur Sonnet. Remplacer `<slug>` et `<rang>`.)

Voir le message effectivement envoyé dans le journal de la session mère ; il suit les étapes : préparation, 3 agents
`correcteur-site` en parallèle (ligne « Rôle : correcteur-site · Restaurant : <slug> · Variante : <v> · Passe : 1 » en tête),
contrôle du scan brouillon à 0, index, commit, push, vérification en ligne, mesure `correction-detail-<slug>.json` et
`correction-commandes-<slug>.json`, message à l'agent vérificateur consommation token et à la session mère.
