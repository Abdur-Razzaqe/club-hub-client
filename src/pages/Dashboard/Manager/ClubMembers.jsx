import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ClubMembers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["club-members"],
    queryFn: async () => {
      const res = await axiosSecure.get("/manager/club-members");
      return res.data;
    },
  });

  const expireMutation = useMutation({
    mutationFn: async (id) =>
      axiosSecure.patch(`/manager/memberships/${id}/expire`),
    onSuccess: () => {
      Swal.fire("Success", "Membership expired", "success");
      queryClient.invalidateQueries(["club-members"]);
    },
  });
  if (isLoading) return <p>Loading.....</p>;
  if (!data || data.members.length === 0) return <p>No member found</p>;
  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Clubs Members</h2>
      <table className="table table-zebra text-center">
        {/* head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Member Name</th>
            <th>Member Email</th>
            <th>Club</th>
            <th>Status</th>
            <th>Joined At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.members.map((member, index) => {
            const club = data.clubs.find((c) => c._id === member.clubId);
            return (
              <tr key={member._id}>
                <th>{index + 1}</th>
                <td>{member.userName}</td>
                <td>{member.userEmail}</td>
                <td>{club?.clubName || "N/A"}</td>
                <td>
                  <span
                    className={`badge ${
                      member.status === "active"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {member.status}
                  </span>
                </td>
                <td>{new Date(member.joinedAt).toLocaleDateString()}</td>
                <td>
                  {member.status === "active" && (
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => expireMutation.mutate(member._id)}
                    >
                      Expire
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ClubMembers;
