import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-bl from-teal-200 via white to-blue-30 mt-2 py-10 rounded-2xl">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          className="hidden md:block"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <motion.img
            src="https://i.ibb.co.com/mVGJFdDt/640.jpg"
            alt="ClubHub hero"
            className="w-full rounded-xl shadow-xl"
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-teal-500 to-blue-600 ">
              ClubHub
            </span>
          </motion.h1>

          <motion.p
            className="mt-4 text-lg text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Discover local clubs, join exciting communities, attend events and
            even create your own club! Your social journey starts here.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Link
              to="/clubs"
              className=" btn rounded-lg px-6 py-3 text-white bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 "
            >
              {" "}
              Join a Club
            </Link>
            <Link
              to="/login"
              className="btn rounded-lg px-6 py-3 text-white bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 "
            >
              {" "}
              Create a Club
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
