import { useId } from "react";

export default function SearchInput({ value, onChange }) {
  const id = useId();

  return (
    <label className="searchbar" htmlFor={id}>
      <input
        id={id}
        className="searchbar"
        type="text"
        placeholder="Søg fx frokost, gulerødder"
        value={value}
        onChange={onChange}
      />
    </label>
  );
}
