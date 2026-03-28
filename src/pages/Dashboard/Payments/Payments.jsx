import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Common/LoadingSpinner";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import { useTheme } from "../../../contexts/ThemeContext/ThemeContext";
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ArrowLeft,
} from "lucide-react";
import Swal from "sweetalert2";

const Payments = () => {
  const { clubId } = useParams();
  const { user } = useContext(AuthContext);
  const { isDark } = useTheme();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: club, isLoading } = useQuery({
    queryKey: ["club-payment", clubId],
    enabled: !!clubId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/clubs/${clubId}`);
      return res.data;
    },
  });

  const handleCheckout = async () => {
    if (!user?.email)
      return Swal.fire("Login Required", "Please login first", "warning");

    const paymentInfo = {
      clubId: club?._id,
      clubName: club?.clubName,
      amount: Number(club?.membershipFee) || 50,
      userEmail: user?.email,
    };

    console.log("Sending to Backend:", paymentInfo);

    try {
      const res = await axiosSecure.post(
        "/create-checkout-session",
        paymentInfo,
      );
      if (res.data?.url) {
        window.location.replace(res.data.url);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong";
      Swal.fire("Registration failed", errorMsg, "error");
    }
  };
  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div
        className={`w-full max-w-md rounded-[40px] border shadow-2xl overflow-hidden transition-all duration-500 ${
          isDark
            ? "bg-[#0b0514] border-white/10 shadow-black"
            : "bg-white border-gray-100"
        }`}
      >
        {/* Header Section */}
        <div
          className={`p-8 text-center ${isDark ? "bg-white/5" : "bg-gray-50"}`}
        >
          <div
            className={`w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4 ${
              isDark
                ? "bg-pink-500/20 text-pink-500"
                : "bg-teal-50 text-teal-600"
            }`}
          >
            <CreditCard size={32} />
          </div>
          <h2
            className={`text-2xl font-black uppercase ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Secure{" "}
            <span className={isDark ? "text-pink-500" : "text-teal-600"}>
              Payment
            </span>
          </h2>
        </div>

        <div className="p-8 space-y-6">
          <div className="flex justify-between items-center border-b border-dashed border-gray-500/20 pb-4">
            <span className="text-sm font-bold opacity-60">Club</span>
            <span className="font-black uppercase">{club?.clubName}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-bold opacity-60">Amount</span>
            <span
              className={`text-2xl font-black ${isDark ? "text-pink-500" : "text-teal-600"}`}
            >
              ${club?.membershipFee || 50}
            </span>
          </div>

          {/* User Buttons */}
          <div className="space-y-3 pt-4">
            {/* PAY NOW BUTTON */}
            <button
              onClick={handleCheckout}
              className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest transition-all hover:scale-[1.02] shadow-lg cursor-pointer ${
                isDark
                  ? "bg-pink-600 text-white shadow-pink-500/20"
                  : "bg-teal-600 text-white shadow-teal-600/20"
              }`}
            >
              Pay Now & Join
            </button>

            {/* CANCEL BUTTON */}
            <button
              onClick={() => navigate("/dashboard/overview")}
              className={`w-full py-4 rounded-2xl font-bold uppercase tracking-widest text-xs border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isDark
                  ? "border-white/10 text-gray-400 hover:bg-white/5"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <XCircle size={16} /> I don't want to pay now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
