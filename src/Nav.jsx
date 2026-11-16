import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchMovies } from "./api";

function Nav({ setMovies, setLoading, setError, setQuery }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const query = search.trim() || "avengers";

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError("");
    setQuery(query);

    const timer = setTimeout(async () => {
      try {
        const data = await searchMovies(query);
        if (!ignore) setMovies(data);
      } catch {
        if (!ignore) setError("Something went wrong. Please try again.");
      } finally {
        if (!ignore) setLoading(false);
      }
    }, 400);

    return () => {
      ignore = true;
      clearTimeout(timer);
    };
  }, [query, setMovies, setLoading, setError, setQuery]);

  function handleChange(e) {
    setSearch(e.target.value);
    navigate("/");
  }

  return (
    <header className="nav">
      <Link to="/" className="logo">
        <strong>Simplified</strong> Flix
      </Link>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={search}
        onChange={handleChange}
      />
    </header>
  );
}

export default Nav;