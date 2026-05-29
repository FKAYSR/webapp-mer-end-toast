import { useId } from "react";
import searchIcon from "../assets/ikoner/search-icon.svg";

export default function SearchInput({ value, onChange }) {
  const id = useId();

  return (
    <label className="searchbar" htmlFor={id}>
        <button type="submit" className="searchbar-icon" aria-label="Søg">
            <img src={searchIcon} alt="" />
        </button>

      <input
        autoFocus
        id={id}
        className="searchbar-control"
        type="text"
        placeholder="Søg fx frokost, gulerødder"
        value={value}
        onChange={onChange}
      />
    </label>
  );
}
