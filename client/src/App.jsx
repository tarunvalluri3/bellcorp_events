import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/events"
        element={<ProtectedRoute><Events/></ProtectedRoute>}
      />

      <Route path="/event/:id"
        element={<ProtectedRoute><EventDetails/></ProtectedRoute>}
      />

      <Route path="/dashboard"
        element={<ProtectedRoute><Dashboard/></ProtectedRoute>}
      />

      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  );
}
