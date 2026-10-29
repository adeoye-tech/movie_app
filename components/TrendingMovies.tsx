
import { getTrendingMovies } from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";

export default async function TrendingMovies() {
  const movies = await getTrendingMovies();

  return (
    <section className="px-6 py-10">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Popular Right Now
      </h2>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
