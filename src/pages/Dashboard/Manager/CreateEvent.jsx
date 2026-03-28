import React, { useContext, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import { useTheme } from "../../../contexts/ThemeContext/ThemeContext";
import { useQuery } from "@tanstack/react-query";
import {
  Calendar,
  MapPin,
  Users,
  DollarSign,
  AlignLeft,
  Sparkles,
  Send,
  Building,
} from "lucide-react";

const CreateEvent = () => {
  const { user } = useContext(AuthContext);
  const { isDark } = useTheme();
  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: { isPaid: "false" },
  });
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  // Watch isPaid to show/hide Fee input
  const isPaid = useWatch({ control, name: "isPaid" });

  // Fetch Manager's Clubs to select from
  const { data: clubs = [] } = useQuery({
    queryKey: ["manager-clubs-list", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`manager/clubs?email=${user.email}`);
      return res.data;
    },
  });

  const handleEvent = async (data) => {
    setLoading(true);
    const eventInfo = {
      clubId: data.clubId,
      title: data.title,
      description: data.description,
      eventDate: new Date(data.eventDate),
      location: data.location,
      isPaid: data.isPaid === "true",
      eventFee: data.isPaid === "true" ? parseFloat(data.eventFee) : 0,
      maxAttendees: parseInt(data.maxAttendees),
      createdAt: new Date(),
      managerEmail: user?.email,
    };

    try {
      const res = await axiosSecure.post("/manager/my-events", eventInfo);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Event Live!",
          text: "Your event has been created successfully.",
          background: isDark ? "#0b0514" : "#fff",
          color: isDark ? "#fff" : "#000",
          confirmButtonColor: "#db2777",
        });
        reset();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700 px-2">
      {/* Header */}
      <div className="text-center">
        <div
          className={`inline-flex p-4 rounded-3xl mb-4 ${isDark ? "bg-purple-500/10 text-purple-400" : "bg-blue-50 text-blue-600"}`}
        >
          <Sparkles size={32} />
        </div>
        <h2
          className={`text-3xl font-black uppercase tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}
        >
          Plan an{" "}
          <span className={isDark ? "text-pink-500" : "text-teal-600"}>
            Event
          </span>
        </h2>
        <p
          className={`text-sm font-medium mt-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}
        >
          Create memorable experiences for your club members.
        </p>
      </div>

      {/* Form Card */}
      <div
        className={`p-8 rounded-[40px] border transition-all duration-500 ${
          isDark
            ? "bg-[#0b0514] border-white/5 shadow-2xl"
            : "bg-white border-gray-100 shadow-xl"
        }`}
      >
        <form onSubmit={handleSubmit(handleEvent)} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 flex items-center gap-2">
              <Sparkles size={14} /> Event Title
            </label>
            <input
              {...register("title", { required: true })}
              className={`w-full px-6 py-4 rounded-2xl border bg-transparent transition-all outline-none focus:ring-2 ${
                isDark
                  ? "border-white/10 focus:border-pink-500/50 focus:ring-pink-500/10 text-white"
                  : "border-gray-200 focus:border-teal-500 focus:ring-teal-500/10"
              }`}
              placeholder="e.g. Annual Networking Gala"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Club Selection */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 flex items-center gap-2">
                <Building size={14} /> Select Club
              </label>
              <select
                {...register("clubId", { required: true })}
                className={`select w-full h-[58px] px-6 rounded-2xl border bg-transparent transition-all outline-none ${
                  isDark
                    ? "border-white/10 focus:border-pink-500/50 text-white"
                    : "border-gray-200 focus:border-teal-500"
                }`}
              >
                <option disabled selected value="">
                  Pick a club
                </option>
                {clubs.map((club) => (
                  <option key={club._id} value={club._id}>
                    {club.clubName}
                  </option>
                ))}
              </select>
            </div>

            {/* Event Date & Time Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 flex items-center gap-2">
                <Calendar size={14} /> Date & Event Time
              </label>
              <div className="relative group">
                <input
                  {...register("eventDate", { required: true })}
                  type="datetime-local"
                  onClick={(e) => e.target.showPicker()}
                  className={`w-full px-6 py-4 rounded-2xl border bg-transparent transition-all outline-none cursor-pointer appearance-none ${
                    isDark
                      ? "border-white/10 focus:border-pink-500/50 text-white [color-scheme:dark]"
                      : "border-gray-200 focus:border-teal-500 text-gray-900"
                  }`}
                />
                {/* Subtle helper text */}
                <p className="text-[9px] mt-1 opacity-40 uppercase tracking-widest font-bold ml-1">
                  Select both date and start time
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Location */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 flex items-center gap-2">
                <MapPin size={14} /> Location
              </label>
              <input
                {...register("location", { required: true })}
                className={`w-full px-6 py-4 rounded-2xl border bg-transparent transition-all outline-none ${
                  isDark
                    ? "border-white/10 focus:border-pink-500/50 text-white"
                    : "border-gray-200 focus:border-teal-500"
                }`}
                placeholder="Venue name or address"
              />
            </div>

            {/* Max Attendees */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 flex items-center gap-2">
                <Users size={14} /> Max Capacity
              </label>
              <input
                type="number"
                {...register("maxAttendees", { required: true })}
                className={`w-full px-6 py-4 rounded-2xl border bg-transparent transition-all outline-none ${
                  isDark
                    ? "border-white/10 focus:border-pink-500/50 text-white"
                    : "border-gray-200 focus:border-teal-500"
                }`}
                placeholder="e.g. 100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            {/* Pricing Select */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 flex items-center gap-2">
                <DollarSign size={14} /> Pricing Type
              </label>
              <select
                {...register("isPaid")}
                className={`select w-full h-[58px] px-6 rounded-2xl border bg-transparent transition-all outline-none ${
                  isDark
                    ? "border-white/10 focus:border-pink-500/50 text-white"
                    : "border-gray-200 focus:border-teal-500"
                }`}
              >
                <option value="false">Free Event</option>
                <option value="true">Paid Event</option>
              </select>
            </div>

            {/* Fee (Conditional) */}
            {isPaid === "true" && (
              <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 flex items-center gap-2">
                  <DollarSign size={14} /> Entrance Fee ($)
                </label>
                <input
                  type="number"
                  {...register("eventFee")}
                  className={`w-full px-6 py-4 rounded-2xl border bg-transparent transition-all outline-none ${
                    isDark
                      ? "border-white/10 focus:border-pink-500/50 text-white shadow-[0_0_20px_rgba(236,72,153,0.1)]"
                      : "border-gray-200 focus:border-teal-500 shadow-sm"
                  }`}
                  placeholder="Amount"
                />
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 flex items-center gap-2">
              <AlignLeft size={14} /> Description
            </label>
            <textarea
              {...register("description", { required: true })}
              rows="4"
              className={`w-full px-6 py-4 rounded-[24px] border bg-transparent transition-all outline-none ${
                isDark
                  ? "border-white/10 focus:border-pink-500/50 text-white"
                  : "border-gray-200 focus:border-teal-500"
              }`}
              placeholder="What makes this event special?"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            disabled={loading}
            className={`w-full flex items-center justify-center gap-3 py-5 rounded-[24px] font-black uppercase tracking-[0.2em] transition-all active:scale-95 disabled:opacity-50
              ${
                isDark
                  ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-xl shadow-pink-500/20 hover:shadow-pink-500/40"
                  : "bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40"
              }
            `}
          >
            {loading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              <>
                <Send size={18} /> Publish Event
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
