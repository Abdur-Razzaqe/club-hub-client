import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Common/LoadingSpinner";

const MemberPaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/member/payments");
      return res.data;
    },
  });
  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Payment History</h2>

      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Club</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p, index) => (
            <tr key={p._id}>
              <th>{index + 1}</th>
              <td>${p.amount}</td>
              <td>{p.type}</td>
              <td>{p.clubName}</td>
              <td> {new Date(p?.createdAt).toLocaleDateString()}</td>
              <td>{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberPaymentHistory;
