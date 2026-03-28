import React from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext/ThemeContext";

const AuthLayout = () => {
  const { isDark } = useTheme();

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-500 ${
        isDark ? "bg-[#050505]" : "bg-white"
      }`}
    >
      <div className="flex items-center justify-center min-h-[calc(100vh-100px)] relative z-10">
        <div className="w-full">
          <Outlet />
        </div>
      </div>

      {isDark && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-teal-500/5 blur-[120px] rounded-full opacity-30"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[120px] rounded-full opacity-30"></div>
        </div>
      )}
    </div>
  );
};

export default AuthLayout;
