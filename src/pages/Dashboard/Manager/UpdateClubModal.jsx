import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UpdateClubModal = ({ club, onClose, onUpdate }) => {
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (club) {
      reset({
        clubName: club.clubName,
        description: club.description,
        location: club.location,
        membershipFee: club.membershipFee,
        category: club.category,
        bannerImage: club.bannerImage,
      });
    }
  }, [club, reset]);

  const axiosSecure = useAxiosSecure();
  const handleUpdate = async (data) => {
    try {
      const res = await axiosSecure.put(`/clubs/${club._id}`, data);
      if (res.data.modifiedCount) {
        Swal.fire("Update!", "Club details update successfully", "success");
        onUpdate();
        onClose();
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to update club", "error");
    }
  };
  if (!club) return null;
  return (
    <div className="fixed inset-0 bg-white bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl text-center font-bold mb-4">Update Club</h2>
        <form onSubmit={handleSubmit(handleUpdate)} className="space-y-3">
          <input
            {...register("clubName")}
            placeholder="Club Name"
            className="input input-bordered w-full"
          />
          <input
            {...register("category")}
            placeholder="Category"
            className="input input-bordered w-full"
          />
          <input
            {...register("location")}
            placeholder="Location"
            className="input input-bordered w-full"
          />
          <input
            {...register("membershipFee")}
            placeholder="Membership Fee"
            className="input input-bordered w-full"
          />
          <textarea
            {...register("description")}
            placeholder="Description"
            className="textarea textarea-bordered w-full"
          />
          <input
            {...register("bannerImage")}
            placeholder="Banner Image URL"
            className="input input-bordered w-full"
          />
          <div className="flex justify-between items-center gap-2 mt-2 ">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn ">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateClubModal;
