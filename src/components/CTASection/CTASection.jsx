import { useState } from "react";
import { Link } from "react-router";

const CTASection = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }

    // future: save email to database
    setSuccess(true);
    setEmail("");
  };

  return (
    <section className="py-20 bg-gradient-to-r from-teal-500 to-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* CTA Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Build Your Community?
            </h2>
            <p className="text-white/90 mb-6">
              Join ClubHub today to explore clubs, manage events, and connect
              with people who share your passion.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/register"
                className="bg-white text-teal-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
              >
                Get Started
              </Link>

              <Link
                to="/clubs"
                className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-teal-600 transition"
              >
                Explore Clubs
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="bg-gray-50 text-gray-900 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-2">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-gray-600 mb-4">
              Get updates about new clubs, upcoming events, and features.
            </p>

            {success ? (
              <p className="text-green-600 font-medium">
                ✅ Subscription successful! Thank you.
              </p>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
                <button
                  type="submit"
                  className=" bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white px-6 py-3 rounded-lg transition cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
