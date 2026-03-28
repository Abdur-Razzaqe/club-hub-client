import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Common/LoadingSpinner";
import { motion } from "framer-motion";
import { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext/ThemeContext";

const Events = () => {
  const axiosSecure = useAxiosSecure();
  const { isDark } = useTheme();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events", search, category],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/events?search=${search}&category=${category}`,
      );
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 py-16 ${
        isDark ? "bg-[#05010d] text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-black tracking-tighter uppercase">
            Upcoming Events
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-teal-400 to-blue-500 mx-auto mt-4 rounded-full"></div>
        </motion.div>

        {/* Search + Filter Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16">
          <div className="relative w-full max-w-md">
            <input
              type="search"
              placeholder="Search event by name..."
              className={`w-full pl-12 pr-4 py-3 rounded-2xl border outline-none transition-all ${
                isDark
                  ? "bg-gray-900/50 border-white/10 focus:border-teal-500"
                  : "bg-white border-gray-200 focus:border-teal-500 shadow-sm"
              }`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <svg
              className="absolute left-4 top-3.5 h-5 w-5 opacity-50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`px-6 py-3 rounded-2xl border outline-none cursor-pointer transition-all ${
              isDark
                ? "bg-gray-900/50 border-white/10 focus:border-teal-500"
                : "bg-white border-gray-200 focus:border-teal-500 shadow-sm"
            }`}
          >
            <option value="">All Categories</option>
            <option value="Music">Music</option>
            <option value="Photograph">Photograph</option>
            <option value="Sports">Sports</option>
            <option value="Art">Art</option>
            <option value="Tech">Tech</option>
          </select>
        </div>

        {events.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-2xl font-medium italic">
              No events found matching your criteria.
            </p>
          </div>
        )}

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8 }}
              className="relative group p-[1.5px] rounded-3xl overflow-hidden flex h-full"
            >
              {/* --- TRACING LIGHT BORDER --- */}
              <div
                className={`absolute inset-[-1000%] animate-border-trace ${
                  isDark
                    ? "bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#ec4899_50%,transparent_100%)]"
                    : "bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#0d9488_50%,transparent_100%)]"
                }`}
              />

              {/* Card Content Wrapper */}
              <div
                className={`relative flex flex-col w-full p-6 rounded-[22px] transition-all duration-300 ${
                  isDark ? "bg-[#05010d]/95 backdrop-blur-xl" : "bg-white"
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <span
                    className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-lg ${
                      isDark
                        ? "bg-teal-500/10 text-teal-400 border border-teal-500/20"
                        : "bg-teal-50 text-teal-600 border border-teal-100"
                    }`}
                  >
                    Upcoming
                  </span>
                  <p className="text-xs font-bold opacity-50 italic">
                    {new Date(event.eventDate).toLocaleDateString()}
                  </p>
                </div>

                <h3
                  className={`text-xl font-bold mb-3 transition-colors line-clamp-1 ${
                    isDark
                      ? "text-white group-hover:text-pink-400"
                      : "text-gray-800 group-hover:text-teal-600"
                  }`}
                >
                  {event.title}
                </h3>

                {/* Content Section with flex-grow to push button down */}
                <div className="flex-grow">
                  <p
                    className={`text-sm line-clamp-3 mb-6 leading-relaxed ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {event.description}
                  </p>

                  <div className="space-y-3 mb-6 opacity-70">
                    <div className="flex items-center gap-2 text-xs font-medium">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                      </svg>
                      <p className="line-clamp-1">{event.location}</p>
                    </div>
                  </div>
                </div>

                {/* --- VIEW DETAILS BUTTON (ALIGNED AT BOTTOM) --- */}
                <Link
                  to={`/events/${event._id}`}
                  className="block relative p-[1.5px] rounded-xl overflow-hidden group/btn"
                >
                  <div
                    className={`absolute inset-[-1000%] animate-border-trace ${
                      isDark
                        ? "bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#ec4899_50%,transparent_100%)]"
                        : "bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#0d9488_50%,transparent_100%)]"
                    }`}
                  />
                  <button
                    className={`relative w-full py-3 text-xs font-black uppercase tracking-widest rounded-[10px] transition-all duration-300 border-none outline-none cursor-pointer ${
                      isDark
                        ? "bg-black text-white group-hover/btn:bg-transparent"
                        : "bg-white text-teal-600 group-hover/btn:bg-teal-600 group-hover/btn:text-white"
                    }`}
                  >
                    View Details
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
