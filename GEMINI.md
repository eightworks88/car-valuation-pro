# CONTEXTE DU PROJET : Car Valuation Pro (Cote Auto Pro)

## 🎯 Définition et Objectif

Application web B2B pour les professionnels de l'automobile (marchands, négociants) permettant d'estimer la valeur de reprise d'un véhicule d'occasion. L'outil scrape en temps réel Leboncoin et La Centrale via Bright Data pour calculer une cote de marché précise.

## 🛠️ Stack Technique Principale

- **Front-end :** React, TypeScript, Vite, Tailwind CSS.
- **UI & Design :** Shadcn UI, Radix UI, Lucide Icons. Thème Dark mode (façon dashboard financier, style Bloomberg/Stripe).
- **State Management :** Zustand (pour gérer l'état global simplement sans prop-drilling).
- **Validation :** Zod (validation stricte des inputs front et des payloads back).
- **Back-end / API :** Serverless Functions (Node.js via Vercel) dans le dossier `/api`.
- **Scraping :** API Bright Data (Web Unlocker) + Cheerio.
- **Base de données :** Supabase (PostgreSQL).

## 🧠 Logique Métier & Algorithme (Règles strictes)

1. **Calcul de la cote (Nettoyage des données) :** Le script d'analyse doit OBLIGATOIREMENT exclure les annonces aberrantes ou suspectes (ex: exclure les 10% les moins chers et les outliers statistiques) avant de faire la moyenne.
2. **Segmentation :** L'algorithme doit séparer et calculer deux cotes distinctes : la moyenne des professionnels ET la moyenne des particuliers.
3. **Mapping (Base de données) :** Les correspondances pour construire les URLs (ex: ID des marques Leboncoin, formats La Centrale) doivent être stockées dans une table Supabase dédiée, et non hardcodées dans le code.

## 🗄️ Base de données (Supabase) & Auth

- **Authentification :** AUCUN système de login pour le moment. L'app est ouverte en accès libre.
- **Historique :** Chaque recherche réussie doit être enregistrée dans une table `search_history` sur Supabase pour permettre le suivi des prix dans le temps.

## ⚠️ Règles d'Architecture et de Développement (À SUIVRE IMPÉRATIVEMENT)

1. **Sécurité API :** Ne JAMAIS placer de clés secrètes (Bright Data, Supabase Service Role) dans le Front-end (`/src`). Toutes les requêtes vers Bright Data se font depuis `/api`.
2. **Scraping :** NE PAS utiliser de Headless Browser (Puppeteer, Playwright, Scraping Browser). Utiliser EXCLUSIVEMENT des requêtes HTTP POST (fetch) vers `api.brightdata.com/request` puis parser avec `cheerio`.
3. **Gestion des erreurs :** Toute erreur réseau, timeout Bright Data, ou validation Zod échouée doit déclencher l'affichage d'un Toast rouge via le composant `use-toast` de Shadcn UI. Pas de crash silencieux.
4. **Validation :** Avant chaque appel à l'API serverless, les filtres de recherche doivent être validés par un schéma Zod.
5. **Langue :** L'interface utilisateur, les variables métier et les commentaires principaux doivent privilégier le Français, mais la syntaxe de code standard React/TS reste en Anglais.

## 🔄 Flux d'exécution attendu

1. Saisie utilisateur -> Validation Zod -> Update Zustand store.
2. Call API vers le Serverless `/api/scraper`.
3. Le backend fetch le Mapping dans Supabase pour construire l'URL cible.
4. Le backend interroge Bright Data -> parse le HTML avec Cheerio -> filtre les outliers -> sépare Pro/Particulier.
5. Le backend sauvegarde le résultat dans la table `search_history` de Supabase.
6. Retour JSON au Front-end -> Affichage des résultats dans `ResultsPanel`.
