import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";

const CreateEvent = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();

  const handleEvent = async (data) => {
    const eventInfo = {
      clubId: data.clubId,
      title: data.title,
      description: data.description,
      eventDate: new Date(data.eventDate),
      location: data.location,
      isPaid: data.isPaid === "true",
      eventFee: data.eventFee ? parseFloat(data.eventFee) : 0,
      maxAttendees: parseInt(data.maxAttendees),
      createdAt: new Date(),
      managerEmail: user?.email,
    };

    const res = await axiosSecure.post("/manager/my-events", eventInfo);
    if (res.data.insertedId) {
      Swal.fire({
        icon: "success",
        title: "Event created!",
        text: "Event created successfully!",
      });
      reset();
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 shadow rounded-xl bg-white">
      <h2 className="text-2xl font-bold mb-5">Created Event</h2>
      <form onSubmit={handleSubmit(handleEvent)} className="grid gap-4">
        <input
          {...register("title")}
          type="text"
          placeholder="Event title"
          className="input input-bordered"
        />
        <textarea
          {...register("description")}
          placeholder="Event Description"
          className="textarea textarea-bordered"
        />
        <input
          {...register("eventDate")}
          type="date"
          placeholder="Event title"
          className="input input-bordered"
        />
        <input
          {...register("location")}
          placeholder="Location"
          className="input input-bordered"
        />
        <select {...register("isPaid")} className="select select-bordered">
          <option value={false}>Free</option>
          <option value={true}>Paid</option>
        </select>
        <input
          {...register("eventFee")}
          type="number"
          placeholder="Event Fee"
          className="input input-bordered"
        />
        <input
          {...register("maxAttendees")}
          type="number"
          placeholder="Max Attendees"
          className="input input-bordered"
        />
        <button className="btn ">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
