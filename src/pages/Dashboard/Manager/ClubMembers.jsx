import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import LoadingSpinner from "../../Common/LoadingSpinner";
import { useTheme } from "../../../contexts/ThemeContext/ThemeContext";
import {
  Users,
  Mail,
  Building,
  Calendar,
  ShieldAlert,
  UserMinus,
} from "lucide-react";

const ClubMembers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { isDark } = useTheme();

  const { data, isLoading } = useQuery({
    queryKey: ["club-members"],
    queryFn: async () => {
      const res = await axiosSecure.get("/manager/club-members");
      console.log("Manager Members Data:", res.data);
      return res.data;
    },
  });

  const expireMutation = useMutation({
    mutationFn: async (id) =>
      axiosSecure.patch(`/manager/memberships/${id}/expire`),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Membership Expired",
        background: isDark ? "#0b0514" : "#fff",
        color: isDark ? "#fff" : "#000",
        confirmButtonColor: "#e11d48",
      });
      queryClient.invalidateQueries(["club-members"]);
    },
  });

  if (isLoading) return <LoadingSpinner />;

  if (!data || data.members.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] opacity-50">
        <Users size={64} className="mb-4" />
        <h2 className="text-xl font-bold uppercase tracking-widest">
          No members found
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-700 px-2">
      {/* --- Header Section --- */}
      <div>
        <h2
          className={`text-3xl font-black uppercase tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}
        >
          Club{" "}
          <span className={isDark ? "text-pink-500" : "text-teal-600"}>
            Members
          </span>
        </h2>
        <p
          className={`text-sm font-medium mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}
        >
          Manage and monitor active memberships for your clubs.
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
                className={`p-5 text-xs font-black uppercase tracking-widest ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                #
              </th>
              <th
                className={`p-5 text-xs font-black uppercase tracking-widest text-left ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                Member Info
              </th>
              <th
                className={`p-5 text-xs font-black uppercase tracking-widest text-left ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                Club
              </th>
              <th
                className={`p-5 text-xs font-black uppercase tracking-widest text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                Status
              </th>
              <th
                className={`p-5 text-xs font-black uppercase tracking-widest text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                Joined
              </th>
              <th
                className={`p-5 text-xs font-black uppercase tracking-widest text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {data.members.map((member, index) => {
              const club = data.clubs.find((c) => c._id === member.clubId);
              return (
                <tr
                  key={member._id}
                  className={`group transition-all hover:bg-white/[0.02] ${isDark ? "text-gray-300" : "text-gray-700"}`}
                >
                  <td className="p-5 text-center font-bold text-xs opacity-50">
                    {index + 1}
                  </td>

                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-xl ${isDark ? "bg-pink-500/10 text-pink-500" : "bg-teal-50 text-teal-600"}`}
                      >
                        <Users size={16} />
                      </div>
                      <div>
                        <p className="font-bold text-sm tracking-tight">
                          {member.userName}
                        </p>
                        <p className="text-xs opacity-50 flex items-center gap-1">
                          <Mail size={12} /> {member.userEmail}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="p-5">
                    <div className="flex items-center gap-2">
                      <Building size={14} className="opacity-40" />
                      <span className="text-sm font-medium">
                        {club?.clubName || "N/A"}
                      </span>
                    </div>
                  </td>

                  <td className="p-5 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all 
                      ${
                        member.status === "active"
                          ? isDark
                            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]"
                            : "bg-emerald-100 text-emerald-700 border-emerald-200"
                          : isDark
                            ? "bg-rose-500/10 text-rose-500 border-rose-500/20"
                            : "bg-rose-100 text-rose-700 border-rose-200"
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>

                  <td className="p-5 text-center font-mono text-xs opacity-70">
                    <div className="flex items-center justify-center gap-1">
                      <Calendar size={12} />
                      {new Date(member.joinedAt).toLocaleDateString()}
                    </div>
                  </td>

                  <td className="p-5">
                    <div className="flex justify-center">
                      {member.status === "active" ? (
                        <button
                          onClick={() => expireMutation.mutate(member._id)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95
                            ${
                              isDark
                                ? "bg-amber-500/10 text-amber-500 border border-amber-500/20 hover:bg-amber-500 hover:text-white shadow-lg shadow-amber-500/10"
                                : "bg-amber-500 text-white hover:bg-amber-600 shadow-md"
                            }
                          `}
                        >
                          <UserMinus size={14} /> Expire
                        </button>
                      ) : (
                        <span className="text-[10px] font-bold opacity-30 italic">
                          No Actions
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClubMembers;
