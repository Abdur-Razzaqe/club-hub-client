import React, { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import UpdateClubModal from "./UpdateClubModal";
import { useTheme } from "../../../contexts/ThemeContext/ThemeContext";
import {
  LayoutGrid,
  Plus,
  Edit3,
  MapPin,
  Tag,
  Wallet,
  ShieldCheck,
  Clock,
} from "lucide-react";
import LoadingSpinner from "../../Common/LoadingSpinner";

const MyClubs = () => {
  const { user } = useContext(AuthContext);
  const { isDark } = useTheme();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedClub, setSelectedClub] = useState(null);

  const {
    data: clubs = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["manager-clubs", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`manager/clubs?email=${user.email}`);
      return res.data;
    },
  });

  const { register, handleSubmit, reset } = useForm();

  const createMutation = useMutation({
    mutationFn: async (data) => axiosSecure.post("/clubs", data),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Club Created",
        background: isDark ? "#0b0514" : "#fff",
        color: isDark ? "#fff" : "#000",
        confirmButtonColor: "#db2777",
      });
      queryClient.invalidateQueries(["manager-clubs"]);
      reset();
    },
  });

  const onSubmit = (data) => {
    // Ensure membershipFee is numeric
    const payload = {
      ...data,
      membershipFee: parseFloat(data.membershipFee) || 0,
    };
    createMutation.mutate(payload);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-10 animate-in fade-in duration-700 px-2">
      {/* --- Header --- */}
      <div className="flex items-center justify-between">
        <div>
          <h2
            className={`text-3xl font-black uppercase tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}
          >
            My{" "}
            <span className={isDark ? "text-pink-500" : "text-teal-600"}>
              Clubs
            </span>
          </h2>
          <p
            className={`text-sm font-medium mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}
          >
            Manage your registered clubs and their current status.
          </p>
        </div>
        <div
          className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-2xl border font-bold text-xs uppercase tracking-widest ${isDark ? "bg-white/5 border-white/10 text-pink-500" : "bg-teal-50 border-teal-100 text-teal-700"}`}
        >
          <LayoutGrid size={16} /> Total: {clubs.length}
        </div>
      </div>

      {/* --- Table Section --- */}
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
                Club Name
              </th>
              <th
                className={`p-5 text-xs font-black uppercase tracking-widest text-left ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                Info
              </th>
              <th
                className={`p-5 text-xs font-black uppercase tracking-widest text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                Fee
              </th>
              <th
                className={`p-5 text-xs font-black uppercase tracking-widest text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                Status
              </th>
              <th
                className={`p-5 text-xs font-black uppercase tracking-widest text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {clubs.map((club, i) => (
              <tr
                key={club._id}
                className={`group transition-all hover:bg-white/[0.02] ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                <td className="p-5 text-center font-bold text-xs opacity-50">
                  {i + 1}
                </td>
                <td className="p-5">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-xl ${isDark ? "bg-pink-500/10 text-pink-500" : "bg-teal-50 text-teal-600"}`}
                    >
                      <ShieldCheck size={18} />
                    </div>
                    <span className="font-bold text-sm tracking-tight">
                      {club.clubName}
                    </span>
                  </div>
                </td>
                <td className="p-5">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs flex items-center gap-1 opacity-70">
                      <Tag size={12} /> {club.category}
                    </span>
                    <span className="text-xs flex items-center gap-1 opacity-70">
                      <MapPin size={12} /> {club.location}
                    </span>
                  </div>
                </td>
                <td className="p-5 text-center font-mono font-bold text-sm">
                  <div className="flex items-center justify-center gap-1">
                    <Wallet size={14} className="opacity-40" />
                    {club.membershipFee > 0 ? (
                      `$${club.membershipFee}`
                    ) : (
                      <span className="text-emerald-500">Free</span>
                    )}
                  </div>
                </td>
                <td className="p-5 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border 
                    ${
                      club.status === "approved"
                        ? isDark
                          ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                          : "bg-emerald-100 text-emerald-700 border-emerald-200"
                        : isDark
                          ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                          : "bg-amber-100 text-amber-700 border-amber-200"
                    }`}
                  >
                    {club.status}
                  </span>
                </td>
                <td className="p-5 text-center">
                  <button
                    onClick={() => setSelectedClub(club)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95
                      ${
                        isDark
                          ? "bg-white/5 text-white border border-white/10 hover:bg-pink-600 hover:border-pink-600 shadow-lg shadow-black/20"
                          : "bg-gray-100 text-gray-700 hover:bg-teal-600 hover:text-white shadow-sm"
                      }
                    `}
                  >
                    <Edit3 size={14} /> Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {clubs.length === 0 && (
          <div className="p-20 text-center flex flex-col items-center gap-4 opacity-30 italic">
            <Clock size={48} />
            <p className="font-bold uppercase tracking-widest text-xs">
              No clubs found under your account
            </p>
          </div>
        )}
      </div>

      {/* --- Update Modal --- */}
      {selectedClub && (
        <UpdateClubModal
          club={selectedClub}
          onClose={() => setSelectedClub(null)}
          onUpdate={refetch}
        />
      )}
    </div>
  );
};

export default MyClubs;
