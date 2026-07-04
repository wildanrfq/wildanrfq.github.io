import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { projects } from "../data/projects";

export function ProjectsPage() {
  return (
    <div className="bg-[#22303c] min-h-screen text-white relative flex flex-col">
      <Navbar />

      <div className="pt-28 sm:pt-24 pb-10 px-4 sm:px-5 flex flex-col items-center flex-grow">
        <h1 className="font-mono text-3xl sm:text-4xl mb-10 text-white">projects</h1>

        <div className="flex flex-col items-center w-full max-w-2xl gap-5">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.slug}`}
              className="bg-[#2d3748] rounded-xl p-6 w-full shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300 no-underline block"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                <h2 className="font-mono text-[#63b3ed] text-xl sm:text-2xl mt-0 mb-0 min-w-0 break-words">
                  {project.name}
                </h2>
                <span className="font-mono text-xs text-[#a0aec0] bg-[#1a202c] px-2 py-1 rounded flex-shrink-0 self-start">
                  {project.lang}
                </span>
              </div>
              <p className="text-[#a0aec0] leading-relaxed m-0">
                {project.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
