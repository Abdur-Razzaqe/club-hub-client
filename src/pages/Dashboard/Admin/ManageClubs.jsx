import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

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
    try {
      await axiosSecure.patch(`/admin/clubs/${id}`, { status });
      Swal.fire({
        icon: "success",
        title: `Club ${status}`,
        text: `Club has been ${status} successfully!`,
      });

      refetch();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
      });
      console.error(error);
    }
  };
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Clubs</h2>
      <table className="table text-center">
        <thead>
          <tr>
            <th>Club</th>
            <th>Manager</th>
            <th>Status</th>
            <th>Membership Fee</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {clubs.map((c) => (
            <tr key={c._id}>
              <td>{c.clubName}</td>
              <td>{c.managerEmail}</td>
              <td>
                <span
                  className={`badge ${
                    c.status === "approved"
                      ? "badge-success"
                      : c.status === "rejected"
                      ? "badge-error"
                      : "badge-warning"
                  }`}
                >
                  {c.status}
                </span>
              </td>
              <td>{c.membershipFee}</td>

              <td className="gap-2">
                <button
                  onClick={() => updateStatus(c._id, "approved")}
                  className="btn btn-active btn-accent mr-2 "
                >
                  Approved
                </button>
                <button
                  onClick={() => updateStatus(c._id, "rejected")}
                  className="btn btn-active btn-error"
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
