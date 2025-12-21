import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import Swal from "sweetalert2";
import LoadingSpinner from "../../Common/LoadingSpinner";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then(() => {
        navigate(location?.state || "/");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successfully!",
          text: "Welcome back to ClubHub.",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Login Failed!",
          text: "Invalid email or password.",
          confirmButtonText: "Please Try Again",
        });
      })
      .finally(() => setLoading(false));
  };
  if (loading) return <LoadingSpinner />;
  return (
    <div className=" bg-base-200 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-base-100 rounded-2xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h3 className="text-3xl font-bold text-teal-500">Welcome back</h3>
          <p className="text-sm text-gray-500 mt-1">
            Login to continue to ClubHub
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
          <fieldset className="fieldset">
            {/* email field */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input"
              placeholder="Enter your email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500 text-sm mt-1">Email is required</p>
            )}

            {/* Password field */}
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className="input"
              placeholder="Enter your password"
            />
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">Password must be 6 characters.</p>
            )}
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn w-[90%] px-4 bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white mt-4">
              {loading ? "Logging in..." : "Login"}
            </button>
          </fieldset>
        </form>

        <SocialLogin></SocialLogin>
        <p className=" text-center text-sm mt-6">
          New to ClubHub{" "}
          <Link
            state={location.state}
            className="text-teal-500 font-medium hover:underline"
            to="/register"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
