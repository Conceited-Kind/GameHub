import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

function PrivateRoute({ children }) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-blue-800">Loading GameHub...</p>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

export default PrivateRoute;