import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import MovieCard from "./MovieCard";
import SkeletonCard from "./SkeletonCard";

function Home() {
  const { movies, loading, error, query } = useOutletContext();
  const [sort, setSort] = useState("default");

  const sorted = [...movies];
  if (sort === "titleAsc") sorted.sort((a, b) => a.Title.localeCompare(b.Title));
  if (sort === "titleDesc") sorted.sort((a, b) => b.Title.localeCompare(a.Title));
  if (sort === "newest") sorted.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
  if (sort === "oldest") sorted.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));

  return (
    <div>
      <div className="toolbar">
        <p>Showing: {query}</p>
        <label>
          Sort:{" "}
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="default">Default</option>
            <option value="titleAsc">Title A to Z</option>
            <option value="titleDesc">Title Z to A</option>
            <option value="newest">Newest to oldest</option>
            <option value="oldest">Oldest to newest</option>
          </select>
        </label>
      </div>

      {error && <p>{error}</p>}
      {!loading && !error && sorted.length === 0 && <p>No movies found.</p>}

      <div className="movie-grid">
        {loading
          ? Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)
          : sorted.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
      </div>
    </div>
  );
}

export default Home;
