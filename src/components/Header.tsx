function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <h2 className="text-lg font-semibold">Dashboard</h2>

      <div className="flex items-center gap-4">
        <button
          type="button"
          className="rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100"
        >
          Notifications
        </button>

        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold">
            JD
          </div>

          <span className="text-sm font-medium">James Anderson</span>
        </div>
      </div>
    </header>
  );
}

export default Header;