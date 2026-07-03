import { useLastFilm } from "../lib/useLastFilm";
import { WidgetSkeleton } from "./WidgetSkeleton";
import { SOCIAL_LINKS } from "../config/site";

export function LastFilmWidget({ visible }) {
  const { film, loading } = useLastFilm();

  if (!visible) return null;
  if (loading) return <WidgetSkeleton />;
  if (!film) return null;

  return (
    <div className="flex items-center gap-3">
      {film.poster && (
        <a
          href={film.url ?? SOCIAL_LINKS.letterboxd}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0"
        >
          <img
            src={film.poster}
            alt={film.title}
            className="w-10 h-10 rounded object-cover"
          />
        </a>
      )}
      <div className="flex flex-col">
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
            {film.title}
          </a>

          {film.rating && (
            <span className="text-[#a0aec0] cursor-default ml-1">
              - {film.rating}/5 ⭐️
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
