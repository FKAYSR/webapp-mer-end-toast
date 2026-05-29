import SearchEntry from "../components/SearchEntry";
import { supabase } from "../supabaseClient";
import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";

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

  return (
    <>
      <header>
        <SearchEntry />
      </header>
      
      <main>
        <section className="card-grid">
          {
            (q.trim() ? recipes.filter((r) => {
              const term = q.trim().toLowerCase();
              const vals = r.ingredienser_ids;
              let arr = [];
              if (!vals) return false;
              if (Array.isArray(vals)) arr = vals;
              else if (typeof vals === 'string') {
                try { arr = JSON.parse(vals); } catch { arr = [vals]; }
              }
              return arr.some((ing) => String(ing).toLowerCase().includes(term));
            }) : recipes).map((recipe) => (
              <ProductCard
                key={recipe.id}
                variant="large"
                title={recipe.navn}
                price={recipe.pris_portion}
                time={recipe.tid}
                image={recipe.billede}
              />
            ))
          }
        </section>
      </main>
    </>
  );
}
