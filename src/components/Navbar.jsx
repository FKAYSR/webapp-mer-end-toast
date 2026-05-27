import { NavLink } from "react-router";

export default function Navbar() {
  return (
    <nav>
      <NavLink to="/">Hjem</NavLink>
      <NavLink to="shoppinglist">Indkøbsliste</NavLink>
      <NavLink to="/saved">Gemte</NavLink>
      <NavLink to="/profile">Profil</NavLink>
    </nav>
  );
}
