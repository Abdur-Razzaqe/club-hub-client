import React from "react";
import { useNavigate } from "react-router-dom"; // Change: react-router-dom
import { motion } from "framer-motion";
import { XCircle, RefreshCcw, LayoutDashboard, Home } from "lucide-react";
import { useTheme } from "../../../contexts/ThemeContext/ThemeContext";

const PaymentCancel = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-500 ${
        isDark ? "bg-[#0b0514]" : "bg-red-50/30"
      }`}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`max-w-md w-full rounded-[40px] p-10 text-center border shadow-2xl ${
          isDark
            ? "bg-white/5 border-white/10 backdrop-blur-xl"
            : "bg-white border-red-100"
        }`}
      >
        {/* Animated Error Icon */}
        <div className="relative w-fit mx-auto">
          <motion.div
            initial={{ rotate: -20, scale: 0.5 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          >
            <XCircle
              className="text-red-500 mx-auto"
              size={100}
              strokeWidth={1.5}
            />
          </motion.div>
          <div className="absolute -inset-4 bg-red-500/10 blur-3xl rounded-full -z-10"></div>
        </div>

        <h2
          className={`text-3xl font-black uppercase tracking-tight mt-8 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Payment <span className="text-red-500">Cancelled</span>
        </h2>

        <p
          className={`mt-3 font-medium leading-relaxed ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Your transaction was not completed. <br />
          Don't worry, no funds were deducted.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 space-y-3">
          <button
            onClick={() => navigate(-1)}
            className="w-full py-4 rounded-2xl font-black uppercase tracking-widest text-white bg-gradient-to-r from-red-500 to-rose-600 hover:shadow-lg hover:shadow-red-500/20 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <RefreshCcw
              size={18}
              className="group-hover:rotate-180 transition-transform duration-500"
            />
            Try Again
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate("/dashboard/overview")}
              className={`py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 border cursor-pointer ${
                isDark
                  ? "text-gray-400 border-white/10 hover:bg-white/5"
                  : "text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
            >
              <LayoutDashboard size={14} /> Dashboard
            </button>
            <button
              onClick={() => navigate("/")}
              className={`py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 border cursor-pointer ${
                isDark
                  ? "text-gray-400 border-white/10 hover:bg-white/5"
                  : "text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
            >
              <Home size={14} /> Home
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentCancel;
