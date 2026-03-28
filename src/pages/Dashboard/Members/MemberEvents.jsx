import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "../../../contexts/ThemeContext/ThemeContext";
import LoadingSpinner from "../../Common/LoadingSpinner";
import { Calendar, Clock, Ticket, Building2, MapPin, Hash } from "lucide-react";

const MemberEvents = () => {
  const { user } = useContext(AuthContext);
  const { isDark } = useTheme();
  const axiosSecure = useAxiosSecure();

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["my-events", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/member/my-events");
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
            My{" "}
            <span className={isDark ? "text-pink-500" : "text-teal-600"}>
              Tickets
            </span>
          </h2>
          <p
            className={`text-sm font-medium mt-1 opacity-70 ${isDark ? "text-gray-400" : "text-gray-500"}`}
          >
            Keep track of all the events you've registered for.
          </p>
        </div>
        <div
          className={`flex items-center gap-2 px-5 py-2 rounded-2xl border font-bold text-xs uppercase tracking-widest ${isDark ? "bg-white/5 border-white/10 text-pink-500" : "bg-teal-50 border-teal-100 text-teal-700"}`}
        >
          <Ticket size={16} /> Registrations: {events.length}
        </div>
      </div>

      {events.length > 0 ? (
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
                  Event Details
                </th>
                <th
                  className={`p-5 text-xs font-black uppercase tracking-widest text-left ${isDark ? "text-gray-400" : "text-gray-500"}`}
                >
                  Club
                </th>
                <th
                  className={`p-5 text-xs font-black uppercase tracking-widest text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}
                >
                  Schedule
                </th>
                <th
                  className={`p-5 text-xs font-black uppercase tracking-widest text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {events.map((ev, index) => (
                <tr
                  key={ev._id}
                  className={`group transition-all hover:bg-white/[0.02] ${isDark ? "text-gray-300" : "text-gray-700"}`}
                >
                  <td className="p-5 text-center font-bold text-xs opacity-50">
                    {index + 1}
                  </td>

                  <td className="p-5">
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-sm tracking-tight group-hover:text-pink-500 transition-colors uppercase">
                        {ev?.title}
                      </span>
                      {ev?.location && (
                        <span className="flex items-center gap-1 text-[10px] opacity-50">
                          <MapPin size={10} /> {ev.location}
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="p-5">
                    <div className="flex items-center gap-2 text-xs font-semibold">
                      <Building2
                        size={14}
                        className={isDark ? "text-pink-500" : "text-teal-500"}
                      />
                      {ev?.clubName}
                    </div>
                  </td>

                  <td className="p-5 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-1 font-mono text-xs font-bold">
                        <Calendar size={12} className="opacity-40" />
                        {new Date(ev.eventDate).toLocaleDateString(undefined, {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                      <div
                        className={`px-2 py-0.5 rounded-md font-black text-[10px] flex items-center gap-1 ${
                          isDark
                            ? "bg-white/5 text-pink-400"
                            : "bg-gray-100 text-teal-600"
                        }`}
                      >
                        <Clock size={10} />
                        {new Date(ev.eventDate).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </td>

                  <td className="p-5 text-center">
                    <span
                      className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border 
                      ${
                        ev.status === "confirmed"
                          ? isDark
                            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                            : "bg-emerald-100 text-emerald-700 border-emerald-200"
                          : isDark
                            ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                            : "bg-amber-100 text-amber-700 border-amber-200"
                      }`}
                    >
                      {ev.status || "Pending"}
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
            isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
          }`}
        >
          <div
            className={`p-6 rounded-full mb-4 ${isDark ? "bg-white/5 text-gray-600" : "bg-white text-gray-300"}`}
          >
            <Ticket size={48} strokeWidth={1.5} />
          </div>
          <h3
            className={`text-xl font-bold ${isDark ? "text-gray-400" : "text-gray-500"}`}
          >
            No Tickets Found
          </h3>
          <p className="text-sm opacity-50 mt-2 italic">
            You haven't registered for any events yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default MemberEvents;
