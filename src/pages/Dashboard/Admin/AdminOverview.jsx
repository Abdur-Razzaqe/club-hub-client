import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import MembershipChart from "./membershipChart";
import LoadingSpinner from "../../Common/LoadingSpinner";
import { useTheme } from "../../../contexts/ThemeContext/ThemeContext";
import {
  Users,
  Hourglass,
  CheckCircle,
  XCircle,
  CreditCard,
  Calendar,
  ShieldCheck,
} from "lucide-react";

const AdminOverview = () => {
  const axiosSecure = useAxiosSecure();
  const { isDark } = useTheme();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-overview"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/overview");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1
            className={`text-3xl font-black uppercase tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Admin{" "}
            <span className={isDark ? "text-pink-500" : "text-teal-600"}>
              Overview
            </span>
          </h1>
          <p
            className={`text-sm font-medium mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}
          >
            Real-time analytics and platform statistics.
          </p>
        </div>
        <div
          className={`px-4 py-2 rounded-xl border font-bold text-xs uppercase tracking-widest ${isDark ? "bg-pink-500/10 border-pink-500/20 text-pink-500" : "bg-teal-50 border-teal-100 text-teal-700"}`}
        >
          System Live
        </div>
      </div>

      {/* --- Stats Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={data.totalUsers}
          icon={<Users size={24} />}
          color="blue"
          isDark={isDark}
        />
        <StatCard
          title="Pending Clubs"
          value={data.clubs?.pending}
          icon={<Hourglass size={24} />}
          color="orange"
          isDark={isDark}
        />
        <StatCard
          title="Approved Clubs"
          value={data.clubs?.approved}
          icon={<CheckCircle size={24} />}
          color="green"
          isDark={isDark}
        />
        <StatCard
          title="Total Payment"
          value={`$${data.totalPayment ?? 0}`}
          icon={<CreditCard size={24} />}
          color="pink"
          isDark={isDark}
        />
        <StatCard
          title="Total Events"
          value={data.totalEvents}
          icon={<Calendar size={24} />}
          color="purple"
          isDark={isDark}
        />
        <StatCard
          title="Memberships"
          value={data.totalMemberships}
          icon={<ShieldCheck size={24} />}
          color="teal"
          isDark={isDark}
        />
        <StatCard
          title="Rejected"
          value={data.clubs?.rejected}
          icon={<XCircle size={24} />}
          color="red"
          isDark={isDark}
        />
      </div>

      {/* --- Chart Section --- */}
      <div
        className={`p-6 rounded-[32px] border transition-all duration-500 ${isDark ? "bg-[#0b0514] border-white/5 shadow-2xl shadow-pink-500/5" : "bg-white border-gray-100 shadow-xl"}`}
      >
        <div className="mb-6">
          <h3
            className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}
          >
            Membership Growth
          </h3>
        </div>
        <MembershipChart />
      </div>
    </div>
  );
};

/* --- Hero-Style Stat Card Component --- */
const StatCard = ({ title, value, icon, color, isDark }) => {
  const colors = {
    pink: "from-pink-500 to-rose-500 shadow-pink-500/20",
    blue: "from-blue-500 to-indigo-500 shadow-blue-500/20",
    green: "from-emerald-500 to-teal-500 shadow-emerald-500/20",
    orange: "from-orange-500 to-amber-500 shadow-orange-500/20",
    purple: "from-purple-500 to-violet-500 shadow-purple-500/20",
    teal: "from-teal-400 to-cyan-500 shadow-teal-400/20",
    red: "from-red-500 to-orange-600 shadow-red-500/20",
  };

  return (
    <div
      className={`group relative overflow-hidden p-6 rounded-[28px] border transition-all duration-300 hover:-translate-y-2 ${
        isDark
          ? "bg-[#0b0514] border-white/5 hover:border-pink-500/30"
          : "bg-white border-gray-100 shadow-md hover:shadow-xl"
      }`}
    >
      {/* Background Glow Effect */}
      <div
        className={`absolute -right-4 -top-4 w-24 h-24 blur-3xl rounded-full opacity-10 transition-opacity group-hover:opacity-30 bg-gradient-to-br ${colors[color]}`}
      />

      <div className="flex items-center gap-4 relative z-10">
        <div
          className={`p-3 rounded-2xl bg-gradient-to-br text-white shadow-lg ${colors[color]}`}
        >
          {icon}
        </div>
        <div>
          <p
            className={`text-xs font-bold uppercase tracking-widest ${isDark ? "text-gray-500" : "text-gray-400"}`}
          >
            {title}
          </p>
          <h4
            className={`text-2xl font-black mt-1 ${isDark ? "text-white" : "text-gray-900"}`}
          >
            {value}
          </h4>
        </div>
      </div>

      {/* Bottom Progress/Indicator Line */}
      <div className="mt-4 h-1 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
        <div
          className={`h-full w-2/3 rounded-full bg-gradient-to-r ${colors[color]}`}
        />
      </div>
    </div>
  );
};

export default AdminOverview;
