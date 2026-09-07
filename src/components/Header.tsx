type HeaderProps = {
  onMenuClick: () => void;
};

function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="flex h-20 items-center justify-between bg-green-100/40 px-4 shadow-2xl backdrop-blur-md sm:px-6">
      <div className="flex items-center gap-4">
        {/* Hamburger */}
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-10 w-10 items-center justify-center rounded-xl
          bg-green-50 text-green-700 transition
          hover:bg-green-100 lg:hidden"
          aria-label="Open navigation menu"
        >
          <span className="flex flex-col gap-1.5">
            <span className="block h-0.5 w-5 rounded-full bg-current" />
            <span className="block h-0.5 w-5 rounded-full bg-current" />
            <span className="block h-0.5 w-5 rounded-full bg-current" />
          </span>
        </button>

        <div>
          <h2 className="inline-block text-2xl font-bold bg-linear-to-r from-green-800 to-green-400 bg-clip-text text-transparent">
            DASHBOARD
          </h2>

          <p className="hidden text-xs text-gray-500 sm:block">
            Manage your projects and tasks
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        {/* Notifications */}
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center
          rounded-xl bg-green-50 text-green-700
          shadow-sm transition hover:bg-green-100"
          aria-label="Notifications"
        >
          <span className="text-lg">🔔</span>

          <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-lime-400 ring-2 ring-white" />
        </button>

        {/* User */}
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full
            bg-linear-to-br from-lime-400 to-green-700
            text-sm font-bold text-white shadow-md"
          >
            JA
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-900">
              James Anderson
            </p>

            <p className="text-xs text-gray-500">
              Project Manager
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;