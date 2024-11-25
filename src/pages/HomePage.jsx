import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../services/api";
import MovieList from "../components/MovieList";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false); // Stan ładowania
  const [error, setError] = useState(null); // Stan błędów

  useEffect(() => {
    const loadTrendingMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchTrendingMovies();
        setMovies(response.results);
      } catch (err) {
        setError(`Błąd pobierania filmów: ${err.message || "Nieznany błąd"}`);
      } finally {
        setLoading(false);
      }
    };

    loadTrendingMovies(); // Wywołanie funkcji pobierającej filmy
  }, []);

  return (
    <div>
      {loading && <div>Ładowanie...</div>}
      {error && <div>Błąd: {error}</div>}
      {!loading && !error && movies.length > 0 && <MovieList movies={movies} />}
      {!loading && !error && movies.length === 0 && (
        <div>Brak filmów do wyświetlenia.</div>
      )}
    </div>
  );
}

export default HomePage;
