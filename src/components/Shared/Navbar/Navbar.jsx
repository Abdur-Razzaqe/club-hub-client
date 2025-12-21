import { Link, NavLink } from "react-router";
import Logo from "../../Logo/Logo";
import useAuth from "../../../hooks/useAuth";
import { Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const handleLogOut = async () => {
    try {
      await logOut();
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.contains(e.target))
        setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 font-medium transition-all duration-300
  ${
    isActive
      ? "text-teal-500 border-b-2 border-teal-500"
      : "text-gray-700 hover:text-teal-500"
  }`;

  const links = (
    <>
      <li>
        <NavLink to="/" end className={navLinkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/clubs" className={navLinkClass}>
          Clubs
        </NavLink>
      </li>
      <li>
        <NavLink to="/events" className={navLinkClass}>
          Events
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar  shadow-sm px-6 rounded-xl">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <Menu />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>

        <Logo></Logo>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end gap-2">
        {!user ? (
          <>
            <Link
              to="/login"
              className="btn text-white bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 "
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn text-white bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500"
            >
              Register
            </Link>
          </>
        ) : (
          <div ref={dropdownRef} className="relative ">
            <img
              src={user.photoURL || "https://i.ibb.co/2Fsf1wB/avatar.png"}
              alt="avatar"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => setOpen(!open)}
            />
            {open && (
              <div className="absolute right-0 mt-3 w-44 bg-base-100 shadow-lg rounded-xl overflow-hidden ">
                <div className="px-4 py-2 border-b">
                  <p className="text-sm font-semibold truncate">
                    {user?.displayName || "User"}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {user?.email}
                  </p>
                </div>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogOut}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
