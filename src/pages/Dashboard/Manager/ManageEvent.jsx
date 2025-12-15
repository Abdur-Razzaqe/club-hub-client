import React, { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import CreateEvent from "./CreateEvent";
import UpdateEventModal from "./UpdateEventModal";

const ManageEvent = () => {
  const { user } = useContext(AuthContext);
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
      const res = await axiosSecure.get(`/manager/events?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  const handleDelete = async (eventId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the event",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });
    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/events/${eventId}`);
      Swal.fire("Delete!", "Event has been deleted.", "success");
      refetch();
    }
  };
  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-5">Manage Events</h2>
      <CreateEvent onCreated={refetch} />
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Date</th>
            <th>Location</th>
            <th>Fee</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={event._id}>
              <th>{index + 1}</th>
              <td>{event.title}</td>
              <td>{new Date(event.eventDate).toLocaleTimeString()}</td>
              <td>{event.location}</td>
              <td>{event.isPaid ? `$${event.eventFee}` : "Free"}</td>
              <td className="space-x-2">
                <button
                  className="btn btn-sm"
                  onClick={() => setSelectedEvent(event)}
                >
                  Update
                </button>
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => handleDelete(event._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
