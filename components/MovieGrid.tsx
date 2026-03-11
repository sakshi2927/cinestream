import MovieCard from "./MovieCard";
import type { TmdbMovie } from "@/lib/tmdb";

type MovieGridProps = {
  movies: TmdbMovie[];
  emptyMessage?: string;
};

export default function MovieGrid({ movies, emptyMessage }: MovieGridProps) {
  if (!movies.length) {
    return (
      <p className="mt-10 text-center text-sm text-zinc-400">
        {emptyMessage ?? "No movies to display."}
      </p>
    );
  }

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

