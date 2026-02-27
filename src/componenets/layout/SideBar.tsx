import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {

  const navigate = useNavigate();

  const linkClasses =
    "w-full block text-left px-3 py-2 rounded transition";

    const handleLogout = () => {
      //Remove stored credentials
      localStorage.removeItem("auth");

      navigate("/", {replace: true});
    }

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col justify-between">
      <div>
        {/* Logo */}
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-lg font-bold">Student Manager</h1>
          <p className="text-sm text-slate-400">Admin Panel</p>
        </div>

        {/* Menu */}
        <nav className="mt-6 space-y-2 px-4">
          
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${linkClasses} ${
                isActive ? "bg-slate-800" : "hover:bg-slate-800"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/students"
            className={({ isActive }) =>
              `${linkClasses} ${
                isActive ? "bg-slate-800" : "hover:bg-slate-800"
              }`
            }
          >
            Students
          </NavLink>

          <NavLink
            to="/add-student"
            className={({ isActive }) =>
              `${linkClasses} ${
                isActive ? "bg-slate-800" : "hover:bg-slate-800"
              }`
            }
          >
            Add Student
          </NavLink>

        </nav>
      </div>

      {/* Sign Out */}
      <div className="p-6 border-t border-slate-800">
        <button 
          onClick={handleLogout}
          className="text-slate-400 hover:text-white">
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;