import React, { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import CreateEvent from "./CreateEvent";
import UpdateEventModal from "./UpdateEventModal";
import LoadingSpinner from "../../Common/LoadingSpinner";
import { useTheme } from "../../../contexts/ThemeContext/ThemeContext";
import {
  Calendar,
  MapPin,
  DollarSign,
  Edit3,
  Trash2,
  Ticket,
  Search,
  Clock,
} from "lucide-react";

const ManageEvent = () => {
  const { user } = useContext(AuthContext);
  const { isDark } = useTheme();
  const axiosSecure = useAxiosSecure();
  const [selectedEvent, setSelectedEvent] = useState(null);

  const {
    data: events = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["manager-events", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/manager/my-events?email=${user.email}`,
      );
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      background: isDark ? "#0b0514" : "#fff",
      color: isDark ? "#fff" : "#000",
      confirmButtonColor: "#e11d48",
      cancelButtonColor: isDark ? "#ffffff10" : "#gray",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/manager/my-events/${id}`);
        Swal.fire({
          title: "Deleted!",
          text: "Event has been removed.",
          icon: "success",
          background: isDark ? "#0b0514" : "#fff",
          color: isDark ? "#fff" : "#000",
        });
        refetch();
      } catch (error) {
        Swal.fire("Error", "Failed to delete event", "error");
      }
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-12 animate-in fade-in duration-700 px-2">
      {/* --- Section 1: Create Event Form --- */}
      <CreateEvent onCreated={refetch} />

      <hr
        className={`border-t ${isDark ? "border-white/5" : "border-gray-100"}`}
      />

      {/* --- Section 2: Manage Events List --- */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2
              className={`text-3xl font-black uppercase tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Existing{" "}
              <span className={isDark ? "text-pink-500" : "text-teal-600"}>
                Events
              </span>
            </h2>
            <p
              className={`text-sm font-medium mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}
            >
              Review, update, or cancel your upcoming club activities.
            </p>
          </div>
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl border font-bold text-xs uppercase tracking-widest ${isDark ? "bg-white/5 border-white/10 text-pink-500" : "bg-teal-50 border-teal-100 text-teal-700"}`}
          >
            <Ticket size={16} /> Total Events: {events.length}
          </div>
        </div>

        <div
          className={`overflow-x-auto rounded-[32px] border transition-all duration-500 ${
            isDark
              ? "bg-[#0b0514] border-white/5 shadow-2xl shadow-black/50"
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
                  Event Title
                </th>
                <th
                  className={`p-5 text-xs font-black uppercase tracking-widest text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}
                >
                  Schedule
                </th>
                <th
                  className={`p-5 text-xs font-black uppercase tracking-widest text-left ${isDark ? "text-gray-400" : "text-gray-500"}`}
                >
                  Venue
                </th>
                <th
                  className={`p-5 text-xs font-black uppercase tracking-widest text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}
                >
                  Fee
                </th>
                <th
                  className={`p-5 text-xs font-black uppercase tracking-widest text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {events.map((event, index) => (
                <tr
                  key={event._id}
                  className={`group transition-all hover:bg-white/[0.02] ${isDark ? "text-gray-300" : "text-gray-700"}`}
                >
                  <td className="p-5 text-center font-bold text-xs opacity-50">
                    {index + 1}
                  </td>

                  <td className="p-5">
                    <span className="font-bold text-sm tracking-tight group-hover:text-pink-500 transition-colors">
                      {event.title}
                    </span>
                  </td>

                  <td className="p-5 text-center">
                    <div className="flex flex-col items-center gap-1">
                      {/* Date Part */}
                      <div className="flex items-center gap-1 font-mono text-xs font-bold">
                        <Calendar size={12} className="opacity-40" />
                        {new Date(event.eventDate).toLocaleDateString(
                          undefined,
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </div>

                      <div
                        className={`px-2 py-1 rounded-lg font-black text-[10px] uppercase tracking-tighter flex items-center gap-1 ${
                          isDark
                            ? "bg-pink-500/10 text-pink-500"
                            : "bg-teal-50 text-teal-700"
                        }`}
                      >
                        <Clock size={10} />
                        {new Date(event.eventDate).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </div>
                    </div>
                  </td>

                  <td className="p-5">
                    <div className="flex items-center gap-2 text-xs opacity-70">
                      <MapPin size={14} />
                      {event.location}
                    </div>
                  </td>

                  <td className="p-5 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border 
                      ${
                        event.isPaid
                          ? isDark
                            ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                            : "bg-amber-100 text-amber-700 border-amber-200"
                          : isDark
                            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                            : "bg-emerald-100 text-emerald-700 border-emerald-200"
                      }`}
                    >
                      {event.isPaid ? `$${event.eventFee}` : "Free"}
                    </span>
                  </td>

                  <td className="p-5">
                    <div className="flex justify-center gap-3">
                      {/* Update Button */}
                      <button
                        onClick={() => setSelectedEvent(event)}
                        className={`p-2 rounded-xl border transition-all active:scale-95
                          ${isDark ? "bg-white/5 border-white/10 text-gray-400 hover:text-pink-500 hover:border-pink-500/50 shadow-lg" : "bg-gray-50 border-gray-200 text-gray-500 hover:bg-teal-50 hover:text-teal-600"}
                        `}
                      >
                        <Edit3 size={16} />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(event._id)}
                        className={`p-2 rounded-xl border transition-all active:scale-95
                          ${isDark ? "bg-rose-500/10 border-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white" : "bg-rose-50 border-rose-100 text-rose-600 hover:bg-rose-600 hover:text-white"}
                        `}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {events.length === 0 && (
            <div className="p-20 text-center flex flex-col items-center gap-4 opacity-30 italic">
              <Ticket size={48} />
              <p className="font-bold uppercase tracking-widest text-xs">
                No events scheduled yet
              </p>
            </div>
          )}
        </div>
      </div>

      {/* --- Update Modal --- */}
      {selectedEvent && (
        <UpdateEventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onUpdate={refetch}
        />
      )}
    </div>
  );
};

export default ManageEvent;
