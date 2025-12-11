import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const FeaturedClubs = () => {
  const axiosSecure = useAxiosSecure();
  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["featured-clubs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/featured-clubs");
      return res.data;
    },
  });

  if (isLoading) return <p>loading....</p>;

  return (
    <div className="my-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Featured Clubs</h2>
      {clubs.length === 0 && (
        <p className="text-center text-gray-500 text-xl">No clubs available</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {clubs.map((club) => (
          <div
            key={club._id}
            className="p-4 rounded-xl shadow-md hover:shadow-lg bg-white/40 backdrop-blur-xl transition border "
          >
            <img
              src={club.bannerImage}
              alt="club banner"
              className="w-full h-40 object-cover rounded-lg"
            />
            <h3 className="text-xl font-bold mt-3">{club.clubName}</h3>
            <p className="text-gray-600">{club.description?.slice(0, 80)}...</p>
            <div className="mt-3">
              <p className="text-sm">
                <span className="font-semibold">Category: </span>
                {club.category}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Location:</span> {club.location}
              </p>
              <p className="text-sm font-semibold text-teal-600">
                Fee: ${club.membershipFee}
              </p>
            </div>
            <button className="btn btn-sm mt-4 w-full  text-white bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedClubs;
