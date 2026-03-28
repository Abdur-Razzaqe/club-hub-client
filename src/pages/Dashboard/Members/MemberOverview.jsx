import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Common/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import { useTheme } from "../../../contexts/ThemeContext/ThemeContext";
import {
  Users,
  Ticket,
  Calendar,
  Clock,
  Sparkles,
  ArrowUpRight,
  BadgeDollarSign,
} from "lucide-react";

const MemberOverview = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["member-overview", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/member/overview/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const totalSpent =
    data?.totalPayments ||
    data?.payments?.reduce(
      (acc, curr) => acc + (parseFloat(curr.amount) || 0),
      0,
    ) ||
    0;

  // 2. Clubs Joined: 'memberships' array-r length use
  const clubsCount = data?.totalClubs || data?.memberships?.length || 0;

  // 3. Events Booked: 'totalEvents' backend logic fail 'upcomingEvents' length check
  const eventsCount = data?.totalEvents || data?.upcomingEvents?.length || 0;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 px-2">
      {/* Welcome Header */}
      <div
        className={`relative overflow-hidden p-8 rounded-[40px] border transition-all duration-500 ${
          isDark
            ? "bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-white/10"
            : "bg-gradient-to-br from-teal-50 to-indigo-50 border-gray-100"
        }`}
      >
        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <img
              src={user?.photoURL}
              alt="Member"
              className="relative w-24 h-24 rounded-full border-4 border-white shadow-2xl object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h1
              className={`text-3xl font-black uppercase tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Welcome Back,{" "}
              <span className={isDark ? "text-pink-500" : "text-teal-600"}>
                {user?.displayName}
              </span>
              !
            </h1>
            <p
              className={`text-sm font-medium mt-1 opacity-70 ${isDark ? "text-gray-400" : "text-gray-600"}`}
            >
              Manage your club activities and registered events from one place.
            </p>
          </div>
        </div>
        <Sparkles className="absolute right-10 top-10 opacity-10" size={100} />
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Clubs */}
        <StatCard
          isDark={isDark}
          title="Clubs Joined"
          value={clubsCount}
          icon={<Users size={24} />}
          colorClass="pink"
        />

        {/* Total Events */}
        <StatCard
          isDark={isDark}
          title="Events Booked"
          value={eventsCount}
          icon={<Ticket size={24} />}
          colorClass="teal"
        />

        {/* Total Spent */}
        <StatCard
          isDark={isDark}
          title="Total Spent"
          value={`$${totalSpent}`}
          icon={<BadgeDollarSign size={24} />}
          colorClass="emerald"
        />

        {/* Upcoming Events Mini-List */}
        <div
          className={`p-6 rounded-[32px] border transition-all duration-500 ${
            isDark
              ? "bg-[#0b0514] border-white/5 shadow-2xl"
              : "bg-white border-gray-100 shadow-xl"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h2
              className={`text-xs font-black uppercase tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Upcoming
            </h2>
            <Calendar size={16} className="opacity-30" />
          </div>

          <div className="space-y-3 max-h-[100px] overflow-y-auto pr-1 custom-scrollbar">
            {data?.upcomingEvents?.length > 0 ? (
              data.upcomingEvents.slice(0, 2).map((ev) => (
                <div
                  key={ev._id}
                  className="flex flex-col border-l-2 border-pink-500 pl-3"
                >
                  <span
                    className={`text-[11px] font-bold truncate ${isDark ? "text-gray-200" : "text-gray-800"}`}
                  >
                    {ev.title}
                  </span>
                  <span className="text-[9px] opacity-50 font-mono">
                    {new Date(ev.eventDate).toLocaleDateString()}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-[10px] opacity-30 italic">
                No upcoming events
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Stat Card Component for cleaner code
const StatCard = ({ isDark, title, value, icon, colorClass }) => {
  const colors = {
    pink: isDark
      ? "bg-pink-500/10 text-pink-500 border-pink-500/30"
      : "bg-pink-50 text-pink-600 border-pink-100",
    teal: isDark
      ? "bg-teal-500/10 text-teal-500 border-teal-500/30"
      : "bg-teal-50 text-teal-600 border-teal-100",
    emerald: isDark
      ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30"
      : "bg-emerald-50 text-emerald-600 border-emerald-100",
  };

  return (
    <div
      className={`group p-6 rounded-[32px] border transition-all duration-500 hover:scale-[1.02] ${
        isDark
          ? "bg-[#0b0514] border-white/5"
          : "bg-white border-gray-100 shadow-xl"
      }`}
    >
      <div className={`p-3 rounded-2xl w-fit mb-4 ${colors[colorClass]}`}>
        {icon}
      </div>
      <h2
        className={`text-[10px] font-black uppercase tracking-widest opacity-50 ${isDark ? "text-white" : "text-gray-900"}`}
      >
        {title}
      </h2>
      <p
        className={`text-4xl font-black mt-1 ${isDark ? "text-white" : "text-gray-900"}`}
      >
        {value}
      </p>
    </div>
  );
};

export default MemberOverview;
