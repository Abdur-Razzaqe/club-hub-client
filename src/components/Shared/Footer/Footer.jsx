import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Logo from "../../Logo/Logo";

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
        <div>
          {/* about section */}
          <Logo></Logo>
          <p>
            ClubHub is your gateway to discovering local clubs, joining
            communities, and exploring exciting events-anytime, anywhere.
          </p>
        </div>
        {/* contact section */}
        <div>
          <h2 className="text-xl font-bold text-white mb-3">Contact</h2>
          <p>Email: support@clubhub.com</p>
          <p>Phone: +8801952558684</p>
          <p>Location: Dhaka, Bangladesh.</p>
        </div>

        {/* social links */}

        <div>
          <h2 className="text-xl font-bold text-white mb-3">Follow Us</h2>
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
      <div className="border-t border-gray-700 py-4 text-center text-gray-400 text-sm">
        {new Date().getFullYear()} ClubHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
