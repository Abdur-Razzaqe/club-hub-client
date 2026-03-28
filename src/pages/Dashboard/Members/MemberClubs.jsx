import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import LoadingSpinner from "../../Common/LoadingSpinner";
import {
  MapPin,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Building2,
  Info,
} from "lucide-react";
import { useTheme } from "../../../contexts/ThemeContext/ThemeContext";

const MemberClubs = () => {
  const axiosSecure = useAxiosSecure();
  const { isDark } = useTheme();

  const { data: Memberships = [], isLoading } = useQuery({
    queryKey: ["my-clubs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/member/my-clubs");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  // Empty State UI
  if (Memberships.length === 0) {
    return (
      <div
        className={`flex flex-col items-center justify-center p-20 rounded-[40px] border border-dashed mt-10 transition-all ${
          isDark
            ? "bg-white/5 border-white/10 text-gray-400"
            : "bg-gray-50 border-gray-200 text-gray-500"
        }`}
      >
        <div
          className={`p-6 rounded-full mb-4 ${isDark ? "bg-white/5 text-gray-600" : "bg-white text-gray-300"}`}
        >
          <Building2 size={60} strokeWidth={1} />
        </div>
        <h3 className="text-xl font-bold">No Active Memberships</h3>
        <p className="text-sm opacity-60 mt-2 italic text-center max-w-xs">
          Explore our clubs and join one to start your journey!
        </p>
        <Link
          to="/clubs"
          className={`mt-6 px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
            isDark
              ? "bg-pink-600 text-white hover:bg-pink-700"
              : "bg-teal-600 text-white hover:bg-teal-700"
          }`}
        >
          Explore Clubs
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div>
        <h2
          className={`text-3xl font-black uppercase tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}
        >
          My{" "}
          <span className={isDark ? "text-pink-500" : "text-teal-600"}>
            Memberships
          </span>
        </h2>
        <p
          className={`text-sm font-medium mt-1 opacity-70 ${isDark ? "text-gray-400" : "text-gray-600"}`}
        >
          You are currently an active member of {Memberships.length} clubs.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
        {Memberships.map((m, index) => (
          <div
            key={m._id || `membership-${index}`}
            className={`group relative p-8 rounded-[36px] border transition-all duration-500 flex flex-col justify-between overflow-hidden hover:scale-[1.02] ${
              isDark
                ? "bg-[#0b0514] border-white/5 hover:border-pink-500/30 shadow-2xl shadow-black/40"
                : "bg-white border-gray-100 shadow-xl shadow-gray-200/50"
            }`}
          >
            {/* Background Accent Decor */}
            <div
              className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-[80px] opacity-10 transition-all group-hover:opacity-30 ${isDark ? "bg-pink-500" : "bg-teal-500"}`}
            ></div>

            <div>
              <div className="flex justify-between items-start mb-4">
                <div
                  className={`p-3 rounded-2xl ${isDark ? "bg-white/5 text-pink-500" : "bg-teal-50 text-teal-600"}`}
                >
                  <ShieldCheck size={24} />
                </div>
                <span
                  className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm ${
                    isDark
                      ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                      : "bg-emerald-50 text-emerald-700 border-emerald-100"
                  }`}
                >
                  {m.status}
                </span>
              </div>

              <h2
                className={`text-xl font-black tracking-tight mb-2 ${isDark ? "text-white" : "text-gray-800"}`}
              >
                {m.clubName}
              </h2>

              <div className="space-y-2">
                <p
                  className={`flex items-center gap-2 text-xs font-semibold ${isDark ? "text-gray-400" : "text-gray-500"}`}
                >
                  <MapPin
                    size={14}
                    className={isDark ? "text-pink-500" : "text-teal-500"}
                  />
                  {m.location}
                </p>
                <p
                  className={`flex items-center gap-2 text-xs font-semibold ${isDark ? "text-gray-400" : "text-gray-500"}`}
                >
                  <Calendar
                    size={14}
                    className={isDark ? "text-pink-500" : "text-teal-500"}
                  />
                  <span className="opacity-60 uppercase tracking-tighter">
                    Expiry:
                  </span>
                  {m.expiresAt
                    ? new Date(m.expiresAt).toLocaleDateString()
                    : "Lifetime"}
                </p>
              </div>
            </div>

            {/* Action Button */}
            <Link
              to={`/clubs/${m.clubId}`}
              className={`mt-8 w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all active:scale-95 shadow-lg ${
                isDark
                  ? "bg-white/5 text-white hover:bg-pink-600 hover:shadow-pink-600/20 border border-white/10 hover:border-transparent"
                  : "bg-gray-900 text-white hover:bg-teal-600 hover:shadow-teal-600/20"
              }`}
            >
              Access Club <ArrowRight size={14} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberClubs;
