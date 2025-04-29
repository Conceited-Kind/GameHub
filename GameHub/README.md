GameHub
GameHub is a web application for gamers to browse games, discover deals, manage wishlists, and engage with a community through forums and reviews. The frontend is built with React and Vite, hosted on Firebase Hosting, and uses Firebase Authentication and Realtime Database for user management and community features. The backend is a json-server API hosted on Render, serving game, deal, and wishlist data from db.json.
Features

Game Browsing: Explore a catalog of games with details like title, genre, platform, price, and ratings.
Deals: View discounted games from various stores (e.g., Steam).
Wishlist: Add or remove games to a personalized wishlist (requires sign-in).
Authentication: Sign in with Firebase Authentication to access wishlists and community features.
Community: Post to forums and submit game reviews using Firebase Realtime Database.
Responsive Design: Optimized for desktop and mobile.

Tech Stack

Frontend: React, Vite, Tailwind CSS, Firebase SDK
Backend: json-server, Node.js
Hosting: Firebase Hosting (frontend), Render (backend)
Database: Firebase Realtime Database (community posts, reviews)
Authentication: Firebase Authentication

Project Structure

Frontend Repository (e.g., gamehub-frontend):
src/: React components (Dashboard.jsx, Deals.jsx, Profile.jsx, etc.)
.env.local: Local environment variables
.env.production: Production environment variables
dist/: Built assets for Firebase deployment


Backend Repository (e.g., GameHub at https://github.com/Conceited-Kind/GameHub):
index.js: json-server setup
db.json: Game, deal, and wishlist data
package.json: Backend dependencies and scripts



Prerequisites

Node.js (v18 or higher)
npm
Firebase CLI (npm install -g firebase-tools)
Git
Firebase account and project (gamehub-254)
Render account for backend hosting

Setup Instructions
Backend Setup

Clone the Backend Repository:
git clone https://github.com/Conceited-Kind/GameHub.git
cd GameHub


Install Dependencies:
npm install


Verify db.json:

Ensure db.json contains:{
  "games": [
    { "id": 1, "title": "Game 1", "genre": "Action", "platform": "PC", "price": 59.99, "rating": 4.5, "image": "url", "tags": ["action", "adventure"] },
    ...
  ],
  "deals": [
    { "id": "d1", "gameId": 1, "store": "Steam", "price": 29.99, "discount": 50 },
    ...
  ],
  "wishlists": [
    { "id": "w1", "gameId": 1, "userId": "firebase-user-id" },
    ...
  ]
}




Run Locally:
npm run server


Access http://localhost:3000/games to verify data.



Frontend Setup

Clone the Frontend Repository (replace with your frontend repo URL):
git clone <frontend-repo-url>
cd gamehub-frontend


Install Dependencies:
npm install


Configure Environment Variables:

Create .env.local for local development:echo 'VITE_API_URL=http://localhost:3000
VITE_FIREBASE_API_KEY=AIzaSyDqxE0-PorBIcI5mTlZKKWztGzMOZjeiog
VITE_FIREBASE_AUTH_DOMAIN=gamehub-254.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=gamehub-254
VITE_FIREBASE_STORAGE_BUCKET=gamehub-254.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=392215058283
VITE_FIREBASE_APP_ID=1:392215058283:web:675556f737d37b8ac6de2e
VITE_FIREBASE_DATABASE_URL=https://gamehub-254-default-rtdb.firebaseio.com' > .env.local


Create .env.production for deployment:echo 'VITE_API_URL=https://gamehub-4.onrender.com
VITE_FIREBASE_API_KEY=AIzaSyDqxE0-PorBIcI5mTlZKKWztGzMOZjeiog
VITE_FIREBASE_AUTH_DOMAIN=glue
VITE_FIREBASE_AUTH_DOMAIN=gamehub-254.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=gamehub-254
VITE_FIREBASE_STORAGE_BUCKET=gamehub-254.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=392215058283
VITE_FIREBASE_APP_ID=1:392215058283:web:675556f737d37b8ac6de2e
VITE_FIREBASE_DATABASE_URL=https://gamehub-254-default-rtdb.firebaseio.com' > .env.production


Add to .gitignore:.env.local
.env.production




Run Locally:

Start the backend (npm run server in GameHub).
Start the frontend:npm run dev


Open http://localhost:5173 and sign in to test features.



Deployment
Backend Deployment (Render)

Push to GitHub:
cd GameHub
git add .
git commit -m "Update backend for deployment"
git push origin main


Configure Render:

Create a new Web Service in Render, linked to https://github.com/Conceited-Kind/GameHub.
Set:
Environment: Node
Build Command: npm install
Start Command: npm start


Deploy and verify https://gamehub-4.onrender.com/games returns JSON.



Frontend Deployment (Firebase)

Build the Frontend:
cd gamehub-frontend
rm -rf node_modules/.vite dist
npm run build


Verify dist/assets/index-*.js contains https://gamehub-4.onrender.com (not /db).


Deploy to Firebase:
firebase login
firebase use gamehub-254
firebase deploy --only hosting


Access https://gamehub-254.web.app.



Troubleshooting

404 Error (https://gamehub-4.onrender.com/db/games):

Cause: Frontend uses VITE_API_URL=https://gamehub-4.onrender.com/db instead of https://gamehub-4.onrender.com.
Fix:
Update .env.production with VITE_API_URL=https://gamehub-4.onrender.com.
Clear caches and rebuild:rm -rf node_modules/.vite dist
npm run build
firebase deploy --only hosting


Verify dist/assets/index-*.js has the correct URL.
Test https://gamehub-4.onrender.com/games to ensure backend is serving data.


Check:
Console logs: Should show Fetching games from: https://gamehub-4.onrender.com/games.
Network tab: Requests to /games return 200 OK.




Backend Not Serving:

Check Render logs for db.json or port errors.
Ensure index.js binds to 0.0.0.0 and db.json has games, deals, wishlists.
Redeploy backend.


Firebase Issues:

Run firebase deploy --only hosting --debug and check output.
Verify Firebase project (gamehub-254) and Hosting setup.



Contributing

Fork the repository.
Create a feature branch (git checkout -b feature/new-feature).
Commit changes (git commit -m "Add new feature").
Push to the branch (git push origin feature/new-feature).
Open a Pull Request.

License
This project is licensed under the MIT License.
Contact
For issues or questions, open an issue on GitHub or contact the maintainer at [your-email@example.com].
