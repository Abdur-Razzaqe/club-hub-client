import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useTheme } from "../../../contexts/ThemeContext/ThemeContext";
import {
  UserCheck,
  Mail,
  Calendar,
  Hash,
  ShieldCheck,
  Info,
} from "lucide-react";
import LoadingSpinner from "../../Common/LoadingSpinner";
import Swal from "sweetalert2";

const EventRegistrations = () => {
  const { eventId } = useParams();
  const { isDark } = useTheme();
  const axiosSecure = useAxiosSecure();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get(
        `/manager/events/${eventId}/registrations`,
      );
      setRegistrations(res.data);
    } catch (error) {
      console.error("Error fetching registrations.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (eventId) fetchRegistrations();
  }, [eventId]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-8 animate-in fade-in duration-700 px-2">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2
            className={`text-3xl font-black uppercase tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Event{" "}
            <span className={isDark ? "text-pink-500" : "text-teal-600"}>
              Attendees
            </span>
          </h2>
          <p
            className={`text-sm font-medium mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}
          >
            Monitoring registrations for Event ID:{" "}
            <span className="font-mono text-xs opacity-60">{eventId}</span>
          </p>
        </div>
        <div
          className={`flex items-center gap-2 px-5 py-2 rounded-2xl border font-bold text-xs uppercase tracking-widest ${isDark ? "bg-white/5 border-white/10 text-pink-500" : "bg-teal-50 border-teal-100 text-teal-700"}`}
        >
          <UserCheck size={16} /> Total: {registrations.length}
        </div>
      </div>

      {/* Conditional Rendering: Table or Empty State */}
      {registrations.length > 0 ? (
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
                  <Hash size={14} />
                </th>
                <th
                  className={`p-5 text-xs font-black uppercase tracking-widest text-left ${isDark ? "text-gray-400" : "text-gray-500"}`}
                >
                  User Info
                </th>
                <th
                  className={`p-5 text-xs font-black uppercase tracking-widest text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}
                >
                  Status
                </th>
                <th
                  className={`p-5 text-xs font-black uppercase tracking-widest text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}
                >
                  Joined At
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {registrations.map((reg, index) => (
                <tr
                  key={reg._id}
                  className={`group transition-all hover:bg-white/[0.02] ${isDark ? "text-gray-300" : "text-gray-700"}`}
                >
                  <td className="p-5 text-center font-bold text-xs opacity-50">
                    {index + 1}
                  </td>

                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-xl ${isDark ? "bg-white/5 text-gray-400" : "bg-gray-100 text-gray-500"}`}
                      >
                        <Mail size={16} />
                      </div>
                      <span className="font-bold text-sm tracking-tight">
                        {reg.userEmail}
                      </span>
                    </div>
                  </td>

                  <td className="p-5 text-center">
                    <span
                      className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border 
                      ${
                        reg.status === "confirmed"
                          ? isDark
                            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                            : "bg-emerald-100 text-emerald-700 border-emerald-200"
                          : isDark
                            ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                            : "bg-amber-100 text-amber-700 border-amber-200"
                      }`}
                    >
                      {reg.status || "Pending"}
                    </span>
                  </td>

                  <td className="p-5 text-center">
                    <div className="flex items-center justify-center gap-2 font-mono text-xs opacity-70">
                      <Calendar size={14} />
                      {reg.registeredAt
                        ? new Date(reg.registeredAt).toLocaleDateString(
                            undefined,
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            },
                          )
                        : "N/A"}
                    </div>
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
            <Info size={48} />
          </div>
          <h3
            className={`text-xl font-bold ${isDark ? "text-gray-400" : "text-gray-500"}`}
          >
            No registrations yet
          </h3>
          <p className="text-sm opacity-50 mt-2 italic">
            When users join this event, they will appear here.
          </p>
        </div>
      )}
    </div>
  );
};

export default EventRegistrations;
