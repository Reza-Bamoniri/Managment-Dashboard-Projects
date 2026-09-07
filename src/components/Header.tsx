import { useState } from "react";
import { useNavigate } from "react-router";

type HeaderProps = {
  onMenuClick: () => void;
};

const notifications = [
  {
    id: "1",
    message: "You have been assigned a new task",
    time: "10 minutes ago",
  },
  {
    id: "2",
    message: "The Website Redesign deadline is approaching",
    time: "1 hour ago",
  },
  {
    id: "3",
    message: "A new comment was added to your task",
    time: "Yesterday",
  },
];

function Header({ onMenuClick }: HeaderProps) {
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="flex h-20 items-center justify-between bg-green-100/40 px-4 shadow-sm backdrop-blur-md sm:px-6">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700 transition hover:bg-green-100 lg:hidden"
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

      {/* Right */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Notifications */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowNotifications((prev) => !prev);
              setShowProfile(false);
            }}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white text-green-700 shadow-sm transition hover:bg-green-100"
            aria-label="Notifications"
          >
            <span className="text-lg">🔔</span>

            <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-lime-400 ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-14 z-50 w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5">
              <div className="bg-linear-to-r from-lime-400 to-green-600 px-5 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-white">
                      Notifications
                    </h3>

                    <p className="mt-0.5 text-xs text-white/75">
                      You have 3 new notifications
                    </p>
                  </div>

                  <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-white/20 px-2 text-xs font-semibold text-white">
                    3
                  </span>
                </div>
              </div>

              <div className="max-h-80 overflow-y-auto p-2">
                {notifications.map((notification) => (
                  <button
                    key={notification.id}
                    type="button"
                    className="flex w-full gap-3 rounded-xl p-3 text-left transition hover:bg-green-50"
                  >
                    <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-lime-400" />

                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {notification.message}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        {notification.time}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="p-3">
                <button
                  type="button"
                  className="w-full rounded-xl bg-green-50 py-2.5 text-sm font-medium text-green-700 transition hover:bg-green-100"
                  onClick={() => setShowNotifications(false)}
                >
                  View All Notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowProfile((prev) => !prev);
              setShowNotifications(false);
            }}
            className="flex items-center gap-3 rounded-xl p-1.5 transition hover:bg-green-50"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-lime-400 to-green-700 text-sm font-bold text-white shadow-md">
              JA
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold text-gray-900">
                James Anderson
              </p>

              <p className="text-xs text-gray-500">
                Project Manager
              </p>
            </div>

            <span className="hidden text-xs text-gray-400 sm:block">
              ▼
            </span>
          </button>

          {/* Profile Dropdown */}
          {showProfile && (
            <div className="absolute right-0 top-14 z-50 w-56 overflow-hidden rounded-2xl bg-white p-2 shadow-xl ring-1 ring-black/5">
              <div className="mb-1 rounded-xl bg-linear-to-r from-lime-400 to-green-600 p-4">
                <p className="text-sm font-semibold text-white">
                  James Anderson
                </p>

                <p className="mt-1 text-xs text-white/75">
                  Project Manager
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate("/profile")}
                className="w-full rounded-xl px-3 py-3 text-left text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-700"
              >
                My Profile
              </button>

              <button
                type="button"
                onClick={() => navigate("/settings")}
                className="w-full rounded-xl px-3 py-3 text-left text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-700"
              >
                Settings
              </button>

              <div className="my-1 h-px bg-gray-100" />

              <button
                type="button"
                className="w-full rounded-xl px-3 py-3 text-left text-sm font-medium text-red-500 transition hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;