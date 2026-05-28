import { useState } from "react";
import PlusButton from "../assets/addButton.svg?react";
import IngredientToList from "./IngredientToList";

export default function AddButton() {
  return (
    <>
      <button onClick={() => setIsModalOpen(true)} className="add-btn">
        <img src={PlusButton} alt="Tilføj" />
      </button>
    </>
  );
}
