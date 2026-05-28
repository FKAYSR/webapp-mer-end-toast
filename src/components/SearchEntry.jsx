import { useNavigate } from "react-router";

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
    >
      Søg fx frokost, gulerødder
    </button>
  );
}
