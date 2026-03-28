import React from "react";
import { X } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext/ThemeContext";

const Modal = ({ title, children, close }) => {
  const { isDark } = useTheme();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* --- Backdrop with Glassmorphism --- */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={close}
      />

      {/* --- Modal Container --- */}
      <div
        className={`relative w-full max-w-md overflow-hidden rounded-[24px] p-8 shadow-2xl transition-all transform border 
        ${
          isDark
            ? "bg-[#0b0514] border-white/10 text-white shadow-pink-500/10"
            : "bg-white border-gray-100 text-gray-900 shadow-xl"
        }`}
      >
        {/* Top Accent Line (Optional but adds premium feel) */}
        <div
          className={`absolute top-0 left-0 w-full h-1 ${isDark ? "bg-pink-600" : "bg-teal-600"}`}
        />

        {/* --- Close Button --- */}
        <button
          onClick={close}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors cursor-pointer
          ${
            isDark
              ? "hover:bg-white/10 text-gray-400 hover:text-white"
              : "hover:bg-gray-100 text-gray-500 hover:text-red-500"
          }`}
        >
          <X size={20} />
        </button>

        {/* --- Modal Header --- */}
        {title && (
          <h3
            className={`text-2xl font-black uppercase tracking-tight mb-6 
            ${isDark ? "text-pink-500" : "text-teal-700"}`}
          >
            {title}
          </h3>
        )}

        {/* --- Modal Content --- */}
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
