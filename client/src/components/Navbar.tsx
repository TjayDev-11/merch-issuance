import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Merchandise Tracker</h1>
        <nav className="space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-2 rounded ${isActive ? 'bg-blue-800' : 'hover:bg-blue-700'}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/inventory"
            className={({ isActive }) =>
              `px-3 py-2 rounded ${isActive ? 'bg-blue-800' : 'hover:bg-blue-700'}`
            }
          >
            Inventory
          </NavLink>
          <NavLink
            to="/issuance"
            className={({ isActive }) =>
              `px-3 py-2 rounded ${isActive ? 'bg-blue-800' : 'hover:bg-blue-700'}`
            }
          >
            Issuance
          </NavLink>
          <NavLink
            to="/reports"
            className={({ isActive }) =>
              `px-3 py-2 rounded ${isActive ? 'bg-blue-800' : 'hover:bg-blue-700'}`
            }
          >
            Reports
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `px-3 py-2 rounded ${isActive ? 'bg-blue-800' : 'hover:bg-blue-700'}`
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              `px-3 py-2 rounded ${isActive ? 'bg-blue-800' : 'hover:bg-blue-700'}`
            }
          >
            Signup
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;