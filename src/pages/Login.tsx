import { FiLock, FiMail } from "react-icons/fi";
import useLogin from "../hooks/useLogin";

function Login() {

  const {
  register,
  handleSubmit,
  errors,
  handleLogin,
  loading,
  error,
} = useLogin();


  return (
    <main
      className="
        min-h-screen
        bg-cover bg-center bg-no-repeat
        bg-gray-900
      "
      style={{
        backgroundImage: "url('/dark-green.jpg')",
      }}
    >
      <div
        className="
          flex min-h-screen
          items-center justify-center
          bg-black/30
          px-4 py-8
        "
      >
        {/* Glass Login Card */}
        <div
          className="
            w-full max-w-md
            rounded-3xl
            border border-white/20
            bg-white/10
            p-7
            shadow-2xl
            backdrop-blur-xl
            sm:p-9
          "
        >
          {/* Header */}
          <div className="mb-8 text-center">
            

            <h1 className="text-3xl font-bold text-white">
              Welcome Back
            </h1>

            <p className="mt-2 text-sm text-white/70">
              Sign in to your account
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(handleLogin)} >
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-white/90"
              >
                Email
              </label>

              <div className="relative">
                <FiMail
                  size={18}
                  className="
                    pointer-events-none
                    absolute left-3 top-1/2
                    -translate-y-1/2
                    text-white/50
                  "
                />

                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="Enter your email"
                  className=" w-full rounded-xl border border-white/20 bg-white/10 py-3 pl-10 pr-4
                     text-sm text-white outline-none placeholder:text-white/40 transition
                    focus:border-white/50 focus:bg-white/15 focus:ring-2 focus:ring-white/20"
                />
               {errors.email && (<p className="mt-1 text-sm text-red-400">{errors.email.message}</p>)}
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-white/90"
              >
                Password
              </label>

              <div className="relative">
                <FiLock
                  size={18}
                  className="
                    pointer-events-none
                    absolute left-3 top-1/2
                    -translate-y-1/2
                    text-white/50
                  "
                />

                <input
                  id="password"
                  {...register("password")}
                  type="password"
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-white/20 bg-white/10 py-3 pl-10 pr-4
                    text-sm text-white outline-none placeholder:text-white/40 transition
                    focus:border-white/50 focus:bg-white/15 focus:ring-2 focus:ring-white/20"
                />
                {errors.password && (<p className="mt-1 text-sm text-red-400">{errors.password.message}</p>)}
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between gap-3">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-white/70">
                <input
                  type="checkbox"
                  className="h-4 w-4 cursor-pointer rounded"
                />
                Remember me
              </label>

              <button
                type="button"
                className="cursor-pointer text-sm font-medium text-white transition hover:text-white/70"
              >
                Forgot password?
              </button>
            </div>

            {/* Login */}

            {error && (<p className="text-center text-sm text-red-400">{error}</p>)}
            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer rounded-xl bg-white px-5 py-3 text-sm font-semibold
                text-gray-900 shadow-lg transition hover:bg-gray-100 active:scale-[0.98]"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Login;