# Rendu chat interview Join

## Installation

Afin de pouvoir faire tourner le projet, il faut installer les dépendances :

```
npm install
```

Puis, pour lancer le projet :

```
npm run dev
```

## Informations

Pour rappel, le but est de créer un chat dans le style de celui de Twitch.
Les principaux objectifs étant de :

- Structurer le code au maximum
- Ajouter au chat déjà réalisé en PP, une notion de pause du défilement lorsque l'on scrolle à travers les messages
- Ajouter dans la limite du temps imparti, toute fonctionnalité qui soit jugée utile.

J'ai donc décidé d'user de deux heures et demie de temps afin de réaliser différentes tâches listées ci-dessous :

1. Refactorisation du code déjà commencé et passage de JavaScript vers TypeScript. Temps estimé : 30 minutes.

2. Refactorisation de la logique des WebSockets afin de pouvoir les utiliser dans un contexte React, permettant à plusieurs composants d'utiliser une seule et même connexion, sans avoir à dupliquer le code. Partie assez compliquée, temps estimé : 40 minutes.

3. Ajouter un système UI afin d'avoir des composants de style assez basiques mais confortables à utiliser : ShadCN et Tailwind. Sans difficulté, temps estimé : 10 minutes.

4. Ajouter la notion de pause du défilement lorsque l'on scrolle à travers les messages, et faire en sorte que les effets de bords gênants soient gérés : désactiver l'affichage du bouton lorsque le scroll vers le bas est en cours, désactiver l'affichage du bouton lorsque de nouveaux messages arrivent. Mise en place relativement simple, traitement des retours plus compliqué, temps estimé : 20 minutes de mise en place, 40 minutes de traitement des retours.

5. Ajouter la possibilité de modifier le pseudo et la couleur du pseudo et faire en sorte que les différents composants soient mis à jour en temps réel. Point bloquant : trouver un color picker compatible avec ShadCN, obligé d'utiliser [un module créé par la communauté](https://shadcn-color-picker.vercel.app/) temps estimé : 20 minutes.
