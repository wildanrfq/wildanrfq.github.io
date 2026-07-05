import { useNowPlaying } from "../lib/useNowPlaying";
import { SOCIAL_LINKS } from "../config/site";
import { truncateText } from "../lib/truncateText";

export function NowPlayingWidget({ visible }) {
  const { track, isPlaying, loading } = useNowPlaying();

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
        ) : track?.image ? (
          <a href={track.url} target="_blank" rel="noopener noreferrer">
            <img
              src={track.image}
              alt={track.album}
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
        ) : track ? (
          <>
            <a
              href={SOCIAL_LINKS.lastfm}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-[#a0aec0] hover:text-[#63b3ed] uppercase tracking-wider no-underline transition-colors duration-200"
            >
              {isPlaying ? (
                <span className="flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[green] animate-pulse" />
                  currently listening to:
                </span>
              ) : (
                "last listened to:"
              )}
            </a>

            <span className="font-mono text-sm text-white leading-tight">
              <a
                href={track.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#63b3ed] no-underline transition-colors duration-200"
              >
                {truncateText(track.name, 40)}
              </a>{" "}
              <span className="text-[#a0aec0] cursor-default">by</span>{" "}
              <span className="text-[#90cdf4] cursor-default">{track.artist}</span>
            </span>
          </>
        ) : null}
      </div>
    </div>
  );
}
