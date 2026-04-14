import { Routes, Route } from "react-router-dom";
import PageWrapper from "./components/layout/PageWrapper";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <Routes>
      {/* Auth pages (sem sidebar) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* App pages (com sidebar) */}
      <Route
        path="/"
        element={
          <PageWrapper>
            <Dashboard />
          </PageWrapper>
        }
      />
    </Routes>
  );
}
