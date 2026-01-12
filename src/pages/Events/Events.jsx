import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Common/LoadingSpinner";
import { motion } from "framer-motion";
import { useState } from "react";
const Events = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events", search, category],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/events?search=${search}&category=${category}`
      );
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="mx-auto max-w-6xl my-16">
      <motion.div
        initial={{ opacity: 0, y: -2 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-extrabold text-gray-800 tracking -tight">
          Upcoming Events
        </h2>
        <div className="h-1 w-20 bg-primary mx-auto mt-2 rounded-full"></div>
      </motion.div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            className="grow"
            placeholder="Search event by name...."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>

        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input"
          placeholder="Search Category..."
          list="browsers"
        />
        <datalist id="browsers">
          <option value="All Categories"></option>
          <option value="Music"></option>
          <option value="Photograph"></option>
          <option value="Sports"></option>
          <option value="Atr"></option>
          <option value="Tech"></option>
        </datalist>
      </div>
      {events.length === 0 && (
        <p className="text-center text-gray-500 text-lg">No events available</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {events.map((event, index) => (
          <motion.div
            key={event._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="group relative  rounded-2xl bg-white overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase rounded-full">
                  Upcoming
                </span>
                <p className="text-sm font-medium text-gray-500 italic">
                  {new Date(event.eventDate).toLocaleDateString()}
                </p>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors">
                {event.title}
              </h3>
              <p className="text-gray-600 line-clamp-2 mb-4 leading-relaxed">
                {event.description}
              </p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center text-gray-500 gap-2 text-sm">
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <p>{event.location}</p>
                </div>
                <div className="flex items-center text-gray-500 gap-2 text-sm">
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
                  {new Date(event.eventDate).toLocaleTimeString([], {
                    hour: "2-digit",
                  })}
                </div>
              </div>

              <Link to={`/events/${event._id}`}>
                <button className="w-full py-3 bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-extrabold rounded-xl hover:shadow-lg transform active:scale-95 transition-all duration-300 cursor-pointer">
                  View Details
                </button>
              </Link>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 "></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Events;
