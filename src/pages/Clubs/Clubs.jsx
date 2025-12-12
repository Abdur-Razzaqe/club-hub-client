import { useQuery } from "@tanstack/react-query";
import Card from "../../components/Card";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Clubs = () => {
  const axiosSecure = useAxiosSecure();
  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const result = await axiosSecure.get("/clubs");
      return result.data;
    },
  });
  console.log("frontend clubs", clubs);
  if (isLoading) return <p>Loading.....</p>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-5">
      {clubs.length > 0 ? (
        clubs.map((club) => <Card key={club._id} club={club} />)
      ) : (
        <p className="text-center w-full">No clubs Available</p>
      )}
    </div>
  );
};

export default Clubs;
