import { motion } from "framer-motion";
import { FaBrain, FaCompass, FaHandshake, FaSmileBeam } from "react-icons/fa";

const benefits = [
  {
    icon: <FaSmileBeam size={35} className="text-blue-500" />,
    title: "Make New Friends",
    desc: "Meet friendly people who share your interests.",
  },
  {
    icon: <FaHandshake size={35} className="text-blue-500" />,
    title: "Collaborate",
    desc: "Work on exciting projects with club members.",
  },
  {
    icon: <FaBrain size={35} className="text-blue-500" />,
    title: "Learn & grow",
    desc: "Improve skills through group activities.",
  },
  {
    icon: <FaCompass size={35} className="text-blue-500" />,
    title: "Explore More",
    desc: "Get access to new events, places, and opportunities.",
  },
];

const WhyJoin = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-12">
          Why Join a Club?
        </h2>
        <div className="grid md:grid-cols-4 gap-10">
          {benefits.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.7 }}
              className="p-6 bg-white rounded-xl shadow hover:shadow-md transition"
            >
              <div className="mb-4 flex justify-center">{item.icon}</div>
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="text-gray-600 mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyJoin;
