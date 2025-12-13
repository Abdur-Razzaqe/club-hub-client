import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/users");
      return res.data;
    },
  });

  const changeRole = async (id, role) => {
    await axiosSecure.patch(`/admin/users/${id}`, { role });
    Swal.fire("Updated!", "Role Changed", "success");
    refetch();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button
                  onClick={() => changeRole(u._id, "admin")}
                  className="btn btn-sx"
                >
                  Admin
                </button>
                <button
                  onClick={() => changeRole(u._id, "clubManager")}
                  className="btn btn-sx"
                >
                  Manager
                </button>
                <button
                  onClick={() => changeRole(u._id, "member")}
                  className="btn btn-sx"
                >
                  Member
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
