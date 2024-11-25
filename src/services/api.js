import axios from "axios";

const API_URL = "https://api.themoviedb.org/3";
const API_TOKEN = `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`;

// Tworzenie instancji axios do wielokrotnego użytku z bazowym URL i nagłówkami
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: API_TOKEN,
  },
  params: {
    language: "en-US", // Domyślny parametr językowy
  },
});

// Funkcja do pobierania filmów
const fetchMovies = async (endpoint, params = {}) => {
  try {
    // Wywołanie za pomocą apiClient (axios)
    const response = await apiClient.get(endpoint, {
      params: {
        ...params, // Przekazywanie dodatkowych parametrów
      },
    });
    return response.data;
  } catch (error) {
    // Sprawdź, czy mamy odpowiedź od serwera
    if (error.response) {
      console.error("Error fetching data from API:", error.response.status);
      throw new Error(
        `Error ${error.response.status}: ${
          error.response.data.status_message || "Unknown error"
        }`
      );
    } else if (error.request) {
      // Błąd związany z brakiem odpowiedzi od serwera
      console.error("No response received from API:", error.request);
      throw new Error("No response received from API");
    } else {
      // Inne błędy, np. związane z konfiguracją zapytania
      console.error("Error setting up request to API:", error.message);
      throw new Error(`Error: ${error.message}`);
    }
  }
};

// Konkretne wywołania API
export const fetchTrendingMovies = () => fetchMovies("/trending/movie/week");
export const searchMovies = (query) => fetchMovies("/search/movie", { query });
export const fetchMovieDetails = (movieId) => fetchMovies(`/movie/${movieId}`);

export { fetchMovies };
