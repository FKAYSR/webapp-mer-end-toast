import { useState } from "react";
import PlusButton from "../assets/addButton.svg";
import IngredientToList from "./IngredientToList";

export default function AddButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsModalOpen(true)} className="add-btn">
        <img src={PlusButton} alt="Tilføj" />
      </button>

      <IngredientToList
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
