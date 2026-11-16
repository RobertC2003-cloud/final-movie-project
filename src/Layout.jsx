import { useState } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";

function Layout() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("avengers");

  return (
    <div className="layout">
      <Nav
        setMovies={setMovies}
        setLoading={setLoading}
        setError={setError}
        setQuery={setQuery}
      />
      <main className="main">
        <Outlet context={{ movies, loading, error, query }} />
      </main>
      <footer className="footer">
        <p>© 2026 Simplified Flix. Built by Robert Crosby.</p>
      </footer>
    </div>
  );
}

export default Layout;