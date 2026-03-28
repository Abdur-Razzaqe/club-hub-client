import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router";
import Logo from "../../Logo/Logo";
import { useTheme } from "../../../contexts/ThemeContext/ThemeContext";

const Footer = () => {
  const { isDark } = useTheme();

  return (
    <footer
      className={`relative mt-20 border-t transition-colors duration-300 ${
        isDark
          ? "bg-[#05010d] border-white/10 text-gray-400"
          : "bg-white border-gray-100 text-gray-600"
      }`}
    >
      {/* Top Tracing Line Effect */}
      <div className="absolute top-0 left-0 w-full h-[2px] overflow-hidden">
        <div
          className={`w-full h-full animate-border-trace bg-[linear-gradient(90deg,transparent_0%,#ec4899_50%,transparent_100%)] ${
            isDark ? "opacity-100" : "opacity-50"
          }`}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-4">
        {/* About Section */}
        <div className="space-y-6">
          <Logo />
          <p className="text-sm leading-relaxed">
            ClubHub is your premier gateway to discovering vibrant clubs,
            joining passionate communities, and exploring exciting events across
            the globe.
          </p>
          <div className="flex gap-4">
            {[
              { Icon: FaGithub, link: "https://github.com" },
              { Icon: FaLinkedin, link: "https://linkedin.com" },
              { Icon: FaXTwitter, link: "https://x.com" },
            ].map(({ Icon, link }, idx) => (
              <a
                key={idx}
                href={link}
                target="_blank"
                rel="noreferrer"
                className={`p-2 rounded-lg transition-all duration-300 ${
                  isDark
                    ? "bg-white/5 hover:bg-pink-500 hover:text-white"
                    : "bg-gray-100 hover:bg-teal-500 hover:text-white"
                }`}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2
            className={`text-sm font-black uppercase tracking-widest mb-6 ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Quick Navigation
          </h2>
          <ul className="space-y-3 text-sm font-medium">
            {["Home", "Clubs", "Events", "Featured Clubs", "Profile"].map(
              (item) => (
                <li key={item}>
                  <Link
                    to={
                      item === "Home"
                        ? "/"
                        : `/${item.toLowerCase().replace(" ", "-")}`
                    }
                    className="hover:text-pink-500 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2
            className={`text-sm font-black uppercase tracking-widest mb-6 ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Get In Touch
          </h2>
          <ul className="space-y-4 text-sm font-medium">
            <li className="flex flex-col">
              <span className="text-[10px] uppercase opacity-50">Email Us</span>
              <span className={isDark ? "text-gray-200" : "text-gray-800"}>
                support@clubhub.com
              </span>
            </li>
            <li className="flex flex-col">
              <span className="text-[10px] uppercase opacity-50">Call Us</span>
              <span className={isDark ? "text-gray-200" : "text-gray-800"}>
                +880 1952-558684
              </span>
            </li>
            <li className="flex flex-col">
              <span className="text-[10px] uppercase opacity-50">Office</span>
              <span className={isDark ? "text-gray-200" : "text-gray-800"}>
                Dhaka, Bangladesh
              </span>
            </li>
          </ul>
        </div>

        {/* Newsletter / CTA */}
        <div className="space-y-6">
          <h2
            className={`text-sm font-black uppercase tracking-widest mb-6 ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Stay Updated
          </h2>
          <p className="text-xs italic">
            Subscribe to get notified about new events and club openings.
          </p>
          <div className="relative flex items-center">
            <input
              type="email"
              placeholder="Your email"
              className={`w-full px-4 py-3 rounded-xl text-xs outline-none border transition-all ${
                isDark
                  ? "bg-white/5 border-white/10 focus:border-pink-500"
                  : "bg-gray-100 border-gray-200 focus:border-teal-500"
              }`}
            />
            <button className="absolute right-2 px-4 py-1.5 bg-pink-500 text-white text-[10px] font-bold rounded-lg hover:bg-pink-600 transition-all">
              GO
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar with Glow */}
      <div
        className={`border-t py-8 text-center text-[10px] font-bold uppercase tracking-[0.2em] ${
          isDark
            ? "border-white/5 text-gray-500"
            : "border-gray-100 text-gray-400"
        }`}
      >
        <p>
          © {new Date().getFullYear()} ClubHub Global. Built for the community.
        </p>
      </div>

      {/* Decorative Glow */}
      {isDark && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-24 bg-pink-500/10 blur-[100px] pointer-events-none" />
      )}
    </footer>
  );
};

export default Footer;
