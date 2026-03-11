"use client";

import { useEffect, useState } from "react";
import MovieGrid from "./MovieGrid";
import type { TmdbMovie } from "@/lib/tmdb";
import { getMovieDetails } from "@/lib/tmdb";

const STORAGE_KEY = "cine-stream:favorites";

export default function FavoritesSection() {
  const [movies, setMovies] = useState<TmdbMovie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadFavorites() {
      if (typeof window === "undefined") return;

      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        const ids = raw ? (JSON.parse(raw) as number[]) : [];

        if (!ids.length) {
          if (!cancelled) {
            setMovies([]);
            setLoading(false);
          }
          return;
        }

        const uniqueIds = Array.from(new Set(ids));
        const fetched = await Promise.all(
          uniqueIds.map((id) => getMovieDetails(id))
        );

        if (!cancelled) {
          setMovies(fetched);
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setMovies([]);
          setLoading(false);
        }
      }
    }

    loadFavorites();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight">Your Favorites</h2>
        <p className="mt-3 text-sm text-zinc-500">Loading your favorites...</p>
      </section>
    );
  }

  if (!movies.length) {
    return (
      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight">Your Favorites</h2>
        <p className="mt-3 text-sm text-zinc-500">
          You have no favorite movies yet. Tap the Favorite button on a movie
          card to add it here.
        </p>
      </section>
    );
  }

  return (
    <section className="mt-10">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold tracking-tight">Your Favorites</h2>
        <p className="max-w-xl text-sm text-zinc-400">
          Movies you&apos;ve marked as favorites.
        </p>
      </div>
      <MovieGrid movies={movies} />
    </section>
  );
}

