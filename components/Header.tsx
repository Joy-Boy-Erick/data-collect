import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { logout as apiLogout } from '../services/api';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiLogout();
    } catch (error) {
      console.error("Server logout failed:", error);
      // Still log out on the client side even if server call fails
    } finally {
      logout();
      navigate('/login');
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          DataCollectApp
        </Link>
        <nav className="flex items-center space-x-4">
          <Link to="/payments/public" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Public Payments
          </Link>
          {user ? (
            <>
              <Link to="/admin/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Admin Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors text-sm font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors text-sm font-medium">
              Admin Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;