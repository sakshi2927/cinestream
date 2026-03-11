"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState, useEffect } from "react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") ?? "";
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search?query=${encodeURIComponent(trimmed)}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full max-w-xs items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm text-white ring-1 ring-white/20 backdrop-blur-sm focus-within:ring-red-500 sm:max-w-sm"
    >
      <input
        type="text"
        placeholder="Search movies..."
        className="flex-1 bg-transparent text-sm text-white placeholder:text-white/50 outline-none"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white transition hover:bg-red-500"
      >
        Search
      </button>
    </form>
  );
}

