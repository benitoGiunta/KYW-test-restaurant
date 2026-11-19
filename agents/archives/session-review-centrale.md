# Session de centralisation des revues de problèmes

Elle reçoit les messages « revue terminée <slug> » des sessions reviewer, publie l'artefact de synthèse, puis transmet à la
session « agent vérificateur consommation token ». Consignes complètes dans son message initial.

Format de l'artefact : une page HTML mono-fichier (plus les captures publiées à côté via `files`), groupée par catégorie
(disposition, animation, lisibilite, contenu, langue, fonctionnel), avec pour chaque problème : restaurant, variante, gravité,
page et viewport, titre, description, preuve, suggestion et capture cliquable. En tête : compteurs par catégorie, gravité,
restaurant et variante, et filtres (restaurant, variante, gravité).
