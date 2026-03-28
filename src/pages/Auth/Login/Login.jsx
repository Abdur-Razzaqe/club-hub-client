import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import Swal from "sweetalert2";
import LoadingSpinner from "../../Common/LoadingSpinner";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { useTheme } from "../../../contexts/ThemeContext/ThemeContext";
import Logo from "../../../components/Logo/Logo";
import DemoLoginButton from "../DemoLoginButton/DemoLoginButton";

const Login = () => {
  const { isDark } = useTheme();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = (data) => {
    setLoading(true);
    signInUser(data.email, data.password)
      .then(() => {
        navigate(location?.state || "/");
        Swal.fire({
          icon: "success",
          title: "Welcome Back!",
          background: isDark ? "#0a0a0a" : "#fff",
          color: isDark ? "#fff" : "#000",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(() => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Login Failed!",
          text: "Check your email and password.",
          background: isDark ? "#0a0a0a" : "#fff",
          color: isDark ? "#fff" : "#000",
        });
      });
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div
      className={`fixed inset-0 w-full h-full flex flex-col items-center justify-center px-4 transition-all duration-700 ease-in-out z-[999] ${
        isDark ? "bg-[#050505]" : "bg-gray-50"
      }`}
    >
      <div className="absolute top-8 left-8 z-20"></div>

      {isDark && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-teal-500/10 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full"></div>
        </div>
      )}

      <div className="max-w-md w-full relative group">
        {isDark && (
          <div className="absolute inset-0 p-[1px] rounded-[32px] overflow-hidden">
            <div className="absolute inset-[-1000%] animate-border-trace bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#14b8a6_50%,transparent_100%)] opacity-40" />
          </div>
        )}

        <div
          className={`relative rounded-[31px] p-8 md:p-10 transition-all duration-500 overflow-hidden ${
            isDark
              ? "bg-[#0c0c0c]/80 backdrop-blur-xl border border-white/5"
              : "bg-white border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
          }`}
        >
          <div className="text-center mb-10">
            <div className="flex items-center justify-center">
              <Logo />
            </div>
            <h3
              className={`text-3xl font-black uppercase tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Welcome Back
            </h3>
            <p
              className={`text-xs mt-2 font-bold uppercase tracking-widest ${isDark ? "text-gray-500" : "text-gray-400"}`}
            >
              Enter credentials to continue
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
            <div className="space-y-2">
              <label
                className={`text-[10px] font-black uppercase tracking-widest ml-1 ${isDark ? "text-gray-500" : "text-gray-400"}`}
              >
                Email Address
              </label>
              <div className="relative group/input">
                <Mail
                  className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${isDark ? "text-gray-600" : "text-gray-400"} group-focus-within/input:text-teal-500`}
                />
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className={`w-full pl-12 pr-4 py-4 rounded-2xl outline-none transition-all border-2 ${
                    isDark
                      ? "bg-[#111111] border-white/5 focus:border-teal-500/50 text-white"
                      : "bg-gray-50 border-gray-100 focus:border-teal-500 text-gray-900"
                  }`}
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                className={`text-[10px] font-black uppercase tracking-widest ml-1 ${isDark ? "text-gray-500" : "text-gray-400"}`}
              >
                Password
              </label>
              <div className="relative group/input">
                <Lock
                  className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${isDark ? "text-gray-600" : "text-gray-400"} group-focus-within/input:text-teal-500`}
                />
                <input
                  type="password"
                  {...register("password", { required: true, minLength: 6 })}
                  className={`w-full pl-12 pr-4 py-4 rounded-2xl outline-none transition-all border-2 ${
                    isDark
                      ? "bg-[#111111] border-white/5 focus:border-teal-500/50 text-white"
                      : "bg-gray-50 border-gray-100 focus:border-teal-500 text-gray-900"
                  }`}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button className="w-full py-4 rounded-2xl font-black cursor-pointer uppercase tracking-widest text-white bg-gradient-to-r from-teal-500 to-blue-600 hover:shadow-[0_10px_30px_rgba(20,184,166,0.3)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group/btn ">
              {loading ? "Verifying..." : "Sign In"}
              <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* --- ৩. Demo Login Button Section --- */}
          <div className="mt-6">
            <DemoLoginButton
              setEmail={(val) => setValue("email", val)}
              setPassword={(val) => setValue("password", val)}
            />
          </div>

          <div className="mt-8">
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div
                  className={`w-full border-t ${isDark ? "border-white/5" : "border-gray-100"}`}
                ></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest">
                <span
                  className={`px-4 ${isDark ? "bg-[#0c0c0c] text-gray-600" : "bg-white text-gray-400"}`}
                >
                  Or Login With
                </span>
              </div>
            </div>
            <SocialLogin />
          </div>

          <p
            className={`text-center text-sm mt-8 font-medium ${isDark ? "text-gray-500" : "text-gray-600"}`}
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-teal-500 font-bold hover:text-teal-400 transition-colors cursor-pointer"
            >
              Join Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
