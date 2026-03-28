import React from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { Calendar, Mail, MapPin, Tag, Shield } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext/ThemeContext";
import LoadingSpinner from "../Common/LoadingSpinner";

const ClubDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isDark } = useTheme();

  const { data: club, isLoading } = useQuery({
    queryKey: ["club", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`clubs/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (!club)
    return (
      <p className="text-center mt-20 text-xl font-bold">Club Not Found</p>
    );

  const handleJoin = async () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to join the club",
        background: isDark ? "#1a1a1a" : "#fff",
        color: isDark ? "#fff" : "#545454",
      });
      navigate("/login");
      return;
    }

    try {
      if (club.membershipFee > 0) {
        const paymentInfo = {
          clubId: club._id,
          clubName: club.clubName,
          memberEmail: user?.email, // Case fix
          amount: club.membershipFee,
          type: "memberships", // Identifiable payment type
        };
        const res = await axiosSecure.post(
          "/create-checkout-session",
          paymentInfo,
        );
        if (res.data.url) {
          window.location.replace(res.data.url);
        }
        return;
      }

      // Logic for free clubs
      const res = await axiosSecure.post("/payments/success", {
        clubId: club._id,
        memberEmail: user?.email,
      });

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Joined Club!",
          text: `You have successfully joined ${club.clubName}`,
          background: isDark ? "#1a1a1a" : "#fff",
          color: isDark ? "#fff" : "#545454",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`min-h-screen py-16 px-4 transition-colors duration-300 ${isDark ? "bg-[#05010d] text-white" : "bg-gray-50 text-gray-900"}`}
    >
      {/* Main Container with Tracing Border */}
      <div className="max-w-6xl mx-auto relative p-[1.5px] rounded-3xl overflow-hidden shadow-2xl">
        {/* Animated Tracing Light */}
        <div
          className={`absolute inset-[-1000%] animate-border-trace ${
            isDark
              ? "bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#ec4899_50%,transparent_100%)]"
              : "bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#0d9488_50%,transparent_100%)]"
          }`}
        />

        {/* Content Wrapper */}
        <div
          className={`relative rounded-3xl overflow-hidden p-6 md:p-10 transition-all duration-300 ${
            isDark ? "bg-[#05010d]/95 backdrop-blur-2xl" : "bg-white"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side: Image */}
            <div className="relative group overflow-hidden rounded-2xl shadow-lg">
              <img
                src={club.bannerImage}
                alt={club.clubName}
                className="w-full h-80 md:h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-teal-500 text-white text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">
                  {club.category}
                </span>
              </div>
            </div>

            {/* Right Side: Details */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
                {club.clubName}
              </h2>

              <div
                className={`p-5 rounded-2xl border-l-4 border-teal-500 ${isDark ? "bg-white/5" : "bg-gray-50"}`}
              >
                <p
                  className={`text-lg leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}
                >
                  {club.description}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  className={`flex items-center gap-3 p-4 rounded-xl border ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-100"}`}
                >
                  <MapPin className="text-teal-500" size={20} />
                  <div>
                    <p className="text-[10px] uppercase font-bold opacity-50">
                      Location
                    </p>
                    <p className="font-semibold text-sm">{club.location}</p>
                  </div>
                </div>
                <div
                  className={`flex items-center gap-3 p-4 rounded-xl border ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-100"}`}
                >
                  <Calendar className="text-teal-500" size={20} />
                  <div>
                    <p className="text-[10px] uppercase font-bold opacity-50">
                      Founded
                    </p>
                    <p className="font-semibold text-sm">
                      {new Date(club.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div
                  className={`flex items-center gap-3 p-4 rounded-xl border ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-100"}`}
                >
                  <Mail className="text-blue-500" size={20} />
                  <div>
                    <p className="text-[10px] uppercase font-bold opacity-50">
                      Manager
                    </p>
                    <p className="font-semibold text-xs truncate max-w-[150px]">
                      {club.managerEmail}
                    </p>
                  </div>
                </div>
                <div
                  className={`flex items-center gap-3 p-4 rounded-xl border ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-100"}`}
                >
                  <Shield className="text-purple-500" size={20} />
                  <div>
                    <p className="text-[10px] uppercase font-bold opacity-50">
                      Status
                    </p>
                    <p className="font-semibold text-sm uppercase">
                      {club.status}
                    </p>
                  </div>
                </div>
              </div>

              {/* Fee Section */}
              <div className="pt-4">
                <p className="text-xs uppercase tracking-widest font-black opacity-50 mb-1">
                  Membership Fee
                </p>
                <p
                  className={`text-4xl font-black ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  {club.membershipFee > 0
                    ? `$${club.membershipFee}`
                    : "FREE JOINING"}
                </p>
              </div>

              {/* --- TRACING LIGHT BUTTON --- */}
              <button
                onClick={handleJoin}
                className="relative p-[1.5px] overflow-hidden group rounded-full transition-all duration-300 w-full mt-6 cursor-pointer"
              >
                {/* Tracing Light Beam */}
                <div
                  className={`absolute inset-[-1000%] animate-border-trace ${
                    isDark
                      ? "bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#ec4899_50%,transparent_100%)] group-hover:bg-[conic-gradient(from_90deg_at_50%_50%,#fff_0%,#ec4899_50%,#fff_100%)]"
                      : "bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#0d9488_50%,transparent_100%)] group-hover:bg-[conic-gradient(from_90deg_at_50%_50%,#fff_0%,#0d9488_50%,#fff_100%)]"
                  }`}
                />

                {/* Button Surface */}
                <div
                  className={`relative px-12 py-4 rounded-full font-black uppercase tracking-widest transition-all duration-300 ${
                    isDark
                      ? "bg-black text-white hover:bg-transparent"
                      : "bg-white text-teal-600 hover:bg-teal-600 hover:text-white"
                  }`}
                >
                  {club.membershipFee > 0 ? "Pay & Join Now" : "Join Club Free"}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubDetails;
