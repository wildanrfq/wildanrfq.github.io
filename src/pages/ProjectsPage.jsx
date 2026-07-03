import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { projects } from "../data/projects";

export function ProjectsPage() {
  return (
    <div className="bg-[#22303c] min-h-screen text-white relative flex flex-col">
      <Navbar />

      <div className="pt-24 pb-10 px-5 flex flex-col items-center flex-grow">
        <h1 className="font-mono text-4xl mb-10 text-white">projects</h1>

        <div className="flex flex-col items-center w-full max-w-2xl gap-5">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.slug}`}
              className="bg-[#2d3748] rounded-xl p-6 w-full shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300 no-underline block"
            >
              <div className="flex items-start justify-between mb-3">
                <h2 className="font-mono text-[#63b3ed] text-2xl mt-0 mb-0">
                  {project.name}
                </h2>
                <span className="font-mono text-xs text-[#a0aec0] bg-[#1a202c] px-2 py-1 rounded flex-shrink-0 ml-3 mt-1">
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
