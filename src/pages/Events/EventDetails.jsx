import React, { useContext } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";

const EventDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  //   const [isRegistered, setIsRegistered] = useState(false);

  const { data: event, isLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/events/${id}`);
      console.log(res.data);
      return res.data;
    },
  });

  const handleRegister = async () => {
    if (!user) {
      return Swal.fire({
        icon: "error",
        title: "error",
        text: "You must be logged in to register!",
      });
    }
    console.log("event id:", id);
    console.log("event:", event);
    await axiosSecure.post("/event-registrations", {
      eventId: id,
      userEmail: user.email,
      clubId: event.clubId,

      //   paymentId: event.isPaid ? paymentIntentId : null,
    });
    Swal.fire({
      icon: "success",
      title: "Registration",
      text: " Registered successfully",
    });
  };
  if (isLoading) return <p>Loading...</p>;

  if (!event || Object.keys(event).length === 0) {
    return <p>event not found</p>;
  }

  return (
    <div
      key={event?._id}
      className="max-w-4xl mx-auto my-10 p-5 border shadow rounded-xl"
    >
      <h3 className="text-3xl font-bold">{event.title}</h3>
      <p className="text-gray-600 mt-2">{event?.description}</p>
      <p className="mt-4 text-xl">Location: {event?.location}</p>
      <p className="text-lg">{new Date(event.eventDate).toLocaleString()}</p>
      <p className="font-semibold mt-3">
        {event?.isPaid ? `Fee: $${event.eventFee}` : "Free Event"}
      </p>
      <button onClick={handleRegister} className="btn ">
        Register
      </button>
    </div>
  );
};

export default EventDetails;
