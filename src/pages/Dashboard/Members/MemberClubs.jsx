import React, { useContext } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

const MemberClubs = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: Memberships = [] } = useQuery({
    queryKey: ["my-clubs", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/event-registrations/user/${user.email}`
      );
      return res.data.filter((m) => m.status === "registered");
    },
  });
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {Memberships.map((m) => (
        <div key={m._id} className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold">{m.clubName}</h2>
          <p>Location: {m.location}</p>
          <p>Status: {m.status}</p>
          <p>Expiry: {new Date(m.expiryDate).toLocaleDateString()}</p>
          <Link
            to={`/clubs/${m.clubId}`}
            className="text-teal-500 mt-2 inline-block"
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MemberClubs;
