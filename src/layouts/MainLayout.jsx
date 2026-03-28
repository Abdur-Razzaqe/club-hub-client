import React from "react";
import { Outlet } from "react-router";
import Footer from "../components/Shared/Footer/Footer";
import Navbar from "../components/Shared/Navbar/Navbar";
import { useTheme } from "../contexts/ThemeContext/ThemeContext";
import { motion, useScroll, useSpring } from "framer-motion";

const MainLayout = () => {
  const { isDark } = useTheme();

  // Progress Bar Logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      className={`relative transition-colors duration-500 min-h-screen font-sans overflow-x-hidden ${
        isDark ? "bg-[#05010d] text-white" : "bg-[#fcfcfd] text-gray-900"
      }`}
    >
      {/* --- 1. DYNAMIC MESH BACKGROUND --- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div
          className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[150px] opacity-20 animate-pulse ${
            isDark ? "bg-pink-600/40" : "bg-teal-400/30"
          }`}
        ></div>
        <div
          className={`absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[150px] opacity-20 animate-pulse delay-1000 ${
            isDark ? "bg-blue-600/40" : "bg-indigo-400/30"
          }`}
        ></div>
      </div>

      {/* --- 2. SCROLL PROGRESS BAR --- */}
      <motion.div
        className={`fixed top-0 left-0 right-0 h-1 z-[100] origin-left ${
          isDark
            ? "bg-gradient-to-r from-pink-500 to-rose-400"
            : "bg-gradient-to-r from-teal-500 to-blue-500"
        }`}
        style={{ scaleX }}
      />

      {/* --- 3. STICKY GLASS NAVBAR --- */}

      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4 pointer-events-none">
        <div className="max-w-7xl w-full pointer-events-auto">
          <Navbar />
        </div>
      </header>

      {/* --- 4. MAIN CONTENT AREA --- */}

      <main className="max-w-7xl mx-auto pt-24 pb-12 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-100px)] relative z-10">
        <Outlet />
      </main>

      {/* --- 5. FOOTER --- */}
      <footer className="relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <Footer />
        </div>
      </footer>

      {/* --- CUSTOM SCROLLBAR CSS --- */}
      <style>{`
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: ${isDark ? "#05010d" : "#fcfcfd"};
        }
        ::-webkit-scrollbar-thumb {
          background: ${isDark ? "linear-gradient(#ec4899, #8b5cf6)" : "linear-gradient(#0d9488, #3b82f6)"};
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default MainLayout;
