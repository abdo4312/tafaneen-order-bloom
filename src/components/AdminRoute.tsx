// src/components/AdminRoute.tsx
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If the authentication state is still loading, do nothing yet.
    if (isLoading) {
      return;
    }

    // If there is no user or the user is not an admin, redirect to the homepage.
    if (!user || !isAdmin) {
      navigate("/");
    }
  }, [user, isAdmin, isLoading, navigate]);

  // If the user is authenticated and is an admin, render the child components.
  // Otherwise, this will return null while the redirection happens.
  if (isLoading || !user || !isAdmin) {
    return null; // Or a loading spinner
  }

  return <>{children}</>;
};

export default AdminRoute;
