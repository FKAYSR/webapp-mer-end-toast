import reactRouterLogo from "../assets/logo.svg";


export default function HomePage() {
  return (
    <>
      <header>
        <h1>Home</h1>
      </header>
      <main>
        <article>
          <img src={reactRouterLogo} alt="Mer' end Toast logo af 2 toasts" className="logo-home" />
        </article>
      </main>
    </>
  );
}
