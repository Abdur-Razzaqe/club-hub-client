import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useTheme } from "../../../contexts/ThemeContext/ThemeContext";
import {
  CheckCircle,
  XCircle,
  Building2,
  UserCircle2,
  Wallet,
  ShieldAlert,
} from "lucide-react";

const ManageClubs = () => {
  const axiosSecure = useAxiosSecure();
  const { isDark } = useTheme();

  const { data: clubs = [], refetch } = useQuery({
    queryKey: ["clubs-admin"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/clubs");
      return res.data;
    },
  });

  const updateStatus = async (id, status) => {
    try {
      await axiosSecure.patch(`/admin/clubs/${id}`, { status });

      // SweetAlert Custom Styling
      Swal.fire({
        icon: "success",
        title: `<span style="color: ${isDark ? "#fff" : "#000"}">Club ${status}!</span>`,
        background: isDark ? "#0b0514" : "#fff",
        confirmButtonColor: status === "approved" ? "#0d9488" : "#e11d48",
        iconColor: status === "approved" ? "#10b981" : "#f43f5e",
        text: `The club has been successfully ${status}.`,
      });

      refetch();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        background: isDark ? "#0b0514" : "#fff",
        text: error.message,
      });
    }
  };

  // Helper for status badge styles
  const getStatusStyle = (status) => {
    switch (status) {
      case "approved":
        return isDark
          ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
          : "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "rejected":
        return isDark
          ? "bg-rose-500/10 text-rose-500 border-rose-500/20"
          : "bg-rose-100 text-rose-700 border-rose-200";
      default:
        return isDark
          ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
          : "bg-amber-100 text-amber-700 border-amber-200";
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* --- Header --- */}
      <div className="px-2">
        <h2
          className={`text-3xl font-black uppercase tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}
        >
          Club{" "}
          <span className={isDark ? "text-pink-500" : "text-teal-600"}>
            Management
          </span>
        </h2>
        <p
          className={`text-sm font-medium mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}
        >
          Review, approve, or decline club registration requests.
        </p>
      </div>

      {/* --- Table Container --- */}
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
                className={`p-5 text-xs font-black uppercase tracking-widest text-left ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                Club Details
              </th>
              <th
                className={`p-5 text-xs font-black uppercase tracking-widest text-left ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                Manager Info
              </th>
              <th
                className={`p-5 text-xs font-black uppercase tracking-widest text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                Status
              </th>
              <th
                className={`p-5 text-xs font-black uppercase tracking-widest text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                Fee
              </th>
              <th
                className={`p-5 text-xs font-black uppercase tracking-widest text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {clubs.map((c) => (
              <tr
                key={c._id}
                className={`group transition-all hover:bg-white/[0.02] ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                {/* Club Name */}
                <td className="p-5">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-xl ${isDark ? "bg-pink-500/10 text-pink-500" : "bg-teal-50 text-teal-600"}`}
                    >
                      <Building2 size={18} />
                    </div>
                    <span className="font-bold text-sm tracking-tight">
                      {c.clubName}
                    </span>
                  </div>
                </td>

                {/* Manager Email */}
                <td className="p-5">
                  <div className="flex items-center gap-2">
                    <UserCircle2 size={16} className="opacity-40" />
                    <span className="text-sm italic">{c.managerEmail}</span>
                  </div>
                </td>

                {/* Status Badge */}
                <td className="p-5 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border ${getStatusStyle(c.status)}`}
                  >
                    {c.status}
                  </span>
                </td>

                {/* Membership Fee */}
                <td className="p-5 text-center font-mono font-bold">
                  <div className="flex items-center justify-center gap-1">
                    <Wallet size={14} className="opacity-50" />$
                    {c.membershipFee}
                  </div>
                </td>

                {/* Action Buttons */}
                <td className="p-5">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      disabled={c.status === "approved"}
                      onClick={() => updateStatus(c._id, "approved")}
                      className={`flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold transition-all
                        ${
                          c.status === "approved"
                            ? "opacity-30 cursor-not-allowed grayscale"
                            : "bg-emerald-600 text-white hover:bg-emerald-700 hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/20"
                        }
                      `}
                    >
                      <CheckCircle size={14} /> Approve
                    </button>

                    <button
                      disabled={c.status === "rejected"}
                      onClick={() => updateStatus(c._id, "rejected")}
                      className={`flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold transition-all
                        ${
                          c.status === "rejected"
                            ? "opacity-30 cursor-not-allowed grayscale"
                            : "bg-rose-600 text-white hover:bg-rose-700 hover:scale-105 active:scale-95 shadow-lg shadow-rose-500/20"
                        }
                      `}
                    >
                      <XCircle size={14} /> Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {clubs.length === 0 && (
          <div className="p-20 text-center flex flex-col items-center gap-4 opacity-40">
            <ShieldAlert size={48} />
            <p className="font-bold uppercase tracking-[0.2em] text-xs">
              No pending registrations
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageClubs;
