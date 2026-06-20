"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return <>{children}</>;
};

export default Layout;
