import { useRef, useEffect } from "react";
import CloseButton from "../assets/close-icon-large.svg";

export default function IngredientToList({ isOpen, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log("Gemmer data i databasen:", data);

    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="ingredient-to-list-moadl"
    >
      <div className="modal-content">
        <h2>Tilføj Vare</h2>

        <form onSubmit={handleSubmit}>
          <label>
            Navn på vare:
            <input type="text" name="name" required />
          </label>
          <label>
            Vælg kategori
            <select name="Varekategori"></select>
          </label>
          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Anuller
            </button>
            <button type="submit">Gem</button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
