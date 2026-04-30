"use client";

import { useSession, signOut } from "next-auth/react";

export function useAdminAuth() {
  const { data: session, status } = useSession();

  const isAuthenticated = status === "authenticated";
  const isAdmin = session?.user?.role === "ADMIN";

  return {
    isAuthenticated,
    isAdmin,
    user: session?.user,
    logout: () => signOut({ callbackUrl: "/admin/login" }),
  };
}

// "use client";

// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   useCallback,
// } from "react";

// interface AdminAuth {
//   isAuthenticated: boolean;
//   login: (username: string, password: string) => boolean;
//   logout: () => void;
//   changePassword: (oldPassword: string, newPassword: string) => boolean;
//   adminUsername: string;
// }

// const ADMIN_KEY = "admin_session";
// const SESSION_DURATION = 60 * 60 * 1000; // 1 hour

// const DEFAULT_USERNAME = "admin";
// const DEFAULT_PASSWORD = "admin123";

// const AdminAuthContext = createContext<AdminAuth | null>(null);

// export const useAdminAuth = () => {
//   const ctx = useContext(AdminAuthContext);
//   if (!ctx)
//     throw new Error("useAdminAuth must be used within AdminAuthProvider");
//   return ctx;
// };

// export const AdminAuthProvider: React.FC<{
//   children: React.ReactNode;
// }> = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [adminUsername, setAdminUsername] = useState("");
//   const [isLoading, setIsLoading] = useState(true);

//   // ✅ PURE function (NO setState inside)
//   const checkSession = useCallback(() => {
//     const session = localStorage.getItem(ADMIN_KEY);
//     if (!session) return { valid: false, username: "" };

//     try {
//       const { expiry, username } = JSON.parse(session);

//       if (Date.now() < expiry) {
//         return { valid: true, username };
//       }

//       localStorage.removeItem(ADMIN_KEY);
//     } catch {
//       localStorage.removeItem(ADMIN_KEY);
//     }

//     return { valid: false, username: "" };
//   }, []);

//   // ✅ ALL state updates handled here
//   useEffect(() => {
//     const { valid, username } = checkSession();

//     setIsAuthenticated(valid);
//     setAdminUsername(username);
//     setIsLoading(false);

//     const interval = setInterval(() => {
//       const { valid, username } = checkSession();

//       setIsAuthenticated(valid);
//       setAdminUsername((prev) =>
//         prev !== username ? username : prev
//       );
//     }, 30000);

//     return () => clearInterval(interval);
//   }, [checkSession]);

//   const login = (username: string, password: string) => {
//     const storedCreds = localStorage.getItem("admin_credentials");

//     let validUser = DEFAULT_USERNAME;
//     let validPass = DEFAULT_PASSWORD;

//     if (storedCreds) {
//       const creds = JSON.parse(storedCreds);
//       validUser = creds.username;
//       validPass = creds.password;
//     }

//     if (username === validUser && password === validPass) {
//       const session = {
//         username,
//         expiry: Date.now() + SESSION_DURATION,
//       };

//       localStorage.setItem(ADMIN_KEY, JSON.stringify(session));

//       setIsAuthenticated(true);
//       setAdminUsername(username);

//       return true;
//     }

//     return false;
//   };

//   const logout = () => {
//     localStorage.removeItem(ADMIN_KEY);
//     setIsAuthenticated(false);
//     setAdminUsername("");
//   };

//   const changePassword = (
//     oldPassword: string,
//     newPassword: string
//   ) => {
//     const storedCreds = localStorage.getItem("admin_credentials");

//     let validPass = DEFAULT_PASSWORD;

//     if (storedCreds) {
//       validPass = JSON.parse(storedCreds).password;
//     }

//     if (oldPassword !== validPass) return false;

//     const username = adminUsername || DEFAULT_USERNAME;

//     localStorage.setItem(
//       "admin_credentials",
//       JSON.stringify({
//         username,
//         password: newPassword,
//       })
//     );

//     return true;
//   };

//   // ✅ Better UX than returning null
//   if (isLoading) {
//     return (
//       <div className="p-4 text-sm text-muted-foreground">
//         Loading admin session...
//       </div>
//     );
//   }

//   return (
//     <AdminAuthContext.Provider
//       value={{
//         isAuthenticated,
//         login,
//         logout,
//         changePassword,
//         adminUsername,
//       }}
//     >
//       {children}
//     </AdminAuthContext.Provider>
//   );
// };