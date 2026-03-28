import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useTheme } from "../../../contexts/ThemeContext/ThemeContext";
import { UserCog, ShieldCheck, Star, User, Mail, Search } from "lucide-react";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { isDark } = useTheme();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/users");
      return res.data;
    },
  });

  const changeRole = async (id, role) => {
    try {
      const res = await axiosSecure.patch(`/users/role/${id}`, { role });

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: `<span style="color: ${isDark ? "#fff" : "#000"}">Role Updated!</span>`,
          text: `User is now a ${role}`,
          background: isDark ? "#0b0514" : "#fff",
          confirmButtonColor: "#db2777", // Pink-600
        });
        refetch();
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        background: isDark ? "#0b0514" : "#fff",
        text: "Could not change user role.",
      });
    }
  };

  // Helper for Role Badge Colors
  const getRoleBadge = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return isDark
          ? "bg-rose-500/10 text-rose-500 border-rose-500/20"
          : "bg-rose-100 text-rose-700 border-rose-200";
      case "manager":
        return isDark
          ? "bg-teal-500/10 text-teal-500 border-teal-500/20"
          : "bg-teal-100 text-teal-700 border-teal-200";
      default:
        return isDark
          ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
          : "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* --- Header --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
        <div>
          <h2
            className={`text-3xl font-black uppercase tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}
          >
            User{" "}
            <span className={isDark ? "text-pink-500" : "text-teal-600"}>
              Directory
            </span>
          </h2>
          <p
            className={`text-sm font-medium mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}
          >
            Manage permissions and assign roles to platform members.
          </p>
        </div>
        <div
          className={`flex items-center gap-3 px-5 py-2.5 rounded-2xl border ${isDark ? "bg-white/5 border-white/10 text-gray-300" : "bg-white border-gray-100 shadow-sm"}`}
        >
          <Search size={18} className="opacity-40" />
          <span className="text-sm font-bold opacity-60">
            Total Users: {users.length}
          </span>
        </div>
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
                className={`p-5 text-xs font-black uppercase tracking-widest text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                #
              </th>
              <th
                className={`p-5 text-xs font-black uppercase tracking-widest text-left ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                User Info
              </th>
              <th
                className={`p-5 text-xs font-black uppercase tracking-widest text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                Current Role
              </th>
              <th
                className={`p-5 text-xs font-black uppercase tracking-widest text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                Assign New Role
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {users.map((u, index) => (
              <tr
                key={u._id}
                className={`group transition-all hover:bg-white/[0.02] ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                <td className="p-5 text-center font-bold text-xs opacity-50">
                  {index + 1}
                </td>

                <td className="p-5">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={
                          u.photoURL ||
                          "https://i.ibb.co/vz6m6mS/user-placeholder.png"
                        }
                        className="w-10 h-10 rounded-xl object-cover"
                        alt=""
                      />
                      <div
                        className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[#0b0514] bg-emerald-500`}
                      />
                    </div>
                    <div>
                      <p
                        className={`font-bold text-sm tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}
                      >
                        {u.displayName}
                      </p>
                      <p className="text-xs opacity-50 flex items-center gap-1">
                        <Mail size={12} /> {u.email}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="p-5 text-center">
                  <span
                    className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getRoleBadge(u.role)}`}
                  >
                    {u.role || "Member"}
                  </span>
                </td>

                <td className="p-5">
                  <div className="flex items-center justify-center gap-2">
                    <ActionButton
                      label="Admin"
                      onClick={() => changeRole(u._id, "admin")}
                      active={u.role === "admin"}
                      color="rose"
                      icon={<ShieldCheck size={14} />}
                    />
                    <ActionButton
                      label="Manager"
                      onClick={() => changeRole(u._id, "manager")}
                      active={u.role === "manager"}
                      color="teal"
                      icon={<Star size={14} />}
                    />
                    <ActionButton
                      label="Member"
                      onClick={() => changeRole(u._id, "member")}
                      active={u.role === "member" || !u.role}
                      color="blue"
                      icon={<User size={14} />}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* --- Hero-Style Action Button Component --- */
const ActionButton = ({ label, onClick, active, color, icon }) => {
  const colorMap = {
    rose: "bg-rose-600 hover:bg-rose-700 shadow-rose-500/20",
    teal: "bg-teal-600 hover:bg-teal-700 shadow-teal-500/20",
    blue: "bg-blue-600 hover:bg-blue-700 shadow-blue-500/20",
  };

  return (
    <button
      disabled={active}
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all active:scale-95
        ${
          active
            ? "opacity-20 cursor-not-allowed grayscale"
            : `${colorMap[color]} text-white shadow-lg hover:scale-105 hover:-translate-y-0.5`
        }
      `}
    >
      {icon}
      {label}
    </button>
  );
};

export default ManageUsers;
