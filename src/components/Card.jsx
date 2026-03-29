import { Link } from "react-router";
import { useTheme } from "../contexts/ThemeContext/ThemeContext";
import { motion } from "framer-motion";

const Card = ({ club }) => {
  const { isDark } = useTheme();

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="relative group p-[1.5px] rounded-3xl overflow-hidden flex h-full transition-all duration-300"
    >
      {/* --- TRACING LIGHT BORDER --- */}
      <div
        className={`absolute inset-[-1000%] animate-border-trace ${
          isDark
            ? "bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#ec4899_50%,transparent_100%)]"
            : "bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#0d9488_50%,transparent_100%)]"
        }`}
      />

      {/* Card Body */}
      <div
        className={`relative flex flex-col w-full p-5 rounded-[22px] transition-all duration-300 ${
          isDark
            ? "bg-[#05010d]/95 backdrop-blur-xl"
            : "bg-white border border-gray-100"
        }`}
      >
        {/* Banner Image */}
        <div className="relative h-40 w-full overflow-hidden rounded-xl mb-4">
          <img
            src={club.bannerImage}
            alt={club.clubName}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Content Section with flex-grow to push button down */}
        <div className="flex-grow">
          <h3
            className={`text-xl font-bold mb-2 line-clamp-1 ${isDark ? "text-white" : "text-gray-800"}`}
          >
            {club.clubName}
          </h3>
          <p
            className={`text-sm line-clamp-2 mb-4 leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            {club.description}
          </p>

          <div className="flex items-center gap-2 mb-6 text-xs font-bold opacity-60">
            <span
              className={`px-2 py-1 rounded-md ${isDark ? "bg-white/10" : "bg-gray-100"}`}
            >
              {club.category}
            </span>
            <span>•</span>
            <span className="line-clamp-1">{club.location}</span>
          </div>
        </div>

        {/* --- BUTTON (ALWAYS AT BOTTOM) --- */}
        <Link
          to={`/clubs/${club._id}`}
          className="block relative p-[1.2px] rounded-xl overflow-hidden group/btn"
        >
          <div
            className={`absolute inset-[-1000%] animate-border-trace ${
              isDark
                ? "bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#ec4899_50%,transparent_100%)]"
                : "bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#0d9488_50%,transparent_100%)]"
            }`}
          />
          <button
            className={`relative w-full py-2.5 text-xs font-black uppercase tracking-widest rounded-[10px] transition-all duration-300 border-none outline-none cursor-pointer ${
              isDark
                ? "bg-black text-white group-hover/btn:bg-transparent"
                : "bg-white text-teal-600 group-hover/btn:bg-teal-600 group-hover/btn:text-white"
            }`}
          >
            Explore Club
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default Card;
