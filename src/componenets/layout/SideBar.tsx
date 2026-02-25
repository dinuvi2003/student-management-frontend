const Sidebar = () => {
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
          <button className="w-full text-left px-3 py-2 rounded hover:bg-slate-800">
            Dashboard
          </button>

          <button className="w-full text-left px-3 py-2 rounded bg-slate-800">
            Students
          </button>

          <button className="w-full text-left px-3 py-2 rounded hover:bg-slate-800">
            Add Student
          </button>
        </nav>
      </div>

      {/* Sign Out */}
      <div className="p-6 border-t border-slate-800">
        <button className="text-slate-400 hover:text-white">
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;