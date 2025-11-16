// src/components/Footer.jsx
import { Link } from "react-router-dom";
import logo from "../assets/Vector.png";
import petImg1 from "../assets/Untitled__2_-removebg-preview.png";
import petImg2 from "../assets/Untitled__3_-removebg-preview.png";
import {
  MdOutlineMail,
  MdOutlinePhone,
  MdOutlineLocationOn,
} from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6"; // ✅ X (Twitter) icon

function GooglePlayIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M3.2 2.2c-.4.4-.6 1-.6 1.7v16.2c0 .7.2 1.3.6 1.7l9.3-9.8L3.2 2.2zM14.3 12.1l2.8-3-9.6-6 6.8 9zM14.5 12.5l-6.9 9 9.6-6-2.7-3zM20.8 10.6l-2.3-1.4-3 3.2 3 3.2 2.3-1.4c1.1-.7 1.1-2.8 0-3.6z" />
    </svg>
  );
}
function AppStoreIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.36 1.64a4.9 4.9 0 0 1-1.17 3.74A4.33 4.33 0 0 1 11.8 7a5.05 5.05 0 0 1 1.2-3.78 4.72 4.72 0 0 1 3.36-1.58zM21.6 17.38c-.6 1.38-.9 2-1.68 3.22-1.09 1.66-2.35 3.73-4.2 3.77-1.58 0-2-.98-4.18-.97-2.19 0-2.67.98-4.25.97-1.85-.04-3.27-2.26-4.36-3.92C1.2 18.2.12 15.1 1.3 12.7c.9-1.9 2.9-3.12 5-3.15 1.56-.03 3.02 1.06 3.97 1.06.95 0 2.72-1.31 4.58-1.12 0 0 2.55.22 3.76 2.2-3.29 2.01-2.77 6 1 6.69z" />
    </svg>
  );
}

