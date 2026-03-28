import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import TestimonialsCard from "./TestimonialsCard";
import { useTheme } from "../../contexts/ThemeContext/ThemeContext";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const testimonials = [
  {
    id: 1,
    name: "Rahim Uddin",
    role: "Member, Photography Club",
    rating: 5,
    comment: "ClubHub helped me connect with amazing people.",
    image: "https://i.ibb.co/rf0v2Z6m/download-4.jpg",
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    role: "Manager, Coding Club",
    rating: 4,
    comment: "Managing events is super easy with ClubHub.",
    image: "https://i.ibb.co/tpcNnjTc/images-3.jpg",
  },
  {
    id: 3,
    name: "Tom",
    role: "Member, Music Club",
    rating: 5,
    comment: "I joined multiple clubs through this platform.",
    image: "https://i.ibb.co/ns7jtk1r/download-2.jpg",
  },
  {
    id: 4,
    name: "JINNIA JANNAT",
    role: "Event Organizer",
    rating: 4,
    comment: "The dashboard and analytics are really helpful.",
    image: "https://i.ibb.co/4wxrsrm1/images.jpg",
  },
  {
    id: 5,
    name: "Tree",
    role: "Event Organizer",
    rating: 5,
    comment: "The dashboard and analytics are really helpful.",
    image: "https://i.ibb.co/wFFZRqgc/images.webp",
  },
];

const Testimonials = () => {
  const { isDark } = useTheme();

  return (
    <section
      className={`py-20 transition-colors duration-500 overflow-hidden 
      ${isDark ? "bg-[#05010d] text-white" : "bg-gray-50 text-gray-900"}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading Section */}
        <div className="text-center mb-14">
          <h2
            className={`text-3xl md:text-5xl font-black uppercase tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}
          >
            What Our{" "}
            <span className={isDark ? "text-pink-500" : "text-teal-600"}>
              Members
            </span>{" "}
            Say
          </h2>
          <div
            className={`h-1 w-20 mx-auto mt-4 rounded-full ${isDark ? "bg-pink-500" : "bg-teal-600"}`}
          />
          <p
            className={`mt-5 text-lg max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            Real experiences from our community members and club managers.
          </p>
        </div>

        {/* Swiper Section */}
        <div className="testimonials-swiper-container">
          <Swiper
            loop={testimonials.length >= 3}
            effect="coverflow"
            grabCursor
            centeredSlides
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 15,
              stretch: 0,
              depth: 150,
              modifier: 1,
              slideShadows: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-16"
          >
            {testimonials.map((review) => (
              <SwiperSlide key={review.id} className="p-4">
                <TestimonialsCard review={review} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Pagination Dot Custom Styling (Mobile & Desktop) */}
      <style jsx="true">{`
        .swiper-pagination-bullet {
          background: ${isDark ? "#ec4899" : "#0d9488"} !important;
          opacity: 0.3;
        }
        .swiper-pagination-bullet-active {
          opacity: 1 !important;
          width: 24px !important;
          border-radius: 5px !important;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
