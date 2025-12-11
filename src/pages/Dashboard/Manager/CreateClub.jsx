import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";

const CreateClub = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const handleClub = async (data) => {
    const formData = new FormData();
    formData.append("image", data.bannerImage[0]);

    const uploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_host_key
    }`;
    const uploadRes = await axios.post(uploadUrl, formData);
    const bannerUrl = uploadRes.data.data.url;
    const clubData = {
      clubName: data.clubName,
      description: data.description,
      category: data.category,
      location: data.location,
      bannerImage: bannerUrl,
      membershipFee: parseFloat(data.membershipFee),
      status: "pending",
      member: 0,
      manageEmail: user?.email,
      createdAt: new Date(),
    };
    const res = await axiosSecure.post("/clubs", clubData);
    if (res.data.insertedId) {
      Swal.fire({
        icon: "success",
        title: "Club Created!",
        text: "Your club is now pending admin approval",
      });
      reset();
    }
  };
  return (
    <div className="max-w-xl mx-auto bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create a New Club</h2>
      <form onSubmit={handleSubmit(handleClub)} className="space-y-4">
        <input
          {...register("clubName", { required: true })}
          placeholder="Club Name"
          className="input input-border w-full "
        />

        <textarea
          {...register("description", { required: true })}
          placeholder="Club Description"
          className="textarea textarea-border w-full"
        ></textarea>

        <input
          {...register("category", { required: true })}
          placeholder="Club Category"
          className="input input-border w-full "
        />
        <input
          {...register("location", { required: true })}
          placeholder="Location (City / Area)"
          className="input input-border w-full "
        />
        <input
          type="file"
          {...register("bannerImage", { required: true })}
          placeholder="Banner Image URL"
          className="file-input  file-input-bordered w-full "
        />
        <input
          type="number"
          {...register("membershipFee", { required: true })}
          placeholder="Amount"
          className="input input-border w-full "
        />
        <button className="btn bnt-primary w-full">Create Club</button>
      </form>
    </div>
  );
};

export default CreateClub;
