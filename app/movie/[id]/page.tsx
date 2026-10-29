export const instant = false;
import Image from "next/image";
import { getMovieById } from "@/lib/tmdb";
import { notFound } from "next/navigation";
import Link from "next/link";

type MovieDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function MovieDetailsPage({
  params,
}: MovieDetailsPageProps) {
  const { id } = await params;

  let movie;

  try {
    movie = await getMovieById(id);
  } catch {
    notFound();
  }

  return (
    <main className="min-h-screen bg-dark-black px-6 py-10 text-alabaster">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
        {movie.poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={500}
            height={750}
            className="w-full max-w-md rounded-2xl object-cover"
          />
        ) : (
          <div className="flex aspect-[2/3] max-w-md items-center justify-center rounded-2xl bg-gray-900">
            No poster available
          </div>
        )}

        <section>
          <Link
  href="/"
  className="mb-6 inline-block text-santas-gray transition-colors hover:text-white"
>
  ← Back to Movies
</Link>
          <h1 className="text-4xl font-bold">
            {movie.title}
          </h1>

          <p className="mt-4 text-santas-gray">
            Release date: {movie.release_date || "Unknown"}
          </p>

          <p className="mt-3 text-santas-gray">
            ⭐ {movie.vote_average.toFixed(1)} / 10
          </p>
          
{movie.genres && movie.genres.length > 0 && (
  <div className="mt-4 flex flex-wrap gap-2">
    {movie.genres.map((genre) => (
      <span
        key={genre.id}
        className="rounded-full border border-gray-600 px-3 py-1 text-sm"
      >
        {genre.name}
      </span>
    ))}
  </div>
)}

{movie.runtime != null && movie.runtime > 0 && (
  <p className="mt-4 text-santas-gray">
    Runtime: {Math.floor(movie.runtime / 60)}h{" "}
    {movie.runtime % 60}m
  </p>
)}


          <h2 className="mt-8 text-2xl font-semibold">
            Overview
          </h2>

          <p className="mt-3 leading-7 text-santas-gray">
            {movie.overview || "No overview available."}
          </p>
        </section>
      </div>
    </main>
  );
}
