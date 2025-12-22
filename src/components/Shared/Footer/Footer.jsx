import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Logo from "../../Logo/Logo";

const Footer = () => {
  return (
    <footer className="bg-green-100 text-gray-700 ">
      <div className="max-w-7xl mx-auto px-4 py-2 grid md:grid-cols-3 gap-10">
        <div className="space-y-4 text-center md:text-left">
          {/* about section */}
          <div className="flex justify-center md:justify-start">
            <Logo></Logo>
          </div>
          <p>
            ClubHub is your gateway to discovering local clubs, joining
            communities, and exploring exciting events-anytime, anywhere.
          </p>
        </div>
        {/* contact section */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold text-white mb-4">Contact</h2>
          <ul>
            <li>
              Email: <span className="text-gray-400">support@clubhub.com</span>
            </li>
            <li>
              Phone: <span className="text-gray-400">+8801952558684</span>
            </li>
            <li>Location: Dhaka, Bangladesh.</li>
          </ul>
        </div>

        {/* social links */}

        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold text-white mb-4">Follow Us</h2>
          <div className="flex items-center gap-5 text-2xl">
            <a
              href="https://github.com"
              target="blank"
              className="hover:text-white"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com"
              target="blank"
              className="hover:text-white"
            >
              <FaLinkedin />
            </a>
            <a href="https://x.com" target="blank" className="hover:text-white">
              <FaXTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div className="border-t border-gray-700  text-center text-gray-400 text-sm">
        ©{new Date().getFullYear()} ClubHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
