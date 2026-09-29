import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { SocialLinks } from "../components/SocialLinks";
import { ExternalLinkIcon } from "../components/icons";
import { projects } from "../data/projects";

export function ProjectsPage() {
  return (
    <div className="bg-[#22303c] min-h-screen text-white relative flex flex-col">
      <Navbar sticky />

      <div className="pt-28 sm:pt-24 pb-2 px-4 sm:px-5 flex flex-col items-center flex-grow">
        <h1 className="font-mono text-3xl sm:text-4xl mb-10 text-white">projects</h1>

        <div className="flex flex-col items-center w-full max-w-2xl gap-5">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-[#2d3748] rounded-xl p-6 w-full shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <Link
                    to={`/projects/${project.slug}`}
                    className="font-mono text-[#63b3ed] hover:text-[#90cdf4] text-xl sm:text-2xl mt-0 mb-0 min-w-0 break-words no-underline transition-colors"
                  >
                    {project.name}
                  </Link>
                  <span className="font-mono text-xs text-[#a0aec0] bg-[#1a202c] px-2 py-1 rounded flex-shrink-0 self-start">
                    {project.lang}
                  </span>
                </div>
                <Link
                  to={`/projects/${project.slug}`}
                  className="text-[#a0aec0] hover:text-[#cbd5e0] leading-relaxed m-0 text-sm sm:text-base block no-underline transition-colors"
                >
                  {project.description}
                </Link>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#374151]/60 flex-wrap gap-2">
                <Link
                  to={`/projects/${project.slug}`}
                  className="font-mono text-xs text-[#a0aec0] hover:text-[#63b3ed] no-underline transition-colors inline-flex items-center gap-1"
                >
                  view details &rarr;
                </Link>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-[#63b3ed] hover:text-white bg-[#1a202c] hover:bg-[#3182ce] px-3 py-1.5 rounded-md transition-all duration-200 no-underline inline-flex items-center gap-1.5 font-medium shadow-sm"
                  >
                    <span>visit {project.name}</span>
                    <ExternalLinkIcon className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <SocialLinks />
        </div>
      </div>

      <Footer />
    </div>
  );
}
