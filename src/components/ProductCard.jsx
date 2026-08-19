import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import AllergyIcon from "../assets/ikoner/allergy-warning-icon.svg";

export default function ProductCard({
  id,
  title,
  price,
  time,
  image,
  variant = "large",
  ingredients = [], // Modtager jsonb-felt fra databasen
}) {
 
  const cardClassName = `product-card product-card-${variant}`;
  const navigate = useNavigate();

  const [hasAllergy, setHasAllergy] = useState(false);

  useEffect(() => {
    if (!ingredients || ingredients.length === 0) {
      return;
    }

    const checkRecipeAllergies = async () => {
      const { data: allergyData } = await supabase
        .from("ingredienser")
        .select("id")
        .eq("allergisk", true);

      if (!allergyData) return;

      const allergyIds = allergyData.map((ing) => ing.id);

      let ingredientsArray =
        typeof ingredients === "string" ? JSON.parse(ingredients) : ingredients;
      if (!Array.isArray(ingredientsArray)) return;

      const match = ingredientsArray.some((item) => {
        const ingId = item?.ingredientId;
        return ingId ? allergyIds.includes(Number(ingId)) : false;
      });

      setHasAllergy(match);
    };

    checkRecipeAllergies();
  }, [ingredients]);

  return (
    <article
      className={cardClassName} // Bruger din rigtige klasse her
      onClick={() => navigate(`/opskrift/${id}`)} // Din originale navigation
    >
      <div className="product-card-image-wrapper">
        {image && (
          <img
            className="product-card-image"
            src={image}
            alt={title ?? ""}
            loading="lazy"
            decoding="async"
          />
        )}

        {hasAllergy && (
          <img
            className="product-card-allergy-icon"
            src={AllergyIcon}
            alt="denne opskrift indeholder en ingrediens, du ikke kan tåle"
          />
        )}
      </div>

      <div className="product-card-content">
        {title && <h3 className="product-card-title">{title}</h3>}

        <div className="product-card-meta">
          {typeof price !== "undefined" && price !== null && (
            <span className="product-card-price">
              {Number(price).toLocaleString("da-DK", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })}{" "}
              kr
            </span>
          )}

          {time && <span className="product-card-time">{time} min</span>}
        </div>
      </div>
    </article>
  );
}
