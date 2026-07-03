import { Link, useLocation } from "react-router-dom";
import { SITE } from "../config/site";

const links = [
  { to: "/", label: "home" },
  { to: "/about", label: "about" },
  { to: "/projects", label: "projects" },
  { to: "/contact", label: "contact" },
];

export function Navbar() {
  const location = useLocation();

  return (
    <div className="absolute top-0 left-0 right-0 flex justify-between items-start px-5 pt-5 z-10">
      <Link
        to="/"
        className="font-mono text-white text-base no-underline"
      >
        {SITE.handle}
      </Link>
      <nav className="flex gap-1">
        {links.map((link) => {
          const active = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`font-mono text-sm px-3 py-2 rounded transition-colors duration-300 no-underline ${
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
