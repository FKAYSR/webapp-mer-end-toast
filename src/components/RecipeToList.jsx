import { supabase } from "../supabaseClient";
import { useEffect, useState } from "react";
import Checkbox from "./Checkbox";

export default function RecipeToList({ isOpen, ingredients, onClose, onAdded }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const defaultSelected = ingredients
      .filter((item) => item.added_to_list !== true)
      .map((item) => item.id);

    setSelectedIds(defaultSelected);
  }, [isOpen, ingredients]);

  function toggleId(id) {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((x) => x !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  }

  async function handleSave() {
    if (selectedIds.length === 0) {
      onClose();
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from("ingredienser")
      .update({ added_to_list: true })
      .in("id", selectedIds);

    setLoading(false);

    if (error) {
      console.error(error.message);
      return;
    }

    onAdded(selectedIds);
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Markér de ting du allerede har og resten bliver tilføjet til din indkøbsliste!</h3>

        {ingredients.map((item) => (
          <label key={item.id} className="modal-row">
            <Checkbox
            defaultChecked={selectedIds.includes(Number(item.id))}
            onChange={() => toggleId(item.id)}/>
            <span>
              {item.navn} {item.added_to_list ? "(allerede på listen)" : ""}
            </span>
          </label>
        ))}

        <div className="modal-actions">
          <button type="button" onClick={handleSave} disabled={loading}>
            {loading ? "Gemmer..." : "Tilføj valgte"}
          </button>
          <button type="button" onClick={onClose} disabled={loading}>
            Annuller
          </button>
        </div>
      </div>
    </div>
  );
}
