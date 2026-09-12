import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import useProfile from "../hooks/useProfile";

type HeaderProps = {
  onMenuClick: () => void;
  isMenuOpen: boolean;
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

function Header({ onMenuClick, isMenuOpen }: HeaderProps) {
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);
const profileRef = useRef<HTMLDivElement>(null);


const { user, handleLogout } = useProfile();


useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;

    if (
      notificationRef.current &&
      !notificationRef.current.contains(target)
    ) {
      setShowNotifications(false);
    }

    if (
      profileRef.current &&
      !profileRef.current.contains(target)
    ) {
      setShowProfile(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);





  return (
    <header
      className="
        flex h-20 items-center justify-between
        bg-green-100/40
        px-4
        shadow-sm
        backdrop-blur-md
        dark:bg-gray-950/80
        dark:shadow-black/30
        sm:px-6
        relative
        z-50
      "
    >
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
           type="button"
           onClick={onMenuClick}
           className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700
                   transition hover:bg-green-100 dark:bg-green-950/60 dark:text-green-300 dark:hover:bg-green-900/70 lg:hidden"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
           >
        <span className="relative block h-5 w-5">
    <span
      className={`absolute left-0 top-1/2 block h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ${
        isMenuOpen ? "rotate-45" : "-translate-y-2"
      }`}
    />

    <span
      className={`absolute left-0 top-1/2 block h-0.5 w-5 rounded-full bg-current transition-opacity duration-200 ${
        isMenuOpen ? "opacity-0" : "opacity-100"
      }`}
    />

    <span
      className={`absolute left-0 top-1/2 block h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ${
        isMenuOpen ? "-rotate-45" : "translate-y-2"
      }`}
    />
  </span>
</button>

        <div>
          <h2
            className="inline-block bg-linear-to-r from-green-800 to-green-400 bg-clip-text text-2xl
              font-bold text-transparent dark:from-lime-300 dark:via-green-400 dark:to-green-600"
          >
            <Link to="/">DASHBOARD</Link>
          </h2>

          <p className="hidden text-xs text-gray-500 dark:text-gray-400 sm:block">
            Manage your projects and tasks
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Notifications */}
        <div ref={notificationRef} className="relative">
          <button
            type="button"
            onClick={() => {
              setShowNotifications((prev) => !prev);
              setShowProfile(false);
            }}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white
              cursor-pointer text-green-700 shadow-sm transition hover:bg-green-100 dark:bg-gray-800
              dark:text-green-300 dark:shadow-black/20 dark:hover:bg-green-950"
            aria-label="Notifications"
          >
            <span className="text-lg">🔔</span>

            <span
              className="
                absolute right-1.5 top-1.5
                h-2.5 w-2.5
                rounded-full
                bg-lime-400
                ring-2 ring-white
                dark:ring-gray-800
              "
            />
          </button>

          {showNotifications && (
            <div
              className="absolute -right-13 top-14 z-50 w-[calc(100vw-2rem)] max-w-sm sm:w-96 overflow-hidden rounded-2xl
                bg-white shadow-xl ring-1 ring-black/5 dark:bg-gray-900 dark:shadow-black/40 dark:ring-green-900/50"
            >
              <div className="bg-linear-to-r from-lime-400 to-green-600 px-5 py-4 dark:from-green-700 dark:via-green-800 dark:to-green-950">
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
                    className="flex w-full gap-3 rounded-xl p-3 text-left transition hover:bg-green-50 dark:hover:bg-green-950/60"
                  >
                    <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-lime-400" />

                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        {notification.message}
                      </p>

                      <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                        {notification.time}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="p-3">
                <button
                  type="button"
                  className="w-full rounded-xl bg-green-50 py-2.5 text-sm font-medium text-green-700 transition hover:bg-green-100 dark:bg-green-950/70 dark:text-green-300 dark:hover:bg-green-900"
                  onClick={() => setShowNotifications(false)}
                >
                  View All Notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div ref={profileRef} className="relative">
          <button
            type="button"
            onClick={() => {
              setShowProfile((prev) => !prev);
              setShowNotifications(false);
            }}
            className="flex items-center cursor-pointer gap-3 rounded-xl p-1.5 transition hover:bg-green-50 dark:hover:bg-green-950/50"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-lime-400 to-green-700 text-sm font-bold text-white shadow-md dark:from-green-500 dark:to-green-900">
              {user?.avatar ? (<img src={user.avatar}alt={user.name}  className="h-full w-full object-cover rounded-full"/>
                 ) : ( user?.name ?.split(" ").map((name) => name[0]).join("").slice(0, 2))}
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {user?.name}
              </p>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user?.role}
              </p>
            </div>

            <span className="hidden text-xs text-gray-400 dark:text-gray-500 sm:block">
              ▼
            </span>
          </button>

          {/* Profile Dropdown */}
          {showProfile && (
            <div
              className="absolute right-0 top-14 z-50 w-56 overflow-hidden rounded-2xl bg-white
                p-2  shadow-xl ring-1 ring-black/5 dark:bg-gray-900 dark:shadow-black/40 dark:ring-green-900/50
              "
            >
              <div className="mb-1 rounded-xl bg-linear-to-r from-lime-400 to-green-600 p-4 dark:from-green-700 dark:via-green-800 dark:to-green-950">
                <p className="text-sm font-semibold text-white">
                  James Anderson
                </p>

                <p className="mt-1 text-xs text-white/75">
                  Project Manager
                </p>
              </div>

              <button
                type="button"
                onClick={() => {navigate("/profile")
                   setShowProfile(false)}}
                className="w-full rounded-xl px-3 py-3 text-left text-sm font-medium text-gray-700
                  cursor-pointer  transition hover:bg-green-50 hover:text-green-700 dark:text-gray-300
                  dark:hover:bg-green-950/60 dark:hover:text-green-300"
              >
                My Profile
              </button>

              

              <div className="my-1 h-px bg-gray-100 dark:bg-gray-800" />

              <button 
              onClick={handleLogout}
                type="button"
                className="w-full rounded-xl px-3 py-3 text-left text-sm font-medium text-red-500
                  cursor-pointer transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
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