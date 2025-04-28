
import { useLocation } from 'react-router-dom';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';

function AuthPage() {
  const location = useLocation();
  const isSignup = location.search.includes('signup');

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {isSignup ? <Signup /> : <Login />}
    </div>
  );
}

export default AuthPage;