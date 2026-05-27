import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <>
      <header>
        <h1 className="not-found-title">404</h1>
      </header>
      <main className="not-found">
        <p>Sorry, the page you're looking for doesn't exist.</p>
        <Link to="/" className="not-found-link">
          Go back home
        </Link>
      </main>
    </>
  );
}
