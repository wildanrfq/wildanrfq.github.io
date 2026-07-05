import { useLastFilm } from "../lib/useLastFilm";
import { SOCIAL_LINKS } from "../config/site";
import { truncateText } from "../lib/truncateText";

export function LastFilmWidget({ visible }) {
  const { film, loading } = useLastFilm();

  const hiddenClass = visible
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-2 pointer-events-none";

  return (
    <div
      className={`flex items-center gap-3 mb-3 h-10 transition-all duration-500 ${hiddenClass}`}
    >
      <div className="w-10 h-10 rounded flex-shrink-0 overflow-hidden bg-[#2d3748]">
        {loading ? (
          <div className="w-full h-full animate-pulse" />
        ) : film?.poster ? (
          <a href={film.url ?? SOCIAL_LINKS.letterboxd} target="_blank" rel="noopener noreferrer">
            <img
              src={film.poster}
              alt={film.title}
              className="w-10 h-10 rounded object-cover"
            />
          </a>
        ) : null}
      </div>

      <div className="flex flex-col justify-center min-w-0">
        {loading ? (
          <>
            <div className="h-2.5 w-32 rounded bg-[#2d3748] animate-pulse mb-1" />
            <div className="h-3.5 w-44 rounded bg-[#2d3748] animate-pulse" />
          </>
        ) : film ? (
          <>
            <a
              href={SOCIAL_LINKS.letterboxd}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-[#a0aec0] hover:text-[#63b3ed] uppercase tracking-wider no-underline transition-colors duration-200"
            >
              last watched:
            </a>

            <div className="font-mono text-sm leading-tight text-white flex items-center">
              <a
                href={film.url ?? SOCIAL_LINKS.letterboxd}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#63b3ed] transition-colors duration-200 no-underline"
              >
                {truncateText(film.title, 40)}
              </a>

              {film.rating && (
                <span className="text-[#a0aec0] cursor-default ml-1">
                  - {film.rating}/5 ⭐️
                </span>
              )}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
