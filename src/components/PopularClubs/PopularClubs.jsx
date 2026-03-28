import { motion } from "framer-motion";
import { Link } from "react-router";
import { useTheme } from "../../contexts/ThemeContext/ThemeContext";
import { FaUsers, FaArrowRight } from "react-icons/fa";

// Note: Real project-e ekhane useQuery diye backend theke
// data niye asha hobe (e.g., axios.get('/popular-clubs'))
const popularClubs = [
  {
    _id: "1",
    clubName: "Tech Innovators Club",
    category: "Technology",
    membersCount: 320,
    bannerImage: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7",
  },
  {
    _id: "2",
    clubName: "Fitness Freaks",
    category: "Health & Fitness",
    membersCount: 210,
    bannerImage: "https://images.unsplash.com/photo-1549576490-b0b4831ef60a",
  },
  {
    _id: "3",
    clubName: "Photography Lovers",
    category: "Photography",
    membersCount: 185,
    bannerImage: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
  },
  {
    _id: "4",
    clubName: "Music Vibes",
    category: "Music",
    membersCount: 260,
    bannerImage: "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
  },
];

const PopularClubs = () => {
  const { isDark } = useTheme();

  return (
    <section
      className={`py-24 transition-colors duration-300 ${
        isDark ? "bg-[#05010d]" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <h2
              className={`text-5xl font-black tracking-tighter uppercase ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Popular{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
                Clubs
              </span>
            </h2>
            <div className="h-1.5 w-24 bg-teal-500 rounded-full"></div>
            <p
              className={`max-w-md pt-2 font-medium ${isDark ? "text-gray-400" : "text-gray-600"}`}
            >
              Join the most active and engaging communities on ClubHub and
              expand your network.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              to="/clubs"
              className="group flex items-center gap-2 font-black uppercase tracking-widest text-xs py-3 px-6 rounded-full border border-teal-500/30 hover:bg-teal-500 hover:text-white transition-all duration-300"
            >
              View All Clubs{" "}
              <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {popularClubs.map((club, index) => (
            <motion.div
              key={club._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="relative group p-[1.5px] rounded-3xl overflow-hidden flex h-full"
            >
              {/* --- TRACING BORDER --- */}
              <div
                className={`absolute inset-[-1000%] animate-border-trace ${
                  isDark
                    ? "bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#ec4899_50%,transparent_100%)]"
                    : "bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#0d9488_50%,transparent_100%)]"
                }`}
              />

              {/* Card Body */}
              <div
                className={`relative flex flex-col w-full p-4 rounded-[22px] transition-all duration-300 ${
                  isDark
                    ? "bg-[#0b041a]/95 backdrop-blur-xl"
                    : "bg-white shadow-xl shadow-gray-200/50"
                }`}
              >
                {/* Image Wrapper */}
                <div className="relative h-48 w-full overflow-hidden rounded-2xl mb-5">
                  <img
                    src={club.bannerImage}
                    alt={club.clubName}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-black/50 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest">
                      {club.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow px-2">
                  <h3
                    className={`text-xl font-black mb-2 line-clamp-1 tracking-tight ${
                      isDark
                        ? "text-white group-hover:text-pink-400"
                        : "text-gray-900 group-hover:text-teal-600"
                    }`}
                  >
                    {club.clubName}
                  </h3>

                  <div className="flex items-center gap-2 mb-6 opacity-60">
                    <FaUsers className="text-teal-500" />
                    <span className="text-xs font-bold uppercase tracking-tighter">
                      {club.membersCount}+ Active Members
                    </span>
                  </div>
                </div>

                {/* --- DYNAMIC BUTTON --- */}
                <Link
                  to={`/clubs/${club._id}`}
                  className="block relative p-[1px] rounded-xl overflow-hidden group/btn"
                >
                  <div
                    className={`absolute inset-[-1000%] animate-border-trace ${
                      isDark
                        ? "bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#ec4899_50%,transparent_100%)]"
                        : "bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#0d9488_50%,transparent_100%)]"
                    }`}
                  />
                  <button
                    className={`relative w-full py-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all duration-300 border-none outline-none ${
                      isDark
                        ? "bg-black text-white"
                        : "bg-white text-teal-600 hover:bg-teal-600 hover:text-white"
                    }`}
                  >
                    Details
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularClubs;
