const KEY = import.meta.env.VITE_OMDB_KEY;


const BASE = "https://www.omdbapi.com/";

export async function searchMovies(query) {
  const res = await fetch(
    `${BASE}?apikey=${KEY}&type=movie&s=${encodeURIComponent(query)}`
  );
  const data = await res.json();
  console.log("Movie search results:", data);
  if (data.Response === "False") return [];
  return data.Search;
}

export async function getMovie(id) {
  const res = await fetch(`${BASE}?apikey=${KEY}&i=${id}&plot=full`);
  const data = await res.json();
  if (data.Response === "False") return null;
  return data;
}