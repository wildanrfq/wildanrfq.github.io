import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { SocialLinks } from "../components/SocialLinks";
import { DownloadCvButton } from "../components/DownloadCvButton";
import { experience, skills, tools } from "../data/experience";
import { achievements } from "../data/achievements";

export function AboutPage() {
  return (
    <div className="bg-[#22303c] min-h-screen text-white relative flex flex-col">
      <Navbar sticky />

      <div className="pt-28 sm:pt-24 pb-2 px-4 sm:px-5 flex flex-col items-center flex-grow">
        <div className="w-full max-w-2xl">
          <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
            <h1 className="font-mono text-3xl sm:text-4xl m-0">about</h1>
            <DownloadCvButton />
          </div>

          <p className="text-[#a0aec0] leading-relaxed mb-10">
            Informatics student at UPN "Veteran" Yogyakarta. I teach
            programming practicum to over 100 students, build things for
            mobile and web, and occasionally compete in competitive
            programming.
          </p>

          <section className="mb-10">
            <h2 className="font-mono text-[#63b3ed] text-xl mb-4">
              experience
            </h2>
            <div className="flex flex-col gap-5">
              {experience.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#2d3748] rounded-xl p-5 shadow-md"
                >
                  <div className="flex items-baseline justify-between flex-wrap gap-2">
                    <h3 className="font-mono text-white text-base m-0">
                      {item.role}
                    </h3>
                    <span className="font-mono text-xs text-[#a0aec0]">
                      {item.period}
                    </span>
                  </div>
                  <p className="font-mono text-sm text-[#90cdf4] mt-1 mb-2">
                    {item.org}
                  </p>
                  <p className="text-[#a0aec0] leading-relaxed m-0 text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="font-mono text-[#63b3ed] text-xl mb-4">skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill.name}
                  className="font-mono text-xs text-[#a0aec0] bg-[#1a202c] px-3 py-1.5 rounded flex items-center gap-1.5 cursor-default select-none hover:bg-[#1a202c]/80 transition-colors duration-200"
                  title={skill.level}
                >
                  <span>{skill.name}</span>
                  <span className="text-[#63b3ed] text-[10px] opacity-80">
                    • {skill.level}
                  </span>
                </span>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="font-mono text-[#63b3ed] text-xl mb-4">tools</h2>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool) => (
                <span
                  key={tool.name}
                  className="font-mono text-xs text-[#a0aec0] bg-[#1a202c] px-3 py-1.5 rounded flex items-center gap-1.5 cursor-default select-none hover:bg-[#1a202c]/80 transition-colors duration-200"
                >
                  {tool.name}
                </span>
              ))}
            </div>
          </section>

          <section className="mb-4">
            <h2 className="font-mono text-[#63b3ed] text-lg sm:text-xl mb-1">
              achievements
            </h2>
            <a
              href="https://drive.google.com/drive/folders/1gBk4TYgLY8XjEH2AfObqTyBsCVjmtCaG?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs sm:text-sm text-[#a0aec0] hover:text-[#63b3ed] no-underline block mb-4"
            >
              click here to see certificates
            </a>
            <div className="flex flex-col gap-3">
              {achievements.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#2d3748] rounded-xl p-5 shadow-md flex items-baseline justify-between flex-wrap gap-2"
                >
                  <div>
                    <h3 className="font-mono text-white text-base m-0">
                      {item.title}
                    </h3>
                    <p className="text-[#a0aec0] text-sm m-0 mt-1">
                      {item.description}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-[#a0aec0]">
                    {item.year}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <div className="flex justify-center">
            <SocialLinks />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
