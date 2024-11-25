import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../services/api"; // Zakładamy, że masz funkcję searchMovies w api.js
import MovieList from "../components/MovieList"; // Upewnij się, że ten komponent istnieje

function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]); // Stan dla filmów
  const [loading, setLoading] = useState(false); // Stan dla ładowania
  const [error, setError] = useState(null); // Stan dla błędów

  const query = searchParams.get("query") || ""; // Pobieranie wartości query z URL

  // Użycie useEffect do pobierania filmów przy zmianie query
  useEffect(() => {
    const fetchMoviesData = async () => {
      setLoading(true); // Ustawienie loading na true
      setError(null); // Reset błędów
      try {
        const response = await searchMovies(query); // Korzystamy z funkcji searchMovies z api.js
        setMovies(response.results); // Ustawienie filmów
      } catch (err) {
        setError(`Błąd pobierania filmów: ${err.message || "Nieznany błąd"}`); // Ustawienie błędów
      } finally {
        setLoading(false); // Ustawienie loading na false
      }
    };

    if (query) {
      fetchMoviesData(); // Wywołanie funkcji pobierającej filmy
    } else {
      setMovies([]); // Resetowanie filmów, jeśli query jest puste
    }
  }, [query]);

  // Funkcja do aktualizacji query w URL
  const handleSearchSubmit = (newQuery) => {
    setSearchParams({ query: newQuery }); // Ustawienie nowych parametrów wyszukiwania
  };

  return (
    <div>
      <h1>Movies</h1>
      {/* Komponent wyszukiwania, który wywołuje handleSearchSubmit */}
      <SearchBar onSubmit={handleSearchSubmit} />
      {loading && <div>Ładowanie...</div>}{" "}
      {/* Wyświetlenie komunikatu ładowania */}
      {error && <div>Błąd: {error}</div>} {/* Wyświetlenie komunikatu błędu */}
      {/* Renderowanie listy filmów, jeśli jest co najmniej jeden film */}
      {movies.length > 0 && <MovieList movies={movies} />}
      {movies.length === 0 && !loading && <div>Brak wyników.</div>}
    </div>
  );
}

// Przykładowy komponent SearchBar do wyszukiwania filmów
function SearchBar({ onSubmit }) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value); // Ustawienie wartości inputa
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(inputValue); // Wywołanie onSubmit z wartością inputa
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Wyszukaj filmy..."
      />
      <button type="submit">Szukaj</button>
    </form>
  );
}

export default MoviesPage;
