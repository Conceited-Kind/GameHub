## GameHub - Gaming Platform

GameHub is a comprehensive gaming platform that allows users to discover games, read reviews, find deals, and engage with the gaming community.

Features
Game Discovery: Browse a wide variety of games across different genres and platforms

User Authentication: Secure login with email/password or Google

Wishlist: Save games to your personal wishlist

Game Reviews: Read and write reviews for games

Community Forum: Engage in discussions with other gamers

Deals Section: Find the best deals on popular games

Personalized Recommendations: Get game suggestions based on your wishlist

Technologies Used
Frontend: React, React Router, Tailwind CSS

Authentication: Firebase Authentication

Database: Firebase Realtime Database

Backend: JSON Server (for mock API)

Deployment: Firebase Hosting

Getting Started
Prerequisites
Node.js (v18 or higher)

npm or yarn

Firebase account (for authentication and database)

Installation
Clone the repository:

bash
git clone https://github.com/yourusername/gamehub.git
cd gamehub
Install dependencies:

bash
npm install
Create a .env file in the root directory with your Firebase config:

VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_DATABASE_URL=your-database-url
Start the development server:

bash
npm run dev
(Optional) Start the mock API server in another terminal:

bash
npm run server
Scripts
npm run dev: Start the development server

npm run build: Build for production

npm run server: Start the mock API server

npm run lint: Run ESLint

npm run deploy: Build and deploy to Firebase

Project Structure
src/
├── components/       # React components
├── firebase/         # Firebase configuration and auth functions
├── pages/            # Page components
├── utils/            # Utility functions
├── App.jsx           # Main application component
└── main.jsx          # Entry point
License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
Firebase for authentication and database services

React community for awesome tools and libraries

Tailwind CSS for utility-first styling

New chat
