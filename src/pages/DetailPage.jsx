import { useEffect, useState } from "react";
import { useParams } from "react-router"; // RETTET: Vi bruger useParams nu!
import { supabase } from "../supabaseClient";
import TimeIcon from "../assets/time-icon.svg";
import FreezeIcon from "../assets/freeze-icon.svg";

export default function DetailPage() {
  // useParams snupper automatisk værdien fra ':id' i din App.jsx rute
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    async function fetchRecipe() {
      if (!id) return;

      const { data, error } = await supabase
        .from("opskrifter") // Tjek dit præcise tabelnavn i Supabase
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
      // Hvis Supabase finder opskriften, gemmer vi hele objektet i vores state (recipe). Det får React til at genindlæse siden.
      if (data) setRecipe(data);
    }
    fetchRecipe();
  }, [id]); // Genkør hvis ID'et i URL'en ændrer sig

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
      {/* Vis resten af din opskrift-data her */}
    </div>
  );
}
