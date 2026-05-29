import { useNavigate } from "react-router";
import searchIcon from "../assets/ikoner/search-icon.svg";

export default function SearchEntry() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/søg");
  };

  return (
    <button
      type="button"
      className="searchbar searchbar-button searchbar-control"
      onClick={handleClick}
      aria-label="Gå til søge siden"
    >
      <img src={searchIcon} alt="" className="searchbar-icon" />
      <span>Søg fx frokost, gulerødder</span>
    </button>
  );
}
