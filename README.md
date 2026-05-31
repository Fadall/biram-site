# Biram Pathe Fall — Espace de lecture

Ce projet est un site personnel minimaliste et élégant pour l'auteur Biram Pathe Fall. Il est conçu pour une lecture optimale sur mobile, avec une gestion centralisée des publications via Sanity CMS.

## Stack Technique

- **Framework**: React + Vite (mimant l'architecture demandée)
- **Styling**: Tailwind CSS
- **CMS**: Sanity (Studio intégré)
- **Routing**: React Router
- **Animations**: Framer Motion
- **Date Handling**: date-fns

## Structure du Projet

- `/src/components`: Composants UI (BilletView, AvantProposView, PenseeView, Calendar, etc.)
- `/src/lib`: Utilitaires, types, requêtes GROQ et client Sanity.
- `/src/hooks`: Logique de récupération des données.
- `/src/sanity`: Schémas pour Sanity Studio.

## Types de Publications

1. **Billet**: Publié Lundi, Mercredi, Vendredi. Inclut une photo de l'auteur et un texte long.
2. **Avant-propos**: Publié Dimanche, Mardi, Jeudi. Annonce la réflexion du lendemain. Design textuel épuré.
3. **Pensée du samedi**: Publié le Samedi. Photo d'ambiance et texte poétique/réflexif.

## Installation

1. Cloner le projet.
2. Installer les dépendances : `npm install`
3. Configurer Sanity :
   - Créer un projet sur [sanity.io/manage](https://sanity.io/manage)
   - Ajouter le `projectId` dans `.env.local` et `src/lib/sanity.client.ts`.
4. Lancer le studio : `npx sanity start` (dans un dossier Sanity séparé si nécessaire, ou configurer le studio intégré).
5. Lancer le site : `npm run dev`

## Administration

L'auteur peut accéder à l'interface d'administration via la route `/studio` (si configurée avec `next-sanity` ou en utilisant le studio Sanity standard).

## Design System

- **Typographies**: 
  - Titres : Playfair Display
  - Corps : Lora
  - UI : Inter
- **Couleurs**:
  - Fond : #FAFAF7
  - Billet : #2C4A7C
  - Avant-propos : #B8860B
  - Pensée : #6B4C8C
