import { useRef, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axiosInstance";
import { AuthContext } from "../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.get(
        `/api/users?email=${emailRef.current.value}&password=${passwordRef.current.value}`
      );

      if (res.data.length === 0) {
        toast.error("Invalid email or password");
      } else {
        login(res.data[0]);
        toast.success("Login successful");
        navigate("/dashboard");
      }
    } catch {
      toast.error("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-200 via-green-200 to-blue-300 px-4">
      <div className="backdrop-blur-xl bg-white/40 shadow-2xl rounded-2xl p-8 w-full max-w-md border border-white/30">

        <h2 className="text-3xl font-bold text-center mb-6">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            ref={emailRef}
            type="email"
            placeholder="Email address"
            required
            className="input"
          />

          <div className="relative">
            <input
              ref={passwordRef}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="input pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3 text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-white py-2.5 rounded-lg font-semibold">
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-5">If you don't have an account, ask your admin to create one.</p>
      </div>
    </div>
  );
};

export default Login;
