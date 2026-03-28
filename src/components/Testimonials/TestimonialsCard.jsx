import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { useTheme } from "../../contexts/ThemeContext/ThemeContext";

const TestimonialsCard = ({ review }) => {
  const { isDark } = useTheme();
  const { name, role, comment, image, rating } = review;

  return (
    <div className="relative group p-[1.5px] rounded-3xl overflow-hidden flex h-full transform-gpu transition-all duration-500 hover:scale-[1.02]">
      {/* --- DYNAMIC TRACING BORDER --- */}
      <div
        className={`absolute inset-[-1000%] animate-border-trace ${
          isDark
            ? "bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#ec4899_50%,transparent_100%)]"
            : "bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#0d9488_50%,transparent_100%)]"
        }`}
        style={{ willChange: "transform" }}
      />

      {/* Card Body */}
      <div
        className={`relative w-full p-8 rounded-[22px] flex flex-col transition-all duration-300 ${
          isDark
            ? "bg-[#0b041a]/90 backdrop-blur-md shadow-2xl"
            : "bg-white shadow-xl shadow-gray-200/50"
        }`}
      >
        {/* Quote Icon for Premium Look */}
        <div className="mb-6 opacity-20">
          <FaQuoteLeft
            size={36}
            className={isDark ? "text-pink-500" : "text-teal-500"}
          />
        </div>

        {/* Testimonial Comment */}
        <p
          className={`text-lg font-medium italic leading-relaxed mb-8 flex-grow ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          "{comment}"
        </p>

        {/* User Info & Rating Section */}
        <div
          className={`flex items-center gap-4 border-t pt-6 ${
            isDark ? "border-white/10" : "border-gray-100"
          }`}
        >
          <img
            src={image}
            alt={name}
            className={`w-14 h-14 rounded-full object-cover border-2 shadow-sm ${
              isDark ? "border-pink-500/30" : "border-teal-500/30"
            }`}
          />
          <div className="flex-grow">
            <h4
              className={`text-base font-black uppercase tracking-tight ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {name}
            </h4>
            <p
              className={`text-[10px] font-bold uppercase tracking-widest ${
                isDark ? "text-gray-500" : "text-gray-400"
              }`}
            >
              {role}
            </p>
          </div>

          {/* Rating Stars */}
          <div className="flex gap-1 shrink-0">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                size={10}
                className={
                  i < rating ? "text-yellow-400" : "text-gray-300 opacity-30"
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCard;
