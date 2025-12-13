import React from "react";
import { Link } from "react-router";

const Card = ({ club }) => {
  return (
    <div className="p-4 rounded-xl shadow-md hover:shadow-lg bg-white/40 backdrop-blur-xl transition border ">
      <img
        src={club.bannerImage}
        alt="club banner"
        className="w-full h-40 object-cover rounded-lg"
      />
      <h3 className="text-xl font-bold mt-3">{club.clubName}</h3>
      <p className="text-gray-600 font-semibold">
        Description:
        <span>{club.description?.slice(0, 10)}...</span>
      </p>
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
      <Link
        to={`/clubs/${club._id}`}
        className="btn btn-sm mt-4 w-full  text-white bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500"
      >
        View Details
      </Link>
    </div>
  );
};

export default Card;
