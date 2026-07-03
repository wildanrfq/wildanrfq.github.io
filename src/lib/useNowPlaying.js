import { useState, useEffect } from "react";
import { LASTFM_CONFIG } from "../config/site";

export function useNowPlaying() {
  const [track, setTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let interval;

    const fetchTrack = async () => {
      if (!LASTFM_CONFIG.apiKey) {
        setLoading(false);
        return;
      }
      try {
        const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_CONFIG.user}&api_key=${LASTFM_CONFIG.apiKey}&format=json&limit=1`;
        const res = await fetch(url);
        const data = await res.json();
        const latest = data.recenttracks?.track?.[0];
        if (!latest) return;

        const nowPlaying = latest["@attr"]?.nowplaying === "true";
        setIsPlaying(nowPlaying);
        setTrack({
          name: latest.name,
          artist: latest.artist["#text"],
          album: latest.album["#text"],
          url: latest.url,
          image:
            latest.image?.find((img) => img.size === "large")?.["#text"] ||
            null,
        });
      } catch {
        // keep showing last known state on failure
      } finally {
        setLoading(false);
      }
    };

    fetchTrack();
    interval = setInterval(fetchTrack, LASTFM_CONFIG.pollInterval);
    return () => clearInterval(interval);
  }, []);

  return { track, isPlaying, loading };
}
