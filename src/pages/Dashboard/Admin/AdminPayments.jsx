import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Common/LoadingSpinner";
import { useTheme } from "../../../contexts/ThemeContext/ThemeContext";
import {
  CreditCard,
  Calendar,
  Mail,
  Building2,
  DollarSign,
} from "lucide-react";

const AdminPayments = () => {
  const axiosSecure = useAxiosSecure();
  const { isDark } = useTheme();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["admin-payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/payments");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
        <div>
          <h2
            className={`text-3xl font-black uppercase tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}
          >
            All{" "}
            <span className={isDark ? "text-pink-500" : "text-teal-600"}>
              Payments
            </span>
          </h2>
          <p
            className={`text-sm font-medium mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}
          >
            Manage and monitor all financial transactions across the platform.
          </p>
        </div>
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl border font-bold text-sm ${isDark ? "bg-white/5 border-white/10 text-pink-500" : "bg-teal-50 border-teal-100 text-teal-700"}`}
        >
          <CreditCard size={18} />
          Total: {payments.length}
        </div>
      </div>

      {/* --- Table Container --- */}
      <div
        className={`overflow-x-auto rounded-[32px] border transition-all duration-500 ${
          isDark
            ? "bg-[#0b0514] border-white/5 shadow-2xl shadow-pink-500/5"
            : "bg-white border-gray-100 shadow-xl"
        }`}
      >
        <table className="table w-full border-collapse">
          {/* Table Head */}
          <thead>
            <tr
              className={`${isDark ? "bg-white/5 border-b border-white/10" : "bg-gray-50 border-b border-gray-100"}`}
            >
              <th
                className={`p-5 text-xs font-black uppercase tracking-widest ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                #
              </th>
              <th
                className={`p-5 text-xs font-black uppercase tracking-widest text-left ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                User Info
              </th>
              <th
                className={`p-5 text-xs font-black uppercase tracking-widest text-left ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                Transaction
              </th>
              <th
                className={`p-5 text-xs font-black uppercase tracking-widest text-left ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                Club Context
              </th>
              <th
                className={`p-5 text-xs font-black uppercase tracking-widest text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                Date & Time
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-white/5">
            {payments.map((p, index) => (
              <tr
                key={p._id}
                className={`group transition-all duration-300 hover:bg-white/[0.02] ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                <td className="p-5 text-center font-bold text-xs opacity-50">
                  {index + 1}
                </td>

                <td className="p-5">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-xl ${isDark ? "bg-pink-500/10 text-pink-500" : "bg-teal-50 text-teal-600"}`}
                    >
                      <Mail size={16} />
                    </div>
                    <span className="font-semibold text-sm truncate max-w-[180px]">
                      {p.userEmail}
                    </span>
                  </div>
                </td>

                <td className="p-5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 font-black text-lg">
                      <DollarSign
                        size={16}
                        className={isDark ? "text-pink-500" : "text-teal-600"}
                      />
                      {p.amount}
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md ${
                        isDark
                          ? "bg-white/5 text-gray-400"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {p.type}
                    </span>
                  </div>
                </td>

                <td className="p-5">
                  <div className="flex items-center gap-2">
                    <Building2 size={16} className="opacity-40" />
                    <span
                      className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}
                    >
                      {p.clubName || "N/A"}
                    </span>
                  </div>
                </td>

                <td className="p-5">
                  <div className="flex flex-col items-center justify-center gap-1 opacity-70">
                    <div className="flex items-center gap-1 text-xs">
                      <Calendar size={12} />
                      {new Date(p.createdAt).toLocaleDateString()}
                    </div>
                    <span className="text-[10px] font-mono">
                      {new Date(p.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {payments.length === 0 && (
          <div className="p-20 text-center">
            <p className="text-gray-500 font-bold italic tracking-widest">
              No transaction history found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPayments;
