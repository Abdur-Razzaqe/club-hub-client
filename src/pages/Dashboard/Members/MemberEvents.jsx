import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MemberEvents = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: events = [] } = useQuery({
    queryKey: ["my-events", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/event-registrations/user/${user.email}`
      );
      return res.data;
    },
  });
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Event</th>
            <th>Club</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {events.map((ev, index) => (
            <tr key={ev._id}>
              <th>{index + 1}</th>
              <td>{ev.eventTitle}</td>
              <td>{ev.clubName}</td>
              <td>{new Date(ev.eventDate).toLocaleString()}</td>
              <td>{ev.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberEvents;
