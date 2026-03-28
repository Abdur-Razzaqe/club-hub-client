import React from "react";
import { Link } from "react-router-dom";
import logoImg from "../../assets/logos.png";
import { useTheme } from "../../contexts/ThemeContext/ThemeContext";

const Logo = () => {
  const { isDark } = useTheme();

  return (
    <Link to="/" className="flex items-center gap-2 group">
      <img
        src={logoImg}
        alt="ClubHub Logo"
        className={`w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-110 ${
          isDark ? "brightness-110" : "brightness-100"
        }`}
      />

      <h3
        className={`text-3xl font-black tracking-tighter transition-colors duration-500 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        Club<span className="text-teal-500">Hub</span>
      </h3>
    </Link>
  );
};

export default Logo;
