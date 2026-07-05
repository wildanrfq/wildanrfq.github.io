import { Link, useParams, Navigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { SocialLinks } from "../components/SocialLinks";
import { getProjectBySlug } from "../data/projects";

export function ProjectDetailPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <div className="bg-[#22303c] min-h-screen text-white relative flex flex-col">
      <Navbar />

      <div className="pt-24 pb-2 px-5 flex flex-col items-center flex-grow">
        <div className="w-full max-w-2xl">
          <Link
            to="/projects"
            className="font-mono text-sm text-[#a0aec0] hover:text-[#63b3ed] no-underline"
          >
            &larr; back to projects
          </Link>

          <div className="flex items-start justify-between mt-4 mb-2 flex-wrap gap-2">
            <h1 className="font-mono text-3xl m-0">{project.name}</h1>
            <span className="font-mono text-xs text-[#a0aec0] bg-[#1a202c] px-2 py-1 rounded">
              {project.lang}
            </span>
          </div>

          <p className="text-[#a0aec0] leading-relaxed mb-8">
            {project.description}
          </p>

          {project.stack && project.stack.length > 0 && (
            <section className="mb-8">
              <h2 className="font-mono text-[#63b3ed] text-lg mb-3">stack</h2>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs text-[#a0aec0] bg-[#2d3748] px-3 py-1.5 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          )}

          {project.features && project.features.length > 0 && (
            <section className="mb-8">
              <h2 className="font-mono text-[#63b3ed] text-lg mb-3">
                features
              </h2>
              <ul className="text-[#a0aec0] leading-relaxed pl-5 m-0">
                {project.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
            </section>
          )}

          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-white bg-[#4a5568] hover:bg-[#2d3748] px-4 py-2 rounded transition-colors duration-300 no-underline inline-block"
          >
            View on GitHub
          </a>

          <div className="mt-8 flex justify-center">
            <SocialLinks />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
