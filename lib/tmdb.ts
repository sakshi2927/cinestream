const TMDB_BASE_URL = "https://api.tmdb.org/3";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

if (!API_KEY) {
  // This will surface clearly during development if the key is missing.
  throw new Error(
    "NEXT_PUBLIC_TMDB_API_KEY is not set. Please add it to your .env.local file."
  );
}

export type TmdbMovie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
};

type TmdbPaginatedResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

async function tmdbFetch<T>(path: string, searchParams?: URLSearchParams) {
  const url = new URL(`${TMDB_BASE_URL}${path}`);
  url.searchParams.set("api_key", API_KEY!);

  if (searchParams) {
    searchParams.forEach((value, key) => {
      url.searchParams.set(key, value);
    });
  }

  const res = await fetch(url.toString(), {
    // All usages in this project are server-side.
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`TMDB request failed: ${res.status} ${res.statusText}`);
  }

  return (await res.json()) as T;
}

export async function getPopularMovies() {
  const data = await tmdbFetch<TmdbPaginatedResponse<TmdbMovie>>(
    "/movie/popular"
  );
  return data.results;
}

export async function getMovieDetails(id: string | number) {
  const data = await tmdbFetch<TmdbMovie>(`/movie/${id}`);
  return data;
}

export async function searchMovies(query: string) {
  if (!query.trim()) return [];

  const params = new URLSearchParams();
  params.set("query", query);

  const data = await tmdbFetch<TmdbPaginatedResponse<TmdbMovie>>(
    "/search/movie",
    params
  );

  return data.results;
}

