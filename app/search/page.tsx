import MovieGrid from "@/components/MovieGrid";
import { searchMovies } from "@/lib/tmdb";

type SearchPageProps = {
  searchParams: Promise<{ query?: string }>;
};

export const dynamic = "force-dynamic";

export default async function SearchPage(props: SearchPageProps) {
  const { query = "" } = await props.searchParams;
  const trimmed = query?.trim() ?? "";

  const movies = trimmed ? await searchMovies(trimmed) : [];

  return (
    <section>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Search
        </h1>
        <p className="max-w-xl text-sm text-zinc-400">
          Enter a movie title in the search bar to discover movies from TMDB.
        </p>
      </div>

      {trimmed ? (
        <>
          <p className="mt-4 text-sm text-zinc-400">
            Showing results for{" "}
            <span className="font-semibold text-white">&ldquo;{trimmed}&rdquo;</span>
          </p>
          <MovieGrid
            movies={movies}
            emptyMessage="No movies found. Try another search."
          />
        </>
      ) : (
        <p className="mt-8 text-sm text-zinc-500">
          Use the search bar in the header to find movies.
        </p>
      )}
    </section>
  );
}

