import React from "react";
import { Link, useLocation } from "react-router-dom";

function MovieList({ movies }) {
  // Użycie hooka useLocation
  const location = useLocation();

  // Funkcja do uzyskiwania pełnego URL obrazu
  const getImageUrl = (filename) => {
    const baseUrl = "https://image.tmdb.org/t/p/w500";
    return `${baseUrl}${filename.startsWith("/") ? filename : `/${filename}`}`;
  };

  return (
    <div>
      {movies.length > 0 ? (
        movies.map((movie) => (
          <div key={movie.id}>
            <h2>
              {/* Link do szczegółów filmu */}
              <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                {movie.title}
              </Link>
            </h2>
            <img src={getImageUrl(movie.poster_path)} alt={movie.title} />
          </div>
        ))
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
}

export default MovieList;
