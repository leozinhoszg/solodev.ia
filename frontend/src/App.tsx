import { Routes, Route } from "react-router-dom";
import PageWrapper from "./components/layout/PageWrapper";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Lesson from "./pages/Lesson";
import PromptLabPage from "./pages/PromptLab";
import Dungeons from "./pages/Dungeons";
import DungeonDetail from "./pages/DungeonDetail";

export default function App() {
  return (
    <Routes>
      {/* Auth pages (sem sidebar) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* App pages (protegidas + com sidebar) */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <PageWrapper>
              <Dashboard />
            </PageWrapper>
          </ProtectedRoute>
        }
      />
      <Route
        path="/courses"
        element={
          <ProtectedRoute>
            <PageWrapper>
              <Courses />
            </PageWrapper>
          </ProtectedRoute>
        }
      />
      <Route
        path="/courses/:id"
        element={
          <ProtectedRoute>
            <PageWrapper>
              <CourseDetail />
            </PageWrapper>
          </ProtectedRoute>
        }
      />
      <Route
        path="/prompt-lab"
        element={
          <ProtectedRoute>
            <PageWrapper>
              <PromptLabPage />
            </PageWrapper>
          </ProtectedRoute>
        }
      />
      <Route
        path="/courses/:id/lessons/:lessonId"
        element={
          <ProtectedRoute>
            <PageWrapper>
              <Lesson />
            </PageWrapper>
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects"
        element={
          <ProtectedRoute>
            <PageWrapper>
              <Dungeons />
            </PageWrapper>
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects/:slug"
        element={
          <ProtectedRoute>
            <PageWrapper>
              <DungeonDetail />
            </PageWrapper>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
