import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { login } from "../services/auth.service";
import { useAuthStore } from "../store/authStore";

const Login = () => {
  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    const response = await login(email, password);
    setUser({ email, token: response.accessToken, role: "USER" });
    navigate("/");
  };

  return <AuthForm title="Login" onSubmit={handleLogin} />;
};

export default Login;
