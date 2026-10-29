
"use client";

import { useEffect, useState } from "react";
import MovieCard from "@/components/MovieCard";
import type { Movie } from "@/lib/tmdb";

type HomeMoviesProps = {
  query: string;
};

export default function HomeMovies({ query }: HomeMoviesProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const timer = setTimeout(async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `/api/search?query=${encodeURIComponent(query.trim())}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }

        const data: { results: Movie[] } = await response.json();
        setMovies(data.results);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Unable to load movies:", error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 400);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  const isSearching = query.trim().length > 0;

  return (
    <section className="px-6 py-10">
      <h2 className="mb-6 text-2xl font-bold text-white">
        {isSearching ? `Search Results for "${query.trim()}"` : "Popular Right Now"}
      </h2>

      {loading && (
        <p className="mb-4 text-santas-gray">Loading movies...</p>
      )}

      {!loading && movies.length === 0 && isSearching && (
        <p className="text-santas-gray">
          No movies found. Try another search.
        </p>
      )}

      {!loading && movies.length === 0 && !isSearching && (
        <p className="text-santas-gray">
          Unable to load movies. Please try again.
        </p>
      )}

      {movies.length > 0 && (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
}
