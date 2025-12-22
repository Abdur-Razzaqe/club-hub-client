import { useQuery } from "@tanstack/react-query";
import Card from "../../components/Card";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import LoadingSpinner from "../Common/LoadingSpinner";

const Clubs = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["clubs", search, category],
    queryFn: async () => {
      const result = await axiosSecure.get(
        `/clubs?search=${search}&category=${category}`
      );
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  return (
    <div>
      <h2 className="text-4xl font-extrabold text-gray-800 tracking -tight text-center pt-10">
        All Clubs
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            className="grow"
            placeholder="Search clubs by name...."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>

        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input"
          placeholder="Search Category..."
          list="browsers"
        />
        <datalist id="browsers">
          <option value="All Categories"></option>
          <option value="Music"></option>
          <option value="Sports"></option>
          <option value="Atr"></option>
          <option value="Tech"></option>
        </datalist>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-5">
        {clubs.length > 0 ? (
          clubs.map((club) => <Card key={club._id} club={club} />)
        ) : (
          <p className="text-center w-full">No clubs Available</p>
        )}
      </div>
    </div>
  );
};

export default Clubs;
