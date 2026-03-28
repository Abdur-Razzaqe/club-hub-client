import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Common/LoadingSpinner";
import { useTheme } from "../../../contexts/ThemeContext/ThemeContext";
import {
  CreditCard,
  Calendar,
  Hash,
  Building2,
  BadgeDollarSign,
  ArrowUpRight,
  CheckCircle2,
  Clock,
} from "lucide-react";

const MemberPaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const { isDark } = useTheme();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/member/payments");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-8 animate-in fade-in duration-700 px-2">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2
            className={`text-3xl font-black uppercase tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Payment{" "}
            <span className={isDark ? "text-pink-500" : "text-teal-600"}>
              History
            </span>
          </h2>
          <p
            className={`text-sm font-medium mt-1 opacity-70 ${isDark ? "text-gray-400" : "text-gray-500"}`}
          >
            Review your club memberships and event transactions.
          </p>
        </div>
        <div
          className={`flex items-center gap-2 px-5 py-2 rounded-2xl border font-bold text-xs uppercase tracking-widest ${isDark ? "bg-white/5 border-white/10 text-pink-500" : "bg-teal-50 border-teal-100 text-teal-700"}`}
        >
          <CreditCard size={16} /> Total Invoices: {payments.length}
        </div>
      </div>

      {payments.length > 0 ? (
        <div
          className={`overflow-x-auto rounded-[32px] border transition-all duration-500 ${
            isDark
              ? "bg-[#0b0514] border-white/5 shadow-2xl"
              : "bg-white border-gray-100 shadow-xl"
          }`}
        >
          <table className="table w-full border-collapse">
            <thead>
              <tr
                className={`${isDark ? "bg-white/5 border-b border-white/10" : "bg-gray-50 border-b border-gray-100"}`}
              >
                <th
                  className={`p-5 text-xs font-black uppercase tracking-widest ${isDark ? "text-gray-400" : "text-gray-500"}`}
                >
                  <Hash size={14} className="mx-auto" />
                </th>
                <th
                  className={`p-5 text-xs font-black uppercase tracking-widest text-left ${isDark ? "text-gray-400" : "text-gray-500"}`}
                >
                  Details
                </th>
                <th
                  className={`p-5 text-xs font-black uppercase tracking-widest text-left ${isDark ? "text-gray-400" : "text-gray-500"}`}
                >
                  Amount
                </th>
                <th
                  className={`p-5 text-xs font-black uppercase tracking-widest text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}
                >
                  Transaction Date
                </th>
                <th
                  className={`p-5 text-xs font-black uppercase tracking-widest text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {payments.map((p, index) => (
                <tr
                  key={p._id}
                  className={`group transition-all hover:bg-white/[0.02] ${isDark ? "text-gray-300" : "text-gray-700"}`}
                >
                  <td className="p-5 text-center font-bold text-xs opacity-40">
                    {index + 1}
                  </td>

                  <td className="p-5">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <Building2
                          size={14}
                          className={isDark ? "text-pink-500" : "text-teal-600"}
                        />
                        <span className="font-bold text-sm tracking-tight uppercase">
                          {p.clubName}
                        </span>
                      </div>
                      <span className="text-[10px] opacity-50 font-semibold uppercase tracking-widest ml-5">
                        Type: {p.type}
                      </span>
                    </div>
                  </td>

                  <td className="p-5">
                    <div className="flex items-center gap-1 font-black text-lg">
                      <span className={isDark ? "text-white" : "text-gray-900"}>
                        ${p.amount}
                      </span>
                      <ArrowUpRight size={14} className="opacity-30" />
                    </div>
                  </td>

                  <td className="p-5 text-center">
                    <div className="flex flex-col items-center gap-1 font-mono text-xs opacity-70">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} className="opacity-40" />
                        {new Date(p?.createdAt).toLocaleDateString(undefined, {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                      <span className="text-[9px] opacity-40 uppercase tracking-widest">
                        {new Date(p?.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </td>

                  <td className="p-5 text-center">
                    <span
                      className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border inline-flex items-center gap-1.5
                      ${
                        p.status === "succeeded" || p.status === "paid"
                          ? isDark
                            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                            : "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : isDark
                            ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                      {p.status === "succeeded" ? (
                        <CheckCircle2 size={12} />
                      ) : (
                        <Clock size={12} />
                      )}
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Empty State */
        <div
          className={`flex flex-col items-center justify-center p-20 rounded-[40px] border border-dashed transition-all ${
            isDark
              ? "bg-white/5 border-white/10 text-gray-400"
              : "bg-gray-50 border-gray-200 text-gray-500"
          }`}
        >
          <div
            className={`p-6 rounded-full mb-4 ${isDark ? "bg-white/5 text-gray-600" : "bg-white text-gray-300"}`}
          >
            <BadgeDollarSign size={48} strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold">No Payments Found</h3>
          <p className="text-sm opacity-50 mt-2 italic">
            You haven't made any transactions yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default MemberPaymentHistory;
