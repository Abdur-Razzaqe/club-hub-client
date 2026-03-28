import { motion } from "framer-motion";
import { Link } from "react-router";
import { useTheme } from "../../../contexts/ThemeContext/ThemeContext";

const HeroSection = () => {
  const { isDark } = useTheme();

  return (
    <section
      className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-500 py-10 
      ${isDark ? "bg-[#05010d] text-white" : "bg-white text-gray-900"}`}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        {isDark && (
          <>
            <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-900/20 blur-[130px] rounded-full animate-pulse" />
            <div className="absolute bottom-[0%] right-[-5%] w-[500px] h-[500px] bg-blue-900/20 blur-[130px] rounded-full animate-pulse [animation-delay:2s]" />
          </>
        )}

        <div
          className={`absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%),linear-gradient(90deg,rgba(255,0,0,0.04),rgba(0,255,0,0.02),rgba(0,0,255,0.04))] bg-[size:100%_3px,4px_100%] ${isDark ? "opacity-20" : "opacity-5"}`}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left: Content */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h4
            initial={{ letterSpacing: "0px", opacity: 0 }}
            animate={{ letterSpacing: "4px", opacity: 1 }}
            className={`font-bold uppercase text-xs mb-4 tracking-[4px] ${isDark ? "text-pink-500" : "text-teal-600"}`}
          >
            Welcome to the Hub
          </motion.h4>

          <motion.h1
            className="text-6xl md:text-7xl font-black uppercase leading-[1.1] mb-6"
            style={{
              textShadow: isDark ? "0 0 20px rgba(255,255,255,0.1)" : "none",
            }}
          >
            LET'S <br />
            <span
              className={`text-transparent bg-clip-text ${isDark ? "bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500" : "bg-gradient-to-r from-teal-600 to-blue-600"}`}
            >
              CONNECT
            </span>{" "}
            <br />
            THE CLUBS
          </motion.h1>

          <motion.p
            className={`mt-6 text-lg max-w-md border-l-4 pl-4 leading-relaxed ${isDark ? "text-gray-400 border-pink-500" : "text-gray-600 border-teal-500"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Experience the best music, events, and communities. Join the elite
            network of clubs and start your journey tonight.
          </motion.p>

          <div className="mt-10 flex flex-wrap gap-5">
            {/* --- Primary Button: Join a Club --- */}
            <Link
              to="/clubs"
              className="relative p-[2px] overflow-hidden group inline-block rounded-none transition-transform active:scale-95"
            >
              {/* Moving Border Trace: Dark-e Neon Pink/Cyan ar Light-e Deep Teal */}
              <div
                className={`absolute inset-[-500%] animate-border-trace ${
                  isDark
                    ? "bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#ff007f_40%,#00f2ff_50%,transparent_100%)]"
                    : "bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#0d9488_40%,#6366f1_50%,transparent_100%)]"
                }`}
              />

              <div
                className={`relative px-10 py-4 font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${
                  isDark
                    ? "bg-[#05010d] text-white group-hover:bg-transparent"
                    : "bg-white text-gray-900 group-hover:bg-teal-600 group-hover:text-white"
                }`}
              >
                <span className="relative z-10">Join a Club</span>
                {/* Hover Glow Effect */}
                {isDark && (
                  <div className="absolute inset-0 bg-pink-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </div>
            </Link>

            {/* --- Secondary Button: Create Club --- */}
            <Link
              to="/login"
              className="relative p-[2px] overflow-hidden group inline-block rounded-none transition-transform active:scale-95"
            >
              {/* Border: Silver/White in Dark, Grey in Light */}
              <div
                className={`absolute inset-[-500%] animate-border-trace ${
                  isDark
                    ? "bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#ff007f_40%,#00f2ff_50%,transparent_100%)]"
                    : "bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#0d9488_40%,#6366f1_50%,transparent_100%)]"
                }`}
              />

              <div
                className={`relative px-10 py-4 font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${
                  isDark
                    ? "bg-[#05010d] text-white group-hover:bg-transparent"
                    : "bg-white text-gray-900 group-hover:bg-teal-600 group-hover:text-white"
                }`}
              >
                Create Club
              </div>
            </Link>
          </div>
        </motion.div>

        {/* Right: Image Section */}
        <motion.div
          className="relative group"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div
            className={`absolute -inset-2 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-1000 ${isDark ? "bg-gradient-to-r from-pink-500 to-purple-600" : "bg-teal-400"}`}
          />

          <div
            className={`relative p-2 rounded-lg ${isDark ? "bg-black" : "bg-white shadow-xl"}`}
          >
            <motion.img
              src="https://i.ibb.co.com/zhX7vfv5/nana-aja-ai-generated-8594666-1920.jpg"
              alt="Club Life"
              className={`w-full h-auto rounded-sm transition-all duration-700 ${isDark ? "grayscale-[30%] group-hover:grayscale-0" : "grayscale-0"}`}
              animate={
                isDark
                  ? {
                      filter: [
                        "hue-rotate(0deg)",
                        "hue-rotate(15deg)",
                        "hue-rotate(0deg)",
                      ],
                    }
                  : {}
              }
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
