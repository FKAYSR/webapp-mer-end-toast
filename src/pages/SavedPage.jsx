import ProductCard from "../components/ProductCard";
import ProductGrid from "../components/ProductGrid";
import { supabase } from "../supabaseClient";
import { useEffect, useState } from "react";

export default function SavedPage() {
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
      <main>
        <ProductGrid title="Dine livretter (mest brugte)" variant="horizontal">
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
        <ProductGrid title="Alle gemte" variant="vertical">
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