export default function Footer() {
  // Update link labels to match your portal routes
  const quickLinks = [
    { to: "/", label: "Home" },
    { to: "/all-issues", label: "All Issues" },
    { to: "/add-issues", label: "Report an Issue" },
    { to: "/my-issues", label: "My Reports" },
    { to: "/my-contribution", label: "My Contributions" },
  ];

  const resources = [
    { to: "/guidelines", label: "Reporting Guidelines" },
    { to: "/faq", label: "FAQ" },
    { to: "/articles", label: "Community Tips" },
    { to: "/updates", label: "News & Updates" },
    { to: "/terms", label: "Privacy & Terms" },
  ];

  const programs = [
    { to: "/drives", label: "Cleanup Drives" },
    { to: "/waste-management", label: "Waste Management" },
    { to: "/footpath-repair", label: "Footpath Repair Requests" },
    { to: "/waterlogging", label: "Waterlogging Alerts" },
    { to: "/illegal-dumping", label: "Illegal Dumping Reports" },
  ];

  return (
    <footer className="bg-gradient-to-t from-[#E7AF80] via-[#F6D7B5] to-[#FAF0DD]">
      {/* top grid */}
      <div className="px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-8">
          {/* Brand + contact */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="grid place-items-center text-xl">
                <Link
                  to="/"
                  className="flex items-center gap-3 sm:gap-4 normal-case"
                  aria-label="Portal Home"
                >
                  <img
                    src={logo}
                    alt="Portal logo"
                    className="h-10 w-auto md:h-12"
                  />
                  <div className="leading-none select-none">
                    <div className="text-[1.75rem] md:text-[2rem] font-extrabold tracking-tight">
                      <h2>
                        <span className="bg-gradient-to-r from-[#36B864] to-[#1A6A3D] bg-clip-text text-transparent">
                          Pro
                        </span>{" "}
                        <span className="text-base-content">Cleaning</span>
                      </h2>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-[#3b3b3b] max-w-md">
              Help keep our neighborhoods safe and clean. Report problems like
              garbage overflow, broken footpaths, illegal dumping, and
              waterlogging; track progress; and join local cleanup efforts.
            </p>

            <ul className="mt-5 space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <MdOutlineMail className="mt-0.5" />
                <a
                  href="mailto:support@cleancity.example"
                  className="link link-hover"
                >
                  support@cleancity.example
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MdOutlinePhone className="mt-0.5" />
                <a href="tel:+1-800-555-0100" className="link link-hover">
                  +1 (800) 555-0100
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MdOutlineLocationOn className="mt-0.5" />
                <span>City Hall, Community Services Desk</span>
              </li>

              {/* Apps */}
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-xl border
                           border-slate-300/70 bg-white px-4 py-2 text-sm font-medium
                           hover:bg-slate-100 text-[#001931]"
                >
                  <GooglePlayIcon className="h-5 w-5" />
                  Get it on Google Play
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-xl border
                           border-slate-300/70 bg-white px-4 py-2 text-sm font-medium
                           hover:bg-slate-100 text-[#001931]"
                >
                  <AppStoreIcon className="h-5 w-5" />
                  Download on the App Store
                </a>
              </div>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-[#2E2A1E] mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((i) => (
                <li key={i.label}>
                  <Link to={i.to} className="link link-hover">
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-[#2E2A1E] mb-3">Resources</h4>
            <ul className="space-y-2 text-sm">
              {resources.map((i) => (
                <li key={i.label}>
                  <Link to={i.to} className="link link-hover">
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-bold text-[#2E2A1E] mb-3">
              Community Programs
            </h4>
            <ul className="space-y-2 text-sm">
              {programs.map((i) => (
                <li key={i.label}>
                  <Link to={i.to} className="link link-hover">
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Decorative/illustrations + Newsletter */}
        <div className="mt-8">
          <div className="flex items-end justify-between gap-4">
            <div className="h-24 md:h-28">
              <img
                src={petImg1}
                alt="illustration"
                className="h-full object-contain"
              />
            </div>

            {/* Newsletter */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl bg-white p-4 md:p-6 shadow border border-base-200">
                <div className="md:flex md:items-center md:justify-between gap-4">
                  <h5 className="font-semibold text-[#2E2A1E]">
                    Stay informed{" "}
                    <span className="font-normal">
                      — cleanup drives, civic tips, and portal updates.
                    </span>
                  </h5>
                  <form
                    className="mt-3 md:mt-0 flex w-full md:w-auto"
                    onSubmit={(e) => {
                      e.preventDefault();
                      alert(
                        "Thanks for subscribing! (connect to your backend)"
                      );
                    }}
                  >
                    <input
                      type="email"
                      required
                      placeholder="Email address"
                      className="input input-bordered rounded-r-none w-full md:w-80"
                    />
                    <button
                      type="submit"
                      className="
    btn rounded-l-none border-0
    bg-gradient-to-r from-[#36B864] to-[#1A6A3D]
    text-white font-semibold
    transition-colors duration-300
    hover:from-[#48D978] hover:to-[#2B8C4A]
  "
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="h-24 md:h-28">
              <img
                src={petImg2}
                alt="illustration"
                className="h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="
    text-[#fff]
    bg-gradient-to-b from-[#3B2417] to-[#120A06]
  "
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold">ProCleaning</span>. Built for
            communities — all rights reserved.
          </p>

          <div className="flex items-center gap-3">
            <span className="text-sm opacity-80">Stay connected</span>
            <span className="px-2 py-1 rounded bg-white/10 text-xs">
              Facebook
            </span>

            {/* ✅ Replaced Twitter badge with X icon + link */}
            <a
              href="https://x.com/ProCleaning"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on X"
              className="px-2 py-1 rounded bg-white/10 text-xs inline-flex items-center justify-center"
              title="Follow us on X"
            >
              <FaXTwitter className="h-4 w-4" />
              <span className="sr-only">X</span>
            </a>

            <span className="px-2 py-1 rounded bg-white/10 text-xs">
              Email Updates
            </span>
            <span className="px-2 py-1 rounded bg-white/10 text-xs">RSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
