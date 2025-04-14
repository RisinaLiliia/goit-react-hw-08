import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { getNavLinkClass } from "../../utils/getNavLinkClass";
import HomeIcon from "@mui/icons-material/Home";
import css from "./Navigation.module.css";

export default function Navigation() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <nav className={css.navigation}>
      <NavLink to="/" className={getNavLinkClass(css)}>
        <HomeIcon />
      </NavLink>
      {isLoggedIn && (
        <NavLink to="/contacts" className={getNavLinkClass(css)}>
          Contacts
        </NavLink>
      )}
    </nav>
  );
}
