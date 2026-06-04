import { useRef, useEffect, useState } from "react";
import CloseButton from "../assets/ikoner/close-icon-large.svg";
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
      (item) => item.navn.toLowerCase() === value.toLowerCase(),
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
        .update({ added_to_list: true })
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

      // Ændret fra "varer" til "ingredienser" så det matcher fetch i toppen
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
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="ingredient-to-list-modal"
    >
      <div className="modal-content">
        <h2>Tilføj Vare</h2>

        <form onSubmit={handleSubmit}>
          <label>
            Navn på vare:
            <input
              type="text"
              name="name"
              list="existing_ingredients"
              value={searchInputValue}
              onChange={handleInputChange}
              placeholder="Søg eller tilføj ny vare"
              required
              autoComplete="off"
            />
          </label>

          {/* Søgefelt */}
          <datalist id="existing_ingredients">
            {dbIngredients.map((item, index) => (
              <option key={index} value={item.navn} />
            ))}
          </datalist>

          {/* Dropdown til afdelingskategorierne */}
          <label>
            Vælg varekategori
            <select
              name="Varekategori"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="" disabled>
                -- Vælg Afdeling --
              </option>
              {afdelinger.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}

              {/* Backup afdeling */}
              {!afdelinger.includes("Andet") &&
                !afdelinger.includes("andet") && (
                  <option value="Andet">Andet</option>
                )}
            </select>
          </label>
          <div className="modal-actions">
            <button type="button" className="anuller-knap" onClick={onClose}>
              Annuller
            </button>
            <button type="submit">Gem</button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
