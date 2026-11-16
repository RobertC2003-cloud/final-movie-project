import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <Link to={`/${movie.imdbID}`} className="movie-card">
      {movie.Poster !== "N/A" ? (
        <img src={movie.Poster} alt={movie.Title} />
      ) : (
        <div className="no-poster">Movie Poster Not Available</div>
      )}
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
    </Link>
  );
}

export default MovieCard;