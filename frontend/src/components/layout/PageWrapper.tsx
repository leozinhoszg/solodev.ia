import type { ReactNode } from "react";
import Sidebar from "./Sidebar";

interface PageWrapperProps {
  children: ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="bg-atmosphere flex min-h-screen bg-[#07070d] text-zinc-100">
      <Sidebar />
      <main className="relative z-1 flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}
