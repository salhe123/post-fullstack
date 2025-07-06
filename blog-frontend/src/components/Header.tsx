import { useAuthStore } from "../store/authStore";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Blog App
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          {user ? (
            <>
              <Link to="/posts/create" className="hover:underline">
                Create Post
              </Link>
              <button onClick={handleLogout} className="hover:underline">
                Logout
              </button>
              {user.role === "ADMIN" && <span className="text-sm">Admin</span>}
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
