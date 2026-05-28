import { useId } from "react";

export default function SearchInput({ value, onChange }) {
  const id = useId();

  return (
    <label className="searchbar" htmlFor={id}>
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
