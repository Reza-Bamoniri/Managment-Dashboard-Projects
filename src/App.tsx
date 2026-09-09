import { Toaster } from "sonner";
import AppRoutes from "./routes/AppRoutes";

import { useEffect } from "react";
import { useAppDispatch } from "./store/hooks";
import { restoreSession, logout } from "./features/auth/authSlice";
import { fetchUsers } from "./features/users/usersSlice";

function App() {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());

    const userId = localStorage.getItem("userId");
    const loginTime = localStorage.getItem("loginTime");

    if (!userId || !loginTime) {
     dispatch(logout());
      return;
}

    const SESSION_DURATION = 24 * 60 * 60 * 1000;
    const isSessionValid =
      Date.now() - Number(loginTime) < SESSION_DURATION;

    if (isSessionValid) {
      dispatch(restoreSession(userId));
    } else {
      localStorage.removeItem("userId");
      localStorage.removeItem("loginTime");
      dispatch(logout());
    }
  }, [dispatch]);

  return (

    <>
    <AppRoutes />

    <Toaster position="top-center" richColors closeButton/>
    </>

) 


}

export default App;