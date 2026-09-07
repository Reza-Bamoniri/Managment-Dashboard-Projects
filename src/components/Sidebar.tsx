import { NavLink } from "react-router";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const navigationItems = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Tasks", path: "/tasks" },
  { name: "Users", path: "/users" },
  { name: "Notifications", path: "/notifications" },
  { name: "Settings", path: "/settings" },
];

function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col
        bg-linear-to-b from-lime-400 via-green-500 to-green-950
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
                        ? "bg-white/20 text-white shadow-lg backdrop-blur-sm"
                        : "text-white/75 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom */}
        <div className="p-4">
          <div className="rounded-2xl bg-black/10 p-4 backdrop-blur-sm">
            <p className="text-xs text-white/60">
              Workspace
            </p>

            <p className="mt-1 text-sm font-medium text-white">
              My Workspace
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;