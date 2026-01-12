import {
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

const ContactSection = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative grid md:grid-cols-2 gap-10 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl">
          {/* LEFT SIDE */}
          <div className="relative p-10 text-white bg-gradient-to-br from-gray-900 to-gray-700">
            <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d')] bg-cover bg-center" />

            <div className="relative z-10 space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <FaMapMarkerAlt /> Location
                </h3>
                <p className="text-white/80">
                  ClubHub HQ <br />
                  Dhaka, Bangladesh <br />
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Social Media</h3>
                <div className="flex gap-4 text-2xl">
                  <FaFacebook className="hover:text-teal-400 cursor-pointer" />
                  <FaLinkedin className="hover:text-teal-400 cursor-pointer" />
                  <FaTwitter className="hover:text-teal-400 cursor-pointer" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <FaEnvelope /> Email
                </h3>
                <p className="text-white/80">support@clubhub.com</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <FaPhone /> Contact
                </h3>
                <p className="text-white/80">+880 1952558684</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="p-10">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Get in Touch
            </h3>

            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-teal-500 outline-none"
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-teal-500 outline-none"
                  required
                />
              </div>

              <input
                type="text"
                placeholder="Subject"
                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-teal-500 outline-none"
              />

              <textarea
                rows="4"
                placeholder="Your Message"
                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-teal-500 outline-none"
                required
              />

              <button
                type="submit"
                className="w-full text-white bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 transition font-medium py-3 rounded-lg cursor-pointer"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
