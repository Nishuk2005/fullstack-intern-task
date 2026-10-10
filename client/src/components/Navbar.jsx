import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const linkClass = ({ isActive }) =>
  `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
    isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:text-ink'
  }`;

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-6">
          <Link to="/templates" className="text-lg font-bold tracking-tight text-ink">
            Template Store
          </Link>
          <div className="flex items-center gap-1">
            <NavLink to="/templates" end className={linkClass}>
              Templates
            </NavLink>
            {isAuthenticated && (
              <NavLink to="/favorites" className={linkClass}>
                My Favorites
              </NavLink>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="hidden text-sm text-slate-500 sm:inline">{user.name}</span>
              <button type="button" onClick={handleLogout} className="btn-ghost py-2">
                Log out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass}>
                Log in
              </NavLink>
              <Link to="/register" className="btn-primary py-2">
                Create account
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
