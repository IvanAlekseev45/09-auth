"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { checkSession, getMe, logout } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

interface AuthProviderProps {
  children: React.ReactNode;
}

const privateRoutes = ["/profile", "/notes"];

const AuthProvider = ({ children }: AuthProviderProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);

  useEffect(() => {
    const verifySession = async () => {
      const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));

      try {
        const isSession = await checkSession();

        if (isSession) {
          const user = await getMe();
          setUser(user);
        } else {
          clearIsAuthenticated();

          if (isPrivateRoute) {
            await logout();
            router.push("/sign-in");
          }
        }
      } catch {
        clearIsAuthenticated();

        if (isPrivateRoute) {
          router.push("/sign-in");
        }
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, [pathname, router, setUser, clearIsAuthenticated]);

  const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));

  if (loading && isPrivateRoute) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
};

export default AuthProvider;
