import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Students from "./pages/Students";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/students" element={<Students />} />
    </Routes>
  );
}

export default App;
