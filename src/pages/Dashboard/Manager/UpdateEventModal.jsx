import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const UpdateEventModal = ({ event, onClose, onUpdate }) => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit } = useForm({
    defaultValues: event,
  });

  const handleUpdate = async (data) => {
    await axiosSecure.put(`/events/${event._id}`, data);
    Swal.fire("Update!", "Event has been update.", "success");
    if (onUpdate) onUpdate();
    onClose();
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Update Event</h3>
        <form onSubmit={handleSubmit(handleUpdate)} className="space-y-3">
          <input
            {...register("title")}
            placeholder="Event Title"
            className="input input-bordered w-full"
          />
          <textarea
            {...register("description")}
            placeholder="Description"
            className="textarea textarea-bordered w-full"
          />
          <input
            {...register("eventDate")}
            type="date"
            placeholder="Category"
            className="input input-bordered w-full"
          />
          <input
            {...register("location")}
            placeholder="Location"
            className="input input-bordered w-full"
          />
          <select
            {...register("isPaid")}
            className="select select-bordered w-full"
          >
            <option value="false">Free</option>
            <option value="true">Paid</option>
          </select>

          <input
            {...register("eventFee")}
            placeholder="Event Fee"
            className="input input-bordered w-full"
          />
          <input
            {...register("maxAttendees")}
            placeholder="Max Attendees"
            className="input input-bordered w-full"
          />
          <div className="flex justify-end gap-2 mt-2">
            <button type="submit" className="btn btn-primary">
              Update
            </button>
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEventModal;
