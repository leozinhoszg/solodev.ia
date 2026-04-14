import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Skeleton from "../ui/Skeleton";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07070d]">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-700 to-violet-500 shadow-[0_0_15px_rgba(124,58,237,0.3)]">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
