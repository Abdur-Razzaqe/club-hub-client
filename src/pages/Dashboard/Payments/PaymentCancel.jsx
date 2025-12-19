import React from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";

const PaymentCancel = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-emerald-100 to text-teal-100 px-4">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white max-w-md w-full rounded-2xl shadow-xl p-8 text-center "
      >
        <XCircle className=" mx-auto text-red-500" size={90} />

        <h2 className="text-3xl font-bold text-gray-800 mt-4">
          payment Cancelled
        </h2>
        <p>
          Your payment was not completed. Don't worry - you can try again
          anytime.{" "}
        </p>
        <div className="mt-6 space-y-3">
          <button
            onClick={() => navigate(-1)}
            className="w-full  py-3 rounded-lg font-semibold  text-white bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 transition-all duration-300 "
          >
            Try Again
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full  py-3 rounded-lg font-semibold  text-white bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 transition-all duration-300 "
          >
            Back to Dashboard
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full  py-3 rounded-lg font-semibold  text-white bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 transition-all duration-300 "
          >
            Back to Home
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentCancel;
