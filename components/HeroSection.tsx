
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Popcorn, Search } from "lucide-react";
import Image from "next/image";
import type { Movie } from "@/lib/tmdb";

type HeroSectionProps = {
  onSearchChange: (query: string) => void;
};

export default function HeroSection({
  onSearchChange,
}: HeroSectionProps) {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const timer = setTimeout(async () => {
      setIsSearching(true);

      try {
        const response = await fetch(
          `/api/search?query=${encodeURIComponent(query.trim())}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Failed to load movies");
        }

        const data: { results: Movie[] } = await response.json();
        setMovies(data.results);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Unable to update hero posters:", error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsSearching(false);
        }
      }
    }, 400);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (trimmedQuery) {
      router.push(`/search?query=${encodeURIComponent(trimmedQuery)}`);
    }
  }

  return (
    <header className="relative h-[70vh] min-h-[500px] overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-2 gap-1 opacity-60 sm:grid-cols-3 md:grid-cols-5">
        {movies.map((movie) => (
          <div key={movie.id} className="relative h-full">
            {movie.poster_path && (
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                fill
                sizes="20vw"
                className="object-cover"
              />
            )}
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-linear-to-t from-woodsmoke/70 via-woodsmoke/20 to-transparent" />
<div className="absolute inset-0 bg-linear-to-t from-woodsmoke/50 via-transparent to-woodsmoke/20" />

      <div className="absolute inset-0 z-10 flex items-center justify-center px-4">
        <div className="w-full max-w-3xl text-center">
          <div className="mb-4 flex flex-col items-center justify-center">
            <div className="mt-4 flex h-14 w-14 items-center justify-center rounded-xl bg-red-500 shadow-lg">
              <Popcorn className="h-7 w-7" />
            </div>

            <h1 className="text-5xl font-black tracking-tight text-gray-200 sm:text-7xl">
              MovieBox
            </h1>

            <p className="mb-4 text-lg font-light tracking-tight text-gray-300 sm:text-2xl">
              Discover the most trending movies right now.
            </p>

            <form
              onSubmit={handleSubmit}
              className="relative h-12 w-full max-w-[500px]"
            >
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-santas-gray" />

             <input
  value={query}
  onChange={(event) => {
    const value = event.target.value;
    setQuery(value);
    onSearchChange(value);
  }}
  className="h-full w-full rounded-xl border-none bg-dark-black pl-10 pr-12 outline-none"
  placeholder="Search Movies..."
  aria-label="Search movies"
/>

              {isSearching && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-santas-gray">
                  Loading...
                </span>
              )}
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}
