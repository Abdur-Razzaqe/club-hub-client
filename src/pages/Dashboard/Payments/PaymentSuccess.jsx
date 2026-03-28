import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Home, LayoutDashboard } from "lucide-react";
import LoadingSpinner from "../../Common/LoadingSpinner";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const { user, loading: authLoading } = useContext(AuthContext);
  const { width, height } = useWindowSize();

  const clubId = searchParams.get("clubId") || searchParams.get("clubsId");
  const eventId = searchParams.get("eventId");
  const amount = searchParams.get("amount");
  const type = searchParams.get("type");
  const sessionId = searchParams.get("sessionId");

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const hasCalledAPI = useRef(false);

  useEffect(() => {
    if (authLoading) return;
    if (!user?.email || hasCalledAPI.current) return;

    hasCalledAPI.current = true;

    const confirmPaymentAndAction = async () => {
      try {
        const res = await axiosSecure.post("/payments/success", {
          clubId,
          eventId: eventId && eventId !== "null" ? eventId : null,
          userEmail: user?.email,
          amount: parseFloat(amount) || 0,
          transactionId: sessionId,
          type: type || "membership",
        });

        if (res.data.success) {
          setIsConfirmed(true);
          Swal.fire({
            icon: "success",
            title: "Success!",
            text:
              type === "registrations"
                ? "Event Registration Confirmed!"
                : "Club Membership Active!",
            timer: 2500,
            showConfirmButton: false,
            background: "#111827",
            color: "#fff",
          });
        }
      } catch (error) {
        console.error("Confirmation Error:", error);

        if (error.response?.status === 409) {
          setIsConfirmed(true);
        } else {
          Swal.fire({
            icon: "error",
            title: "Verification Failed",
            text: error.response?.data?.message || "Something went wrong.",
            background: "#111827",
            color: "#fff",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    confirmPaymentAndAction();
  }, [
    clubId,
    eventId,
    user?.email,
    authLoading,
    axiosSecure,
    amount,
    type,
    sessionId,
  ]);

  if (loading || authLoading) return <LoadingSpinner />;

  if (!isConfirmed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0b0514] text-white p-4 text-center">
        <h2 className="text-3xl font-bold mb-4 text-red-400">
          Verification Pending
        </h2>
        <p className="text-gray-400 mb-8">
          We couldn't confirm your transaction. Please contact support.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-8 py-3 rounded-xl bg-teal-600 font-bold hover:bg-teal-500 transition-all"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0514] px-4 overflow-hidden relative">
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={300}
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/5 border border-white/10 backdrop-blur-xl max-w-md w-full rounded-[40px] p-10 text-center relative z-10 shadow-2xl shadow-black/20"
      >
        <div className="relative w-fit mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            <CheckCircle
              className="text-emerald-500"
              size={100}
              strokeWidth={1.5}
            />
          </motion.div>
          <div className="absolute -inset-4 bg-emerald-500/20 blur-3xl rounded-full -z-10"></div>
        </div>

        <h2 className="text-4xl font-black text-white mt-8 tracking-tight uppercase">
          Success!
        </h2>
        <p className="text-gray-400 mt-3 font-medium">
          Payment of{" "}
          <span className="text-emerald-400 font-bold">${amount || "0"}</span>{" "}
          verified.
          <br />
          {type === "registrations"
            ? "Your event registration is complete."
            : "Your club membership is now active."}
        </p>

        <div className="mt-10 space-y-4">
          <button
            onClick={() =>
              navigate(
                type === "registrations"
                  ? "/dashboard/member/my-events"
                  : "/dashboard/member/my-clubs",
              )
            }
            className="w-full py-4 rounded-2xl font-black uppercase tracking-widest text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            {type === "registrations" ? "View My Events" : "Go to My Clubs"}
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => navigate("/")}
              className="py-4 rounded-2xl font-bold text-xs uppercase tracking-widest text-gray-400 border border-white/5 hover:bg-white/5 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Home size={16} /> Home
            </button>
            <button
              onClick={() => navigate("/dashboard/member")}
              className="py-4 rounded-2xl font-bold text-xs uppercase tracking-widest text-gray-400 border border-white/5 hover:bg-white/5 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <LayoutDashboard size={16} /> Dashboard
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
