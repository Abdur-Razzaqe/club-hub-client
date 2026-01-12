import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import TestimonialsCard from "./TestimonialsCard";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const testimonials = [
  {
    id: 1,
    name: "Rahim Uddin",
    role: "Member, Photography Club",
    rating: 5,
    comment:
      "ClubHub helped me connect with amazing people who share the same passion.",
    image: "https://i.ibb.co/rf0v2Z6m/download-4.jpg",
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    role: "Manager, Coding Club",
    rating: 4,
    comment: "Managing events and members is super easy with ClubHub.",
    image: "https://i.ibb.co/tpcNnjTc/images-3.jpg",
  },
  {
    id: 3,
    name: "Tom",
    role: "Member, Music Club",
    rating: 5,
    comment:
      "I joined multiple clubs and made new friends through this platform.",
    image: "https://i.ibb.co/ns7jtk1r/download-2.jpg",
  },
  {
    id: 4,
    name: "JINNIA JANNAT",
    role: "Event Organizer",
    rating: 4,
    comment: "The dashboard and analytics are really helpful for organizers.",
    image: "https://i.ibb.co/4wxrsrm1/images.jpg",
  },
  {
    id: 5,
    name: "Tree",
    role: "Event Organizer",
    rating: 5,
    comment: "The dashboard and analytics are really helpful for organizers.",
    image: "https://i.ibb.co/wFFZRqgc/images.webp",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            What Our Members Say
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Real experiences from our community members and club managers.
          </p>
        </div>

        {/* Swiper */}
        <Swiper
          loop={testimonials.length >= 4}
          effect="coverflow"
          grabCursor
          centeredSlides
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {testimonials.map((review) => (
            <SwiperSlide key={review.id}>
              <TestimonialsCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
