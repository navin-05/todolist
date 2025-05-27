import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingTasks from './LoadingTasks';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md">
          <LoadingTasks count={3} />
        </div>
      </div>
    );
  }

  // Allow access to dashboard in demo mode (when path is explicitly /dashboard)
  if (!user && location.pathname === '/dashboard') {
    return <>{children}</>;
  }

  // Redirect to login for other protected routes when not authenticated
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;