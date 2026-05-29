import { useNavigate } from "react-router";

export default function PreferencButton({ to, icon, children }) {
  const navigate = useNavigate();

  return (
    <button type="button" 
    className="preference-button"
    onClick={() => navigate(to)}
    aria-label={typeof children === "string" ? children : "Åbn"}>
      {icon && <img src={icon} alt="" className="preference-icon"/>}
      <span className="preference-text">{children}</span>
    </button>
  );
}
