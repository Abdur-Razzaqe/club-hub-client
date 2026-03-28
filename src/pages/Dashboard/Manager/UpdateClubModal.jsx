import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useTheme } from "../../../contexts/ThemeContext/ThemeContext";
import {
  X,
  Edit3,
  MapPin,
  Tag,
  Wallet,
  AlignLeft,
  Image as ImageIcon,
} from "lucide-react";

const UpdateClubModal = ({ club, onClose, onUpdate }) => {
  const { isDark } = useTheme();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (club) {
      reset({
        clubName: club.clubName,
        description: club.description,
        location: club.location,
        membershipFee: club.membershipFee,
        category: club.category,
        bannerImage: club.bannerImage,
      });
    }
  }, [club, reset]);

  const handleUpdate = async (data) => {
    try {
      const res = await axiosSecure.put(`/clubs/${club._id}`, {
        ...data,
        membershipFee: parseFloat(data.membershipFee),
      });

      if (res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Club details updated successfully",
          background: isDark ? "#0b0514" : "#fff",
          color: isDark ? "#fff" : "#000",
          confirmButtonColor: "#db2777",
        });
        onUpdate();
        onClose();
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        background: isDark ? "#0b0514" : "#fff",
      });
    }
  };

  if (!club) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div
        className={`relative w-full max-w-lg rounded-[32px] border shadow-2xl transition-all duration-500 overflow-hidden ${
          isDark ? "bg-[#0b0514] border-white/10" : "bg-white border-gray-100"
        }`}
      >
        {/* Modal Header */}
        <div
          className={`p-6 border-b flex items-center justify-between ${isDark ? "border-white/5 bg-white/5" : "border-gray-100 bg-gray-50"}`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-xl ${isDark ? "bg-pink-500/20 text-pink-500" : "bg-teal-500/10 text-teal-600"}`}
            >
              <Edit3 size={20} />
            </div>
            <h2
              className={`text-xl font-black uppercase tracking-tight ${isDark ? "text-white" : "text-gray-800"}`}
            >
              Update{" "}
              <span className={isDark ? "text-pink-500" : "text-teal-600"}>
                Club
              </span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors ${isDark ? "hover:bg-white/10 text-gray-400" : "hover:bg-gray-200 text-gray-500"}`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit(handleUpdate)} className="p-8 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            {/* Club Name */}
            <div className="col-span-2 space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-50 ml-1">
                Club Name
              </label>
              <input
                {...register("clubName")}
                className={`w-full px-4 py-3 rounded-2xl border bg-transparent outline-none focus:ring-2 transition-all ${
                  isDark
                    ? "border-white/10 focus:border-pink-500/50 focus:ring-pink-500/10 text-white"
                    : "border-gray-200 focus:border-teal-500 focus:ring-teal-500/10"
                }`}
              />
            </div>

            {/* Category */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-50 ml-1">
                Category
              </label>
              <input
                {...register("category")}
                className={`w-full px-4 py-3 rounded-2xl border bg-transparent outline-none focus:ring-2 transition-all ${
                  isDark
                    ? "border-white/10 focus:border-pink-500/50 focus:ring-pink-500/10 text-white"
                    : "border-gray-200 focus:border-teal-500 focus:ring-teal-500/10"
                }`}
              />
            </div>

            {/* Fee */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-50 ml-1">
                Fee ($)
              </label>
              <input
                type="number"
                {...register("membershipFee")}
                className={`w-full px-4 py-3 rounded-2xl border bg-transparent outline-none focus:ring-2 transition-all ${
                  isDark
                    ? "border-white/10 focus:border-pink-500/50 focus:ring-pink-500/10 text-white"
                    : "border-gray-200 focus:border-teal-500 focus:ring-teal-500/10"
                }`}
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest opacity-50 ml-1">
              Location
            </label>
            <input
              {...register("location")}
              className={`w-full px-4 py-3 rounded-2xl border bg-transparent outline-none focus:ring-2 transition-all ${
                isDark
                  ? "border-white/10 focus:border-pink-500/50 focus:ring-pink-500/10 text-white"
                  : "border-gray-200 focus:border-teal-500 focus:ring-teal-500/10"
              }`}
            />
          </div>

          {/* Image URL */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest opacity-50 ml-1">
              Banner URL
            </label>
            <input
              {...register("bannerImage")}
              className={`w-full px-4 py-3 rounded-2xl border bg-transparent outline-none focus:ring-2 transition-all ${
                isDark
                  ? "border-white/10 focus:border-pink-500/50 focus:ring-pink-500/10 text-white"
                  : "border-gray-200 focus:border-teal-500 focus:ring-teal-500/10"
              }`}
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest opacity-50 ml-1">
              Description
            </label>
            <textarea
              {...register("description")}
              rows="3"
              className={`w-full px-4 py-3 rounded-2xl border bg-transparent outline-none focus:ring-2 transition-all ${
                isDark
                  ? "border-white/10 focus:border-pink-500/50 focus:ring-pink-500/10 text-white"
                  : "border-gray-200 focus:border-teal-500 focus:ring-teal-500/10"
              }`}
            />
          </div>

          {/* Footer Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all active:scale-95 border ${
                isDark
                  ? "border-white/10 hover:bg-white/5 text-white"
                  : "border-gray-200 hover:bg-gray-50 text-gray-700"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`flex-1 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all active:scale-95 text-white shadow-xl cursor-pointer ${
                isDark
                  ? "bg-gradient-to-r from-pink-600 to-purple-600 shadow-pink-500/20 hover:shadow-pink-500/40"
                  : "bg-gradient-to-r from-teal-500 to-blue-600 shadow-teal-500/20 hover:shadow-teal-500/40"
              }`}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateClubModal;
