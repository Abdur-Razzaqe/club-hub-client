import { Link, NavLink } from "react-router";
import Logo from "../../Logo/Logo";
import useAuth from "../../../hooks/useAuth";
import { Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const handleLogOut = () => {
    logOut()
      .then()
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/clubs">Clubs</NavLink>
      </li>
      <li>
        <NavLink to="/events">Events</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar  shadow-sm px-4 rounded-xl">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <Menu />
          </div>
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
          <div className="relative group">
            <img
              src={user.photoURL || "https://i.ibb.co/2Fsf1wB/avatar.png"}
              alt="avatar"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => setOpen(!open)}
            />
            {open && (
              <div className="absolute right-0 mt-2  shadow rounded w-40">
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
