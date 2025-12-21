import React, { useContext } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";

const EventDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { data: event, isLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/events/${id}`);
      console.log(res.data);
      return res.data;
    },
    enabled: !!id,
  });

  const handleRegister = async () => {
    if (!user) {
      return Swal.fire({
        icon: "error",
        title: "error",
        text: "You must be logged in to register!",
      }).then(() => navigate("/"));
    }

    try {
      if (event?.isPaid && event?.eventFee > 0) {
        const paymentInfo = {
          eventId: event._id,
          eventName: event.title,
          clubId: event.clubId,
          userEmail: user.Email,
          amount: event.eventFee,
          type: "registrations",
        };
        const res = await axiosSecure.post(
          "create-checkout-session",
          paymentInfo
        );
        if (res.data.url) {
          window.location.replace(res.data.url);
        }
        return;
      }
      const payload = {
        eventId: event._id,
        userEmail: user.email,
        clubId: event.clubId,
        status: "registered",
        registeredAt: new Date(),
      };

      const res = await axiosSecure.post("/event-registrations", payload);

      Swal.fire({
        icon: "success",
        title: "Registration",
        text: " Registered successfully",
      });
      console.log(res.data);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Registration failed",
        text: " error.response?.data?.message || error.message",
      });
    }
    if (isLoading) return <p>Loading...</p>;

    if (!event || Object.keys(event).length === 0) {
      return <p>event not found</p>;
    }
  };
  return (
    <div className="max-w-5xl mx-auto my-10 px-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-teal-500 to to-blue-500 text-white p-6">
          <h1 className="text-3xl font-bold">{event?.title}</h1>
          <p className="mt-2 opacity-90">
            {new Date(event?.eventDate).toLocaleDateString()}
          </p>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-gray-700 leading-relaxed">{event?.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <p className=" text-sm text-gray-500">Location: </p>
              <p className="font-semibold">Location: {event?.location}</p>
            </div>
            <div className="border rounded-lg p-4">
              <p className=" text-sm text-gray-500">Event Type </p>
              <p className="font-semibold">
                {event?.isPaid ? "Paid Event" : "Free Event"}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-6">
            <p className="text-xl font-bold text-teal-600">
              Fee: {event?.isPaid ? `$${event.eventFee}` : "Free"}
            </p>
            <button
              onClick={handleRegister}
              className="btn  bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white transition-all duration-300 px-80"
            >
              Register Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
