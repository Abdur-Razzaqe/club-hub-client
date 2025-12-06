import { motion } from "framer-motion";
import React from "react";
import {
  FaCalendarCheck,
  FaPlusCircle,
  FaSearch,
  FaUser,
  FaUsers,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaSearch size={40} className="text-teal-500" />,
    title: "Find Clubs",
    desc: "Search clubs based on your interests.",
  },
  {
    icon: <FaUsers size={40} className="text-teal-500" />,
    title: "Join Communities",
    desc: "Connect with like-minded people easily.",
  },
  {
    icon: <FaPlusCircle size={40} className="text-teal-500" />,
    title: "Create a Club",
    desc: "Start your own club in second.",
  },
  {
    icon: <FaCalendarCheck size={40} className="text-teal-500" />,
    title: "Attend Events",
    desc: "Join exiting events organized by clubs.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-12">
          How ClubHub Works
        </h2>
        <div className="grid md:grid-cols-4 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.7 }}
              className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md transition"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className="text-gray-600 mt-2">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
