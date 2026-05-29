import ProductCard from "../components/ProductCard";
import ProductGrid from "../components/ProductGrid";
import { supabase } from "../supabaseClient";
import { useEffect, useState } from "react";
import PreferencButton from "../components/PreferenceButton";
import shopIcon from "../assets/ikoner/butik-icon.svg";
import preferenceIcon from "../assets/ikoner/food-preference-icon.svg";
import allergyIcon from "../assets/ikoner/allergy-icon.svg"
import profilePicture from "../assets/profile-picture.png"
import settingsIcon from "../assets/ikoner/settings-icon.svg"

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
      <header className="profile-header">
        <img src={settingsIcon} alt="indstillinger" className="settings-icon" />
        <div className="profile-center">
          <img src={profilePicture} alt="profile billede" />
          <h1>Bruger navn</h1>
        </div>
      </header>
      <main>
        <div className="preference-row">
          <PreferencButton to="/kost-præferencer" icon={preferenceIcon}>
            Kost præferencer
          </PreferencButton>
          <PreferencButton to="/dine-lokale-butikker" icon={shopIcon}>
            Dine lokale butikker
          </PreferencButton>
          <PreferencButton to="/allergi" icon={allergyIcon}>
            Allergener
          </PreferencButton>
        </div>
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
