import React, { useContext } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Common/LoadingSpinner";
import { useTheme } from "../../../contexts/ThemeContext/ThemeContext";
import {
  LayoutDashboard,
  Users,
  Trophy,
  Banknote,
  Sparkles,
} from "lucide-react";

const ManagerOverview = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { isDark } = useTheme();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["manager-overview"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/manager/overview");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 px-2">
      {/* --- Header --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1
            className={`text-3xl font-black uppercase tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Manager{" "}
            <span className={isDark ? "text-pink-500" : "text-teal-600"}>
              Overview
            </span>
          </h1>
          <p
            className={`text-sm font-medium mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}
          >
            Welcome back, {user?.displayName || "Manager"}. Here's your club's
            performance.
          </p>
        </div>
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl border font-bold text-xs uppercase tracking-widest ${isDark ? "bg-white/5 border-white/10 text-pink-500" : "bg-teal-50 border-teal-100 text-teal-700"}`}
        >
          <Sparkles size={16} /> Manager Mode
        </div>
      </div>

      {/* --- Stats Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <OverviewCard
          title="Clubs Managed"
          value={data.totalClubs}
          icon={<LayoutDashboard size={24} />}
          color="blue"
          isDark={isDark}
        />
        <OverviewCard
          title="Total Members"
          value={data.totalMembers}
          icon={<Users size={24} />}
          color="pink"
          isDark={isDark}
        />
        <OverviewCard
          title="Events Created"
          value={data.totalEvents}
          icon={<Trophy size={24} />}
          color="purple"
          isDark={isDark}
        />
        <OverviewCard
          title="Total Earnings"
          value={`$${data.totalPayments || 0}`}
          icon={<Banknote size={24} />}
          color="teal"
          isDark={isDark}
        />
      </div>

      {/* --- Optional: Add a welcoming Glass Card --- */}
      <div
        className={`p-10 rounded-[40px] border transition-all duration-500 flex flex-col items-center text-center space-y-4 ${
          isDark
            ? "bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-white/5"
            : "bg-gradient-to-br from-teal-50 to-blue-50 border-gray-100"
        }`}
      >
        <div
          className={`p-4 rounded-full ${isDark ? "bg-pink-500/20 text-pink-500" : "bg-teal-500/20 text-teal-600"}`}
        >
          <Sparkles size={32} className="animate-pulse" />
        </div>
        <h2
          className={`text-2xl font-black ${isDark ? "text-white" : "text-gray-800"}`}
        >
          Ready to grow your community?
        </h2>
        <p
          className={`max-w-md text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
        >
          Check your club activities, manage new memberships, and create
          exciting events to keep your members engaged!
        </p>
      </div>
    </div>
  );
};

/* --- Hero-Style Overview Card --- */
const OverviewCard = ({ title, value, icon, color, isDark }) => {
  const themes = {
    blue: "from-blue-500 to-indigo-600 shadow-blue-500/20",
    pink: "from-pink-500 to-rose-600 shadow-pink-500/20",
    purple: "from-purple-500 to-violet-600 shadow-purple-500/20",
    teal: "from-teal-400 to-emerald-600 shadow-teal-400/20",
  };

  return (
    <div
      className={`group relative overflow-hidden p-6 rounded-[32px] border transition-all duration-300 hover:-translate-y-2 ${
        isDark
          ? "bg-[#0b0514] border-white/5 hover:border-pink-500/30 shadow-2xl shadow-black/50"
          : "bg-white border-gray-100 shadow-xl hover:shadow-2xl"
      }`}
    >
      {/* Glow effect on hover */}
      <div
        className={`absolute -right-6 -top-6 w-24 h-24 blur-3xl rounded-full opacity-10 transition-opacity group-hover:opacity-40 bg-gradient-to-br ${themes[color]}`}
      />

      <div className="flex flex-col items-start gap-4 relative z-10 text-left">
        <div
          className={`p-3 rounded-2xl bg-gradient-to-br text-white shadow-lg ${themes[color]}`}
        >
          {icon}
        </div>
        <div>
          <p
            className={`text-[10px] font-black uppercase tracking-[0.2em] ${isDark ? "text-gray-500" : "text-gray-400"}`}
          >
            {title}
          </p>
          <h4
            className={`text-3xl font-black mt-1 ${isDark ? "text-white" : "text-gray-900"}`}
          >
            {value || 0}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default ManagerOverview;
