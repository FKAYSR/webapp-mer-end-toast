import { useState } from "react";
import { supabase } from "../supabaseClient";
import Checkbox from "./Checkbox";

export default function RecipeToList({ isOpen, ingredients, onClose, onAdded, showToast }) {
  const [selectedIds, setSelectedIds] = useState(() =>
    ingredients.map((item) => Number(item.id)),
  );
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  function toggleId(id) {
    const idNumber = Number(id);

    if (selectedIds.includes(idNumber)) {
      setSelectedIds(selectedIds.filter((x) => x !== idNumber));
    } else {
      setSelectedIds([...selectedIds, idNumber]);
    }
  }

  async function handleSave() {
    const idsToAdd = ingredients
      .filter((item) => !selectedIds.includes(Number(item.id)))
      .map((item) => Number(item.id));

    if (idsToAdd.length === 0) {
      onClose();
      return;
    }

    setLoading(true);

    for (const id of idsToAdd) {
      const { data: currentItem, error: fetchError } = await supabase
        .from("ingredienser")
        .select("standard_mængde")
        .eq("id", id)
        .single();

      if (fetchError) {
        console.error(fetchError.message);
        continue;
      }

      const currentAmount = Number(currentItem.standard_mængde || 0);
      const newAmount = currentAmount + 1;

      const { error: updateError } = await supabase
        .from("ingredienser")
        .update({ standard_mængde: newAmount, added_to_list: true })
        .eq("id", id);

      if (updateError) {
        console.error(updateError.message);
      }
    }

    setLoading(false);
    showToast("Ingredienser tilføjet til indkøbslisten!");

    onAdded(idsToAdd);
    // Sender et event ud
    window.dispatchEvent(new Event("shoppinglist-updated"));
    onClose();
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>
          Markér de ting du allerede har og resten bliver tilføjet til din
          indkøbsliste!
        </h3>

        {ingredients.map((item) => (
          <label key={item.id} className="modal-row">
            <Checkbox
              checked={selectedIds.includes(Number(item.id))}
              onChange={() => toggleId(item.id)}
            />
            <span>
              {item.navn} {item.added_to_list ? "(allerede på listen)" : ""}
            </span>
          </label>
        ))}

        <div className="modal-actions">
          <button type="button" onClick={handleSave} disabled={loading}>
            {loading ? "Gemmer..." : "Tilføj til indkøbsliste"}
          </button>
          <button type="button" onClick={onClose} disabled={loading}>
            Annuller
          </button>
        </div>
      </div>
    </div>
  );
}
