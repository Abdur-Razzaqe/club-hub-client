import { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext/ThemeContext";
import { FaPaperPlane, FaRocket, FaGlobe } from "react-icons/fa";

const CTASection = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const { isDark } = useTheme();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSuccess(true);
    setEmail("");
  };

  return (
    <section
      className={`py-24 transition-colors duration-300 ${
        isDark ? "bg-[#05010d]" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Main CTA Container */}
        <div
          className={`relative overflow-hidden rounded-[40px] p-8 md:p-16 border ${
            isDark
              ? "border-white/10 bg-[#0b041a]/50"
              : "border-gray-100 bg-gray-50 shadow-2xl shadow-gray-200"
          }`}
        >
          {/* Background Decorative Circles */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-teal-500/20 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
            {/* CTA Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2
                className={`text-5xl md:text-6xl font-black tracking-tighter uppercase mb-6 leading-[0.9] ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Ready to Build Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
                  Community?
                </span>
              </h2>
              <p
                className={`text-lg mb-10 font-medium ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                Join ClubHub today to explore clubs, manage events, and connect
                with people who share your passion. Your journey starts here.
              </p>

              <div className="flex flex-wrap gap-5">
                <Link
                  to="/register"
                  className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-black uppercase tracking-widest text-xs px-10 py-5 rounded-2xl hover:shadow-[0_0_30px_rgba(20,184,166,0.4)] transition-all duration-300"
                >
                  Get Started{" "}
                  <FaRocket className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/clubs"
                  className={`inline-flex items-center gap-3 border-2 font-black uppercase tracking-widest text-xs px-10 py-5 rounded-2xl transition-all duration-300 ${
                    isDark
                      ? "border-white/10 text-white hover:bg-white/10"
                      : "border-gray-200 text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  Explore Clubs <FaGlobe />
                </Link>
              </div>
            </motion.div>

            {/* Newsletter Subscription Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* --- TRACING BORDER --- */}
              <div
                className={`absolute inset-[-1.5px] rounded-[30px] overflow-hidden ${
                  isDark ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                } transition-opacity duration-500`}
              >
                <div
                  className={`absolute inset-[-1000%] animate-border-trace ${
                    isDark
                      ? "bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#ec4899_50%,transparent_100%)]"
                      : "bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#0d9488_50%,transparent_100%)]"
                  }`}
                />
              </div>

              <div
                className={`relative p-8 md:p-12 rounded-[29px] h-full ${
                  isDark
                    ? "bg-[#05010d]/90 backdrop-blur-xl"
                    : "bg-white shadow-2xl shadow-teal-900/10"
                }`}
              >
                <h3
                  className={`text-2xl font-black uppercase tracking-tight mb-3 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Newsletter
                </h3>
                <p
                  className={`mb-8 font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}
                >
                  Get updates about new clubs, upcoming events, and exclusive
                  features.
                </p>

                {success ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-green-500/10 border border-green-500/50 text-green-500 text-center font-bold"
                  >
                    🚀 Subscription Successful!
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-4">
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className={`w-full px-6 py-4 rounded-xl border-2 transition-all outline-none font-bold ${
                          isDark
                            ? "bg-white/5 border-white/10 focus:border-pink-500 text-white"
                            : "bg-gray-50 border-gray-100 focus:border-teal-500 text-gray-900"
                        }`}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-teal-400 to-blue-500 hover:scale-[1.02] active:scale-95 text-white font-black uppercase tracking-widest text-xs py-5 rounded-xl transition-all cursor-pointer shadow-lg shadow-teal-500/20"
                    >
                      Subscribe Now <FaPaperPlane />
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
