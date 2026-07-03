import { useState, useEffect } from "react";

export function useLastFilm() {
  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}last-film.json`)
      .then((r) => r.json())
      .then((data) => {
        if (data?.title) setFilm(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { film, loading };
}
