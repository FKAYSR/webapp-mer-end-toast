import reactRouterLogo from "../assets/logo.svg";
import SearchEntry from "../components/SearchEntry";
import ProductCard from "../components/ProductCard";
import ProductGrid from "../components/ProductGrid";
import { supabase } from "../supabaseClient";
import { useEffect, useState, useRef } from "react"; // Tilføjet useRef
import lottie from "lottie-web"; // Importer lottie-web
import Toast from "../assets/animation/loading.json"; // Din json fil

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Ny loading state
  const lottieContainer = useRef(null); // Reference til animations-div

  useEffect(() => {
    const loadRecipes = async () => {
      setIsLoading(true); // Start loading
      const { data, error } = await supabase
        .from("opskrifter")
        .select("id, navn, pris_portion, tid, billede, ingredienser_ids");

      if (error) console.error("Supabase error:", error);
      else setRecipes(data ?? []);

      setIsLoading(false); // Stop loading når data er hentet
    };
    loadRecipes();
  }, []);

  // Denne useEffect styrer selve Lottie-animationen
  useEffect(() => {
    if (isLoading && lottieContainer.current) {
      const instance = lottie.loadAnimation({
        container: lottieContainer.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: Toast,
      });

      // Cleanup: fjern animationen når komponenten loader ud eller loading stopper
      return () => instance.destroy();
    }
  }, [isLoading]);

  return (
    <div className="home-page">
      <header>
        <SearchEntry />
      </header>
      <main>
        <article className="hero-section">
          <img
            src={reactRouterLogo}
            alt="Mer' end Toast logo af 2 toasts"
            className="logo-home"
          />
          <p className="home-text">Mer' end Toast</p>
        </article>

        {isLoading ? (
          /* LOADING SKÆRM */
          <div className="toast-loading-container">
            <div ref={lottieContainer} className="toast-animation" />
          </div>
        ) : (
          /* DIN NORMALE GRID-VISNING */
          <>
            <ProductGrid title="Mest populære" variant="horizontal">
              {recipes.map((recipe) => (
                <ProductCard
                  key={recipe.id}
                  id={recipe.id}
                  variant="small"
                  title={recipe.navn}
                  price={recipe.pris_portion}
                  time={recipe.tid}
                  image={recipe.billede}
                  ingredients={recipe.ingredienser_ids}
                />
              ))}
            </ProductGrid>

            <ProductGrid title="Hurtigt og billigt" variant="horizontal">
              {recipes.map((recipe) => (
                <ProductCard
                  key={recipe.id}
                  id={recipe.id}
                  variant="small"
                  title={recipe.navn}
                  price={recipe.pris_portion}
                  time={recipe.tid}
                  image={recipe.billede}
                  ingredients={recipe.ingredienser_ids}
                />
              ))}
            </ProductGrid>

            <ProductGrid title="Smagen af sommer" variant="horizontal">
              {recipes.map((recipe) => (
                <ProductCard
                  key={recipe.id}
                  id={recipe.id}
                  variant="small"
                  title={recipe.navn}
                  price={recipe.pris_portion}
                  time={recipe.tid}
                  image={recipe.billede}
                  ingredients={recipe.ingredienser_ids}
                />
              ))}
            </ProductGrid>

            <ProductGrid title="Blandet" variant="vertical">
              {recipes.map((recipe) => (
                <ProductCard
                  key={recipe.id}
                  id={recipe.id}
                  variant="large"
                  title={recipe.navn}
                  price={recipe.pris_portion}
                  time={recipe.tid}
                  image={recipe.billede}
                  ingredients={recipe.ingredienser_ids}
                />
              ))}
            </ProductGrid>
          </>
        )}
      </main>
    </div>
  );
}
