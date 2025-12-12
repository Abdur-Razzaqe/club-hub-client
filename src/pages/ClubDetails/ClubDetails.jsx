import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ClubDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: club, isLoading } = useQuery({
    queryKey: ["club", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`clubs/${id}`);
      return res.data;
    },
  });
  if (isLoading) return <p className="text-center mt-10">Loading..</p>;
  if (!club) return <p className="text-center mt-10">Club Not Found</p>;

  const handleJoin = () =>
    Swal.fire({
      icon: "success",
      title: "Joined Club!",
      text: `You have successfully joined ${club.clubName}`,
    });
  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white shadow-md rounded-lg ">
      <img
        src={club.bannerImage}
        alt="club banner"
        className="w-full h-40 object-cover rounded-lg"
      />
      <h3 className="text-xl font-bold mt-3">{club.clubName}</h3>
      <p className="text-gray-600">{club.description?.slice(0, 80)}...</p>
      <div className="mt-3">
        <p className="text-sm">
          <span className="font-semibold">Category: </span>
          {club.category}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Location:</span> {club.location}
        </p>
        <p className="text-sm font-semibold text-teal-600">
          Fee: ${club.membershipFee}
        </p>
      </div>
      <button
        onClick={handleJoin}
        className="btn btn-sm mt-4 w-full  text-white bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500"
      >
        Join Club
      </button>
    </div>
  );
};

export default ClubDetails;
