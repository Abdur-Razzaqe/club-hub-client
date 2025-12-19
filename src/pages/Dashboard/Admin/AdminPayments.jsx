import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Common/LoadingSpinner";

const AdminPayments = () => {
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["admin-payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/payments");
      return res.data;
    },
  });
  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Payments</h2>
      <table className="table w-full text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Club</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p, index) => (
            <tr key={p._id}>
              <td>{index + 1}</td>
              <td>{p.userEmail}</td>
              <td>{p.amount}</td>
              <td>{p.type}</td>
              <td>{p.clubName}</td>
              <td>{new Date(p.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPayments;
