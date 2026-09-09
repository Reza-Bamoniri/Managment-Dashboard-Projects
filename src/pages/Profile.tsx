import { FiEdit2, FiLogOut, FiMail, FiUser } from "react-icons/fi";

function Profile() {
  return (
    <main className="min-h-fit dark:bg-gray-950 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-4xl bg-linear-to-r from-green-800 to-green-300 bg-clip-text font-bold
              text-transparent dark:from-lime-300 dark:via-green-400 dark:to-green-600">
          Account
        </h1>

        <section
          className="
            relative min-h-80 h-150 overflow-hidden rounded-3xl
            bg-linear-to-br from-green-600 via-emerald-500 to-lime-400
            p-8 shadow-2xl
            sm:p-10
            lg:min-h-90 lg:p-12
          "
        >
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-lime-300/10" />

          <div className="relative flex h-full min-h-65 flex-col justify-between gap-10 lg:min-h-70 lg:flex-row lg:items-center">
            {/* Profile information */}
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
              {/* Avatar */}
              <div
                className="
                  flex h-32 w-32 shrink-0 items-center justify-center
                  rounded-full border-4 border-white/80
                  bg-white text-3xl font-bold text-green-600
                  shadow-xl
                  sm:h-36 sm:w-36
                "
              >
                JA
              </div>

              {/* User information */}
              <div className="text-center sm:text-left">
                <p className="mb-2 text-sm font-medium uppercase tracking-widest text-white/70">
                  Profile
                </p>

                <h2 className="text-3xl font-bold text-white sm:text-4xl">
                  James Anderson
                </h2>

                <div className="mt-4 space-y-2 text-sm text-white/90 sm:text-base">
                  <div className="flex items-center justify-center gap-2 sm:justify-start">
                    <FiUser size={17} />
                    <span>Project Manager</span>
                  </div>

                  <div className="flex items-center justify-center gap-2 sm:justify-start">
                    <FiMail size={17} />
                    <span>james@example.com</span>
                  </div>
                </div>

                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                  <span className="h-2.5 w-2.5 rounded-full bg-white" />
                  Active
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 lg:items-end">
              <button
                type="button"
                className="
                  flex cursor-pointer items-center justify-center gap-2
                  rounded-xl bg-white px-6 py-3
                  text-sm font-semibold text-green-600
                  shadow-lg transition
                  hover:bg-gray-50
                "
              >
                <FiEdit2 size={17} />
                Edit Profile
              </button>

              <button
                type="button"
                className="
                  flex cursor-pointer items-center justify-center gap-2
                  rounded-xl border border-white/40
                  bg-white/10 px-6 py-3
                  text-sm font-semibold text-white
                  backdrop-blur-sm transition
                  hover:bg-white/20
                "
              >
                <FiLogOut size={17} />
                Logout
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Profile;