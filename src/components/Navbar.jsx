import { Link, useLocation } from "react-router-dom";
import { SITE } from "../config/site";

const links = [
  { to: "/", label: "home" },
  { to: "/about", label: "about" },
  { to: "/projects", label: "projects" },
  { to: "/contact", label: "contact" },
];

export function Navbar({ sticky = false }) {
  const location = useLocation();

  return (
    <div
      className={`flex flex-wrap justify-between items-center gap-x-2 gap-y-2 px-3 pt-4 sm:px-5 sm:pt-5 pb-4 sm:pb-5 z-20 ${
        sticky
          ? "fixed top-0 left-0 right-0 bg-[#22303c]/95 backdrop-blur-sm"
          : "absolute top-0 left-0 right-0"
      }`}
    >
      <Link
        to="/"
        className="font-mono text-white text-sm sm:text-base no-underline whitespace-nowrap"
      >
        {SITE.handle}
      </Link>
      <nav className="flex gap-0.5 sm:gap-1">
        {links.map((link) => {
          const active = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`font-mono text-xs sm:text-sm px-2 py-1.5 sm:px-3 sm:py-2 rounded whitespace-nowrap transition-colors duration-300 no-underline ${
                active
                  ? "text-white bg-[#4a5568]"
                  : "text-[#a0aec0] hover:text-white hover:bg-[#2d3748]"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
