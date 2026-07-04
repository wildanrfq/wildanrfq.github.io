import { SITE } from "../config/site";

export function Footer() {
  return (
    <footer className="font-mono text-xs sm:text-[15px] pt-2 pb-8 sm:pb-6 px-4 text-center break-words">
      <span className="text-white">
        © 2026 {SITE.handle} |{" "}
        <a href={`mailto:${SITE.email}`} className="text-white">
          {SITE.email}
        </a>
      </span>
    </footer>
  );
}
