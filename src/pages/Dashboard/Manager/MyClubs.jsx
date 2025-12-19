import React, { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import UpdateClubModal from "./UpdateClubModal";

const MyClubs = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedClub, setSelectedClub] = useState();

  const { data: clubs = [], refetch } = useQuery({
    queryKey: ["manager-clubs", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`manager/clubs?email=${user.email}`);
      return res.data;
    },
  });
  const { register, handleSubmit, reset } = useForm();

  const createMutation = useMutation({
    mutationFn: async (data) => axiosSecure.post("/clubs", data),
    onSuccess: () => {
      Swal.fire("Success", "Club created", "success");
      queryClient.invalidateQueries(["manager-Clubs"]);
      reset();
    },
  });

  const onSubmit = (data) => {
    createMutation.mutate(data);
  };
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-5">My Clubs</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow rounded-xl p-6 mb-10 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          {...register("clubName")}
          placeholder="Club Name"
          className="input input-bordered"
        />
        <input
          {...register("location")}
          placeholder="Location"
          className="input input-bordered"
        />
        <input
          {...register("category")}
          placeholder="Category"
          className="input input-bordered"
        />
        <input
          {...register("membershipFee")}
          placeholder="membership Fee"
          className="input input-bordered"
        />
        <input
          type="file"
          {...register("bannerImage")}
          placeholder="Banner Image URL"
          className="input input-bordered col-span-2"
        />
        <textarea
          {...register("description")}
          placeholder="Description"
          className="textarea textarea-bordered col-span-2"
        />
        <button className="btn bnt-primary col-span-2">Create Club</button>
      </form>
      {selectedClub && (
        <UpdateClubModal
          club={selectedClub}
          onClose={() => setSelectedClub(null)}
          onUpdate={refetch}
        />
      )}{" "}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.map((club) => (
          <div
            key={club._id}
            className="bg-white rounded-xl shadow overflow-hidden"
          >
            <img
              src={club.bannerImage}
              alt="Banner Image"
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold">{club.clubName}</h3>
              <p className="text-sm text-gray-500">{club.location}</p>
              <p className="text-sm">{club.membershipFee}</p>
              <span
                className={`badge mt-2 ${
                  club.status === "approved" ? "badge-success" : "badge-warning"
                }`}
              >
                {club.status}
              </span>
              <button
                onClick={() => setSelectedClub(club)}
                className="btn btn-sm btn-outline mt-3"
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
      <UpdateClubModal />
    </div>
  );
};

export default MyClubs;
