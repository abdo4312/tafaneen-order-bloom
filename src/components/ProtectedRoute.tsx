import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const { user, isLoading, isAdmin } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    // User is not authenticated, redirect to login or home
    return <Navigate to="/" replace />;
  }

  if (adminOnly && !isAdmin) {
    // User is authenticated but not an admin, redirect to home or an unauthorized page
    return <Navigate to="/" replace />; // Or a specific /unauthorized page
  }

  return <>{children}</>;
};

export default ProtectedRoute;