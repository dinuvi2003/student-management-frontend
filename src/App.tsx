import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import UpdateStudent from "./pages/UpdateStudent";
import Courses from "./pages/Courses";
import AddCourse from "./pages/AddCourse";
import UpdateCourse from "./pages/UpdateCourse";
import type { ReactNode } from "react";

const ProtectedRoute = ({children} : {children: ReactNode}) => {
  const auth = localStorage.getItem("auth");

  if(!auth) {
    return <Navigate to="/" replace />
  }

  return children;
}

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<Login />} />

      {/* Protected Route */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/students" 
        element={
          <ProtectedRoute>
            <Students />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/add-student" 
        element={
          <ProtectedRoute>
            <AddStudent />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/students/:id" 
        element={
          <ProtectedRoute>
            <UpdateStudent />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/courses" 
        element={
          <ProtectedRoute>
            <Courses />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/add-course" 
        element={
          <ProtectedRoute>
            <AddCourse />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/courses/:id" 
        element={
          <ProtectedRoute>
            <UpdateCourse />
          </ProtectedRoute>
        } 
      />

    </Routes>
  );
}

export default App;
