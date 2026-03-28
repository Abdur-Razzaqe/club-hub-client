import { motion } from "framer-motion";
import { FaBrain, FaCompass, FaHandshake, FaSmileBeam } from "react-icons/fa";
import { useTheme } from "../../contexts/ThemeContext/ThemeContext";

const benefits = [
  {
    icon: <FaSmileBeam size={35} />,
    title: "Make New Friends",
    desc: "Meet friendly people who share your interests and passions.",
    gradient: "from-blue-400 to-cyan-500",
  },
  {
    icon: <FaHandshake size={35} />,
    title: "Collaborate",
    desc: "Work on exciting projects with talented club members.",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    icon: <FaBrain size={35} />,
    title: "Learn & Grow",
    desc: "Improve your skills through engaging group activities.",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: <FaCompass size={35} />,
    title: "Explore More",
    desc: "Get access to new events, places, and unique opportunities.",
    gradient: "from-amber-400 to-orange-500",
  },
];

const WhyJoin = () => {
  const { isDark } = useTheme();

  return (
    <section
      className={`py-24 transition-colors duration-300 ${
        isDark ? "bg-[#05010d]" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2
            className={`text-5xl font-black tracking-tighter uppercase mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Why Join a Club?
          </h2>
          <div className="h-1.5 w-32 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full"></div>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -12 }}
              className="relative group p-[1.5px] rounded-3xl overflow-hidden flex h-full"
            >
              {/* --- DYNAMIC TRACING BORDER --- */}
              <div
                className={`absolute inset-[-1000%] animate-border-trace ${
                  isDark
                    ? "bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#ec4899_50%,transparent_100%)]"
                    : "bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#0d9488_50%,transparent_100%)]"
                }`}
              />

              {/* Card Body */}
              <div
                className={`relative flex flex-col w-full p-8 rounded-[22px] transition-all duration-300 ${
                  isDark
                    ? "bg-[#0b041a]/95 backdrop-blur-xl"
                    : "bg-white shadow-xl"
                }`}
              >
                {/* Icon Section with Soft Glow */}
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] bg-gradient-to-br ${item.gradient} text-white shadow-md`}
                >
                  {item.icon}
                </div>

                <div className="flex-grow">
                  <h3
                    className={`text-2xl font-black mb-3 tracking-tight ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed font-medium ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {item.desc}
                  </p>
                </div>

                {/* Decorative Bottom Line */}
                <div className="mt-8 flex items-center gap-2">
                  <div
                    className={`h-[3px] w-12 rounded-full bg-gradient-to-r ${item.gradient}`}
                  ></div>
                  <div
                    className={`h-[1px] flex-grow rounded-full ${isDark ? "bg-white/10" : "bg-gray-100"}`}
                  ></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyJoin;
