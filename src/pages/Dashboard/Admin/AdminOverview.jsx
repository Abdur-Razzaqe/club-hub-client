import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import MembershipChart from "./membershipChart";
import LoadingSpinner from "../../Common/LoadingSpinner";

const AdminOverview = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-overview"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/overview");
      return res.data;
    },
  });
  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Overview</h1>
      <div className="flex justify-between items-center gap-2  ">
        <Card title="Total Users" value={data.totalUsers} />
        <Card title="Pending Clubs" value={data.clubs?.pending} />
        <Card title="Approved Clubs" value={data.clubs?.approved} />
        <Card title="Rejected Clubs" value={data.clubs?.rejected} />

        <Card title="Total Memberships" value={data.totalMemberships} />

        <Card title="Total Events" value={data.totalEvents} />
        <Card title="Total Payment" value={`$ ${data.totalPayment ?? 0}`} />
      </div>
      <MembershipChart />
    </div>
  );
};
const Card = ({ title, value }) => (
  <div className="bg-white p-5 shadow rounded-xl">
    <h3 className="text-gray-500">{title}</h3>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

export default AdminOverview;
