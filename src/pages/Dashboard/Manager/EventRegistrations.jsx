import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const EventRegistrations = () => {
  const { eventId } = useParams();
  console.log(eventId);
  const axiosSecure = useAxiosSecure();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        setLoading(true);

        const res = await axiosSecure.get(
          `/manager/events/${eventId}/registrations`
        );
        setRegistrations(res.data);
      } catch (error) {
        console.error("Error fetching registrations.", error);
      } finally {
        setLoading(false);
      }
    };
    if (eventId) {
      fetchRegistrations();
    }
  }, [eventId, axiosSecure]);

  if (loading) return <p>Loading....</p>;

  return (
    <div>
      <div className="overflow-x-auto">
        <h2 className="text-2xl font-bold mb-5">Event Registrations</h2>
        {registrations.length > 0 ? (
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr className="bg-gray-100">
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
                  <td>{reg.userEmail || "N/A"}</td>
                  <td>
                    <span
                      className={`badge ${
                        reg.status === "confirmed"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {reg.status || "Pending"}
                    </span>
                  </td>
                  <td>
                    {reg.registeredAt
                      ? new Date(reg.registeredAt).toLocaleString()
                      : "Date not available"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-10 text-gray-500">
            No registrations found for this event yet
          </div>
        )}
      </div>
    </div>
  );
};

export default EventRegistrations;
