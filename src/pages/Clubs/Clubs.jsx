import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Card from "../../components/Card";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import LoadingSpinner from "../Common/LoadingSpinner";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Clubs = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["clubs", search, category],
    queryFn: async () => {
      const result = await axiosSecure.get(
        `/clubs?search=${search}&category=${category}`
      );
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Title */}
      <h2 className="text-4xl font-extrabold text-gray-800 dark:text-white text-center pt-10">
        All Clubs
      </h2>

      {/* Search + Filter */}
      <motion.div
        className="flex flex-col md:flex-row items-center justify-center gap-4 my-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <label className="input flex items-center gap-2">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
          <input
            type="search"
            className="grow"
            placeholder="Search clubs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>

        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input"
          placeholder="Category"
          list="categories"
        />
        <datalist id="categories">
          <option value="Music" />
          <option value="Sports" />
          <option value="Art" />
          <option value="Tech" />
        </datalist>
      </motion.div>

      {/* Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-5"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {clubs.length > 0 ? (
          clubs.map((club) => (
            <motion.div key={club._id} variants={itemVariants}>
              <Card club={club} />
            </motion.div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No clubs available
          </p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Clubs;
