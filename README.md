# 🛒 E-Commerce Full Stack Application

Une application e-commerce complète construite avec Next.js, NestJS, Prisma et PostgreSQL.

## 🚀 Technologies Utilisées

### Frontend
- **Next.js 15** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS
- **Zustand** - Gestion d'état
- **React Hooks** - Gestion des composants

### Backend
- **NestJS** - Framework Node.js
- **Prisma** - ORM pour base de données
- **PostgreSQL** - Base de données
- **JWT** - Authentification
- **bcrypt** - Hachage des mots de passe

## 📁 Structure du Projet

```
E-commerce/
├── frontend/          # Application Next.js
│   ├── src/
│   │   ├── app/       # Pages (App Router)
│   │   ├── components/ # Composants réutilisables
│   │   └── store/     # Stores Zustand
├── backend/           # API NestJS
│   ├── src/
│   │   ├── auth/      # Module d'authentification
│   │   ├── products/  # Module produits
│   │   └── orders/    # Module commandes
│   └── prisma/        # Schéma et migrations
└── README.md
```

## 🔧 Installation

### Prérequis
- Node.js 18+
- PostgreSQL
- npm ou yarn

### 1. Cloner le repository
```bash
git clone <votre-repo-url>
cd E-commerce
```

### 2. Configuration Backend
```bash
cd backend
npm install
```

Créer un fichier `.env` :
```env
DATABASE_URL="postgresql://username:password@localhost:5432/ecommerce"
JWT_SECRET="votre-secret-jwt"
PORT=3004
```

### 3. Configuration Base de Données
```bash
npx prisma migrate dev
npx prisma generate
```

### 4. Configuration Frontend
```bash
cd ../frontend
npm install
```

## 🚀 Démarrage

### Backend (Port 3004)
```bash
cd backend
npm run start:dev
```

### Frontend (Port 3001)
```bash
cd frontend
npm run dev
```

## 📱 Fonctionnalités

### 🔐 Authentification
- Inscription/Connexion utilisateur
- JWT tokens
- Rôles utilisateur (USER/ADMIN)
- Protection des routes

### 🛍️ E-Commerce
- Catalogue de produits
- Panier d'achat persistant
- Gestion des quantités
- Calcul automatique des totaux

### 👨‍💼 Administration
- Dashboard admin
- CRUD produits
- Gestion des commandes
- Interface intuitive

### 🎨 Interface Utilisateur
- Design responsive
- Animations Tailwind
- Navigation fluide
- États de chargement

## 🌐 URLs

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:3004
- **Documentation API**: http://localhost:3004/api (si Swagger configuré)

## 📊 Base de Données

### Modèles Prisma
- **User** - Utilisateurs
- **Product** - Produits
- **Order** - Commandes
- **OrderItem** - Articles de commande

## 🔒 Sécurité

- Hachage bcrypt pour les mots de passe
- JWT pour l'authentification
- CORS configuré
- Validation des données
- Protection des routes admin

## 🧪 Test

Pour tester l'application :

1. Créer un compte sur `/login`
2. Explorer les produits sur `/`
3. Ajouter au panier
4. Voir le panier sur `/cart`
5. Accéder au dashboard admin sur `/dashboard`

## 📝 API Endpoints

### Auth
- `POST /auth/register` - Inscription
- `POST /auth/login` - Connexion

### Products
- `GET /products` - Liste des produits
- `POST /products` - Créer un produit (admin)
- `PATCH /products/:id` - Modifier un produit (admin)
- `DELETE /products/:id` - Supprimer un produit (admin)

### Orders
- `POST /orders` - Créer une commande
- `GET /orders/my` - Mes commandes
- `GET /orders` - Toutes les commandes (admin)

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature
3. Commit les changements
4. Push vers la branche
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.
