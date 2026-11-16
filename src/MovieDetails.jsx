import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovie } from "./api";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError("");

    getMovie(id)
      .then((data) => {
        if (!ignore) setMovie(data);
      })
      .catch(() => {
        if (!ignore) setError("Something went wrong. Please try again.");
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="details">
        <div className="skeleton skeleton-poster details-poster" />
        <div className="details-info">
          <div className="skeleton skeleton-line" />
          <div className="skeleton skeleton-line short" />
          <div className="skeleton skeleton-line" />
          <div className="skeleton skeleton-line" />
        </div>
      </div>
    );
  }

  if (error) return <p>{error}</p>;
  if (!movie) return <p>Movie not found.</p>;

  return (
    <div className="details">
      {movie.Poster !== "N/A" ? (
        <img className="details-poster" src={movie.Poster} alt={movie.Title} />
      ) : (
        <div className="no-poster details-poster">Movie Poster Not Available</div>
      )}
      <div className="details-info">
        <h1>{movie.Title}</h1>
        <p>
          {movie.Year} · {movie.Runtime} · {movie.Rated}
        </p>
        <p>Genre: {movie.Genre}</p>
        <p>Director: {movie.Director}</p>
        <p>Cast: {movie.Actors}</p>
        <p>IMDb rating: {movie.imdbRating}</p>
        <p>{movie.Plot}</p>
        <Link to="/">← Back to movies</Link>
      </div>
    </div>
  );
}

export default MovieDetails;
