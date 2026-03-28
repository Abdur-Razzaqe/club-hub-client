import { motion } from "framer-motion";
import {
  FaCalendarCheck,
  FaPlusCircle,
  FaSearch,
  FaUsers,
} from "react-icons/fa";
import { useTheme } from "../../contexts/ThemeContext/ThemeContext";

const steps = [
  {
    icon: <FaSearch size={32} />,
    title: "Find Clubs",
    desc: "Search clubs based on your interests and passions.",
    color: "from-teal-400 to-blue-500",
  },
  {
    icon: <FaUsers size={32} />,
    title: "Join Communities",
    desc: "Connect with like-minded people effortlessly.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: <FaPlusCircle size={32} />,
    title: "Create a Club",
    desc: "Start your own club and lead the community.",
    color: "from-purple-500 to-violet-500",
  },
  {
    icon: <FaCalendarCheck size={32} />,
    title: "Attend Events",
    desc: "Join exciting events organized by premium clubs.",
    color: "from-orange-400 to-red-500",
  },
];

const HowItWorks = () => {
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
            How ClubHub Works
          </h2>
          <div className="h-1.5 w-32 bg-gradient-to-r from-teal-400 to-blue-500 mx-auto rounded-full"></div>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="relative group p-[1.5px] rounded-3xl overflow-hidden flex h-full shadow-xl"
            >
              {/* --- DYNAMIC TRACING BORDER --- */}
              <div
                className={`absolute inset-[-1000%] animate-border-trace ${
                  isDark
                    ? `bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#ec4899_50%,transparent_100%)]`
                    : `bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#0d9488_50%,transparent_100%)]`
                }`}
              />

              {/* Card Body */}
              <div
                className={`relative flex flex-col w-full p-8 rounded-[22px] transition-all duration-300 ${
                  isDark ? "bg-[#0b041a]/95 backdrop-blur-xl" : "bg-white"
                }`}
              >
                {/* Icon Circle */}
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:rotate-[360deg] shadow-lg bg-gradient-to-br ${step.color} text-white`}
                >
                  {step.icon}
                </div>

                <div className="flex-grow">
                  <h3
                    className={`text-2xl font-black mb-3 tracking-tight ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed font-medium ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {step.desc}
                  </p>
                </div>

                {/* Step Number Badge */}
                <div className="mt-8 flex items-center gap-2">
                  <span
                    className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest ${
                      isDark
                        ? "bg-white/10 text-teal-400"
                        : "bg-gray-100 text-teal-600"
                    }`}
                  >
                    Step 0{index + 1}
                  </span>
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

export default HowItWorks;
