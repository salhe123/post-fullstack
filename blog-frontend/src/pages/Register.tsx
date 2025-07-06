import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { register } from "../services/auth.service";
import { useAuthStore } from "../store/authStore";

const Register = () => {
  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  const handleRegister = async (
    email: string,
    password: string,
    name?: string
  ) => {
    const response = await register(email, name!, password);
    setUser({ email, token: response.accessToken, role: "USER" });
    navigate("/");
  };

  return <AuthForm title="Register" onSubmit={handleRegister} isRegister />;
};

export default Register;
