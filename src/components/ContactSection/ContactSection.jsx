import { motion } from "framer-motion";
import {
  FaFacebook,
  FaLinkedin,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaPaperPlane,
} from "react-icons/fa";
import { useTheme } from "../../contexts/ThemeContext/ThemeContext";
import { FaXTwitter } from "react-icons/fa6";

const ContactSection = () => {
  const { isDark } = useTheme();

  // Custom Input Style matching the Newsletter card in the image
  const inputStyles = `w-full px-6 py-4 rounded-2xl border transition-all duration-300 outline-none font-medium ${
    isDark
      ? "bg-[#110c1d] border-white/10 focus:border-pink-500 text-white placeholder:text-gray-500"
      : "bg-gray-50 border-gray-100 focus:border-teal-500 text-gray-900 placeholder:text-gray-400"
  }`;

  return (
    <section
      className={`py-24 transition-colors duration-300 ${isDark ? "bg-[#05010d]" : "bg-white"}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2
            className={`text-5xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9] ${isDark ? "text-white" : "text-gray-900"}`}
          >
            READY TO{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d2ff] to-[#3a7bd5]">
              CONNECT?
            </span>
          </h2>
          <div className="h-1.5 w-32 bg-gradient-to-r from-teal-400 to-blue-500 mt-4 rounded-full"></div>
        </motion.div>

        {/* Main Contact Container (Matching Image's Card Style) */}
        <div
          className={`relative grid md:grid-cols-5 rounded-[40px] overflow-hidden border ${
            isDark
              ? "bg-[#0a0516] border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
              : "bg-white border-gray-100 shadow-2xl shadow-gray-200"
          }`}
        >
          {/* LEFT SIDE: Info Panel */}
          <div className="md:col-span-2 relative p-12 text-white flex flex-col justify-between overflow-hidden bg-[#070310]">
            {/* Subtle Gradient Glow behind icons */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative z-10 space-y-12">
              <div>
                <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-10 text-teal-400">
                  Reach Us At
                </h3>
                <div className="space-y-8">
                  {[
                    {
                      icon: <FaMapMarkerAlt />,
                      detail: "ClubHub HQ, Dhaka, BD",
                    },
                    { icon: <FaEnvelope />, detail: "support@clubhub.com" },
                    { icon: <FaPhone />, detail: "+880 1952558684" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: 10 }}
                      className="flex items-center gap-6 group cursor-default"
                    >
                      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl group-hover:bg-gradient-to-br from-teal-400 to-blue-500 transition-all duration-300">
                        {item.icon}
                      </div>
                      <p className="font-bold text-lg opacity-80 group-hover:opacity-100 transition-opacity tracking-tight">
                        {item.detail}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Social Icons matching image's subtle style */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-6 text-teal-400">
                  Social Presence
                </h3>
                <div className="flex gap-4">
                  {[FaFacebook, FaLinkedin, FaXTwitter].map((Icon, idx) => (
                    <motion.a
                      key={idx}
                      whileHover={{ scale: 1.1, y: -5 }}
                      className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl hover:border-teal-500 transition-colors cursor-pointer"
                    >
                      <Icon
                        size={20}
                        className="text-white/70 hover:text-teal-400"
                      />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Form (Mirroring Newsletter Layout) */}
          <div className="md:col-span-3 p-12 lg:p-16 relative">
            {/* Animated Tracing Border (Only in Dark Mode) */}
            {isDark && (
              <div className="absolute inset-0 p-[1.5px] rounded-[40px] pointer-events-none opacity-40">
                <div className="absolute inset-[-1000%] animate-border-trace bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#ec4899_50%,transparent_100%)]"></div>
              </div>
            )}

            <div className="relative z-10">
              <h3
                className={`text-2xl font-black mb-8 uppercase tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}
              >
                Drop a{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
                  Note
                </span>
              </h3>

              <form className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <input
                    type="text"
                    placeholder="your name"
                    className={inputStyles}
                    required
                  />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className={inputStyles}
                    required
                  />
                </div>

                <input
                  type="text"
                  placeholder="subject"
                  className={inputStyles}
                />

                <textarea
                  rows="4"
                  placeholder="how can we help you?"
                  className={`${inputStyles} resize-none`}
                  required
                />

                {/* Submit Button - Exactly matching the image's gradient and style */}
                <motion.button
                  whileHover={{
                    scale: 1.02,
                    shadow: "0px 0px 20px rgba(0, 210, 255, 0.4)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#00d2ff] to-[#3a7bd5] text-white font-black uppercase tracking-[0.2em] text-xs py-5 rounded-2xl transition-all duration-300 cursor-pointer shadow-lg"
                >
                  SEND MESSAGE <FaPaperPlane />
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
