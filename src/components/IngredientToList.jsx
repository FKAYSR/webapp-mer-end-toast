import { useRef, useEffect, useState } from "react";
import CloseButton from "../assets/close-icon-large.svg";
import { supabase } from "../supabaseClient.js";

export default function IngredientToList({ isOpen, onClose }) {
  const dialogRef = useRef(null);

  // States til at håndtere databasen og inputfeltet
  const [dbIngredients, setDbIngredients] = useState([]); // Rettet stavefejl i set-funktion her og nedenfor
  const [searchInputValue, setSearchInputValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Hent varerne og specifikke properties
  useEffect(() => {
    async function fetchIngredients() {
      const { data, error } = await supabase
        .from("ingredienser") // <-- Tjek om denne og "insert" nedenfor skal hedde det samme tabelnavn!
        .select("id, navn, afdeling");

      if (error) {
        console.error("Fejl ved hentning af varer:", error);
      } else if (data) {
        setDbIngredients(data);
      }
    }

    if (isOpen) {
      fetchIngredients(); // Rettet: Fjernet 'data' herfra
    }
  }, [isOpen]);

  // Selve modalen, hvor der bestemmes om den er lukket eller åben
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  // Udfyld automatisk varens varekategori, hvis varen findes i databasen
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInputValue(value);

    const match = dbIngredients.find(
      (item) => item.navn.toLowerCase() === value.toLowerCase(), // Rettet: Stort C i toLowerCase
    );

    if (match) {
      setSelectedCategory(match.afdeling);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const existingItem = dbIngredients.find(
      (item) => item.navn.toLowerCase() === searchInputValue.toLowerCase(),
    );

    // Hvis varen allerede eksisterer i databasen, så ændre added_to_list til true
    if (existingItem) {
      console.log(
        `Varen "${existingItem.navn}" findes allerede. Ændre added_to_list til true...`,
      );

      const { error } = await supabase
        .from("ingredienser")
        .update({ added_to_list: true }) // Rettet: .updata til .update
        .eq("id", existingItem.id);

      if (error) {
        console.error("fejl ved opdatering af eksisterende vare", error);
        return;
      }
    } else {
      // Hvis varen ikke eksisterer, opretter den en ny
      console.log(`"${searchInputValue}" er ny. Oprettes`);

      const finalAfdeling = selectedCategory || "Andet";

      const finalData = {
        navn: searchInputValue,
        afdeling: finalAfdeling,
        added_to_list: true,
      };

      // OBS: Ændret fra "varer" til "ingredienser" så det matcher din fetch i toppen!
      const { error } = await supabase.from("ingredienser").insert([finalData]);

      if (error) {
        console.error("Fejl ved oprettelse af vare:", error);
        return;
      }
    }

    setSearchInputValue("");
    setSelectedCategory("");
    onClose();
  };

  // Laver et array med alle afdelingerne, som ligger på de individuelle varer
  const afdelinger = [...new Set(dbIngredients.map((item) => item.afdeling))];

  return (
    <dialog ref={dialogRef} onClose={onClose} className="allergi-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Søg efter ingrediens</h2>
          <button onClick={onClose} className="luk-modal-knap">
            ✕
          </button>
        </div>

        <input
          type="text"
          placeholder="Skriv for at søge..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="søgefelt"
        />

        <div className="resultat-liste-container">
          <ul className="resultat-liste">
            {filteredIngredients.map((ing) => (
              <li
                key={ing.id}
                onClick={() => addAllergy(ing.id)}
                className={
                  ing.is_allergic
                    ? "ingrediens-punkt valgt"
                    : "ingrediens-punkt"
                }
              >
                {ing.navn} {ing.is_allergic && "⚠️"}
              </li>
            ))}
            {filteredIngredients.length === 0 && (
              <p className="ingen-resultater">Ingen ingredienser fundet</p>
            )}
          </ul>
        </div>
      </div>
    </dialog>
  );
}
