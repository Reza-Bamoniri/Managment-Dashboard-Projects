import { NavLink } from "react-router";
import useTheme from "../hooks/useTheme";
import { FiMoon, FiSun } from "react-icons/fi";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const navigationItems = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Tasks", path: "/tasks" },
  { name: "Users", path: "/users" },
  { name: "New Comment", path: "/comment" },
  { name: "Account", path: "/profile" },
];

function Sidebar({ isOpen, onClose }: SidebarProps) {

  const { isDarkMode, toggleTheme } = useTheme();


  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm dark:bg-black/60 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col
        bg-linear-to-b from-lime-400 via-green-500 to-green-950
        dark:from-gray-900 dark:via-green-950 dark:to-black
        shadow-2xl transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center px-6">
          <div>
            <h1 className="text-xl font-bold text-white">
              PM Dashboard
            </h1>

            <p className="mt-1 text-xs text-white/70">
              Project Management
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-5">
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-3 text-sm font-medium
                    transition-all duration-200
                    ${
                      isActive
                        ? `bg-white/20 text-white shadow-lg backdrop-blur-sm
                           dark:bg-green-500/20 dark:text-green-200
                           dark:shadow-green-950/40`
                        : `text-white/75 hover:bg-white/10 hover:text-white
                           dark:text-gray-400 dark:hover:bg-green-900/30
                           dark:hover:text-green-200`
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          
          aria-label="Toggle theme"
          className="flex w-full items-center justify-between rounded-xl px-4 py-3 transition"
          >
            <div className="flex items-center gap-3">
              {isDarkMode ? (
                <FiMoon className="text-lg text-gray-600 dark:text-gray-300" />
              ) : (
                <FiSun className="text-lg text-gray-100 dark:text-gray-300" />
              )}
           
              <span className="text-sm font-medium text-gray-100 dark:text-gray-300">
                Theme
              </span>
            </div>

            <div onClick={toggleTheme}
              className={`relative cursor-pointer h-6 w-11 rounded-full transition ${
                   isDarkMode ? "bg-green-600" : "bg-gray-300 dark:bg-gray-700" }`}
            >
              <div
                className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-md transition-transform ${
                  isDarkMode ? "translate-x-6" : "translate-x-1"}`}
              />
            </div>
       </button>

        {/* Bottom */}
        <div className="p-4">
          <div
            className="
              rounded-2xl
              bg-black/10
              p-4
              backdrop-blur-sm
              dark:border
              dark:border-green-800/40
              dark:bg-gray-900/70
            "
          >
            <p className="text-xs text-white/60 dark:text-gray-500">
              Workspace
            </p>

            <p className="mt-1 text-sm font-medium text-white dark:text-gray-200">
              My Workspace
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;