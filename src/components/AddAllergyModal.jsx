import { useEffect, useState, useRef } from "react";
import { supabase } from "../supabaseClient";
import CloseButton from "../assets/ikoner/close-icon-large.svg";

export default function AddAllergyModal({ onClose }) {
  const [allIngredients, setAllIngredients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const dialogRef = useRef(null);

  // RETTELSE 1: Denne useEffect manglede helt! Den sørger for at åbne dialogen med det samme
  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.showModal();
    }
  }, []);

  useEffect(() => {
    async function fetchAll() {
      const { data, error } = await supabase
        .from("ingredienser")
        .select("*")
        .order("navn", { ascending: true });

      if (error) {
        console.error("Fejl ved hentning af alle varer:", error);
      } else if (data) {
        setAllIngredients(data);
      }
    }
    fetchAll();
  }, []);

  const addAllergy = async (id) => {
    const { error } = await supabase
      .from("ingredienser")
      .update({ allergisk: true })
      .eq("id", id);

    if (error) {
      console.error("Kunne ikke tilføje allergi:", error);
    } else {
      onClose();
    }
  };

  const filteredIngredients = allIngredients.filter((ing) =>
    ing.navn.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <dialog ref={dialogRef} onClose={onClose} className="allergi-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Søg efter ingrediens</h3>
          <button onClick={onClose} className="luk-modal-knap">
            <img src={CloseButton} alt="close modal" />
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
                  ing.allergisk ? "ingrediens-punkt valgt" : "ingrediens-punkt"
                }
              >
                {ing.navn} {ing.allergisk && "🗸"}
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
