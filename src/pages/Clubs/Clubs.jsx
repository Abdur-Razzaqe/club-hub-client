import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Card from "../../components/Card";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import LoadingSpinner from "../Common/LoadingSpinner";
import { useTheme } from "../../contexts/ThemeContext/ThemeContext";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const Clubs = () => {
  const axiosSecure = useAxiosSecure();
  const { isDark } = useTheme();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["clubs", search, category],
    queryFn: async () => {
      const result = await axiosSecure.get(
        `/clubs?search=${search}&category=${category}`,
      );
      return result.data;
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
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-black tracking-tighter uppercase">
            Discover Clubs
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-pink-500 to-violet-500 mx-auto mt-4 rounded-full"></div>
        </motion.div>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16">
          <div className="relative w-full max-w-md">
            <input
              type="search"
              placeholder="Search clubs by name..."
              className={`w-full pl-12 pr-4 py-3 rounded-2xl border outline-none transition-all ${
                isDark
                  ? "bg-gray-900/50 border-white/10 focus:border-pink-500"
                  : "bg-white border-gray-200 shadow-sm"
              }`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <svg
              className="absolute left-4 top-3.5 h-5 w-5 opacity-40"
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
            className={`px-6 py-3 rounded-2xl border outline-none cursor-pointer ${
              isDark
                ? "bg-gray-900/50 border-white/10"
                : "bg-white border-gray-200 shadow-sm"
            }`}
          >
            <option value="">All Categories</option>
            <option value="Music">Music</option>
            <option value="Sports">Sports</option>
            <option value="Art">Art</option>
            <option value="Tech">Tech</option>
          </select>
        </div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {clubs.length > 0 ? (
            clubs.map((club) => <Card key={club._id} club={club} />)
          ) : (
            <p className="text-center col-span-full text-gray-500 italic py-10">
              No clubs found.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Clubs;
