import { useRef, useeffect } from "react";

export default function IngredientToList() {
  const dialog = dialogRef.current;
  if (!dialog) return;

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

    onclose();
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
            Navn:
            <input type="text" name="name" required />
          </label>
          <div className="modal-actions">
            <button type="button" onClick={onClose}></button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
