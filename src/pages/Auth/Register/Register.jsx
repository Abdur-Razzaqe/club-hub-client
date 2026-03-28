import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useTheme } from "../../../contexts/ThemeContext/ThemeContext";
import { Mail, Lock, User, Camera, ArrowRight } from "lucide-react";
import Logo from "../../../components/Logo/Logo";
import LoadingSpinner from "../../Common/LoadingSpinner";

const Register = () => {
  const { isDark } = useTheme();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const handleRegistration = async (data) => {
    setLoading(true);
    const profileImg = data.photo[0];

    try {
      // image upload from client to imgbb
      const formData = new FormData();
      formData.append("image", profileImg);
      const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

      const imgRes = await axios.post(image_API_URL, formData);
      const photoURL = imgRes.data.data.url;

      // firebase authentication user creation
      await registerUser(data.email, data.password);

      // firebase profile update (Name & Photo)
      await updateUserProfile(data.name, photoURL);

      // database user creation
      const userInfo = { email: data.email, displayName: data.name, photoURL };
      await axiosSecure.post("/users", userInfo);

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "Welcome to ClubHub family.",
        background: isDark ? "#0a0a0a" : "#fff",
        color: isDark ? "#fff" : "#000",
        showConfirmButton: false,
        timer: 2000,
      });

      reset();
      navigate(location.state || "/");
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message,
        background: isDark ? "#0a0a0a" : "#fff",
        color: isDark ? "#fff" : "#000",
      });
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div
      className={`fixed inset-0 w-full h-full flex flex-col items-center justify-center px-4 transition-all duration-700 ease-in-out z-[999] overflow-y-auto py-10 ${
        isDark ? "bg-[#050505]" : "bg-gray-50"
      }`}
    >
      {isDark && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-teal-500/10 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full"></div>
        </div>
      )}

      {/* Registration Card */}
      <div className="max-w-xl w-full relative group mt-16 mb-8">
        {/* animated border tracing */}
        {isDark && (
          <div className="absolute inset-0 p-[1px] rounded-[32px] overflow-hidden">
            <div className="absolute inset-[-1000%] animate-border-trace bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#14b8a6_50%,transparent_100%)] opacity-30" />
          </div>
        )}

        <div
          className={`relative rounded-[31px] p-8 md:p-10 transition-all duration-500 ${
            isDark
              ? "bg-[#0c0c0c]/80 backdrop-blur-xl border border-white/5 shadow-2xl"
              : "bg-white border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
          }`}
        >
          <div className="text-center mb-8">
            <div
              className={` flex items-center justify-center 
            }`}
            >
              <Logo />
            </div>
            <h3
              className={`text-3xl font-black uppercase tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Create Account
            </h3>
            <p
              className={`text-xs mt-2 font-bold uppercase tracking-widest ${isDark ? "text-gray-500" : "text-gray-400"}`}
            >
              Join ClubHub Community Today
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleRegistration)}
            className="space-y-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Name Field */}
              <div className="space-y-2">
                <label
                  className={`text-[10px] font-black uppercase tracking-widest ml-1 ${isDark ? "text-gray-500" : "text-gray-400"}`}
                >
                  Full Name
                </label>
                <div className="relative group/input">
                  <User
                    className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${isDark ? "text-gray-600" : "text-gray-400"} group-focus-within/input:text-teal-500`}
                  />
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    className={`w-full pl-11 pr-4 py-3.5 rounded-2xl outline-none border-2 transition-all ${isDark ? "bg-[#111111] border-white/5 focus:border-teal-500/50 text-white" : "bg-gray-50 border-gray-100 focus:border-teal-500 text-gray-900"}`}
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Photo Upload Field */}
              <div className="space-y-2">
                <label
                  className={`text-[10px] font-black uppercase tracking-widest ml-1 ${isDark ? "text-gray-500" : "text-gray-400"}`}
                >
                  Profile Photo
                </label>
                <div className="relative group/input">
                  <Camera
                    className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${isDark ? "text-gray-600" : "text-gray-400"} group-focus-within/input:text-teal-500`}
                  />
                  <input
                    type="file"
                    {...register("photo", { required: true })}
                    className={`w-full pl-11 pr-4 py-[9px] rounded-2xl outline-none border-2 transition-all file:hidden cursor-pointer ${isDark ? "bg-[#111111] border-white/5 focus:border-teal-500/50 text-white" : "bg-gray-50 border-gray-100 focus:border-teal-500 text-gray-900"}`}
                  />
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label
                className={`text-[10px] font-black uppercase tracking-widest ml-1 ${isDark ? "text-gray-500" : "text-gray-400"}`}
              >
                Email Address
              </label>
              <div className="relative group/input">
                <Mail
                  className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${isDark ? "text-gray-600" : "text-gray-400"} group-focus-within/input:text-teal-500`}
                />
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className={`w-full pl-11 pr-4 py-3.5 rounded-2xl outline-none border-2 transition-all ${isDark ? "bg-[#111111] border-white/5 focus:border-teal-500/50 text-white" : "bg-gray-50 border-gray-100 focus:border-teal-500 text-gray-900"}`}
                  placeholder="name@company.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                className={`text-[10px] font-black uppercase tracking-widest ml-1 ${isDark ? "text-gray-500" : "text-gray-400"}`}
              >
                Password
              </label>
              <div className="relative group/input">
                <Lock
                  className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${isDark ? "text-gray-600" : "text-gray-400"} group-focus-within/input:text-teal-500`}
                />
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern:
                      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                  })}
                  className={`w-full pl-11 pr-4 py-3.5 rounded-2xl outline-none border-2 transition-all ${isDark ? "bg-[#111111] border-white/5 focus:border-teal-500/50 text-white" : "bg-gray-50 border-gray-100 focus:border-teal-500 text-gray-900"}`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="text-[9px] text-red-500 px-2 leading-tight">
                  Must be 6+ characters with Uppercase, Lowercase, Number &
                  Symbol.
                </p>
              )}
            </div>

            <button className="w-full py-4 rounded-2xl font-black uppercase tracking-widest text-white bg-gradient-to-r from-teal-500 to-blue-600 hover:shadow-[0_10px_30px_rgba(20,184,166,0.3)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group/btn cursor-pointer">
              Register Now
              <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Social Section */}
          <div className="mt-8">
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div
                  className={`w-full border-t ${isDark ? "border-white/5" : "border-gray-100"}`}
                ></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest">
                <span
                  className={`px-4 ${isDark ? "bg-[#0c0c0c] text-gray-600" : "bg-white text-gray-400"}`}
                >
                  Quick Sign Up
                </span>
              </div>
            </div>
            <SocialLogin />
          </div>

          <p
            className={`text-center text-sm mt-8 font-medium ${isDark ? "text-gray-500" : "text-gray-600"}`}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-teal-500 font-bold hover:text-teal-400 transition-colors"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
