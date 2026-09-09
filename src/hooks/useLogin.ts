import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loginUserThunk } from "../features/auth/authSlice";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";

const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

function useLogin() {
  const dispatch = useAppDispatch();

  const { loading, error } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data: LoginFormData) => {
  try {
    const user = await dispatch(loginUserThunk(data)).unwrap();

    localStorage.setItem("userId", user.id);
    localStorage.setItem("loginTime", Date.now().toString());

    navigate("/");
  } catch (error) {
    console.error("Login failed:", error);
  }
};

  return {
    register,
    handleSubmit,
    errors,
    handleLogin,
    loading,
    error,
  };
}

export default useLogin;