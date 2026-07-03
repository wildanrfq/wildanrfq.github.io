import { useNowPlaying } from "../lib/useNowPlaying";
import { WidgetSkeleton } from "./WidgetSkeleton";
import { SOCIAL_LINKS } from "../config/site";

export function NowPlayingWidget({ visible }) {
  const { track, isPlaying, loading } = useNowPlaying();

  if (!visible) return null;
  if (loading) return <WidgetSkeleton />;
  if (!track) return null;

  return (
    <div className="flex items-center gap-3 mb-3">
      {track.image && (
        <a
          href={track.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0"
        >
          <img
            src={track.image}
            alt={track.album}
            className="w-10 h-10 rounded object-cover"
          />
        </a>
      )}
      <div className="flex flex-col">
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
            {track.name}
          </a>{" "}
          <span className="text-[#a0aec0] cursor-default">by</span>{" "}
          <span className="text-[#90cdf4] cursor-default">{track.artist}</span>
        </span>
      </div>
    </div>
  );
}
