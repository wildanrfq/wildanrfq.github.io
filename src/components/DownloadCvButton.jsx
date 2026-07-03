import { CV_DOWNLOAD_LINK } from "../config/site";

export function DownloadCvButton({ className = "" }) {
  return (
    <a
      href={CV_DOWNLOAD_LINK}
      download="Wildan's CV.pdf"
      className={`font-mono text-sm text-white bg-[#4a5568] hover:bg-[#2d3748] px-4 py-2 rounded transition-colors duration-300 no-underline inline-block ${className}`}
    >
      Download CV
    </a>
  );
}
