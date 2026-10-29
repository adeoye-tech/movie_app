export const instant = false;
import Link from "next/link";
import Image from "next/image";
import { searchMovies } from "@/lib/tmdb";
import { notFound } from "next/navigation";

type SearchPageProps = {
  searchParams: Promise<{ query?: string }>;
};

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {
  const { query } = await searchParams;
  const searchQuery = query?.trim();

  if (!searchQuery) {
    notFound();
  }

  let movies;

  try {
    movies = await searchMovies(searchQuery);
  } catch {
    throw new Error("Unable to load search results. Please try again.");
  }

  return (
    <main className="min-h-screen bg-dark-black px-6 py-10 text-alabaster">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="mb-8 inline-block text-santas-gray transition-colors hover:text-white"
        >
          ← Back to Movies
        </Link>

        <h1 className="text-3xl font-bold">
          Search Results
        </h1>

        <p className="mt-2 text-santas-gray">
          Results for &quot;{searchQuery}&quot;
        </p>

        {movies.length === 0 ? (
          <p className="mt-10 text-santas-gray">
            No movies found. Try another title.
          </p>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {movies.map((movie) => (
              <Link
                key={movie.id}
                href={`/movie/${movie.id}`}
                className="overflow-hidden rounded-xl bg-gray-900 transition-transform duration-300 hover:scale-[1.03]"
              >
                {movie.poster_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    width={300}
                    height={450}
                    className="h-auto w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-[2/3] items-center justify-center p-4 text-center text-santas-gray">
                    No poster available
                  </div>
                )}

                <div className="p-3">
                  <h2 className="font-semibold">
                    {movie.title}
                  </h2>

                  <p className="mt-1 text-sm text-santas-gray">
                    ⭐ {movie.vote_average.toFixed(1)} / 10
                  </p>

                  <p className="mt-1 text-sm text-santas-gray">
                    {movie.release_date?.slice(0, 4) || "Release date unknown"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
