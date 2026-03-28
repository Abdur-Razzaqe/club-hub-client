import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";
import LoadingSpinner from "../../Common/LoadingSpinner";
import { useTheme } from "../../../contexts/ThemeContext/ThemeContext";

const FeaturedClubs = () => {
  const axiosSecure = useAxiosSecure();
  const { isDark } = useTheme();

  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["featured-clubs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/featured-clubs");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div
      className={`py-16 transition-colors duration-300 ${isDark ? "text-white" : "text-gray-900"}`}
    >
      <h2 className="text-4xl font-black mb-10 text-center uppercase tracking-tight">
        Featured Clubs
      </h2>

      {clubs.length === 0 && (
        <p className="text-center text-gray-500 text-xl italic">
          No clubs available at the moment.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {clubs.map((club) => (
          /* --- TRACING LIGHT BORDER ON CARD --- */
          <div
            key={club._id}
            className={`relative p-[1.5px] rounded-2xl overflow-hidden group transition-all duration-300 
              ${isDark ? "bg-white/5 shadow-2xl" : "bg-white shadow-sm border border-gray-100 hover:shadow-2xl"}`}
          >
            {/* 1. Tracing Light Border Beam (Card) */}
            <div
              className={`absolute inset-[-1000%] animate-border-trace ${
                isDark
                  ? "bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#ec4899_50%,transparent_100%)] group-hover:bg-[conic-gradient(from_90deg_at_50%_50%,#fff_0%,#ec4899_50%,#fff_100%)]"
                  : "bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#0d9488_50%,transparent_100%)] group-hover:bg-[conic-gradient(from_90deg_at_50%_50%,#fff_0%,#0d9488_50%,#fff_100%)]"
              }`}
            />

            {/* 2. Pure Glassmorphism Card Content Wrapper */}
            <div
              className={`relative p-5 rounded-2xl backdrop-blur-md transition-all duration-300 ${
                isDark
                  ? "bg-[#05010d]/90 hover:bg-[#05010d]/95"
                  : "bg-white/80 hover:bg-white"
              }`}
            >
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={club.bannerImage}
                  alt="club banner"
                  className="w-full h-44 object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>

              <h3 className="text-xl font-bold mt-4 line-clamp-1">
                {club.clubName}
              </h3>

              <p
                className={`mt-2 text-sm line-clamp-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                {club.description}
              </p>

              <div className="mt-4 space-y-1">
                <p className="text-xs uppercase tracking-wider opacity-70">
                  <span className="font-bold">Category:</span> {club.category}
                </p>
                <p className="text-xs uppercase tracking-wider opacity-70">
                  <span className="font-bold">Location:</span> {club.location}
                </p>
                <p
                  className={`text-lg font-black mt-2 ${isDark ? "text-pink-400" : "text-teal-600"}`}
                >
                  Fee: ${club.membershipFee}
                </p>
              </div>

              {/* --- TRACING LIGHT BORDER ON BUTTON --- */}
              <Link
                to={`/clubs/${club._id}`}
                className="relative p-[1.5px] overflow-hidden group inline-block mt-6 w-full rounded-full transition-all duration-300 border-none outline-none"
              >
                {/* 1. Tracing Light Border Beam (Button) */}
                <div
                  className={`absolute inset-[-1000%] animate-border-trace ${
                    isDark
                      ? "bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#ec4899_50%,transparent_100%)] group-hover:bg-[conic-gradient(from_90deg_at_50%_50%,#fff_0%,#ec4899_50%,#fff_100%)]"
                      : "bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#0d9488_50%,transparent_100%)] group-hover:bg-[conic-gradient(from_90deg_at_50%_50%,#fff_0%,#0d9488_50%,#fff_100%)]"
                  }`}
                />

                {/* 2. Button Surface */}
                <div
                  className={`relative px-6 py-2.5 font-bold uppercase text-xs text-center tracking-widest transition-all duration-300 rounded-full border cursor-pointer border-teal-500/10 cursor-pointer ${
                    isDark
                      ? "bg-black text-white hover:bg-transparent"
                      : "bg-white text-teal-600 hover:bg-teal-600 hover:text-white"
                  }`}
                >
                  View Details
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedClubs;
