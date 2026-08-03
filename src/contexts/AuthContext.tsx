import { createContext, useContext, useEffect, useState } from "react";
// import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
}

import { Session } from "@supabase/supabase-js";

// ... (existing imports)

interface AuthContextType {
  user: UserProfile | null;
  session: Session | null;
  isAdmin: boolean;
  isLoading: boolean;
  loginWithGoogle: () => Promise<{ error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Simple mock login for now
  const loginWithGoogle = async () => {
    console.log("Mock login triggered");
    // Simulate a login
    const mockUser = {
      id: "mock-user-id",
      name: "Mock User",
      email: "mock@example.com",
    };
    setUser(mockUser);
    setSession({ user: mockUser as any } as Session);
    return {};
  };

  const logout = async () => {
    setUser(null);
    setSession(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, session, isAdmin, isLoading, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
