import React, { useContext } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { useTheme } from "../../contexts/ThemeContext/ThemeContext";
import LoadingSpinner from "../Common/LoadingSpinner";

const EventDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { isDark } = useTheme(); // Global Theme logic

  const { data: event, isLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/events/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const handleRegister = async () => {
    if (!user) {
      return Swal.fire({
        icon: "error",
        title: "Login Required",
        text: "You must be logged in to register!",
        background: isDark ? "#1a1a1a" : "#fff",
        color: isDark ? "#fff" : "#545454",
      }).then(() => navigate("/login"));
    }

    try {
      if (event?.isPaid && event?.eventFee > 0) {
        const paymentInfo = {
          clubName: event?.clubName || event?.title || "Unknown Club",
          eventId: event?._id,
          eventName: event.title,
          clubId: event?.clubId,
          memberEmail: user?.email,
          userEmail: user?.email,
          amount: Number(event.eventFee),
          type: "registrations",
        };

        console.log("📤 Sending Payment Info:", paymentInfo);

        const res = await axiosSecure.post(
          "/create-checkout-session",
          paymentInfo,
        );

        if (res.data.url) {
          window.location.replace(res.data.url);
        }
        return;
      }

      const payload = {
        eventId: event._id,
        userEmail: user?.email,
        clubId: event.clubId,
        status: "registered",
        registeredAt: new Date(),
      };

      await axiosSecure.post("/event-registrations", payload);
      console;
      // Success Swal...
    } catch (error) {
      // Error Swal...
    }
  };
  if (isLoading) return <LoadingSpinner />;
  if (!event || Object.keys(event).length === 0)
    return <p className="text-center mt-10">Event not found</p>;

  return (
    <div
      className={`min-h-screen py-10 px-4 transition-colors duration-300 ${isDark ? "text-white" : "text-gray-900"}`}
    >
      {/* --- Main Card with Tracing Light Border --- */}
      <div
        className={`max-w-5xl mx-auto relative p-[1.5px] rounded-2xl overflow-hidden shadow-2xl transition-all duration-300`}
      >
        {/* Tracing Light Effect on Card Border */}
        <div
          className={`absolute inset-[-1000%] animate-border-trace ${
            isDark
              ? "bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#ec4899_50%,transparent_100%)]"
              : "bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#0d9488_50%,transparent_100%)]"
          }`}
        />

        {/* Card Content Wrapper */}
        <div
          className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${isDark ? "bg-[#05010d]" : "bg-white"}`}
        >
          {/* Header Section */}
          <div className="bg-gradient-to-r from-teal-500 to-blue-600 text-white p-8">
            <h1 className="text-4xl font-black uppercase tracking-tight">
              {event?.title}
            </h1>
            <div className="flex items-center gap-2 mt-4 opacity-90 font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {new Date(event?.eventDate).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Description */}
            <p
              className={`text-lg leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}
            >
              {event?.description}
            </p>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                className={`p-5 rounded-xl border transition-all ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}
              >
                <p
                  className={`text-xs uppercase tracking-widest font-bold mb-1 ${isDark ? "text-pink-500" : "text-teal-600"}`}
                >
                  Location
                </p>
                <p className="text-lg font-semibold">{event?.location}</p>
              </div>
              <div
                className={`p-5 rounded-xl border transition-all ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}
              >
                <p
                  className={`text-xs uppercase tracking-widest font-bold mb-1 ${isDark ? "text-pink-500" : "text-teal-600"}`}
                >
                  Event Type
                </p>
                <p className="text-lg font-semibold">
                  {event?.isPaid ? "Premium Access" : "Open for All"}
                </p>
              </div>
            </div>

            {/* Action Section */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-gray-100/10">
              <div className="text-center md:text-left">
                <p className="text-sm opacity-60 uppercase tracking-widest">
                  Registration Fee
                </p>
                <p
                  className={`text-4xl font-black ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  {event?.isPaid ? `$${event.eventFee}` : "FREE"}
                </p>
              </div>

              {/* --- REGISTER BUTTON WITH TRACING LIGHT --- */}
              <button
                onClick={handleRegister}
                className="relative p-[1.5px] overflow-hidden group rounded-full transition-all duration-300 w-full md:w-auto min-w-[300px]"
              >
                {/* Tracing Light Beam for Button */}
                <div
                  className={`absolute inset-[-1000%] animate-border-trace ${
                    isDark
                      ? "bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#ec4899_50%,transparent_100%)] group-hover:bg-[conic-gradient(from_90deg_at_50%_50%,#fff_0%,#ec4899_50%,#fff_100%)]"
                      : "bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#0d9488_50%,transparent_100%)] group-hover:bg-[conic-gradient(from_90deg_at_50%_50%,#fff_0%,#0d9488_50%,#fff_100%)]"
                  }`}
                />

                {/* Button Surface */}
                <div
                  className={`relative px-12 py-4 rounded-full font-black uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                    isDark
                      ? "bg-black text-white hover:bg-transparent"
                      : "bg-white text-teal-600 hover:bg-teal-600 hover:text-white"
                  }`}
                >
                  Register Now
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
