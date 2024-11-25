import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div>
      <h1>404 - Strona nie znaleziona</h1>
      <p>Przykro nam, ale strona, której szukasz, nie istnieje.</p>
      <Link to="/">Wróć do strony głównej</Link>
    </div>
  );
}

export default NotFoundPage;
