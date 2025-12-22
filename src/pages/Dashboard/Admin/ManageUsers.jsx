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
    try {
      const res = await axiosSecure.patch(`/users/role/${id}`, { role });

      if (res.data.modifiedCount > 0)
        Swal.fire("Updated!", `Role Changed to ${role}`, "success");
      refetch();
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "role changed failed");
    }
  };
  return (
    <div className="p-6 ">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <table className="table text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, index) => (
            <tr key={u._id}>
              <td>{index + 1}</td>
              <td>{u.displayName}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button
                  onClick={() => changeRole(u._id, "admin")}
                  className="btn btn bg-green-500"
                >
                  Admin
                </button>
                <button
                  onClick={() => changeRole(u._id, "Manager")}
                  className="btn btn-sx bg-teal-400 ml-1"
                >
                  Manager
                </button>
                <button
                  onClick={() => changeRole(u._id, "member")}
                  className="btn btn-sx bg-yellow-500 ml-1"
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
