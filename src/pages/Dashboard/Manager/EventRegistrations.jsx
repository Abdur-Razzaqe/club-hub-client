import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const EventRegistrations = () => {
  const { eventId } = useParams();
  console.log(eventId);
  const axiosSecure = useAxiosSecure();
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    const fetchRegistrations = async () => {
      console.log(eventId);

      const res = await axiosSecure.get(
        `/manager/events/${eventId}/registrations`
      );
      setRegistrations(res.data);
    };
    fetchRegistrations();
  }, [eventId]);

  return (
    <div>
      <div className="overflow-x-auto">
        <h2 className="text-2xl font-bold mb-5">Event Registrations</h2>
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>User Email</th>
              <th>Status</th>
              <th>Registered At</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg, index) => (
              <tr key={reg._id}>
                <th>{index + 1}</th>
                <td>{reg.userEmail}</td>
                <td>{reg.status}</td>
                <td>{new Date(reg.registeredAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventRegistrations;
