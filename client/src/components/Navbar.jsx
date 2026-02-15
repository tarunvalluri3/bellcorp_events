import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="border-b bg-white">
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="font-semibold text-lg">
          Bellcorp Events
        </Link>

        <div className="flex gap-4 items-center">
          <Link to="/events">Events</Link>
          {user && <Link to="/dashboard">Dashboard</Link>}
          {!user && <Link to="/login">Login</Link>}
          {user && (
            <button
              onClick={logout}
              className="border px-3 py-1 rounded"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
