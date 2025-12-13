import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const ManageClubs = () => {
  const axiosSecure = useAxiosSecure();

  const { data: clubs = [], refetch } = useQuery({
    queryKey: ["clubs-admin"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/clubs");
      return res.data;
    },
  });
  const updateStatus = async (id, status) => {
    await axiosSecure.patch(`/admin/clubs/${id}`, { status });
    refetch;
  };
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Clubs</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Club</th>
            <th>Manager</th>
            <th>Status</th>
            <th>Members</th>
            <th>Events</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {clubs.map((c) => (
            <tr key={c._id}>
              <td>{c.clubName}</td>
              <td>{c.managerEmail}</td>
              <td>{c.membersCount}</td>
              <td>{c.eventsCount}</td>
              <td>
                <button
                  onClick={() => updateStatus(c._id, "approved")}
                  className="btn btn-sx"
                >
                  Approved
                </button>
                <button
                  onClick={() => updateStatus(c._id, "rejected")}
                  className="btn btn-sx"
                >
                  Rejected
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageClubs;
