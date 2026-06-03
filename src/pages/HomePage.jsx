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
        .select("id, navn, pris_portion, tid, billede, ingredienser_ids"); // Vi henter bare JSON-feltet

      if (error) console.error("Supabase error:", error);
      else setRecipes(data ?? []);
    };
    loadRecipes();
  }, []);

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
              ingredients={recipe.ingredienser_ids} // <-- Du sender bare JSON-dataen råt med her!
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
              ingredients={recipe.ingredienser_ids} // <-- Du sender bare JSON-dataen råt med her!
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
              ingredients={recipe.ingredienser_ids} // <-- Du sender bare JSON-dataen råt med her!
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
              ingredients={recipe.ingredienser_ids} // <-- Du sender bare JSON-dataen råt med her!
            />
          ))}
        </ProductGrid>
      </main>
    </div>
  );
}
