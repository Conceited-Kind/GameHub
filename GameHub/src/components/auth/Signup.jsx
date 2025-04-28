import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpWithEmail } from '../../firebase/auth';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signUpWithEmail(email, password);
      navigate('/'); 
      setEmail('');
      setPassword('');
    } catch (error) {
      switch (error.message) {
        case 'auth/email-already-in-use':
          setError('This email is already registered.');
          break;
        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;
        case 'auth/weak-password':
          setError('Password must be at least 6 characters.');
          break;
        case 'auth/too-many-requests':
          setError('Too many attempts. Please try again later.');
          break;
        default:
          setError('Signup failed. Please try again.');
          console.error('GameHub Firebase error:', error.message);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border-t-4 border-primary">
      <h2 className="text-2xl font-bold text-primary mb-4">Sign Up for GameHub</h2>
      {error && (
        <p className="text-secondary mb-4 text-center" id="signup-error" role="alert">
          {error}
        </p>
      )}
      <form onSubmit={handleSignup} className="space-y-4">
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
            aria-describedby="signup-error"
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
            aria-describedby="signup-error"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-center">
        Already have an account?{' '}
        <a href="/auth" className="text-primary hover:underline">
          Log In
        </a>
      </p>
    </div>
  );
}

export default Signup;