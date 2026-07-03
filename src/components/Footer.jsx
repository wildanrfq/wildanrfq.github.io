import { SITE } from "../config/site";

export function Footer() {
  return (
    <footer className="font-mono text-[15px] pb-4 text-center">
      <span className="text-white">
        © 2026 {SITE.handle} |{" "}
        <a href={`mailto:${SITE.email}`} className="text-white">
          {SITE.email}
        </a>
      </span>
    </footer>
  );
}
