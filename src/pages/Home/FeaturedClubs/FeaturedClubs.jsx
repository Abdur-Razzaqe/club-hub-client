import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const FeaturedClubs = () => {
  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["featuredClubs"],
    queryFn: async () => {
      const res = await useAxiosSecure.get("/featured-clubs");
      return res.data;
    },
  });

  if (isLoading) return <p>loading....</p>;

  return (
    <div className="my-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Featured Clubs</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {clubs.map((club) => (
          <div
            key={club._id}
            className="p-4 rounded-xl shadow-lg bg-white/40 backdrop-blur-xl "
          >
            <img src={club.image} alt="" className="rounded-xl mb-3" />
            <h3 className="text-xl font-semibold">{club.name}</h3>
            <p className="text-gray-600">Members: {club.members}</p>
            <button className="btn btn-primary mt-3">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedClubs;
