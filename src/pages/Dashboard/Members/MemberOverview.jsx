import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MemberOverview = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: clubs = [] } = useQuery({
    queryKey: ["member-clubs", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/event-registrations/user/${user.email}`
      );
      return res.data;
    },
  });

  const { data: events = [] } = useQuery({
    queryKey: ["member-events", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/event-registrations/user/${user.email}`
      );
      return res.data;
    },
  });

  const upcomingEvents = events.filter(
    (ev) => new Date(ev.eventDate) > new Date()
  );

  return (
    <div className="grid md:grid-cols-3 gap-6 mb-6">
      <div className="p-4 bg-white rounded shadow">
        <h2 className="text-xl font-bold">Total Clubs Joined</h2>
        <p className="text-3xl">{clubs.length}</p>
      </div>
      <div className="p-4 bg-white rounded shadow">
        <h2 className="text-xl font-bold">Total Events Registered</h2>
        <p className="text-3xl">{events.length}</p>
      </div>
      <div className="p-4 bg-white rounded shadow">
        <h2 className="text-xl font-bold">Upcoming Events</h2>
        <ul>
          {upcomingEvents.map((ev) => (
            <li key={ev._id}>
              {ev.title} - {new Date(ev.eventDate).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MemberOverview;
