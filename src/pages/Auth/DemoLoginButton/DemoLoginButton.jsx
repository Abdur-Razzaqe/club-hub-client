import React from "react";
import { Sparkles } from "lucide-react";
import { useTheme } from "../../../contexts/ThemeContext/ThemeContext";

const DemoLoginButton = ({ setEmail, setPassword }) => {
  const { isDark } = useTheme();

  const demoUser = {
    email: "demo@clubhub.com",
    password: "Ab@1234",
  };

  const handleDemoLogin = () => {
    setEmail(demoUser.email);
    setPassword(demoUser.password);
  };

  return (
    <button
      type="button"
      onClick={handleDemoLogin}
      className={`group relative w-full mt-4 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all duration-500 border cursor-pointer ${
        isDark
          ? "bg-white/5 border-white/10 text-teal-400 hover:bg-teal-500/10 hover:border-teal-500/50"
          : "bg-teal-50 border-teal-100 text-teal-700 hover:bg-teal-100 hover:border-teal-200"
      } active:scale-95 overflow-hidden`}
    >
      {/* Background Glow Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-teal-500/5 to-teal-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

      <Sparkles size={16} className="group-hover:animate-pulse" />
      <span>Try Demo Access</span>

      {/* Subtle Bottom Reflection */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-teal-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </button>
  );
};

export default DemoLoginButton;
