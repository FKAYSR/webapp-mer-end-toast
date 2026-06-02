import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { supabase } from "../supabaseClient";
import TimeIcon from "../assets/ikoner/time-active-icon.svg";
import FreezeIcon from "../assets/ikoner/freeze-icon.svg";
import RecipeToList from "../components/RecipeToList";
import Checkbox from "../components/Checkbox";

function parseIngredientsIds(value) {
  if (Array.isArray(value)) return value;  
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return [];
    }
  }
  return [];
}

export default function DetailPage() {
  // useParams snupper automatisk værdien fra ':id' i din App.jsx rute
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [loadingIngredients, setLoadingIngredients] = useState(false);
  const [ingredientsError, setIngredientsError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchRecipe() {
      if (!id) return;

      const { data, error } = await supabase
        .from("opskrifter")
        .select("*")
        // Gør så den kun henter informationen fra id'et i URL'en
        .eq("id", id)
        .single();

      if (error) {
        console.error(
          "Der skete en fejl under hentning af opskrift:",
          error.message,
        );
        return; // Stop funktionen her, så vi ikke prøver at gemme tom data
      }
      // Hvis Supabase finder opskriften, gemmer vi hele objektet i vores state (recipe). Det får REACT til at genindlæse siden.
      if (data) setRecipe(data);
    }
    fetchRecipe();
  }, [id]); // Genkør hvis ID'et i URL'en ændrer sig

  useEffect(()  => {
    async function fetchIngredients() {
      if (!recipe) return;

      const ingredientsIds = parseIngredientsIds(recipe.ingredienser_ids);

      setLoadingIngredients(true);
      setIngredientsError(null);

      if (ingredientsIds.length === 0) {
        setIngredients([]);
        setLoadingIngredients(false);
        return;
      }

      const { data, error } = await supabase
      .from("ingredienser")
      .select("id, navn, standard_mængde, enhed, pris, afdeling, added_to_list")
      .in("id", ingredientsIds);

      if (error) {
        console.error("Der skete en fejl under indlæsning af ingredienserne", error.message);
        setIngredientsError(error);
        setLoadingIngredients(false);
        return;
      }

      setIngredients(data || []);
      setLoadingIngredients(false);
    }

    fetchIngredients();
  }, [recipe]);

  function handleAdded(selectedIds) {
    const updated = ingredients.map((item) => {
      if (selectedIds.includes(item.id)) {
        return { ...item, added_to_list: true };
      }
      return item;
    });
    setIngredients(updated);
  }

  if (!recipe) return <p>Henter den lækre opskrift...</p>;

  return (
    <div className="detail-page">
      <div className="top-tag-container">
        <div className="small-tag">
          <div>
            <img src={TimeIcon} />
          </div>
          <p>{recipe.tid}</p>
        </div>

        {recipe.fryseegnet && (
          <div className="small-tag">
            <div>
              <img src={FreezeIcon} />
            </div>
            <p>Fryseegnet</p>
          </div>
        )}
      </div>
      <h1>{recipe.navn}</h1>

      <section className="detail-ingredienser-section">
        <h2>Ingredienser</h2>

        {loadingIngredients && <p>Henter ingredienser...</p>}
        {ingredientsError && <p>Fejl ved hentning af ingredienser</p>}

        {!loadingIngredients && ingredients.length === 0 && (
          <p>Ingen ingredienser fundet til denne opskrift</p>
        )}

        {ingredients.length > 0 && (
          <>
          <ul className="liste-punkter">
            {ingredients.map((ingredient) => (
              <li key={ingredient.id}>
                <div>
                  <Checkbox/>
                  <span>{ingredient.standard_mængde}</span>
                  <span>{ingredient.enhed}</span>
                  <span> {ingredient.navn}</span>
                </div>
              </li>
            ))}
          </ul>

          <button type="button" onClick={() => setShowModal(true)}>
            Tilføj til indkøbslisten
          </button>
          </>
        )}
      </section>

      <RecipeToList
      isOpen={showModal}
      ingredients={ingredients}
      onClose={() => setShowModal(false)}
      onAdded={handleAdded}/>
    </div>
  );
}
