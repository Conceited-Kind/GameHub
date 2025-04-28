import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmail, signInWithGoogle } from '../../firebase/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmail(email, password);
      navigate('/');
      setEmail('');
      setPassword('');
    } catch (error) {
      switch (error.message) {
        case 'auth/invalid-credential':
          setError('Invalid email or password.');
          break;
        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;
        case 'auth/too-many-requests':
          setError('Too many attempts. Please try again later.');
          break;
        default:
          setError('Login failed. Please try again.');
          console.error('GameHub Firebase error:', error.message, error.code);
      }
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    try {
      await signInWithGoogle();
      navigate('/');
    } catch (error) {
      switch (error.message) {
        case 'auth/popup-closed-by-user':
          setError('Google sign-in was cancelled.');
          break;
        case 'auth/network-request-failed':
          setError('Network error. Please check your connection.');
          break;
        case 'auth/popup-blocked':
          setError('Popup blocked. Please allow popups for this site.');
          break;
        default:
          setError('Google sign-in failed. Please try again.');
          console.error('Google sign-in error:', error.message, error.code);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border-t-4 border-primary">
      <h2 className="text-2xl font-bold text-primary mb-4">Log In to GameHub</h2>
      {error && (
        <p className="text-secondary mb-4 text-center" id="login-error" role="alert">
          {error}
        </p>
      )}
      <form onSubmit={handleEmailLogin} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            required
            aria-describedby="login-error"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            required
            aria-describedby="login-error"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Log In
        </button>
      </form>
      <button
        onClick={handleGoogleLogin}
        className="w-full mt-4 bg-gray-100 text-gray-700 p-2 rounded border hover:bg-gray-200 transition"
      >
        Sign in with Google
      </button>
      <p className="mt-4 text-center">
        Don't have an account?{' '}
        <a href="/auth?signup" className="text-primary hover:underline">
          Sign Up
        </a>
      </p>
    </div>
  );
}

export default Login;