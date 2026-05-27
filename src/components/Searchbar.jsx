import { useNavigate } from "react-router";

export default function Searchbar() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/søg");
  };

  return (
    <input
      type="text"
      placeholder="Søg fx frokost, gulerødder"
      onClick={handleClick}
    />
  );
}
