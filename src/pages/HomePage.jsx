import reactRouterLogo from "../assets/logo.svg";
import SearchEntry from "../components/SearchEntry";
import ProductCard from "../components/ProductCard";
import ProductGrid from "../components/ProductGrid";
import { supabase } from "../supabaseClient";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const loadRecipes = async () => {
      const { data, error } = await supabase
        .from("opskrifter")
        .select("id, navn, pris_portion, tid, billede, ingredienser_ids");

      if (error) {
        console.error("Supabase error:", error);
        return;
      }

      setRecipes(data ?? []);
    };

    loadRecipes();
  }, []);

  return (
    <>
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
            />
          ))}
        </ProductGrid>
      </main>
    </>
  );
}
