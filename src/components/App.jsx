import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navigation from "./Navigation.jsx";

const HomePageComponent = lazy(() => import("../pages/HomePage.jsx"));
const MoviesPageComponent = lazy(() => import("../pages/MoviesPage.jsx"));
const MovieDetailsPageComponent = lazy(() =>
  import("../pages/MovieDetailsPage.jsx")
);

function App() {
  return (
    <Router>
      <Navigation />
      <Suspense fallback={<div>Ładowanie...</div>}>
        <Routes>
          <Route path="/" element={<HomePageComponent />} />
          <Route path="/movies" element={<MoviesPageComponent />} />
          <Route
            path="/movies/:movieId"
            element={<MovieDetailsPageComponent />}
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
