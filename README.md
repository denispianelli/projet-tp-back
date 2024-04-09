# O'Survivors API

Cette API fournit des fonctionnalités pour la gestion des utilisateurs, des comptes, des personnages, des étapes, des armes, des ennemis et des contacts pour le jeu O'Survivors.

## Introduction

L'API O'Survivors est destinée à être utilisée par les développeurs de jeux pour accéder aux fonctionnalités de gestion des utilisateurs, de gestion des données de jeu et de prise de contact avec les joueurs. Elle offre un ensemble d'endpoints RESTful pour effectuer des opérations CRUD sur différentes entités de jeu.

## Fonctionnalités

- Gestion des utilisateurs : Authentification, inscription, mise à jour et suppression des comptes utilisateur.
- Gestion des personnages : Création, lecture, mise à jour et suppression des personnages de jeu.
- Gestion des étapes : Création, lecture, mise à jour et suppression des étapes de jeu.
- Gestion des armes : Création, lecture, mise à jour et suppression des armes de jeu.
- Gestion des ennemis : Création, lecture, mise à jour et suppression des ennemis de jeu.
- Gestion des contacts : Envoi de messages de contact aux administrateurs du jeu.

## Utilisation

### Installation

Pour utiliser cette API, vous devez d'abord l'installer. Voici comment vous pouvez le faire :

### Configuration

Avant de lancer l'API, vous devrez configurer certains paramètres, tels que les variables d'environnement pour l'URL d'origine autorisée pour les requêtes CORS, le port sur lequel l'API écoutera, etc. Créez un fichier `.env` à la racine du projet et définissez ces variables d'environnement.

### Démarrage de l'API

Pour démarrer l'API, exécutez la commande suivante dans le terminal :

`npm start`

L'API démarrera et écoutera les requêtes sur le port spécifié dans les variables d'environnement.

## Documentation

Pour plus d'informations sur les endpoints disponibles, les paramètres acceptés
et les réponses renvoyées par l'API, veuillez consulter la [documentation
complète](http://localhost:3001/v1/api-doc).

## Contribution

Si vous souhaitez contribuer à l'amélioration de cette API, veuillez suivre ces étapes :

1. Forkez le projet.
2. Créez une nouvelle branche (`git checkout -b amelioration-xyz`).
3. Faites vos modifications et committez-les (`git commit -am 'Ajout de nouvelles fonctionnalités'`).
4. Pushez vos modifications vers la branche (`git push origin amelioration-xyz`).
5. Créez une Pull Request.

## Support

Pour obtenir de l'aide ou signaler des problèmes, veuillez ouvrir un ticket dans la section des problèmes de ce dépôt.

## Licence

Ce projet est sous licence [MIT](LICENSE).
