import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import AddAllergyModal from "../components/AddAllergyModal";
import AllergyIcon from "../assets/ikoner/allergy-warning-icon.svg";
import CloseIconSmall from "../assets/ikoner/close-small-icon.svg";
import AddButton from "../assets/ikoner/addButton.svg";

export default function AllergyPage() {
  const [allergicIngredients, setAllergicIngredients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchAllergies = async () => {
    const { data, error } = await supabase
      .from("ingredienser")
      .select("*")
      .eq("allergisk", true)
      .order("navn");

    if (error) {
      console.error("Fejl ved hentning af allergiske ingredienser:", error);
    } else if (data) {
      setAllergicIngredients(data);
    }
  };

  // RETTELSE: Pakket ind i en asynkron intern funktion for at undgå render-fejlen
  useEffect(() => {
    async function loadData() {
      await fetchAllergies();
    }
    loadData();
  }, []);

  const removeAllergy = async (id) => {
    const { error } = await supabase
      .from("ingredienser")
      .update({ allergisk: false })
      .eq("id", id);
    if (error) {
      console.error("Kunne ikke fjerne allergi:", error);
    } else {
      fetchAllergies();
    }
  };

  return (
    <div className="allergy-page">
      <header>
        <h1>Mine allergier</h1>
      </header>
      <main>
        {/* RETTELSE: Fjernet <div> inde fra <p> for at lave gyldig HTML */}
        <p>
          Hvis dine valgte ingredienser indgår i en opskrift, vil du få vist en
          lille advarsel <img src={AllergyIcon} alt="allergiadvarsel" />
        </p>

        <div className="active-allergy-container">
          {allergicIngredients.map((ing) => (
            <button
              key={ing.id}
              className="active-tag"
              onClick={() => removeAllergy(ing.id)}
            >
              <span>{ing.navn}</span>
              <div>
                <img src={CloseIconSmall} alt="Fjern" />
              </div>
            </button>
          ))}
        </div>

        {isModalOpen && (
          <AddAllergyModal
            onClose={() => {
              setIsModalOpen(false);
              fetchAllergies();
            }}
          />
        )}
      </main>

      <button onClick={() => setIsModalOpen(true)} className="add-btn">
        <img src={AddButton} alt="tilføj ny ingrediens, du ikke tåler" />
      </button>
    </div>
  );
}
