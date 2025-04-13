import { NavLink } from "react-router-dom";
import { getNavLinkClass } from "../../utils/getNavLinkClass"; 
import css from "./AuthNav.module.css";

export default function AuthNav() {
  return (
    <div>
      <NavLink to="/register" className={getNavLinkClass(css)}>
        Register
      </NavLink>
      <NavLink to="/login" className={getNavLinkClass(css)}>
        Log In
      </NavLink>
    </div>
  );
}
