import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AdminStats = () => {
  const axiosSecure = useAxiosSecure();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats");
      return res.data;
    },
  });
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex gap-2  ">
      <Card title="Total Users" value={data.totalUsers} />
      <Card title="Pending Clubs" value={data.clubs?.pending} />
      <Card title="Approved Clubs" value={data.clubs?.approved} />
      <Card title="Total Events" value={data.totalEvents} />
      <Card title="Total Payment" value={`$ {data.totalPayment}`} />
    </div>
  );
};
const Card = ({ title, value }) => (
  <div className="bg-white p-5 shadow rounded-xl">
    <h3 className="text-gray-500">{title}</h3>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

export default AdminStats;
