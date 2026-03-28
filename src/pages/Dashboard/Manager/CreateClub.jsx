import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import { useTheme } from "../../../contexts/ThemeContext/ThemeContext";
import {
  PlusCircle,
  Image as ImageIcon,
  MapPin,
  Tag,
  DollarSign,
  AlignLeft,
  Send,
} from "lucide-react";

const CreateClub = () => {
  const axiosSecure = useAxiosSecure();
  const { isDark } = useTheme();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const handleClub = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", data.bannerImage[0]);

      const uploadUrl = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host_key
      }`;
      const uploadRes = await axios.post(uploadUrl, formData);
      const bannerUrl = uploadRes.data.data.url;

      const clubData = {
        clubName: data.clubName,
        description: data.description,
        category: data.category,
        location: data.location,
        bannerImage: bannerUrl,
        membershipFee: parseFloat(data.membershipFee),
        member: 0,
        status: "pending", // Default status
      };

      const res = await axiosSecure.post("/clubs", clubData);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Club Created!",
          text: "Your club is now pending admin approval",
          background: isDark ? "#0b0514" : "#fff",
          color: isDark ? "#fff" : "#000",
          confirmButtonColor: "#db2777",
        });
        reset();
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        background: isDark ? "#0b0514" : "#fff",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* --- Header Section --- */}
      <div className="text-center">
        <div
          className={`inline-flex p-4 rounded-3xl mb-4 ${isDark ? "bg-pink-500/10 text-pink-500" : "bg-teal-50 text-teal-600"}`}
        >
          <PlusCircle size={32} />
        </div>
        <h2
          className={`text-3xl font-black uppercase tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}
        >
          Launch a New{" "}
          <span className={isDark ? "text-pink-500" : "text-teal-600"}>
            Club
          </span>
        </h2>
        <p
          className={`text-sm font-medium mt-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}
        >
          Fill in the details below to start your community journey.
        </p>
      </div>

      {/* --- Form Section --- */}
      <div
        className={`p-8 rounded-[32px] border transition-all duration-500 ${
          isDark
            ? "bg-[#0b0514] border-white/5 shadow-2xl shadow-pink-500/5"
            : "bg-white border-gray-100 shadow-xl"
        }`}
      >
        <form onSubmit={handleSubmit(handleClub)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Club Name */}
            <div className="space-y-2">
              <label
                className={`text-xs font-black uppercase tracking-widest flex items-center gap-2 ${isDark ? "text-gray-500" : "text-gray-400"}`}
              >
                <PlusCircle size={14} /> Club Name
              </label>
              <input
                {...register("clubName", { required: true })}
                className={`w-full px-5 py-4 rounded-2xl border bg-transparent transition-all outline-none focus:ring-2 ${
                  isDark
                    ? "border-white/10 focus:border-pink-500/50 focus:ring-pink-500/10 text-white"
                    : "border-gray-200 focus:border-teal-500 focus:ring-teal-500/10"
                }`}
                placeholder="e.g. Dhaka Photography Club"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label
                className={`text-xs font-black uppercase tracking-widest flex items-center gap-2 ${isDark ? "text-gray-500" : "text-gray-400"}`}
              >
                <Tag size={14} /> Category
              </label>
              <input
                {...register("category", { required: true })}
                className={`w-full px-5 py-4 rounded-2xl border bg-transparent transition-all outline-none focus:ring-2 ${
                  isDark
                    ? "border-white/10 focus:border-pink-500/50 focus:ring-pink-500/10 text-white"
                    : "border-gray-200 focus:border-teal-500 focus:ring-teal-500/10"
                }`}
                placeholder="e.g. Sports, Art, Tech"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Location */}
            <div className="space-y-2">
              <label
                className={`text-xs font-black uppercase tracking-widest flex items-center gap-2 ${isDark ? "text-gray-500" : "text-gray-400"}`}
              >
                <MapPin size={14} /> Location
              </label>
              <input
                {...register("location", { required: true })}
                className={`w-full px-5 py-4 rounded-2xl border bg-transparent transition-all outline-none focus:ring-2 ${
                  isDark
                    ? "border-white/10 focus:border-pink-500/50 focus:ring-pink-500/10 text-white"
                    : "border-gray-200 focus:border-teal-500 focus:ring-teal-500/10"
                }`}
                placeholder="City or Area"
              />
            </div>

            {/* Membership Fee */}
            <div className="space-y-2">
              <label
                className={`text-xs font-black uppercase tracking-widest flex items-center gap-2 ${isDark ? "text-gray-500" : "text-gray-400"}`}
              >
                <DollarSign size={14} /> Membership Fee ($)
              </label>
              <input
                type="number"
                {...register("membershipFee", { required: true })}
                className={`w-full px-5 py-4 rounded-2xl border bg-transparent transition-all outline-none focus:ring-2 ${
                  isDark
                    ? "border-white/10 focus:border-pink-500/50 focus:ring-pink-500/10 text-white"
                    : "border-gray-200 focus:border-teal-500 focus:ring-teal-500/10"
                }`}
                placeholder="Amount"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label
              className={`text-xs font-black uppercase tracking-widest flex items-center gap-2 ${isDark ? "text-gray-500" : "text-gray-400"}`}
            >
              <AlignLeft size={14} /> Club Description
            </label>
            <textarea
              {...register("description", { required: true })}
              rows="4"
              className={`w-full px-5 py-4 rounded-2xl border bg-transparent transition-all outline-none focus:ring-2 ${
                isDark
                  ? "border-white/10 focus:border-pink-500/50 focus:ring-pink-500/10 text-white"
                  : "border-gray-200 focus:border-teal-500 focus:ring-teal-500/10"
              }`}
              placeholder="Tell us about your club's vision..."
            ></textarea>
          </div>

          {/* Banner Image */}
          <div className="space-y-2">
            <label
              className={`text-xs font-black uppercase tracking-widest flex items-center gap-2 ${isDark ? "text-gray-500" : "text-gray-400"}`}
            >
              <ImageIcon size={14} /> Banner Image
            </label>
            <div
              className={`relative group border-2 border-dashed rounded-[24px] transition-all p-8 text-center ${
                isDark
                  ? "border-white/10 hover:border-pink-500/40 bg-white/5"
                  : "border-gray-200 hover:border-teal-500 bg-gray-50"
              }`}
            >
              <input
                type="file"
                {...register("bannerImage", { required: true })}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="flex flex-col items-center gap-2 pointer-events-none">
                <ImageIcon
                  size={32}
                  className={isDark ? "text-pink-500/50" : "text-teal-500/50"}
                />
                <p
                  className={`text-sm font-bold ${isDark ? "text-gray-400" : "text-gray-600"}`}
                >
                  Click or drag to upload banner
                </p>
                <span className="text-[10px] uppercase tracking-widest opacity-40">
                  JPG, PNG up to 5MB
                </span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            disabled={loading}
            className={`w-full flex items-center justify-center gap-3 py-5 rounded-[24px] font-black uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 cursor-pointer
              ${
                isDark
                  ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-[0_10px_30px_rgba(219,39,119,0.3)] hover:shadow-[0_15px_40px_rgba(219,39,119,0.5)]"
                  : "bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40"
              }
            `}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <>
                <Send size={18} /> Create Club
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateClub;
