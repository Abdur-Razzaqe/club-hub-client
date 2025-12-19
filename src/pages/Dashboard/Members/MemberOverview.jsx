import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Common/LoadingSpinner";

const MemberOverview = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["member-overview", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/member/overview/");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Member Overview</h1>
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold">Total Clubs Joined</h2>
          <p className="text-3xl">{data?.totalClubs}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold">Total Events Registered</h2>
          <p className="text-3xl">{data?.totalEvents}</p>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold">Upcoming Events</h2>
          <ul>
            {data?.upcomingEvents?.length > 0 ? (
              data.upcomingEvents.map((ev) => (
                <li key={ev._id}>
                  {ev.title} - {new Date(ev.eventDate).toLocaleDateString()}
                </li>
              ))
            ) : (
              <p>No upcomingEvents</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MemberOverview;
