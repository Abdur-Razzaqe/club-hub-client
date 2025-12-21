import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Common/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";

const MemberOverview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["member-overview", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/member/overview/${user?.email}`);
      console.log("overview", res.data);

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
                  <span>{ev.title}</span>{" "}
                  <span>{new Date(ev.eventDate).toLocaleDateString()}</span>
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
