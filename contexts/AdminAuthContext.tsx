"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from "react";

interface AdminAuthContextType {
  isAuthenticated: boolean;
  adminUsername: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  changePassword: (oldPassword: string, newPassword: string) => boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

const SESSION_KEY = "admin_session";
const PASS_KEY = "admin_pass";

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUsername, setAdminUsername] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // ✅ Load session ONLY on client after mount (Next.js safe)
  useEffect(() => {
    const session = sessionStorage.getItem(SESSION_KEY);

    if (session) {
      try {
        const parsed = JSON.parse(session);

        if (Date.now() < parsed.expiry) {
          setIsAuthenticated(true);
          setAdminUsername(parsed.username || null);
        } else {
          sessionStorage.removeItem(SESSION_KEY);
        }
      } catch {
        sessionStorage.removeItem(SESSION_KEY);
      }
    }

    setHydrated(true);
  }, []);

  const login = useCallback((username: string, password: string) => {
    const storedPass =
      typeof window !== "undefined"
        ? localStorage.getItem(PASS_KEY) || "admin123"
        : "admin123";

    if (username === "admin" && password === storedPass) {
      const session = {
        username,
        expiry: Date.now() + 60 * 60 * 1000, // 1 hour
      };

      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
      setIsAuthenticated(true);
      setAdminUsername(username);

      return true;
    }

    return false;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
    setAdminUsername(null);
  }, []);

  const changePassword = useCallback(
    (oldPassword: string, newPassword: string) => {
      const storedPass = localStorage.getItem(PASS_KEY) || "admin123";

      if (oldPassword === storedPass) {
        localStorage.setItem(PASS_KEY, newPassword);
        return true;
      }

      return false;
    },
    []
  );

  // Optional: prevent UI flash before hydration
  if (!hydrated) return null;

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated,
        adminUsername,
        login,
        logout,
        changePassword,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

// export function useAdminAuth() {
//   const ctx = useContext(AdminAuthContext);
//   if (!ctx) {
//     throw new Error("useAdminAuth must be used within AdminAuthProvider");
//   }
//   return ctx;
// }