
import { Routes, Route } from 'react-router-dom';
import AuthProvider from './components/auth/AuthProvider';
import PrivateRoute from './components/auth/PrivateRoute';
import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import Reviews from './pages/Reviews';
import Deals from './pages/Deals';
import Community from './pages/Community';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/reviews"
              element={
                <PrivateRoute>
                  <Reviews /> 
                </PrivateRoute>
              }
            />
            <Route
              path="/deals"
              element={
                <PrivateRoute>
                  <Deals /> 
                </PrivateRoute>
              }
            />
            <Route
              path="/community"
              element={
                <PrivateRoute>
                  <Community /> {/* GameHub forum for discussions */}
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile /> 
                </PrivateRoute>
              }
            />
            <Route path="*" element={<AuthPage />} /> 
          </Routes>
        </main>
        <Footer /> 
      </div>
    </AuthProvider>
  );
}

export default App;