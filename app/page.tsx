import MovieGrid from "@/components/MovieGrid";
import { getPopularMovies } from "@/lib/tmdb";
import Link from "next/link";

export const dynamic = "force-static";

export default async function Home() {
  const movies = await getPopularMovies();

  return (
    <>
      <section>
        <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Popular Movies
          </h1>
          <p className="max-w-xl text-sm text-zinc-400">
            Browse the latest popular movies powered by TMDB. Click on any
            title to view details, ratings, and more.
          </p>
        </div>
        <div>
          <Link href="/favourites">
            <button className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition-transform duration-300 hover:scale-110 hover:bg-red-700 cursor-pointer">Favourites</button>
          </Link>
        </div>
        </div>

        <MovieGrid movies={movies} />
      </section>
    </>
  );
}

