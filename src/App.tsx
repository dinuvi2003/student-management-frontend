import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import UpdateStudent from "./pages/UpdateStudent";
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

      <Route path="/students" element={<Students />} />
      <Route path="/add-student" element={<AddStudent />} />
      <Route path="/students/:id" element={<UpdateStudent />}/>
    </Routes>
  );
}

export default App;
