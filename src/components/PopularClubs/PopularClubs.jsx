import { motion } from "framer-motion";
import { Link } from "react-router";

const clubs = [
  {
    id: 1,
    name: "Tech Innovators Club",
    category: "Technology",
    members: 320,
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7",
  },
  {
    id: 2,
    name: "Fitness Freaks",
    category: "Health & Fitness",
    members: 210,
    image: "https://images.unsplash.com/photo-1549576490-b0b4831ef60a",
  },
  {
    id: 3,
    name: "Photography Lovers",
    category: "Photography",
    members: 185,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
  },
  {
    id: 4,
    name: "Music Vibes",
    category: "Music",
    members: 260,
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
  },
];

const PopularClubs = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Popular Clubs
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Join the most active and engaging communities on ClubHub
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {clubs.map((club, index) => (
            <motion.div
              key={club.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden flex flex-col"
            >
              <img
                src={club.image}
                alt={club.name}
                className="h-40 w-full object-cover"
              />

              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {club.name}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Category: {club.category}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Members: {club.members}+
                </p>

                <div className="mt-auto pt-4">
                  <Link
                    to={`/clubs/${club.id}`}
                    className="block text-center w-full px-4 py-2 rounded-lg text-white bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 transition font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularClubs;
