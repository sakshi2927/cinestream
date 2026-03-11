"use client";

import { useEffect, useState } from "react";

type FavoriteButtonProps = {
  movieId: number;
};

const STORAGE_KEY = "cine-stream:favorites";

export default function FavoriteButton({ movieId }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const ids = JSON.parse(raw) as number[];
      setIsFavorite(ids.includes(movieId));
    } catch {
      // ignore
    }
  }, [movieId]);

  const toggleFavorite = () => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const ids = raw ? (JSON.parse(raw) as number[]) : [];
      let next: number[];
      if (ids.includes(movieId)) {
        next = ids.filter((id) => id !== movieId);
        setIsFavorite(false);
      } else {
        next = [...ids, movieId];
        setIsFavorite(true);
      }
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  return (
    <button
      type="button"
      onClick={toggleFavorite}
      className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white shadow-sm ring-1 ring-white/20 transition hover:bg-red-600 hover:ring-red-500 cursor-pointer"
      aria-pressed={isFavorite}
    >
      <span
        aria-hidden="true"
        className={`h-4 w-4 text-xs leading-4 transition-colors  ${
          isFavorite ? "text-red-400" : "text-white/60"
        }`}
      >
        ♥
      </span>
      <span>{isFavorite ? "Favorited" : "Favorite"}</span>
    </button>
  );
}

