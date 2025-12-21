import useAxiosSecure from "../../../hooks/useAxiosSecure";

import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import LoadingSpinner from "../../Common/LoadingSpinner";
import { MapPin } from "lucide-react";

const MemberClubs = () => {
  const axiosSecure = useAxiosSecure();

  const { data: Memberships = [], isLoading } = useQuery({
    queryKey: ["my-clubs"],

    queryFn: async () => {
      const res = await axiosSecure.get("/member/my-clubs");
      return res.data;
    },
  });
  if (isLoading) return <LoadingSpinner />;

  if (Memberships.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">
        You have not joined any clubs yet.
      </p>
    );
  }
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
      {Memberships.map((m) => (
        <div
          key={m._id}
          className="p-6 bg-white rounded-2xl shadow hover:shadow-xl transition flex flex-col justify-between "
        >
          <div>
            <h2 className="text-xl font-bold text-gray-800">{m.clubName}</h2>
            <p className="flex items-center gap-2 text-gray-500 text-sm mt-1">
              {" "}
              <MapPin /> <span className="font-semibold">Location: </span>
              {m.location}
            </p>

            <div className="mt-3 flex justify-between gap-2">
              <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                Status: {m.status}
              </span>
              <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                Expiry: {m.expiresAt || "Lifetime"}
              </span>
            </div>
          </div>

          <Link
            to={`/clubs/${m.clubId}`}
            className="btn text-teal-500 mt-2  items-center rounded-md bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white  "
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MemberClubs;
