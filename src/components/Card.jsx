import { Link } from "react-router";
import { FaMapMarkerAlt, FaTags, FaDollarSign } from "react-icons/fa";

const Card = ({ club }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition flex flex-col h-full border">
      {/* Image */}
      <img
        src={club.bannerImage}
        alt={club.clubName}
        className="w-full h-44 object-cover rounded-t-xl"
      />

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-lg font-bold dark:text-white">{club.clubName}</h3>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 flex-grow">
          {club.description?.slice(0, 80)}...
        </p>

        {/* Meta Info */}
        <div className="mt-4 space-y-1 text-sm text-gray-600 dark:text-gray-300">
          <p className="flex items-center gap-2">
            <FaTags className="text-teal-500" />
            <span>{club.category}</span>
          </p>

          <p className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-teal-500" />
            <span>{club.location}</span>
          </p>

          <p className="flex items-center gap-2 font-semibold text-teal-600">
            <FaDollarSign />
            <span>{club.membershipFee}</span>
          </p>
        </div>

        {/* Button */}
        <Link
          to={`/clubs/${club._id}`}
          className="mt-4 text-center w-full py-2 rounded-lg text-white bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default Card;
