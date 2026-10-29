
import Image from "next/image";
import Link from "next/link";
import type { Movie } from "@/lib/tmdb";

type MovieCardProps = {
  movie: Movie;
};

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link
      href={`/movie/${movie.id}`}
      className="block overflow-hidden rounded-xl bg-gray-900 transition-transform duration-300 hover:scale-[1.03]"
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
        <div className="flex aspect-[2/3] items-center justify-center bg-gray-800 text-gray-400">
          No poster available
        </div>
      )}

      <div className="p-3">
        <h3 className="truncate text-lg font-bold text-white">
          {movie.title}
        </h3>

        <p className="mt-1 text-sm text-gray-400">
          ⭐ {movie.vote_average.toFixed(1)} / 10
        </p>

        <p className="mt-1 text-sm text-gray-400">
          {movie.release_date?.slice(0, 4) || "Release date unknown"}
        </p>
      </div>
    </Link>
  );
}
