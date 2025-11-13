import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import Container from "./Container";
import logo from "../assets/Vector.png";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import ThemeToggle from "./ThemeToggle";
import Lottie from "lottie-react";
import Home from "./../animation/Home.json";
import Issue from "./../animation/Search.json";
import AddIssue from "./../animation/Add Document.json";
import MYIssue from "./../animation/solving problems.json";
import Donation from "./../animation/Donaciones.json";
import Issues from "./../animation/Problem Solving Team..json";

// 🔹 default profile picture
const DEFAULT_AVATAR_URL =
  "https://cdn-icons-png.freepik.com/512/6596/6596121.png";

const navLinkClasses = ({ isActive }) =>
  [
    "inline-block text-[16px] font-semibold transition-colors",
    isActive
      ? "bg-[#36B864] bg-clip-text text-transparent"
      : "text-base-content hover:bg-gradient-to-r hover:from-[#632EE3] hover:to-[#F8721F] hover:bg-clip-text hover:text-transparent",
  ].join(" ");

// 🔹 if user has photoURL, use that; otherwise use your default image
const getAvatarUrl = (user) => {
  if (user?.photoURL) return user.photoURL;
  return DEFAULT_AVATAR_URL;
};

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const isAuthed = !!user?.uid;

  const handleLogOut = () => {
    logOut()
      .then(() => toast.success("Logged out successfully"))
      .catch((err) => console.error("Error logging out:", err));
  };

  const links = isAuthed
    ? [
        {
          to: "/",
          label: "Home",
          end: true,
          emoji: (
            <Lottie
              animationData={Home}
              loop
              className="h-9 w-9 shrink-0"
              style={{ margin: 0 }}
            />
          ),
        },
        {
          to: "/all-issues",
          label: "All Issues",
          emoji: (
            <Lottie
              animationData={Issue}
              loop
              className="h-9 w-9 shrink-0"
              style={{ margin: 0 }}
            />
          ),
        },
        {
          to: "/add-issues",
          label: "Add Issues",
          emoji: (
            <Lottie
              animationData={AddIssue}
              loop
              className="h-9 w-9 shrink-0"
              style={{ margin: 0 }}
            />
          ),
        },
        {
          to: "/my-issues",
          label: "My Issues",
          emoji: (
            <Lottie
              animationData={MYIssue}
              loop
              className="h-9 w-9 shrink-0"
              style={{ margin: 0 }}
            />
          ),
        },
        {
          to: "/my-contribution",
          label: "My Contribution",
          emoji: (
            <Lottie
              animationData={Donation}
              loop
              className="h-9 w-9 shrink-0"
              style={{ margin: 0 }}
            />
          ),
        },
      ]
    : [
        {
          to: "/",
          label: "Home",
          end: true,
          emoji: (
            <Lottie
              animationData={Home}
              loop
              className="h-9 w-9 shrink-0"
              style={{ margin: 0 }}
            />
          ),
        },
        {
          to: "/issues",
          label: "Issues",
          emoji: (
            <Lottie
              animationData={Issues}
              loop
              className="h-9 w-9 shrink-0"
              style={{ margin: 0 }}
            />
          ),
        },
      ];

  const renderLinks = () =>
    links.map(({ to, label, end, emoji }) => (
      <li key={to}>
        <NavLink
          to={to}
          end={end}
          className={navLinkClasses}
          style={{ display: "flex", alignItems: "center", gap: "2px" }}
        >
          {emoji}
          {label}
        </NavLink>
      </li>
    ));

  return (
    <Container>
      <div className="navbar bg-base-100 shadow-sm">
        {/* Left */}
        <div className="navbar-start">
          {/* Mobile menu */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              {renderLinks()}
              {!isAuthed ? (
                <>
                  <li>
                    <NavLink to="/auth/login" className={navLinkClasses}>
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/auth/register" className={navLinkClasses}>
                      Register
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/my-profile" className={navLinkClasses}>
                      My Profile
                    </NavLink>
                  </li>
                  <li>
                    <button onClick={handleLogOut} className="text-left">
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-3 sm:gap-4 normal-case"
            aria-label="ProCleaning Home"
          >
            <img
              src={logo}
              alt="ProCleaning logo"
              className="h-7 w-auto md:h-9"
            />
            <div className="leading-none select-none">
              <div className="text-[1rem] md:text-[1.5rem] font-extrabold tracking-tight">
                <h5>
                  <span className="text-[#36B864]">Pro</span>{" "}
                  <span className="text-base-content">Cleaning</span>
                </h5>
              </div>
            </div>
          </Link>
        </div>

        {/* Center (desktop) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{renderLinks()}</ul>
        </div>

        {/* Right */}
        <div className="navbar-end gap-3">
          <ThemeToggle />

          {!isAuthed ? (
            <>
              <NavLink
                to="/auth/login"
                className="btn border text-black bg-[#F4E11B] border-[#02000F] rounded-[40px] hover:bg-[#e0cb16]"
              >
                Login
              </NavLink>
              <NavLink to="/auth/register" className="btn btn-ghost">
                Register
              </NavLink>
            </>
          ) : (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full border border-base-300 overflow-hidden">
                  <img
                    src={getAvatarUrl(user)}
                    alt="User avatar"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    onError={(e) => {
                      // 🔹 if anything fails, always fall back to your default avatar
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = DEFAULT_AVATAR_URL;
                    }}
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-56"
              >
                <li className="menu-title px-2">
                  <span className="truncate">
                    {user?.displayName || user?.email}
                  </span>
                </li>
                <li>
                  <Link to="/my-profile">My Profile</Link>
                </li>
                <li>
                  <button onClick={handleLogOut}>Logout</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
