import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router";
import Logo from "../../Logo/Logo";

const Footer = () => {
  return (
    <footer className="bg-teal-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-4">
        {/* About */}
        <div className="space-y-4">
          <Logo />
          <p className="text-sm">
            ClubHub is your gateway to discovering clubs, joining communities,
            and exploring exciting events anytime, anywhere.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Quick Links
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-teal-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/clubs" className="hover:text-teal-500">
                Clubs
              </Link>
            </li>
            <li>
              <Link to="/events" className="hover:text-teal-500">
                Events
              </Link>
            </li>
            <li>
              <Link to="/featured-clubs" className="hover:text-teal-500">
                Featured Clubs
              </Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-teal-500">
                Profile
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Contact
          </h2>
          <ul className="space-y-2 text-sm">
            <li>Email: support@clubhub.com</li>
            <li>Phone: +880 1952-558684</li>
            <li>Location: Dhaka, Bangladesh</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Follow Us
          </h2>
          <div className="flex gap-5 text-2xl">
            <a
              href="https://github.com"
              target="_blank"
              className="hover:text-teal-500"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              className="hover:text-teal-500"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              className="hover:text-teal-500"
            >
              <FaXTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300 dark:border-gray-700 py-4 text-center text-sm">
        © {new Date().getFullYear()} ClubHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
