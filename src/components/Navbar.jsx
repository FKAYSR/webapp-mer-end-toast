import { NavLink } from "react-router";
import homePassiveIcon from "../assets/ikoner/home-passive-icon.svg";
import homeActiveIcon from "../assets/ikoner/home-active-icon.svg";
import shoppinglistPassiveIcon from "../assets/ikoner/shoppinglist-passive-icon.svg";
import shoppinglistActiveIcon from "../assets/ikoner/shoppinglist-active-icon.svg";
import savePassiveIcon from "../assets/ikoner/save-passive-icon.svg";
import saveActiveIcon from "../assets/ikoner/save-active-icon.svg";
import profilePassiveIcon from "../assets/ikoner/profile-passive-icon.svg";
import profileActiveIcon from "../assets/ikoner/profile-active-icon.svg";


export default function Navbar() {
  return (
    <nav>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        {({ isActive }) => (
          <>
            <img src={isActive ? homeActiveIcon : homePassiveIcon} alt="" />
            <span>Opdag</span>
          </>
        )}
      </NavLink>
      <NavLink
        to="indkøbsliste"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        {({ isActive }) => (
          <>
            <img
              src={isActive ? shoppinglistActiveIcon : shoppinglistPassiveIcon}
              alt=""
            />
            <span>Indkøbsliste</span>
          </>
        )}
      </NavLink>
      <NavLink
        to="/gemte"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"}>
        {({ isActive }) => (
          <>
            <img
              src={isActive ? saveActiveIcon : savePassiveIcon}
              alt=""
            />
            <span>Gemte</span>
          </>
        )}
      </NavLink>
      <NavLink
        to="/profil"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"}>
        {({ isActive }) => (
          <>
            <img
              src={isActive ? profileActiveIcon : profilePassiveIcon}
              alt=""
            />
            <span>Profil</span>
          </>
        )}
      </NavLink>
    </nav>
  );
}
