import { PORTFOLIO_PDF_LINK } from "../config/site";

export function DownloadPortfolioButton({ className = "" }) {
  return (
    <a
      href={PORTFOLIO_PDF_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={`font-mono text-sm text-white bg-[#4a5568] hover:bg-[#2d3748] px-4 py-2 rounded transition-colors duration-300 no-underline inline-block ${className}`}
    >
      View Portfolio in PDF
    </a>
  );
}
