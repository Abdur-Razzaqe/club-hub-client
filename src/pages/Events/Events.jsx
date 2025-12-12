import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Events = () => {
  const axiosSecure = useAxiosSecure();

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await axiosSecure.get("/events");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center">Loading .....</p>;

  return (
    <div className="mx-auto max-w-6xl my-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Upcoming Events</h2>

      {events.length === 0 && (
        <p className="text-center text-gray-500">No events available</p>
      )}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <div
            key={event._id}
            className="p-5 shadow rounded-xl border bg-white"
          >
            <h3 className="text-xl font-semibold">{event.title}</h3>
            <p className="text-gray-600">{event.description?.slice(0, 60)}</p>
            <p className="text-gray-600">{event.location}</p>
            <p className="text-lg">
              {new Date(event.eventDate).toLocaleString()}
            </p>
            <Link to={`/events/${event._id}`}>
              <button>View Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
