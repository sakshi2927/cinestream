import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getMovieDetails } from "@/lib/tmdb";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  props: PageProps
): Promise<Metadata> {
  const { id } = await props.params;
  const movie = await getMovieDetails(id);

  const title = movie.title ? `${movie.title} | Cine-Stream` : "Cine-Stream";

  return {
    title,
    description: movie.overview || "Movie details on Cine-Stream.",
    openGraph: {
      title,
      description: movie.overview || undefined,
      images: movie.backdrop_path
        ? [`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`]
        : undefined,
    },
  };
}

export default async function MoviePage(props: PageProps) {
  const { id } = await props.params;
  const movie = await getMovieDetails(id);

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder-poster.png";

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : undefined;

  return (
    <article className="space-y-6">
      <div className="relative -mx-4 -mt-6 overflow-hidden rounded-b-3xl border-b border-white/10 bg-zinc-900/60 sm:-mx-6 lg:-mx-8">
        {backdropUrl && (
          <div className="relative h-64 w-full sm:h-80">
            <Image
              src={backdropUrl}
              alt={movie.title}
              fill
              className="object-cover opacity-60"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          </div>
        )}
        <div className="relative mx-auto flex max-w-6xl gap-6 px-4 pb-6 pt-6 sm:px-6 sm:pb-8 lg:px-8 lg:pb-10">
          <div className="relative -mt-20 h-48 w-32 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-zinc-900/80 shadow-2xl sm:h-60 sm:w-40 lg:h-72 lg:w-48">
            <Image
              src={posterUrl}
              alt={movie.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-1 flex-col justify-end gap-3">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
              {movie.title}
            </h1>
            <p className="text-sm text-zinc-300">
              {movie.release_date
                ? new Date(movie.release_date).toLocaleDateString()
                : "Release date unknown"}
            </p>
            <p className="text-sm text-zinc-300">
              ⭐{" "}
              <span className="font-semibold">
                {movie.vote_average.toFixed(1)}
              </span>{" "}
              <span className="text-zinc-400">/ 10</span>
            </p>
            <p className="max-w-2xl text-sm text-zinc-200">
              {movie.overview || "No overview available for this movie."}
            </p>
            <div className="mt-3">
              <Link
                href="/"
                className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/20 transition hover:bg-white/20"
              >
                ← Back to popular movies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

