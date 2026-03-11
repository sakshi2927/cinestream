import Image from "next/image";
import Link from "next/link";
import type { TmdbMovie } from "@/lib/tmdb";
import FavoriteButton from "./FavoriteButton";

type MovieCardProps = {
  movie: TmdbMovie;
};

export default function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder-poster.png";

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl bg-zinc-900/80 shadow-lg ring-1 ring-zinc-800 transition hover:-translate-y-1 hover:shadow-2xl hover:ring-red-600">
      <Link href={`/movie/${movie.id}`} className="relative block overflow-hidden">
        <Image
          src={posterUrl}
          alt={movie.title}
          width={500}
          height={750}
          className="h-72 w-full object-cover transition duration-300 group-hover:scale-105 sm:h-80"
          priority={false}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100" />
      </Link>
      <div className="flex flex-1 flex-col justify-between gap-2 p-3">
        <div>
          <h3 className="line-clamp-1 text-sm font-semibold text-white">
            {movie.title}
          </h3>
          <p className="mt-1 text-xs text-zinc-400">
            ⭐ {movie.vote_average.toFixed(1)}{" "}
            <span className="text-zinc-500">
              {movie.release_date ? `• ${movie.release_date.slice(0, 4)}` : ""}
            </span>
          </p>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <FavoriteButton movieId={movie.id} />
        </div>
      </div>
    </div>
  );
}

