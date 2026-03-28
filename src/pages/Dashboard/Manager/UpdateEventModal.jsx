import React from "react";
import { useForm, useWatch } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useTheme } from "../../../contexts/ThemeContext/ThemeContext";
import { X, Edit3 } from "lucide-react";

const UpdateEventModal = ({ event, onClose, onUpdate }) => {
  const { isDark } = useTheme();
  const axiosSecure = useAxiosSecure();

  // datetime-local format (YYYY-MM-DDTHH:mm)
  const formattedDate = event?.eventDate
    ? new Date(event.eventDate).toISOString().slice(0, 16)
    : "";

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      title: event.title,
      description: event.description,
      eventDate: formattedDate,
      location: event.location,
      isPaid: event.isPaid ? "true" : "false",
      eventFee: event.eventFee,
      maxAttendees: event.maxAttendees,
    },
  });

  // Watch isPaid to show/hide Fee input during update
  const isPaid = useWatch({ control, name: "isPaid" });

  const handleUpdate = async (data) => {
    const updateData = {
      ...data,
      eventDate: new Date(data.eventDate), // Save as Date object
      isPaid: data.isPaid === "true",
      eventFee: data.isPaid === "true" ? Number(data.eventFee) : 0,
      maxAttendees: Number(data.maxAttendees),
    };

    try {
      const res = await axiosSecure.put(
        `/manager/my-events/${event._id}`,
        updateData,
      );
      if (res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Update!",
          text: "Event details updated successfully.",
          background: isDark ? "#0b0514" : "#fff",
          color: isDark ? "#fff" : "#000",
          confirmButtonColor: "#db2777",
        });
        if (onUpdate) onUpdate();
        onClose();
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to update event", "error");
    }
  };

  if (!event) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div
        className={`relative w-full max-w-2xl rounded-[32px] border shadow-2xl transition-all duration-500 overflow-hidden ${
          isDark ? "bg-[#0b0514] border-white/10" : "bg-white border-gray-100"
        }`}
      >
        {/* Header */}
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
              Edit{" "}
              <span className={isDark ? "text-pink-500" : "text-teal-600"}>
                Event
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

        {/* Form Body */}
        <form onSubmit={handleSubmit(handleUpdate)} className="p-8 space-y-5">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest opacity-50 ml-1">
              Event Title
            </label>
            <input
              {...register("title")}
              className={`w-full px-5 py-3 rounded-2xl border bg-transparent outline-none focus:ring-2 transition-all ${
                isDark
                  ? "border-white/10 focus:border-pink-500/50 text-white"
                  : "border-gray-200 focus:border-teal-500"
              }`}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* DateTime Input */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-50 ml-1">
                Date & Time
              </label>
              <input
                {...register("eventDate")}
                type="datetime-local"
                onClick={(e) => e.target.showPicker()}
                className={`w-full px-5 py-3 rounded-2xl border bg-transparent outline-none cursor-pointer ${
                  isDark
                    ? "border-white/10 focus:border-pink-500/50 text-white [color-scheme:dark]"
                    : "border-gray-200 focus:border-teal-500"
                }`}
              />
            </div>

            {/* Location */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-50 ml-1">
                Location
              </label>
              <input
                {...register("location")}
                className={`w-full px-5 py-3 rounded-2xl border bg-transparent outline-none focus:ring-2 transition-all ${
                  isDark
                    ? "border-white/10 focus:border-pink-500/50 text-white"
                    : "border-gray-200 focus:border-teal-500"
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Pricing */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-50 ml-1">
                Pricing
              </label>
              <select
                {...register("isPaid")}
                className={`w-full px-5 py-3 rounded-2xl border bg-transparent outline-none ${
                  isDark ? "border-white/10 text-white" : "border-gray-200"
                }`}
              >
                <option value="false">Free</option>
                <option value="true">Paid</option>
              </select>
            </div>

            {/* Fee */}
            <div
              className={`space-y-1 transition-all duration-300 ${isPaid === "true" ? "opacity-100" : "opacity-30 pointer-events-none"}`}
            >
              <label className="text-[10px] font-black uppercase tracking-widest opacity-50 ml-1">
                Fee ($)
              </label>
              <input
                type="number"
                {...register("eventFee")}
                disabled={isPaid !== "true"}
                className={`w-full px-5 py-3 rounded-2xl border bg-transparent outline-none focus:ring-2 transition-all ${
                  isDark
                    ? "border-white/10 focus:border-pink-500/50 text-white"
                    : "border-gray-200 focus:border-teal-500"
                }`}
              />
            </div>

            {/* Max Capacity */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-50 ml-1">
                Capacity
              </label>
              <input
                type="number"
                {...register("maxAttendees")}
                className={`w-full px-5 py-3 rounded-2xl border bg-transparent outline-none focus:ring-2 transition-all ${
                  isDark
                    ? "border-white/10 focus:border-pink-500/50 text-white"
                    : "border-gray-200 focus:border-teal-500"
                }`}
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest opacity-50 ml-1">
              Description
            </label>
            <textarea
              {...register("description")}
              rows="3"
              className={`w-full px-5 py-3 rounded-2xl border bg-transparent outline-none focus:ring-2 transition-all ${
                isDark
                  ? "border-white/10 focus:border-pink-500/50 text-white"
                  : "border-gray-200 focus:border-teal-500"
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
              Update Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEventModal;
