
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/config';
import { signOut } from '../../firebase/auth';

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth');
    } catch (error) {
      console.error('GameHub Firebase error:', error.message);
    }
  };

  return (
    <nav className="bg-primary text-white p-4 shadow-lg">
  <div className="max-w-7xl mx-auto flex justify-between items-center">
    <h1 className="text-2xl font-bold">
      <NavLink to="/" className="hover:text-gray-100 transition">
        GameHub
      </NavLink>
    </h1>
    <ul className="flex space-x-6">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'text-secondary font-semibold'
                  : 'hover:text-gray-200 transition'
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/reviews"
              className={({ isActive }) =>
                isActive
                  ? 'text-secondary font-semibold'
                  : 'hover:text-gray-200 transition'
              }
            >
              Reviews
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/deals"
              className={({ isActive }) =>
                isActive
                  ? 'text-secondary font-semibold'
                  : 'hover:text-gray-200 transition'
              }
            >
              Deals
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/community"
              className={({ isActive }) =>
                isActive
                  ? 'text-secondary font-semibold'
                  : 'hover:text-gray-200 transition'
              }
            >
              Community
            </NavLink>
          </li>
          {user ? (
            <>
              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-secondary font-semibold'
                      : 'hover:text-gray-200 transition'
                  }
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <button
                  onClick={handleSignOut}
                  className="hover:text-gray-200 transition"
                >
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <li>
              <NavLink
                to="/auth"
                className={({ isActive }) =>
                  isActive
                    ? 'text-secondary font-semibold'
                    : 'hover:text-gray-200 transition'
                }
              >
                Log In
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;