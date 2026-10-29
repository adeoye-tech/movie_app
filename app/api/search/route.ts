
import { NextResponse } from "next/server";
import { getTrendingMovies, searchMovies } from "@/lib/tmdb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query")?.trim();

  try {
    const movies = query
      ? await searchMovies(query)
      : await getTrendingMovies();

    return NextResponse.json({
      results: movies
        .filter((movie) => movie.poster_path)
        .slice(0, 5),
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to load movies" },
      { status: 500 }
    );
  }
}
