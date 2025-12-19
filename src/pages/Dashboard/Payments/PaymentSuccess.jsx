import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import LoadingSpinner from "../../Common/LoadingSpinner";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const { user } = useContext(AuthContext);
  const clubId = searchParams.get("clubsId");

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!clubId) return;

    const confirmPayment = async () => {
      try {
        const res = await axiosSecure.post("/payments/success", {
          clubId,
          userEmail: user?.email,
        });
        if (res.data?.message) {
          setSuccess(true);
          Swal.fire({
            icon: "success",
            title: "Payment Successful!",
            text: "Welcome to the club",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Payment Error",
          text: "Something went wrong. Please contact support.",
        });
      } finally {
        setLoading(false);
      }
    };

    confirmPayment();
  }, [clubId, axiosSecure]);
  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-emerald-100 to text-teal-100 px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white max-w-md w-full rounded-2xl shadow-xl p-68 text-center "
      >
        <CheckCircle className=" mx-auto text-teal-500" size={90} />

        <h2 className="text-3xl font-bold text-gray-800 mt-4">
          payment Successful
        </h2>
        <p>Your membership has been activated successfully. </p>
        <div className="mt-6 space-y-3">
          <button
            onClick={() => navigate("/dashboard/my-clubs")}
            className="w-full  py-3 rounded-lg font-semibold  text-white bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 transition-all duration-300 "
          >
            Go to My Clubs
          </button>
          <button
            onClick={() => navigate("/dashboard/my-clubs")}
            className="w-full  py-3 rounded-lg font-semibold  text-white bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 transition-all duration-300 "
          >
            Back to Home
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
