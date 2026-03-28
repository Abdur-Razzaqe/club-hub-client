import { useEffect, useState } from "react";
import {
  FaUsers,
  FaBuilding,
  FaCalendarAlt,
  FaUserCheck,
} from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext/ThemeContext";
import CountUp from "react-countup";

const HomeStatistics = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState(null);
  const { isDark } = useTheme();

  useEffect(() => {
    axiosSecure.get("/home/stats").then((res) => {
      setStats(res.data);
    });
  }, [axiosSecure]);

  if (!stats) return null;

  const statItems = [
    {
      icon: <FaUsers />,
      label: "Active Members",
      value: stats.totalUsers,
      color: "from-blue-500 to-cyan-400",
    },
    {
      icon: <FaBuilding />,
      label: "Total Clubs",
      value: stats.totalClubs,
      color: "from-teal-500 to-emerald-400",
    },
    {
      icon: <FaCalendarAlt />,
      label: "Events Hosted",
      value: stats.totalEvents,
      color: "from-pink-500 to-rose-400",
    },
    {
      icon: <FaUserCheck />,
      label: "Memberships",
      value: stats.totalMemberships,
      color: "from-purple-500 to-violet-400",
    },
  ];

  return (
    <section
      className={`py-24 transition-colors duration-300 ${isDark ? "bg-[#05010d]" : "bg-white"}`}
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
            className={`text-5xl font-black tracking-tighter uppercase mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
          >
            ClubHub{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
              In Numbers
            </span>
          </h2>
          <div className="h-1.5 w-32 bg-teal-500 mx-auto rounded-full"></div>
        </motion.div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group p-[1.5px] rounded-3xl overflow-hidden"
            >
              {/* --- TRACING BORDER --- */}
              <div
                className={`absolute inset-[-1000%] animate-border-trace ${
                  isDark
                    ? "bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#ec4899_50%,transparent_100%)]"
                    : "bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#0d9488_50%,transparent_100%)]"
                }`}
              />

              <div
                className={`relative p-8 rounded-[22px] flex flex-col items-center text-center transition-all duration-300 ${
                  isDark
                    ? "bg-[#0b041a]/95 backdrop-blur-xl"
                    : "bg-white shadow-xl shadow-gray-100"
                }`}
              >
                {/* Icon Circle */}
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg bg-gradient-to-br ${item.color} transform group-hover:rotate-12 transition-transform duration-300`}
                >
                  <span className="text-3xl">{item.icon}</span>
                </div>

                {/* Counter */}
                <h3
                  className={`text-4xl font-black mb-2 ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  <CountUp
                    end={item.value}
                    duration={3}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                  +
                </h3>

                <p
                  className={`text-xs font-black uppercase tracking-widest ${isDark ? "text-gray-500" : "text-gray-400"}`}
                >
                  {item.label}
                </p>

                {/* Bottom Decorative Bar */}
                <div
                  className={`mt-6 h-1 w-12 rounded-full bg-gradient-to-r ${item.color} opacity-50 group-hover:w-24 transition-all duration-500`}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeStatistics;
