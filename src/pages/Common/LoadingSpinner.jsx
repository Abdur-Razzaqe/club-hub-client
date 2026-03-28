import React from "react";
import { useTheme } from "../../contexts/ThemeContext/ThemeContext";

const LoadingSpinner = () => {
  const { isDark } = useTheme();

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen transition-colors duration-500 ${isDark ? "bg-[#05010d]" : "bg-gray-50"}`}
    >
      {/* --- Premium Spinner --- */}
      <div className="relative flex items-center justify-center">
        {/* Outer Glow (Only for Dark Mode) */}
        {isDark && (
          <div className="absolute w-20 h-20 bg-pink-500/20 blur-2xl rounded-full animate-pulse" />
        )}

        {/* Main Animated Border Spinner */}
        <div
          className={`w-16 h-16 rounded-full animate-spin border-4 border-solid 
          ${
            isDark
              ? "border-pink-500 border-t-transparent shadow-[0_0_15px_rgba(236,72,153,0.5)]"
              : "border-teal-600 border-t-transparent"
          }`}
        />

        {/* Center Dot or Logo Initial */}
        <div
          className={`absolute w-2 h-2 rounded-full ${isDark ? "bg-pink-400" : "bg-teal-500"}`}
        />
      </div>

      {/* --- Loading Text --- */}
      <p
        className={`mt-6 font-black uppercase tracking-[0.2em] text-sm animate-pulse ${isDark ? "text-pink-500" : "text-teal-700"}`}
      >
        Loading<span className="animate-bounce inline-block">.</span>
        <span className="animate-bounce inline-block [animation-delay:0.2s]">
          .
        </span>
        <span className="animate-bounce inline-block [animation-delay:0.4s]">
          .
        </span>
      </p>
    </div>
  );
};

export default LoadingSpinner;
