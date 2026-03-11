import Link from "next/link";
import SearchBar from "./SearchBar";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/5 bg-gradient-to-b from-black/80 via-black/60 to-transparent backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="rounded bg-red-600 px-2 py-1 text-xs font-semibold tracking-widest text-white">
            CINE
          </span>
          <span className="text-lg font-semibold tracking-wide text-white">
            Cine-Stream
          </span>
        </Link>
        <div className="flex flex-1 items-center justify-end gap-4">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}

