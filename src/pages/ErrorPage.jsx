import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext/ThemeContext";
import { MoveLeft, Home, AlertCircle } from "lucide-react";

const ErrorPage = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  return (
    <section
      className={`min-h-screen flex items-center justify-center px-6 transition-colors duration-700 ${
        isDark ? "bg-[#050505]" : "bg-gray-50"
      }`}
    >
      {/* Background Water Bubbles (for dark mode) */}
      {isDark && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 blur-[130px] rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 blur-[130px] rounded-full"></div>
        </div>
      )}

      <div className="max-w-md w-full relative">
        {/* Error Card with Glass Effect */}
        <div
          className={`relative rounded-[40px] p-10 text-center transition-all duration-500 border ${
            isDark
              ? "bg-white/[0.02] backdrop-blur-3xl border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              : "bg-white/80 backdrop-blur-xl border-white shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
          }`}
        >
          {/* Animated Icon Container */}
          <div className="flex justify-center mb-6">
            <div
              className={`p-5 rounded-3xl animate-bounce ${
                isDark ? "bg-red-500/10 text-red-400" : "bg-red-50 text-red-500"
              }`}
            >
              <AlertCircle size={48} strokeWidth={1.5} />
            </div>
          </div>

          <h1
            className={`text-4xl font-black uppercase tracking-tighter ${isDark ? "text-white" : "text-gray-900"}`}
          >
            404 Lost!
          </h1>

          <p
            className={`mt-4 text-sm font-medium leading-relaxed ${isDark ? "text-gray-400" : "text-gray-500"}`}
          >
            It seems the page you are looking for has been moved or doesn't
            exist in our club records.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            {/* Go Back Button */}
            <button
              onClick={() => navigate(-1)}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl font-bold uppercase tracking-widest text-[10px] transition-all duration-300 border cursor-pointer ${
                isDark
                  ? "bg-white/5 border-white/10 text-white hover:bg-white/10"
                  : "bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <MoveLeft size={16} />
              Go Back
            </button>

            {/* Home Link - Fixed Syntax */}
            <Link
              to="/"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl font-bold uppercase tracking-widest text-[10px] text-white bg-gradient-to-r from-teal-500 to-blue-600 hover:shadow-[0_10px_20px_rgba(20,184,166,0.3)] hover:scale-[1.05] active:scale-95 transition-all cursor-pointer"
            >
              <Home size={16} />
              Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
