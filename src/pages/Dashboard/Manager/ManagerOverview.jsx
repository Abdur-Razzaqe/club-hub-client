import React, { useContext } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import { useQuery } from "@tanstack/react-query";

const ManagerOverview = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const { data = {}, isLoading } = useQuery({
    queryKey: ["manager-stats", user?.email],
    enabled: !user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/manager/stats?email=${user.email}`);
      return res.data;
    },
  });
  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manger Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow p-5 rounded-xl">
          <h3 className="text-lg">My Clubs </h3>
          <p className="text-3xl font-bold">{data.totalClubs}</p>
        </div>
        <div className="bg-white shadow p-5 rounded-xl">
          <h3 className="text-lg">Total Members </h3>
          <p className="text-3xl font-bold">{data.totalMembers}</p>
        </div>
        <div className="bg-white shadow p-5 rounded-xl">
          <h3 className="text-lg">Events Created </h3>
          <p className="text-3xl font-bold">{data.totalEvents}</p>
        </div>
      </div>
    </div>
  );
};

export default ManagerOverview;
