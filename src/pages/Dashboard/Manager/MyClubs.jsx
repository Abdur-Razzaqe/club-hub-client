import React, { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import UpdateClubModal from "./UpdateClubModal";

const MyClubs = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [selectedClub, setSelectedClub] = useState(null);

  const {
    data: clubs = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["manager-clubs", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/manager/clubs?email=${user.email}`);
      return res.data;
    },
  });
  if (isLoading) return <p>Loading....</p>;
  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">My Clubs</h2>
      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th>Club Name</th>
            <th>Category</th>
            <th>Status</th>
            <th>Membership Fee</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {clubs.map((club) => (
            <tr key={club._id}>
              <td>{club.clubName}</td>
              <td>{club.category}</td>
              <td>{club.status || "Pending"}</td>
              <td>{club.membershipFee || 0}</td>
              <td>
                <button
                  onClick={() => setSelectedClub(club)}
                  className="btn btn-sm"
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedClub && (
        <UpdateClubModal
          club={selectedClub}
          onClose={() => setSelectedClub(null)}
          onUpdate={refetch}
        />
      )}
    </div>
  );
};

export default MyClubs;
