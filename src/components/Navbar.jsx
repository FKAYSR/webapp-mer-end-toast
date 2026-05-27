import { NavLink } from "react-router";

export default function Navbar() {
  return (
    <nav>
      <NavLink to="/">Hjem</NavLink>
      <NavLink to="indkøbsliste">Indkøbsliste</NavLink>
      <NavLink to="/gemte">Gemte</NavLink>
      <NavLink to="/profil">Profil</NavLink>
    </nav>
  );
}
