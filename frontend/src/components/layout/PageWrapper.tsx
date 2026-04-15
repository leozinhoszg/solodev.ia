import { useState, type ReactNode } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface PageWrapperProps {
  children: ReactNode;
  hideFooter?: boolean;
}

export default function PageWrapper({ children, hideFooter = false }: PageWrapperProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-space min-h-screen text-zinc-100">
      <Navbar onToggleSidebar={() => setSidebarOpen((o) => !o)} />
      <div className="relative z-1 flex">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="relative z-1 flex min-h-[calc(100vh-3.5rem)] flex-1 flex-col">
          <div className="flex-1 p-4 md:p-8">{children}</div>
          {!hideFooter && <Footer />}
        </main>
      </div>
    </div>
  );
}
