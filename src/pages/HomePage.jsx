import reactRouterLogo from "../assets/logo.svg";
import SearchEntry from "../components/SearchEntry";

export default function HomePage() {
  return (
    <>
      <header>
        <SearchEntry />
      </header>
      <main>
        <article>
          <img src={reactRouterLogo} alt="Mer' end Toast logo af 2 toasts" className="logo-home" />
        </article>
      </main>
    </>
  );
}
