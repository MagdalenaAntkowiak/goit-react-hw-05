import { useParams } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import { fetchMovieDetails } from "../services/api"; // Zakładamy, że masz tę funkcję w api.js

// Lazy loading komponentów
const MovieCast = lazy(() => import("./MovieCast.jsx"));
const MovieReviews = lazy(() => import("./MovieReviews.jsx"));

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null); // Stan dla szczegółów filmu
  const [loading, setLoading] = useState(true); // Stan ładowania
  const [error, setError] = useState(null); // Stan błędów

  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        setLoading(true); // Rozpoczęcie ładowania
        setError(null); // Reset błędów

        // Pobranie szczegółów filmu na podstawie ID
        const movieData = await fetchMovieDetails(movieId);
        setMovie(movieData); // Ustawienie danych filmu
      } catch (err) {
        setError(`Błąd pobierania danych: ${err.message}`); // Ustawienie błędu
      } finally {
        setLoading(false); // Zakończenie ładowania
      }
    };

    if (movieId) {
      loadMovieDetails(); // Wywołanie funkcji ładowania filmu, jeśli istnieje movieId
    }
  }, [movieId]);

  if (loading) {
    return <div>Ładowanie szczegółów filmu...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>{movie ? movie.title : "Film"}</h1>
      {/* Wyświetlanie szczegółów filmu */}
      {movie && (
        <div>
          <p>{movie.overview}</p>
          <p>Ocena: {movie.vote_average}</p>
          <p>Data premiery: {movie.release_date}</p>
          {/* Inne szczegóły filmu */}
        </div>
      )}

      <Suspense fallback={<div>Ładowanie obsady...</div>}>
        <MovieCast movieId={movieId} />
      </Suspense>

      <Suspense fallback={<div>Ładowanie recenzji...</div>}>
        <MovieReviews movieId={movieId} />
      </Suspense>
    </div>
  );
}

export default MovieDetailsPage;
