import ProductCard from "../components/ProductCard";
import ProductGrid from "../components/ProductGrid";
import { supabase } from "../supabaseClient";
import { useEffect, useState } from "react";

export default function ProfilePage() {
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
        <h1>Profile</h1>
      </header>
      <main>
        <p>This is the profile page.</p>
                <ProductGrid title="Senest lavet" variant="horizontal">
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
      </main>
    </>
  );
}
