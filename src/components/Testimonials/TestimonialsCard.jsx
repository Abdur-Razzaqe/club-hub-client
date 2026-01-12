import { FaStar } from "react-icons/fa";

const TestimonialsCard = ({ review }) => {
  const { name, role, comment, image, rating } = review;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md h-full text-center">
      <img
        src={image}
        alt={name}
        className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
      />

      <p className="text-gray-600 dark:text-gray-300 mb-4">“{comment}”</p>

      <div className="flex justify-center mb-2">
        {[...Array(rating)].map((_, i) => (
          <FaStar key={i} className="text-yellow-400" />
        ))}
      </div>

      <h4 className="font-semibold text-gray-900 dark:text-white">{name}</h4>
      <span className="text-sm text-gray-500">{role}</span>
    </div>
  );
};

export default TestimonialsCard;
