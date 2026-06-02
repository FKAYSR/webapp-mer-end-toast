import reactRouterLogo from "../assets/logo.svg";
import SearchEntry from "../components/SearchEntry";
import ProductCard from "../components/ProductCard";
import ProductGrid from "../components/ProductGrid";
import { supabase } from "../supabaseClient";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [allergyIds, setAllergyIds] = useState([]);

  useEffect(() => {
    const loadRecipes = async () => {
      const { data: recipeData, error: recipeError } = await supabase
        .from("opskrifter")
        .select("id, navn, pris_portion, tid, billede, ingredienser_ids");

      if (recipeError) {
        console.error("Supabase error (opskrifter):", recipeError);
        return;
      }

      const { data: allergyData, error: allergyError } = await supabase
        .from("ingredienser")
        .select("id")
        .eq("allergisk", true);

      if (allergyError) {
        console.error("Supabase error (ingredienser):", allergyError);
        return;
      }

      const ids = allergyData ? allergyData.map((ing) => ing.id) : [];

      setRecipes(recipeData ?? []);
      setAllergyIds(ids);
    };

    loadRecipes();
  }, []);

  const checkAllergy = (recipeIngredients) => {
    if (!recipeIngredients || !Array.isArray(recipeIngredients)) return false;
    return recipeIngredients.some((id) => allergyIds.includes(id));
  };
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
              hasAllergy={checkAllergy(recipe.ingredienser_ids)} // <-- RETTELSE: Nu kalder vi funktionen!
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
              hasAllergy={checkAllergy(recipe.ingredienser_ids)} // <-- RETTELSE: Og her!
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
              hasAllergy={checkAllergy(recipe.ingredienser_ids)} // <-- RETTELSE: Og her!
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
              hasAllergy={checkAllergy(recipe.ingredienser_ids)} // <-- RETTELSE: Og til sidst på det store kort!
            />
          ))}
        </ProductGrid>
      </main>
    </>
  );
}
