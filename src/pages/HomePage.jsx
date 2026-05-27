import reactRouterLogo from "../assets/logo.svg";
import Searchbar from "../components/Searchbar";

export default function HomePage() {
  return (
    <>
      <header>
        <Searchbar />
      </header>
      <main>
        <article>
          <img src={reactRouterLogo} alt="Mer' end Toast logo af 2 toasts" className="logo-home" />
        </article>
      </main>
    </>
  );
}
