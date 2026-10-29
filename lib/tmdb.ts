
const BASE_URL = "https://api.themoviedb.org/3";


export type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
  overview: string;
  genres?: {
    id: number;
    name: string;
  }[];
  runtime?: number | null;
};


type MovieResponse = {
  results: Movie[];
};

export async function getTrendingMovies(): Promise<Movie[]> {
  const response = await fetch(`${BASE_URL}/trending/movie/week`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch trending movies");
  }

  const data: MovieResponse = await response.json();
  return data.results;
}
export async function getMovieById(id: string): Promise<Movie> {
  const response = await fetch(`${BASE_URL}/movie/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch movie");
  }

  const movie: Movie = await response.json();

  return movie;
}

export async function searchMovies(query: string): Promise<Movie[]> {
  const response = await fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
      },
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to search movies");
  }

  const data: MovieResponse = await response.json();

  return data.results;
}

