import SearchEntry from "../components/SearchEntry";
import { supabase } from "../supabaseClient";
import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import ProductGrid from "../components/ProductGrid";

export default function ProductPage() {
  const [recipes, setRecipes] = useState([]);
  const [searchParams] = useSearchParams();
  const q = searchParams.get("query") ?? "";

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
  }, [])

  const filterRecipes = recipes.filter((r) => {
    if (!q) return true;
    try {
      const array = Array.isArray(r.ingredienser_ids)
      ? r.ingredienser_ids : JSON.parse(r.ingredienser_ids || "[]");
      return Array.isArray(array) && array.some((text) => 
      String(text).toLowerCase().includes(q.toLowerCase())
    );
    } catch (e) {
      console.error(e);
      return false;
    }
  })

  return (
    <>
      <header>
        <SearchEntry />
      </header>

      <main>
        <ProductGrid title="Søgeresultater" variant="vertical">
          {filterRecipes.map((recipe) => (
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
