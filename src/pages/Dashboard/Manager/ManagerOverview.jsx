import React, { useContext } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Common/LoadingSpinner";

const ManagerOverview = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const { data = {}, isLoading } = useQuery({
    queryKey: ["manager-overview"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/manager/overview");
      return res.data;
    },
  });
  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manger Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 text-center">
        <div className="bg-white  shadow p-4 rounded-xl">
          <h3 className="text-lg">Clubs Managed </h3>
          <p className="text-3xl font-bold">{data.totalClubs || 0}</p>
        </div>
        <div className="bg-white shadow p-5 rounded-xl">
          <h3 className="text-lg">Total Members </h3>
          <p className="text-3xl font-bold">{data.totalMembers || 0}</p>
        </div>
        <div className="bg-white shadow p-5 rounded-xl">
          <h3 className="text-lg">Events Created </h3>
          <p className="text-3xl font-bold">{data.totalEvents || 0}</p>
        </div>
        <div className="bg-white shadow p-5 rounded-xl">
          <h3 className="text-lg">Total Payment</h3>
          <p className="text-3xl font-bold">${data.totalPayments || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default ManagerOverview;
